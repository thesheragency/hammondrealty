import { useQuery } from '@tanstack/react-query';
import { ProjectCard } from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import type { Project } from '@shared/schema';

interface ProjectListProps {
  featured?: boolean;
}

export function ProjectList({ featured = false }: ProjectListProps) {
  const endpoint = featured ? '/api/projects/featured' : '/api/projects';
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: [endpoint],
  });

  if (isLoading) {
    return (
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="project-list-loading"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-12 text-center"
        data-testid="project-list-error"
      >
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Failed to load projects</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {error instanceof Error ? error.message : 'An error occurred while fetching projects.'}
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-12 text-center"
        data-testid="project-list-empty"
      >
        <div className="bg-muted rounded-full p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {featured 
            ? 'No featured projects yet. Mark some projects as featured in WordPress.'
            : 'No projects have been synced yet. Click the Sync button to fetch content from WordPress.'
          }
        </p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      data-testid={featured ? 'project-list-featured' : 'project-list'}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
