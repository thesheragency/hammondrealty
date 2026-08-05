import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import HomeValuePage from '@/components/pages/HomeValuePage';
import { fetchHomeValueAcf, fetchTestimonials } from '@/lib/wp-acf';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Value Analysis | Blake Hammond Real Estate',
    description: "Request a personalized, data-driven home value analysis — not an instant algorithm estimate.",
    canonicalPath: '/home-value-analysis',
  });
}

export default async function Page() {
  const [acf, wpTestimonials] = await Promise.all([fetchHomeValueAcf(), fetchTestimonials()]);
  return <HomeValuePage acf={acf} testimonials={wpTestimonials.length > 0 ? wpTestimonials : undefined} />;
}
