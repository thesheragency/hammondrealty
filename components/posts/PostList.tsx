import { useQuery } from '@tanstack/react-query';
import { PostCard } from './PostCard';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import type { Post } from '@shared/schema';

interface PostListProps {
  featured?: boolean;
}

export function PostList({ featured = false }: PostListProps) {
  const endpoint = featured ? '/api/posts/featured' : '/api/posts';
  
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: [endpoint],
  });

  if (isLoading) {
    return (
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="post-list-loading"
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
        data-testid="post-list-error"
      >
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Failed to load posts</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {error instanceof Error ? error.message : 'An error occurred while fetching posts.'}
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center py-12 text-center"
        data-testid="post-list-empty"
      >
        <div className="bg-muted rounded-full p-4 mb-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {featured 
            ? 'No featured posts yet. Mark some posts as featured in WordPress.'
            : 'No posts have been synced yet. Click the Sync button to fetch content from WordPress.'
          }
        </p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      data-testid={featured ? 'post-list-featured' : 'post-list'}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
