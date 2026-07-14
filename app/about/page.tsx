import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import AboutPage from '@/components/pages/AboutPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'About Blake Hammond | Blake Hammond Real Estate',
    description: "Meet Blake Hammond — a Sacramento-area real estate agent focused on honest advice and exceptional results.",
    canonicalPath: '/about',
  });
}

export default function Page() {
  return <AboutPage />;
}
