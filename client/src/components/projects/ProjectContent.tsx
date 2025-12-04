import { Link } from 'wouter';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@shared/schema';

interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  const formattedDate = project.wpModified
    ? new Date(project.wpModified).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="max-w-4xl mx-auto" data-testid="project-content">
      {/* Breadcrumb */}
      <nav className="mb-8" data-testid="breadcrumb">
        <Link href="/projects">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </nav>

      {/* Hero Image */}
      {project.featuredImage && (
        <div className="aspect-video rounded-lg overflow-hidden mb-8 bg-muted">
          <img
            src={project.featuredImage}
            alt={project.featuredImageAlt || project.title}
            className="w-full h-full object-cover"
            data-testid="img-project-hero"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {project.isFeatured && (
            <Badge data-testid="badge-featured">Featured</Badge>
          )}
          {formattedDate && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={project.wpModified?.toString()}>
                {formattedDate}
              </time>
            </div>
          )}
        </div>
        
        <h1 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          data-testid="text-project-title"
        >
          {project.title}
        </h1>
        
        {project.excerpt && (
          <p 
            className="text-xl text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: project.excerpt }}
            data-testid="text-project-excerpt"
          />
        )}
      </header>

      {/* Content */}
      {project.content && (
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: project.content }}
          data-testid="text-project-content"
        />
      )}
    </article>
  );
}
