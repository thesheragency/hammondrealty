"use client";

import { useEffect, useRef, useState } from "react";

interface VimeoBackgroundVideoProps {
  videoId: string;
  className?: string;
}

/**
 * Lazy-loads a Vimeo background video iframe using IntersectionObserver.
 * The iframe is only mounted once the component enters the viewport,
 * preventing the Vimeo SDK scripts from blocking initial page load.
 */
export default function VimeoBackgroundVideo({
  videoId,
  className,
}: VimeoBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&autoplay=1&muted=1&background=1&loop=1&player_id=0&app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          title="Background video"
        />
      )}
    </div>
  );
}
