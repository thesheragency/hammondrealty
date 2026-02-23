import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { Layout } from '@/components/layout/Layout';
import { YoastSchema } from '@/components/seo/YoastSchema';
import { fetchPageBySlug, fetchPagePreviewById } from '@/lib/wordpress';
import { isLandingBuilderEnabled } from '@/lib/config/features';
import type { Metadata } from 'next';

import { 
  getPageTemplateInfo, 
  getLandingPageData,
  LandingPageRenderer 
} from '@/modules/landing-builder';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ previewId?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { previewId } = await searchParams;
  const draft = await draftMode();
  
  if (isLandingBuilderEnabled()) {
    const templateInfo = await getPageTemplateInfo(slug);
    if (templateInfo?.isLandingPage && templateInfo.seo) {
      const seo = templateInfo.seo;
      return {
        title: seo.title || templateInfo.title,
        description: seo.metaDesc || '',
        openGraph: {
          title: seo.opengraphTitle || templateInfo.title,
          description: seo.opengraphDescription || '',
          type: 'website',
          images: seo.opengraphImage ? [seo.opengraphImage] : undefined,
        },
        twitter: {
          card: 'summary_large_image',
          title: seo.twitterTitle || templateInfo.title,
          description: seo.twitterDescription || '',
          images: seo.twitterImage ? [seo.twitterImage] : undefined,
        },
      };
    }
  }
  
  let page;
  if (draft.isEnabled && previewId) {
    page = await fetchPagePreviewById(parseInt(previewId));
  }
  if (!page) {
    page = await fetchPageBySlug(slug);
  }
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const seo = page.seoMetadata;
  
  return {
    title: seo?.title || page.title,
    description: seo?.metaDesc || '',
    openGraph: {
      title: seo?.opengraphTitle || page.title,
      description: seo?.opengraphDescription || '',
      type: 'website',
      images: seo?.opengraphImage ? [seo.opengraphImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitterTitle || page.title,
      description: seo?.twitterDescription || '',
      images: seo?.twitterImage ? [seo.twitterImage] : undefined,
    },
  };
}

export default async function WordPressPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { previewId } = await searchParams;
  const draft = await draftMode();
  
  const isPreview = draft.isEnabled;
  
  if (isLandingBuilderEnabled()) {
    const templateInfo = await getPageTemplateInfo(slug);
    
    if (templateInfo?.isLandingPage) {
      console.log('[Page] Rendering as landing page:', slug);
      
      const landingData = await getLandingPageData(templateInfo.databaseId, isPreview);
      
      if (landingData && landingData.sections.length > 0) {
        return (
          <Layout isPreview={isPreview}>
            <YoastSchema path={`/${slug}`} />
            <LandingPageRenderer data={landingData} isPreview={isPreview} />
          </Layout>
        );
      }
      
      console.log('[Page] Landing page has no sections, falling back to regular rendering');
    }
  }
  
  let page;
  
  if (draft.isEnabled && previewId) {
    console.log('[Preview Page] Fetching page by previewId:', previewId);
    page = await fetchPagePreviewById(parseInt(previewId));
  }
  
  if (!page) {
    page = await fetchPageBySlug(slug);
  }

  if (!page) {
    notFound();
  }

  return (
    <Layout isPreview={isPreview}>
      <YoastSchema path={`/${slug}`} />
      <div className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <article>
            <h1 
              className="text-3xl md:text-4xl font-bold mb-8"
              data-testid="text-page-title"
            >
              {page.title}
            </h1>
            
            {page.content && (
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: page.content }}
                data-testid="content-page-body"
              />
            )}
          </article>
        </div>
      </div>
    </Layout>
  );
}
