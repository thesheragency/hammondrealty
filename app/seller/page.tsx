import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchSellingAcf } from '@/lib/wp-acf';
import SellingPage from '@/components/pages/SellingPage';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Selling Your Home | Blake Hammond Real Estate',
    description: "Sell for more with less stress. Blake Hammond pairs sharp pricing strategy with full-service preparation and marketing.",
    canonicalPath: '/seller',
  });
}

export default async function Page() {
  const acf = await fetchSellingAcf();
  const testimonials = acf?.featuredTestimonials?.length
    ? acf.featuredTestimonials.map((t: any) => ({ quote: t.quote, name: t.name }))
    : undefined;
  return <SellingPage acf={acf} testimonials={testimonials} />;
}
