import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import SellingPage from '@/components/pages/SellingPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Selling Your Home | Blake Hammond Real Estate',
    description: "Sell for more with less stress. Blake Hammond pairs sharp pricing strategy with full-service preparation and marketing.",
    canonicalPath: '/selling',
  });
}

export default function Page() {
  return <SellingPage />;
}
