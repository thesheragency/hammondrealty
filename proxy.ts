import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Redirect = {
  origin: string;
  target: string;
  type: 301 | 302;
};

// Frontend-owned static routes. WordPress redirects must never hijack these —
// they exist as dedicated app routes and always take priority.
const PROTECTED_PATHS = new Set([
  '/',
  '/buyer',
  '/seller',
  '/home-prep-program',
  '/about',
  '/home-value-analysis',
  '/connect',
  '/book-consultation',
  '/booked',
  '/thank-you',
  '/faqs',
  '/privacy-policy',
  '/blog',
  '/style-guide',
]);

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
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    const wpBasicAuthEnabled = process.env.WP_BASIC_AUTH_ENABLED;
    const useNginxAuth = wpBasicAuthEnabled && wpBasicAuthEnabled !== 'false' && wpBasicAuthEnabled !== '0'
      && process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD;
    if (useNginxAuth) {
      const credentials = btoa(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`);
      headers['Authorization'] = `Basic ${credentials}`;
    }

    const response = await fetch(redirectsEndpoint, { headers });

    if (!response.ok) {
      console.warn(`[Redirects] API returned ${response.status}`);
      return redirectsCache;
    }

    const data = await response.json();
    
    // Support both formats:
    // 1. Headless Tools plugin format: { from_path, to_url, status }
    // 2. Redirection plugin format: { items: [{ url, action_data: { url }, action_code, enabled }] }
    let items: Redirect[] = [];
    
    if (Array.isArray(data)) {
      // Headless Tools plugin format - direct array
      items = data.map((r: { from_path: string; to_url: string; status: number }) => ({
        origin: r.from_path.startsWith('/') ? r.from_path : `/${r.from_path}`,
        target: r.to_url,
        type: (r.status || 301) as 301 | 302,
      }));
    } else if (data.items && Array.isArray(data.items)) {
      // Redirection plugin format - { items: [...] }
      items = data.items
        .filter((r: { enabled: boolean }) => r.enabled)
        .map((r: { url: string; action_data: { url?: string }; action_code: number }) => ({
          origin: r.url.startsWith('/') ? r.url : `/${r.url}`,
          target: r.action_data?.url || '/',
          type: (r.action_code || 301) as 301 | 302,
        }));
    }
    
    redirectsCache = items;
    
    lastFetch = now;
    console.log(`[Redirects] Fetched ${redirectsCache.length} redirects from WordPress`);
  } catch (error) {
    console.error('[Redirects] Failed to fetch redirects:', error);
  }
  
  return redirectsCache;
}

// Derive the canonical non-www origin from FRONTEND_URL at module load time.
// Using the env var (rather than reflecting the incoming Host header) prevents
// host-header-injection open-redirect attacks.
const NON_WWW_ORIGIN = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.replace(/^(https?:\/\/)www\./, '$1').replace(/\/$/, '')
  : null;

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // www → non-www: 301 redirect ANY www request (including /robots.txt, sitemaps, etc.)
  // to the canonical non-www origin. Must run before all other logic.
  const host =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    // Prefer FRONTEND_URL-derived origin; fall back to stripping www. from the host
    const origin = NON_WWW_ORIGIN ?? (() => {
      const proto = request.headers.get('x-forwarded-proto') || 'https';
      return `${proto}://${host.replace(/^www\./, '')}`;
    })();
    const destination = `${origin}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(destination, 301);
  }

  // Never apply WordPress redirects to routes the frontend owns
  if (PROTECTED_PATHS.has(path.replace(/\/$/, '') || '/')) {
    return NextResponse.next();
  }

  const redirects = await getRedirects();

  // Check for exact match or match without trailing slash
  const match = redirects.find(r => 
    r.origin === path || 
    r.origin === path.replace(/\/$/, '') ||
    r.origin + '/' === path
  );

  if (match) {
    let destination = match.target.startsWith('http')
      ? match.target
      : new URL(match.target, request.url).toString();

    // Sanitize redirect targets that reference localhost — these are set in WordPress
    // when the plugin was configured against the local dev server. Replace them with
    // the configured FRONTEND_URL so external visitors get a valid destination.
    if (NON_WWW_ORIGIN && /https?:\/\/localhost(:\d+)?/.test(destination)) {
      destination = destination.replace(/https?:\/\/localhost(:\d+)?/, NON_WWW_ORIGIN);
      console.log(`[Redirects] Sanitized localhost target → ${destination}`);
    }
    
    console.log(`[Redirects] ${path} -> ${destination} (${match.type})`);
    return NextResponse.redirect(destination, match.type);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all requests except Next.js internal asset paths.
    // Deliberately includes dotted paths (/robots.txt, /sitemap.xml, etc.)
    // so the www→non-www redirect fires for SEO-critical resources too.
    '/((?!_next/static|_next/image).*)',
  ],
};
