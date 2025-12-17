/**
 * Testimonials Block
 * 
 * Display customer testimonials in grid or carousel layout.
 * Features elegant cards with quotation styling and author info.
 */

import type { TestimonialsBlock as TestimonialsBlockType } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface Props {
  block: TestimonialsBlockType;
}

const bgColorClasses = {
  default: 'bg-background',
  muted: 'bg-muted/50',
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
      className={`py-20 md:py-28 ${bgColorClasses[bgColor]}`}
      data-testid="block-testimonials"
    >
      <div className="container mx-auto px-4">
        {block.sectionTitle && (
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight"
              data-testid="testimonials-title"
            >
              {block.sectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about their experience
            </p>
          </div>
        )}

        <div
          className={
            layout === 'grid'
              ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
              : 'flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4'
          }
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${layout === 'carousel' ? 'flex-shrink-0 w-[360px] snap-center' : ''}`}
              data-testid={`testimonial-card-${index}`}
            >
              {/* Gradient accent */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

              <div className="relative">
                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                {/* Large opening quote */}
                <div className="absolute -top-2 -left-2 text-7xl font-serif text-primary/10 select-none" aria-hidden="true">
                  "
                </div>
                
                {testimonial.quote && (
                  <blockquote className="text-lg leading-relaxed mb-8 text-foreground relative z-10">
                    {testimonial.quote}
                  </blockquote>
                )}

                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                    {testimonial.authorImage?.sourceUrl ? (
                      <AvatarImage
                        src={testimonial.authorImage.sourceUrl}
                        alt={testimonial.authorImage.altText || testimonial.authorName || ''}
                      />
                    ) : null}
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.authorName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '?'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    {testimonial.authorName && (
                      <p className="font-semibold text-foreground">{testimonial.authorName}</p>
                    )}
                    {testimonial.authorTitle && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.authorTitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
