import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import GetInTouchPage from '@/components/pages/GetInTouchPage';
import { fetchGetInTouchAcf } from '@/lib/wp-acf';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Get in Touch | Blake Hammond Real Estate',
    description: "Questions about buying, selling, or preparing your home? Reach out to Blake Hammond directly.",
    canonicalPath: '/connect',
  });
}

export default async function Page() {
  const acf = await fetchGetInTouchAcf();
  return <GetInTouchPage acf={acf} />;
}
