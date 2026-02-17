/**
 * Landing Page Resolver
 * 
 * Server-side utilities for determining if a page should use the landing builder
 * and fetching landing page data. Reuses existing WordPress client infrastructure
 * to ensure proper authentication and caching behavior.
 */

import { gql } from 'graphql-request';
import { isLandingBuilderEnabled } from '@/lib/config/features';
import { isTemplateRenderer } from '@/lib/config/post-types';
import type { LandingBlock, LandingPageData } from '../types';

// Import existing WordPress client infrastructure for proper auth handling
// These are internal functions we need to access - we'll add exports to wordpress.ts
// For now, we replicate the client creation logic to avoid modifying core files

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
 * Get WordPress GraphQL client with proper Basic Auth for staging sites
 * Replicates logic from lib/wordpress.ts to avoid circular imports
 */
async function getWpClient() {
  const { GraphQLClient } = await import('graphql-request');
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add Basic Auth if credentials are provided (for staging gate)
  if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
    const credentials = Buffer.from(
      `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  return new GraphQLClient(wpApiUrl, { headers });
}

/**
 * Get WordPress GraphQL client for preview/draft requests
 * Uses session cookies for WordPress authentication in addition to Basic Auth for staging gate
 */
async function getPreviewWpClient() {
  const { GraphQLClient } = await import('graphql-request');
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add Basic Auth if credentials are provided (for staging gate)
  if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
    const credentials = Buffer.from(
      `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  // Note: For preview/draft content on staging sites with dual auth (nginx + WordPress),
  // the preview flow goes through the existing /api/preview route which handles authentication.
  // By the time we get here, we're fetching via the authenticated GraphQL endpoint.
  // Basic Auth alone should work for published landing pages on staging sites.

  return new GraphQLClient(wpApiUrl, { headers });
}

/**
 * Check if a template name matches the landing page template
 * Uses the centralized PAGE_TEMPLATE_CONFIG registry in lib/config/post-types.ts
 */
function matchesLandingTemplate(templateName: string | null | undefined): boolean {
  return isTemplateRenderer(templateName, 'landing-builder');
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
 * Fetch page template information from WordPress
 * Returns null if page doesn't exist
 */
export async function getPageTemplateInfo(slug: string): Promise<PageTemplateInfo | null> {
  // If landing builder is disabled, skip template check
  if (!isLandingBuilderEnabled()) {
    return null;
  }

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

    return {
      databaseId: page.databaseId,
      slug: page.slug,
      title: page.title,
      isLandingPage: matchesLandingTemplate(templateName),
      templateName,
      seo: transformSeoData(page.seo),
    };
  } catch (error) {
    console.error('[Landing Builder] Error fetching page template info:', error);
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
