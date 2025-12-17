import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Layout } from '@/components/layout/Layout';
import { PostContent } from '@/components/posts/PostContent';
import { storage } from '@/lib/storage';
import { fetchPostPreviewBySlug, fetchPostPreview, fetchPostPreviewById } from '@/lib/wordpress';
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
    // Try fetching by ID first (more reliable for drafts), then fall back to slug
    if (previewId) {
      post = await fetchPostPreviewById(parseInt(previewId));
    }
    if (!post) {
      post = await fetchPostPreviewBySlug(slug);
    }
  } else {
    post = await storage.getPostBySlug(slug);
  }
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const seo = post.seoMetadata;
  
  return {
    title: seo?.title || post.title,
    description: seo?.metaDesc || post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      title: seo?.opengraphTitle || post.title,
      description: seo?.opengraphDescription || post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      type: 'article',
      images: seo?.opengraphImage ? [seo.opengraphImage] : post.featuredImage ? [post.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitterTitle || post.title,
      description: seo?.twitterDescription || post.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      images: seo?.twitterImage ? [seo.twitterImage] : post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function BlogPost({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview, token, id, previewId } = await searchParams;
  const draft = await draftMode();
  
  const isPreview = draft.isEnabled || preview === 'true';
  
  let post;
  
  if (draft.isEnabled) {
    // For Draft Mode: Try fetching by ID first (more reliable for drafts), then fall back to slug
    if (previewId) {
      console.log('[Preview Page] Fetching by previewId:', previewId);
      post = await fetchPostPreviewById(parseInt(previewId));
    }
    if (!post) {
      console.log('[Preview Page] Fetching by slug:', slug);
      post = await fetchPostPreviewBySlug(slug);
    }
  } else if (preview === 'true' && token && id) {
    // Legacy preview mode with token
    post = await fetchPostPreview(parseInt(id), token);
  } else {
    // Normal published content
    post = await storage.getPostBySlug(slug);
  }

  if (!post) {
    notFound();
  }

  return (
    <Layout isPreview={isPreview}>
      <div className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <PostContent post={post} />
        </div>
      </div>
    </Layout>
  );
}
