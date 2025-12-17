/**
 * Testimonials Block
 * 
 * Display customer testimonials in grid or carousel layout.
 */

import type { TestimonialsBlock as TestimonialsBlockType } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface Props {
  block: TestimonialsBlockType;
}

const bgColorClasses = {
  default: 'bg-background',
  muted: 'bg-muted',
  card: 'bg-card',
} as const;

export function TestimonialsBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'default';
  const testimonials = block.testimonials || [];
  const layout = block.layout || 'grid';

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={`py-16 md:py-24 ${bgColorClasses[bgColor]}`}
      data-testid="block-testimonials"
    >
      <div className="container mx-auto px-4">
        {block.sectionTitle && (
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            data-testid="testimonials-title"
          >
            {block.sectionTitle}
          </h2>
        )}

        <div
          className={
            layout === 'grid'
              ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
              : 'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4'
          }
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border-card-border ${layout === 'carousel' ? 'flex-shrink-0 w-80 snap-center' : ''}`}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {testimonial.quote && (
                  <blockquote className="text-lg mb-6 text-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                )}

                <div className="flex items-center gap-3">
                  <Avatar>
                    {testimonial.authorImage?.sourceUrl ? (
                      <AvatarImage
                        src={testimonial.authorImage.sourceUrl}
                        alt={testimonial.authorImage.altText || testimonial.authorName || ''}
                      />
                    ) : null}
                    <AvatarFallback>
                      {testimonial.authorName?.charAt(0) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    {testimonial.authorName && (
                      <p className="font-semibold">{testimonial.authorName}</p>
                    )}
                    {testimonial.authorTitle && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.authorTitle}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
