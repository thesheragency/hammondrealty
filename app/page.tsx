import Link from 'next/link';
import { ArrowRight, Zap, RefreshCw, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { PostListServer } from '@/components/posts/PostListServer';
import { GravityFormClient } from '@/components/forms/GravityFormClient';
import { YoastSchema } from '@/components/seo/YoastSchema';
import { buildMetadata } from '@/lib/seo-helpers';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'WordPress Headless CMS Boilerplate',
    description: 'A modern headless WordPress implementation with Next.js and ISR caching.',
  });
}

const features = [
  {
    icon: Globe,
    title: 'Headless WordPress',
    description: 'Fetch content from WordPress via WPGraphQL while using React for the frontend.',
  },
  {
    icon: RefreshCw,
    title: 'ISR Caching',
    description: 'Pages are cached and revalidated on-demand when content changes in WordPress.',
  },
  {
    icon: Zap,
    title: 'SEO Ready',
    description: 'Full Yoast SEO integration with meta tags, Open Graph, and Twitter Cards.',
  },
  {
    icon: Shield,
    title: 'Preview Mode',
    description: 'Preview draft content from WordPress before publishing.',
  },
];

export default function Home() {
  return (
    <Layout>
      <YoastSchema path="/" />
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              Headless WordPress
              <span className="text-primary block mt-2">Boilerplate</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              A modern decoupled WordPress setup with Next.js frontend and ISR caching. Built for performance and developer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog">
                <Button size="lg" className="gap-2" data-testid="button-view-blog">
                  View Blog
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" data-testid="button-learn-more">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4" data-testid="text-features-title">Built for Modern Web</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build fast, SEO-friendly websites with WordPress as your content source.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center" data-testid={`card-feature-${index}`}>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-12 h-12 flex items-center justify-center mb-2">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-semibold mb-2" data-testid="text-featured-title">Latest Posts</h2>
              <p className="text-muted-foreground">Recent content from WordPress</p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2" data-testid="button-all-posts">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <PostListServer featured />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4" data-testid="text-cta-title">Ready to Get Started?</h2>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">
                Connect your WordPress site and start building. Configure your environment variables to begin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" data-testid="button-documentation">View Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <GravityFormClient formId={1} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
