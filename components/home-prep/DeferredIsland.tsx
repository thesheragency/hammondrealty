"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

// Imports are not invoked until the island approaches the viewport.
const islands = {
  case: dynamic(() => import("./BeforeAfterCarousel"), { ssr: false }),
  included: dynamic(() => import("./IncludedSection"), { ssr: false }),
  reviews: dynamic(() => import("./MarqueeIsland"), { ssr: false }),
  faq: dynamic(() => import("./FaqIsland"), { ssr: false }),
  video: dynamic(() => import("@/components/ui/VimeoFacade"), { ssr: false }),
};

export default function DeferredIsland({
  kind, props, children, fill = false,
}: { kind: keyof typeof islands; props: Record<string, any>; children: ReactNode; fill?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const Island = islands[kind] as React.ComponentType<any>;
  return (
    <div ref={ref} data-home-prep-island={kind} data-ready={ready}
      style={fill ? { position: "absolute", inset: 0 } : { position: "relative" }}>
      {!ready && children}
      {near && (
        <div style={ready ? undefined : { position: "absolute", inset: 0, visibility: "hidden" }}>
          <Island {...props} onReady={onReady} />
        </div>
      )}
    </div>
  );
}
