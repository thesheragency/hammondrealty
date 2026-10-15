import { tc } from "@/lib/title-case";
import { Check, Phone, CalendarDays } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site/SiteHeader";
import type { Testimonial } from "@/components/site/TestimonialsSection";
import TestimonialsSection from "@/components/home-prep/ReviewsSection";
import TestimonialStrip from "@/components/site/TestimonialStrip";
import MeetBlakeSection from "@/components/MeetBlakeSection";
import { GoogleG, ZillowZ, Stars } from "@/components/site/GoogleBadges";
import type { Faq } from "@/components/site/FaqsSection";
import CtaSection from "@/components/home-prep/ClosingSection";
import SiteFooter from "@/components/site/SiteFooter";
import Image from "next/image";
import ScrollReveal from "@/components/home-prep/ScrollReveal";
import DeferredIsland from "@/components/home-prep/DeferredIsland";
import { StaticCaseCarousel, StaticIncludedSection, StaticFaqSection, StaticVideo } from "@/components/home-prep/StaticFallbacks";
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
    image: "/images/home-prep-consultation-audit.webp",
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

export default function HomePrep({ acf, testimonials }: { acf?: Record<string, any> | null; testimonials?: Testimonial[] }) {

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
        timelineLabel: typeof s.timelineLabel === "string" ? s.timelineLabel.trim() : "",
        timelineValue: typeof s.timelineValue === "string" ? s.timelineValue.trim() : "",
        image: imgUrl(s.image, prepSteps[i]?.image || prepHomeAerialUrl),
      }))
    : prepSteps;

  const processReassuranceTitle = typeof acf?.processReassuranceTitle === "string" ? acf.processReassuranceTitle.trim() : "";
  const processReassuranceText = typeof acf?.processReassuranceText === "string" ? acf.processReassuranceText.trim() : "";

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
        "Sold for $75,000 more than the as-is value, netting the seller $50,000 more after repair costs.",
        "All without the owner having to lift a finger or spend a dime up front.",
      ];

  const heroImageUrl = imgUrl(acf?.heroImage, prepHeroBgUrl);
  const heroResultLine = typeof acf?.heroResultLine === "string" ? acf.heroResultLine.trim() : "";
  const heroPhoneText = typeof acf?.heroPhoneText === "string" ? acf.heroPhoneText.trim() : "";
  const heroPhoneLink = typeof acf?.heroPhoneLink === "string" ? acf.heroPhoneLink.trim() : "";
  const heroPhoneOrLabel = typeof acf?.heroPhoneOrLabel === "string" ? acf.heroPhoneOrLabel.trim() : "";
  const heroGoogleRating = typeof acf?.heroGoogleRating === "string" ? acf.heroGoogleRating.trim() : "";
  const heroZillowRating = typeof acf?.heroZillowRating === "string" ? acf.heroZillowRating.trim() : "";
  const heroReviewsLink = typeof acf?.heroReviewsLink === "string" ? acf.heroReviewsLink.trim() : "";
  const heroReviewsAriaLabel = typeof acf?.heroReviewsAriaLabel === "string" ? acf.heroReviewsAriaLabel.trim() : "";
  const heroReviewsText = typeof acf?.heroReviewsText === "string" ? acf.heroReviewsText.trim() : "";
  const showGoogleRating = !!heroGoogleRating && Number.isFinite(Number(heroGoogleRating)) && Number(heroGoogleRating) >= 0 && Number(heroGoogleRating) <= 5;
  const showZillowRating = !!heroZillowRating && Number.isFinite(Number(heroZillowRating)) && Number(heroZillowRating) >= 0 && Number(heroZillowRating) <= 5;
  const familiarImageUrl = imgUrl(acf?.familiarImage, soundFamiliarUrl);
  const whyImageUrl = imgUrl(acf?.whyImage, prepHomeAerialUrl);
  const caseBeforeImageUrl = imgUrl(acf?.caseBeforeImage, prepRosevilleBeforeUrl);
  const caseAfterImageUrl = imgUrl(acf?.caseAfterImage, prepRosevilleAfterUrl);
  const caseSlides = [
    { beforeSrc: caseBeforeImageUrl, afterSrc: caseAfterImageUrl, beforeAlt: "Roseville living room before prep", afterAlt: "Roseville living room after prep and staging" },
    ...(acf?.caseLivingroom2BeforeImage?.node?.sourceUrl && acf?.caseLivingroom2AfterImage?.node?.sourceUrl
      ? [{ beforeSrc: acf.caseLivingroom2BeforeImage.node.sourceUrl, afterSrc: acf.caseLivingroom2AfterImage.node.sourceUrl, beforeAlt: "Living room before home prep", afterAlt: "Living room after home prep" }] : []),
    ...(acf?.caseDiningBeforeImage?.node?.sourceUrl && acf?.caseDiningAfterImage?.node?.sourceUrl
      ? [{ beforeSrc: acf.caseDiningBeforeImage.node.sourceUrl, afterSrc: acf.caseDiningAfterImage.node.sourceUrl, beforeAlt: "Dining nook before home prep", afterAlt: "Dining nook after home prep" }] : []),
  ];
  const faqsList: Faq[] = prepFaqs;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip">
      <SiteHeader variant="solid" />
      <main>
        {/* Hero */}
        <section className="relative bg-accent text-foreground overflow-hidden">
          <Image
            src={heroImageUrl}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            quality={60}
            className="object-cover pointer-events-none select-none"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 relative z-10 pt-12 md:pt-28 pb-12 md:pb-28">
            <div className="max-w-3xl">
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/80 mb-4 md:mb-6">
                {acf?.heroEyebrow || "Home Prep Selling Program"}
              </p>
              <h1 className="text-h1 font-bold leading-[1.1] tracking-tight mb-4 md:mb-6 text-white">
                {tc(acf?.heroHeading) || "We Prepare Your Home For Sale. You Pay Nothing Until It's Sold."}
              </h1>
              <p className={`text-base md:text-xl text-white/90 ${heroResultLine ? "mb-4 md:mb-5" : "mb-6 md:mb-10"} leading-relaxed max-w-2xl`}>
                {acf?.heroBody || "I front the cost of all repairs, updates, and staging to get your home market-ready. You pay nothing out of pocket—everything is settled from your sale proceeds at closing."}
              </p>
              {heroResultLine && (
                <blockquote className="mx-0 mt-0 mb-4 md:mb-6 border-l-[3px] border-accent pl-3 text-sm md:text-base font-normal not-italic leading-snug text-white">
                  {heroResultLine}
                </blockquote>
              )}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 sm:gap-4">
                <Link
                  href={acf?.heroCtaLink || "/book-consultation"}
                  className="inline-flex items-center justify-center bg-white text-foreground hover:bg-white/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]"
                >
                  {acf?.heroCtaText || "Schedule a Home Prep Consultation"}
                </Link>
                {heroPhoneText && heroPhoneLink && (
                  <>
                    {heroPhoneOrLabel && (
                      <span className="text-sm text-white text-center">{heroPhoneOrLabel}</span>
                    )}
                    <a
                      href={heroPhoneLink}
                      className="inline-flex items-center justify-center gap-2 border border-white bg-transparent text-white rounded-none font-medium text-sm w-full sm:w-auto px-7 h-[45px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {heroPhoneText}
                    </a>
                  </>
                )}
              </div>
              {heroReviewsLink && heroReviewsAriaLabel && (showGoogleRating || showZillowRating) && (
                <a
                  href={heroReviewsLink}
                  aria-label={heroReviewsAriaLabel}
                  className="mt-3 md:mt-4 inline-flex max-w-full flex-col items-start gap-2 overflow-hidden text-sm leading-none text-white md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="inline-flex shrink-0 items-center gap-3 whitespace-nowrap">
                  {showGoogleRating && (
                    <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                      <GoogleG className="h-4 w-4 shrink-0" />
                      <span>{heroGoogleRating}</span>
                      <Stars className="h-4 w-4" label="" count={Math.round(Number(heroGoogleRating))} />
                    </span>
                  )}
                  {showGoogleRating && showZillowRating && (
                    <span className="h-4 w-px bg-white/40" aria-hidden="true" />
                  )}
                  {showZillowRating && (
                    <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                      <ZillowZ className="h-4 w-4 shrink-0" />
                      <span>{heroZillowRating}</span>
                      <Stars className="h-4 w-4" label="" count={Math.round(Number(heroZillowRating))} />
                    </span>
                  )}
                  </span>
                  {heroReviewsText && (
                    // The divider sits outside this span: the link clips it
                    // when the text wraps onto a new line, without JavaScript.
                    <span className="relative max-w-full shrink-0 text-sm leading-snug text-white/90 md:leading-none md:before:absolute md:before:-left-3 md:before:top-1/2 md:before:h-4 md:before:w-px md:before:-translate-y-1/2 md:before:bg-white/40 md:before:content-['']">
                      {heroReviewsText}
                    </span>
                  )}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Sound Familiar? */}
        <ScrollReveal
          className="relative bg-muted text-foreground overflow-hidden"
        >
          {/* Image — full-bleed left half on desktop (flush top, bottom, left) */}
          <div className="hidden lg:block absolute top-0 left-0 bottom-0 w-1/2 z-0 overflow-hidden">
            <Image
              src={familiarImageUrl}
              alt="A homeowner feeling overwhelmed by paperwork and home repairs before selling"
              fill
              sizes="50vw"
              loading="lazy"
              className="object-cover"
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
                  <Image
                    src={familiarImageUrl}
                    alt="A homeowner feeling overwhelmed by paperwork and home repairs before selling"
                    fill
                    sizes="(min-width: 1280px) 0px, (min-width: 1024px) 960px, (min-width: 768px) 704px, (min-width: 640px) 576px, calc(100vw - 32px)"
                    loading="lazy"
                    className="object-cover"
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
                    <div className="hidden sm:contents">
                      <span className="text-sm text-foreground/50 text-center">or</span>
                      <Button variant="outline" asChild className="rounded-none h-[45px] w-auto font-medium text-sm">
                        <a href={acf?.familiarPhoneLink || "#"}>{acf.familiarPhoneText}</a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Why the Home Prep Program */}
        <ScrollReveal
          className="bg-background pt-12 pb-4 md:pt-32"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
              {/* Desktop Vimeo embed */}
              <div className="hidden lg:block w-full">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <DeferredIsland kind="video" fill props={{ videoId: acf?.whyVideoId, posterUrl: acf?.whyVideoPosterImage?.node?.sourceUrl, playLabel: acf?.whyVideoPlayLabel, iframeTitle: acf?.whyVideoIframeTitle }}><StaticVideo posterUrl={acf?.whyVideoPosterImage?.node?.sourceUrl} playLabel={acf?.whyVideoPlayLabel} /></DeferredIsland>
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
                {/* Mobile Vimeo embed — above the CTA buttons */}
                <div className="lg:hidden w-full mb-10">
                  <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                    <DeferredIsland kind="video" fill props={{ videoId: acf?.whyVideoId, posterUrl: acf?.whyVideoPosterImage?.node?.sourceUrl, playLabel: acf?.whyVideoPlayLabel, iframeTitle: acf?.whyVideoIframeTitle }}><StaticVideo posterUrl={acf?.whyVideoPosterImage?.node?.sourceUrl} playLabel={acf?.whyVideoPlayLabel} /></DeferredIsland>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]">
                    <Link href={acf?.whyCtaLink || "/book-consultation"}>{acf?.whyCtaText || "Schedule a Home Prep Consultation"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Before & After Case Study */}
        <ScrollReveal
          className="bg-muted py-12 md:py-32"
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
                <p className="text-foreground/70 leading-relaxed mb-6 text-lg">{acf?.caseBody || "A smooth two-week renovation timeline featuring fresh paint, new flooring, countertops, cabinet updates, modern lighting, and professional staging pushed the initial list price up, brought multiple offers during the opening weekend, and closed $75,000 above the original valuation."}</p>
                <p className="text-foreground/70 leading-relaxed mb-8 text-lg">Putting $50,000 in our client's pocket after repair costs considered.</p>
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
                {/* Mobile carousel — above the CTA buttons */}
                <div className="lg:hidden mb-10">
                  <DeferredIsland kind="case" props={{ slides: caseSlides }}><StaticCaseCarousel slides={caseSlides} /></DeferredIsland>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-7 h-[45px]">
                    <Link href={acf?.caseCtaLink || "/book-consultation"}>{acf?.caseCtaText || "Schedule a Home Prep Consultation"}</Link>
                  </Button>
                  {acf?.casePhoneText && (
                    <div className="hidden sm:contents">
                      <span className="text-sm text-foreground/50 text-center">or</span>
                      <Button variant="outline" asChild className="rounded-none h-[45px] w-auto font-medium text-sm">
                        <a href={acf?.casePhoneLink || "#"}>{acf.casePhoneText}</a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden lg:block">
                <DeferredIsland kind="case" props={{ slides: caseSlides }}><StaticCaseCarousel slides={caseSlides} /></DeferredIsland>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <TestimonialStrip
          quote={acf?.whyTestimonialQuote}
          name={acf?.whyTestimonialName}
          source={acf?.whyTestimonialSource}
        />

        {/* Home Prep Program Process */}
        <ScrollReveal
          id="process"
          className="relative bg-muted overflow-hidden lg:min-h-[720px]"
        >
          {/* Image — right half on desktop */}
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2 z-0 overflow-hidden">
            <Image src={steps[0].image} alt="" fill sizes="50vw" className="object-cover" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col pt-6 pb-4 lg:py-12 gap-6 w-full lg:w-[85%] lg:max-w-[520px] mx-auto lg:mx-0">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4">
                    {acf?.processEyebrow || "Home Prep Program Process"}
                  </p>
                  <h2 className="text-h2 font-bold leading-tight mb-3 whitespace-pre-line">
                    {tc(acf?.processHeading) || "How the Home Prep Program Works"}
                  </h2>
                  <p className="text-foreground/70">
                    {acf?.processSubtitle || "5 steps to a stress-free, high-profit sale."}
                  </p>
                </div>

                <div className="flex flex-col items-stretch self-stretch">
                  <ol className="divide-y divide-foreground/10">
                    {steps.map((step: any) => (
                      <li
                        key={step.title}
                        className="flex items-start gap-4 py-4 text-left"
                      >
                        <span className="font-sans text-sm font-normal text-foreground/30 shrink-0 pt-2">
                          {step.num}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-sans text-2xl md:text-3xl font-semibold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed">
                            {step.desc}
                          </p>
                          {step.timelineValue && (
                            <p className="mt-2 flex items-center gap-2 text-foreground/70 leading-relaxed">
                              <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span>
                                {step.timelineLabel && `${step.timelineLabel} `}
                                <span className="font-semibold">{step.timelineValue}</span>
                              </span>
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/* Mobile image */}
                  <div className="lg:hidden relative aspect-[4/3] overflow-hidden mt-4">
                    <Image src={steps[0].image} alt="" fill sizes="100vw" className="object-cover" />
                  </div>

                  {(processReassuranceTitle || processReassuranceText) && (
                    <div className="mt-4 w-full border border-primary/30 bg-primary/10 p-4 text-sm">
                      {processReassuranceTitle && (
                        <p className="font-bold text-foreground mb-1">{processReassuranceTitle}</p>
                      )}
                      {processReassuranceText && (
                        <p className="text-foreground/70 leading-relaxed">{processReassuranceText}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto px-5 h-[45px] whitespace-nowrap">
                      <Link href={acf?.processCtaLink || "/book-consultation"}>{acf?.processCtaText || "Schedule a Home Prep Consultation"}</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>
        </ScrollReveal>

        {/* What's Included */}
        <ScrollReveal
          className="bg-background py-12 md:py-32"
        >
          <DeferredIsland kind="included" props={{cards: included, eyebrow: acf?.includedEyebrow || "What's Included", heading: acf?.includedHeading ? tc(acf.includedHeading) : (<>We Manage the Contractors<br />& Cover the Costs</>)}}>
            <StaticIncludedSection cards={included} eyebrow={acf?.includedEyebrow || "What's Included"} heading={acf?.includedHeading ? tc(acf.includedHeading) : (<>We Manage the Contractors<br />& Cover the Costs</>)} />
          </DeferredIsland>
        </ScrollReveal>

        <MeetBlakeSection
          {...acf?.meetBlake}
          photo={acf?.meetBlake ? {
            ...acf.meetBlake.photo,
            node: {
              ...acf.meetBlake.photo?.node,
              sourceUrl: "/images/home-prep-blake-sofa.webp",
            },
          } : undefined}
        />

        <TestimonialsSection
          id="reviews"
          variant="marquee"
          testimonials={testimonials}
          content={{
            heading: acf?.reviewsHeading,
            ratingSummary: acf?.reviewsRatingSummary,
            googleRating: acf?.reviewsGoogleRating,
            googleLabel: acf?.reviewsGoogleLabel,
            googleAriaLabel: acf?.reviewsGoogleAriaLabel,
            zillowRating: acf?.reviewsZillowRating,
            zillowLabel: acf?.reviewsZillowLabel,
            zillowAriaLabel: acf?.reviewsZillowAriaLabel,
            pauseLabel: acf?.reviewsPauseLabel,
            playLabel: acf?.reviewsPlayLabel,
          }}
        />

        <ScrollReveal>
          <DeferredIsland kind="faq" props={{ faqs: faqsList, intro: acf?.faqsIntro || "Common questions about the Home Prep Program. Don't see yours? Get in touch, I'm happy to walk you through it." }}>
            <StaticFaqSection faqs={faqsList} intro={acf?.faqsIntro || "Common questions about the Home Prep Program. Don't see yours? Get in touch, I'm happy to walk you through it."} />
          </DeferredIsland>
        </ScrollReveal>

        <CtaSection
          eyebrow={acf?.closingEyebrow || ""}
          heading={acf?.closingHeading || ""}
          body={acf?.closingBody || ""}
          primaryLabel="Schedule a Home Prep Consultation"
          primaryHref="/book-consultation"
          secondaryLabel="Call Now"
          secondaryHref="tel:9166256118"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
