/**
 * Services Grid Block
 * 
 * Grid of service cards with image backgrounds and overlays.
 * Uses design system typography and Card components.
 */

import type { ServicesGridBlock as ServicesGridBlockType } from '../types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  block: ServicesGridBlockType;
}

export function ServicesGridBlock({ block }: Props) {
  const services = block.services || [];

  return (
    <section className="bg-background py-16 md:py-24" data-testid="block-services-grid">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          {block.sectionTitle && (
            <h2 className="text-h2 max-w-lg">{block.sectionTitle}</h2>
          )}
          {block.sectionDescription && (
            <p className="text-body text-muted-foreground max-w-lg">
              {block.sectionDescription}
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.linkUrl || '#'}
              className="group block"
              data-testid={`service-card-${index}`}
            >
              <Card className="relative aspect-square overflow-hidden border-0 rounded-lg">
                {/* Background Image */}
                {service.image?.sourceUrl ? (
                  <img
                    src={service.image.sourceUrl}
                    alt={service.image.altText || service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted" />
                )}
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 transition-colors" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-h3 text-white mb-2">{service.title}</h3>
                  <span className="text-body text-white/90 underline group-hover:text-white transition-colors">
                    Learn More &gt;
                  </span>
                </div>
              </Card>
            </a>
          ))}

          {/* Custom Quote Card */}
          {block.showCustomQuote && (
            <Card
              className="relative aspect-square flex flex-col items-center justify-center p-8 text-center bg-foreground border-0 rounded-lg"
              data-testid="custom-quote-card"
            >
              <h3 className="text-h3 text-background mb-6 leading-tight">
                {block.customQuoteText || "Don't See What You're Looking for?"}
              </h3>
              <Button asChild variant="outline" size="lg" className="border-background text-background hover:bg-background/10">
                <a href={block.customQuoteUrl || '#'}>Get Custom Quote</a>
              </Button>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
