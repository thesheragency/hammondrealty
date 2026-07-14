import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import BookedPage from '@/components/pages/BookedPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Consultation Booked | Blake Hammond Real Estate',
    description: "Your consultation is booked. Here is what happens next.",
    canonicalPath: '/booked',
  });
}

export default function Page() {
  return <BookedPage />;
}
