import { GoogleG, ZillowZ } from "./GoogleBadges";

interface TestimonialStripProps {
  quote?: string;
  name?: string;
  source?: string;
}

export default function TestimonialStrip({
  quote,
  name,
  source,
}: TestimonialStripProps) {
  const trimmedQuote = quote?.trim();

  if (!trimmedQuote) return null;

  const trimmedName = name?.trim();
  const normalizedSource = source?.trim().toLowerCase();
  const sourceLogo =
    normalizedSource === "google" ? (
      <GoogleG className="h-6 w-6" />
    ) : normalizedSource === "zillow" ? (
      <ZillowZ className="h-6 w-6" />
    ) : null;

  return (
    <section className="m-0 w-full border-y border-accent/25 bg-accent/15 px-5 py-[50px]">
      <figure className="mx-auto my-0 flex max-w-[720px] flex-col items-center text-center">
        <blockquote className="m-0 text-[18px] italic leading-[1.4] text-foreground [text-wrap:balance] before:content-['“'] after:content-['”'] md:text-[22px] md:tracking-[-0.04em]">
          {trimmedQuote}
        </blockquote>
        {(trimmedName || sourceLogo) && (
          <figcaption className="mt-3 flex items-center justify-center gap-3 text-sm text-foreground/70">
            {trimmedName && <span>{trimmedName}</span>}
            {trimmedName && sourceLogo && (
              <span aria-hidden="true" className="h-3.5 w-px bg-foreground/20" />
            )}
            {sourceLogo}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
