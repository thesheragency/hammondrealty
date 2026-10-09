"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Server-rendered children; only the small visibility controller hydrates. */
export default function ScrollReveal({
  children, className, id, fadeOnly = false,
}: { children: ReactNode; className?: string; id?: string; fadeOnly?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: fadeOnly ? 0.2 : 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [fadeOnly]);
  return (
    <section ref={ref} id={id} className={className} style={{
      ...(id ? { scrollMarginTop: "6rem" } : {}),
      opacity: visible ? 1 : 0,
      transform: fadeOnly || visible ? "none" : "translateY(40px)",
      transition: `opacity ${fadeOnly ? ".8" : ".9"}s ease-out, transform .9s ease-out`,
    }}>
      {children}
    </section>
  );
}
