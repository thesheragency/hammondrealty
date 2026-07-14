import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import { fetchAboutAcf } from '@/lib/wp-acf';
import AboutPage from '@/components/pages/AboutPage';

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
  return <AboutPage acf={acf} />;
}
