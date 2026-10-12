import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

interface MeetBlakeSectionProps {
  photo?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    };
  } | null;
  heading?: string;
  licenseLine?: string;
  credential2?: string;
  credential3?: string;
  text?: string;
  link?: {
    title?: string;
    url?: string;
    target?: string;
  } | null;
}

export default function MeetBlakeSection({
  photo,
  heading,
  licenseLine,
  credential2,
  credential3,
  text,
  link,
}: MeetBlakeSectionProps) {
  const imageUrl = photo?.node?.sourceUrl?.trim();
  const imageAlt = photo?.node?.altText?.trim() || heading?.trim() || "";
  const credentials = [licenseLine, credential2, credential3]
    .map((credential) => credential?.trim())
    .filter((credential): credential is string => Boolean(credential));
  const trimmedHeading = heading?.trim();
  const trimmedText = text?.trim();
  const linkTitle = link?.title?.trim();
  const linkUrl = link?.url?.trim();
  const linkTarget = link?.target?.trim();

  if (
    !imageUrl &&
    !trimmedHeading &&
    credentials.length === 0 &&
    !trimmedText &&
    !(linkTitle && linkUrl)
  ) {
    return null;
  }

  return (
    <section id="meet-blake" aria-labelledby={trimmedHeading ? "meet-blake-heading" : undefined} className="w-full scroll-mt-24 border-y border-accent/25 bg-accent/15 px-5 py-10 md:py-14">
      <div className="mx-auto flex max-w-[960px] flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-10">
        {imageUrl && (
          <div className="flex shrink-0 justify-center md:block">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1049}
              height={1499}
              sizes="(min-width: 768px) 200px, 120px"
              quality={60}
              loading="lazy"
              className="h-auto w-[120px] rounded-[4px] object-cover md:w-[200px]"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          {trimmedHeading && (
            <h2
              id="meet-blake-heading"
              className="mb-3 text-xl font-bold leading-tight text-foreground md:text-2xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {trimmedHeading}
            </h2>
          )}

          {credentials.length > 0 && (
            <ul className="mb-4 space-y-1.5">
              {credentials.map((credential, index) => (
                <li
                  key={`${index}-${credential}`}
                  className="flex items-start gap-2 text-[15px] leading-snug text-foreground/85"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-[2px] h-4 w-4 shrink-0 text-accent"
                    strokeWidth={2.5}
                  />
                  <span className="[text-wrap:balance]">{credential}</span>
                </li>
              ))}
            </ul>
          )}

          {trimmedText && (
            <p className="mb-4 text-[15px] leading-relaxed text-foreground/80 [text-wrap:pretty]">
              {trimmedText}
            </p>
          )}

          {linkTitle && linkUrl && (
            <Link
              href={linkUrl}
              target={linkTarget || undefined}
              rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-foreground underline decoration-accent/60 underline-offset-4 transition-colors hover:text-foreground/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {linkTitle}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
