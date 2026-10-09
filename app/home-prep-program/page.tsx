import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchHomePrepAcf, fetchMarqueeTestimonials } from '@/lib/wp-acf';
import HomePrepPage from '@/components/pages/HomePrepPage';

// Cache this page only; WordPress's secured save webhook expires wp-content
// and this route immediately. Five minutes is the backup for a missed webhook.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Home Prep Program | Blake Hammond Real Estate',
    description: "Get your home market-ready with zero upfront cost — repairs, staging, cleaning, and more, paid at closing.",
    canonicalPath: '/home-prep-program',
  });
}

export default async function Page() {
  const [acf, wpTestimonials] = await Promise.all([fetchHomePrepAcf(false), fetchMarqueeTestimonials(false)]);
  return <HomePrepPage acf={acf} testimonials={wpTestimonials} />;
}
