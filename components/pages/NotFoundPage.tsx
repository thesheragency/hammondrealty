"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function NotFound() {
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
                Error 404
              </p>

              <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Page Not Found.
              </h1>

              <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-md sm:mx-auto mb-10">
                The page you are looking for does not exist or is no longer
                available. Let's get you back to exploring your next move.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-center gap-4">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-8 h-[45px]"
                >
                  <Link href="/">Back To Home</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-8 h-[45px]"
                >
                  <Link href="/connect">Contact Blake</Link>
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
