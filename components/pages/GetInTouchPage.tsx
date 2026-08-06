"use client";

import { useRouter } from "next/navigation";
import { tc } from "@/lib/title-case";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { GravityFormClient } from "@/components/forms/GravityFormClient";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import Image from "next/image";
import { imgUrl } from "@/lib/wp-acf";

const heroBedroomUrl = "/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";

export default function GetInTouch({ acf }: { acf?: Record<string, any> | null }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        {/* Hero with embedded form */}
        <section className="relative bg-foreground text-white overflow-hidden">
          <Image
            src={imgUrl(acf?.heroImage, heroBedroomUrl)}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover opacity-40 pointer-events-none select-none"
            priority
          />
          <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-center max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/70 mb-5">
                  {acf?.eyebrow || "Get in Touch"}
                </p>
                <h1 className="text-h1 font-bold leading-[1.05] tracking-tight mb-6 text-white">
                  {acf?.heading ? tc(acf.heading) : (<>Let's Talk About<br />Your Next Move.</>)}
                </h1>
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                  {acf?.body || "Whether you are buying, selling, or just exploring the market, every message receives a personal reply. No call centers, no scripts, and no generic answers."}
                </p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mt-5 italic">
                  {acf?.ps || `P.S. In case you are wondering, yes, the hat says "Make Realtors Great Again." And no, it is not political. It is a mindset. This industry is full of mediocrity, and Blake is here to raise the bar.`}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                <div className="bg-background text-foreground p-8 md:p-10 shadow-2xl">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">
                    {acf?.formEyebrow || "Send a Message"}
                  </p>
                  <h3 className="font-sans text-xl font-bold leading-tight mb-6">
                    {tc(acf?.formHeading) || "Tell Us About Your Move."}
                  </h3>
                  <GravityFormClient
                    formId={1}
                    fubSource="Blake Hammond Website - Connect Form"
                    className="space-y-4"
                    onSuccess={(c) => { router.push(c.url || '/thank-you/contact'); }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl min-[1600px]:max-w-[1100px] mx-auto">
              <div className="bg-background p-8 md:p-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary text-white">
                  <Mail className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl font-bold mb-3">
                  {tc(acf?.emailCardTitle) || "Email Anytime"}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  {acf?.emailCardDesc || "A direct response will be sent as soon as possible, usually the same day."}
                </p>
                <a
                  href={`mailto:${acf?.email || "blakehammondre@gmail.com"}`}
                  className="font-sans font-semibold text-foreground hover:text-primary transition-colors break-all"
                >
                  {acf?.email || "blakehammondre@gmail.com"}
                </a>
              </div>
              <div className="bg-background p-8 md:p-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary text-white">
                  <Phone className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl font-bold mb-3">
                  {tc(acf?.phoneCardTitle) || "Call or Text"}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  {acf?.phoneCardDesc || "If the line is busy, leave a voicemail or shoot over a text message for a reply within 24 hours."}
                </p>
                <a
                  href={`tel:${(acf?.phone || "9166256118").replace(/[^0-9+]/g, "")}`}
                  className="font-sans font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {acf?.phone || "(916) 625-6118"}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
