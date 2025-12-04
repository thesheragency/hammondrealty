import { Link } from 'wouter';
import { ArrowRight, Zap, Database, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ProjectList } from '@/components/projects/ProjectList';

const features = [
  {
    icon: Globe,
    title: 'Headless WordPress',
    description: 'Fetch content from WordPress via WPGraphQL while using React for the frontend.',
  },
  {
    icon: Database,
    title: 'Local Caching',
    description: 'Content is cached in PostgreSQL for faster page loads and offline resilience.',
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
      <SeoHead
        title="WordPress Headless CMS Boilerplate"
        description="A modern headless WordPress implementation with React, Express, and PostgreSQL caching."
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              data-testid="text-hero-title"
            >
              Headless WordPress
              <span className="text-primary block mt-2">Boilerplate</span>
            </h1>
            <p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              data-testid="text-hero-description"
            >
              A modern decoupled WordPress setup with React frontend, Express backend, 
              and PostgreSQL caching. Built for performance and developer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button size="lg" className="gap-2" data-testid="button-view-projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-semibold mb-4"
              data-testid="text-features-title"
            >
              Built for Modern Web
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build fast, SEO-friendly websites with WordPress as your content source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center"
                data-testid={`card-feature-${index}`}
              >
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

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <div>
              <h2 
                className="text-3xl font-semibold mb-2"
                data-testid="text-featured-title"
              >
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Highlighted work synced from WordPress
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="gap-2" data-testid="button-all-projects">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <ProjectList featured />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 
                className="text-2xl md:text-3xl font-semibold mb-4"
                data-testid="text-cta-title"
              >
                Ready to Get Started?
              </h2>
              <p className="mb-6 opacity-90 max-w-xl mx-auto">
                Connect your WordPress site and start syncing content. 
                Configure your environment variables to begin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg"
                  data-testid="button-documentation"
                >
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
