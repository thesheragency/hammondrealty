import { PostCard } from './PostCard';
import { AlertCircle } from 'lucide-react';
import { storage } from '@/lib/storage';

interface PostListServerProps {
  featured?: boolean;
}

export async function PostListServer({ featured = false }: PostListServerProps) {
  const posts = featured 
    ? await storage.getFeaturedPosts()
    : await storage.getAllPosts();

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
            : 'No posts have been synced yet. Trigger a sync to fetch content from WordPress.'
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
