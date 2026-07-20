"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { tc } from "@/lib/title-case";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";
import { imgUrl } from "@/lib/wp-acf";

const prepHeroBgUrl = "/images/prep-hero-roseville.jpg";
const prepHomeAerialUrl = "/images/prep-home-aerial.jpg";
const stepPreparing1Url = "/images/step-preparing-1.webp";
const stepPreparing2Url = "/images/step-preparing-2-updates.png";
const stepPreparing3Url = "/images/step-preparing-3-launch.png";
const stepPreparing4Url = "/images/step-preparing-4-funding.png";
const stepPreparing5Url = "/images/step-preparing-5-staging.png";
const prepLivingroomUrl = "/images/staging-living-room.webp";
const prepLivingroomBeforeUrl = "/images/prep-livingroom-before.png";
const prepRosevilleBeforeUrl = "/images/prep-roseville-before.jpg";
const prepRosevilleAfterUrl = "/images/prep-roseville-after.jpg";
const soundFamiliarUrl = "/images/sound-familiar-stressed-seller.png";
const includedPaintingUrl = "/images/included-painting.webp";
const includedLandscapingUrl = "/images/included-landscaping.webp";
const includedRepairsUrl = "/images/included-repairs.webp";
const includedDeepCleaningUrl = "/images/included-deep-cleaning.webp";
const includedJunkHaulingUrl = "/images/included-junk-hauling.webp";
const includedEstateSalesUrl = "/images/included-estate-sales.webp";

const soundFamiliarWorries = [
  "\"Which repairs are actually worth doing?\"",
  "\"How much will this cost?\"",
  "\"How do I pay for improvements?\"",
  "\"What should I leave?\"",
  "\"What should I repair?\"",
  "\"Who should I hire to do it?\"",
];

const whyBullets = [
  {
    title: "No Out-of-Pocket Costs",
    desc: "We front the money for all cosmetic updates. Every dollar is settled comfortably out of your sale proceeds at closing.",
  },
  {
    title: "No Contractor Headache",
    desc: "Don't worry about finding or managing trades. We handle everything your home needs from painting and flooring to countertops and junk removal.",
  },
  {
    title: "Net More Money",
    desc: "Buyers pay a premium for a finished, move-in-ready home. We handle the stress, and you walk away with a bigger check.",
  },
  {
    title: "Premium Marketing Launch",
    desc: "Once the renovations look perfect, we bring in high-end staging and professional media to make the listing stand out online.",
  },
];

const prepSteps = [
  {
    num: "01",
    title: "Consultation & Audit",
    desc: "Walk through your property together to pinpoint the specific upgrades and repairs that buyers pay a premium for.",
    image: "/images/step-consultation-audit.png",
  },
  {
    num: "02",
    title: "Upfront Renovation Funding",
    desc: "The Home Prep Program funds 100% of the upfront costs for home improvements and repairs, so you pay nothing out of pocket.",
    image: "/images/step-upfront-renovation-funding.jpg",
  },
  {
    num: "03",
    title: "Project Management",
    desc: "Trusted local tradespeople are hired and managed to handle absolutely anything your home needs, from paint and flooring to kitchen updates, landscaping, and junk removal.",
    image: "/images/step-project-management.png",
  },
  {
    num: "04",
    title: "Staging & Media",
    desc: "Transform the refreshed space with premium design styling and high-production photography to drive immediate buyer urgency.",
    image: prepLivingroomUrl,
  },
  {
    num: "05",
    title: "High-Profit Close",
    desc: "Secure top-dollar offers, manage final transaction details, and settle the update costs out of proceeds only when escrow closes.",
    image: stepPreparing3Url,
  },
];

const includedCards = [
  {
    title: "Painting",
    desc: "Interior updates and exterior refreshes that instantly elevate first impressions in every online photo.",
    image: includedPaintingUrl,
  },
  {
    title: "Landscaping",
    desc: "Curb-appeal cleanups including trimming, fresh mulch, and pressure-washing so the property looks inviting from the street.",
    image: includedLandscapingUrl,
  },
  {
    title: "Repairs & Upgrades",
    desc: "Fixing minor issues that stall negotiations, such as drywall patches, modern light fixtures, and hardware updates.",
    image: includedRepairsUrl,
  },
  {
    title: "Staging",
    desc: "Professional space styling that helps prospective buyers easily see themselves living in the home.",
    image: prepLivingroomUrl,
  },
  {
    title: "Deep Cleaning",
    desc: "A meticulous, top-to-bottom clean of windows, floors, kitchens, and baths so the entire home feels completely move-in ready.",
    image: includedDeepCleaningUrl,
  },
  {
    title: "Photography & Media",
    desc: "Vibrant imagery, drone views, and cinematic video walkthroughs to capture buyers browsing online.",
    image: stepPreparing3Url,
  },
  {
    title: "Junk Hauling",
    desc: "Clearing out clutter and unwanted items so your home feels spacious and ready for buyers.",
    image: includedJunkHaulingUrl,
  },
  {
    title: "Estate Sales",
    desc: "Organizing and managing the liquidation of household items to clean out the property before listing.",
    image: includedEstateSalesUrl,
  },
];

const prepFaqs: Faq[] = [
  {
    q: "How much does the Home Prep Selling Program cost upfront?",
    a: "Absolutely nothing. All vendor and material costs are settled at closing out of your sale proceeds, so you never pay out of pocket.",
  },
  {
    q: "What if my home doesn't sell?",
    a: "If you take your home off the market before it sells, you simply pay back the actual renovation costs spent. We review everything together upfront so there are zero surprises.",
  },
  {
    q: "How long does the renovation take?",
    a: "Typically 1 to 2 weeks, depending on the scope. We will provide an exact, clear timeline during our initial walkthrough.",
  },
  {
    q: "Do I have to use your contractors?",
    a: "Yes. To guarantee quality and stay on schedule, we use our own vetted network of local tradespeople and cannot bring in outside vendors.",
  },
  {
    q: "Will I be involved in budget decisions?",
    a: "Absolutely. Before any work begins, you will sign off on the exact project bid, scope of work, and clear budget.",
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
      {/* After image (base — right side) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute top-4 right-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
        After
      </span>
      {/* Before image (clipped from left) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          className="absolute inset-0 h-full w-auto max-w-none object-cover pointer-events-none"
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
        />
        <span className="absolute top-4 left-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
          Before
        </span>
      </div>
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

function IncludedCarousel({
  controlsRef,
  cards = includedCards,
}: {
  controlsRef: React.MutableRefObject<{ prev: () => void; next: () => void } | null>;
  cards?: { title: string; desc: string; image: string }[];
}) {
  const count = cards.length;
  const GAP = 16;
  const SETTLE_MS = 700;
  const BUFFER = 2;

  const [visualIndex, setVisualIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [visibleTiles, setVisibleTiles] = useState(3);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      setContainerW(w);
      setVisibleTiles(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (visualIndex === 0) return;
    const normalized = ((visualIndex % count) + count) % count;
    if (normalized === visualIndex) return;
    const timer = setTimeout(() => {
      setAnimate(false);
      setVisualIndex(normalized);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
    }, SETTLE_MS);
    return () => clearTimeout(timer);
  }, [visualIndex, count]);

  const tileW =
    containerW > 0
      ? (containerW - GAP * (visibleTiles - 1)) / visibleTiles
      : 0;
  const trackX = containerW > 0 ? -visualIndex * (tileW + GAP) : 0;

  const next = useCallback(() => setVisualIndex((v) => v + 1), []);
  const prev = useCallback(() => setVisualIndex((v) => v - 1), []);

  useEffect(() => {
    controlsRef.current = { prev, next };
    return () => {
      controlsRef.current = null;
    };
  }, [controlsRef, prev, next]);

  const renderStart = visualIndex - BUFFER;
  const renderEnd = visualIndex + visibleTiles - 1 + BUFFER;

  return (
    <div ref={containerRef} className="relative overflow-x-clip">
      {/* Invisible placeholder gives the container its natural height */}
      <div
        className="invisible"
        aria-hidden
        style={{ width: tileW || undefined }}
      >
        <div className="aspect-[4/5] bg-muted" />
      </div>

      <motion.div
        className="absolute top-0 left-0"
        animate={{ x: trackX }}
        transition={
          animate
            ? { type: "spring", stiffness: 180, damping: 28, mass: 0.9 }
            : { duration: 0 }
        }
      >
        {Array.from({ length: renderEnd - renderStart + 1 }, (_, i) => {
          const pos = renderStart + i;
          const cardIndex = ((pos % count) + count) % count;
          const card = cards[cardIndex];
          const isVisible = pos >= visualIndex && pos < visualIndex + visibleTiles;
          return (
            <div
              key={pos}
              className="group absolute top-0 aspect-[4/5] overflow-hidden bg-muted shadow-lg"
              style={{
                left: pos * (tileW + GAP),
                width: tileW || undefined,
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                loading={isVisible ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                <h3 className="font-sans text-2xl font-bold mb-2 drop-shadow-md">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-sm drop-shadow">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function HomePrep({ acf }: { acf?: Record<string, any> | null }) {
  const [activeStep, setActiveStep] = useState(0);
  const includedControlsRef = useRef<{ prev: () => void; next: () => void } | null>(null);

  const worries: string[] = acf?.familiarWorries?.length
    ? acf.familiarWorries.map((w: any) => w.text)
    : soundFamiliarWorries;

  const why = acf?.whyBullets?.length
    ? acf.whyBullets.map((b: any) => ({ title: b.title, desc: b.desc }))
    : whyBullets;

  const steps = acf?.steps?.length
    ? acf.steps.map((s: any, i: number) => ({
        num: s.num || prepSteps[i]?.num || String(i + 1).padStart(2, "0"),
        title: s.title,
        desc: s.desc,
        image: imgUrl(s.image, prepSteps[i]?.image || prepHomeAerialUrl),
      }))
    : prepSteps;

  const included = acf?.includedCards?.length
    ? acf.includedCards.map((c: any, i: number) => ({
        title: c.title,
        desc: c.desc,
        image: imgUrl(c.image, includedCards[i]?.image || includedPaintingUrl),
      }))
    : includedCards;

  const caseBullets: string[] = acf?.caseBullets?.length
    ? acf.caseBullets.map((b: any) => b.text)
    : [
        "Multiple cash offers received and closed during the first weekend on the market.",
        "Sold for $75,000 over the as-is property valuation before renovations.",
        "All without the owner having to lift a finger or spend a dime up front.",
      ];

  const heroImageUrl = imgUrl(acf?.heroImage, prepHeroBgUrl);
  const familiarImageUrl = imgUrl(acf?.familiarImage, soundFamiliarUrl);
  const whyImageUrl = imgUrl(acf?.whyImage, prepHomeAerialUrl);
  const caseBeforeImageUrl = imgUrl(acf?.caseBeforeImage, prepRosevilleBeforeUrl);
  const caseAfterImageUrl = imgUrl(acf?.caseAfterImage, prepRosevilleAfterUrl);
  const faqsList: Faq[] = prepFaqs;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative bg-accent text-foreground overflow-hidden">
          <img
            src={heroImageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-20 md:pt-28 pb-20 md:pb-28">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 mb-6">
                {acf?.heroEyebrow || "Home Prep Selling Program"}
              </p>
              <h1 className="text-h1 font-bold leading-[1.1] tracking-tight mb-6 text-white">
                {tc(acf?.heroHeading) || "We Prepare Your Home For Sale. You Pay Nothing Until It's Sold."}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">{acf?.heroBody || "We manage and pay for all repairs, updates, and staging to get your house market-ready with no out-of-pocket costs or hidden fees, so you can sell your home quickly for more money and with less stress."}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={acf?.heroCtaLink || "/book-consultation"}
                  className="inline-flex items-center justify-center bg-white text-foreground hover:bg-white/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]"
                >
                  {acf?.heroCtaText || "Schedule a Home Prep Consultation"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sound Familiar? */}
        <motion.section
          className="relative bg-muted text-foreground overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Image — full-bleed left half on desktop (flush top, bottom, left) */}
          <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-1/2 z-0 overflow-hidden">
            <img
              src={familiarImageUrl}
              alt="A homeowner feeling overwhelmed by paperwork and home repairs before selling"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="hidden lg:block" />

              <div className="pt-6 pb-4 lg:py-28 lg:pl-12 xl:pl-20">
                <h2 className="text-h2 font-bold leading-tight mb-6">
                  {tc(acf?.familiarHeading) || "Sound Familiar?"}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                  {acf?.familiarSubheading || "Getting a home market-ready can easily feel expensive and overwhelming."}
                </p>
                <p className="font-sans font-bold text-xl mb-6">
                  {acf?.familiarBody || "If you are preparing to sell, you might be asking yourself the same questions we hear every day:"}
                </p>
                <ul className="space-y-4 mb-4 lg:mb-10">
                  {worries.map((worry: string) => (
                    <li key={worry} className="text-foreground/90">
                      {worry}
                    </li>
                  ))}
                </ul>

                {/* Mobile image */}
                <div className="lg:hidden relative aspect-[4/3] overflow-hidden mb-10">
                  <img
                    src={familiarImageUrl}
                    alt="A homeowner feeling overwhelmed by paperwork and home repairs before selling"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <Link
                    href={acf?.familiarCtaLink || "/book-consultation"}
                    className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-[13px] sm:text-sm whitespace-nowrap transition-all hover:-translate-y-0.5 w-full sm:w-auto px-4 sm:px-7 h-[45px]"
                  >
                    {acf?.familiarCtaText || "Schedule a Home Prep Consultation"}
                  </Link>
                  {acf?.familiarPhoneText && (
                    <>
                      <span className="text-sm text-foreground/50 text-center">or</span>
                      <Button variant="outline" asChild className="rounded-none h-[45px] w-full sm:w-auto font-medium text-sm">
                        <a href={acf?.familiarPhoneLink || "#"}>{acf.familiarPhoneText}</a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why the Home Prep Program */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted group cursor-pointer hidden lg:block">
                <img
                  src={whyImageUrl}
                  alt="Aerial view of a prepped Sacramento home — Home Prep Program"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.whyEyebrow || "Our Difference"}
                </p>
                <h2 className="text-h2 font-bold leading-tight mb-6">
                  {tc(acf?.whyHeading) || "Home Prep Program"}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                  {acf?.whyBody || "Buyers reward homes that show better than the competition. This turnkey renovation program quietly removes every friction point without you writing a check before closing."}
                </p>
                <ul className="space-y-4 mb-4 lg:mb-10">
                  {why.map((b: any) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/80">
                        <span className="font-semibold text-foreground">{b.title}</span>
                        <br />
                        {b.desc}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* Mobile image — above the CTA buttons */}
                <div className="lg:hidden relative aspect-[4/3] overflow-hidden bg-muted mb-10">
                  <img
                    src={whyImageUrl}
                    alt="Aerial view of a prepped Sacramento home — Home Prep Program"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-foreground fill-foreground translate-x-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]">
                    <Link href={acf?.whyCtaLink || "/book-consultation"}>{acf?.whyCtaText || "Schedule a Home Prep Consultation"}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground text-foreground bg-transparent hover:bg-black hover:text-white rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
                  >
                    <Link href={acf?.whySecondaryLink || "/home-value-analysis"}>{acf?.whySecondaryText || "Free Home Value Analysis"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Home Prep Program Process */}
        <motion.section
          id="process"
          className="relative bg-muted overflow-hidden lg:min-h-[720px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Image — right half on desktop */}
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
              <div className="flex flex-col pt-6 pb-4 lg:py-20 gap-10 w-full lg:w-[85%] lg:max-w-[520px] mx-auto lg:mx-0">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                    {acf?.processEyebrow || "Home Prep Program Process"}
                  </p>
                  <h2 className="text-h2 font-bold leading-tight mb-3">
                    {acf?.processHeading ? tc(acf.processHeading) : (<>100% Funded<br />Renovations</>)}
                  </h2>
                  <p className="text-foreground/70">
                    {acf?.processSubtitle || "5 steps to a stress-free, high-profit sale."}
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

                  <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]">
                      <Link href={acf?.processCtaLink || "/book-consultation"}>{acf?.processCtaText || "Schedule a Home Prep Consultation"}</Link>
                    </Button>
                    {acf?.processSecondaryText && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-foreground text-foreground bg-transparent hover:bg-black hover:text-white rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
                      >
                        <Link href={acf?.processSecondaryLink || "#"}>{acf.processSecondaryText}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>
        </motion.section>

        {/* What's Included */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-4xl">
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.includedEyebrow || "What's Included"}
                </p>
                <h2 className="text-h2 font-bold leading-tight">
                  {acf?.includedHeading ? tc(acf.includedHeading) : (<>We Manage the Contractors<br />& Cover the Costs</>)}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => includedControlsRef.current?.prev()}
                  aria-label="Previous"
                  className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  onClick={() => includedControlsRef.current?.next()}
                  aria-label="Next"
                  className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ArrowRight className="w-8 h-8" />
                </button>
              </div>
            </div>
            <IncludedCarousel controlsRef={includedControlsRef} cards={included} />
            <div className="flex md:hidden items-center justify-center gap-2 mt-8">
              <button
                type="button"
                onClick={() => includedControlsRef.current?.prev()}
                aria-label="Previous"
                className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={() => includedControlsRef.current?.next()}
                aria-label="Next"
                className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Before & After Case Study */}
        <motion.section
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-left md:text-center mb-8 md:mb-14">
              <h2 className="text-h2 font-bold leading-tight">
                {tc(acf?.caseSectionHeading) || "Before & After Case Study"}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {acf?.caseEyebrow || "Roseville, CA"}
                </p>
                <h3 className="text-h3 font-bold leading-tight mb-6">
                  {acf?.caseHeading ? tc(acf.caseHeading) : (<>Our Home Prep Program Put an Extra<br />$50,000 in Our Client's Pocket</>)}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">{acf?.caseBody || "A smooth two-week renovation timeline featuring fresh paint, new flooring, countertops, cabinet updates, modern lighting, and professional staging pushed the initial list price up, brought multiple offers during the opening weekend, and closed $75,000 above the original valuation."}</p>
                <ul className="space-y-4 mb-4 lg:mb-10">
                  {caseBullets.map((b: string) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/80">{b}</span>
                    </li>
                  ))}
                </ul>
                {/* Mobile slider — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <BeforeAfterSlider
                    beforeSrc={caseBeforeImageUrl}
                    afterSrc={caseAfterImageUrl}
                    beforeAlt="Roseville living room before prep"
                    afterAlt="Roseville living room after prep and staging"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]">
                    <Link href={acf?.caseCtaLink || "/book-consultation"}>{acf?.caseCtaText || "Schedule a Home Prep Consultation"}</Link>
                  </Button>
                  {acf?.casePhoneText && (
                    <>
                      <span className="text-sm text-foreground/50 text-center">or</span>
                      <Button variant="outline" asChild className="rounded-none h-[45px] w-full sm:w-auto font-medium text-sm">
                        <a href={acf?.casePhoneLink || "#"}>{acf.casePhoneText}</a>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="hidden lg:block">
                <BeforeAfterSlider
                  beforeSrc={caseBeforeImageUrl}
                  afterSrc={caseAfterImageUrl}
                  beforeAlt="Roseville living room before prep"
                  afterAlt="Roseville living room after prep and staging"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={faqsList}
          intro={acf?.faqsIntro || "Common questions about the Home Prep Program. Don't see yours? Get in touch, I'm happy to walk you through it."}
        />

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
