import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import HomeValuePage from '@/components/pages/HomeValuePage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Value Analysis | Blake Hammond Real Estate',
    description: "Request a personalized, data-driven home value analysis — not an instant algorithm estimate.",
    canonicalPath: '/home-value-analysis',
  });
}

export default function Page() {
  return <HomeValuePage />;
}
