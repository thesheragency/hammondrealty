/**
 * Testimonials Block
 * 
 * Grid of testimonial cards with quotes and avatars.
 * Uses design system typography and Card components.
 */

import type { TestimonialsBlock as TestimonialsBlockType } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
  block: TestimonialsBlockType;
}

export function TestimonialsBlock({ block }: Props) {
  const testimonials = block.testimonials || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-24 lg:py-36" data-testid="block-testimonials">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        {/* Header */}
        {(block.sectionTitle || block.sectionDescription) && (
          <div className="text-center mb-16 max-w-[640px] mx-auto">
            {block.sectionTitle && (
              <h2 className="text-h2 mb-4" data-testid="testimonials-title">
                {block.sectionTitle}
              </h2>
            )}
            {block.sectionDescription && (
              <p className="text-body text-muted-foreground">
                {block.sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Testimonials Grid - 3 columns on large screens */}
        <div className="grid gap-8 lg:gap-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border"
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8">
                {testimonial.quote && (
                  <blockquote className="text-body-lg text-foreground mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                )}

                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    {testimonial.authorImage?.sourceUrl ? (
                      <AvatarImage
                        src={testimonial.authorImage.sourceUrl}
                        alt={testimonial.authorImage.altText || testimonial.authorName || ''}
                      />
                    ) : null}
                    <AvatarFallback className="text-body font-semibold">
                      {testimonial.authorName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  
                  {testimonial.authorName && (
                    <p className="text-body font-semibold">{testimonial.authorName}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
