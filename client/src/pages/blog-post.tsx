import { useQuery } from '@tanstack/react-query';
import { useParams, useSearch } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { SeoHead } from '@/components/seo/SeoHead';
import { PostContent } from '@/components/posts/PostContent';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import type { Post } from '@shared/schema';

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  
  const isPreview = searchParams.get('preview') === 'true';
  const previewToken = searchParams.get('token');
  const previewId = searchParams.get('id');

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: isPreview 
      ? [`/api/preview/post/${previewId}?token=${previewToken}`] 
      : ['/api/posts', params.slug],
    enabled: !isPreview || (!!previewId && !!previewToken),
  });

  if (isLoading) {
    return (
      <Layout isPreview={isPreview}>
        <SeoHead title="Loading..." />
        <div className="py-12 md:py-16" data-testid="post-loading">
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

  if (error || !post) {
    return (
      <Layout isPreview={isPreview}>
        <SeoHead title="Post Not Found | WordPress Headless CMS" />
        <div 
          className="py-16 md:py-24"
          data-testid="post-error"
        >
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="bg-destructive/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {error instanceof Error 
                ? error.message 
                : 'The post you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/blog">
              <Button className="gap-2" data-testid="button-back-to-blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isPreview={isPreview}>
      <SeoHead seo={post.seoMetadata} title={post.title} />
      <div className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <PostContent post={post} />
        </div>
      </div>
    </Layout>
  );
}
