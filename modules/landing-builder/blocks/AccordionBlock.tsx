/**
 * Accordion Block (FAQ / Problem-Solution)
 * 
 * Expandable accordion items with optional split layout.
 * Uses design system typography and shadcn Accordion.
 */

'use client';

import type { AccordionBlock as AccordionBlockType } from '../types';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Phone } from 'lucide-react';

interface Props {
  block: AccordionBlockType;
}

export function AccordionBlock({ block }: Props) {
  const items = block.items || [];
  const layout = block.layout || 'centered';

  const AccordionList = () => (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-item-${index}`}>
          <AccordionTrigger className="text-h5 text-left py-6">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-body text-muted-foreground pb-6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  if (layout === 'split') {
    return (
      <section className="bg-background py-24 lg:py-36" data-testid="block-accordion">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left side - Title and CTA (fixed width) */}
            <div className="w-full lg:w-[360px] lg:flex-shrink-0">
              {block.sectionTitle && (
                <h2 className="text-h2 mb-6">{block.sectionTitle}</h2>
              )}
              {block.sectionDescription && (
                <p className="text-body text-muted-foreground mb-10">
                  {block.sectionDescription}
                </p>
              )}
              {block.ctaText && block.ctaUrl && (
                <Button asChild size="lg">
                  <a href={block.ctaUrl}>{block.ctaText}</a>
                </Button>
              )}
            </div>

            {/* Right side - Accordion (flexible width) */}
            <div className="flex-1 lg:pl-8">
              <AccordionList />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Centered layout
  return (
    <section className="bg-background py-24 lg:py-36" data-testid="block-accordion">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className="max-w-[800px] mx-auto">
          {(block.sectionTitle || block.sectionDescription) && (
            <div className="text-center mb-20">
              {block.sectionTitle && (
                <h2 className="text-h2 mb-4">{block.sectionTitle}</h2>
              )}
              {block.sectionDescription && (
                <p className="text-body-lg text-muted-foreground">
                  {block.sectionDescription}
                </p>
              )}
            </div>
          )}

          <AccordionList />

          {block.ctaText && block.ctaUrl && (
            <div className="flex flex-wrap justify-center gap-6 mt-16">
              <Button asChild size="lg">
                <a href={block.ctaUrl}>{block.ctaText}</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:+1234567890" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  (123) 456 - 7890
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
