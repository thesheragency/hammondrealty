"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const heroBedroomUrl = "/images/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";
const heroGraphicUrl = "/images/graphic-hero_section_1779377398567.png";

interface CtaSectionProps {
  eyebrow?: string;
  heading?: React.ReactNode;
  body?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

export default function CtaSection({
  eyebrow = "Let's talk",
  heading = "Don't Miscalculate The Market",
  body = "Use sharp contract strategies to buy the right property, or leverage our Home Prep Program to maximize your sale price.",
  primaryLabel = "Contact Blake",
  secondaryLabel = "See What Your Home Is Worth",
  primaryHref = "/connect",
  secondaryHref = "/home-value-analysis",
}: CtaSectionProps) {
  return (
    <motion.section
      className="relative overflow-hidden bg-foreground text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0">
        <img src={heroBedroomUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/40 to-foreground/60" />
      </div>

      <img
        src={heroGraphicUrl}
        alt=""
        className="pointer-events-none absolute -right-32 -bottom-24 w-[520px] opacity-[0.07] select-none"
      />

      <div className="relative container mx-auto px-4 md:px-8 py-12 md:py-32 text-left sm:text-center">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-6">{eyebrow}</p>
        <h2 className="text-h2 font-bold mb-6">{heading}</h2>
        <p className="text-white/70 max-w-xl sm:mx-auto mb-10 leading-relaxed">{body}</p>
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px]"
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && (
            <Button
              asChild
              variant="ghost"
              className="border border-white text-white bg-transparent hover:bg-white hover:text-foreground no-default-hover-elevate no-default-active-elevate rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
