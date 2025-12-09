import { NextRequest, NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl } from '@/lib/seo-proxy';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const frontendUrl = await getFrontendUrl();
  const fullPath = `/wp-content/plugins/wordpress-seo/css/${path.join('/')}`;
  
  const result = await proxyWordPressFile(fullPath, frontendUrl);
  
  if (!result) {
    return new NextResponse('File not found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  return new NextResponse(result.content, {
    headers: {
      'Content-Type': result.contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
