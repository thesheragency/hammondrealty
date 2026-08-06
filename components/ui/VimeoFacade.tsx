"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface VimeoFacadeProps {
  videoId: string;
}

/**
 * Vimeo video with muted autoplay background + play button overlay.
 *
 * Phase 1 (muted):  iframe loads with background=1&muted=1&autoplay=1&loop=1.
 *                   A centered play button overlay sits on top.
 * Phase 2 (sound):  clicking play rebuilds the iframe without background mode,
 *                   with controls=1&muted=0&autoplay=1 so Vimeo's native
 *                   controls (including pause) appear inside the player.
 *
 * Only used in the "Why the Home Prep Program" section of HomePrepPage.
 */
export default function VimeoFacade({ videoId }: VimeoFacadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [withSound, setWithSound] = useState(false);

  // Lazy-mount: only create the iframe once the section scrolls into view
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

  const mutedSrc = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&autoplay=1&muted=1&background=1&loop=1&player_id=0&app_id=58479`;
  const soundSrc = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&autoplay=1&muted=0&controls=1&player_id=0&app_id=58479`;

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      {visible && (
        <>
          <iframe
            key={withSound ? "sound" : "muted"}
            src={withSound ? soundSrc : mutedSrc}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            title="Home Prep Program video"
          />

          {/* Play button overlay — visible while muted, hidden after click */}
          {!withSound && (
            <button
              type="button"
              onClick={() => setWithSound(true)}
              aria-label="Play video with sound"
              className="absolute inset-0 flex items-center justify-center group"
              style={{ background: "transparent" }}
            >
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
                <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
