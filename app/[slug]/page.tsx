import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { after } from 'next/server';
import { revalidatePath } from 'next/cache';
import { Layout } from '@/components/layout/Layout';
import { YoastSchema } from '@/components/seo/YoastSchema';
import { fetchPageBySlug, fetchPagePreviewById } from '@/lib/wordpress';
import { buildMetadata } from '@/lib/seo-helpers';
import type { Metadata } from 'next';

import { 
  getPageTemplateInfo, 
  getLandingPageData,
  LandingPageRenderer,
  type PageTemplateInfo,
} from '@/modules/landing-builder';

type TemplateRenderFn = (props: {
  templateInfo: PageTemplateInfo;
  isPreview: boolean;
  slug: string;
}) => Promise<React.ReactElement | null>;

/**
 * Template Renderer Registry
 * 
 * Maps renderer identifiers (from PAGE_TEMPLATE_CONFIG in lib/config/post-types.ts)
 * to async render functions. Each function receives the template info, preview state,
 * and slug, and returns a React element or null (to fall through to default rendering).
 * 
 * To add a new template renderer:
 * 1. Register the WordPress template in PAGE_TEMPLATE_CONFIG (lib/config/post-types.ts)
 * 2. Add a renderer function here that fetches the template's data and returns JSX
 * 
 * The renderer function should:
 * - Use templateInfo.databaseId for ACF/data queries (not the slug — slugs change)
 * - Return null to fall through to the default page rendering
 * - Wrap content in <Layout> and include <YoastSchema>
 */
const TEMPLATE_RENDERERS: Record<string, TemplateRenderFn> = {
  'landing-builder': async ({ templateInfo, isPreview, slug }) => {
    const landingData = await getLandingPageData(templateInfo.databaseId, isPreview);
    
    if (!landingData || landingData.sections.length === 0) {
      console.log('[Page] Landing page has no sections, falling back to regular rendering');
      return null;
    }

    return (
      <Layout isPreview={isPreview}>
        <Suspense fallback={null}>
          <YoastSchema path={`/${slug}`} />
        </Suspense>
        <LandingPageRenderer data={landingData} isPreview={isPreview} />
      </Layout>
    );
  },

  // To add a new template renderer, add an entry here:
  //
  // 'services': async ({ templateInfo, isPreview, slug }) => {
  //   const data = await fetchServicesPageData(templateInfo.databaseId, isPreview);
  //   if (!data) return null;
  //   return (
  //     <Layout isPreview={isPreview}>
  //       <YoastSchema path={`/${slug}`} />
  //       <ServicesPageRenderer data={data} />
  //     </Layout>
  //   );
  // },
};


interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ previewId?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { previewId } = await searchParams;
  const draft = await draftMode();
  
  const templateInfo = await getPageTemplateInfo(slug);
  
  if (templateInfo && templateInfo.renderer !== 'default' && templateInfo.seo) {
    return buildMetadata({ seo: templateInfo.seo, title: templateInfo.title });
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

  return buildMetadata({ seo: page.seoMetadata, title: page.title });
}

export default async function WordPressPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { previewId } = await searchParams;
  const draft = await draftMode();
  
  const isPreview = draft.isEnabled;
  
  const templateInfo = await getPageTemplateInfo(slug);
  
  if (templateInfo && templateInfo.renderer !== 'default') {
    const renderFn = TEMPLATE_RENDERERS[templateInfo.renderer];
    
    if (renderFn) {
      console.log(`[Page] Rendering with template "${templateInfo.templateName}" (renderer: ${templateInfo.renderer}):`, slug);
      const result = await renderFn({ templateInfo, isPreview, slug });
      if (result) return result;
    } else {
      console.warn(`[Page] No renderer registered for "${templateInfo.renderer}" — falling back to default`);
    }
  }
  
  let page;
  
  if (draft.isEnabled && previewId) {
    console.log('[Preview Page] Fetching page by previewId:', previewId);
    page = await fetchPagePreviewById(parseInt(previewId));
  }
  
  if (!page) {
    if (templateInfo) {
      page = await fetchPageBySlug(templateInfo.slug);
    } else {
      page = await fetchPageBySlug(slug);
    }
  }

  if (!page) {
    after(() => {
      revalidatePath(`/${slug}`);
      console.log(`[Page] Self-healing: purged stale cache for /${slug} (page not found in WordPress)`);
    });
    notFound();
  }

  return (
    <Layout isPreview={isPreview}>
      <Suspense fallback={null}>
        <YoastSchema path={`/${slug}`} />
      </Suspense>
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
