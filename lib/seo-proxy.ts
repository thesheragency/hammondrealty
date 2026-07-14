import { headers } from 'next/headers';
import { getNginxBasicAuthHeaders, getWordPressBaseUrl } from '@/lib/wp-auth';

const STATIC_PATHS = [
  '/',
  '/about',
  '/blog',
  '/book-consultation',
  '/buyer',
  '/connect',
  '/faqs',
  '/home-prep-program',
  '/home-value-analysis',
  '/privacy-policy',
  '/seller',
  '/thank-you',
];

export function generateFallbackSitemapIndex(frontendUrl: string): string {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${frontendUrl}/sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;
}

export function generateFallbackUrlset(frontendUrl: string): string {
  const now = new Date().toISOString().split('T')[0];
  const urls = STATIC_PATHS.map(
    (path) => `  <url>\n    <loc>${frontendUrl}${path}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function generateFallbackLlmsTxt(frontendUrl: string): string {
  const host = frontendUrl.replace(/https?:\/\//, '');
  return `# ${host}

> This site is powered by headless WordPress with a Next.js frontend.

## Pages

- [Home](${frontendUrl}/): Main site homepage
- [About](${frontendUrl}/about): About the team
- [Blog](${frontendUrl}/blog): Latest articles and updates
- [Buyer](${frontendUrl}/buyer): Buyer resources
- [Seller](${frontendUrl}/seller): Seller resources
- [Connect](${frontendUrl}/connect): Contact information
- [FAQs](${frontendUrl}/faqs): Frequently asked questions

## Optional

- [Sitemap](${frontendUrl}/sitemap_index.xml)
`;
}

export function generateFallbackLlmsFullTxt(frontendUrl: string): string {
  const host = frontendUrl.replace(/https?:\/\//, '');
  return `# ${host} - Full Content

> Complete content index for AI systems. Extended content unavailable — please visit the site directly.

## Pages

${STATIC_PATHS.map((path) => `### ${path === '/' ? 'Home' : path.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}\nURL: ${frontendUrl}${path}\n`).join('\n')}
`;
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
