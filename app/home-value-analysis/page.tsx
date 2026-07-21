import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import HomeValuePage from '@/components/pages/HomeValuePage';
import { fetchHomeValueAcf } from '@/lib/wp-acf';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Value Analysis | Blake Hammond Real Estate',
    description: "Request a personalized, data-driven home value analysis — not an instant algorithm estimate.",
    canonicalPath: '/home-value-analysis',
  });
}

export default async function Page() {
  const acf = await fetchHomeValueAcf();
  const testimonials = acf?.featuredTestimonials?.length
    ? acf.featuredTestimonials.map((t: any) => ({ quote: t.quote, name: t.name }))
    : undefined;
  return <HomeValuePage acf={acf} testimonials={testimonials} />;
}
