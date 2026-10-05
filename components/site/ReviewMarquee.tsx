"use client";

import { GoogleG, ZillowZ, Stars } from "@/components/site/GoogleBadges";
import type { Testimonial } from "@/components/site/TestimonialsSection";
import { useDraggableMarquee } from "@/hooks/useDraggableMarquee";
import styles from "./ReviewMarquee.module.css";

interface ReviewMarqueeProps {
  reviews: Testimonial[];
}

function ReviewCard({ review, duplicate = false }: { review: Testimonial; duplicate?: boolean }) {
  const Logo = review.source === "google" ? GoogleG : review.source === "zillow" ? ZillowZ : null;

  return (
    <article
      className={styles.card}
      role="listitem"
      tabIndex={duplicate ? -1 : 0}
      aria-hidden={duplicate ? true : undefined}
    >
      <div className={styles.stars} aria-hidden="true">
        <Stars className="w-4 h-4" />
      </div>
      <p className={styles.quote}>{review.shortExcerpt}</p>
      <div className={styles.cardFooter}>
        <p className={styles.name}>{review.name}</p>
        {Logo && <Logo className={styles.sourceLogo} />}
      </div>
    </article>
  );
}

function ReviewRow({
  reviews,
  direction,
}: {
  reviews: Testimonial[];
  direction: "left" | "right";
}) {
  const { viewportRef, trackRef, handlers } = useDraggableMarquee(direction);
  if (!reviews.length) return null;

  const original = (
    <div className={styles.group} role="list">
      {reviews.map((review, index) => (
        <ReviewCard key={`${review.order}-${review.name}-${index}`} review={review} />
      ))}
    </div>
  );
  const duplicate = (
    <div className={styles.group} role="list" aria-hidden="true" inert>
      {reviews.map((review, index) => (
        <ReviewCard key={`duplicate-${review.order}-${review.name}-${index}`} review={review} duplicate />
      ))}
    </div>
  );

  return (
    <div ref={viewportRef} className={styles.rowViewport} {...handlers}>
      <div ref={trackRef} className={styles.track}>
        {direction === "right" ? duplicate : original}
        {direction === "right" ? original : duplicate}
      </div>
    </div>
  );
}

export default function ReviewMarquee({ reviews }: ReviewMarqueeProps) {
  const rowOne = reviews.filter((review) => review.marqueeRow === 1);
  const rowTwo = reviews.filter((review) => review.marqueeRow === 2);

  return (
    <div className={styles.marquee}>
      <div className={styles.rows}>
        <ReviewRow reviews={rowOne} direction="left" />
        <ReviewRow reviews={rowTwo} direction="right" />
      </div>
    </div>
  );
}
