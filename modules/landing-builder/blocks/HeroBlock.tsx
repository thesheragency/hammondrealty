/**
 * Hero Section Block
 * 
 * Full-width hero section with headline, subheadline, CTA, and background options.
 * Features gradient overlays, decorative elements, and responsive design.
 */

import type { HeroBlock as HeroBlockType } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  block: HeroBlockType;
}

const bgColorClasses = {
  brand: 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground',
  accent: 'bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground',
  muted: 'bg-gradient-to-b from-muted to-background text-foreground',
  dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white',
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
      className={`relative py-24 md:py-36 lg:py-44 overflow-hidden ${!hasBackgroundImage ? bgColorClasses[bgColor] : ''}`}
      data-testid="block-hero"
    >
      {/* Background image with overlay */}
      {hasBackgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${block.backgroundImage?.sourceUrl})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" aria-hidden="true" />
        </>
      )}

      {/* Decorative elements */}
      {!hasBackgroundImage && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
        </>
      )}

      <div className={`container relative mx-auto px-4 flex flex-col gap-6 ${textAlignClasses[textAlign]}`}>
        {/* Optional badge/tag */}
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
            hasBackgroundImage 
              ? 'bg-white/10 text-white border border-white/20' 
              : 'bg-white/10 border border-white/20'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Powerful Landing Pages</span>
        </div>

        {block.headline && (
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-5xl leading-tight tracking-tight ${hasBackgroundImage ? 'text-white' : ''}`}
            data-testid="hero-headline"
          >
            {block.headline}
          </h1>
        )}

        {block.subheadline && (
          <p
            className={`text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed ${hasBackgroundImage ? 'text-white/90' : 'opacity-90'}`}
            data-testid="hero-subheadline"
          >
            {block.subheadline}
          </p>
        )}

        {block.ctaText && block.ctaUrl && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              asChild
              size="lg"
              variant={hasBackgroundImage || bgColor === 'brand' ? 'secondary' : 'default'}
              className="text-base px-8 py-6 h-auto group"
              data-testid="hero-cta"
            >
              <a href={block.ctaUrl} className="flex items-center gap-2">
                {block.ctaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className={`text-base px-8 py-6 h-auto ${hasBackgroundImage ? 'border-white/30 text-white hover:bg-white/10' : 'border-current/30 hover:bg-white/10'}`}
            >
              <a href="#learn-more">Learn More</a>
            </Button>
          </div>
        )}

        {/* Trust indicators */}
        <div className={`flex flex-wrap items-center gap-6 mt-8 pt-8 border-t ${hasBackgroundImage ? 'border-white/20' : 'border-white/10'}`}>
          <div className="text-sm opacity-70">Trusted by leading companies</div>
          <div className="flex gap-8 opacity-50">
            <div className="h-6 w-20 bg-current/20 rounded" />
            <div className="h-6 w-24 bg-current/20 rounded" />
            <div className="h-6 w-16 bg-current/20 rounded" />
            <div className="h-6 w-20 bg-current/20 rounded hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
