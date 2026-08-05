export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchFaqsAcf, fetchFaqs } from '@/lib/wp-acf';
import FaqsPage from '@/components/pages/FaqsPage';
import JsonLd from '@/components/seo/JsonLd';
import { localBusinessJsonLd, faqPageJsonLd, staticFaqItems } from '@/lib/structured-data';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Frequently Asked Questions | Blake Hammond Real Estate',
    description: "Answers to common questions about buying, selling, and the Home Prep Program.",
    canonicalPath: '/faqs',
  });
}

export default async function Page() {
  const [acf, faqs] = await Promise.all([fetchFaqsAcf(), fetchFaqs()]);
  const faqItems = faqs?.length
    ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
    : staticFaqItems;
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqPageJsonLd(faqItems)} />
      <FaqsPage acf={acf} faqs={faqs} />
    </>
  );
}
