"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

function IncludedCarousel({
  controlsRef,
  cards,
}: {
  controlsRef: React.MutableRefObject<{ prev: () => void; next: () => void } | null>;
  cards: { title: string; desc: string; image: string }[];
}) {
  const count = cards.length;
  const GAP = 16;
  const SETTLE_MS = 700;
  const BUFFER = 2;

  const [visualIndex, setVisualIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [visibleTiles, setVisibleTiles] = useState(3);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      setContainerW(w);
      setVisibleTiles(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (visualIndex === 0) return;
    const normalized = ((visualIndex % count) + count) % count;
    if (normalized === visualIndex) return;
    const timer = setTimeout(() => {
      setAnimate(false);
      setVisualIndex(normalized);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [visualIndex, count]);

  const tileW =
    containerW > 0
      ? (containerW - GAP * (visibleTiles - 1)) / visibleTiles
      : 0;
  const trackX = containerW > 0 ? -visualIndex * (tileW + GAP) : 0;

  const next = useCallback(() => setVisualIndex((v) => v + 1), []);
  const prev = useCallback(() => setVisualIndex((v) => v - 1), []);

  useEffect(() => {
    controlsRef.current = { prev, next };
    return () => {
      controlsRef.current = null;
    };
  }, [controlsRef, prev, next]);

  const renderStart = visualIndex - BUFFER;
  const renderEnd = visualIndex + visibleTiles - 1 + BUFFER;

  return (
    <div ref={containerRef} className="relative overflow-x-clip">
      {/* Invisible placeholder gives the container its natural height */}
      <div
        className="invisible"
        aria-hidden
        style={{ width: tileW || undefined }}
      >
        <div className="aspect-[4/5] bg-muted" />
      </div>

      <motion.div
        className="absolute top-0 left-0"
        animate={{ x: trackX }}
        transition={
          animate
            ? { type: "spring", stiffness: 180, damping: 28, mass: 0.9 }
            : { duration: 0 }
        }
      >
        {Array.from({ length: renderEnd - renderStart + 1 }, (_, i) => {
          const pos = renderStart + i;
          const cardIndex = ((pos % count) + count) % count;
          const card = cards[cardIndex];
          const isVisible = pos >= visualIndex && pos < visualIndex + visibleTiles;
          return (
            <div
              key={pos}
              className="group absolute top-0 aspect-[4/5] overflow-hidden bg-muted shadow-lg"
              style={{
                left: pos * (tileW + GAP),
                width: tileW || undefined,
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 85vw, 400px"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <h3 className="font-sans text-2xl font-bold mb-2 drop-shadow-md">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-sm drop-shadow">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function IncludedSection({ cards: included, eyebrow, heading, onReady }: { cards: {title:string;desc:string;image:string}[];eyebrow:string;heading:ReactNode;onReady?:()=>void }) {
  const includedControlsRef=useRef<{prev:()=>void;next:()=>void}|null>(null);
  useEffect(()=>{onReady?.();},[onReady]);
  return (
<div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-4xl">
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {eyebrow}
                </p>
                <h2 className="text-h2 font-bold leading-tight">
                  {heading}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => includedControlsRef.current?.prev()}
                  aria-label="Previous"
                  className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  onClick={() => includedControlsRef.current?.next()}
                  aria-label="Next"
                  className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ArrowRight className="w-8 h-8" />
                </button>
              </div>
            </div>
            <IncludedCarousel controlsRef={includedControlsRef} cards={included} />
            <div className="flex md:hidden items-center justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => includedControlsRef.current?.prev()}
                aria-label="Previous"
                className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={() => includedControlsRef.current?.next()}
                aria-label="Next"
                className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>
  );
}
