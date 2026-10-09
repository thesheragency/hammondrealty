"use client";

import Image from "next/image";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqBackdropUrl = "/images/graphic-hero_section_1779382669585.png";

export interface Faq {
  q: string;
  a: string;
}

interface FaqsSectionProps {
  onReady?: () => void;
  faqs: Faq[];
  intro: string;
}

export default function FaqIsland({
  onReady,
  faqs,
  intro,
}: FaqsSectionProps) {
  useEffect(() => { onReady?.(); }, [onReady]);
  return (
    <section
      className="relative overflow-hidden bg-muted pt-12 pb-4 md:py-32"
    >
      <Image
        src={faqBackdropUrl}
        alt=""
        aria-hidden="true"
        width={980}
        height={980}
        className="pointer-events-none select-none absolute -left-40 top-1/2 -translate-y-1/2 w-[640px] md:w-[820px] lg:w-[980px] h-auto opacity-[0.07] z-0"
      />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-h2 font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-foreground/70 leading-relaxed">{intro}</p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid">
              <div className="col-start-1 row-start-1">
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-foreground/15">
                      <AccordionTrigger className="text-left font-sans text-lg md:text-xl font-bold py-6 hover:no-underline gap-4">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/70 leading-relaxed pb-6 text-base">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              {/* Invisible sizer: reserves the height of the tallest open state so
                  opening/closing an accordion never shifts the content below. */}
              <div aria-hidden="true" className="col-start-1 row-start-1 invisible pointer-events-none hidden lg:block">
                {faqs.map((f, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-6 border-b">
                    <span className="text-left font-sans text-lg md:text-xl font-bold">{f.q}</span>
                    <span className="h-5 w-5 shrink-0" />
                  </div>
                ))}
                <div className="grid">
                  {faqs.map((f, i) => (
                    <p key={i} className="col-start-1 row-start-1 leading-relaxed pb-6 pt-0 text-base">
                      {f.a}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
