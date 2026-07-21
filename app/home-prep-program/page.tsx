import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchHomePrepAcf, fetchTestimonials } from '@/lib/wp-acf';
import HomePrepPage from '@/components/pages/HomePrepPage';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Prep Program | Blake Hammond Real Estate',
    description: "Get your home market-ready with zero upfront cost — repairs, staging, cleaning, and more, paid at closing.",
    canonicalPath: '/home-prep-program',
  });
}

export default async function Page() {
  const [acf, wpTestimonials] = await Promise.all([fetchHomePrepAcf(), fetchTestimonials()]);
  return <HomePrepPage acf={acf} testimonials={wpTestimonials.length > 0 ? wpTestimonials : undefined} />;
}
