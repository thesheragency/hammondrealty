import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Privacy Policy | Blake Hammond Real Estate',
    description: "How Blake Hammond Real Estate collects, uses, and protects your information.",
    canonicalPath: '/privacy-policy',
  });
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
