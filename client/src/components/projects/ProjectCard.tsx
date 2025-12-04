import { Link } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} data-testid={`card-project-${project.slug}`}>
      <Card className="h-full overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer group">
        {/* Featured Image */}
        <div className="aspect-video bg-muted relative overflow-hidden">
          {project.featuredImage ? (
            <img
              src={project.featuredImage}
              alt={project.featuredImageAlt || project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-testid={`img-project-${project.slug}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
          {project.isFeatured && (
            <Badge 
              className="absolute top-3 left-3"
              data-testid={`badge-featured-${project.slug}`}
            >
              Featured
            </Badge>
          )}
        </div>

        <CardHeader className="pb-2">
          <h3 
            className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors"
            data-testid={`text-title-${project.slug}`}
          >
            {project.title}
          </h3>
        </CardHeader>

        <CardContent>
          {project.excerpt && (
            <p 
              className="text-sm text-muted-foreground line-clamp-3"
              dangerouslySetInnerHTML={{ __html: project.excerpt }}
              data-testid={`text-excerpt-${project.slug}`}
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
