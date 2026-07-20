"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tc } from "@/lib/title-case";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function ThankYou({ acf }: { acf?: Record<string, any> | null }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1 flex items-center justify-center">
        <motion.section
          className="w-full py-20 md:py-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto text-left sm:text-center">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                {acf?.eyebrow || "Message Received"}
              </p>

              <h1 className="text-h1 font-bold leading-[1.05] tracking-tight mb-6">
                {tc(acf?.heading) || "Thank You."}
              </h1>

              <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-md sm:mx-auto mb-10">
                {acf?.body || "Your submission has been received. A personal response will be sent to your inbox shortly to discuss your property goals."}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-center gap-4">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-8 h-[45px]"
                >
                  <Link href={acf?.buttonLink || "/"}>
                    {acf?.buttonText || "Back To Home"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
