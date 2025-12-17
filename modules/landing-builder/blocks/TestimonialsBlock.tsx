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
    <section className="bg-background py-16 md:py-24" data-testid="block-testimonials">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        {(block.sectionTitle || block.sectionDescription) && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
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

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border"
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-6 md:p-8">
                {testimonial.quote && (
                  <blockquote className="text-body text-foreground mb-6">
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
