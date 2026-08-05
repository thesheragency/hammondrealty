"use client";

import React, { useState, useEffect, useRef } from "react";
import { tc } from "@/lib/title-case";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ArrowRight, Phone, MapPin, Hammer, Trophy, ShieldCheck, Mail } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import { Stars } from "@/components/site/GoogleBadges";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import YoutubeVideoFacade from "@/components/ui/YoutubeVideoFacade";
import { imgUrl, imgAlt } from "@/lib/wp-acf";

// Assets
const logoUrl = "/images/logo_1779376344245.png";
const mastersClubUrl = "/images/Mask_group_1780678314549.png";
const heroGraphicUrl = "/images/graphic-hero_section_1779377398567.png";
const quoteMarkUrl = "/images/quote-mark.png";

// Generated Images
const heroBedroomUrl = "/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";
const blakePortraitUrl = "/images/A7406979-2_1782404791199.jpg";
const faqBackdropUrl = "/images/graphic-hero_section_1779382669585.png";
const stepBuying1Url = "/images/step-buying-1-discover.png";
const stepBuying2Url = "/images/step-buying-2-search.png";
const stepBuying3Url = "/images/step-buying-3-close.png";
const stepSelling1Url = "/images/process-discover-needs.png";
const stepSelling2Url = "/images/step-selling-2-stage.png";
const stepSelling3Url = "/images/step-selling-3-offers.png";
const stepSelling4Url = "/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-24_1780678783964.jpg";
const stepPreparing1Url = "/images/step-preparing-1-audit.png";
const stepPreparing2Url = "/images/step-preparing-2-updates.png";
const stepPreparing3Url = "/images/process-preparing.png";
const stepPreparing5Url = "/images/step-preparing-3-launch.png";
const buyingHouseUrl = "/images/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg";
const sellingHouseUrl = "/images/fancy_home_1782404943463.jpg";
const prepLivingroomUrl = "/images/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg";
const stagedLivingRoomUrl = "/images/staged_living_room_1782405230307.jpg";
const whyVideoThumbUrl = "/images/why-sell-video-thumb.jpg";

type ProcessTrack = "buying" | "selling" | "preparing";

const processData: Record<
  ProcessTrack,
  { label: string; steps: { num: string; title: string; desc: string; image: string }[] }
> = {
  buying: {
    label: "I'm Buying",
    steps: [
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
    ],
  },
  selling: {
    label: "I'm Selling",
    steps: [
      {
        num: "01",
        title: "Free Consultation",
        desc: "Map your goals, timeline, and neighborhood pricing strategy based on local market trends.",
        image: stepSelling1Url,
      },
      {
        num: "02",
        title: "Prepare Your Home For Sale",
        desc: "We handle staging and premium video marketing. You can also take advantage of our Home Prep Program for home improvements and repairs we manage with no out-of-pocket costs or hidden fees.",
        image: stepSelling2Url,
      },
      {
        num: "03",
        title: "Place Your Home On The Market",
        desc: "Attract serious buyers fast with high-impact online listings, coordinated showings, and proactive marketing.",
        image: stepSelling3Url,
      },
      {
        num: "04",
        title: "Accept Offer & Close",
        desc: "Navigate offers on your home with expert negotiation, manage complex escrow paperwork, and experience a stress-free closing.",
        image: stepSelling4Url,
      },
    ],
  },
  preparing: {
    label: "Home Prep Program",
    steps: [
      {
        num: "01",
        title: "Consultation & Audit",
        desc: "Walk through your property together to pinpoint the specific upgrades and repairs that buyers pay a premium for.",
        image: stepPreparing1Url,
      },
      {
        num: "02",
        title: "Upfront Renovation Funding",
        desc: "The Home Prep Program funds 100% of the upfront costs for home improvements and repairs, so you pay nothing out of pocket.",
        image: stepPreparing2Url,
      },
      {
        num: "03",
        title: "Project Management",
        desc: "Trusted local tradespeople are hired and managed to handle absolutely anything your home needs, from paint and flooring to kitchen updates, landscaping, and junk removal.",
        image: stepPreparing3Url,
      },
      {
        num: "04",
        title: "Staging & Media",
        desc: "Transform the refreshed space with premium design styling and high-production photography to drive immediate buyer urgency.",
        image: stagedLivingRoomUrl,
      },
      {
        num: "05",
        title: "High-Profit Close",
        desc: "Secure top-dollar offers, manage final transaction details, and settle the update costs out of proceeds only when escrow closes.",
        image: sellingHouseUrl,
      },
    ],
  },
};

const faqs = [
  {
    q: "How does the Home Prep Selling Program work?",
    a: "The program fronts the entire cost of updates, staging, and cosmetic repairs that drive a premium sale price. Homeowners pay nothing upfront, and the renovation investment is settled comfortably at closing out of your sale proceeds.",
  },
  {
    q: "What geographic areas are covered?",
    a: "We serve the greater Sacramento region, including Sacramento, Placer, Yuba, Sutter, Nevada, and El Dorado counties.",
  },
  {
    q: "How long does it take to sell a home?",
    a: "The baseline average is 11 days on market with a 102% list-to-sale ratio, running well ahead of standard regional benchmarks. Timelines vary based on price point, condition, and current market conditions.",
  },
  {
    q: "Do you work with first-time buyers?",
    a: "Yes, absolutely. First-time buyers receive complete guidance from pre-approval to closing day, including lender introductions, neighborhood market data, and competitive offer strategy.",
  },
  {
    q: "What does the commission structure look like?",
    a: "Commission is completely transparent and tailored directly to the specific scope of service. The numbers are reviewed in detail during the initial consultation with zero hidden fees.",
  },
];

function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = (now - start) / 1000;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(value * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

type ServiceCard = { title: string; image: string; href: string; desc: string };

function ServiceCards({ cards }: { cards: ServiceCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:h-[560px]">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          className="relative flex flex-col lg:flex-row overflow-hidden bg-background shadow-lg flex-1 h-auto lg:h-full"
          style={{ flex: hovered === i ? "2.2 1 0%" : "1 1 0%", transition: "flex 0.7s cubic-bezier(0.4,0,0.2,1)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Image */}
          <Link href={card.href} className="relative h-[320px] lg:h-auto lg:flex-1 min-w-0 overflow-hidden block">
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover transition-transform duration-1000"
              style={{ transform: hovered === i ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="font-sans text-4xl font-bold drop-shadow-md">{card.title}</h3>
            </div>
          </Link>

          {/* Desktop description panel — fades in/out via AnimatePresence */}
          <div
            className="hidden lg:block bg-primary text-primary-foreground overflow-hidden"
            style={{ width: hovered === i ? "360px" : "0px", transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)", flexShrink: 0 }}
          >
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  className="w-[360px] p-10 h-full flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <p className="text-base leading-relaxed">{card.desc}</p>
                  <Link
                    href={card.href}
                    className="self-start mt-8 inline-flex items-center text-sm font-semibold tracking-wide transition-all hover:gap-1"
                  >
                    Learn more
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile description */}
          <div className="lg:hidden bg-primary text-primary-foreground p-6">
            <p className="text-sm leading-relaxed">{card.desc}</p>
            <Link href={card.href} className="mt-4 inline-flex items-center text-sm font-semibold tracking-wide">
              Learn more
              <ArrowRight className="ml-3 w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home({ acf, wpTestimonials }: { acf?: Record<string, any> | null; wpTestimonials?: { quote: string; name: string; source?: 'google' | 'zillow' }[] }) {
  const [processTrack, setProcessTrack] = useState<ProcessTrack>("buying");
  const [activeStep, setActiveStep] = useState(0);
  const testimonials = [
    {
      quote:
        "Blake did a wonderful job for us and got our house sold on the very first day it was listed. We could not be any happier with his help. We highly recommend him because we know he will take really good care of you.",
      name: "Tim Tingey",
    },
    {
      quote:
        "Excellent experience. Blake was supportive, provided clear recommendations, and worked around our schedules as busy professionals. The house sold extremely quickly and the staging was wonderfully done.",
      name: "Christine Smith",
    },
    {
      quote:
        "An outstanding job. Blake went above and beyond for those unfamiliar with the real estate world. He brought together all the services needed for the sale and made this transaction possible in a short time.",
      name: "Larry Ciche",
    },
  ];

  const heroGraphic = imgUrl(acf?.heroGraphicImage, heroGraphicUrl);
  const heroBedroom = imgUrl(acf?.heroBedroomImage, heroBedroomUrl);
  const heroBedroomAltText = imgAlt(acf?.heroBedroomImage, "Bright modern Sacramento home interior");
  const mastersClub = imgUrl(acf?.mastersClubImage, mastersClubUrl);
  const mastersClubAltText =
    acf?.mastersClubAlt || "Masters Club — Placer County Association of Realtors";
  const whyImg = imgUrl(acf?.whyImage, blakePortraitUrl);
  const whyImgAlt = acf?.whyImageAlt || imgAlt(acf?.whyImage, "Blake Hammond");

  const heroTestimonials = wpTestimonials && wpTestimonials.length > 0
    ? wpTestimonials.slice(0, 3)
    : acf?.featuredTestimonials?.length
      ? acf.featuredTestimonials.map((t: any) => ({ quote: t.quote, name: t.name }))
      : testimonials;

  const sectionTestimonials = wpTestimonials && wpTestimonials.length > 0
    ? wpTestimonials
    : acf?.featuredTestimonials?.length
      ? acf.featuredTestimonials.map((t: any) => ({ quote: t.quote, name: t.name }))
      : undefined;

  const stats: { value: number; prefix?: string; suffix?: string; label: string }[] =
    acf?.stats?.length
      ? acf.stats.map((s: any) => ({
          value: Number(s.value) || 0,
          prefix: s.prefix || undefined,
          suffix: s.suffix || undefined,
          label: s.label || "",
        }))
      : [
          { value: 5, suffix: "+", label: "Local Expert" },
          { value: 40, prefix: "$", suffix: "M+", label: "In Real Estate Sold" },
          { value: 11, label: "Average Days on Market" },
          { value: 102, suffix: "%", label: "Average List-to-Sale Ratio" },
        ];

  const defaultHelpCards: ServiceCard[] = [
    { title: "Buying", image: buyingHouseUrl, href: "/buyer", desc: "We skip the sales pitches to focus entirely on protecting your contract and getting your offer accepted." },
    { title: "Selling", image: sellingHouseUrl, href: "/seller", desc: "Maximize profit with accurate pricing and high-impact marketing, with the option to leverage our Home Prep Selling Program." },
    { title: "Home Prep Program", image: prepLivingroomUrl, href: "/home-prep-program", desc: "We fund and manage 100% of your home preparation and repairs to drive up your sale price, paying nothing until it's sold." },
  ];
  const helpCards: ServiceCard[] = acf?.helpCards?.length
    ? acf.helpCards.map((c: any, i: number) => ({
        title: c.title || defaultHelpCards[i]?.title || "",
        image: imgUrl(c.image, defaultHelpCards[i]?.image || buyingHouseUrl),
        href: c.href || defaultHelpCards[i]?.href || "#",
        desc: c.desc || defaultHelpCards[i]?.desc || "",
      }))
    : defaultHelpCards;

  const whyIconMap: Record<string, typeof Hammer> = { Hammer, Trophy, ShieldCheck };
  const defaultWhyBullets = [
    {
      icon: Hammer,
      title: "Home Prep Program",
      desc: "We handle and fund 100% of your home preparation, repairs, and improvements so you sell for more and pay nothing until closing.",
    },
    {
      icon: Trophy,
      title: "Record of Success",
      desc: "Sold 18 homes that were previously listed by other agents and failed to sell.",
    },
    {
      icon: ShieldCheck,
      title: "No Comforting Lies",
      desc: "You get the unfiltered truth and raw market data. I'd rather protect your equity with hard facts than comfort you with a lie.",
    },
  ];
  const whyBullets = acf?.whyBullets?.length
    ? acf.whyBullets.map((b: any, i: number) => ({
        icon: whyIconMap[b.icon] || defaultWhyBullets[i]?.icon || Hammer,
        title: b.title || defaultWhyBullets[i]?.title || "",
        desc: b.desc || defaultWhyBullets[i]?.desc || "",
      }))
    : defaultWhyBullets;

  const mapSteps = (
    wpSteps: any[] | undefined,
    defaults: { num: string; title: string; desc: string; image: string }[]
  ) =>
    wpSteps?.length
      ? wpSteps.map((s: any, i: number) => ({
          num: s.num || defaults[i]?.num || "",
          title: s.title || defaults[i]?.title || "",
          desc: s.desc || defaults[i]?.desc || "",
          image: imgUrl(s.image, defaults[i]?.image || ""),
        }))
      : defaults;

  const homeProcessData: typeof processData = {
    buying: {
      label: acf?.processBuyingLabel || processData.buying.label,
      steps: mapSteps(acf?.processBuyingSteps, processData.buying.steps),
    },
    selling: {
      label: acf?.processSellingLabel || processData.selling.label,
      steps: mapSteps(acf?.processSellingSteps, processData.selling.steps),
    },
    preparing: {
      label: acf?.processPreparingLabel || processData.preparing.label,
      steps: mapSteps(acf?.processPreparingSteps, processData.preparing.steps),
    },
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative bg-muted overflow-hidden">
          {/* Decorative B graphic — aligned to top-left, cut off at the edge */}
          <Image
            src={heroGraphic}
            alt=""
            aria-hidden="true"
            width={640}
            height={640}
            className="block absolute top-0 left-0 -translate-x-1/4 w-[420px] md:w-[520px] lg:w-[640px] h-auto pointer-events-none select-none z-0 opacity-90"
            style={{ height: "auto" }}
          />

          {/* Hero Image - sticks to right edge, full section height */}
          <motion.div
            className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 z-0 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={heroBedroom}
              alt={heroBedroomAltText}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute bottom-6 left-6 h-24 w-24 drop-shadow-lg z-10"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image src={mastersClub} alt={mastersClubAltText} width={96} height={96} />
            </motion.div>
          </motion.div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-20">

              {/* Hero Content */}
              <motion.div
                className="w-full lg:w-[58%] lg:flex-none relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative z-10">
                  <h1 className="text-h1 font-bold leading-[1.1] tracking-tight mb-6">
                    {acf?.heroHeading ? (
                      <span className="whitespace-pre-line">{tc(acf.heroHeading)}</span>
                    ) : (
                      <>Buy With Confidence.<br />Sell For Top Dollar.</>
                    )}
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed max-w-xl">{acf?.heroBody || "Full-service listings, expert negotiation for buyers, and fully funded pre-market home preparation with no upfront costs."}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                      <Link href={acf?.heroCtaLink || "/connect"}>{acf?.heroCtaText || "Contact Blake"}</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-none font-medium text-sm border-foreground text-foreground bg-transparent w-full sm:w-auto h-[45px] px-6">
                      <Link href={acf?.heroSecondaryLink || "/home-prep-program"}>
                        {acf?.heroSecondaryText || "Home Prep Program"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Hero Image (mobile/tablet) */}
              <motion.div
                className="flex-1 w-full lg:hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden shadow-2xl">
                  <Image
                    src={heroBedroom}
                    alt={heroBedroomAltText}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                  />
                  <motion.div
                    className="absolute bottom-4 right-4 h-20 w-20 drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Image src={mastersClub} alt={mastersClubAltText} width={80} height={80} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <motion.section
          className="bg-accent py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-8 md:gap-12 text-left md:text-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-start md:items-center justify-center space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <span className="font-sans text-5xl md:text-6xl font-bold text-white">
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs md:text-sm font-semibold tracking-widest text-foreground/80">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="bg-background py-12 md:py-32 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-0">
              <Image src={quoteMarkUrl} alt="" width={64} height={64} className="h-12 md:h-16 w-auto mb-8 brightness-50 opacity-50" style={{ width: "auto" }} />
              <Stars className="w-6 h-6 mb-6" label="Rated 5 out of 5 stars" />
              <p className="font-sans text-2xl md:text-4xl leading-relaxed font-bold mb-12">
                "Blake did an amazing job helping me find the right home that was the perfect fit for me! He made the whole process very smooth. I would highly recommend using him!"
              </p>
              <p className="font-semibold text-lg">Gavin Hollmer</p>
            </div>
          </div>
        </motion.section>

        {/* How We Help */}
        <motion.section
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-8">
              <div className="max-w-2xl">
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">{acf?.helpEyebrow || "How I Help"}</p>
                <h2 className="text-h2 font-bold leading-tight">
                  {tc(acf?.helpHeading) || "Real Estate Shouldn't Feel Overwhelming."}
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {acf?.helpBody || "Skip high-pressure pitches. Expect honest advice, active market tracking, and answers that protect your money."}
                </p>
              </div>
            </div>

            <ServiceCards cards={helpCards} />

          </div>
        </motion.section>

        {/* Blake's Process */}
        <motion.section
          id="process"
          className="relative bg-background overflow-hidden lg:min-h-[720px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Image - sticks to left edge, full section height */}
          <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-1/2 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${processTrack}-${activeStep}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={homeProcessData[processTrack].steps[activeStep].image} alt="" fill sizes="50vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="hidden lg:block" />
              <div className="flex flex-col pt-6 pb-4 lg:py-20 gap-10 w-full lg:w-[85%] lg:max-w-[520px] mx-auto">
                <div>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    {tc(acf?.processHeading) || "My Process"}
                  </h2>
                  <p className="text-foreground/70">
                    {acf?.processSubtitle || "A practical roadmap to outpace local market averages."}
                  </p>
                </div>

                <div className="flex flex-col border divide-y divide-foreground/10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 sm:border-0 sm:divide-y-0 sm:border-b border-foreground/10">
                  {(Object.keys(homeProcessData) as ProcessTrack[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setProcessTrack(key);
                        setActiveStep(0);
                      }}
                      className={`relative w-full text-left sm:w-auto px-4 sm:px-1 py-3 text-sm font-medium transition-colors ${
                        processTrack === key
                          ? "text-foreground"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {homeProcessData[key].label}
                      {processTrack === key && (
                        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  {homeProcessData[processTrack].steps.map((step, i) => {
                    const isActive = activeStep === i;
                    return (
                      <button
                        key={`${processTrack}-${i}`}
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
                      <motion.div
                        key={`m-${processTrack}-${activeStep}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image src={homeProcessData[processTrack].steps[activeStep].image} alt="" fill sizes="100vw" className="object-cover" />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <Link
                    href={acf?.processCtaLink || "/connect"}
                    className="mt-8 self-start inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] text-sm font-medium"
                  >
                    {acf?.processCtaText || "Learn More"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Owners Love Working With Blake */}
        <motion.section
          id="about"
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">

              {/* Video — desktop left column */}
              <div className="hidden lg:block">
                <YoutubeVideoFacade
                  videoId={acf?.whyVideoId || "lFMTIp7BqEg"}
                  thumbSrc={imgUrl(acf?.whyVideoImage, whyVideoThumbUrl)}
                  title="Why Work With Blake"
                />
              </div>

              {/* Text content */}
              <div>
                <h2 className="text-h2 font-bold leading-[1.1] mb-10 text-balance">
                  {tc(acf?.whyHeading) || "Why Homeowners Choose Blake Over The Competition"}
                </h2>

                <div className="space-y-6 mb-0 lg:mb-10">
                  {whyBullets.map((b: { icon: typeof Hammer; title: string; desc: string }) => {
                    const Icon = b.icon;
                    return (
                      <div key={b.title} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-primary/20 text-primary">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-sans text-xl md:text-2xl font-bold mb-1">
                            {b.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed text-pretty">{b.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile video — between bullets and CTAs */}
                <div className="lg:hidden my-8">
                  <YoutubeVideoFacade
                    videoId={acf?.whyVideoId || "lFMTIp7BqEg"}
                    thumbSrc={imgUrl(acf?.whyVideoImage, whyVideoThumbUrl)}
                    title="Why Work With Blake"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href={acf?.whyCtaLink || "/connect"}>{acf?.whyCtaText || "Contact Blake"}</Link>
                  </Button>
                  <a href={acf?.whySecondaryLink || "/about"} className="group flex items-center justify-center sm:justify-start w-full sm:w-auto h-[45px] sm:h-auto border border-primary sm:border-0 rounded-none text-primary font-medium sm:font-semibold text-sm sm:text-base hover:bg-primary hover:text-primary-foreground sm:hover:bg-transparent sm:hover:text-primary sm:hover:opacity-80 transition-all">
                    {acf?.whySecondaryText || "More About Blake"}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

        {/* What Our Clients Say */}
        <TestimonialsSection />

        {/* FAQs */}
        <motion.section
          className="relative overflow-hidden bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src={faqBackdropUrl}
            alt=""
            aria-hidden="true"
            width={980}
            height={980}
            className="pointer-events-none select-none absolute -left-40 top-1/2 -translate-y-1/2 w-[640px] md:w-[820px] lg:w-[980px] h-auto opacity-[0.07] z-0"
          />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20">
              <div className="lg:col-span-4">
                <h2 className="text-h2 font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  Common questions from local homeowners. Don't see yours? Get in touch, a personal walkthrough is always available.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="grid">
                  <div className="col-start-1 row-start-1">
                    <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                      {faqs.map((f, i) => (
                        <AccordionItem
                          key={i}
                          value={`item-${i}`}
                          className="border-b border-foreground/15"
                        >
                          <AccordionTrigger className="text-left font-sans text-lg md:text-xl font-bold py-6 hover:no-underline">
                            {f.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-foreground/70 leading-relaxed pb-6 text-base">
                            {f.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                  {/* Invisible sizer: reserves the height of the tallest open state so
                      opening/closing an accordion never shifts the content below. */}
                  <div aria-hidden="true" className="col-start-1 row-start-1 invisible pointer-events-none hidden lg:block">
                    {faqs.map((f, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 py-6 border-b">
                        <span className="text-left font-sans text-lg md:text-xl font-bold">{f.q}</span>
                        <span className="h-5 w-5 shrink-0" />
                      </div>
                    ))}
                    <div className="grid">
                      {faqs.map((f, i) => (
                        <p key={i} className="col-start-1 row-start-1 leading-relaxed pb-6 pt-0 text-base">
                          {f.a}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Ready to Make Your Move CTA */}
        <motion.section
          className="relative overflow-hidden bg-foreground text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={heroBedroomUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/40 to-foreground/60" />
          </div>

          {/* B graphic watermark */}
          <Image
            src={heroGraphicUrl}
            alt=""
            aria-hidden="true"
            width={520}
            height={520}
            className="pointer-events-none absolute -right-32 -bottom-24 w-[520px] h-auto opacity-[0.07] select-none"
          />

          <div className="relative container mx-auto px-4 md:px-8 py-12 md:py-32 text-left sm:text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Let's talk
            </p>
            <h2 className="text-h2 font-bold mb-6">
              Don't Miscalculate The Market
            </h2>
            <p className="text-white/70 max-w-xl sm:mx-auto mb-10 leading-relaxed">Use sharp contract strategies to buy the right property, or leverage our Home Prep Program to maximize your sale price.</p>
            <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px]"
              >
                <Link href="/connect">Contact Blake</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="border border-white text-white bg-transparent hover:bg-white hover:text-foreground no-default-hover-elevate no-default-active-elevate rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
              >
                <Link href="/home-value-analysis">See What Your Home Is Worth</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
      {/* Footer */}
      <footer className="relative overflow-hidden bg-muted text-foreground">
        {/* Property thumbnail strip */}
        <div className="grid grid-cols-3 h-32 md:h-40">
          {[buyingHouseUrl, sellingHouseUrl, prepLivingroomUrl].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 md:px-8 pt-20 pb-24 lg:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-3 flex flex-col items-center md:items-start">
              <Link href="/" className="mb-6">
                <Image
                  src={logoUrl}
                  alt="Blake Hammond Real Estate"
                  width={160}
                  height={24}
                  className="h-8 md:h-6 w-auto"
                  style={{ width: "auto" }}
                />
              </Link>
              <p className="text-foreground/60 text-sm leading-relaxed max-w-sm text-center md:text-left">
                A trusted real estate partner delivering modern, high-touch service for buyers, sellers, and homeowners preparing for their next move.
              </p>
            </div>

            <div className="lg:col-span-2">
              <p className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Quick Links</p>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "Buying", href: "/buyer" },
                  { label: "Selling", href: "/seller" },
                  { label: "About", href: "/about" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <p className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Services</p>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Home Prep Program", href: "/home-prep-program" },
                  { label: "Home Value Analysis", href: "/home-value-analysis" },
                  { label: "Book a Consultation", href: "/book-consultation" },
                  { label: "Contact Blake", href: "/connect" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <p className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Contact</p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary text-white">
                    <Phone className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <a href="tel:9166256118" className="hover:text-primary transition-colors">
                    (916) 625-6118
                  </a>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary text-white">
                    <Mail className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <a href="mailto:blakehammondre@gmail.com" className="hover:text-primary transition-colors">
                    blakehammondre@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <span className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary text-white">
                    <MapPin className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=925+Highland+Pointe+Dr+Suite+%23140%2C+Roseville%2C+CA+95678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    925 Highland Pointe Dr Suite #140, Roseville, CA 95678
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2 flex lg:justify-end">
              <Image
                src={mastersClubUrl}
                alt="Masters Club — Placer County Association of Realtors"
                width={96}
                height={96}
                className="h-24 w-24"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs text-foreground/50">
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Blake Hammond Real Estate. All rights reserved.
            </p>
            <Link
              href="/privacy-policy"
              className="text-xs text-foreground/50 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
