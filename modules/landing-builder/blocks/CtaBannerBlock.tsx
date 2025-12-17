/**
 * CTA Banner Block
 * 
 * Full-width call-to-action banner with primary and optional secondary buttons.
 * Features gradient backgrounds, decorative elements, and engaging animations.
 */

import type { CtaBannerBlock as CtaBannerBlockType } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

interface Props {
  block: CtaBannerBlockType;
}

const bgColorClasses = {
  brand: 'bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground',
  accent: 'bg-gradient-to-r from-accent via-accent to-accent/90 text-accent-foreground',
  dark: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white',
} as const;

export function CtaBannerBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'brand';
  const hasPrimaryCta = block.primaryCtaText && block.primaryCtaUrl;
  const hasSecondaryCta = block.secondaryCtaText && block.secondaryCtaUrl;

  return (
    <section
      className={`relative py-20 md:py-28 overflow-hidden ${bgColorClasses[bgColor]}`}
      data-testid="block-cta-banner"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-x-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Zap className="h-8 w-8" />
          </div>

          {block.headline && (
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
              data-testid="cta-headline"
            >
              {block.headline}
            </h2>
          )}

          {block.description && (
            <p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed"
              data-testid="cta-description"
            >
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
                  className="text-base px-8 py-6 h-auto group shadow-lg"
                  data-testid="cta-primary-button"
                >
                  <a href={block.primaryCtaUrl} className="flex items-center gap-2">
                    {block.primaryCtaText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              )}
              {hasSecondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 h-auto border-white/30 text-current hover:bg-white/10 backdrop-blur-sm"
                  data-testid="cta-secondary-button"
                >
                  <a href={block.secondaryCtaUrl}>{block.secondaryCtaText}</a>
                </Button>
              )}
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold">10K+</div>
              <div className="text-sm opacity-70 mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">99%</div>
              <div className="text-sm opacity-70 mt-1">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">24/7</div>
              <div className="text-sm opacity-70 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
