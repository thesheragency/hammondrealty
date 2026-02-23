import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Post } from '@/shared/schema';

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="max-w-4xl mx-auto" data-testid="post-content">
      <nav className="mb-8" data-testid="breadcrumb">
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </nav>

      {post.featuredImage && (
        <div className="aspect-video rounded-lg overflow-hidden mb-8 bg-muted">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            data-testid="img-post-hero"
          />
        </div>
      )}

      <header className="mb-8">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4" data-testid="post-categories">
            {post.categories.map((category) => (
              <Badge key={category.id} variant="secondary" data-testid={`badge-category-${category.slug}`}>
                {category.name}
              </Badge>
            ))}
          </div>
        )}
        
        <h1 
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          data-testid="text-post-title"
        >
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p 
            className="text-xl text-muted-foreground mb-6"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
            data-testid="text-post-excerpt"
          />
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
          {formattedDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt?.toString()} data-testid="text-post-date">
                {formattedDate}
              </time>
            </div>
          )}
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span data-testid="text-post-author">{post.author}</span>
            </div>
          )}
        </div>
      </header>

      {post.content && (
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-testid="text-post-content"
        />
      )}

      {post.tags && post.tags.length > 0 && (
        <footer className="mt-12 pt-6 border-t">
          <div className="flex flex-wrap items-center gap-2" data-testid="post-tags">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline" data-testid={`badge-tag-${tag.slug}`}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
}
