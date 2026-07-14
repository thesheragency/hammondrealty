import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import BookConsultationPage from '@/components/pages/BookConsultationPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Book a Consultation | Blake Hammond Real Estate',
    description: "Schedule a free, no-pressure consultation with Blake Hammond to talk through your real estate goals.",
    canonicalPath: '/book-consultation',
  });
}

export default function Page() {
  return <BookConsultationPage />;
}
