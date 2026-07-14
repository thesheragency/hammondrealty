import { NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl, generateFallbackSitemapIndex } from '@/lib/seo-proxy';

export const dynamic = 'force-dynamic';

export async function GET() {
  const frontendUrl = await getFrontendUrl();
  const result = await proxyWordPressFile('/wp-sitemap.xml', frontendUrl);

  if (!result) {
    return new NextResponse(generateFallbackSitemapIndex(frontendUrl), {
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
