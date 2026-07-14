import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import BuyingPage from '@/components/pages/BuyingPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Buying a Home | Blake Hammond Real Estate',
    description: "Find your next home with Blake Hammond — a guided, low-stress buying experience across the greater Sacramento region.",
    canonicalPath: '/buying',
  });
}

export default function Page() {
  return <BuyingPage />;
}
