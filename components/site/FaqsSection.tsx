"use client";

import { motion } from "framer-motion";
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
  faqs?: Faq[];
  intro?: string;
}

const defaultFaqs: Faq[] = [
  {
    q: "How does the Home Prep Selling Program work?",
    a: "The program fronts the entire cost of updates, staging, and cosmetic repairs that drive a premium sale price. Homeowners pay nothing upfront, and the renovation investment is settled comfortably at closing out of your sale proceeds.",
  },
  {
    q: "What geographic areas are covered?",
    a: "We serve the greater Sacramento region, including Sacramento, Placer, Yuba, Sutter, Nevada, and El Dorado counties.",
  },
  {
    q: "How long does it take to sell a home?",
    a: "The baseline average is 11 days on market with a 102% list-to-sale ratio, running well ahead of standard regional benchmarks. Timelines vary based on price point, condition, and current market conditions.",
  },
  {
    q: "Do you work with first-time buyers?",
    a: "Yes, absolutely. First-time buyers receive complete guidance from pre-approval to closing day, including lender introductions, neighborhood market data, and competitive offer strategy.",
  },
  {
    q: "What does the commission structure look like?",
    a: "Commission is completely transparent and tailored directly to the specific scope of service. The numbers are reviewed in detail during the initial consultation with zero hidden fees.",
  },
];

export default function FaqsSection({
  faqs = defaultFaqs,
  intro = "Common questions from local homeowners. Don't see yours? Get in touch, a personal walkthrough is always available.",
}: FaqsSectionProps) {
  return (
    <motion.section
      className="relative overflow-hidden bg-muted pt-12 pb-4 md:py-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <img
        src={faqBackdropUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-40 top-1/2 -translate-y-1/2 w-[640px] md:w-[820px] lg:w-[980px] opacity-[0.07] z-0"
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
                      <AccordionTrigger className="text-left font-sans text-lg md:text-xl font-bold py-6 hover:no-underline">
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
    </motion.section>
  );
}
