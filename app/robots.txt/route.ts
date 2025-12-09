import { NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl } from '@/lib/seo-proxy';

export const dynamic = 'force-dynamic';

export async function GET() {
  const frontendUrl = await getFrontendUrl();
  const result = await proxyWordPressFile('/robots.txt', frontendUrl);
  
  let robotsContent: string;
  
  if (!result) {
    robotsContent = `User-agent: *
Allow: /

Sitemap: ${frontendUrl}/sitemap_index.xml
`;
  } else {
    robotsContent = result.content;
    if (!robotsContent.toLowerCase().includes('sitemap:')) {
      robotsContent = robotsContent.trimEnd() + `\n\nSitemap: ${frontendUrl}/sitemap_index.xml\n`;
    }
  }
  
  return new NextResponse(robotsContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
