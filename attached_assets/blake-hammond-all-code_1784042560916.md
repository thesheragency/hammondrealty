# Blake Hammond Real Estate — Complete Front-End Code

React + Vite + Tailwind CSS v4 + framer-motion + wouter. Copy each file into the matching path. Image assets are in the accompanying zip under attached_assets/ and src/assets/ (imported via the @assets/ alias defined in vite.config.ts).

## `components.json`

```json
{
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": "new-york",
    "rsc": false,
    "tsx": true,
    "tailwind": {
      "config": "",
      "css": "src/index.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
    },
    "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
    }
}```

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Blake Hammond Real Estate</title>
    <meta name="description" content="Blake Hammond Real Estate — built on Replit. Update this description to reflect the app." />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Blake Hammond Real Estate" />
    <meta property="og:description" content="Blake Hammond Real Estate — built on Replit. Update this description to reflect the app." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Blake Hammond Real Estate" />
    <meta name="twitter:description" content="Blake Hammond Real Estate — built on Replit. Update this description to reflect the app." />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## `package.json`

```json
{
  "name": "@workspace/blake-hammond",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --config vite.config.ts --host 0.0.0.0",
    "build": "vite build --config vite.config.ts",
    "serve": "vite preview --config vite.config.ts --host 0.0.0.0",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "devDependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-alert-dialog": "^1.1.7",
    "@radix-ui/react-aspect-ratio": "^1.1.3",
    "@radix-ui/react-avatar": "^1.1.4",
    "@radix-ui/react-checkbox": "^1.1.5",
    "@radix-ui/react-collapsible": "^1.1.4",
    "@radix-ui/react-context-menu": "^2.2.7",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-dropdown-menu": "^2.1.7",
    "@radix-ui/react-hover-card": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-menubar": "^1.1.7",
    "@radix-ui/react-navigation-menu": "^1.2.6",
    "@radix-ui/react-popover": "^1.1.7",
    "@radix-ui/react-progress": "^1.1.3",
    "@radix-ui/react-radio-group": "^1.2.4",
    "@radix-ui/react-scroll-area": "^1.2.4",
    "@radix-ui/react-select": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slider": "^1.2.4",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.1.4",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-toggle": "^1.1.3",
    "@radix-ui/react-toggle-group": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.2.0",
    "@replit/vite-plugin-cartographer": "catalog:",
    "@replit/vite-plugin-dev-banner": "catalog:",
    "@replit/vite-plugin-runtime-error-modal": "catalog:",
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/vite": "catalog:",
    "@tanstack/react-query": "catalog:",
    "@types/node": "catalog:",
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "@vitejs/plugin-react": "catalog:",
    "@workspace/api-client-react": "workspace:*",
    "class-variance-authority": "catalog:",
    "clsx": "catalog:",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "catalog:",
    "input-otp": "^1.4.2",
    "lucide-react": "catalog:",
    "next-themes": "^0.4.6",
    "react": "catalog:",
    "react-day-picker": "^9.11.1",
    "react-dom": "catalog:",
    "react-hook-form": "^7.55.0",
    "react-icons": "^5.4.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.15.2",
    "sonner": "^2.0.7",
    "tailwind-merge": "catalog:",
    "tailwindcss": "catalog:",
    "tw-animate-css": "^1.4.0",
    "vaul": "^1.1.2",
    "vite": "catalog:",
    "wouter": "^3.3.5",
    "zod": "catalog:"
  }
}
```

## `src/App.tsx`

```tsx
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/site/ScrollToTop";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Buying from "@/pages/Buying";
import Selling from "@/pages/Selling";
import HomePrep from "@/pages/HomePrep";
import About from "@/pages/About";
import HomeValue from "@/pages/HomeValue";
import GetInTouch from "@/pages/GetInTouch";
import BookConsultation from "@/pages/BookConsultation";
import Booked from "@/pages/Booked";
import ThankYou from "@/pages/ThankYou";
import Faqs from "@/pages/Faqs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buying" component={Buying} />
      <Route path="/selling" component={Selling} />
      <Route path="/home-prep-program" component={HomePrep} />
      <Route path="/about" component={About} />
      <Route path="/home-value-analysis" component={HomeValue} />
      <Route path="/get-in-touch" component={GetInTouch} />
      <Route path="/book-consultation" component={BookConsultation} />
      <Route path="/booked" component={Booked} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/faqs" component={Faqs} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
```

## `src/components/site/CtaSection.tsx`

```tsx
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroBedroomUrl from "@assets/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";
import heroGraphicUrl from "@assets/graphic-hero_section_1779377398567.png";

interface CtaSectionProps {
  eyebrow?: string;
  heading?: string;
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
  primaryHref = "/get-in-touch",
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
        <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{heading}</h2>
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
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-foreground no-default-hover-elevate no-default-active-elevate rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.section>
  );
}
```

## `src/components/site/FaqsSection.tsx`

```tsx
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqBackdropUrl from "@assets/graphic-hero_section_1779382669585.png";

export interface Faq {
  q: string;
  a: string;
}

interface FaqsSectionProps {
  faqs?: Faq[];
  intro?: string;
}

const defaultFaqs: Faq[] = [
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

export default function FaqsSection({
  faqs = defaultFaqs,
  intro = "Common questions from local homeowners. Don't see yours? Get in touch, a personal walkthrough is always available.",
}: FaqsSectionProps) {
  return (
    <motion.section
      className="relative overflow-hidden bg-muted py-12 md:py-32"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <img
        src={faqBackdropUrl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-40 top-1/2 -translate-y-1/2 w-[640px] md:w-[820px] lg:w-[980px] opacity-[0.07] z-0"
      />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-foreground/70 leading-relaxed">{intro}</p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid">
              <div className="col-start-1 row-start-1">
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b border-foreground/15">
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
              <div aria-hidden="true" className="col-start-1 row-start-1 invisible pointer-events-none">
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
  );
}
```

## `src/components/site/GoogleBadges.tsx`

```tsx
import { Star } from "lucide-react";

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

export function Stars({
  className = "w-4 h-4",
  label = "5 out of 5 stars based on Google reviews",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={className}
          style={{ color: "#FBBC04", fill: "#FBBC04" }}
        />
      ))}
    </div>
  );
}
```

## `src/components/site/ScrollToTop.tsx`

```tsx
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "";
    });
  }, [location]);

  return null;
}
```

## `src/components/site/SiteFooter.tsx`

```tsx
import { Phone, MapPin, Mail } from "lucide-react";
import { Link } from "wouter";
import logoUrl from "@assets/logo_1779376344245.png";
import mastersClubUrl from "@assets/Mask_group_1780678370076.png";
import buyingHouseUrl from "@assets/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg";
import sellingHouseUrl from "@assets/fancy_home_1782404943463.jpg";
import prepLivingroomUrl from "@assets/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-muted text-foreground">
      <div className="grid grid-cols-3 h-32 md:h-40">
        {[buyingHouseUrl, sellingHouseUrl, prepLivingroomUrl].map((src, i) => (
          <div key={i} className="relative overflow-hidden group">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/40 transition-opacity duration-700 group-hover:opacity-0" />
          </div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 md:px-8 pt-20 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <img src={logoUrl} alt="Blake Hammond Real Estate" className="h-8 md:h-6 w-auto mb-6" />
            <p className="text-foreground/60 text-sm leading-relaxed max-w-sm text-center md:text-left">
              A trusted real estate partner delivering modern, high-touch service for
              buyers, sellers, and homeowners preparing for their next move.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Buying", href: "/buying" },
                { label: "Selling", href: "/selling" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home Prep Program", href: "/home-prep-program" },
                { label: "Home Value Analysis", href: "/home-value-analysis" },
                { label: "Book a Consultation", href: "/book-consultation" },
                { label: "Contact Blake", href: "/get-in-touch" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Contact</h4>
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
            <img
              src={mastersClubUrl}
              alt="Masters Club — Placer County Association of Realtors"
              className="h-24 w-24"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Blake Hammond Real Estate. All rights reserved.
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
  );
}
```

## `src/components/site/SiteHeader.tsx`

```tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import logoUrl from "@assets/logo_1779376344245.png";

const navLinks = [
  { label: "Buying", href: "/buying" },
  { label: "Selling", href: "/selling" },
  { label: "Home Prep Program", href: "/home-prep-program" },
  { label: "About", href: "/about" },
  { label: "Home Value Analysis", href: "/home-value-analysis" },
];

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

export default function SiteHeader({ variant = "transparent" }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = variant === "solid" || isScrolled;

  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          solid ? "bg-muted/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link href="/" className="justify-self-start">
            <img src={logoUrl} alt="Blake Hammond Real Estate" className="h-4 md:h-5 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/") && !link.href.includes("#") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-5 justify-self-end">
            <a
              href="tel:916-625-6118"
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              916-625-6118
            </a>
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-[129px] h-[45px]"
            >
              Contact Blake
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2 justify-self-end">
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all px-4 h-[38px]"
            >
              Contact Blake
            </Link>
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 border-t border-border flex flex-col px-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-base font-medium py-2 border-b border-border/50 ${
                  isActive(link.href) ? "text-primary" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/get-in-touch"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 mt-4 w-full h-[45px] rounded-none font-medium text-sm"
            >
              Contact Blake
            </Link>
          </div>
        )}
      </header>

      {/* Sticky mobile call bar */}
      <a
        href="tel:916-625-6118"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-14 font-medium text-base shadow-[0_-2px_12px_rgba(0,0,0,0.12)]"
      >
        <Phone className="w-5 h-5" strokeWidth={2} />
        Call 916-625-6118
      </a>
    </>
  );
}
```

## `src/components/site/TestimonialsSection.tsx`

```tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GoogleG, Stars } from "@/components/site/GoogleBadges";

const reviews = [
  {
    quote:
      "Thoughtful, patient, understanding, and trustworthy. Blake was our 3rd realtor for our recent home sale. He delivered on his expectations for the home and had great communication throughout the whole process. Listened to his expertise, home listed at the right price point, and sold for over asking price, 36 hours after being listed. In Blake we trust! Couldn't have asked for a better person.",
    name: "Thomas Thornton",
  },
  {
    quote:
      "Excellent experience with Blake. He was friendly, supportive throughout the process, provided clear recommendations, and worked with us to accommodate two busy professionals! The house sold extremely quickly and his marketing and staging were wonderfully done. So appreciate him and would recommend him.",
    name: "Christine Smith",
  },
  {
    quote:
      "I selected Blake Hammond who did an outstanding job. I feel he went above and beyond what was required for the sale. His selection was very much based on the information that I provided, and I feel that Blake provides a very good service to those who are unfamiliar with the real estate world. I believe that he deserves ten stars for making this transaction possible in a short time, gathering all other services related to the sale, and communicating effectively to finish with grace.",
    name: "Larry Ciche",
  },
  {
    quote:
      "Blake did a wonderful job for us and got our house sold on the very first day it was listed. We could not be any happier with his help. We highly recommend him because we know he will take really good care of you.",
    name: "Tim Tingey",
  },
];

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <motion.section
      className="bg-background py-12 md:py-32 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-start text-left sm:items-center sm:text-center mb-16">
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Trusted By Homeowners</h2>
          <p className="text-foreground/70 leading-relaxed mb-8 max-w-xl">
            Rated 5 out of 5 stars based on verified client feedback.
          </p>
          <div className="flex items-center gap-4">
            <GoogleG className="w-9 h-9" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="font-sans text-2xl font-bold leading-none">5.0</span>
                <Stars className="w-5 h-5" label="Rated 5.0 out of 5 stars" />
              </div>
              <span className="text-sm text-foreground/60 mt-1">
                Based on Google reviews
              </span>
            </div>
          </div>
        </div>

        <Carousel className="w-full" opts={{ align: "start", loop: true }} setApi={setApi}>
          <CarouselContent className="-ml-4">
            {reviews.map((r, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-[88%] sm:basis-[60%] lg:basis-1/3"
              >
                <div className="flex flex-col h-full border border-foreground/10 bg-background p-8">
                  <div className="flex items-center justify-between mb-5">
                    <Stars className="w-4 h-4" />
                    <GoogleG className="w-6 h-6" />
                  </div>
                  <p className="text-foreground/80 text-base leading-relaxed mb-8 flex-1">
                    "{r.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-foreground/10">
                    <p className="font-sans text-sm font-bold leading-tight">{r.name}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-12">
            <CarouselPrevious className="static left-auto right-auto top-auto translate-y-0 border-0 bg-transparent shadow-none rounded-none text-foreground hover:text-primary hover:bg-muted disabled:opacity-100 transition-colors h-12 w-12 [&_svg]:!h-8 [&_svg]:!w-8" />
            <CarouselNext className="static left-auto right-auto top-auto translate-y-0 border-0 bg-transparent shadow-none rounded-none text-foreground hover:text-primary hover:bg-muted disabled:opacity-100 transition-colors h-12 w-12 [&_svg]:!h-8 [&_svg]:!w-8" />
          </div>
        </Carousel>
      </div>
    </motion.section>
  );
}
```

## `src/components/ui/accordion.tsx`

```tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-4 py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

## `src/components/ui/alert-dialog.tsx`

```tsx
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

## `src/components/ui/alert.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

## `src/components/ui/aspect-ratio.tsx`

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
```

## `src/components/ui/avatar.tsx`

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

## `src/components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // @replit
  // Whitespace-nowrap: Badges should never wrap.
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover-elevate ",
  {
    variants: {
      variant: {
        default:
          // @replit shadow-xs instead of shadow, no hover because we use hover-elevate
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary:
          // @replit no hover because we use hover-elevate
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          // @replit shadow-xs instead of shadow, no hover because we use hover-elevate
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",
          // @replit shadow-xs" - use badge outline variable
        outline: "text-foreground border [border-color:var(--badge-outline)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

## `src/components/ui/breadcrumb.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
```

## `src/components/ui/button-group.tsx`

```tsx
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
```

## `src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
" hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
           // @replit: no hover, and add primary border
           "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
        outline:
          // @replit Shows the background color of whatever card / sidebar / accent background it is inside of.
          // Inherits the current text color. Uses shadow-xs. no shadow on active
          // No hover state
          " border [border-color:var(--button-outline)] shadow-xs active:shadow-none ",
        secondary:
          // @replit border, no hover, no shadow, secondary border.
          "border bg-secondary text-secondary-foreground border border-secondary-border ",
        // @replit no hover, transparent border
        ghost: "border border-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // @replit changed sizes
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## `src/components/ui/calendar.tsx`

```tsx
"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
```

## `src/components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## `src/components/ui/carousel.tsx`

```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

## `src/components/ui/chart.tsx`

```tsx
import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== "none")
            .map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`
              const itemConfig = getPayloadConfigFromPayload(config, item, key)
              const indicatorColor = color || item.payload.fill || item.color

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    indicator === "dot" && "items-center"
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              }
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center"
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload
          .filter((item) => item.type !== "none")
          .map((item) => {
            const key = `${nameKey || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)

            return (
              <div
                key={item.value}
                className={cn(
                  "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
                )}
              >
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )}
                {itemConfig?.label}
              </div>
            )
          })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

## `src/components/ui/checkbox.tsx`

```tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

## `src/components/ui/collapsible.tsx`

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

## `src/components/ui/command.tsx`

```tsx
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

## `src/components/ui/context-menu.tsx`

```tsx
import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
```

## `src/components/ui/dialog.tsx`

```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

## `src/components/ui/drawer.tsx`

```tsx
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
```

## `src/components/ui/dropdown-menu.tsx`

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

## `src/components/ui/empty.tsx`

```tsx
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
```

## `src/components/ui/field.tsx`

```tsx
"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field data-[invalid=true]:text-destructive flex w-full gap-3",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start",
        ],
        responsive: [
          "@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>[data-slot=field]]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm font-normal leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "nth-last-2:-mt-1 last:mt-0 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
```

## `src/components/ui/form.tsx`

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

## `src/components/ui/hover-card.tsx`

```tsx
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
```

## `src/components/ui/input-group.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]",
        "h-9 has-[>textarea]:h-auto",

        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",

        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1",

        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",

        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end":
          "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
```

## `src/components/ui/input-otp.tsx`

```tsx
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
```

## `src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

## `src/components/ui/item.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4 ",
        sm: "gap-2.5 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
```

## `src/components/ui/kbd.tsx`

```tsx
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
```

## `src/components/ui/label.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

## `src/components/ui/menubar.tsx`

```tsx
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
```

## `src/components/ui/navigation-menu.tsx`

```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
```

## `src/components/ui/pagination.tsx`

```tsx
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
```

## `src/components/ui/popover.tsx`

```tsx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
```

## `src/components/ui/progress.tsx`

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

## `src/components/ui/radio-group.tsx`

```tsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

## `src/components/ui/resizable.tsx`

```tsx
"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```

## `src/components/ui/scroll-area.tsx`

```tsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

## `src/components/ui/select.tsx`

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

## `src/components/ui/separator.tsx`

```tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

## `src/components/ui/sheet.tsx`

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

## `src/components/ui/sidebar.tsx`

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0 [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4))]"
            : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+var(--spacing-4)+2px)]"
            : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  // Note: Tailwind v3.4 doesn't support "in-" selectors. So the rail won't work perfectly.
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:w-8! group-data-[collapsible=icon]:h-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[var(--skeleton-width)] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline outline-2 outline-transparent outline-offset-2 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
```

## `src/components/ui/skeleton.tsx`

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

## `src/components/ui/slider.tsx`

```tsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

## `src/components/ui/sonner.tsx`

```tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
```

## `src/components/ui/spinner.tsx`

```tsx
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

## `src/components/ui/switch.tsx`

```tsx
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

## `src/components/ui/table.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

## `src/components/ui/tabs.tsx`

```tsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

## `src/components/ui/textarea.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
```

## `src/components/ui/toaster.tsx`

```tsx
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

## `src/components/ui/toast.tsx`

```tsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

## `src/components/ui/toggle-group.tsx`

```tsx
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
```

## `src/components/ui/toggle.tsx`

```tsx
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
```

## `src/components/ui/tooltip.tsx`

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

## `src/hooks/use-mobile.tsx`

```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

## `src/hooks/use-toast.ts`

```tsx
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

## `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
@import "tailwindcss";
@import "tw-animate-css";
@plugin "@tailwindcss/typography";

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

@custom-variant dark (&:is(.dark *));

/* Tablets up to 1279px (e.g. 800x1280 and 1024x1366) share the same stacked
   layout; desktop (`lg:`) layouts only kick in at 1280px and up. */
@theme {
  --breakpoint-lg: 80rem;
}

/* Tablets (768–1279px): with `lg` raised to 1280px, the container would
   otherwise stay capped at 768px and leave huge side margins at 1024px.
   Let it fill the viewport like it does at 800px. */
@media (min-width: 768px) and (max-width: 1279.98px) {
  .container {
    max-width: 100%;
  }
}

/* Widescreen: let content grow up to 1920px while keeping a small margin */
@media (min-width: 1600px) {
  .container {
    max-width: min(96%, 1920px);
  }
}

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-card-border: hsl(var(--card-border));

  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-popover-border: hsl(var(--popover-border));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-primary-border: var(--primary-border);

  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-secondary-border: var(--secondary-border);

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-muted-border: var(--muted-border);

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-accent-border: var(--accent-border);

  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-destructive-border: var(--destructive-border);

  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));

  --color-sidebar: hsl(var(--sidebar));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-primary-border: var(--sidebar-primary-border);
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-accent-border: var(--sidebar-accent-border);
  --color-sidebar-ring: hsl(var(--sidebar-ring));

  --font-sans: var(--app-font-sans);
  --font-serif: var(--app-font-serif);
  --font-mono: var(--app-font-mono);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* LIGHT MODE */
:root {
  --button-outline: rgba(0,0,0, .10);
  --badge-outline: rgba(0,0,0, .05);

  /* Automatic computation of border around primary / danger buttons */
  --opaque-button-border-intensity: -8; /* In terms of percentages */

  /* Backgrounds applied on top of other backgrounds when hovered/active */
  --elevate-1: rgba(0,0,0, .03);
  --elevate-2: rgba(0,0,0, .08);

  --background: 0 0% 100%;

  --foreground: 0 0% 0%;

  --border: 0 0% 90%;

  --card: 0 0% 100%;

  --card-foreground: 0 0% 0%;

  --card-border: 0 0% 90%;

  --sidebar: 0 0% 97%;

  --sidebar-foreground: 0 0% 0%;

  --sidebar-border: 0 0% 90%;

  --sidebar-primary: 95 12% 62%;

  --sidebar-primary-foreground: 0 0% 100%;

  --sidebar-accent: 95 12% 62%;

  --sidebar-accent-foreground: 0 0% 0%;

  --sidebar-ring: 95 12% 62%;

  --popover: 0 0% 100%;

  --popover-foreground: 0 0% 0%;

  --popover-border: 0 0% 90%;

  --primary: 95 12% 62%;

  --primary-foreground: 0 0% 0%;

  --secondary: 0 0% 97%;

  --secondary-foreground: 0 0% 0%;

  --muted: 0 0% 97%;

  --muted-foreground: 0 0% 40%;

  --accent: 95 12% 62%;

  --accent-foreground: 0 0% 0%;

  --destructive: 0 84% 60%;

  --destructive-foreground: 0 0% 100%;

  --input: 0 0% 90%;
  --ring: 95 12% 62%;
  --chart-1: 95 12% 62%;
  --chart-2: 95 12% 62%;
  --chart-3: 0 0% 60%;
  --chart-4: 0 0% 40%;
  --chart-5: 0 0% 20%;

  --app-font-sans: 'Inter', sans-serif;
  --app-font-serif: 'Playfair Display', serif;
  --app-font-mono: Menlo, monospace;
  --radius: .5rem; /* 8px */
  --shadow-2xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00); /*replace with H S L */
  --shadow-xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00); /*replace with H S L */
  --shadow-sm: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-md: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 2px 4px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-lg: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 4px 6px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-xl: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 8px 10px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-2xl: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --tracking-normal: 0em;
  --spacing: 0.25rem;

  /* Automatically computed borders - intensity can be controlled by the user by the --opaque-button-border-intensity setting */

  /* Fallback for older browsers */
  --sidebar-primary-border: hsl(var(--sidebar-primary));
  --sidebar-primary-border: hsl(from hsl(var(--sidebar-primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --sidebar-accent-border: hsl(var(--sidebar-accent));
  --sidebar-accent-border: hsl(from hsl(var(--sidebar-accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --primary-border: hsl(var(--primary));
  --primary-border: hsl(from hsl(var(--primary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --secondary-border: hsl(var(--secondary));
  --secondary-border: hsl(from hsl(var(--secondary)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --muted-border: hsl(var(--muted));
  --muted-border: hsl(from hsl(var(--muted)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --accent-border: hsl(var(--accent));
  --accent-border: hsl(from hsl(var(--accent)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);

  /* Fallback for older browsers */
  --destructive-border: hsl(var(--destructive));
  --destructive-border: hsl(from hsl(var(--destructive)) h s calc(l + var(--opaque-button-border-intensity)) / alpha);
}

.dark {
  --button-outline: rgba(255,255,255, .10);
  --badge-outline: rgba(255,255,255, .05);

  --opaque-button-border-intensity: 9;  /* In terms of percentages */

  /* Backgrounds applied on top of other backgrounds when hovered/active */
  --elevate-1: rgba(255,255,255, .04);
  --elevate-2: rgba(255,255,255, .09);

  --background: red; /*replace with H S L */

  --foreground: red; /*replace with H S L */

  --border: red; /*replace with H S L */

  --card: red; /*replace with H S L */

  --card-foreground: red; /*replace with H S L */

  --card-border: red; /*replace with H S L */

  --sidebar: red; /*replace with H S L */

  --sidebar-foreground: red; /*replace with H S L */

  --sidebar-border: red; /*replace with H S L */

  --sidebar-primary: red; /*replace with H S L */

  --sidebar-primary-foreground: red; /*replace with H S L */

  --sidebar-accent: red; /*replace with H S L */

  --sidebar-accent-foreground: red; /*replace with H S L */

  --sidebar-ring: red; /*replace with H S L */

  --popover: red; /*replace with H S L */

  --popover-foreground: red; /*replace with H S L */

  --popover-border: red; /*replace with H S L */

  --primary: red; /*replace with H S L */

  --primary-foreground: 0 0% 0%; /*black*/

  --secondary: red; /*replace with H S L */

  --secondary-foreground: red; /*replace with H S L */

  --muted: red; /*replace with H S L */

  --muted-foreground: red; /*replace with H S L */

  --accent: red; /*replace with H S L */

  --accent-foreground: red; /*replace with H S L */

  --destructive: red; /*replace with H S L */

  --destructive-foreground: red; /*replace with H S L */

  /* Used as the border around inputs. Dark mode: Should be a border that is light enough to have high contrast when rendered on a --card background. More contrast than standard --border */
  --input: red; /*replace with H S L */
  --ring: red; /*replace with H S L */
  --chart-1: red; /*replace with H S L */
  --chart-2: red; /*replace with H S L */
  --chart-3: red; /*replace with H S L */
  --chart-4: red; /*replace with H S L */
  --chart-5: red; /*replace with H S L */

  --shadow-2xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-xs: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-sm: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 1px 2px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-md: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 2px 4px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-lg: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 4px 6px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-xl: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00), 0px 8px 10px -1px hsl(202.8169 89.1213% 53.1373% / 0.00);
  --shadow-2xl: 0px 2px 0px 0px hsl(202.8169 89.1213% 53.1373% / 0.00);

}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply font-sans antialiased bg-background text-foreground;
  }
}

/* Smoother accordion expand/collapse — overrides tw-animate-css defaults */
@keyframes accordion-down-smooth {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}
@keyframes accordion-up-smooth {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}
[data-slot="accordion-content"],
[data-state="open"] > [data-radix-accordion-content],
[data-state="closed"] > [data-radix-accordion-content] {
  will-change: height, opacity;
}
[data-radix-accordion-content][data-state="open"] {
  animation: accordion-down-smooth 480ms cubic-bezier(0.22, 1, 0.36, 1);
}
[data-radix-accordion-content][data-state="closed"] {
  animation: accordion-up-smooth 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  [data-radix-accordion-content][data-state="open"],
  [data-radix-accordion-content][data-state="closed"] {
    animation: none;
  }
}

/**
 * Using the elevate system.
 * Automatic contrast adjustment.
 *
 * <element className="hover-elevate" />
 * <element className="active-elevate-2" />
 *
 * // Using the tailwind utility when a data attribute is "on"
 * <element className="toggle-elevate data-[state=on]:toggle-elevated" />
 * // Or manually controlling the toggle state
 * <element className="toggle-elevate toggle-elevated" />
 *
 * Elevation systems have to handle many states.
 * - not-hovered, vs. hovered vs. active  (three mutually exclusive states)
 * - toggled or not
 * - focused or not (this is not handled with these utilities)
 *
 * Even without handling focused or not, this is six possible combinations that
 * need to be distinguished from eachother visually.
 */
@layer utilities {

  /* Hide ugly search cancel button in Chrome until we can style it properly */
  input[type="search"]::-webkit-search-cancel-button {
    @apply hidden;
  }

  /* Placeholder styling for contentEditable div */
  [contenteditable][data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    pointer-events: none;
  }

  /* .no-default-hover-elevate/no-default-active-elevate is an escape hatch so consumers of
   * buttons/badges can remove the automatic brightness adjustment on interactions
   * and program their own. */
  .no-default-hover-elevate {}

  .no-default-active-elevate {}


  /**
   * Toggleable backgrounds go behind the content. Hoverable/active goes on top.
   * This way they can stack/compound. Both will overlap the parent's borders!
   * So borders will be automatically adjusted both on toggle, and hover/active,
   * and they will be compounded.
   */
  .toggle-elevate::before,
  .toggle-elevate-2::before {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0px;
    /*border-radius: inherit;   match rounded corners */
    border-radius: inherit;
    z-index: -1;
    /* sits behind content but above backdrop */
  }

  .toggle-elevate.toggle-elevated::before {
    background-color: var(--elevate-2);
  }

  /* If there's a 1px border, adjust the inset so that it covers that parent's border */
  .border.toggle-elevate::before {
    inset: -1px;
  }

  /* Does not work on elements with overflow:hidden! */
  .hover-elevate:not(.no-default-hover-elevate),
  .active-elevate:not(.no-default-active-elevate),
  .hover-elevate-2:not(.no-default-hover-elevate),
  .active-elevate-2:not(.no-default-active-elevate) {
    position: relative;
    z-index: 0;
  }

  .hover-elevate:not(.no-default-hover-elevate)::after,
  .active-elevate:not(.no-default-active-elevate)::after,
  .hover-elevate-2:not(.no-default-hover-elevate)::after,
  .active-elevate-2:not(.no-default-active-elevate)::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0px;
    /*border-radius: inherit;   match rounded corners */
    border-radius: inherit;
    z-index: 999;
    /* sits in front of content */
  }

  .hover-elevate:hover:not(.no-default-hover-elevate)::after,
  .active-elevate:active:not(.no-default-active-elevate)::after {
    background-color: var(--elevate-1);
  }

  .hover-elevate-2:hover:not(.no-default-hover-elevate)::after,
  .active-elevate-2:active:not(.no-default-active-elevate)::after {
    background-color: var(--elevate-2);
  }

  /* If there's a 1px border, adjust the inset so that it covers that parent's border */
  .border.hover-elevate:not(.no-hover-interaction-elevate)::after,
  .border.active-elevate:not(.no-active-interaction-elevate)::after,
  .border.hover-elevate-2:not(.no-hover-interaction-elevate)::after,
  .border.active-elevate-2:not(.no-active-interaction-elevate)::after,
  .border.hover-elevate:not(.no-hover-interaction-elevate)::after {
    inset: -1px;
  }
}```

## `src/lib/utils.ts`

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "")
  if (digits.length > 10 && digits.startsWith("1")) digits = digits.slice(1)
  digits = digits.slice(0, 10)
  if (digits.length === 0) return ""
  if (digits.length < 4) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
```

## `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

## `src/pages/About.tsx`

```tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Puzzle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";

import blakePortraitUrl from "@assets/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1779913575853.png";
import prepLivingroomUrl from "@assets/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg";
import buyingHouseUrl from "@assets/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg";
import sellingHouseUrl from "@assets/fancy_home_1782404943463.jpg";
import heroGraphicUrl from "@assets/graphic-hero_section_1779377398567.png";
import blakeHeroUrl from "@assets/B1B889F6-9C80-4F33-A424-863BFD5EBF72_1_1779913878628.png";

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
```

## `src/pages/BookConsultation.tsx`

```tsx
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

const expectations = [
  {
    title: "A Real Conversation",
    desc: "A quick chat to understand specific family goals and timelines with no pressure and no script.",
  },
  {
    title: "Honest Market Context",
    desc: "Clear property data on where active market buyers are right now and what that means for your equity.",
  },
  {
    title: "A Clear Next Step",
    desc: "Walk away from the conversation with a simple roadmap, whether a move is planned in 30 days or 12 months.",
  },
];

export default function BookConsultation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Book Consultation – Blake Hammond RE",
          Name: form.name,
          Email: form.email,
          Address: form.address,
          Notes: form.notes,
        }),
      });
    } catch {
      // show success regardless
    }
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="bg-background py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">

              {/* Left: copy — stays constant */}
              <div className="lg:sticky lg:top-32">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                  Thanks for reaching out
                </p>
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  Book A 15 Minute<br />Call With Blake
                </h1>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md mb-8">
                  Make your move simple and stress-free. Whether you are buying or
                  selling, this conversation is designed to help you feel confident
                  every step of the way with straightforward, honest communication.
                </p>

                <ul className="space-y-4 mb-8">
                  {expectations.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-1 w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="font-sans font-semibold text-base leading-snug">
                          {item.title}
                        </p>
                        <p className="text-sm text-foreground/70 leading-relaxed mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="text-foreground/70 leading-relaxed text-base max-w-md">
                  Pick a time that works for you. Consultations happen by phone or
                  Zoom, depending completely on your preference, and they always
                  start right on time.
                </p>
              </div>

              {/* Right: form → then calendar */}
              <div>
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-muted p-8 md:p-10"
                    >
                      <p className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-2">
                        Step 1 of 2
                      </p>
                      <h2 className="font-sans text-2xl md:text-3xl font-bold mb-1">
                        A little about you
                      </h2>
                      <p className="text-sm text-foreground/60 mb-8">
                        Fill this out and we will get you straight to the calendar.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Name
                          </Label>
                          <Input
                            id="name"
                            required
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Address{" "}
                            <span className="text-foreground/40 font-normal">(optional)</span>
                          </Label>
                          <Input
                            id="address"
                            placeholder="Property or home address"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="rounded-none bg-white border-foreground/20 focus-visible:ring-primary h-11"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor="notes" className="text-sm font-medium">
                            Anything you would like me to know
                          </Label>
                          <textarea
                            id="notes"
                            rows={4}
                            placeholder="Share any details about your situation, goals, or questions..."
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            className="w-full rounded-none bg-white border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary px-3 py-2.5 text-sm resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-[45px] font-medium text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                          Continue to Booking
                          <ArrowRight className="w-4 h-4" strokeWidth={2} />
                        </Button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="calendar"
                      id="calendar"
                      className="scroll-mt-32"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="bg-primary/10 border-l-4 border-primary px-5 py-4 mb-6">
                        <p className="text-sm font-medium text-foreground">
                          Thanks, {form.name.split(" ")[0] || "there"}! Now pick a time that works for you.
                        </p>
                      </div>

                      <div className="bg-muted aspect-square lg:aspect-auto lg:min-h-[560px] flex flex-col items-center justify-center text-center p-8">
                        <p className="font-sans text-xs uppercase tracking-[0.25em] text-primary mb-4">
                          Step 2 of 2
                        </p>
                        <CalendarDays
                          className="w-10 h-10 text-foreground/40 mb-4"
                          strokeWidth={1.5}
                        />
                        <h2 className="font-sans text-2xl md:text-3xl font-bold mb-2">
                          Calendar Embed
                        </h2>
                        <p className="text-sm text-foreground/60 max-w-xs mb-6">
                          Connect your scheduling tool (Calendly, SavvyCal, Google Calendar) here.
                        </p>
                        <a
                          href="/booked"
                          className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto h-[45px] px-6"
                        >
                          Confirm Booking
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
```

## `src/pages/Booked.tsx`

```tsx
import { motion } from "framer-motion";
import { Play, CalendarCheck } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function Booked() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="bg-muted py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 mb-6 text-xs uppercase tracking-[0.3em] font-medium">
                <CalendarCheck className="w-4 h-4" strokeWidth={2} />
                Call Booked
              </div>

              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Watch This Video<br />Before Our Call
              </h1>

              <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-10">
                You are all set. Take 4 minutes to watch this short walkthrough video.
                It will help make our upcoming conversation faster, smoother, and much
                more useful for your planning.
              </p>

              {/* Video placeholder */}
              <div className="relative aspect-video w-full max-w-3xl mx-auto bg-foreground/80 shadow-2xl mb-10 group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-background/95 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play
                      className="w-8 h-8 md:w-10 md:h-10 text-foreground ml-1"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </div>
                </div>
              </div>

              <a
                href="/"
                className="inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto h-[45px] px-8"
              >
                Back to Home
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
```

## `src/pages/Buying.tsx`

```tsx
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Play, SearchCheck, Lock, Handshake, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/lib/utils";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";

import heroGraphicUrl from "@assets/graphic-hero_section_1779377398567.png";
import stepBuying1Url from "@assets/generated_images/step-buying-1-discover.png";
import stepBuying2Url from "@assets/generated_images/step-buying-2-search.png";
import stepBuying3Url from "@assets/generated_images/step-buying-3-close.png";
import buyingBlakeUrl from "@/assets/prep-video-thumb.jpg";
import blakePresentingPropertyUrl from "@assets/generated_images/blake-presenting-property.png";
import processBuyingUrl from "@assets/generated_images/process-buying.png";
import prepBedroomBeforeUrl from "@/assets/prep-bedroom-before.jpg";
import stepFundingUrl from "@assets/generated_images/step-preparing-4-funding.png";
import stepOffersUrl from "@assets/generated_images/step-selling-3-offers.png";
import testimonialCoupleUrl from "@assets/generated_images/testimonial-couple.png";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

type ContactFormErrors = Partial<
  Record<"name" | "email" | "phone" | "message" | "agree", string>
>;

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): ContactFormErrors => {
    const next: ContactFormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    else if (
      !PHONE_RE.test(form.phone.trim()) ||
      form.phone.replace(/\D/g, "").length < 7
    )
      next.phone = "Please enter a valid phone number.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    if (!form.agree) next.agree = "Please agree to be contacted.";
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "Buying Inquiry – Blake Hammond RE",
            Name: form.name,
            Email: form.email,
            Phone: form.phone,
            Message: form.message,
          }),
        });
      } catch {
        // show success regardless
      }
      setSubmitted(true);
    }
  };

  const clearError = (field: keyof ContactFormErrors) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });

  const inputClass = (field: keyof ContactFormErrors) =>
    `w-full border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors ${
      errors[field] ? "border-red-500" : "border-foreground/15"
    }`;

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
    <form
      noValidate
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-10 shadow-2xl space-y-4 w-full"
    >
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            clearError("name");
          }}
          aria-invalid={!!errors.name}
          className={inputClass("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              clearError("email");
            }}
            aria-invalid={!!errors.email}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: formatPhone(e.target.value) });
              clearError("phone");
            }}
            aria-invalid={!!errors.phone}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={4}
          placeholder="Message"
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            clearError("message");
          }}
          aria-invalid={!!errors.message}
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-start gap-2 text-xs text-foreground/60 leading-relaxed">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => {
              setForm({ ...form, agree: e.target.checked });
              clearError("agree");
            }}
            aria-invalid={!!errors.agree}
            className="mt-0.5 accent-primary"
          />
          <span>I agree to be contacted by Blake Hammond Real Estate.</span>
        </label>
        {errors.agree && (
          <p className="mt-1 text-xs text-red-600">{errors.agree}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full h-[45px]"
      >
        Submit
      </Button>
    </form>
  );
}

export default function Buying() {
  const [activeStep, setActiveStep] = useState(0);
  const stepImages = [stepBuying1Url, stepBuying2Url, stepBuying3Url];

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
                    Buying with Blake
                  </p>
                  <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                    Beat The Competition<br />To The Property
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">Write sharp offers and out-negotiate the competition so you get the house you want without overpaying.</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted group cursor-pointer hidden lg:block">
                <img
                  src={buyingBlakeUrl}
                  alt="Blake Hammond on the podcast — Why Buy With Blake"
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
                  Why Blake
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Buying With Total Certainty</h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">Skip the average door-opener. You get an honest advisor who handles everything from the initial search to the final contract, ensuring you never make a blind investment.</p>

                <ul className="space-y-6 mb-10">
                  {whyBuyBullets.map((b) => {
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

                {/* Mobile image — above the CTA buttons */}
                <div className="lg:hidden relative aspect-[4/3] overflow-hidden bg-muted mb-10">
                  <img
                    src={buyingBlakeUrl}
                    alt="Blake Hammond on the podcast — Why Buy With Blake"
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
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href="/get-in-touch">Contact Blake</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
                  >
                    <Link href="/home-value-analysis">Free Home Value Analysis</Link>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  Buyer Tips
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Taking The Stress<br />Out Of Buying
                </h2>
              </div>
              <p className="max-w-md text-lg text-foreground/70 leading-relaxed">
                Setting a few clear ground rules early protects your cash and saves you
                months of wasted weekend tours.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {buyerTips.map((tip, i) => (
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
                    <h3 className="font-sans text-xl md:text-2xl font-bold mb-2">{tip.title}</h3>
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
                src={buyingSteps[activeStep].image}
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
              <div className="flex flex-col pt-6 pb-10 lg:py-20 gap-10 w-full lg:w-[85%] lg:max-w-[520px] mx-auto">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">Home Buying Process</p>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    A Clear Path To Closing
                  </h2>
                  <p className="text-foreground/70">
                    Three distinct steps designed to protect your money and eliminate the guesswork.
                  </p>
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  {buyingSteps.map((step, i) => {
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
                        src={buyingSteps[activeStep].image}
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
                    href="/get-in-touch"
                    className="mt-8 self-start inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] text-sm font-medium"
                  >
                    Contact Blake
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={buyingFaqs}
          intro="Common questions from buyers. Don't see yours? Get in touch, I am happy to walk you through it."
        />

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

## `src/pages/Faqs.tsx`

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = ["Buying", "Selling", "Home Prep"] as const;
type Category = (typeof categories)[number];

const faqData: Record<Category, { q: string; a: string }[]> = {
  Buying: [
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
  ],
  Selling: [
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
  ],
  "Home Prep": [
    {
      q: "How much does the Home Prep Selling Program cost upfront?",
      a: "Absolutely nothing. All vendor and material costs are settled at closing out of your sale proceeds, so you never pay out of pocket.",
    },
    {
      q: "What if my home doesn't end up selling?",
      a: "Complete transparency is maintained regarding the rare scenarios where costs would be owed, and the straightforward agreement is reviewed together before any work begins.",
    },
    {
      q: "How long does the renovation process usually take?",
      a: "Most homes are market-ready within 2 to 4 weeks depending on the scope of the updates. A clear timeline is provided during the initial walkthrough.",
    },
    {
      q: "Do I have to use your renovation contractors?",
      a: "A vetted network is what keeps the program running quickly and smoothly, but any specific parts you prefer to handle yourself can easily be accommodated.",
    },
    {
      q: "Will I be involved in design and approval decisions?",
      a: "Always. You maintain final approval over the project scope, finishes, and budget before work starts, backed by clear weekly progress updates.",
    },
  ],
};

export default function Faqs() {
  const [active, setActive] = useState<Category>("Buying");
  const items = faqData[active];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="py-16 md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-10">
                <h1 className="font-sans text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                  Frequently Asked Questions
                </h1>
                <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-xl mx-auto">
                  Clear answers to the questions homeowners, buyers, and sellers ask
                  most when preparing for their next move.
                </p>
              </div>

              {/* Category pills */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-muted rounded-full p-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActive(cat)}
                      className={`px-5 md:px-6 py-2 text-sm font-medium rounded-full transition-all ${
                        active === cat
                          ? "bg-background text-foreground shadow-sm"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion */}
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={active}
              >
                {items.map((item, i) => (
                  <AccordionItem
                    key={`${active}-${i}`}
                    value={`item-${i}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="text-left font-sans font-bold text-base md:text-lg py-5 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 leading-relaxed text-base pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
```

## `src/pages/GetInTouch.tsx`

```tsx
import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

import heroBedroomUrl from "@assets/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";

export default function GetInTouch() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Get In Touch – Blake Hammond RE",
          Name: form.name,
          Email: form.email,
          Phone: form.phone,
          Message: form.message,
        }),
      });
    } catch {
      // show success regardless so UX is not blocked
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        {/* Hero with embedded form */}
        <section className="relative bg-foreground text-white overflow-hidden">
          <img
            src={heroBedroomUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40 select-none"
          />
          <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl min-[1600px]:max-w-[1400px] mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/70 mb-5">
                  Get in Touch
                </p>
                <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 text-white">
                  Let's Talk About<br />Your Next Move.
                </h1>
                <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
                  Whether you are buying, selling, or just exploring the market, every
                  message receives a personal reply. No call centers, no scripts, and
                  no generic answers.
                </p>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl mt-5 italic">
                  P.S. In case you are wondering, yes, the hat says "Make Realtors
                  Great Again." And no, it is not political. It is a mindset. This
                  industry is full of mediocrity, and Blake is here to raise the bar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              >
                <div className="bg-background text-foreground p-8 md:p-10 shadow-2xl">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-primary text-primary-foreground">
                        <Mail className="w-7 h-7" strokeWidth={1.75} />
                      </div>
                      <h2 className="font-sans text-2xl md:text-3xl font-bold mb-3">
                        Message received.
                      </h2>
                      <p className="text-foreground/70 leading-relaxed">
                        Thanks for reaching out. A personal response will be sent to
                        your inbox within one business day.
                      </p>
                    </div>
                  ) : (
                  <>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">
                    Send a Message
                  </p>
                  <h2 className="font-sans text-2xl md:text-3xl font-bold leading-tight mb-6">
                    Tell Us About Your Move.
                  </h2>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <Label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</Label>
                          <Input
                            id="name"
                            required
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              placeholder="Email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              placeholder="Phone Number"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                              className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message" className="block text-sm font-medium mb-1.5">How can I help you?</Label>
                          <Textarea
                            id="message"
                            required
                            rows={4}
                            placeholder="How can I help you?"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="rounded-none px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary resize-none"
                          />
                        </div>

                        <div className="flex items-start gap-3 pt-1">
                          <Checkbox
                            id="agree"
                            required
                            checked={form.agree}
                            onCheckedChange={(checked) => setForm({ ...form, agree: checked === true })}
                            className="mt-0.5 rounded-none border-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label htmlFor="agree" className="text-xs text-foreground/60 leading-relaxed font-normal cursor-pointer">
                            I accept the{" "}
                            <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full h-[45px]"
                        >
                          Submit
                        </Button>
                  </form>
                  </>
                  )}
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
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary/10 text-primary">
                  <Mail className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                  Email Anytime
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  A direct response will be sent as soon as possible, usually the
                  same day.
                </p>
                <a
                  href="mailto:blakehammondre@gmail.com"
                  className="font-sans font-semibold text-primary hover:underline break-all"
                >
                  blakehammondre@gmail.com
                </a>
              </div>
              <div className="bg-background p-8 md:p-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-primary/10 text-primary">
                  <Phone className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold mb-3">
                  Call Or Text
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5">
                  If the line is busy, leave a voicemail or shoot over a text
                  message for a reply within 24 hours.
                </p>
                <a
                  href="tel:9166256118"
                  className="font-sans font-semibold text-primary hover:underline"
                >
                  (916) 625-6118
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
```

## `src/pages/HomePrep.tsx`

```tsx
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";

import prepHeroBgUrl from "@/assets/prep-hero-roseville.jpg";
import prepHomeAerialUrl from "@/assets/prep-home-aerial.jpg";
import stepPreparing1Url from "@assets/Screenshot_2026-06-25_at_1.31.22_PM_1782405091798.png";
import stepPreparing2Url from "@assets/generated_images/step-preparing-2-updates.png";
import stepPreparing3Url from "@assets/generated_images/step-preparing-3-launch.png";
import stepPreparing4Url from "@assets/generated_images/step-preparing-4-funding.png";
import stepPreparing5Url from "@assets/generated_images/step-preparing-5-staging.png";
import prepLivingroomUrl from "@assets/staged_living_room_1782405230307.jpg";
import prepLivingroomBeforeUrl from "@/assets/prep-livingroom-before.png";
import prepRosevilleBeforeUrl from "@/assets/prep-roseville-before.jpg";
import prepRosevilleAfterUrl from "@/assets/prep-roseville-after.jpg";
import soundFamiliarUrl from "@assets/generated_images/sound-familiar-stressed-seller.png";
import includedPaintingUrl from "@assets/Screenshot_2026-06-25_at_1.32.22_PM_1782405143958.png";
import includedLandscapingUrl from "@assets/generated_images/included-landscaping.png";
import includedRepairsUrl from "@assets/generated_images/included-repairs.png";
import includedDeepCleaningUrl from "@assets/generated_images/included-deep-cleaning.png";
import includedJunkHaulingUrl from "@assets/generated_images/included-junk-hauling.png";
import includedEstateSalesUrl from "@assets/generated_images/included-estate-sales.png";

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
    image: prepHomeAerialUrl,
  },
  {
    num: "02",
    title: "Upfront Renovation Funding",
    desc: "The Home Prep Program funds 100% of the upfront costs for home improvements and repairs, so you pay nothing out of pocket.",
    image: prepRosevilleBeforeUrl,
  },
  {
    num: "03",
    title: "Project Management",
    desc: "Trusted local tradespeople are hired and managed to handle absolutely anything your home needs, from paint and flooring to kitchen updates, landscaping, and junk removal.",
    image: stepPreparing2Url,
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
      <img
        src={beforeSrc}
        alt={beforeAlt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute top-4 right-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
        Before
      </span>
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
        <span className="absolute top-4 left-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
          After
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
}: {
  controlsRef: React.MutableRefObject<{ prev: () => void; next: () => void } | null>;
}) {
  const count = includedCards.length;
  const GAP = 16;
  const TRANSITION_MS = 650;

  const [visualIndex, setVisualIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);
  const [visibleTiles, setVisibleTiles] = useState(3);
  const items = [...includedCards, ...includedCards, ...includedCards];

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
    if (visualIndex >= count && visualIndex < count * 2) return;
    const normalized = ((visualIndex % count) + count) % count + count;
    const timer = setTimeout(() => {
      setAnimate(false);
      setVisualIndex(normalized);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true)),
      );
    }, TRANSITION_MS);
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
        className="absolute top-0 left-0 flex"
        style={{ gap: `${GAP}px` }}
        animate={{ x: trackX }}
        transition={
          animate
            ? { type: "spring", stiffness: 180, damping: 28, mass: 0.9 }
            : { duration: 0 }
        }
      >
        {items.map((card, j) => (
          <div
            key={j}
            className="group relative flex-none aspect-[4/5] overflow-hidden bg-muted shadow-lg"
            style={{ width: tileW || undefined }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent md:from-black/75 md:via-black/20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
              <h3 className="font-sans text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-sm">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function HomePrep() {
  const [activeStep, setActiveStep] = useState(0);
  const includedControlsRef = useRef<{ prev: () => void; next: () => void } | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative bg-accent text-foreground overflow-hidden">
          <img
            src={prepHeroBgUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/70 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-foreground/45 md:bg-transparent md:bg-gradient-to-r md:from-foreground/30 md:to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-20 md:pt-28 pb-20 md:pb-28">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 mb-6">
                Home Prep Selling Program
              </p>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                We Prepare Your Home For Sale. You Pay Nothing Until It's Sold.
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">We manage and pay for all repairs, updates, and staging to get your house market-ready with no out-of-pocket costs or hidden fees, so you can sell your home quickly for more money and with less stress.</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-white text-foreground hover:bg-white/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]"
                >
                  Schedule a Home Prep Consultation
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
              src={soundFamiliarUrl}
              alt="A homeowner feeling overwhelmed by paperwork and home repairs before selling"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="hidden lg:block" />

              <div className="pt-6 pb-12 lg:py-28 lg:pl-12 xl:pl-20">
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Sound Familiar?
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                  Getting a home market-ready can easily feel expensive and overwhelming.
                </p>
                <p className="font-sans font-bold text-xl mb-6">
                  If you are preparing to sell, you might be asking yourself the same
                  questions we hear every day:
                </p>
                <ul className="space-y-4 mb-10">
                  {soundFamiliarWorries.map((worry) => (
                    <li key={worry} className="text-foreground/90">
                      {worry}
                    </li>
                  ))}
                </ul>

                {/* Mobile image */}
                <div className="lg:hidden relative aspect-[4/3] overflow-hidden mb-10">
                  <img
                    src={soundFamiliarUrl}
                    alt="A homeowner feeling overwhelmed by paperwork and home repairs before selling"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-[13px] sm:text-sm whitespace-nowrap transition-all hover:-translate-y-0.5 w-full sm:w-auto px-4 sm:px-7 h-[45px]"
                  >
                    Schedule a Home Prep Consultation
                  </Link>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted group cursor-pointer hidden lg:block">
                <img
                  src={prepHomeAerialUrl}
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
                  Our Difference
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Home Prep Program
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                  Buyers reward homes that show better than the competition. This turnkey
                  renovation program quietly removes every friction point without you writing
                  a check before closing.
                </p>
                <ul className="space-y-4 mb-10">
                  {whyBullets.map((b) => (
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
                    src={prepHomeAerialUrl}
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
                    <Link href="/book-consultation">Schedule a Home Prep Consultation</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
                  >
                    <Link href="/home-value-analysis">Free Home Value Analysis</Link>
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
                src={prepSteps[activeStep].image}
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
                    Home Prep Program Process
                  </p>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    100% Funded<br />Renovations
                  </h2>
                  <p className="text-foreground/70">
                    5 steps to a stress-free, high-profit sale.
                  </p>
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  {prepSteps.map((step, i) => {
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
                        src={prepSteps[activeStep].image}
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
                      <Link href="/book-consultation">Schedule a Home Prep Consultation</Link>
                    </Button>
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
                  What's Included
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  We Manage The Contractors<br />& Cover The Costs
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
            <IncludedCarousel controlsRef={includedControlsRef} />
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
            <div className="text-center mb-14">
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Before & After Case Study
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  Roseville, CA
                </p>
                <h3 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-6">
                  Our Home Prep Program Put An Extra<br />$50,000 In Our Client's Pocket
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">A smooth two-week renovation timeline featuring fresh paint, new flooring, countertops, cabinet updates, modern lighting, and professional staging pushed the initial list price up, brought multiple offers during the opening weekend, and closed $75,000 above the original valuation.</p>
                <ul className="space-y-4 mb-10">
                  {[
                    "Multiple cash offers received and closed during the first weekend on the market.",
                    "Sold for $75,000 over the as-is property valuation before renovations.",
                    "All without the owner having to lift a finger or spend a dime up front.",
                  ].map((b) => (
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
                    beforeSrc={prepRosevilleBeforeUrl}
                    afterSrc={prepRosevilleAfterUrl}
                    beforeAlt="Roseville living room before prep"
                    afterAlt="Roseville living room after prep and staging"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]">
                    <Link href="/book-consultation">Schedule a Home Prep Consultation</Link>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:block">
                <BeforeAfterSlider
                  beforeSrc={prepRosevilleBeforeUrl}
                  afterSrc={prepRosevilleAfterUrl}
                  beforeAlt="Roseville living room before prep"
                  afterAlt="Roseville living room after prep and staging"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={prepFaqs}
          intro="Common questions about the Home Prep Program. Don't see yours? Get in touch, I'm happy to walk you through it."
        />

        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

## `src/pages/Home.tsx`

```tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, ArrowRight, Phone, MapPin, Hammer, Trophy, ShieldCheck, Mail } from "lucide-react";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import { Stars } from "@/components/site/GoogleBadges";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

// Assets
import logoUrl from "@assets/logo_1779376344245.png";
import mastersClubUrl from "@assets/Mask_group_1780678314549.png";
import heroGraphicUrl from "@assets/graphic-hero_section_1779377398567.png";
import quoteMarkUrl from "@assets/“_1779377107747.png";

// Generated Images
import heroBedroomUrl from "@assets/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";
import blakePortraitUrl from "@assets/A7406979-2_1782404791199.jpg";
import faqBackdropUrl from "@assets/graphic-hero_section_1779382669585.png";
import stepBuying1Url from "@assets/generated_images/step-buying-1-discover.png";
import stepBuying2Url from "@assets/generated_images/step-buying-2-search.png";
import stepBuying3Url from "@assets/generated_images/step-buying-3-close.png";
import stepSelling1Url from "@assets/generated_images/process-discover-needs.png";
import stepSelling2Url from "@assets/generated_images/step-selling-2-stage.png";
import stepSelling3Url from "@assets/generated_images/step-selling-3-offers.png";
import stepSelling4Url from "@assets/4090_Sylvan_Gen_ln._Roseville_CA_95747-24_1780678783964.jpg";
import stepPreparing1Url from "@assets/generated_images/step-preparing-1-audit.png";
import stepPreparing2Url from "@assets/generated_images/step-preparing-2-updates.png";
import stepPreparing3Url from "@assets/generated_images/process-preparing.png";
import stepPreparing5Url from "@assets/generated_images/step-preparing-3-launch.png";
import buyingHouseUrl from "@assets/765ef0b1-a99d-4496-b398-582c961f2f01_1782404925125.jpg";
import sellingHouseUrl from "@assets/fancy_home_1782404943463.jpg";
import prepLivingroomUrl from "@assets/6039388d-3f21-437f-a9ad-da1c64e71a57_1782404967023.jpg";
import stagedLivingRoomUrl from "@assets/staged_living_room_1782405230307.jpg";

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
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-1000"
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

export default function Home() {
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

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative bg-muted overflow-hidden">
          {/* Decorative B graphic — aligned to top-left, cut off at the edge */}
          <img
            src={heroGraphicUrl}
            alt=""
            aria-hidden="true"
            className="block absolute top-0 left-0 -translate-x-1/4 w-[420px] md:w-[520px] lg:w-[640px] h-auto pointer-events-none select-none z-0 opacity-90"
          />

          {/* Hero Image - sticks to right edge, full section height */}
          <motion.div
            className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 z-0 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={heroBedroomUrl}
              alt="Bright modern Sacramento home interior"
              className="object-cover w-full h-full"
            />
          </motion.div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-16 md:pt-24 pb-16 md:pb-24 lg:pb-0 lg:min-h-[640px]">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Hero Content */}
              <motion.div
                className="flex-1 max-w-2xl relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative z-10">
                  <motion.div
                    className="mb-8 flex items-center gap-4"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <img
                      src={mastersClubUrl}
                      alt="Masters Club — Placer County Association of Realtors"
                      className="h-24 w-24 md:h-28 md:w-28 shrink-0"
                    />
                  </motion.div>
                  <h1 className="font-sans text-5xl md:text-6xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight mb-6">
                    Buy With Confidence.<br />Sell For Top Dollar.
                  </h1>
                  <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed max-w-xl">Full-service listings, expert negotiation for buyers, and fully funded pre-market home preparation with no upfront costs.</p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                      <Link href="/get-in-touch">Contact Blake</Link>
                    </Button>
                    <Link href="/home-prep-program" className="group flex items-center justify-center sm:justify-start w-full sm:w-auto h-[45px] sm:h-auto border border-primary sm:border-0 rounded-none text-primary font-medium sm:font-semibold text-sm sm:text-base hover:bg-primary hover:text-primary-foreground sm:hover:bg-transparent sm:hover:text-primary sm:hover:opacity-80 transition-all">
                      Home Prep Program
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
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
                  <img
                    src={heroBedroomUrl}
                    alt="Bright modern Sacramento home interior"
                    className="object-cover w-full h-full"
                  />
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              {([
                { value: 5, suffix: "+", label: "Local Expert" },
                { value: 40, prefix: "$", suffix: "M+", label: "In Real Estate Sold" },
                { value: 11, label: "Average Days on Market" },
                { value: 102, suffix: "%", label: "Average List-to-Sale Ratio" },
              ] as { value: number; prefix?: string; suffix?: string; label: string }[]).map((stat, i) => (
                <motion.div
                  key={i}
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

        {/* Testimonials */}
        <motion.section
          className="bg-background py-12 md:py-32 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <Carousel className="w-full" opts={{ loop: true }}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
                <div className="min-w-0 max-w-4xl flex-1">
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={index}>
                        <div className="flex flex-col items-start text-left px-0">
                          <img src={quoteMarkUrl} alt="" className="h-12 md:h-16 w-auto mb-8 brightness-50 opacity-50" />
                          <Stars className="w-6 h-6 mb-6" label="Rated 5 out of 5 stars" />
                          <p className="font-sans text-2xl md:text-4xl leading-relaxed font-bold mb-12">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="text-left">
                              <p className="font-semibold text-lg">{testimonial.name}</p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </div>
                <div className="flex items-center gap-1 md:pt-24 shrink-0">
                  <CarouselPrevious className="static left-auto right-auto top-auto translate-y-0 border-0 bg-transparent shadow-none rounded-none text-foreground hover:text-primary hover:bg-muted disabled:opacity-100 transition-colors h-12 w-12 [&_svg]:!h-8 [&_svg]:!w-8" />
                  <CarouselNext className="static left-auto right-auto top-auto translate-y-0 border-0 bg-transparent shadow-none rounded-none text-foreground hover:text-primary hover:bg-muted disabled:opacity-100 transition-colors h-12 w-12 [&_svg]:!h-8 [&_svg]:!w-8" />
                </div>
              </div>
            </Carousel>
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

            <ServiceCards cards={[
              { title: "Buying", image: buyingHouseUrl, href: "/buying", desc: "We skip the sales pitches to focus entirely on protecting your contract and getting your offer accepted." },
              { title: "Selling", image: sellingHouseUrl, href: "/selling", desc: "Maximize profit with accurate pricing and high-impact marketing, with the option to leverage our Home Prep Selling Program." },
              { title: "Home Prep Program", image: prepLivingroomUrl, href: "/home-prep-program", desc: "We fund and manage 100% of your home preparation and repairs to drive up your sale price, paying nothing until it's sold." }
            ]} />

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
              <motion.img
                key={`${processTrack}-${activeStep}`}
                src={processData[processTrack].steps[activeStep].image}
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
              <div className="flex flex-col pt-6 pb-10 lg:py-20 gap-10 w-full lg:w-[85%] lg:max-w-[520px] mx-auto">
                <div>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    My Process
                  </h2>
                  <p className="text-foreground/70">
                    A practical roadmap to outpace local market averages.
                  </p>
                </div>

                <div className="flex flex-col border divide-y divide-foreground/10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8 sm:border-0 sm:divide-y-0 sm:border-b border-foreground/10">
                  {(Object.keys(processData) as ProcessTrack[]).map((key) => (
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
                      {processData[key].label}
                      {processTrack === key && (
                        <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  {processData[processTrack].steps.map((step, i) => {
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
                  <div className="lg:hidden relative aspect-[4/3] overflow-hidden mt-8">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`m-${processTrack}-${activeStep}`}
                        src={processData[processTrack].steps[activeStep].image}
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
                    href="/get-in-touch"
                    className="mt-8 self-start inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] text-sm font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Owners Love Working With Blake */}
        <motion.section
          id="about"
          className="relative bg-muted overflow-hidden lg:min-h-[720px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Image - sticks to right edge, full section height */}
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 z-0 overflow-hidden">
            <img
              src={blakePortraitUrl}
              alt="Blake Hammond"
              className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            />
          </div>

          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
              <div className="container mx-auto px-4 md:px-8 lg:mx-0 lg:ml-auto lg:max-w-[640px] lg:pl-8 lg:pr-16 xl:pr-24 pt-12 pb-6 lg:py-20">
                <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-12 text-balance">
                  Why Homeowners Choose Blake Over The Competition
                </h2>

                <div className="space-y-8 mb-12">
                  {[
                    {
                      icon: Hammer,
                      title: "Home Prep Program",
                      desc: "We handle and fund 100% of your home preparation, repairs, and improvements so you sell for more and pay nothing until closing.",
                    },
                    {
                      icon: Trophy,
                      title: "Record Of Success",
                      desc: "Sold 18 homes that were previously listed by other agents and failed to sell.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "No Comforting Lies",
                      desc: "You get the unfiltered truth and raw market data. I'd rather protect your equity with hard facts than comfort you with a lie.",
                    },
                  ].map((b) => {
                    const Icon = b.icon;
                    return (
                      <div key={b.title} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-primary/20 text-primary">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-sans text-xl md:text-2xl font-bold mb-2">
                            {b.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed text-pretty">{b.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="hidden lg:flex flex-wrap items-center gap-6">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href="/get-in-touch">Contact Blake</Link>
                  </Button>
                  <a href="/about" className="group flex items-center justify-center sm:justify-start w-full sm:w-auto h-[45px] sm:h-auto border border-primary sm:border-0 rounded-none text-primary font-medium sm:font-semibold text-sm sm:text-base hover:bg-primary hover:text-primary-foreground sm:hover:bg-transparent sm:hover:text-primary sm:hover:opacity-80 transition-all">
                    More About Blake
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Mobile-only image */}
              <div className="lg:hidden relative aspect-[4/5] bg-background overflow-hidden mx-4 md:mx-8 mt-2">
                <img
                  src={blakePortraitUrl}
                  alt="Blake Hammond"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile-only buttons below the image */}
              <div className="lg:hidden container mx-auto px-4 md:px-8 pt-8 pb-12 flex flex-col sm:flex-row sm:flex-wrap items-center gap-3 sm:gap-6">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                  <Link href="/get-in-touch">Contact Blake</Link>
                </Button>
                <a href="/about" className="group flex items-center justify-center sm:justify-start w-full sm:w-auto h-[45px] sm:h-auto border border-primary sm:border-0 rounded-none text-primary font-medium sm:font-semibold text-sm sm:text-base hover:bg-primary hover:text-primary-foreground sm:hover:bg-transparent sm:hover:text-primary sm:hover:opacity-80 transition-all">
                  More About Blake
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
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
          <img
            src={faqBackdropUrl}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -left-40 top-1/2 -translate-y-1/2 w-[640px] md:w-[820px] lg:w-[980px] opacity-[0.07] z-0"
          />
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
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
                  <div aria-hidden="true" className="col-start-1 row-start-1 invisible pointer-events-none">
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
            <img
              src={heroBedroomUrl}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/40 to-foreground/60" />
          </div>

          {/* B graphic watermark */}
          <img
            src={heroGraphicUrl}
            alt=""
            className="pointer-events-none absolute -right-32 -bottom-24 w-[520px] opacity-[0.07] select-none"
          />

          <div className="relative container mx-auto px-4 md:px-8 py-12 md:py-32 text-left sm:text-center">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-6">
              Let's talk
            </p>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Don't Miscalculate The Market
            </h2>
            <p className="text-white/70 max-w-xl sm:mx-auto mb-10 leading-relaxed">Use sharp contract strategies to buy the right property, or leverage our Home Prep Program to maximize your sale price.</p>
            <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px]"
              >
                <Link href="/get-in-touch">Contact Blake</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-foreground no-default-hover-elevate no-default-active-elevate rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
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
            <div key={i} className="relative overflow-hidden group">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover opacity-60 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/40 transition-opacity duration-700 group-hover:opacity-0" />
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 md:px-8 pt-20 pb-24 lg:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-3 flex flex-col items-center md:items-start">
              <img
                src={logoUrl}
                alt="Blake Hammond Real Estate"
                className="h-8 md:h-6 w-auto mb-6"
              />
              <p className="text-foreground/60 text-sm leading-relaxed max-w-sm text-center md:text-left">
                A trusted real estate partner delivering modern, high-touch service for buyers, sellers, and homeowners preparing for their next move.
              </p>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Home", href: "/" },
                  { label: "Buying", href: "/buying" },
                  { label: "Selling", href: "/selling" },
                  { label: "About", href: "/about" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Services</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Home Prep Program", href: "/home-prep-program" },
                  { label: "Home Value Analysis", href: "/home-value-analysis" },
                  { label: "Book a Consultation", href: "/book-consultation" },
                  { label: "Contact Blake", href: "/get-in-touch" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-foreground/70 hover:text-primary transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="font-bold mb-6 tracking-[0.2em] text-xs uppercase text-primary">Contact</h4>
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
              <img
                src={mastersClubUrl}
                alt="Masters Club — Placer County Association of Realtors"
                className="h-24 w-24"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs text-foreground/50">
              © {new Date().getFullYear()} Blake Hammond Real Estate. All rights reserved.
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
```

## `src/pages/HomeValue.tsx`

```tsx
import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Play, BadgeCheck, Video, TrendingUp, Wallet, CalendarRange, LineChart, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";

import heroBedroomUrl from "@assets/4090_Sylvan_Gen_ln._Roseville_CA_95747-42_1779384768951.jpg";
import heroGraphicUrl from "@assets/graphic-hero_section_1779377398567.png";

const whatYouGet = [
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

const howItWorks = [
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

const notSelling = [
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

export default function HomeValue() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    agree: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Home Value Analysis – Blake Hammond RE",
          Name: form.fullName,
          Email: form.email,
          Phone: form.phone,
          Address: form.address,
        }),
      });
    } catch {
      // show success regardless
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative z-20 bg-foreground text-white">
          <img
            src={heroBedroomUrl}
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
                Free Home Value Analysis
              </p>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
                What Is Your Home Worth?
              </h1>
              <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed max-w-2xl sm:mx-auto">Get a personalized, data-driven property valuation backed by real local statistics, not automated online estimates. Free. No obligation. </p>
              <div className="flex flex-wrap items-center justify-start sm:justify-center gap-4">
                <Button
                  asChild
                  className="bg-white text-foreground hover:bg-white/90 border-transparent no-default-hover-elevate no-default-active-elevate rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-6 h-[45px]"
                >
                  <a href="#value-form">Get Your Home Value</a>
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
                src={heroBedroomUrl}
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
                What You Get
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                A clear read on property value, built by hand, not by an algorithm.
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
                  Here Is How It Works
                </h2>
                <p className="text-foreground/60 leading-relaxed max-w-sm">
                  Accurate analysis delivered straight to your inbox within 24 hours.
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
                  Get Started
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Request Your<br />Custom Valuation
                </h2>
                <p className="text-foreground/70 leading-relaxed text-lg max-w-md">
                  Share a few details to receive a personalized written property
                  report with zero algorithms or guesswork.
                </p>
              </div>

              <div className="bg-background p-8 md:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center bg-primary text-primary-foreground">
                    <BadgeCheck className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-sans text-2xl md:text-3xl font-bold mb-3">
                    Thanks, the details have been received.
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Your personalized home value report and custom video breakdown
                    will be delivered within one business day.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="fullName" className="block text-sm font-medium mb-1.5">Full Name</Label>
                    <Input
                      id="fullName"
                      required
                      placeholder="Full Name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="block text-sm font-medium mb-1.5">Phone number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                        className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="block text-sm font-medium mb-1.5">Property address</Label>
                    <Input
                      id="address"
                      required
                      placeholder="Property Address"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="rounded-none h-11 px-4 bg-white border-foreground/15 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <Checkbox
                      id="agree"
                      required
                      checked={form.agree}
                      onCheckedChange={(checked) => setForm({ ...form, agree: checked === true })}
                      className="mt-0.5 rounded-none border-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="agree" className="text-xs text-foreground/60 leading-relaxed font-normal cursor-pointer">
                      I accept the{" "}
                      <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full h-[45px]"
                  >
                    Submit
                  </Button>
                </form>
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
                Not Selling Yet? That's Okay.
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                Tracking property equity is a smart way to plan ahead. Knowing true
                property value helps build long-term plans with confidence. The
                smartest homeowners always start tracking market details early.
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
          eyebrow="Free Home Value Analysis"
          heading="Get A Custom Home Value Report Today"
          body="A free, private property valuation built straight from local market data and delivered directly to your inbox."
          primaryLabel="Contact Blake"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
```

## `src/pages/not-found.tsx`

```tsx
import { motion } from "framer-motion";
import { Link } from "wouter";
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
                  <Link href="/get-in-touch">Contact Blake</Link>
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
```

## `src/pages/PrivacyPolicy.tsx`

```tsx
import { motion } from "framer-motion";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip flex flex-col">
      <SiteHeader variant="solid" />

      <main className="flex-1">
        <motion.section
          className="w-full pt-28 pb-20 md:pt-36 md:pb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                Privacy Policy
              </p>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Your Privacy Matters.
              </h1>
              <p className="text-foreground/60 text-sm mb-12">Effective Date: April 10, 2025</p>

              <div className="space-y-10 text-foreground/80 leading-relaxed">
                <p>
                  Hammond Realty values your privacy. This Privacy Policy explains how we
                  collect, use, and protect your information.
                </p>

                <section>
                  <h2 className="font-sans text-2xl font-bold text-foreground mb-4">
                    Information We Collect
                  </h2>
                  <p className="mb-4">
                    We may collect personal information such as your name, phone number,
                    email address, and property preferences when you:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Fill out a contact form on our website</li>
                    <li>Request a home valuation</li>
                    <li>Subscribe to receive updates or messages from us</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-sans text-2xl font-bold text-foreground mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="mb-4">We use the information you provide to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Communicate with you about real estate services</li>
                    <li>Send you updates, follow-ups, and other relevant messages</li>
                    <li>Improve our services and personalize your experience</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-sans text-2xl font-bold text-foreground mb-4">
                    SMS Consent
                  </h2>
                  <p className="mb-4">
                    By submitting your phone number, you consent to receive SMS messages
                    from Hammond Realty. Message and data rates may apply. Message frequency
                    may vary. You can reply STOP at any time to opt out, or HELP for more
                    information.
                  </p>
                  <p>
                    No mobile information will be shared with third parties/affiliates for
                    marketing/promotional purposes. All the above categories exclude text
                    messaging originator opt-in data and consent; this information will not
                    be shared with any third parties.
                  </p>
                </section>

                <section>
                  <h2 className="font-sans text-2xl font-bold text-foreground mb-4">
                    Data Protection
                  </h2>
                  <p>
                    Your data is securely stored and only accessed by authorized personnel.
                    We will never sell, rent, or share your information with outside parties.
                  </p>
                </section>

                <section>
                  <h2 className="font-sans text-2xl font-bold text-foreground mb-4">
                    Contact Us
                  </h2>
                  <p className="mb-4">
                    If you have questions about this Privacy Policy, contact us at:
                  </p>
                  <p className="font-semibold text-foreground">Hammond Realty</p>
                  <p>
                    <a href="tel:9166256118" className="hover:text-primary transition-colors">
                      (916) 625-6118
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:blakehammondre@gmail.com"
                      className="hover:text-primary transition-colors"
                    >
                      blakehammondre@gmail.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
```

## `src/pages/Selling.tsx`

```tsx
import { useState, useRef, useCallback, useEffect, type FormEvent } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Shield, MessageSquare, FileCheck, Hammer, Handshake, Play, Lightbulb, BookOpen, DoorOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhone } from "@/lib/utils";
import SiteHeader from "@/components/site/SiteHeader";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import FaqsSection, { type Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/site/CtaSection";
import SiteFooter from "@/components/site/SiteFooter";

import heroGraphicUrl from "@assets/graphic-hero_section_1779377398567.png";
import stepSelling1Url from "@assets/generated_images/step-selling-1-strategy.png";
import stepSelling2Url from "@assets/generated_images/step-selling-2-stage.png";
import stepSelling3Url from "@assets/generated_images/step-selling-3-offers.png";
import stepSelling4Url from "@assets/generated_images/step-selling-4-market.png";
import zillowLogoUrl from "@assets/Zillow_Logo_Primary_RGB_1780067196756.png";
import blakePresentingUrl from "@assets/A7407000-2_1782405532776.jpg";
import blakeForSaleUrl from "@/assets/blake-for-sale.jpg";
import whySellVideoThumbUrl from "@/assets/why-sell-video-thumb.jpg";
import sellingHouseUrl from "@/assets/selling-house.png";
import prepLivingroomUrl from "@/assets/prep-livingroom.png";
import prepLivingroomBeforeUrl from "@/assets/prep-livingroom-before.png";
import prepBedroomBeforeUrl from "@/assets/prep-bedroom-before.jpg";
import prepBedroomAfterUrl from "@/assets/prep-bedroom-after.jpg";

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
    image: blakePresentingUrl,
  },
  {
    num: "02",
    title: "Prepare Your Home For Sale",
    desc: "We handle staging and premium video marketing. You can also take advantage of our Home Prep Program for home improvements and repairs we manage with no out-of-pocket costs or hidden fees.",
    image: prepLivingroomUrl,
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

type ContactFormErrors = Partial<
  Record<"name" | "email" | "phone" | "message" | "agree", string>
>;

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): ContactFormErrors => {
    const next: ContactFormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Please enter your phone number.";
    else if (
      !PHONE_RE.test(form.phone.trim()) ||
      form.phone.replace(/\D/g, "").length < 7
    )
      next.phone = "Please enter a valid phone number.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    if (!form.agree) next.agree = "Please agree to be contacted.";
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: "Selling Inquiry – Blake Hammond RE",
            Name: form.name,
            Email: form.email,
            Phone: form.phone,
            Message: form.message,
          }),
        });
      } catch {
        // show success regardless
      }
      setSubmitted(true);
    }
  };

  const clearError = (field: keyof ContactFormErrors) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _removed, ...rest } = prev;
      return rest;
    });

  const inputClass = (field: keyof ContactFormErrors) =>
    `w-full border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors ${
      errors[field] ? "border-red-500" : "border-foreground/15"
    }`;

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
    <form
      noValidate
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-10 shadow-2xl space-y-4 w-full"
    >
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="s-name">Full Name</label>
        <input
          id="s-name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            clearError("name");
          }}
          aria-invalid={!!errors.name}
          className={inputClass("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="s-email">Email</label>
          <input
            id="s-email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              clearError("email");
            }}
            aria-invalid={!!errors.email}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="s-phone">Phone Number</label>
          <input
            id="s-phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: formatPhone(e.target.value) });
              clearError("phone");
            }}
            aria-invalid={!!errors.phone}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="s-message">Message</label>
        <textarea
          id="s-message"
          rows={4}
          placeholder="Message"
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            clearError("message");
          }}
          aria-invalid={!!errors.message}
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>
      <div>
        <label className="flex items-start gap-2 text-xs text-foreground/60 leading-relaxed">
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => {
              setForm({ ...form, agree: e.target.checked });
              clearError("agree");
            }}
            aria-invalid={!!errors.agree}
            className="mt-0.5 accent-primary"
          />
          <span>I agree to be contacted by Blake Hammond Real Estate.</span>
        </label>
        {errors.agree && (
          <p className="mt-1 text-xs text-red-600">{errors.agree}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full h-[45px]"
      >
        Submit
      </Button>
    </form>
  );
}

function WhySellVideo() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
      {videoPlaying ? (
        <iframe
          src="https://www.youtube.com/embed/lFMTIp7BqEg?autoplay=1&rel=0"
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
            src={whySellVideoThumbUrl}
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

export default function Selling() {
  const [activeStep, setActiveStep] = useState(0);

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
                    Selling with Blake
                  </p>
                  <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                    Sell Quickly.<br />Make More Money.
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">Get the raw market data, full-service home preparation, and strategic contract negotiation you need to walk away with the most money possible.</p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                    <Button asChild className="bg-white text-foreground hover:bg-white/90 border-transparent no-default-hover-elevate no-default-active-elevate rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                      <Link href="/get-in-touch">Contact Blake</Link>
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
                <WhySellVideo />
              </div>

              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  Why Sell With Blake
                </p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Maximize Your Equity
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">
                  Secure the highest return with a partner who prices with precision,
                  transforms your property, and protects your profit.
                </p>

                <ul className="space-y-4 mb-10">
                  {whySellBullets.map((b) => {
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
                  <WhySellVideo />
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href="/get-in-touch">Contact Blake</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white rounded-none font-medium px-6 w-full sm:w-auto h-[45px]"
                  >
                    <Link href="/home-value-analysis">Find Your Home Value</Link>
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
                My Promise
              </p>
              <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                The Hammond Real Estate Guarantee
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Four direct standards held on every single property partnership, in writing,
                from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guaranteeItems.map((item, i) => {
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
                src={sellingSteps[activeStep].image}
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
                    Home Selling Process
                  </p>
                  <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    Minimize Days On Market
                  </h2>
                  <p className="text-foreground/70">
                    Four precise phases built to capture immediate buyer demand and protect your listing from becoming stagnant.
                  </p>
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  {sellingSteps.map((step, i) => {
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
                        src={sellingSteps[activeStep].image}
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
                    href="/get-in-touch"
                    className="mt-8 self-start inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] text-sm font-medium"
                  >
                    Contact Blake
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
                  beforeSrc={prepBedroomBeforeUrl}
                  afterSrc={prepBedroomAfterUrl}
                  beforeAlt="Primary bedroom before staging"
                  afterAlt="Primary bedroom after staging"
                />
              </div>

              <div>
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">Elevate Your Market Value & Sell With Less Stress</p>
                <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Home Prep Program
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">We handle the entire preparation process from start to finish with zero out-of-pocket costs, ensuring your house is ready to hit the market for top dollar.</p>

                <ul className="space-y-4 mb-10">
                  {prepBullets.map((b) => (
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
                    beforeSrc={prepBedroomBeforeUrl}
                    afterSrc={prepBedroomAfterUrl}
                    beforeAlt="Primary bedroom before staging"
                    afterAlt="Primary bedroom after staging"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href="/home-prep-program">Learn More</Link>
                  </Button>
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
                  Zillow Showcase Drives 75% More Views
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed mb-10">
                  As a Zillow Showcase partner, we give your home a premium listing advantage offered on less than 1% of all properties. This exclusive placement pairs high-end photography with priority positioning to drive maximum traffic and saves for your listing.
                </p>
                {/* Mobile image — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <img
                    src={blakePresentingUrl}
                    alt="Blake Hammond, Sacramento-area real estate agent"
                    className="w-full h-full object-cover object-top aspect-[4/3]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-[129px] h-[45px] p-0">
                    <Link href="/get-in-touch">Contact Blake</Link>
                  </Button>
                  <a
                    href="https://www.zillow.com/profile/blakehammondre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-white rounded-none font-medium text-sm w-full sm:w-auto px-6 h-[45px] transition-colors"
                  >
                    View On Zillow
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <img
                  src={blakePresentingUrl}
                  alt="Blake Hammond, Sacramento-area real estate agent"
                  className="w-full h-full object-cover object-top aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <TestimonialsSection />

        <FaqsSection
          faqs={sellingFaqs}
          intro="Common questions from home sellers. Don't see yours? Get in touch, I am happy to walk you through it."
        />

        <CtaSection secondaryLabel="" />
      </main>
      <SiteFooter />
    </div>
  );
}


```

## `src/pages/ThankYou.tsx`

```tsx
import { motion } from "framer-motion";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function ThankYou() {
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
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Thank You.
              </h1>

              <p className="text-foreground/70 leading-relaxed text-base md:text-lg max-w-md mx-auto mb-10">
                Your submission has been received. A personal response will be sent to
                your inbox shortly to discuss your property goals.
              </p>

              <a
                href="/"
                className="inline-flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto h-[45px] px-8"
              >
                Back To Home
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <SiteFooter />
    </div>
  );
}
```

## `tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "dist", "**/*.test.ts"],
  "compilerOptions": {
    "noEmit": true,
    "jsx": "preserve",
    "lib": ["esnext", "dom", "dom.iterable"],
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "moduleResolution": "bundler",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "references": [
    {
      "path": "../../lib/api-client-react"
    }
  ]
}
```

## `vite.config.ts`

```tsx
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    "BASE_PATH environment variable is required but was not provided.",
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
```

