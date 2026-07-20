"use client";

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
import { GoogleG, ZillowZ, Stars } from "@/components/site/GoogleBadges";

export interface Testimonial {
  quote: string;
  name: string;
  source?: "google" | "zillow";
}

const defaultReviews: Testimonial[] = [
  {
    quote:
      "Thoughtful, patient, understanding, and trustworthy. Blake was our 3rd realtor for our recent home sale. He delivered on his expectations for the home and had great communication throughout the whole process. Listened to his expertise, home listed at the right price point, and sold for over asking price, 36 hours after being listed. In Blake we trust! Couldn't have asked for a better person.",
    name: "Thomas Thornton",
    source: "google",
  },
  {
    quote:
      "Excellent experience with Blake. He was friendly, supportive throughout the process, provided clear recommendations, and worked with us to accommodate two busy professionals! The house sold extremely quickly and his marketing and staging were wonderfully done. So appreciate him and would recommend him.",
    name: "Christine Smith",
    source: "google",
  },
  {
    quote:
      "I selected Blake Hammond who did an outstanding job. I feel he went above and beyond what was required for the sale. His selection was very much based on the information that I provided, and I feel that Blake provides a very good service to those who are unfamiliar with the real estate world. I believe that he deserves ten stars for making this transaction possible in a short time, gathering all other services related to the sale, and communicating effectively to finish with grace.",
    name: "Larry Ciche",
    source: "google",
  },
  {
    quote:
      "Blake did a wonderful job for us and got our house sold on the very first day it was listed. We could not be any happier with his help. We highly recommend him because we know he will take really good care of you.",
    name: "Tim Tingey",
    source: "google",
  },
  {
    quote:
      "Highly HIGHLY recommend Blake. He made the home buying process go as smooth as it could. We had a lot of unique things pop up in our home buying process and Blake was always there to help us navigate. He was incredibly responsive, knowledgeable, and truly had our best interests at heart every step of the way.",
    name: "Joe Silva",
    source: "zillow",
  },
  {
    quote:
      "Blake Hammond is absolutely incredible to work with. He is an energetic and knowledgeable professional who truly listens to his clients' needs. We were particularly impressed by his market expertise and his ability to negotiate on our behalf. We would absolutely work with Blake again.",
    name: "Chase Bonslett",
    source: "zillow",
  },
  {
    quote:
      "Blake was phenomenal and we would definitely hire him again. We always felt like he had our best interest in mind. We loved his assertiveness and confidence. He kept the entire process moving forward and communicated with us every step of the way. Could not recommend him more highly.",
    name: "Kellie",
    source: "zillow",
  },
  {
    quote:
      "Blake is a trusted and seasoned professional with a keen sense of what works well in the marketplace. When we hired Blake, we committed to listening to his astute input on pricing and presentation — and it paid off. Our home sold quickly and above expectations. A true professional in every sense.",
    name: "R. Meisenbach",
    source: "zillow",
  },
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

function SourceLogo({ source }: { source?: "google" | "zillow" }) {
  if (source === "zillow") return <ZillowZ className="w-6 h-6" />;
  return <GoogleG className="w-6 h-6" />;
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const reviews = testimonials && testimonials.length > 0 ? testimonials : defaultReviews;
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
        <div className="flex flex-col items-start text-left sm:items-center sm:text-center mb-8 md:mb-16">
          <h2 className="text-h2 font-bold mb-4">Trusted By Homeowners</h2>
          <p className="text-foreground/70 leading-relaxed mb-8 max-w-xl">
            Rated 5 out of 5 stars based on verified client feedback.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <GoogleG className="w-9 h-9" />
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-2xl font-bold leading-none">5.0</span>
                  <Stars className="w-5 h-5" label="Rated 5.0 out of 5 stars" />
                </div>
                <span className="text-sm text-foreground/60 mt-1">Google reviews</span>
              </div>
            </div>
            <div className="w-px h-10 bg-foreground/15" />
            <div className="flex items-center gap-3">
              <ZillowZ className="w-9 h-9" />
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-2xl font-bold leading-none">5.0</span>
                  <Stars className="w-5 h-5" label="Rated 5.0 out of 5 stars on Zillow" />
                </div>
                <span className="text-sm text-foreground/60 mt-1">Zillow reviews</span>
              </div>
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
                    <SourceLogo source={r.source} />
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
