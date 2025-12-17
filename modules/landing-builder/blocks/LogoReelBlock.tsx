/**
 * Logo Reel Block
 * 
 * Horizontal row of partner/client logos.
 * Uses design system spacing and colors.
 */

import type { LogoReelBlock as LogoReelBlockType } from '../types';
import { layout } from '../layout';

interface Props {
  block: LogoReelBlockType;
}

const PLACEHOLDER_LOGOS = [
  'Acme Co',
  'Globex',
  'Initech',
  'Umbrella',
  'Hooli',
  'Massive Dynamic',
];

export function LogoReelBlock({ block }: Props) {
  const logos = block.logos || [];
  const hasLogos = logos.length > 0;

  return (
    <section
      className={`bg-muted ${layout.section.padding}`}
      data-testid="block-logo-reel"
    >
      <div className={layout.container.full}>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {hasLogos ? (
            logos.map((logo, index) => (
              <img
                key={index}
                src={logo.sourceUrl}
                alt={logo.altText || `Partner logo ${index + 1}`}
                className="h-8 lg:h-10 w-auto object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                data-testid={`logo-${index}`}
              />
            ))
          ) : (
            PLACEHOLDER_LOGOS.map((name, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-8 lg:h-10 px-4 lg:px-6 bg-muted-foreground/10 rounded-md"
                data-testid={`logo-placeholder-${index}`}
              >
                <span className="text-small font-medium text-muted-foreground/50 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
