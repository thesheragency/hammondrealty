import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ProjectList } from '@/components/projects/ProjectList';

export default function Projects() {
  return (
    <Layout>
      <SeoHead
        title="Projects | WordPress Headless CMS"
        description="Browse all projects synced from WordPress."
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              data-testid="text-page-title"
            >
              Projects
            </h1>
            <p 
              className="text-lg text-muted-foreground max-w-2xl"
              data-testid="text-page-description"
            >
              Browse all projects synced from WordPress. Click the Sync button to fetch the latest content.
            </p>
          </div>

          <ProjectList />
        </div>
      </section>
    </Layout>
  );
}
