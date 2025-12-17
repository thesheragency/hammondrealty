/**
 * Video Section Block
 * 
 * Split layout with content on left and video player on right.
 * Uses design system typography and Button components.
 */

import type { VideoSectionBlock as VideoSectionBlockType } from '../types';
import { Button } from '@/components/ui/button';
import { Check, Phone, Play } from 'lucide-react';

interface Props {
  block: VideoSectionBlockType;
}

export function VideoSectionBlock({ block }: Props) {
  const bulletPoints = block.bulletPoints || [];

  return (
    <section className="bg-background py-16 md:py-24" data-testid="block-video-section">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <div>
            {block.headline && (
              <h2 className="text-h2 mb-6">{block.headline}</h2>
            )}

            {bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-8">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-6 w-6 flex-shrink-0 text-brand" />
                    <span className="text-body text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {(block.ctaText || block.secondaryCtaText) && (
              <div className="flex flex-wrap gap-3">
                {block.ctaText && block.ctaUrl && (
                  <Button asChild size="lg">
                    <a href={block.ctaUrl}>{block.ctaText}</a>
                  </Button>
                )}
                {block.secondaryCtaText && block.secondaryCtaUrl && (
                  <Button asChild size="lg" variant="outline">
                    <a href={block.secondaryCtaUrl} className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {block.secondaryCtaText}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right side - Video */}
          <div>
            <div 
              className="relative aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer group"
              data-testid="video-player"
            >
              {block.videoThumbnail?.sourceUrl ? (
                <img
                  src={block.videoThumbnail.sourceUrl}
                  alt={block.videoThumbnail.altText || 'Video thumbnail'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : null}
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="h-6 w-6 text-foreground fill-foreground ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
