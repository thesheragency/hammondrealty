"use client";

import { useEffect, useRef, type PointerEvent } from "react";

// Keep manual movement, inertia and autoplay on the same pixel-based timeline.
export function useDraggableMarquee(direction: "left" | "right") {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    width: 0, offset: 0, velocity: 0, resumeAt: 0,
    hovered: false, focused: false, reduced: false,
    pointer: null as null | {
      id: number; type: string; startX: number; startY: number;
      x: number; time: number; dragged: boolean;
    },
    suppressClickUntil: 0,
  });

  function paint() {
    const s = state.current;
    if (!s.width || !trackRef.current) return;
    // Every group includes its trailing gap, so wrapping is visually identical.
    s.offset = ((s.offset % s.width) + s.width) % s.width - s.width;
    trackRef.current.style.transform = `translateX(${s.offset}px)`;
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = track?.firstElementChild;
    if (!viewport || !track || !group) return;
    const s = state.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      s.reduced = media.matches;
      if (s.reduced) s.velocity = 0;
    };
    updateMotion();
    media.addEventListener("change", updateMotion);

    const measure = () => {
      const width = group.getBoundingClientRect().width;
      if (s.width) s.offset *= width / s.width;
      s.width = width;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    let frame = 0;
    let previous = performance.now();
    function tick(now: number) {
      const dt = Math.min(now - previous, 64);
      previous = now;
      if (!document.hidden && !s.pointer) {
        if (Math.abs(s.velocity) > 0.01 && !s.reduced) {
          const decay = Math.exp(-dt / 180);
          s.offset += s.velocity * 180 * (1 - decay);
          s.velocity *= decay;
          paint();
        } else {
          s.velocity = 0;
          if (!s.reduced && !s.hovered && !s.focused && now >= s.resumeAt) {
            // Match the previous CSS animation: one complete group every 50s.
            s.offset += (direction === "left" ? -1 : 1) * s.width * dt / 50000;
            paint();
          }
        }
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
    };
  }, [direction]);

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const s = state.current;
    const pointer = s.pointer;
    if (!pointer || pointer.id !== event.pointerId) return;
    const now = performance.now();
    s.pointer = null;
    event.currentTarget.removeAttribute("data-dragging");
    if (pointer.dragged) {
      s.suppressClickUntil = now + 500;
      s.resumeAt = now + 1750;
    }
    // A stationary hold or a cancelled vertical gesture should not fling.
    if (cancelled || s.reduced || !pointer.dragged || now - pointer.time > 100) {
      s.velocity = 0;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return {
    viewportRef,
    trackRef,
    handlers: {
      onPointerEnter(event: PointerEvent<HTMLDivElement>) {
        if (event.pointerType === "mouse") state.current.hovered = true;
      },
      onPointerLeave(event: PointerEvent<HTMLDivElement>) {
        if (event.pointerType === "mouse") state.current.hovered = false;
      },
      onPointerDown(event: PointerEvent<HTMLDivElement>) {
        if (!event.isPrimary || event.button !== 0 || state.current.pointer) return;
        const s = state.current;
        s.velocity = 0;
        s.suppressClickUntil = 0;
        s.pointer = {
          id: event.pointerId, type: event.pointerType,
          startX: event.clientX, startY: event.clientY,
          x: event.clientX, time: performance.now(), dragged: false,
        };
        if (event.pointerType === "mouse") {
          // Avoid browser text selection and pointer-induced card focus/scroll.
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
        }
      },
      onPointerMove(event: PointerEvent<HTMLDivElement>) {
        const s = state.current;
        const pointer = s.pointer;
        if (!pointer || pointer.id !== event.pointerId) return;
        const dx = event.clientX - pointer.startX;
        const dy = event.clientY - pointer.startY;
        if (!pointer.dragged) {
          if (pointer.type !== "mouse" && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5) {
            finish(event, true);
            return; // touch-action: pan-y leaves vertical scrolling to the browser.
          }
          if (Math.abs(dx) < 4) return;
          pointer.dragged = true;
          event.currentTarget.setAttribute("data-dragging", "true");
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        const now = performance.now();
        const delta = event.clientX - pointer.x;
        s.offset += delta;
        s.velocity = Math.max(-1.2, Math.min(1.2, delta / Math.max(now - pointer.time, 1)));
        pointer.x = event.clientX;
        pointer.time = now;
        paint();
      },
      onPointerUp(event: PointerEvent<HTMLDivElement>) { finish(event); },
      onPointerCancel(event: PointerEvent<HTMLDivElement>) { finish(event, true); },
      onLostPointerCapture(event: PointerEvent<HTMLDivElement>) {
        // Touch initially captures the card/text target. Transferring capture to
        // this viewport emits a bubbled loss from that child, not a cancelled drag.
        if (event.target === event.currentTarget) finish(event, true);
      },
      onClickCapture(event: React.MouseEvent<HTMLDivElement>) {
        if (performance.now() < state.current.suppressClickUntil) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      onDragStart(event: React.DragEvent<HTMLDivElement>) { event.preventDefault(); },
      onFocusCapture() { state.current.focused = true; },
      onBlurCapture(event: React.FocusEvent<HTMLDivElement>) {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          state.current.focused = false;
          event.currentTarget.scrollLeft = 0;
        }
      },
    },
  };
}
