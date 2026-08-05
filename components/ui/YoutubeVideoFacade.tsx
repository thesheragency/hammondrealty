"use client";

import { Play } from "lucide-react";

interface YoutubeVideoFacadeProps {
  videoId: string;
  title?: string;
  /** Custom thumbnail URL — no longer used but kept for API compatibility. */
  thumbSrc?: string;
  thumbAlt?: string;
  aspectRatio?: string;
}

/**
 * Embeds a YouTube video that autoplays muted on mount.
 * A play button overlay stays visible; clicking it opens the video on YouTube
 * so the user can watch with sound.
 */
export default function YoutubeVideoFacade({
  videoId,
  title = "Watch video",
  aspectRatio = "aspect-[4/3]",
}: YoutubeVideoFacadeProps) {
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&modestbranding=1&controls=0&loop=1&playlist=${videoId}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className={`relative ${aspectRatio} overflow-hidden bg-black`}>
      {/* Autoplaying muted iframe */}
      <iframe
        src={embedSrc}
        title={title}
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {/* Subtle dark scrim for play button legibility */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Play button overlay — always visible, opens YouTube on click */}
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${title} on YouTube`}
        className="absolute inset-0 w-full h-full group flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
          <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
        </div>
      </a>
    </div>
  );
}
