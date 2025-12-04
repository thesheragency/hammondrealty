import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { ProjectContent } from '@/components/projects/ProjectContent';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import type { Project } from '@shared/schema';

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  
  const isPreview = searchParams.get('preview') === 'true';
  const previewToken = searchParams.get('token');
  const previewId = searchParams.get('id');

  // Determine the endpoint based on preview mode
  const endpoint = isPreview && previewId && previewToken
    ? `/api/preview/project/${previewId}?token=${previewToken}`
    : `/api/projects/${params.slug}`;

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: isPreview 
      ? [`/api/preview/project/${previewId}?token=${previewToken}`] 
      : ['/api/projects', params.slug],
    enabled: !isPreview || (!!previewId && !!previewToken),
  });

  if (isLoading) {
    return (
      <Layout isPreview={isPreview}>
        <SeoHead title="Loading..." />
        <div className="py-12 md:py-16" data-testid="project-loading">
          <div className="container max-w-4xl mx-auto px-4">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="aspect-video w-full mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout isPreview={isPreview}>
        <SeoHead title="Project Not Found | WordPress Headless CMS" />
        <div 
          className="py-16 md:py-24"
          data-testid="project-error"
        >
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="bg-destructive/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {error instanceof Error 
                ? error.message 
                : 'The project you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/projects">
              <Button className="gap-2" data-testid="button-back-to-projects">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isPreview={isPreview}>
      <SeoHead seo={project.seoMetadata} title={project.title} />
      <div className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <ProjectContent project={project} />
        </div>
      </div>
    </Layout>
  );
}
