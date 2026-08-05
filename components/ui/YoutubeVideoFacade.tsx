"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

interface YoutubeVideoFacadeProps {
  videoId: string;
  title?: string;
  /** Custom thumbnail URL. Falls back to YouTube's maxresdefault. */
  thumbSrc?: string;
  thumbAlt?: string;
  aspectRatio?: string;
}

/**
 * Renders a static YouTube thumbnail + play button overlay.
 * The real iframe is only mounted after the user clicks play,
 * which eliminates the ~1MB of YouTube scripts from initial load.
 */
export default function YoutubeVideoFacade({
  videoId,
  title = "Watch video",
  thumbSrc,
  thumbAlt,
  aspectRatio = "aspect-[4/3]",
}: YoutubeVideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  const thumbnail = thumbSrc || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className={`relative ${aspectRatio} overflow-hidden bg-black`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={`relative ${aspectRatio} overflow-hidden bg-muted`}>
      <Image
        src={thumbnail}
        alt={thumbAlt || title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      {/* Subtle dark scrim for play button legibility */}
      <div className="absolute inset-0 bg-black/20" />
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play ${title}`}
        className="absolute inset-0 w-full h-full group cursor-pointer flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
          <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
        </div>
      </button>
    </div>
  );
}
