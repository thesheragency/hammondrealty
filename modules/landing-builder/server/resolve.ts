/**
 * Landing Page Resolver
 * 
 * Server-side utilities for determining if a page should use the landing builder
 * and fetching landing page data. Reuses existing WordPress client infrastructure
 * to ensure proper authentication and caching behavior.
 */

import { gql } from 'graphql-request';
import { getTemplateRenderer } from '@/lib/config/post-types';
import { getWpAuthHeaders } from '@/lib/wp-auth';
import type { LandingBlock, LandingPageData } from '../types';


// Query to check if a page uses the landing page template
const GET_PAGE_TEMPLATE_QUERY = gql`
  query GetPageTemplate($slug: ID!) {
    page(id: $slug, idType: URI) {
      databaseId
      slug
      title
      template {
        templateName
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
    }
  }
`;

// Query for landing page with ACF flexible content by database ID
const GET_LANDING_PAGE_SECTIONS_QUERY = gql`
  query GetLandingPageSections($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      databaseId
      slug
      title
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
      landingSections {
        ... on LandingSectionsHeroSection {
          fieldGroupName
          headline
          subheadline
          ctaText
          ctaUrl
          backgroundColor
          textAlign
          backgroundImage {
            sourceUrl
            altText
          }
        }
        ... on LandingSectionsFeatureGrid {
          fieldGroupName
          sectionTitle
          sectionDescription
          columns
          backgroundColor
          features {
            icon
            title
            description
          }
        }
        ... on LandingSectionsCtaBanner {
          fieldGroupName
          headline
          description
          primaryCtaText
          primaryCtaUrl
          secondaryCtaText
          secondaryCtaUrl
          backgroundColor
        }
        ... on LandingSectionsFormSection {
          fieldGroupName
          sectionTitle
          sectionDescription
          formMode
          gravityFormId
          iframeUrl
          iframeHeight
          backgroundColor
        }
        ... on LandingSectionsRichText {
          fieldGroupName
          content
          maxWidth
          backgroundColor
        }
        ... on LandingSectionsTestimonials {
          fieldGroupName
          sectionTitle
          layout
          backgroundColor
          testimonials {
            quote
            authorName
            authorTitle
            authorImage {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

// Preview query for draft landing pages
const GET_LANDING_PAGE_PREVIEW_QUERY = gql`
  query GetLandingPagePreview($id: ID!) {
    page(id: $id, idType: DATABASE_ID, asPreview: true) {
      databaseId
      slug
      title
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
      landingSections {
        ... on LandingSectionsHeroSection {
          fieldGroupName
          headline
          subheadline
          ctaText
          ctaUrl
          backgroundColor
          textAlign
          backgroundImage {
            sourceUrl
            altText
          }
        }
        ... on LandingSectionsFeatureGrid {
          fieldGroupName
          sectionTitle
          sectionDescription
          columns
          backgroundColor
          features {
            icon
            title
            description
          }
        }
        ... on LandingSectionsCtaBanner {
          fieldGroupName
          headline
          description
          primaryCtaText
          primaryCtaUrl
          secondaryCtaText
          secondaryCtaUrl
          backgroundColor
        }
        ... on LandingSectionsFormSection {
          fieldGroupName
          sectionTitle
          sectionDescription
          formMode
          gravityFormId
          iframeUrl
          iframeHeight
          backgroundColor
        }
        ... on LandingSectionsRichText {
          fieldGroupName
          content
          maxWidth
          backgroundColor
        }
        ... on LandingSectionsTestimonials {
          fieldGroupName
          sectionTitle
          layout
          backgroundColor
          testimonials {
            quote
            authorName
            authorTitle
            authorImage {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

interface WpSeo {
  title?: string;
  metaDesc?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: { sourceUrl: string } | null;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: { sourceUrl: string } | null;
}

interface WpPageTemplateResponse {
  page: {
    databaseId: number;
    slug: string;
    title: string;
    template: {
      templateName: string;
    } | null;
    seo: WpSeo | null;
  } | null;
}

interface WpLandingSectionsResponse {
  page: {
    databaseId: number;
    slug: string;
    title: string;
    seo: WpSeo | null;
    landingSections: LandingBlock[] | null;
  } | null;
}

/**
 * Get WordPress GraphQL client with proper auth
 * Uses centralized auth: Application Password (WP_USER/WP_APPLIC_PASS) preferred,
 * falls back to nginx Basic Auth (WP_AUTH_USER/WP_AUTH_PASSWORD) for staging sites
 */
async function getWpClient() {
  const { GraphQLClient } = await import('graphql-request');
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getWpAuthHeaders(),
  };

  return new GraphQLClient(wpApiUrl, { headers });
}

/**
 * Get WordPress GraphQL client for preview/draft requests
 * Uses same auth as standard client — preview routing is handled by /api/preview
 */
async function getPreviewWpClient() {
  return getWpClient();
}

/**
 * Transform SEO data to consistent format
 */
function transformSeoData(seo: WpSeo | null | undefined) {
  if (!seo) return undefined;
  return {
    title: seo.title,
    metaDesc: seo.metaDesc,
    opengraphTitle: seo.opengraphTitle,
    opengraphDescription: seo.opengraphDescription,
    opengraphImage: seo.opengraphImage?.sourceUrl,
    twitterTitle: seo.twitterTitle,
    twitterDescription: seo.twitterDescription,
    twitterImage: seo.twitterImage?.sourceUrl,
  };
}

export interface PageTemplateInfo {
  databaseId: number;
  slug: string;
  title: string;
  renderer: string;
  isLandingPage: boolean;
  templateName: string | null;
  seo?: {
    title?: string;
    metaDesc?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
}

/**
 * Fetch page template information from WordPress.
 * Always performs the template lookup regardless of feature flags —
 * the registry in lib/config/post-types.ts handles feature flag checks.
 * Returns null if page doesn't exist in WordPress.
 */
export async function getPageTemplateInfo(slug: string): Promise<PageTemplateInfo | null> {
  try {
    const client = await getWpClient();
    const response = await client.request<WpPageTemplateResponse>(
      GET_PAGE_TEMPLATE_QUERY,
      { slug }
    );

    if (!response.page) {
      return null;
    }

    const { page } = response;
    const templateName = page.template?.templateName || null;
    const renderer = getTemplateRenderer(templateName);

    return {
      databaseId: page.databaseId,
      slug: page.slug,
      title: page.title,
      renderer,
      isLandingPage: renderer === 'landing-builder',
      templateName,
      seo: transformSeoData(page.seo),
    };
  } catch (error) {
    console.error('[Template] Error fetching page template info:', error);
    return null;
  }
}

/**
 * Fetch landing page data with ACF sections
 */
export async function getLandingPageData(
  pageId: number,
  isPreview: boolean = false
): Promise<LandingPageData | null> {
  try {
    const client = isPreview ? await getPreviewWpClient() : await getWpClient();
    const query = isPreview ? GET_LANDING_PAGE_PREVIEW_QUERY : GET_LANDING_PAGE_SECTIONS_QUERY;
    
    const response = await client.request<WpLandingSectionsResponse>(
      query,
      { id: pageId.toString() }
    );

    if (!response.page) {
      return null;
    }

    const { page } = response;

    return {
      title: page.title,
      slug: page.slug,
      sections: page.landingSections || [],
      seoMetadata: transformSeoData(page.seo),
    };
  } catch (error) {
    console.error('[Landing Builder] Error fetching landing page sections:', error);
    return null;
  }
}
