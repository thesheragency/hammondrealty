import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import BookedPage from '@/components/pages/BookedPage';
import { fetchBookedAcf } from '@/lib/wp-acf';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Consultation Booked | Blake Hammond Real Estate',
    description: "Your consultation is booked. Here is what happens next.",
    canonicalPath: '/booked',
  });
}

export default async function Page() {
  const acf = await fetchBookedAcf();
  return <BookedPage acf={acf} />;
}
