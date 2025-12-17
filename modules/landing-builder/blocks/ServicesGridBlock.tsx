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
    <section className="bg-background py-24 lg:py-36" data-testid="block-services-grid">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          {block.sectionTitle && (
            <h2 className="text-h2 max-w-[640px]">{block.sectionTitle}</h2>
          )}
          {block.sectionDescription && (
            <p className="text-body text-muted-foreground max-w-[480px]">
              {block.sectionDescription}
            </p>
          )}
        </div>

        {/* Services Grid - 3:4 aspect ratio cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.linkUrl || '#'}
              className="group block"
              data-testid={`service-card-${index}`}
            >
              <Card className="relative aspect-[3/4] overflow-hidden border-0 rounded-xl">
                {/* Background Image */}
                {service.image?.sourceUrl ? (
                  <img
                    src={service.image.sourceUrl}
                    alt={service.image.altText || service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted" />
                )}
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-h3 text-white mb-3">{service.title}</h3>
                  <span className="text-body text-white/90 underline underline-offset-4 group-hover:text-white transition-colors">
                    Learn More &gt;
                  </span>
                </div>
              </Card>
            </a>
          ))}

          {/* Custom Quote Card */}
          {block.showCustomQuote && (
            <Card
              className="relative aspect-[3/4] flex flex-col items-center justify-center p-8 text-center bg-foreground border-0 rounded-xl"
              data-testid="custom-quote-card"
            >
              <h3 className="text-h3 text-background mb-8 leading-tight max-w-[240px]">
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
