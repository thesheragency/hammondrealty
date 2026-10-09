"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden bg-background select-none cursor-ew-resize"
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* After image (base — right side) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 1536px) 696px, (min-width: 1280px) 568px, (min-width: 1024px) 440px, calc(100vw - 32px)"
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute top-4 right-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
        After
      </span>
      {/* Before image (clipped from left) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1536px) 696px, (min-width: 1280px) 568px, (min-width: 1024px) 440px, calc(100vw - 32px)"
          loading="lazy"
          draggable={false}
          className="object-cover pointer-events-none"
        />
        <span className="absolute top-4 left-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
          Before
        </span>
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor" aria-hidden="true">
            <path d="M8 5l-6 7 6 7V5zm8 0v14l6-7-6-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterCarousel({
  slides,
  onReady,
}: {
  slides: { beforeSrc: string; afterSrc: string; beforeAlt?: string; afterAlt?: string }[];
  onReady?: () => void;
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => { onReady?.(); }, [onReady]);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  return (
    <div className="relative">
      {/* All slides are always mounted so images are decoded and ready — only active slide is visible */}
      {slides.map((slide, i) => (
        <div key={i} style={{ display: i === index ? "block" : "none" }}>
          <BeforeAfterSlider
            beforeSrc={slide.beforeSrc}
            afterSrc={slide.afterSrc}
            beforeAlt={slide.beforeAlt}
            afterAlt={slide.afterAlt}
          />
        </div>
      ))}
      {/* Nav controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-foreground/25 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

