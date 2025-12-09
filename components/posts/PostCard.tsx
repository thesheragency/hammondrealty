import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import type { Post } from '@/shared/schema';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Link href={`/blog/${post.slug}`} data-testid={`card-post-${post.slug}`}>
      <Card className="h-full overflow-hidden hover-elevate active-elevate-2 transition-all duration-200 cursor-pointer group">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              data-testid={`img-post-${post.slug}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
          {post.categories && post.categories.length > 0 && (
            <Badge 
              className="absolute top-3 left-3"
              data-testid={`badge-category-${post.slug}`}
            >
              {post.categories[0].name}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-2">
          <h3 
            className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors"
            data-testid={`text-title-${post.slug}`}
          >
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="space-y-3">
          {post.excerpt && (
            <p 
              className="text-sm text-muted-foreground line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
              data-testid={`text-excerpt-${post.slug}`}
            />
          )}
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span data-testid={`text-date-${post.slug}`}>{formattedDate}</span>
              </div>
            )}
            {post.author && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span data-testid={`text-author-${post.slug}`}>{post.author}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
