import { Layout } from '@/components/layout/Layout';
import { PostListServer } from '@/components/posts/PostListServer';
import { YoastSchema } from '@/components/seo/YoastSchema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | WordPress Headless CMS',
  description: 'Browse all blog posts synced from WordPress.',
  openGraph: {
    title: 'Blog | WordPress Headless CMS',
    description: 'Browse all blog posts synced from WordPress.',
    type: 'website',
  },
};

export default function Blog() {
  return (
    <Layout>
      <YoastSchema path="/blog" />
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
              Browse all blog posts synced from WordPress.
            </p>
          </div>

          <PostListServer />
        </div>
      </section>
    </Layout>
  );
}
