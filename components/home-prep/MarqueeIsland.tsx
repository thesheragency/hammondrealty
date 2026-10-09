"use client";

import { useEffect } from "react";
import ReviewMarquee from "@/components/site/ReviewMarquee";
import type { Testimonial } from "@/components/site/TestimonialsSection";

export default function MarqueeIsland({ reviews, onReady }: {
  reviews: Testimonial[]; onReady: () => void;
}) {
  useEffect(onReady, [onReady]);
  return <ReviewMarquee reviews={reviews} />;
}
