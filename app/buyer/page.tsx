export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchBuyingAcf, fetchTestimonials } from '@/lib/wp-acf';
import BuyingPage from '@/components/pages/BuyingPage';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Buying a Home | Blake Hammond Real Estate',
    description: "Find your next home with Blake Hammond — a guided, low-stress buying experience across the greater Sacramento region.",
    canonicalPath: '/buyer',
  });
}

export default async function Page() {
  const [acf, wpTestimonials] = await Promise.all([fetchBuyingAcf(), fetchTestimonials()]);
  return <BuyingPage acf={acf} testimonials={wpTestimonials.length > 0 ? wpTestimonials : undefined} />;
}
