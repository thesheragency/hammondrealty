import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchSellingAcf, fetchTestimonials } from '@/lib/wp-acf';
import SellingPage from '@/components/pages/SellingPage';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Selling Your Home | Blake Hammond Real Estate',
    description: "Sell for more with less stress. Blake Hammond pairs sharp pricing strategy with full-service preparation and marketing.",
    canonicalPath: '/seller',
  });
}

export default async function Page() {
  const [acf, wpTestimonials] = await Promise.all([fetchSellingAcf(), fetchTestimonials()]);
  return <SellingPage acf={acf} testimonials={wpTestimonials.length > 0 ? wpTestimonials : undefined} />;
}
