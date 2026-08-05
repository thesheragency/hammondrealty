export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PostListServer } from '@/components/posts/PostListServer';
import { YoastSchema } from '@/components/seo/YoastSchema';
import { buildMetadata } from '@/lib/seo-helpers';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Sacramento Real Estate Insights & Advice | Blake Hammond Real Estate',
    description: 'Explore expert Sacramento real estate articles from Blake Hammond — covering buyer and seller strategies, home-prep tips, neighborhood guides, and local market updates.',
    canonicalPath: '/blog',
  });
}

export default function Blog() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <YoastSchema path="/blog" />
      </Suspense>
      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              data-testid="text-page-title"
            >
              Blog
            </h1>
            <p 
              className="text-lg text-muted-foreground max-w-2xl"
              data-testid="text-page-description"
            >
              Browse all blog posts from WordPress.
            </p>
          </div>

          <Suspense fallback={<p className="text-muted-foreground py-8">Loading posts...</p>}>
            <PostListServer />
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}
