import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchBuyingAcf } from '@/lib/wp-acf';
import BuyingPage from '@/components/pages/BuyingPage';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Buying a Home | Blake Hammond Real Estate',
    description: "Find your next home with Blake Hammond — a guided, low-stress buying experience across the greater Sacramento region.",
    canonicalPath: '/buyer',
  });
}

export default async function Page() {
  const acf = await fetchBuyingAcf();
  return <BuyingPage acf={acf} />;
}
