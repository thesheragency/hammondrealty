import { NextResponse } from 'next/server';
import { proxyWordPressFile, getFrontendUrl, generateFallbackLlmsTxt } from '@/lib/seo-proxy';
import { fetchPosts, fetchPages } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';

export async function GET() {
  const frontendUrl = await getFrontendUrl();

  try {
    const wpResult = await proxyWordPressFile('/llms.txt', frontendUrl);
    if (wpResult) {
      return new NextResponse(wpResult.content, {
        headers: {
          'Content-Type': 'text/plain',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    const [posts, pages] = await Promise.all([fetchPosts(), fetchPages()]);

    let content = `# ${frontendUrl.replace(/https?:\/\//, '')}

> This site is powered by headless WordPress with a Next.js frontend.

## Pages

`;

    for (const page of pages) {
      const pageDesc =
        page.seoMetadata?.metaDesc ||
        page.content?.replace(/<[^>]*>/g, '').slice(0, 150) ||
        'Page content';
      content += `- [${page.title}](${frontendUrl}/${page.slug}): ${pageDesc}\n`;
    }

    content += `
## Blog Posts

`;

    for (const post of posts) {
      const postDesc =
        post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 150) ||
        post.seoMetadata?.metaDesc ||
        'Blog post';
      content += `- [${post.title}](${frontendUrl}/blog/${post.slug}): ${postDesc}\n`;
    }

    content += `
## Optional

- [Sitemap](${frontendUrl}/sitemap_index.xml)
`;

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt, serving fallback:', error);
    return new NextResponse(generateFallbackLlmsTxt(frontendUrl), {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}
