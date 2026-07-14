import { NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl, generateFallbackUrlset } from '@/lib/seo-proxy';

export const dynamic = 'force-dynamic';

export async function GET() {
  const frontendUrl = await getFrontendUrl();

  let result = await proxyWordPressFile('/sitemap.xml', frontendUrl);
  if (!result) {
    result = await proxyWordPressFile('/sitemap_index.xml', frontendUrl);
  }
  if (!result) {
    result = await proxyWordPressFile('/wp-sitemap.xml', frontendUrl);
  }

  if (!result) {
    return new NextResponse(generateFallbackUrlset(frontendUrl), {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  return new NextResponse(result.content, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
