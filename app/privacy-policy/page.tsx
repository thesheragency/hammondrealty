import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-helpers';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import { getWpAuthHeaders } from '@/lib/wp-auth';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Privacy Policy | Blake Hammond Real Estate',
    description: "How Blake Hammond Real Estate collects, uses, and protects your information.",
    canonicalPath: '/privacy-policy',
  });
}

async function fetchPrivacyPolicyContent(): Promise<string | null> {
  try {
    const wpApiUrl = process.env.WP_API_URL;
    if (!wpApiUrl) return null;
    const res = await fetch(wpApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getWpAuthHeaders() },
      body: JSON.stringify({
        query: `{ page(id: "privacy-policy", idType: URI) { content } }`,
      }),
      next: { revalidate: 1800, tags: ['wp-content'] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const content: string | undefined = json?.data?.page?.content;
    // Only use WP content when it's substantive (not an empty placeholder stub)
    if (content && content.replace(/<[^>]+>/g, '').trim().length > 100) return content;
    return null;
  } catch (error) {
    console.error('[privacy-policy] Failed to fetch WP content:', error);
    return null;
  }
}

export default async function Page() {
  const content = await fetchPrivacyPolicyContent();
  return <PrivacyPolicyPage content={content} />;
}
