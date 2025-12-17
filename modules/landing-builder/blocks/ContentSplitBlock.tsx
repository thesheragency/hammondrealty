/**
 * Content Split Block
 * 
 * Image + Text side by side layout.
 * Uses design system typography and Button components.
 */

import type { ContentSplitBlock as ContentSplitBlockType } from '../types';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface Props {
  block: ContentSplitBlockType;
}

export function ContentSplitBlock({ block }: Props) {
  const imagePosition = block.imagePosition || 'left';
  const imageOnLeft = imagePosition === 'left';

  return (
    <section className="bg-background py-16 md:py-24" data-testid="block-content-split">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${imageOnLeft ? '' : 'lg:flex-row-reverse'}`}>
          {/* Image */}
          <div className={imageOnLeft ? '' : 'lg:order-2'}>
            {block.image?.sourceUrl ? (
              <img
                src={block.image.sourceUrl}
                alt={block.image.altText || ''}
                className="w-full h-auto aspect-[4/3] object-cover rounded-lg"
                data-testid="content-split-image"
              />
            ) : (
              <div className="w-full aspect-[4/3] bg-muted rounded-lg" />
            )}
          </div>

          {/* Content */}
          <div className={imageOnLeft ? '' : 'lg:order-1'}>
            {block.headline && (
              <h2 className="text-h2 mb-6" data-testid="content-split-headline">
                {block.headline}
              </h2>
            )}

            {block.description && (
              <p className="text-body text-muted-foreground mb-8" data-testid="content-split-description">
                {block.description}
              </p>
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
        </div>
      </div>
    </section>
  );
}
