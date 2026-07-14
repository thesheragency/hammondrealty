"use client";

import { motion } from "framer-motion";
import { Play, CalendarCheck } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function Booked({ acf }: { acf?: Record<string, any> | null }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="bg-muted py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 mb-6 text-xs uppercase tracking-[0.3em] font-medium">
                <CalendarCheck className="w-4 h-4" strokeWidth={2} />
                {acf?.badge || "Call Booked"}
              </div>

              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                {acf?.heading ? acf.heading : (<>Watch This Video<br />Before Our Call</>)}
              </h1>

              <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-10">
                {acf?.body || "You are all set. Take 4 minutes to watch this short walkthrough video. It will help make our upcoming conversation faster, smoother, and much more useful for your planning."}
              </p>

              {/* Video placeholder */}
              <div className="relative aspect-video w-full max-w-3xl mx-auto bg-foreground/80 shadow-2xl mb-10 group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-background/95 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play
                      className="w-8 h-8 md:w-10 md:h-10 text-foreground ml-1"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </div>
                </div>
              </div>

              <a
                href={acf?.buttonLink || "/"}
                className="inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto h-[45px] px-8"
              >
                {acf?.buttonText || "Back to Home"}
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
