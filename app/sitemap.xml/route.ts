import { NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl } from '@/lib/seo-proxy';

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
    return new NextResponse('Sitemap not found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  return new NextResponse(result.content, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
