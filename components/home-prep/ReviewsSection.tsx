import type { Testimonial, ReviewsContent } from "@/components/site/TestimonialsSection";
import { GoogleG, ZillowZ, Stars } from "@/components/site/GoogleBadges";
import ScrollReveal from "./ScrollReveal";
import DeferredIsland from "./DeferredIsland";
import StaticReviewMarquee from "./StaticReviewMarquee";

export default function ReviewsSection({testimonials,id,content}:{testimonials?:Testimonial[];id?:string;variant?:"marquee";content?:ReviewsContent}){
 const reviews=(testimonials ?? [])
        .filter(
          (review) =>
            review.featured === true &&
            typeof review.shortExcerpt === "string" &&
            review.shortExcerpt.trim().length > 0 &&
            typeof review.name === "string" &&
            review.name.trim().length > 0 &&
            (review.marqueeRow === 1 || review.marqueeRow === 2) &&
            typeof review.order === "number" &&
            Number.isFinite(review.order),
        )
        .sort((a, b) => (a.order as number) - (b.order as number));
 const marqueeContent=content??{};
 const showGoogleBadge=Boolean(marqueeContent.googleRating||marqueeContent.googleLabel||marqueeContent.googleAriaLabel);
 const showZillowBadge=Boolean(marqueeContent.zillowRating||marqueeContent.zillowLabel||marqueeContent.zillowAriaLabel);
 return <ScrollReveal id={id} className="bg-background py-12 md:py-32 overflow-hidden"><div className="container mx-auto px-4 md:px-8">{(marqueeContent.heading ||
            marqueeContent.ratingSummary ||
            showGoogleBadge ||
            showZillowBadge) && (
            <div className="flex flex-col items-start text-left sm:items-center sm:text-center mb-8 md:mb-16">
              {marqueeContent.heading && (
                <h2 className="text-h2 font-bold mb-4">{marqueeContent.heading}</h2>
              )}
              {marqueeContent.ratingSummary && (
                <p className="text-foreground/70 leading-relaxed mb-8 max-w-xl">
                  {marqueeContent.ratingSummary}
                </p>
              )}
              {(showGoogleBadge || showZillowBadge) && (
                <div className="flex flex-wrap items-center gap-6">
                  {showGoogleBadge && (
                    <div className="flex items-center gap-3">
                      <GoogleG className="w-9 h-9" />
                      <div className="flex flex-col items-start">
                        {(marqueeContent.googleRating || marqueeContent.googleAriaLabel) && (
                          <div className="flex items-center gap-2">
                            {marqueeContent.googleRating && (
                              <span className="font-sans text-2xl font-bold leading-none">
                                {marqueeContent.googleRating}
                              </span>
                            )}
                            {marqueeContent.googleAriaLabel && (
                              <Stars className="w-5 h-5" label={marqueeContent.googleAriaLabel} />
                            )}
                          </div>
                        )}
                        {marqueeContent.googleLabel && (
                          <span className="text-sm text-foreground/60 mt-1">
                            {marqueeContent.googleLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {showGoogleBadge && showZillowBadge && (
                    <div className="hidden h-10 w-px bg-foreground/15 sm:block" />
                  )}
                  {showZillowBadge && (
                    <div className="flex items-center gap-3">
                      <ZillowZ className="w-9 h-9" />
                      <div className="flex flex-col items-start">
                        {(marqueeContent.zillowRating || marqueeContent.zillowAriaLabel) && (
                          <div className="flex items-center gap-2">
                            {marqueeContent.zillowRating && (
                              <span className="font-sans text-2xl font-bold leading-none">
                                {marqueeContent.zillowRating}
                              </span>
                            )}
                            {marqueeContent.zillowAriaLabel && (
                              <Stars className="w-5 h-5" label={marqueeContent.zillowAriaLabel} />
                            )}
                          </div>
                        )}
                        {marqueeContent.zillowLabel && (
                          <span className="text-sm text-foreground/60 mt-1">
                            {marqueeContent.zillowLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}<DeferredIsland kind="reviews" props={{reviews}}><StaticReviewMarquee reviews={reviews}/></DeferredIsland></div></ScrollReveal>;
}
