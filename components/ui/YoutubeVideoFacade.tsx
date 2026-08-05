"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface YoutubeVideoFacadeProps {
  videoId: string;
  title?: string;
  /** Kept for API compatibility — not used since we embed directly. */
  thumbSrc?: string;
  thumbAlt?: string;
  aspectRatio?: string;
}

// Extend Window to hold the YouTube IFrame API globals
declare global {
  interface Window {
    YT: typeof YT & { Player: typeof YT.Player };
    onYouTubeIframeAPIReady: (() => void) | undefined;
    _ytApiLoading?: boolean;
  }
}

let ytApiReady = false;
const ytReadyCallbacks: Array<() => void> = [];

function loadYouTubeAPI(cb: () => void) {
  if (ytApiReady) { cb(); return; }
  ytReadyCallbacks.push(cb);
  if (window._ytApiLoading) return;
  window._ytApiLoading = true;

  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    ytApiReady = true;
    ytReadyCallbacks.forEach((fn) => fn());
    ytReadyCallbacks.length = 0;
    prev?.();
  };

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(tag);
}

/**
 * Muted-autoplay YouTube embed using the IFrame Player API.
 * The play button overlay stays permanently visible.
 * Clicking it opens the video on YouTube so the viewer can watch with sound.
 */
export default function YoutubeVideoFacade({
  videoId,
  title = "Watch video",
  aspectRatio = "aspect-[4/3]",
}: YoutubeVideoFacadeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    let destroyed = false;

    loadYouTubeAPI(() => {
      if (destroyed || !containerRef.current) return;

      // Create a div for the player inside the container
      const div = document.createElement("div");
      containerRef.current.appendChild(div);

      playerRef.current = new window.YT.Player(div, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady(event: any) {
            if (destroyed) return;
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    });

    return () => {
      destroyed = true;
      try { playerRef.current?.destroy(); } catch {}
      playerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div className={`relative ${aspectRatio} overflow-hidden bg-black`}>
      {/* YouTube player mounts here */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_iframe]:pointer-events-none"
      />

      {/* Scrim for play button legibility */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Play button — always visible, opens YouTube with sound */}
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} on YouTube`}
        className="absolute inset-0 flex items-center justify-center group"
      >
        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
          <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
        </div>
      </a>
    </div>
  );
}
