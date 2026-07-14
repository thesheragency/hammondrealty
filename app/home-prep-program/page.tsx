import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import HomePrepPage from '@/components/pages/HomePrepPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Prep Program | Blake Hammond Real Estate',
    description: "Get your home market-ready with zero upfront cost — repairs, staging, cleaning, and more, paid at closing.",
    canonicalPath: '/home-prep-program',
  });
}

export default function Page() {
  return <HomePrepPage />;
}
