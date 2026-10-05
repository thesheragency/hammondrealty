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
    <section className="w-full bg-muted px-5 py-8 md:py-12">
      <figure className="mx-auto flex max-w-[700px] flex-col items-center text-center">
        <blockquote className="text-xl italic leading-relaxed text-foreground md:text-2xl">
          {trimmedQuote}
        </blockquote>
        {(trimmedName || sourceLogo) && (
          <figcaption className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            {trimmedName && <span>{trimmedName}</span>}
            {trimmedName && sourceLogo && (
              <span aria-hidden="true" className="h-4 w-px bg-foreground/20" />
            )}
            {sourceLogo}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
