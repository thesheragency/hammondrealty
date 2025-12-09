import { NextResponse } from 'next/server';
import { getFrontendUrl } from '@/lib/seo-proxy';
import { storage } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET() {
  const frontendUrl = await getFrontendUrl();
  
  try {
    const posts = await storage.getAllPosts();
    const pages = await storage.getAllPages();
    
    let content = `# ${frontendUrl.replace(/https?:\/\//, '')} - Full Content

> Complete content index for AI systems.

`;
    
    content += `## Pages\n\n`;
    for (const page of pages) {
      const plainContent = page.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
      content += `### ${page.title}\n`;
      content += `URL: ${frontendUrl}/${page.slug}\n`;
      content += `${plainContent.slice(0, 1000)}${plainContent.length > 1000 ? '...' : ''}\n\n`;
    }
    
    content += `## Blog Posts\n\n`;
    for (const post of posts) {
      const plainContent = post.content?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
      content += `### ${post.title}\n`;
      content += `URL: ${frontendUrl}/blog/${post.slug}\n`;
      content += `Published: ${post.publishedAt || 'N/A'}\n`;
      content += `${plainContent.slice(0, 1000)}${plainContent.length > 1000 ? '...' : ''}\n\n`;
    }
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating llms-full.txt:', error);
    return new NextResponse('Error generating llms-full.txt', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
