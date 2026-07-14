import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import GetInTouchPage from '@/components/pages/GetInTouchPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Get in Touch | Blake Hammond Real Estate',
    description: "Questions about buying, selling, or preparing your home? Reach out to Blake Hammond directly.",
    canonicalPath: '/get-in-touch',
  });
}

export default function Page() {
  return <GetInTouchPage />;
}
