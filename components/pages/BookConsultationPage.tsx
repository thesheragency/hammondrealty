"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Script from "next/script";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { tc } from "@/lib/title-case";

const CALENDLY_URL =
  "https://calendly.com/blakehammondre/real-estate-consult-with-blake";

const defaultExpectations = [
  {
    title: "A Real Conversation",
    desc: "A quick chat to understand specific family goals and timelines with no pressure and no script.",
  },
  {
    title: "Honest Market Context",
    desc: "Clear property data on where active market buyers are right now and what that means for your equity.",
  },
  {
    title: "A Clear Next Step",
    desc: "Walk away from the conversation with a simple roadmap, whether a move is planned in 30 days or 12 months.",
  },
];

export default function BookConsultation({ acf }: { acf?: Record<string, any> | null }) {
  const expectations = (acf?.expectations?.length ? acf.expectations : defaultExpectations) as { title: string; desc: string }[];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <main className="flex-1">
        <motion.section
          className="bg-background py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">

              {/* Left: copy */}
              <div className="lg:sticky lg:top-32">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  {acf?.eyebrow || "Thanks for reaching out"}
                </p>
                <h1 className="text-h1 font-bold leading-[1.05] tracking-tight mb-6">
                  {acf?.heading ? tc(acf.heading) : (<>Book A 15 Minute<br />Call With Blake</>)}
                </h1>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md mb-8">
                  {acf?.body || "Make your move simple and stress-free. Whether you are buying or selling, this conversation is designed to help you feel confident every step of the way with straightforward, honest communication."}
                </p>

                <ul className="space-y-4 mb-8">
                  {expectations.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="font-sans font-semibold text-base leading-snug">
                          {item.title}
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md">
                  {acf?.body2 || "Pick a time that works for you. Consultations happen by phone or Zoom, depending completely on your preference, and they always start right on time."}
                </p>
              </div>

              {/* Right: Calendly embed */}
              <div className="w-full">
                <div
                  className="calendly-inline-widget w-full"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: 320, height: 700 }}
                  data-testid="embed-calendly"
                />
              </div>

            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
