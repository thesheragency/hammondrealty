/**
 * Hero Section Block
 * 
 * Full-width hero section with headline, subheadline, CTA, and background options.
 */

import type { HeroBlock as HeroBlockType } from '../types';
import { Button } from '@/components/ui/button';

interface Props {
  block: HeroBlockType;
}

const bgColorClasses = {
  brand: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  muted: 'bg-muted text-foreground',
  dark: 'bg-gray-900 text-white',
} as const;

const textAlignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
} as const;

export function HeroBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'brand';
  const textAlign = block.textAlign || 'center';
  const hasBackgroundImage = !!block.backgroundImage?.sourceUrl;

  return (
    <section
      className={`relative py-20 md:py-32 ${!hasBackgroundImage ? bgColorClasses[bgColor] : ''}`}
      data-testid="block-hero"
    >
      {hasBackgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${block.backgroundImage?.sourceUrl})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </>
      )}

      <div className={`container relative mx-auto px-4 flex flex-col ${textAlignClasses[textAlign]}`}>
        {block.headline && (
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl ${hasBackgroundImage ? 'text-white' : ''}`}
            data-testid="hero-headline"
          >
            {block.headline}
          </h1>
        )}

        {block.subheadline && (
          <p
            className={`text-lg md:text-xl mb-8 max-w-2xl ${hasBackgroundImage ? 'text-white/90' : 'opacity-90'}`}
            data-testid="hero-subheadline"
          >
            {block.subheadline}
          </p>
        )}

        {block.ctaText && block.ctaUrl && (
          <Button
            asChild
            size="lg"
            variant={hasBackgroundImage || bgColor === 'brand' ? 'secondary' : 'default'}
            data-testid="hero-cta"
          >
            <a href={block.ctaUrl}>{block.ctaText}</a>
          </Button>
        )}
      </div>
    </section>
  );
}
