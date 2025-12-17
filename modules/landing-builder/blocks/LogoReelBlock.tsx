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
      className="bg-muted py-12 md:py-16"
      data-testid="block-logo-reel"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {placeholderLogos ? (
            placeholderLogos.map((_, index) => (
              <div
                key={index}
                className="h-8 md:h-12 w-32 md:w-48 bg-muted-foreground/20 rounded-md"
                data-testid={`logo-placeholder-${index}`}
              />
            ))
          ) : (
            logos.map((logo, index) => (
              <img
                key={index}
                src={logo.sourceUrl}
                alt={logo.altText || `Partner logo ${index + 1}`}
                className="h-8 md:h-12 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                data-testid={`logo-${index}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
