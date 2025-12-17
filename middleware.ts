import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Redirect = {
  origin: string;
  target: string;
  type: 301 | 302;
};

let redirectsCache: Redirect[] = [];
let lastFetch = 0;
const CACHE_DURATION_MS = 300000; // 5 minutes

async function getRedirects(): Promise<Redirect[]> {
  const now = Date.now();
  
  // Return cached redirects if still valid
  if (now - lastFetch < CACHE_DURATION_MS && redirectsCache.length > 0) {
    return redirectsCache;
  }

  const wpApiUrl = process.env.WP_API_URL;
  if (!wpApiUrl) {
    console.warn('[Redirects] WP_API_URL not set');
    return redirectsCache;
  }

  // Get WordPress base URL (without /graphql)
  const wpBaseUrl = wpApiUrl.replace(/\/graphql\/?$/, '');
  const redirectsEndpoint = `${wpBaseUrl}/wp-json/headless/v1/redirects`;

  try {
    // Build request headers with Basic Auth for staging environment
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
      const credentials = btoa(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }

    const response = await fetch(redirectsEndpoint, { headers });

    if (!response.ok) {
      console.warn(`[Redirects] API returned ${response.status}`);
      return redirectsCache;
    }

    const data = await response.json();
    
    // Transform from WordPress plugin format to our format
    const items = data.items || [];
    redirectsCache = items
      .filter((r: { enabled: boolean }) => r.enabled)
      .map((r: { url: string; action_data: { url?: string }; action_code: number }) => ({
        origin: r.url.startsWith('/') ? r.url : `/${r.url}`,
        target: r.action_data?.url || '/',
        type: (r.action_code || 301) as 301 | 302,
      }));
    
    lastFetch = now;
    console.log(`[Redirects] Fetched ${redirectsCache.length} redirects from WordPress`);
  } catch (error) {
    console.error('[Redirects] Failed to fetch redirects:', error);
  }
  
  return redirectsCache;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const redirects = await getRedirects();

  // Check for exact match or match without trailing slash
  const match = redirects.find(r => 
    r.origin === path || 
    r.origin === path.replace(/\/$/, '') ||
    r.origin + '/' === path
  );

  if (match) {
    const destination = match.target.startsWith('http')
      ? match.target
      : new URL(match.target, request.url).toString();
    
    console.log(`[Redirects] ${path} -> ${destination} (${match.type})`);
    return NextResponse.redirect(destination, match.type);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
