/**
 * Logo Reel Block
 * 
 * Horizontal row of partner/client logos.
 * Uses design system spacing and colors.
 */

import type { LogoReelBlock as LogoReelBlockType } from '../types';

interface Props {
  block: LogoReelBlockType;
}

export function LogoReelBlock({ block }: Props) {
  const logos = block.logos || [];
  const placeholderLogos = logos.length === 0 ? Array(6).fill(null) : null;

  return (
    <section
      className="bg-muted py-16"
      data-testid="block-logo-reel"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {placeholderLogos ? (
            placeholderLogos.map((_, index) => (
              <div
                key={index}
                className="h-7 lg:h-10 w-28 lg:w-40 bg-muted-foreground/20 rounded"
                data-testid={`logo-placeholder-${index}`}
              />
            ))
          ) : (
            logos.map((logo, index) => (
              <img
                key={index}
                src={logo.sourceUrl}
                alt={logo.altText || `Partner logo ${index + 1}`}
                className="h-7 lg:h-10 w-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all"
                data-testid={`logo-${index}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
