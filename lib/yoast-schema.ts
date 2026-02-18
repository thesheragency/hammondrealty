import { getFrontendUrl } from './seo-proxy';
import { getWpAuthHeaders, getWordPressBaseUrl } from '@/lib/wp-auth';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceWordPressDomain(content: string, wpBaseUrl: string, frontendUrl: string): string {
  const wpUrl = new URL(wpBaseUrl);
  const wpDomain = wpUrl.origin;
  const wpHost = wpUrl.host;
  const frontendUrlObj = new URL(frontendUrl);
  const frontendHost = frontendUrlObj.host;

  let result = content;
  result = result.replace(new RegExp(escapeRegExp(wpDomain), 'g'), frontendUrl);
  result = result.replace(new RegExp(`//${escapeRegExp(wpHost)}`, 'g'), `//${frontendHost}`);
  return result;
}

function extractJsonLd(html: string): string[] {
  const jsonLdBlocks: string[] = [];
  const regex = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const content = match[1].trim();
    if (content) {
      jsonLdBlocks.push(content);
    }
  }
  return jsonLdBlocks;
}

export async function fetchYoastSchema(pagePath: string): Promise<string[] | null> {
  const wpBaseUrl = getWordPressBaseUrl();
  if (!wpBaseUrl) {
    return null;
  }

  try {
    const frontendUrl = await getFrontendUrl();
    const pageUrl = `${wpBaseUrl}${pagePath === '/' ? '' : pagePath}`;
    const yoastUrl = `${wpBaseUrl}/wp-json/yoast/v1/get_head?url=${encodeURIComponent(pageUrl)}`;

    const authHeaders = getWpAuthHeaders();
    const response = await fetch(yoastUrl, {
      headers: {
        ...authHeaders,
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn(`[Yoast Schema] Failed to fetch schema for ${pagePath}: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const headHtml: string = data.html || data.head || '';

    if (!headHtml) {
      return null;
    }

    const jsonLdBlocks = extractJsonLd(headHtml);

    if (jsonLdBlocks.length === 0) {
      return null;
    }

    return jsonLdBlocks.map(block => replaceWordPressDomain(block, wpBaseUrl, frontendUrl));
  } catch (error) {
    console.error(`[Yoast Schema] Error fetching schema for ${pagePath}:`, error);
    return null;
  }
}
