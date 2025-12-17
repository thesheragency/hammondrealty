/**
 * Hero Section Block
 * 
 * Hero with optional rating, headline, bullet points, and CTAs.
 * Uses design system typography and components.
 */

import type { HeroBlock as HeroBlockType } from '../types';
import { Button } from '@/components/ui/button';
import { Check, Star, Phone } from 'lucide-react';

interface Props {
  block: HeroBlockType;
}

export function HeroBlock({ block }: Props) {
  const hasBackgroundImage = !!block.backgroundImage?.sourceUrl;
  const bulletPoints = block.bulletPoints || [];

  return (
    <section
      className={`relative py-24 lg:py-36 ${hasBackgroundImage ? '' : 'bg-background'}`}
      data-testid="block-hero"
    >
      {hasBackgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${block.backgroundImage?.sourceUrl})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        </>
      )}

      <div className="container relative mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className="max-w-[680px]">
          {/* Rating badge */}
          {block.showRating && (
            <div className="mb-6">
              <p className="text-small text-muted-foreground mb-3">
                {block.ratingText || 'Based on 300+ Reviews on'}
              </p>
              <div className="flex items-center gap-4 h-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-foreground text-foreground" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Headline */}
          {block.headline && (
            <h1
              className={`text-h1 mb-6 max-w-[680px] ${hasBackgroundImage ? 'text-white' : 'text-foreground'}`}
              data-testid="hero-headline"
            >
              {block.headline}
            </h1>
          )}

          {/* Subheadline */}
          {block.subheadline && (
            <p
              className={`text-body-lg mb-8 max-w-[520px] ${hasBackgroundImage ? 'text-white/90' : 'text-muted-foreground'}`}
              data-testid="hero-subheadline"
            >
              {block.subheadline}
            </p>
          )}

          {/* Bullet points */}
          {bulletPoints.length > 0 && (
            <ul className="space-y-4 mb-10">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className={`h-6 w-6 flex-shrink-0 mt-0.5 ${hasBackgroundImage ? 'text-white' : 'text-foreground'}`} />
                  <span className={`text-body ${hasBackgroundImage ? 'text-white' : 'text-foreground'}`}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CTA Buttons */}
          {(block.ctaText || block.secondaryCtaText) && (
            <div className="flex flex-wrap gap-6">
              {block.ctaText && block.ctaUrl && (
                <Button asChild size="lg" data-testid="hero-cta">
                  <a href={block.ctaUrl}>{block.ctaText}</a>
                </Button>
              )}
              {block.secondaryCtaText && block.secondaryCtaUrl && (
                <Button asChild size="lg" variant="outline" data-testid="hero-secondary-cta">
                  <a href={block.secondaryCtaUrl} className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {block.secondaryCtaText}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
