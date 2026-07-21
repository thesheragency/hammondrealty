import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchAboutAcf } from '@/lib/wp-acf';
import AboutPage from '@/components/pages/AboutPage';
import JsonLd from '@/components/seo/JsonLd';
import { localBusinessJsonLd } from '@/lib/structured-data';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'About Blake Hammond | Blake Hammond Real Estate',
    description: "Meet Blake Hammond — a Sacramento-area real estate agent focused on honest advice and exceptional results.",
    canonicalPath: '/about',
  });
}

export default async function Page() {
  const acf = await fetchAboutAcf();
  const testimonials = acf?.featuredTestimonials?.length
    ? acf.featuredTestimonials.map((t: any) => ({ quote: t.quote, name: t.name }))
    : undefined;
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <AboutPage acf={acf} testimonials={testimonials} />
    </>
  );
}
