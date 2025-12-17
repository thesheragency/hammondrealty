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
  const hasLogos = logos.length > 0;

  return (
    <section
      className="bg-muted py-12 lg:py-16"
      data-testid="block-logo-reel"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        {hasLogos ? (
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.sourceUrl}
                alt={logo.altText || `Partner logo ${index + 1}`}
                className="h-7 lg:h-10 w-auto object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all"
                data-testid={`logo-${index}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-small text-muted-foreground uppercase tracking-widest">
              Trusted by leading companies worldwide
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
