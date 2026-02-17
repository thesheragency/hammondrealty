/**
 * Landing Page GraphQL Queries
 * 
 * Queries for fetching landing page data with ACF Flexible Content blocks.
 * These queries require WPGraphQL for ACF plugin to be installed.
 */

import { gql, GraphQLClient } from 'graphql-request';
import { isTemplateRenderer } from '@/lib/config/post-types';
import type { LandingBlock, LandingPageData } from '../types';

// GraphQL query for landing page with ACF flexible content
// The field names must match your ACF field group configuration
const GET_LANDING_PAGE_QUERY = gql`
  query GetLandingPage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
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

interface WpLandingPageResponse {
  page: {
    databaseId: number;
    slug: string;
    title: string;
    template: {
      templateName: string;
    } | null;
    seo: {
      title?: string;
      metaDesc?: string;
      opengraphTitle?: string;
      opengraphDescription?: string;
      opengraphImage?: { sourceUrl: string } | null;
    } | null;
    landingSections: LandingBlock[] | null;
  } | null;
}

/**
 * Fetch landing page data by database ID
 */
export async function fetchLandingPage(
  client: GraphQLClient,
  pageId: number
): Promise<LandingPageData | null> {
  try {
    const response = await client.request<WpLandingPageResponse>(
      GET_LANDING_PAGE_QUERY,
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
      seoMetadata: page.seo ? {
        title: page.seo.title,
        metaDesc: page.seo.metaDesc,
        opengraphTitle: page.seo.opengraphTitle,
        opengraphDescription: page.seo.opengraphDescription,
        opengraphImage: page.seo.opengraphImage?.sourceUrl,
      } : undefined,
    };
  } catch (error) {
    console.error('[Landing Builder] Error fetching landing page:', error);
    return null;
  }
}

/**
 * Check if a template name matches the landing page template.
 * Uses the centralized PAGE_TEMPLATE_CONFIG registry in lib/config/post-types.ts
 */
export function isLandingPageTemplate(templateName: string | undefined | null): boolean {
  return isTemplateRenderer(templateName, 'landing-builder');
}
