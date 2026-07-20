"use client";

import { useRouter } from "next/navigation";
import { tc } from "@/lib/title-case";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SearchCheck, Lock, Handshake, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GravityFormClient } from "@/components/forms/GravityFormClient";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";
import { imgUrl } from "@/lib/wp-acf";

const buyIconMap: Record<string, typeof SearchCheck> = {
  SearchCheck,
  Lock,
  Handshake,
};

const heroGraphicUrl = "/images/graphic-hero_section_1779377398567.png";
const stepBuying1Url = "/images/step-buying-1-discover.png";
const stepBuying2Url = "/images/step-buying-2-search.png";
const stepBuying3Url = "/images/step-buying-3-close.png";
const buyingBlakeUrl = "/images/prep-video-thumb.jpg";
const blakePresentingPropertyUrl = "/images/blake-presenting-property.png";
const processBuyingUrl = "/images/process-buying.png";
const prepBedroomBeforeUrl = "/images/prep-bedroom-before.jpg";
const stepFundingUrl = "/images/step-preparing-4-funding.png";
const stepOffersUrl = "/images/step-selling-3-offers.png";
const testimonialCoupleUrl = "/images/testimonial-couple.png";

const whyBuyBullets = [
  {
    icon: SearchCheck,
    title: "No Property Fluff",
    desc: "I point out hidden red flags, bad layouts, and neighborhood downsides so you know exactly what you're walking into.",
  },
  {
    icon: Lock,
    title: "Unfiltered Market Data",
    desc: "I show you the actual sales numbers instead of just the list price so you always know the true value before you make an offer.",
  },
  {
    icon: Handshake,
    title: "Strategic Negotiation",
    desc: "I craft sharp, competitive bids designed to get your offer accepted on your terms while keeping your money protected.",
  },
];

const buyerTips = [
  {
    title: "Start With A Strategy Call",
    desc: "We map out a game plan tailored to your specific goals before you start tracking public sites.",
    image: blakePresentingPropertyUrl,
  },
  {
    title: "The 5-Year Reality Check",
    desc: "Buy for your current lifestyle, but ensure the property can adapt so you aren't forced to move again too soon.",
    image: processBuyingUrl,
  },
  {
    title: "Ignore The Ugly Wallpaper",
    desc: "Separate major structural issues from minor surface updates. Outdated kitchens are easy to fix but a flawed layout is permanent.",
    image: prepBedroomBeforeUrl,
  },
  {
    title: "Lock In Your Pre-Approval",
    desc: "Sellers will not take you seriously without a verified commitment showing you are qualified to close from day one.",
    image: stepFundingUrl,
  },
  {
    title: "Write A Tight, Clean Offer",
    desc: "Price matters, but fast timelines and protective, zero-fluff contract conditions are what actually win bidding wars.",
    image: stepOffersUrl,
  },
  {
    title: "Budget 3% For Closing Costs",
    desc: "Expect an extra 2% to 3% beyond your down payment to safely cover your title, escrow, and lender fees.",
    image: testimonialCoupleUrl,
  },
];

const buyingSteps = [
  {
    num: "01",
    title: "Book A Free Strategy Call",
    desc: "Skip the sales pitch. We jump on a quick call to map your budget, target neighborhoods, and secure a hassle-free pre-approval.",
    image: stepBuying1Url,
  },
  {
    num: "02",
    title: "Finding The Right House",
    desc: "We look past the polished photos on the apps, narrow down the neighborhoods that actually make sense for you, and track down the best properties on the market.",
    image: stepBuying2Url,
  },
  {
    num: "03",
    title: "Safe Offer & Smooth Close",
    desc: "We use raw sales data to build a competitive offer with ironclad safeguards, vet structural inspections, and close with confidence.",
    image: stepBuying3Url,
  },
];

const buyingFaqs: Faq[] = [
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
];

function ContactForm() {
  const router = useRouter();

  return (
    <div className="bg-white p-8 md:p-10 shadow-2xl w-full">
      <GravityFormClient
        formId={3}
        className="space-y-4"
        onSuccess={(c) => { router.push(c.url || '/thank-you/buying'); }}
      />
    </div>
  );
}

function WhyVideo({ videoId, thumbSrc, thumbAlt }: { videoId?: string | null; thumbSrc: string; thumbAlt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showIframe = videoId && (inView || clicked);
  const iframeSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1${clicked ? "" : "&mute=1"}&rel=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <div ref={containerRef} className="relative aspect-[4/3] overflow-hidden bg-muted">
      {showIframe ? (
        <iframe
          key={clicked ? "clicked" : "auto"}
          src={iframeSrc!}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          title="Why Buy With Blake"
        />
      ) : (
        <>
          <img
            src={thumbSrc}
            alt={thumbAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setClicked(true)}
              aria-label="Play video"
              className="w-20 h-20 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Buying({ acf }: { acf?: Record<string, any> | null }) {
  const [activeStep, setActiveStep] = useState(0);
  const stepImages = [stepBuying1Url, stepBuying2Url, stepBuying3Url];

  const whyBullets = acf?.whyBullets?.length
    ? acf.whyBullets.map((b: any, i: number) => ({
        icon: buyIconMap[b.icon] || whyBuyBullets[i]?.icon || SearchCheck,
        title: b.title,
        desc: b.desc,
      }))
    : whyBuyBullets;

  const tips = acf?.tips?.length
    ? acf.tips.map((t: any, i: number) => ({
        title: t.title,
        desc: t.desc,
        image: imgUrl(t.image, buyerTips[i]?.image || blakePresentingPropertyUrl),
      }))
    : buyerTips;

  const steps = acf?.steps?.length
    ? acf.steps.map((s: any, i: number) => ({
        num: s.num || buyingSteps[i]?.num || String(i + 1).padStart(2, "0"),
        title: s.title,
        desc: s.desc,
        image: imgUrl(s.image, buyingSteps[i]?.image || stepBuying1Url),
      }))
    : buyingSteps;

  const faqsList: Faq[] = buyingFaqs;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative bg-accent overflow-hidden">
          {/* Decorative B graphic — aligned to top-left, cut off at the edge */}
          <img
            src={heroGraphicUrl}
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 translate-x-1/4 w-full lg:w-[1280px] h-auto pointer-events-none select-none z-0 opacity-10 lg:opacity-20"
          />

          <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 md:py-24 lg:min-h-[640px] flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center w-full">
              {/* Hero content */}
              <motion.div
                className="max-w-2xl relative w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative z-10">
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
                    {acf?.heroEyebrow || "Buying with Blake"}
                  </p>
                  <h1 className="text-h1 font-bold leading-[1.1] tracking-tight mb-6 text-white">
                    {acf?.heroHeading ? tc(acf.heroHeading) : (<>Beat The Competition<br />To The Property</>)}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">{acf?.heroBody || "Write sharp offers and out-negotiate the competition so you get the house you want without overpaying."}</p>
                  <a
                    href="tel:9166256118"
                    className="inline-flex items-center gap-3 text-white font-semibold text-lg hover:text-white/70 transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
                      <Phone className="w-4 h-4" />
                    </span>
                    916-625-6118
                  </a>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                className="w-full lg:justify-self-end mt-10 lg:mt-0 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Buy With Blake */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
              <div className="hidden lg:block">
                <WhyVideo
                  videoId={acf?.whyVideoId}
                  thumbSrc={imgUrl(acf?.whyVideoImage, buyingBlakeUrl)}
                  thumbAlt="Blake Hammond on the podcast — Why Buy With Blake"
                />
              </div>

              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.whyEyebrow || "Why Blake"}
                </p>
                <h2 className="text-h2 font-bold leading-tight mb-6">{tc(acf?.whyHeading) || "Buying With Total Certainty"}</h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">{acf?.whyBody || "Skip the average door-opener. You get an honest advisor who handles everything from the initial search to the final contract, ensuring you never make a blind investment."}</p>

                <ul className="space-y-6 mb-4 lg:mb-10">
                  {whyBullets.map((b: any) => {
                    const Icon = b.icon;
                    return (
                      <li key={b.title} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-white">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </span>
                        <div className="flex-1">
                          <h3 className="font-sans text-lg md:text-xl font-bold mb-1">
                            {b.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed">{b.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Mobile video — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <WhyVideo
                    videoId={acf?.whyVideoId}
                    thumbSrc={imgUrl(acf?.whyVideoImage, buyingBlakeUrl)}
                    thumbAlt="Blake Hammond on the podcast — Why Buy With Blake"
                  />
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
                    <Link href={acf?.whySecondaryLink || "/home-value-analysis"}>{acf?.whySecondaryText || "Free Home Value Analysis"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Buyer Tips */}
        <motion.section
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-8">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.tipsEyebrow || "Buyer Tips"}
                </p>
                <h2 className="text-h2 font-bold leading-tight">
                  {acf?.tipsHeading ? tc(acf.tipsHeading) : (<>Taking The Stress<br />Out Of Buying</>)}
                </h2>
              </div>
              <p className="max-w-md text-lg text-foreground/70 leading-relaxed">
                {acf?.tipsSubtitle || "Setting a few clear ground rules early protects your cash and saves you months of wasted weekend tours."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip: any, i: number) => (
                <motion.div
                  key={tip.title}
                  className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                >
                  <img
                    src={tip.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-colors duration-500 bg-foreground/55 group-hover:bg-primary/90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                    <h3 className="font-sans text-2xl font-bold mb-2">{tip.title}</h3>
                    <p className="text-sm leading-relaxed transition-all duration-500 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40">
                      {tip.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Home Buying Process */}
        <motion.section
          id="process"
          className="relative bg-background overflow-hidden lg:min-h-[720px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Image — sticks to left edge, full section height */}
          <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-1/2 z-0 overflow-hidden">
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
              <div className="hidden lg:block" />
              <div className="flex flex-col pt-6 pb-4 lg:py-20 gap-10 w-full lg:w-[85%] lg:max-w-[520px] mx-auto">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">{acf?.processEyebrow || "Home Buying Process"}</p>
                  <h2 className="text-h2 font-bold leading-tight mb-3">
                    {tc(acf?.processHeading) || "A Clear Path to Closing"}
                  </h2>
                  <p className="text-foreground/70">
                    {acf?.processSubtitle || "Three distinct steps designed to protect your money and eliminate the guesswork."}
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
                  <div className="lg:hidden relative aspect-[4/3] overflow-hidden mt-4">
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
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={faqsList}
          intro={acf?.faqsIntro || "Common questions from buyers. Don't see yours? Get in touch, I am happy to walk you through it."}
        />

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
