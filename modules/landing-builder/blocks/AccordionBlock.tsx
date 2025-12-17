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
          <AccordionTrigger className="text-h5 text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-body text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  if (layout === 'split') {
    return (
      <section className="bg-background py-16 md:py-24" data-testid="block-accordion">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left side - Title and CTA */}
            <div className="lg:col-span-2">
              {block.sectionTitle && (
                <h2 className="text-h2 mb-6">{block.sectionTitle}</h2>
              )}
              {block.sectionDescription && (
                <p className="text-body text-muted-foreground mb-8">
                  {block.sectionDescription}
                </p>
              )}
              {block.ctaText && block.ctaUrl && (
                <Button asChild size="lg">
                  <a href={block.ctaUrl}>{block.ctaText}</a>
                </Button>
              )}
            </div>

            {/* Right side - Accordion */}
            <div className="lg:col-span-3">
              <AccordionList />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Centered layout
  return (
    <section className="bg-background py-16 md:py-24" data-testid="block-accordion">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mx-auto">
          {(block.sectionTitle || block.sectionDescription) && (
            <div className="text-center mb-12">
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
            <div className="flex flex-wrap justify-center gap-3 mt-12">
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
