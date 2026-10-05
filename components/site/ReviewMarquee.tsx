"use client";

import { useState, type PointerEvent } from "react";
import { GoogleG, ZillowZ, Stars } from "@/components/site/GoogleBadges";
import type { ReviewsContent, Testimonial } from "@/components/site/TestimonialsSection";
import styles from "./ReviewMarquee.module.css";

interface ReviewMarqueeProps {
  reviews: Testimonial[];
  content: ReviewsContent;
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
    <div className={styles.rowViewport}>
      <div className={`${styles.track} ${direction === "right" ? styles.right : styles.left}`}>
        {direction === "right" ? duplicate : original}
        {direction === "right" ? original : duplicate}
      </div>
    </div>
  );
}

export default function ReviewMarquee({ reviews, content }: ReviewMarqueeProps) {
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [temporarilyPaused, setTemporarilyPaused] = useState(false);
  const rowOne = reviews.filter((review) => review.marqueeRow === 1);
  const rowTwo = reviews.filter((review) => review.marqueeRow === 2);
  const canControl = Boolean(content.pauseLabel && content.playLabel);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") {
      event.currentTarget.setPointerCapture(event.pointerId);
      setTemporarilyPaused(true);
    }
  }

  return (
    <div
      className={styles.marquee}
      data-paused={manuallyPaused || temporarilyPaused}
    >
      <div
        className={styles.rows}
        onPointerDown={handlePointerDown}
        onPointerUp={(event) => {
          if (event.pointerType === "touch") setTemporarilyPaused(false);
        }}
        onPointerCancel={() => setTemporarilyPaused(false)}
        onLostPointerCapture={() => setTemporarilyPaused(false)}
        onBlurCapture={(event) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          // Keyboard navigation may scroll a paused row to its focused card.
          // Restore its normal loop position once focus leaves that row.
          for (const viewport of event.currentTarget.children) {
            if (!viewport.contains(event.relatedTarget as Node | null)) viewport.scrollLeft = 0;
          }
        }}
      >
        <ReviewRow reviews={rowOne} direction="left" />
        <ReviewRow reviews={rowTwo} direction="right" />
      </div>
      {canControl && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label={manuallyPaused ? content.playLabel : content.pauseLabel}
            onClick={() => setManuallyPaused((paused) => !paused)}
          >
            <span className={styles.controlIcon} aria-hidden="true">
              {manuallyPaused ? (
                <svg viewBox="0 0 16 16" focusable="false">
                  <path d="M5 3.5v9l7-4.5-7-4.5Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 16 16" focusable="false">
                  <path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" />
                </svg>
              )}
            </span>
            <span>{manuallyPaused ? content.playLabel : content.pauseLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
