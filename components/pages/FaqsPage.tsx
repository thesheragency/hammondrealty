"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = ["Buying", "Selling", "Home Prep"] as const;
type Category = (typeof categories)[number];

const faqData: Record<Category, { q: string; a: string }[]> = {
  Buying: [
    {
      q: "How much do I need saved to buy a home?",
      a: "Plan for a 3% to 10% down payment, plus 2% to 3% for closing costs. A trusted lender will map out your exact numbers.",
    },
    {
      q: "Should I get pre-approved before we start touring?",
      a: "Yes. It locks in your actual budget and proves to sellers that you are a serious, qualified buyer the moment you submit an offer.",
    },
    {
      q: "How long does it take to find and close on a home?",
      a: "Once an offer is accepted, closing typically takes 30 to 60 days. The upfront search timeline depends entirely on your criteria and inventory.",
    },
    {
      q: "Do you help with off-market or coming-soon listings?",
      a: "Yes. An active professional network uncovers properties before they hit public search apps, giving you an early advantage.",
    },
    {
      q: "What does it cost to work with you as a buyer?",
      a: "All representation and industry commission structures are explained transparently during our very first conversation with zero surprises.",
    },
  ],
  Selling: [
    {
      q: "How do you decide on a list price?",
      a: "Recent neighborhood sales are analyzed, your home's unique features are evaluated, and current buyer demand is measured to set a strategic asking price.",
    },
    {
      q: "What does your prep program include?",
      a: "It covers the initial property consultation, direct contractor coordination, professional staging, and high-end photography and video production.",
    },
    {
      q: "How long does it take to sell?",
      a: "Accurately priced, well-prepared homes typically secure competitive interest within the first few weeks. Timelines are intentionally aligned around your moving goals.",
    },
    {
      q: "What does it cost to list with you?",
      a: "All marketing, representation, and commission structures are reviewed transparently during our first call with zero surprises or restrictive terms.",
    },
    {
      q: "Will you handle showings and feedback?",
      a: "Yes. Every showing is fully coordinated, hosted, and tracked, with direct buyer feedback shared during your regular weekly update.",
    },
  ],
  "Home Prep": [
    {
      q: "How much does the Home Prep Selling Program cost upfront?",
      a: "Absolutely nothing. All vendor and material costs are settled at closing out of your sale proceeds, so you never pay out of pocket.",
    },
    {
      q: "What if my home doesn't end up selling?",
      a: "Complete transparency is maintained regarding the rare scenarios where costs would be owed, and the straightforward agreement is reviewed together before any work begins.",
    },
    {
      q: "How long does the renovation process usually take?",
      a: "Most homes are market-ready within 2 to 4 weeks depending on the scope of the updates. A clear timeline is provided during the initial walkthrough.",
    },
    {
      q: "Do I have to use your renovation contractors?",
      a: "A vetted network is what keeps the program running quickly and smoothly, but any specific parts you prefer to handle yourself can easily be accommodated.",
    },
    {
      q: "Will I be involved in design and approval decisions?",
      a: "Always. You maintain final approval over the project scope, finishes, and budget before work starts, backed by clear weekly progress updates.",
    },
  ],
};

export default function Faqs({
  acf,
  faqs,
}: {
  acf?: Record<string, any> | null;
  faqs?: { question: string; answer: string }[];
}) {
  const [active, setActive] = useState<Category>("Buying");
  const wpItems = faqs?.length ? faqs.map((f) => ({ q: f.question, a: f.answer })) : null;
  const items = wpItems ?? faqData[active];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-10">
                <h1 className="font-sans text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  {acf?.heading || "Frequently Asked Questions"}
                </h1>
                <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-xl mx-auto">
                  {acf?.intro || (
                    <>
                      Clear answers to the questions homeowners, buyers, and sellers ask
                      most when preparing for their next move.
                    </>
                  )}
                </p>
              </div>

              {/* Category pills */}
              {!wpItems && (
                <div className="flex justify-center mb-12">
                  <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-muted rounded-full p-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`px-5 md:px-6 py-2 text-sm font-medium rounded-full transition-all ${
                          active === cat
                            ? "bg-background text-foreground shadow-sm"
                            : "text-foreground/60 hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Accordion */}
              <h2 className="sr-only">Questions and Answers</h2>
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={active}
              >
                {items.map((item, i) => (
                  <AccordionItem
                    key={`${active}-${i}`}
                    value={`item-${i}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="text-left font-sans font-bold text-base md:text-lg py-5 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
