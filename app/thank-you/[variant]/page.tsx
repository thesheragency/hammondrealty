import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo-helpers";
import ThankYouPage from "@/components/pages/ThankYouPage";
import { notFound } from "next/navigation";

type Variant = "buying" | "selling" | "contact" | "home-value" | "book-consultation";

const CONTENT: Record<Variant, {
  title: string;
  eyebrow: string;
  heading: string;
  body: string;
  buttonText: string;
  buttonLink: string;
}> = {
  buying: {
    title: "Thank You | Buying With Blake",
    eyebrow: "Request Received",
    heading: "We'll Be In Touch Soon.",
    body: "We've received your buying inquiry. Blake will review your goals and reach out within one business day to plan your property search.",
    buttonText: "Explore Buying",
    buttonLink: "/buyer",
  },
  selling: {
    title: "Thank You | Selling With Blake",
    eyebrow: "Request Received",
    heading: "We'll Be In Touch Soon.",
    body: "We've received your selling inquiry. Blake will review your property details and reach out within one business day to discuss your selling strategy.",
    buttonText: "Explore Selling",
    buttonLink: "/seller",
  },
  contact: {
    title: "Thank You | Blake Hammond Real Estate",
    eyebrow: "Message Received",
    heading: "Thank You For Reaching Out.",
    body: "Your message has been received. A personal response will be sent to your inbox within one business day.",
    buttonText: "Back To Home",
    buttonLink: "/",
  },
  "home-value": {
    title: "Thank You | Free Home Value Analysis",
    eyebrow: "Request Submitted",
    heading: "Your Report Is On Its Way.",
    body: "We've received your home value request. Blake will analyze your property and reach out within one business day with a comprehensive market report.",
    buttonText: "Back To Home",
    buttonLink: "/",
  },
  "book-consultation": {
    title: "Thank You | Book A Consultation",
    eyebrow: "You're All Set",
    heading: "Consultation Request Received.",
    body: "Blake will confirm your appointment shortly and send you everything you need to prepare. Check your inbox for a confirmation email.",
    buttonText: "Back To Home",
    buttonLink: "/",
  },
};

const VARIANTS = Object.keys(CONTENT) as Variant[];

export async function generateStaticParams() {
  return VARIANTS.map((variant) => ({ variant }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const content = CONTENT[variant as Variant];
  if (!content) return {};
  return buildMetadata({
    title: content.title,
    description: content.body,
    canonicalPath: `/thank-you/${variant}`,
    robots: { index: false, follow: true },
  });
}

export default async function Page({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const content = CONTENT[variant as Variant];
  if (!content) notFound();

  return (
    <ThankYouPage
      acf={{
        eyebrow: content.eyebrow,
        heading: content.heading,
        body: content.body,
        buttonText: content.buttonText,
        buttonLink: content.buttonLink,
      }}
    />
  );
}
