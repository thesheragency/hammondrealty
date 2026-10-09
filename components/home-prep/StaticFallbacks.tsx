import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronDown, Play } from "lucide-react";
import type { ReactNode } from "react";
import type { Faq } from "@/components/site/FaqsSection";
const faqBackdropUrl="/images/graphic-hero_section_1779382669585.png";

function StaticBeforeAfterSlider({
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
  const position = 50;
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden bg-background select-none cursor-ew-resize"
    >
      {/* After image (base — right side) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 1536px) 696px, (min-width: 1280px) 568px, (min-width: 1024px) 440px, calc(100vw - 32px)"
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute top-4 right-4 bg-foreground/80 text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5 pointer-events-none">
        After
      </span>
      {/* Before image (clipped from left) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1536px) 696px, (min-width: 1280px) 568px, (min-width: 1024px) 440px, calc(100vw - 32px)"
          loading="lazy"
          draggable={false}
          className="object-cover pointer-events-none"
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

export function StaticCaseCarousel({
  slides,
}: {
  slides: { beforeSrc: string; afterSrc: string; beforeAlt?: string; afterAlt?: string }[];
}) {
  const index = 0;
  return (
    <div className="relative">
      {/* All slides are always mounted so images are decoded and ready — only active slide is visible */}
      {slides.map((slide, i) => (
        <div key={i} style={{ display: i === index ? "block" : "none" }}>
          <StaticBeforeAfterSlider
            beforeSrc={slide.beforeSrc}
            afterSrc={slide.afterSrc}
            beforeAlt={slide.beforeAlt}
            afterAlt={slide.afterAlt}
          />
        </div>
      ))}
      {/* Nav controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          aria-label="Previous photo"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Photo ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-primary" : "bg-foreground/25 hover:bg-foreground/50"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next photo"
          className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export function StaticIncludedSection({cards:included,eyebrow,heading}:{cards:{title:string;desc:string;image:string}[];eyebrow:string;heading:ReactNode}){return (<div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-4xl">
                <p className="text-primary font-semibold text-sm tracking-widest mb-4 uppercase">
                  {eyebrow}
                </p>
                <h2 className="text-h2 font-bold leading-tight">
                  {heading}
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous"
                  className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-8 h-8" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <ArrowRight className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{included.slice(0,3).map((card, i) => <div key={i} className={`group relative aspect-[4/5] overflow-hidden bg-muted shadow-lg ${i===1?"hidden md:block":i===2?"hidden xl:block":""}`}><Image src={card.image} alt={card.title} fill sizes="(max-width: 768px) 85vw, 400px" className="object-cover transition-transform duration-1000 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" /><div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white"><h3 className="font-sans text-2xl font-bold mb-2 drop-shadow-md">{card.title}</h3><p className="text-sm md:text-base text-white/90 leading-relaxed max-w-sm drop-shadow">{card.desc}</p></div></div>)}</div>
            <div className="flex md:hidden items-center justify-center gap-2 mt-8">
              <button
                type="button"
                aria-label="Previous"
                className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="w-12 h-12 flex items-center justify-center text-foreground hover:text-primary hover:bg-muted transition-colors"
              >
                <ArrowRight className="w-8 h-8" />
              </button>
            </div>
          </div>);}
export function StaticFaqSection({faqs,intro}:{faqs:Faq[];intro:string}){return (<section
      className="relative overflow-hidden bg-muted pt-12 pb-4 md:py-32"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-h2 font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-foreground/70 leading-relaxed">{intro}</p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid">
              <div className="col-start-1 row-start-1">
                <div className="w-full">
                  {faqs.map((f, i) => (
                    <div key={i} className="border-b border-foreground/15">
                      <h3 className="flex"><button type="button" aria-expanded={i===0} className="flex flex-1 items-center justify-between transition-all text-left font-sans text-lg md:text-xl font-bold py-6 hover:no-underline gap-4">
                        {f.q}
                      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${i===0?"rotate-180":""}`} /></button></h3>
                      <div hidden={i!==0} className="text-foreground/70 leading-relaxed pb-6 text-base">
                        {f.a}
                      </div>
                    </div>
                  ))}
                </div>
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
    </section>);}
export function StaticVideo({posterUrl,playLabel}:{posterUrl?:string;playLabel?:string}){if(!posterUrl)return null;return <div style={{position:"absolute",inset:0}}><Image src={posterUrl} alt="" fill loading="lazy" sizes="(min-width: 1024px) 50vw, calc(100vw - 32px)" className="object-cover"/>{playLabel&&<button type="button" aria-label={playLabel} className="absolute inset-0 flex items-center justify-center group" style={{background:"transparent"}}><span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110"><Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor"/></span></button>}</div>;}
