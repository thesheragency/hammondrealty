import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchHomePrepAcf } from '@/lib/wp-acf';
import HomePrepPage from '@/components/pages/HomePrepPage';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Prep Program | Blake Hammond Real Estate',
    description: "Get your home market-ready with zero upfront cost — repairs, staging, cleaning, and more, paid at closing.",
    canonicalPath: '/home-prep-program',
  });
}

export default async function Page() {
  const acf = await fetchHomePrepAcf();
  const testimonials = acf?.featuredTestimonials?.length
    ? acf.featuredTestimonials.map((t: any) => ({ quote: t.quote, name: t.name }))
    : undefined;
  return <HomePrepPage acf={acf} testimonials={testimonials} />;
}
