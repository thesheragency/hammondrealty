import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchFaqsAcf, fetchFaqs } from '@/lib/wp-acf';
import FaqsPage from '@/components/pages/FaqsPage';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Frequently Asked Questions | Blake Hammond Real Estate',
    description: "Answers to common questions about buying, selling, and the Home Prep Program.",
    canonicalPath: '/faqs',
  });
}

export default async function Page() {
  const [acf, faqs] = await Promise.all([fetchFaqsAcf(), fetchFaqs()]);
  return <FaqsPage acf={acf} faqs={faqs} />;
}
