import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { after } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Layout } from '@/components/layout/Layout';
import { PostContent } from '@/components/posts/PostContent';
import { YoastSchema } from '@/components/seo/YoastSchema';
import { fetchPostBySlug, fetchPostPreviewBySlug, fetchPostPreview, fetchPostPreviewById } from '@/lib/wordpress';
import { buildMetadata } from '@/lib/seo-helpers';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; token?: string; id?: string; previewId?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { previewId } = await searchParams;
  const draft = await draftMode();
  
  let post;
  if (draft.isEnabled) {
    if (previewId) {
      post = await fetchPostPreviewById(parseInt(previewId));
    }
    if (!post) {
      post = await fetchPostPreviewBySlug(slug);
    }
  } else {
    post = await fetchPostBySlug(slug);
  }
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160);

  return buildMetadata({
    seo: post.seoMetadata,
    title: post.title,
    description,
    ogType: 'article',
    featuredImage: post.featuredImage,
  });
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview, token, id, previewId } = await searchParams;
  const draft = await draftMode();
  
  const isPreview = draft.isEnabled || preview === 'true';
  
  let post;
  
  if (draft.isEnabled) {
    if (previewId) {
      console.log('[Preview Page] Fetching by previewId:', previewId);
      post = await fetchPostPreviewById(parseInt(previewId));
    }
    if (!post) {
      console.log('[Preview Page] Fetching by slug:', slug);
      post = await fetchPostPreviewBySlug(slug);
    }
  } else if (preview === 'true' && token && id) {
    post = await fetchPostPreview(parseInt(id), token);
  } else {
    post = await fetchPostBySlug(slug);
  }

  if (!post) {
    after(() => {
      revalidatePath(`/blog/${slug}`);
      console.log(`[Post] Self-healing: purged stale cache for /blog/${slug} (post not found in WordPress)`);
    });
    notFound();
  }

  return (
    <Layout isPreview={isPreview}>
      <Suspense fallback={null}>
        <YoastSchema path={`/blog/${slug}`} />
      </Suspense>
      <div className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <PostContent post={post} />
        </div>
      </div>
    </Layout>
  );
}
