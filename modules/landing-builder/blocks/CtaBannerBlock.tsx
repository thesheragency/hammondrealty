/**
 * CTA Banner Block
 * 
 * Full-width call-to-action banner with primary and optional secondary buttons.
 * Uses design system typography and Button components.
 */

import type { CtaBannerBlock as CtaBannerBlockType } from '../types';
import { Button } from '@/components/ui/button';

interface Props {
  block: CtaBannerBlockType;
}

const bgColorClasses = {
  brand: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  dark: 'bg-foreground text-background',
} as const;

export function CtaBannerBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'brand';
  const hasPrimaryCta = block.primaryCtaText && block.primaryCtaUrl;
  const hasSecondaryCta = block.secondaryCtaText && block.secondaryCtaUrl;

  return (
    <section
      className={`py-16 md:py-24 ${bgColorClasses[bgColor]}`}
      data-testid="block-cta-banner"
    >
      <div className="container mx-auto px-4 max-w-7xl text-center">
        {block.headline && (
          <h2 className="text-h2 mb-4" data-testid="cta-headline">
            {block.headline}
          </h2>
        )}

        {block.description && (
          <p className="text-body-lg mb-8 max-w-2xl mx-auto opacity-90" data-testid="cta-description">
            {block.description}
          </p>
        )}

        {(hasPrimaryCta || hasSecondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasPrimaryCta && (
              <Button
                asChild
                size="lg"
                variant="secondary"
                data-testid="cta-primary-button"
              >
                <a href={block.primaryCtaUrl}>{block.primaryCtaText}</a>
              </Button>
            )}
            {hasSecondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-current text-current hover:bg-white/10"
                data-testid="cta-secondary-button"
              >
                <a href={block.secondaryCtaUrl}>{block.secondaryCtaText}</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
