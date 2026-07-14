import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import FaqsPage from '@/components/pages/FaqsPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Frequently Asked Questions | Blake Hammond Real Estate',
    description: "Answers to common questions about buying, selling, and the Home Prep Program.",
    canonicalPath: '/faqs',
  });
}

export default function Page() {
  return <FaqsPage />;
}
