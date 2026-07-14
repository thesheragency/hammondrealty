"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Puzzle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";

const blakePortraitUrl = "/images/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1779913575853.png";
const prepLivingroomUrl = "/images/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg";
const buyingHouseUrl = "/images/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg";
const sellingHouseUrl = "/images/fancy_home_1782404943463.jpg";
const heroGraphicUrl = "/images/graphic-hero_section_1779377398567.png";
const blakeHeroUrl = "/images/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1_1779913878628.png";

const stats: { value: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 5, suffix: "+", label: "Local Expert" },
  { value: 40, prefix: "$", suffix: "M+", label: "In Real Estate Sold" },
  { value: 11, label: "Average Days on Market" },
  { value: 102, suffix: "%", label: "Average List-to-Sale Ratio" },
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

const values = [
  {
    icon: ShieldCheck,
    title: "Honesty Over Comfort",
    desc: "Expect unfiltered facts on pricing and market timing, never false promises, ensuring smart, profitable decisions.",
  },
  {
    icon: Eye,
    title: "Total Transparency",
    desc: "No being kept in the dark. Clients are fully looped in at every single stage of the transaction to always know what comes next.",
  },
  {
    icon: Puzzle,
    title: "Complex Problem Solving",
    desc: "Specializing in properties that should have sold but did not, using refined marketing systems to secure top dollar with less stress.",
  },
];

const aboutFaqs: Faq[] = [
  {
    q: "What situations do you specialize in?",
    a: "Traditional moves are fully supported, but expertise excels in complex sales, including estates, divorce, relocations, and listings that failed to sell previously.",
  },
  {
    q: "Why emphasize direct honesty?",
    a: "Real numbers are essential for smart financial decisions. Equity is protected with facts rather than temporary comfort or market lies.",
  },
  {
    q: "Will I work directly with Blake?",
    a: "Yes. Direct access to Blake is standard from start to finish with no call centers, hand-offs, or junior representatives.",
  },
  {
    q: "How does your advanced training help me?",
    a: "Coached by top real estate consultants, field-tested negotiation and pricing techniques are deployed to consistently beat average neighborhood days on market.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative bg-accent text-white overflow-hidden">
          <img
            src={heroGraphicUrl}
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 w-[1280px] translate-x-1/4 opacity-10 pointer-events-none select-none"
          />
          {/* Blake portrait — right side */}
          <motion.img
            src={blakeHeroUrl}
            alt="Blake Hammond"
            className="hidden lg:block absolute bottom-0 right-0 lg:right-32 xl:right-48 2xl:right-64 h-[500px] xl:h-[560px] 2xl:h-[600px] w-auto object-contain object-bottom pointer-events-none select-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          />
          <div className="container mx-auto px-4 md:px-8 relative z-20 pt-20 md:pt-28 pb-10 md:pb-28">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 mb-6">
                About Blake
              </p>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                I Tell You The Truth, Especially When It's Hard.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl">
                A calm, protective partner who handles the contractors, guides
                you through complex moves, and uses a 100% funded Home Prep
                Program to get you the most money for your home.
              </p>
              <Button asChild className="bg-white text-foreground hover:bg-white/90 border-transparent no-default-hover-elevate no-default-active-elevate rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-6 h-[45px]">
                <Link href="/get-in-touch">Contact Blake</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Bio + portrait */}
        <motion.section
          className="bg-background py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={blakePortraitUrl}
                  alt="Blake Hammond"
                  className="w-full h-full object-cover object-[center_25%]"
                />
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  Meet Blake
                </p>
                <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">Built To Guide Families Through Complex Moves</h2>
                <div className="space-y-5 text-foreground/75 text-base md:text-lg leading-relaxed">
                  <p>
                    Real estate is about more than property, it is about guiding
                    families safely through major life changes. Growing up with
                    two brothers on the autism spectrum instilled an early
                    understanding of patience, deep empathy, and how to steady
                    families through difficult transitions.
                  </p>
                  <p>
                    Since 2020, this background has fueled a specialization in
                    helping homeowners win in complex situations. Whether managing
                    estate sales, divorce, job relocations, or taking over listings
                    that failed to sell with previous agents, the focus remains on
                    resolving challenges where traditional approaches get stuck.
                    Advanced training under top national sales coaches translates
                    this proven strategy into top-dollar results.
                  </p>
                  <p>
                    Outside of defending client equity, life centers around family
                    in a local home shared with a high school sweetheart and wife,
                    son Daniel, and a cat, Jingles.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-6">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href="/get-in-touch">Contact Blake</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats strip */}
        <motion.section
          className="bg-accent py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center justify-center space-y-3"
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

        {/* What Blake stands for */}
        <motion.section
          className="bg-muted py-12 md:py-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8 max-w-5xl min-[1600px]:max-w-[1200px]">
            <div className="mb-14">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                What Blake stands for
              </p>
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Integrity-Driven Service<br />From Start To Finish
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="flex flex-col">
                    <div className="w-12 h-12 flex items-center justify-center bg-primary/20 text-primary mb-6">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                      {v.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
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

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">How I Help</p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight">
                  Real Estate Shouldn't Feel Overwhelming.
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Skip high-pressure pitches. Expect honest advice, active market tracking, and answers that protect your money.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:h-[560px]">
              {[
                { title: "Buying", image: buyingHouseUrl, href: "/buying", desc: "Find properties through unlisted home tracking, contract safeguards, and an intentional search." },
                { title: "Selling", image: sellingHouseUrl, href: "/selling", desc: "Maximize profit with accurate pricing and high-impact marketing, with the option to leverage our Home Prep Selling Program." },
                { title: "Home Prep Selling", image: prepLivingroomUrl, href: "/home-prep-program", desc: "We fund and handle 100% of the cosmetic updates and staging to drive up your sale price. You pay nothing until it is sold." }
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  className="group relative flex flex-col lg:flex-row overflow-hidden bg-background shadow-lg flex-1 lg:hover:flex-[2.2] transition-all duration-700 ease-out h-auto lg:h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  {/* Image */}
                  <div className="relative h-[320px] lg:h-auto lg:flex-1 min-w-0 overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="font-sans text-4xl font-bold drop-shadow-md">{card.title}</h3>
                    </div>
                  </div>

                  {/* Hover description panel */}
                  <div className="hidden lg:flex bg-primary text-primary-foreground overflow-hidden w-0 group-hover:w-[360px] transition-[width] duration-700 ease-out">
                    <div className="w-[360px] p-10 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <p className="text-base leading-relaxed">
                        {card.desc}
                      </p>
                      <Link
                        href={card.href}
                        className="self-start mt-8 inline-flex items-center text-sm font-semibold tracking-wide"
                      >
                        Learn more
                        <ArrowRight className="ml-3 w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Mobile description (in flow below the image on mobile) */}
                  <div className="lg:hidden bg-primary text-primary-foreground p-6">
                    <p className="text-sm leading-relaxed">{card.desc}</p>
                    <Link
                      href={card.href}
                      className="mt-4 inline-flex items-center text-sm font-semibold tracking-wide"
                    >
                      Learn more
                      <ArrowRight className="ml-3 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={aboutFaqs}
          intro="Common questions about working with Blake. Don't see yours? Get in touch, I'm happy to walk you through it."
        />

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
