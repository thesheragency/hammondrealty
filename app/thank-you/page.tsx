import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import ThankYouPage from '@/components/pages/ThankYouPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Thank You | Blake Hammond Real Estate',
    description: "Thanks for reaching out — Blake will get back to you shortly.",
    canonicalPath: '/thank-you',
  });
}

export default function Page() {
  return <ThankYouPage />;
}
