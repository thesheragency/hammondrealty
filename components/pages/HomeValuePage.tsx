"use client";

import { useRouter } from "next/navigation";
import { tc } from "@/lib/title-case";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, BadgeCheck, Video, TrendingUp, Wallet, CalendarRange, LineChart, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GravityFormClient } from "@/components/forms/GravityFormClient";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";
import { imgUrl } from "@/lib/wp-acf";

const heroBedroomUrl = "/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";
const heroGraphicUrl = "/images/graphic-hero_section_1779377398567.png";

const iconMap: Record<string, typeof BadgeCheck> = {
  BadgeCheck,
  Video,
  TrendingUp,
  Wallet,
  CalendarRange,
  LineChart,
  Compass,
};

const defaultWhatYouGet = [
  {
    icon: BadgeCheck,
    title: "Expert Analysis",
    desc: "A professional evaluation of condition, location, and neighborhood competition instead of a generic online guess.",
  },
  {
    icon: Video,
    title: "Custom Video Explanation",
    desc: "A clear video detailing the exact math behind the property numbers in plain English.",
  },
  {
    icon: TrendingUp,
    title: "Market-Driven Valuation",
    desc: "A realistic written breakdown of comparable sales, pricing strategy, and current buyer demand.",
  },
];

const defaultHowItWorks = [
  {
    num: "01",
    title: "Complete The Form",
    desc: "Share a few basic property details on this page to initiate the research.",
  },
  {
    num: "02",
    title: "Local Data Research",
    desc: "Neighborhood market trends, active listings, and recent sales are personally reviewed to build a precise valuation report.",
  },
  {
    num: "03",
    title: "Receive Your Breakdown",
    desc: "A comprehensive report along with a custom video explanation is delivered within one business day.",
  },
];

const defaultNotSelling = [
  {
    icon: Wallet,
    title: "Know Your Equity",
    desc: "Understand exactly what the property is worth and see the total equity built over time.",
  },
  {
    icon: CalendarRange,
    title: "Plan Smarter",
    desc: "Use accurate sales metrics to plan future renovations, refinancing, or an eventual move on your terms.",
  },
  {
    icon: LineChart,
    title: "Stay Ahead Of The Market",
    desc: "Track real-time shifts before changing neighborhood conditions affect your primary asset.",
  },
  {
    icon: Compass,
    title: "Ditch The Guesswork",
    desc: "Replace automated online estimates and neighborhood rumors with a real human-vetted number.",
  },
];

export default function HomeValue({ acf }: { acf?: Record<string, any> | null }) {
  const mapIcons = (items: any[], defaults: typeof defaultWhatYouGet) =>
    items.map((item, i) => ({
      ...item,
      icon: iconMap[item.icon] || defaults[i % defaults.length]?.icon || BadgeCheck,
    }));
  const whatYouGet = acf?.whatYouGet?.length ? mapIcons(acf.whatYouGet, defaultWhatYouGet) : defaultWhatYouGet;
  const howItWorks: typeof defaultHowItWorks = acf?.howItWorks?.length ? acf.howItWorks : defaultHowItWorks;
  const notSelling = acf?.notSelling?.length ? mapIcons(acf.notSelling, defaultNotSelling) : defaultNotSelling;
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative z-20 bg-foreground text-white">
          <img
            src={imgUrl(acf?.heroImage, heroBedroomUrl)}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40 select-none"
          />
          <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-12 md:pt-16 pb-0">
            <motion.div
              className="max-w-3xl mx-auto text-left sm:text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/70 mb-4">
                {acf?.heroEyebrow || "Free Home Value Analysis"}
              </p>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
                {tc(acf?.heroHeading) || "What Is Your Home Worth?"}
              </h1>
              <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed max-w-2xl sm:mx-auto">{acf?.heroBody || "Get a personalized, data-driven property valuation backed by real local statistics, not automated online estimates. Free. No obligation. "}</p>
              <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4">
                <Button
                  asChild
                  className="bg-white text-foreground hover:bg-white/90 border-transparent no-default-hover-elevate no-default-active-elevate rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-6 h-[45px]"
                >
                  <a href={acf?.heroCtaLink || "#value-form"}>{acf?.heroCtaText || "Get Your Home Value"}</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative aspect-video max-w-4xl min-[1600px]:max-w-5xl mx-auto -mt-14 md:-mt-48 translate-y-1/2 overflow-hidden bg-muted/10 border border-white/10 group cursor-pointer shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <img
                src={imgUrl(acf?.heroImage, heroBedroomUrl)}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What You Get */}
        <motion.section
          className="relative z-10 bg-background pt-[200px] md:pt-[360px] pb-24 md:pb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-left sm:text-center max-w-2xl sm:mx-auto mb-16">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {tc(acf?.whatYouGetHeading) || "What You Get"}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {acf?.whatYouGetSubtitle || "A clear read on property value, built by hand, not by an algorithm."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {whatYouGet.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="text-left sm:text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 sm:mx-auto mb-6 flex items-center justify-center bg-primary/10 text-primary">
                    <item.icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed max-w-xs sm:mx-auto">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How the Free Home Value Report Works */}
        <motion.section
          className="bg-background py-20 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: heading */}
              <div className="lg:sticky lg:top-32">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  The Process
                </p>
                <h2 className="font-sans text-4xl md:text-5xl font-bold leading-tight mb-5">
                  {tc(acf?.howItWorksHeading) || "Here Is How It Works"}
                </h2>
                <p className="text-foreground/60 leading-relaxed max-w-sm">
                  {acf?.howItWorksSubtitle || "Accurate analysis delivered straight to your inbox within 24 hours."}
                </p>
              </div>

              {/* Right: steps */}
              <div className="divide-y divide-foreground/10">
                {howItWorks.map((step, i) => (
                  <motion.div
                    key={step.title}
                    className="flex flex-col gap-3 py-8 first:pt-0 last:pb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                  >
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary font-medium">
                      {step.num}
                    </span>
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-foreground leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-foreground/60 leading-relaxed text-sm md:text-base">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Home Value Analysis Form */}
        <motion.section
          id="value-form"
          className="bg-muted py-12 md:py-16 scroll-mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center max-w-5xl min-[1600px]:max-w-[1200px] mx-auto">
              <div className="lg:sticky lg:top-32">
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.formEyebrow || "Get Started"}
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {acf?.formHeading ? tc(acf.formHeading) : (<>Request Your<br />Custom Valuation</>)}
                </h2>
                <p className="text-foreground/70 leading-relaxed text-lg max-w-md">
                  {acf?.formBody || "Share a few details to receive a personalized written property report with zero algorithms or guesswork."}
                </p>
              </div>

              <div className="bg-background p-8 md:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-primary text-primary-foreground">
                    <BadgeCheck className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-3">
                    {tc(acf?.formSuccessHeading) || "Thanks, the Details Have Been Received."}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {acf?.formSuccessBody || "Your personalized home value report and custom video breakdown will be delivered within one business day."}
                  </p>
                </div>
              ) : (
                <GravityFormClient
                  formId={2}
                  className="space-y-5"
                  onSuccess={(c) => { if (c.url) { router.push(c.url); } else { setSubmitted(true); } }}
                />
              )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Not Selling Yet? */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-left sm:text-center max-w-2xl sm:mx-auto mb-16">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {tc(acf?.notSellingHeading) || "Not Selling Yet? That's Okay."}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {acf?.notSellingSubtitle || "Tracking property equity is a smart way to plan ahead. Knowing true property value helps build long-term plans with confidence. The smartest homeowners always start tracking market details early."}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
              {notSelling.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="text-left sm:text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 sm:mx-auto mb-6 flex items-center justify-center bg-primary/10 text-primary">
                    <item.icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed max-w-xs sm:mx-auto">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <CtaSection
          eyebrow={acf?.ctaEyebrow || "Free Home Value Analysis"}
          heading={tc(acf?.ctaHeading) || "Get A Custom Home Value Report Today"}
          body={acf?.ctaBody || "A free, private property valuation built straight from local market data and delivered directly to your inbox."}
          primaryLabel={acf?.ctaPrimaryLabel || "Contact Blake"}
          {...(acf?.ctaSecondaryLabel ? { secondaryLabel: acf.ctaSecondaryLabel } : {})}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
