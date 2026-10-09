"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface VimeoFacadeProps {
  videoId?: string;
  posterUrl?: string;
  playLabel?: string;
  iframeTitle?: string;
  onReady?: () => void;
}

/** Keep Vimeo scripts and video bytes off the network until the visitor plays. */
export default function VimeoFacade({ videoId, posterUrl, playLabel, iframeTitle, onReady }: VimeoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => { onReady?.(); }, [onReady]);
  if (!videoId || !posterUrl) return null;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${encodeURIComponent(videoId)}?badge=0&autopause=0&autoplay=1&muted=0&controls=1&player_id=0&app_id=58479`}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          className="absolute inset-0 h-full w-full border-0"
          title={iframeTitle}
        />
      ) : (
        <>
          <Image src={posterUrl} alt="" fill loading="lazy" sizes="(min-width: 1024px) 50vw, calc(100vw - 32px)" className="object-cover" />
          {playLabel && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={playLabel}
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
