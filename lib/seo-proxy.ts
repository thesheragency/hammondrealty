import { headers } from 'next/headers';
import { getNginxBasicAuthHeaders, getWordPressBaseUrl } from '@/lib/wp-auth';

export async function getFrontendUrl(): Promise<string> {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.replace(/\/$/, '');
  }
  
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  return `${protocol}://${host}`;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function proxyWordPressFile(
  wpPath: string, 
  frontendUrl: string
): Promise<{ content: string; contentType: string } | null> {
  const wpBaseUrl = getWordPressBaseUrl();
  if (!wpBaseUrl || wpBaseUrl === '') {
    return null;
  }

  try {
    const authHeaders = getNginxBasicAuthHeaders();
    const response = await fetch(`${wpBaseUrl}${wpPath}`, { 
      headers: authHeaders,
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return null;
    }

    let content = await response.text();
    const contentType = response.headers.get('content-type') || 'text/plain';

    const wpUrl = new URL(wpBaseUrl);
    const wpDomain = wpUrl.origin;
    const wpHost = wpUrl.host;
    const frontendUrlObj = new URL(frontendUrl);
    const frontendHost = frontendUrlObj.host;
    
    content = content.replace(new RegExp(escapeRegExp(wpDomain), 'g'), frontendUrl);
    content = content.replace(new RegExp(`//${escapeRegExp(wpHost)}`, 'g'), `//${frontendHost}`);

    return { content, contentType };
  } catch (error) {
    console.error(`Error fetching ${wpPath} from WordPress:`, error);
    return null;
  }
}
