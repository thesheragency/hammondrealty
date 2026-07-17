"use client";

import { useRouter } from "next/navigation";
import { tc } from "@/lib/title-case";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Shield, MessageSquare, FileCheck, Hammer, Handshake, Play, Lightbulb, BookOpen, DoorOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GravityFormClient } from "@/components/forms/GravityFormClient";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";
import { imgUrl } from "@/lib/wp-acf";

const sellIconMap: Record<string, typeof TrendingUp> = {
  TrendingUp,
  Shield,
  MessageSquare,
  FileCheck,
  Hammer,
  Handshake,
  Lightbulb,
  BookOpen,
  DoorOpen,
};

const heroGraphicUrl = "/images/graphic-hero_section_1779377398567.png";
const stepSelling1Url = "/images/step-selling-1-strategy.png";
const stepSelling2Url = "/images/step-selling-2-stage.png";
const stepSelling3Url = "/images/step-selling-3-offers.png";
const stepSelling4Url = "/images/step-selling-4-market.png";
const zillowLogoUrl = "/images/Zillow_Logo_Primary_RGB_1780067196756.png";
const blakePresentingUrl = "/images/A7407000-2_1782405532776.jpg";
const blakeForSaleUrl = "/images/blake-for-sale.jpg";
const whySellVideoThumbUrl = "/images/why-sell-video-thumb.jpg";
const sellingHouseUrl = "/images/selling-house.png";
const prepLivingroomUrl = "/images/prep-livingroom.png";
const prepLivingroomBeforeUrl = "/images/prep-livingroom-before.png";
const prepBedroomBeforeUrl = "/images/prep-bedroom-before.jpg";
const prepBedroomAfterUrl = "/images/prep-bedroom-after.jpg";

const whySellBullets = [
  {
    icon: TrendingUp,
    title: "Data-Driven Pricing",
    desc: "Real-time property data and buyer patterns capture peak market momentum.",
  },
  {
    icon: Hammer,
    title: "Home Prep Program",
    desc: "We handle everything from fresh paint and flooring to junk hauling and new countertops with no upfront costs. You pay nothing until the home is sold.",
  },
  {
    icon: Shield,
    title: "Protective Negotiation",
    desc: "Aggressive contract terms defend your hard-earned equity at every turn.",
  },
  {
    icon: Handshake,
    title: "Direct Advocacy",
    desc: "Work one-on-one with a sharp, experienced professional from strategy to close.",
  },
];

const guaranteeItems = [
  {
    icon: MessageSquare,
    title: "Proactive Communication",
    desc: "Enjoy structured weekly updates and rapid same-day responses so you always know exactly where your transaction stands.",
  },
  {
    icon: Lightbulb,
    title: "Straightforward Advice",
    desc: "Expect transparent insight regarding property updates, market valuations, and timing choices to maximize final proceeds.",
  },
  {
    icon: BookOpen,
    title: "Plain English Service",
    desc: "Complex paperwork and transaction logistics are translated into everyday language, keeping your path clear and stress-free.",
  },
  {
    icon: DoorOpen,
    title: "Easy-Exit Listing Agreement",
    desc: "Professional service is earned every single week. If commitments are not met, you can cancel the agreement at any time.",
  },
];

const sellingSteps = [
  {
    num: "01",
    title: "Free Consultation",
    desc: "Map your goals, timeline, and neighborhood pricing strategy based on local market trends.",
    image: "/images/step-consultation-audit.png",
  },
  {
    num: "02",
    title: "Prepare Your Home For Sale",
    desc: "We handle staging and premium video marketing. You can also take advantage of our Home Prep Program for home improvements and repairs we manage with no out-of-pocket costs or hidden fees.",
    image: "/images/step-prepare-home-for-sale.png",
  },
  {
    num: "03",
    title: "Place Your Home On The Market",
    desc: "Attract serious buyers fast with high-impact online listings, coordinated showings, and proactive marketing.",
    image: stepSelling4Url,
  },
  {
    num: "04",
    title: "Accept Offer & Close",
    desc: "Navigate offers on your home with expert negotiation, manage complex escrow paperwork, and experience a stress-free closing.",
    image: sellingHouseUrl,
  },
];

const prepBullets = [
  {
    num: "01",
    title: "Strategic Walkthrough",
    desc: "An in-person walkthrough identifies the exact updates, like fresh paint or new countertops, that will actually put more money in your pocket.",
  },
  {
    num: "02",
    title: "Complete Project Management",
    desc: "We hire and coordinate with the contractors to handle all the labor, flooring, landscaping, and junk removal so you don't lift a finger.",
  },
  {
    num: "03",
    title: "No Upfront Fees",
    desc: "We fund all of the work upfront. There are no hidden monthly fees or interest charges, and you pay absolutely nothing until the home is sold.",
  },
];

const sellingFaqs: Faq[] = [
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
];

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden bg-background select-none cursor-ew-resize"
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* Before image (base) */}
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Before label — sits on the base image, covered as the after layer slides over it */}
      <span className="absolute top-4 right-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
        Before
      </span>

      {/* After image (clipped from left) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          draggable={false}
          className="absolute inset-0 h-full w-auto max-w-none object-cover pointer-events-none"
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
        />
        {/* After label — clipped with the after layer, covered when sliding left */}
        <span className="absolute top-4 left-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
          After
        </span>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-foreground" fill="currentColor" aria-hidden="true">
            <path d="M8 5l-6 7 6 7V5zm8 0v14l6-7-6-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-10 shadow-2xl w-full text-center py-12">
        <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center bg-primary text-primary-foreground">
          <Mail className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <h3 className="font-sans text-xl font-bold mb-2">Message Received.</h3>
        <p className="text-sm text-foreground/70 leading-relaxed">
          Thanks for reaching out. A personal response will be sent to your
          inbox within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 shadow-2xl w-full">
      <GravityFormClient
        formId={4}
        className="space-y-4"
        onSuccess={(c) => { if (c.url) { router.push(c.url); } else { setSubmitted(true); } }}
      />
    </div>
  );
}

function WhySellVideo({
  videoId = "lFMTIp7BqEg",
  thumbUrl = whySellVideoThumbUrl,
}: {
  videoId?: string;
  thumbUrl?: string;
}) {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {videoPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Why Sell With Blake"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setVideoPlaying(true)}
          aria-label="Play video: Why Sell With Blake"
          className="absolute inset-0 w-full h-full group cursor-pointer"
        >
          <img
            src={thumbUrl}
            alt="Blake Hammond on the podcast — Why Sell With Blake"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default function Selling({ acf }: { acf?: Record<string, any> | null }) {
  const [activeStep, setActiveStep] = useState(0);

  const whyBullets = acf?.whyBullets?.length
    ? acf.whyBullets.map((b: any, i: number) => ({
        icon: sellIconMap[b.icon] || whySellBullets[i]?.icon || TrendingUp,
        title: b.title,
        desc: b.desc,
      }))
    : whySellBullets;

  const guarantee = acf?.guaranteeItems?.length
    ? acf.guaranteeItems.map((g: any, i: number) => ({
        icon: sellIconMap[g.icon] || guaranteeItems[i]?.icon || MessageSquare,
        title: g.title,
        desc: g.desc,
      }))
    : guaranteeItems;

  const steps = acf?.steps?.length
    ? acf.steps.map((s: any, i: number) => ({
        num: s.num || sellingSteps[i]?.num || String(i + 1).padStart(2, "0"),
        title: s.title,
        desc: s.desc,
        image: imgUrl(s.image, sellingSteps[i]?.image || stepSelling1Url),
      }))
    : sellingSteps;

  const prep = acf?.prepBullets?.length
    ? acf.prepBullets.map((b: any, i: number) => ({
        num: b.num || prepBullets[i]?.num || String(i + 1).padStart(2, "0"),
        title: b.title,
        desc: b.desc,
      }))
    : prepBullets;

  const whyVideoImageUrl = imgUrl(acf?.whyVideoImage, whySellVideoThumbUrl);
  const whyVideoIdVal = acf?.whyVideoId || "lFMTIp7BqEg";
  const prepBeforeImageUrl = imgUrl(acf?.prepBeforeImage, prepBedroomBeforeUrl);
  const prepAfterImageUrl = imgUrl(acf?.prepAfterImage, prepBedroomAfterUrl);
  const zillowImageUrl = imgUrl(acf?.zillowImage, blakePresentingUrl);
  const faqsList: Faq[] = sellingFaqs;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative bg-accent overflow-hidden">
          <img
            src={heroGraphicUrl}
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 translate-x-1/4 w-full lg:w-[1280px] h-auto pointer-events-none select-none z-0 opacity-10 lg:opacity-20"
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-24 pb-16 md:pb-24 lg:min-h-[640px] flex flex-col justify-center">
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full">
              <motion.div
                className="max-w-2xl relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative z-10">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
                    {acf?.heroEyebrow || "Selling with Blake"}
                  </p>
                  <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                    {acf?.heroHeading ? tc(acf.heroHeading) : (<>Sell Quickly.<br />Make More Money.</>)}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">{acf?.heroBody || "Get the raw market data, full-service home preparation, and strategic contract negotiation you need to walk away with the most money possible."}</p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <Button asChild className="bg-white text-foreground hover:bg-white/90 border-transparent no-default-hover-elevate no-default-active-elevate rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                      <Link href={acf?.heroCtaLink || "/connect"}>{acf?.heroCtaText || "Contact Blake"}</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full lg:justify-self-end lg:pt-8 mt-10 lg:mt-0 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Sell With Blake */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="hidden lg:block">
                <WhySellVideo videoId={whyVideoIdVal} thumbUrl={whyVideoImageUrl} />
              </div>

              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.whyEyebrow || "Why Sell With Blake"}
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {tc(acf?.whyHeading) || "Maximize Your Equity"}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                  {acf?.whyBody || "Secure the highest return with a partner who prices with precision, transforms your property, and protects your profit."}
                </p>

                <ul className="space-y-4 mb-10">
                  {whyBullets.map((b: any) => {
                    const Icon = b.icon;
                    return (
                      <li key={b.title} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 mt-0.5 flex items-center justify-center bg-primary text-white">
                          <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-foreground/80 leading-relaxed">
                          <span className="font-bold text-foreground">{b.title}</span>
                          <br />
                          {b.desc}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile video — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <WhySellVideo videoId={whyVideoIdVal} thumbUrl={whyVideoImageUrl} />
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href={acf?.whyCtaLink || "/connect"}>{acf?.whyCtaText || "Contact Blake"}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
                  >
                    <Link href={acf?.whySecondaryLink || "/home-value-analysis"}>{acf?.whySecondaryText || "Find Your Home Value"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The Hammond Real Estate Guarantee */}
        <motion.section
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto text-left sm:text-center mb-16">
              <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                {acf?.guaranteeEyebrow || "My Promise"}
              </p>
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {tc(acf?.guaranteeHeading) || "The Hammond Real Estate Guarantee"}
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {acf?.guaranteeBody || "Four direct standards held on every single property partnership, in writing, from day one."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guarantee.map((item: any, i: number) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="text-left sm:text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 sm:mx-auto mb-4 sm:mb-6 flex items-center justify-center bg-primary text-white">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                    </div>
                    <h3 className="font-sans text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Home Selling Process */}
        <motion.section
          id="process"
          className="relative bg-background overflow-hidden lg:min-h-[720px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                src={steps[activeStep].image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col pt-6 pb-10 lg:py-20 gap-10 w-full lg:w-[85%] lg:max-w-[520px] mx-auto lg:mx-0">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                    {acf?.processEyebrow || "Home Selling Process"}
                  </p>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    {tc(acf?.processHeading) || "Minimize Days on Market"}
                  </h2>
                  <p className="text-foreground/70">
                    {acf?.processSubtitle || "Four precise phases built to capture immediate buyer demand and protect your listing from becoming stagnant."}
                  </p>
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  {steps.map((step: any, i: number) => {
                    const isActive = activeStep === i;
                    return (
                      <button
                        key={step.title}
                        onClick={() => setActiveStep(i)}
                        className={`w-full text-left py-6 border-b border-foreground/10 transition-opacity ${
                          isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                        }`}
                      >
                        <div className="flex items-start gap-6">
                          <span className="font-sans text-base md:text-lg font-semibold text-foreground/30 leading-none shrink-0 pt-3">
                            {step.num}
                          </span>
                          <div className="flex-1 pt-2">
                            <h3 className="font-sans text-2xl md:text-3xl font-bold mb-2">
                              {step.title}
                            </h3>
                            <AnimatePresence initial={false}>
                              {isActive && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.35 }}
                                  className="text-foreground/70 leading-relaxed overflow-hidden"
                                >
                                  {step.desc}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Mobile image */}
                  <div className="lg:hidden relative aspect-[4/3] overflow-hidden mt-8">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`m-${activeStep}`}
                        src={steps[activeStep].image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>
                  </div>

                  <Link
                    href={acf?.processCtaLink || "/connect"}
                    className="mt-8 self-start inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] text-sm font-medium"
                  >
                    {acf?.processCtaText || "Contact Blake"}
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>
        </motion.section>

        {/* Home Prep Program */}
        <motion.section
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="hidden lg:block">
                <BeforeAfterSlider
                  beforeSrc={prepBeforeImageUrl}
                  afterSrc={prepAfterImageUrl}
                  beforeAlt="Primary bedroom before staging"
                  afterAlt="Primary bedroom after staging"
                />
              </div>

              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">{acf?.prepEyebrow || "Elevate Your Market Value & Sell With Less Stress"}</p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {tc(acf?.prepHeading) || "Home Prep Program"}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">{acf?.prepBody || "We handle the entire preparation process from start to finish with zero out-of-pocket costs, ensuring your house is ready to hit the market for top dollar."}</p>

                <ul className="space-y-4 mb-10">
                  {prep.map((b: any) => (
                    <li key={b.num} className="flex items-start gap-4">
                      <span className="flex-shrink-0 font-sans font-bold text-primary text-lg leading-snug">
                        {b.num}
                      </span>
                      <span className="text-foreground/80 leading-relaxed">
                        <span className="font-semibold text-foreground">{b.title}</span>
                        <br />
                        {b.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Mobile slider — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <BeforeAfterSlider
                    beforeSrc={prepBeforeImageUrl}
                    afterSrc={prepAfterImageUrl}
                    beforeAlt="Primary bedroom before staging"
                    afterAlt="Primary bedroom after staging"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href={acf?.prepCtaLink || "/home-prep-program"}>{acf?.prepCtaText || "Learn More"}</Link>
                  </Button>
                  {acf?.prepPhoneText && (
                    <a
                      href={acf?.prepPhoneLink || "#"}
                      className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                    >
                      Or call {acf.prepPhoneText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Zillow Showcase */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="lg:max-w-xl">
                <img
                  src={zillowLogoUrl}
                  alt="Zillow"
                  className="h-6 md:h-8 w-auto mb-8"
                />
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {tc(acf?.zillowHeading) || "Zillow Showcase Drives 75% More Views"}
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed mb-10">
                  {acf?.zillowBody || "As a Zillow Showcase partner, we give your home a premium listing advantage offered on less than 1% of all properties. This exclusive placement pairs high-end photography with priority positioning to drive maximum traffic and saves for your listing."}
                </p>
                {/* Mobile image — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <img
                    src={zillowImageUrl}
                    alt="Blake Hammond, Sacramento-area real estate agent"
                    className="w-full h-full object-cover object-top aspect-[4/3]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href={acf?.zillowCtaLink || "/connect"}>{acf?.zillowCtaText || "Contact Blake"}</Link>
                  </Button>
                  <a
                    href={acf?.zillowSecondaryLink || "https://www.zillow.com/profile/blakehammondre"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white rounded-none font-medium text-sm w-full sm:w-auto px-6 h-[45px] transition-colors"
                  >
                    {acf?.zillowSecondaryText || "View On Zillow"}
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <img
                  src={zillowImageUrl}
                  alt="Blake Hammond, Sacramento-area real estate agent"
                  className="w-full h-full object-cover object-top aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={faqsList}
          intro={acf?.faqsIntro || "Common questions from home sellers. Don't see yours? Get in touch, I am happy to walk you through it."}
        />

        <CtaSection secondaryLabel="" />
      </main>
      <SiteFooter />
    </div>
  );
}


