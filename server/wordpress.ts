import { GraphQLClient, gql } from 'graphql-request';
import type { SeoMetadata, AcfFields } from '@shared/schema';

// WordPress GraphQL client configuration
const getWpClient = (authToken?: string) => {
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add Basic Auth if credentials are provided
  if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
    const credentials = Buffer.from(
      `${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  // Override with preview token if provided
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return new GraphQLClient(wpApiUrl, { headers });
};

// GraphQL fragments for reusable queries
const SEO_FRAGMENT = gql`
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
    opengraphType
    opengraphUrl
    opengraphSiteName
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
    }
    twitterCardType
  }
`;

const FEATURED_IMAGE_FRAGMENT = gql`
  fragment FeaturedImageFields on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

// Query for fetching all projects (custom post type)
const GET_PROJECTS_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  query GetProjects($first: Int = 100, $after: String) {
    projects(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        slug
        title
        content
        excerpt
        status
        modified
        featuredImage {
          node {
            ...FeaturedImageFields
          }
        }
        seo {
          ...SeoFields
        }
        projectFields {
          isFeatured
        }
      }
    }
  }
`;

// Query for fetching a single project by slug
const GET_PROJECT_BY_SLUG_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  query GetProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      content
      excerpt
      status
      modified
      featuredImage {
        node {
          ...FeaturedImageFields
        }
      }
      seo {
        ...SeoFields
      }
      projectFields {
        isFeatured
      }
    }
  }
`;

// Query for preview (draft) content
const GET_PROJECT_PREVIEW_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  query GetProjectPreview($id: ID!) {
    project(id: $id, idType: DATABASE_ID, asPreview: true) {
      databaseId
      slug
      title
      content
      excerpt
      status
      modified
      featuredImage {
        node {
          ...FeaturedImageFields
        }
      }
      seo {
        ...SeoFields
      }
      projectFields {
        isFeatured
      }
    }
  }
`;

// Query for pages
const GET_PAGES_QUERY = gql`
  ${SEO_FRAGMENT}
  query GetPages($first: Int = 100) {
    pages(first: $first, where: { status: PUBLISH }) {
      nodes {
        databaseId
        slug
        title
        content
        status
        modified
        seo {
          ...SeoFields
        }
      }
    }
  }
`;

// Query for page preview
const GET_PAGE_PREVIEW_QUERY = gql`
  ${SEO_FRAGMENT}
  query GetPagePreview($id: ID!) {
    page(id: $id, idType: DATABASE_ID, asPreview: true) {
      databaseId
      slug
      title
      content
      status
      modified
      seo {
        ...SeoFields
      }
    }
  }
`;

// Query for Yoast redirects (requires Yoast SEO Premium with WPGraphQL extension)
const GET_REDIRECTS_QUERY = gql`
  query GetRedirects {
    seo {
      redirects {
        origin
        target
        type
        format
      }
    }
  }
`;

// Type definitions for WordPress GraphQL responses
interface WpFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  };
}

interface WpSeo {
  title: string;
  metaDesc: string;
  canonical: string;
  opengraphTitle: string;
  opengraphDescription: string;
  opengraphImage: { sourceUrl: string } | null;
  opengraphType: string;
  opengraphUrl: string;
  opengraphSiteName: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: { sourceUrl: string } | null;
  twitterCardType: string;
}

interface WpProject {
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  modified: string;
  featuredImage: WpFeaturedImage | null;
  seo: WpSeo | null;
  projectFields: {
    isFeatured: boolean;
  } | null;
}

interface WpPage {
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  status: string;
  modified: string;
  seo: WpSeo | null;
}

interface WpRedirect {
  origin: string;
  target: string;
  type: number;
  format: string;
}

// Transform WordPress SEO data to our schema format
const transformSeoData = (seo: WpSeo | null): SeoMetadata | undefined => {
  if (!seo) return undefined;
  
  return {
    title: seo.title,
    metaDesc: seo.metaDesc,
    canonical: seo.canonical,
    opengraphTitle: seo.opengraphTitle,
    opengraphDescription: seo.opengraphDescription,
    opengraphImage: seo.opengraphImage?.sourceUrl,
    opengraphType: seo.opengraphType,
    opengraphUrl: seo.opengraphUrl,
    opengraphSiteName: seo.opengraphSiteName,
    twitterTitle: seo.twitterTitle,
    twitterDescription: seo.twitterDescription,
    twitterImage: seo.twitterImage?.sourceUrl,
    twitterCard: seo.twitterCardType,
  };
};

// Transform WordPress project to our schema format
export const transformProject = (project: WpProject) => {
  const featuredImage = project.featuredImage?.node;
  
  return {
    wpId: project.databaseId,
    slug: project.slug,
    title: project.title,
    content: project.content,
    excerpt: project.excerpt,
    status: project.status.toLowerCase(),
    featuredImage: featuredImage?.sourceUrl || null,
    featuredImageAlt: featuredImage?.altText || null,
    acfFields: featuredImage ? {
      featuredImage: {
        sourceUrl: featuredImage.sourceUrl,
        altText: featuredImage.altText,
        mediaDetails: {
          width: featuredImage.mediaDetails?.width,
          height: featuredImage.mediaDetails?.height,
        },
      },
    } as AcfFields : null,
    seoMetadata: transformSeoData(project.seo),
    isFeatured: project.projectFields?.isFeatured || false,
    wpModified: project.modified ? new Date(project.modified) : null,
  };
};

// Transform WordPress page to our schema format
export const transformPage = (page: WpPage) => {
  return {
    wpId: page.databaseId,
    slug: page.slug,
    title: page.title,
    content: page.content,
    status: page.status.toLowerCase(),
    seoMetadata: transformSeoData(page.seo),
    wpModified: page.modified ? new Date(page.modified) : null,
  };
};

// Fetch all projects from WordPress
export async function fetchProjects(): Promise<ReturnType<typeof transformProject>[]> {
  const client = getWpClient();
  const allProjects: WpProject[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      const response = await client.request<{
        projects: {
          pageInfo: { hasNextPage: boolean; endCursor: string };
          nodes: WpProject[];
        };
      }>(GET_PROJECTS_QUERY, { first: 100, after });

      allProjects.push(...response.projects.nodes);
      hasNextPage = response.projects.pageInfo.hasNextPage;
      after = response.projects.pageInfo.endCursor;
    } catch (error) {
      console.error('Error fetching projects from WordPress:', error);
      throw error;
    }
  }

  return allProjects.map(transformProject);
}

// Fetch a single project by slug
export async function fetchProjectBySlug(slug: string): Promise<ReturnType<typeof transformProject> | null> {
  const client = getWpClient();

  try {
    const response = await client.request<{ project: WpProject | null }>(
      GET_PROJECT_BY_SLUG_QUERY,
      { slug }
    );

    if (!response.project) return null;
    return transformProject(response.project);
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    throw error;
  }
}

// Fetch project preview by ID with auth token
export async function fetchProjectPreview(
  id: number,
  authToken: string
): Promise<ReturnType<typeof transformProject> | null> {
  const client = getWpClient(authToken);

  try {
    const response = await client.request<{ project: WpProject | null }>(
      GET_PROJECT_PREVIEW_QUERY,
      { id: id.toString() }
    );

    if (!response.project) return null;
    return transformProject(response.project);
  } catch (error) {
    console.error('Error fetching project preview:', error);
    throw error;
  }
}

// Fetch all pages from WordPress
export async function fetchPages(): Promise<ReturnType<typeof transformPage>[]> {
  const client = getWpClient();

  try {
    const response = await client.request<{
      pages: { nodes: WpPage[] };
    }>(GET_PAGES_QUERY);

    return response.pages.nodes.map(transformPage);
  } catch (error) {
    console.error('Error fetching pages from WordPress:', error);
    throw error;
  }
}

// Fetch page preview by ID with auth token
export async function fetchPagePreview(
  id: number,
  authToken: string
): Promise<ReturnType<typeof transformPage> | null> {
  const client = getWpClient(authToken);

  try {
    const response = await client.request<{ page: WpPage | null }>(
      GET_PAGE_PREVIEW_QUERY,
      { id: id.toString() }
    );

    if (!response.page) return null;
    return transformPage(response.page);
  } catch (error) {
    console.error('Error fetching page preview:', error);
    throw error;
  }
}

// Fetch Yoast redirects
export async function fetchRedirects(): Promise<WpRedirect[]> {
  const client = getWpClient();

  try {
    const response = await client.request<{
      seo: { redirects: WpRedirect[] };
    }>(GET_REDIRECTS_QUERY);

    return response.seo?.redirects || [];
  } catch (error) {
    // Yoast Premium may not be installed, return empty array
    console.warn('Could not fetch redirects (Yoast Premium may not be installed):', error);
    return [];
  }
}

// Check WordPress connection
export async function checkWordPressConnection(): Promise<boolean> {
  try {
    const client = getWpClient();
    await client.request(gql`
      query HealthCheck {
        generalSettings {
          title
        }
      }
    `);
    return true;
  } catch (error) {
    console.error('WordPress connection check failed:', error);
    return false;
  }
}
