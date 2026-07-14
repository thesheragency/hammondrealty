import { NextRequest, NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl, generateFallbackUrlset } from '@/lib/seo-proxy';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const sitemapPath = '/' + path.join('/');

  const frontendUrl = await getFrontendUrl();
  const result = await proxyWordPressFile(sitemapPath, frontendUrl);

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
