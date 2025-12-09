import { headers } from 'next/headers';

function getWordPressBaseUrl(): string {
  const wpApiUrl = process.env.WP_API_URL || '';
  return wpApiUrl.replace(/\/graphql\/?$/, '');
}

function shouldUseBasicAuth(): boolean {
  const enabled = process.env.WP_BASIC_AUTH_ENABLED;
  if (enabled === 'false' || enabled === '0') {
    return false;
  }
  return !!(process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD);
}

function getWordPressAuthHeaders(): Record<string, string> {
  const authHeaders: Record<string, string> = {};
  if (shouldUseBasicAuth()) {
    const credentials = Buffer.from(
      `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
    ).toString('base64');
    authHeaders['Authorization'] = `Basic ${credentials}`;
  }
  return authHeaders;
}

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
  if (!wpBaseUrl) {
    return null;
  }

  try {
    const authHeaders = getWordPressAuthHeaders();
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
