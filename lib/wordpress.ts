import { GraphQLClient, gql } from 'graphql-request';
import type { SeoMetadata, TaxonomyTerm } from '@/shared/schema';
import { getWpAuthHeaders, getWpAppPasswordHeaders, getNginxBasicAuthHeaders, getWordPressBaseUrl } from '@/lib/wp-auth';

// WordPress session cookie cache for preview authentication
// This avoids re-authenticating on every preview request
interface CachedSession {
  cookies: string;
  expiresAt: number;
}

let wpSessionCache: CachedSession | null = null;

// Mutex to prevent multiple simultaneous login attempts
// When Next.js renders a page, it runs generateMetadata and page component in parallel
// Without this lock, both would try to login simultaneously and one might fail
let loginInProgress: Promise<string | null> | null = null;

// Session cache duration: 30 minutes (WordPress session is typically longer, but we refresh early)
const SESSION_CACHE_DURATION_MS = 30 * 60 * 1000;

/**
 * Authenticates with WordPress via /wp-login.php to get session cookies
 * This is needed for staging sites with dual auth (nginx Basic Auth + WordPress):
 * 1. nginx Basic Auth is passed via Authorization header (WP_AUTH_USER/WP_AUTH_PASSWORD)
 * 2. WordPress auth for draft access uses session cookies from wp-login.php
 * 3. Uses WP_USER/WP_APPLIC_PASS (the WordPress Application Password) for login
 */
async function getWordPressSessionCookies(): Promise<string | null> {
  if (wpSessionCache && wpSessionCache.expiresAt > Date.now()) {
    console.log('[Preview Auth] Using cached session cookies');
    return wpSessionCache.cookies;
  }

  if (loginInProgress) {
    console.log('[Preview Auth] Login already in progress, waiting...');
    return loginInProgress;
  }

  loginInProgress = performWordPressLogin();
  
  try {
    const result = await loginInProgress;
    return result;
  } finally {
    loginInProgress = null;
  }
}

/**
 * Performs the actual WordPress login
 * Uses WP_USER/WP_APPLIC_PASS for WordPress authentication
 * Layers nginx Basic Auth (WP_AUTH_USER/WP_AUTH_PASSWORD) on top if staging site
 */
async function performWordPressLogin(): Promise<string | null> {
  if (wpSessionCache && wpSessionCache.expiresAt > Date.now()) {
    console.log('[Preview Auth] Using cached session cookies (after lock)');
    return wpSessionCache.cookies;
  }

  const wpApiUrl = process.env.WP_API_URL;
  const wpUser = process.env.WP_USER;
  const wpPass = process.env.WP_APPLIC_PASS;
  
  if (!wpApiUrl || !wpUser || !wpPass) {
    console.warn('[Preview Auth] Missing required credentials: WP_API_URL, WP_USER, or WP_APPLIC_PASS');
    return null;
  }

  const wpBaseUrl = getWordPressBaseUrl();
  const loginUrl = `${wpBaseUrl}/wp-login.php`;

  console.log('[Preview Auth] Authenticating with WordPress via /wp-login.php');

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...getNginxBasicAuthHeaders(),
    };

    const formData = new URLSearchParams({
      log: wpUser,
      pwd: wpPass,
      'wp-submit': 'Log In',
      redirect_to: `${wpBaseUrl}/wp-admin/`,
      testcookie: '1',
    });

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers,
      body: formData.toString(),
      redirect: 'manual',
    });

    const setCookieHeaders = response.headers.getSetCookie?.() || [];
    
    if (setCookieHeaders.length === 0) {
      const rawCookies = response.headers.get('set-cookie');
      if (rawCookies) {
        setCookieHeaders.push(...rawCookies.split(/,(?=\s*\w+=)/));
      }
    }

    const authCookies = setCookieHeaders
      .filter(cookie => 
        (cookie.includes('wordpress_logged_in_') || 
         cookie.includes('wordpress_sec_')) &&
        !cookie.includes('wordpress_test_cookie')
      )
      .map(cookie => cookie.split(';')[0])
      .filter(cookie => cookie.length > 0);

    if (authCookies.length === 0) {
      console.error('[Preview Auth] Login failed - no auth cookies received. Check WP_USER and WP_APPLIC_PASS credentials.');
      console.log('[Preview Auth] Response status:', response.status);
      console.log('[Preview Auth] Received cookies:', setCookieHeaders.map(c => c.split('=')[0]).join(', '));
      return null;
    }

    const wpCookies = authCookies.join('; ');

    console.log('[Preview Auth] Successfully authenticated, got session cookies');
    
    wpSessionCache = {
      cookies: wpCookies,
      expiresAt: Date.now() + SESSION_CACHE_DURATION_MS,
    };

    return wpCookies;
  } catch (error) {
    console.error('[Preview Auth] Error authenticating with WordPress:', error);
    return null;
  }
}

/**
 * Clears the WordPress session cookie cache
 * Call this if you need to force re-authentication
 */
export function clearWordPressSessionCache(): void {
  wpSessionCache = null;
  console.log('[Preview Auth] Session cache cleared');
}

// WordPress GraphQL client configuration
// Auth priority: Bearer token (preview) > Application Password (WP_USER/WP_APPLIC_PASS) > nginx Basic Auth
export const getWpClient = (authToken?: string) => {
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  } else {
    Object.assign(headers, getWpAuthHeaders());
  }

  return new GraphQLClient(wpApiUrl, {
    headers,
    fetch: (url: RequestInfo | URL, init?: RequestInit) =>
      fetch(url, {
        ...init,
        next: { revalidate: 1800, tags: ['wp-content'] },
      } as RequestInit),
  });
};

// WordPress GraphQL client for preview/draft requests
// For staging sites with dual auth: nginx Basic Auth header + WordPress session cookies
// For production sites: Application Password via Authorization header is sufficient
async function getPreviewClient(): Promise<GraphQLClient> {
  const wpApiUrl = process.env.WP_API_URL;
  
  if (!wpApiUrl) {
    throw new Error('WP_API_URL environment variable is not set');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const nginxHeaders = getNginxBasicAuthHeaders();
  if (nginxHeaders.Authorization) {
    Object.assign(headers, nginxHeaders);
    const sessionCookies = await getWordPressSessionCookies();
    if (sessionCookies) {
      headers['Cookie'] = sessionCookies;
      console.log('[Preview] Using nginx Basic Auth + session cookie authentication');
    } else {
      console.warn('[Preview] No session cookies available - draft content may not be accessible on staging');
    }
  } else {
    Object.assign(headers, getWpAppPasswordHeaders());
    console.log('[Preview] Using Application Password authentication');
  }

  return new GraphQLClient(wpApiUrl, { headers });
}

// GraphQL fragments for reusable queries
// Note: twitterCardType may not be available in all versions of WPGraphQL Yoast SEO
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

const TAXONOMY_FRAGMENT = gql`
  fragment TaxonomyFields on TermNode {
    databaseId
    name
    slug
    description
    count
  }
`;

// Query for fetching all posts (WordPress default post type)
const GET_POSTS_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  ${TAXONOMY_FRAGMENT}
  query GetPosts($first: Int = 100, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
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
        date
        modified
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            ...FeaturedImageFields
          }
        }
        categories {
          nodes {
            ...TaxonomyFields
          }
        }
        tags {
          nodes {
            ...TaxonomyFields
          }
        }
        seo {
          ...SeoFields
        }
      }
    }
  }
`;

// Query for fetching a single post by slug
const GET_POST_BY_SLUG_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  ${TAXONOMY_FRAGMENT}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      content
      excerpt
      status
      date
      modified
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          ...FeaturedImageFields
        }
      }
      categories {
        nodes {
          ...TaxonomyFields
        }
      }
      tags {
        nodes {
          ...TaxonomyFields
        }
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

// Query for preview (draft) content by DATABASE_ID
const GET_POST_PREVIEW_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  ${TAXONOMY_FRAGMENT}
  query GetPostPreview($id: ID!) {
    post(id: $id, idType: DATABASE_ID, asPreview: true) {
      databaseId
      slug
      title
      content
      excerpt
      status
      date
      modified
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          ...FeaturedImageFields
        }
      }
      categories {
        nodes {
          ...TaxonomyFields
        }
      }
      tags {
        nodes {
          ...TaxonomyFields
        }
      }
      seo {
        ...SeoFields
      }
    }
  }
`;

// Query for preview (draft) content by SLUG - used when Draft Mode is enabled
const GET_POST_PREVIEW_BY_SLUG_QUERY = gql`
  ${SEO_FRAGMENT}
  ${FEATURED_IMAGE_FRAGMENT}
  ${TAXONOMY_FRAGMENT}
  query GetPostPreviewBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG, asPreview: true) {
      databaseId
      slug
      title
      content
      excerpt
      status
      date
      modified
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          ...FeaturedImageFields
        }
      }
      categories {
        nodes {
          ...TaxonomyFields
        }
      }
      tags {
        nodes {
          ...TaxonomyFields
        }
      }
      seo {
        ...SeoFields
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

const GET_PAGE_BY_SLUG_QUERY = gql`
  ${SEO_FRAGMENT}
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
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

// Query for ACF Global Scripts (requires WPGraphQL for ACF plugin)
// These fields should be registered in ACF Options page with field names:
// - global_head_scripts
// - global_body_scripts
// Note: The query field name is based on your ACF Options Page name.
// WPGraphQL converts the page title to a GraphQL field name, preserving consecutive
// uppercase characters as an acronym (e.g., "SHER Options" -> "sHEROptions").
// Update this query if your Options Page has a different name.
const GET_ACF_OPTIONS_QUERY = gql`
  query GetAcfOptions {
    sHEROptions {
      globalScripts {
        globalHeadScripts
        globalBodyScripts
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
}

interface WpTaxonomyTerm {
  databaseId: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface WpPost {
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  date: string;
  modified: string;
  author: {
    node: {
      name: string;
    };
  } | null;
  featuredImage: WpFeaturedImage | null;
  categories: {
    nodes: WpTaxonomyTerm[];
  } | null;
  tags: {
    nodes: WpTaxonomyTerm[];
  } | null;
  seo: WpSeo | null;
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

interface WpAcfOptions {
  sHEROptions: {
    globalScripts: {
      globalHeadScripts: string | null;
      globalBodyScripts: string | null;
    } | null;
  } | null;
}

export interface GlobalScripts {
  headScripts: string | null;
  bodyScripts: string | null;
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
  };
};

// Transform taxonomy terms to our schema format
const transformTaxonomyTerms = (terms: WpTaxonomyTerm[] | undefined): TaxonomyTerm[] | null => {
  if (!terms || terms.length === 0) return null;
  
  return terms.map(term => ({
    id: term.databaseId,
    name: term.name,
    slug: term.slug,
    description: term.description,
    count: term.count,
  }));
};

// Transform WordPress post to our schema format
export const transformPost = (post: WpPost) => {
  const featuredImage = post.featuredImage?.node;
  
  return {
    wpId: post.databaseId,
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    status: post.status.toLowerCase(),
    author: post.author?.node?.name || null,
    publishedAt: post.date ? new Date(post.date) : null,
    featuredImage: featuredImage?.sourceUrl || null,
    featuredImageAlt: featuredImage?.altText || null,
    categories: transformTaxonomyTerms(post.categories?.nodes),
    tags: transformTaxonomyTerms(post.tags?.nodes),
    seoMetadata: transformSeoData(post.seo),
    isFeatured: false, // Can be determined by category or tag
    wpModified: post.modified ? new Date(post.modified) : null,
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

interface PostsResponse {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    nodes: WpPost[];
  };
}

// Fetch all posts from WordPress
export async function fetchPosts(): Promise<ReturnType<typeof transformPost>[]> {
  const client = getWpClient();
  const allPosts: WpPost[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      const response: PostsResponse = await client.request(GET_POSTS_QUERY, { first: 100, after });

      allPosts.push(...response.posts.nodes);
      hasNextPage = response.posts.pageInfo.hasNextPage;
      after = response.posts.pageInfo.endCursor;
    } catch (error) {
      console.error('Error fetching posts from WordPress:', error);
      throw error;
    }
  }

  return allPosts.map(transformPost);
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<ReturnType<typeof transformPost> | null> {
  const client = getWpClient();

  try {
    const response = await client.request<{ post: WpPost | null }>(
      GET_POST_BY_SLUG_QUERY,
      { slug }
    );

    if (!response.post) return null;
    return transformPost(response.post);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
}

// Fetch post preview by ID with auth token
export async function fetchPostPreview(
  id: number,
  authToken: string
): Promise<ReturnType<typeof transformPost> | null> {
  const client = getWpClient(authToken);

  try {
    const response = await client.request<{ post: WpPost | null }>(
      GET_POST_PREVIEW_QUERY,
      { id: id.toString() }
    );

    if (!response.post) return null;
    return transformPost(response.post);
  } catch (error) {
    console.error('Error fetching post preview:', error);
    throw error;
  }
}

// Fetch post preview by slug using cookie-based auth (for Draft Mode)
// This fetches draft/revision content directly from WordPress
// Uses staging Basic Auth + WordPress session cookies to work with nginx-protected sites
export async function fetchPostPreviewBySlug(
  slug: string
): Promise<ReturnType<typeof transformPost> | null> {
  console.log('[Preview] Fetching post preview by slug:', slug);
  console.log('[Preview] Using credentials:', process.env.WP_USER ? 'WP_USER set' : 'WP_USER not set');

  try {
    // Get preview client with session cookies (async because it may need to authenticate)
    const client = await getPreviewClient();
    
    const response = await client.request<{ post: WpPost | null }>(
      GET_POST_PREVIEW_BY_SLUG_QUERY,
      { slug }
    );

    console.log('[Preview] Response:', response.post ? 'Post found' : 'Post NOT found');
    
    if (!response.post) return null;
    return transformPost(response.post);
  } catch (error) {
    console.error('[Preview] Error fetching post preview by slug:', error);
    throw error;
  }
}

// Fetch post preview by DATABASE_ID using cookie-based auth (for Draft Mode)
// This is more reliable than slug for draft posts which may not have a proper slug yet
export async function fetchPostPreviewById(
  id: number
): Promise<ReturnType<typeof transformPost> | null> {
  console.log('[Preview] Fetching post preview by ID:', id);

  try {
    // Get preview client with session cookies (async because it may need to authenticate)
    const client = await getPreviewClient();
    
    const response = await client.request<{ post: WpPost | null }>(
      GET_POST_PREVIEW_QUERY,
      { id: id.toString() }
    );

    console.log('[Preview] Response by ID:', response.post ? 'Post found' : 'Post NOT found');
    
    if (!response.post) return null;
    return transformPost(response.post);
  } catch (error) {
    console.error('[Preview] Error fetching post preview by ID:', error);
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

export async function fetchPageBySlug(slug: string): Promise<ReturnType<typeof transformPage> | null> {
  const client = getWpClient();

  try {
    const response = await client.request<{ page: WpPage | null }>(
      GET_PAGE_BY_SLUG_QUERY,
      { slug }
    );

    if (!response.page) return null;
    return transformPage(response.page);
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    throw error;
  }
}

// Fetch page preview by ID with auth token (legacy)
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

// Fetch page preview by DATABASE_ID using cookie-based auth (for Draft Mode)
// This is more reliable than slug for draft pages which may not have a proper slug yet
export async function fetchPagePreviewById(
  id: number
): Promise<ReturnType<typeof transformPage> | null> {
  console.log('[Preview] Fetching page preview by ID:', id);

  try {
    // Get preview client with session cookies (async because it may need to authenticate)
    const client = await getPreviewClient();
    
    const response = await client.request<{ page: WpPage | null }>(
      GET_PAGE_PREVIEW_QUERY,
      { id: id.toString() }
    );

    console.log('[Preview] Page response by ID:', response.page ? 'Page found' : 'Page NOT found');
    
    if (!response.page) return null;
    return transformPage(response.page);
  } catch (error) {
    console.error('[Preview] Error fetching page preview by ID:', error);
    throw error;
  }
}

// Fetch redirects from Redirection plugin (by John Godley)
// Uses custom mu-plugin endpoint for headless access (built-in REST API requires session auth)
export async function fetchRedirects(): Promise<WpRedirect[]> {
  const wpApiUrl = process.env.WP_API_URL;
  if (!wpApiUrl) {
    console.warn('WP_API_URL not set, cannot fetch redirects');
    return [];
  }

  // Get WordPress base URL (without /graphql)
  const wpBaseUrl = wpApiUrl.replace(/\/graphql\/?$/, '');
  const redirectsEndpoint = `${wpBaseUrl}/wp-json/headless/v1/redirects`;

  try {
    const nginxAuth = getNginxBasicAuthHeaders();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...nginxAuth,
    };

    const response = await fetch(redirectsEndpoint, { headers });
    
    if (!response.ok) {
      console.warn(`Redirects API returned ${response.status} - mu-plugin may not be installed (see wordpress-plugins/headless-redirects-api.php)`);
      return [];
    }

    const data = await response.json();
    
    // Redirection plugin returns { items: [...] } with each item having:
    // url: source URL, action_data: { url: target }, action_code: redirect type (301, 302, etc.)
    const items = data.items || [];
    
    return items
      .filter((r: { enabled: boolean }) => r.enabled)
      .map((r: { url: string; action_data: { url?: string }; action_code: number }) => ({
        origin: r.url.startsWith('/') ? r.url : `/${r.url}`,
        target: r.action_data?.url || '/',
        type: r.action_code || 301,
        format: 'plain',
      }));
  } catch (error) {
    console.warn('Could not fetch redirects from Redirection plugin:', error);
    return [];
  }
}

// Fetch ACF Global Scripts from Options page
export async function fetchAcfGlobalScripts(): Promise<GlobalScripts> {
  const client = getWpClient();

  try {
    const response = await client.request<WpAcfOptions>(GET_ACF_OPTIONS_QUERY);

    const globalScripts = response.sHEROptions?.globalScripts;
    
    return {
      headScripts: globalScripts?.globalHeadScripts || null,
      bodyScripts: globalScripts?.globalBodyScripts || null,
    };
  } catch (error) {
    // ACF Options may not be configured, return empty
    console.warn('Could not fetch ACF global scripts (ACF Options may not be configured):', error);
    return {
      headScripts: null,
      bodyScripts: null,
    };
  }
}

export interface YoastGlobalDefaults {
  defaultImage?: string;
  siteName?: string;
}

const GET_YOAST_GLOBAL_DEFAULTS = gql`
  query GetYoastGlobalDefaults {
    seo {
      openGraph {
        defaultImage {
          sourceUrl
        }
      }
      schema {
        siteName
      }
    }
  }
`;

interface WpYoastGlobalResponse {
  seo: {
    openGraph?: {
      defaultImage?: {
        sourceUrl?: string;
      } | null;
    } | null;
    schema?: {
      siteName?: string;
    } | null;
  } | null;
}

let yoastGlobalCache: { data: YoastGlobalDefaults; fetchedAt: number } | null = null;
const YOAST_GLOBAL_CACHE_TTL = 3600 * 1000;

export async function fetchYoastGlobalDefaults(): Promise<YoastGlobalDefaults> {
  if (yoastGlobalCache && Date.now() - yoastGlobalCache.fetchedAt < YOAST_GLOBAL_CACHE_TTL) {
    return yoastGlobalCache.data;
  }

  try {
    const client = getWpClient();
    const response = await client.request<WpYoastGlobalResponse>(GET_YOAST_GLOBAL_DEFAULTS);

    const data: YoastGlobalDefaults = {
      defaultImage: response.seo?.openGraph?.defaultImage?.sourceUrl || undefined,
      siteName: response.seo?.schema?.siteName || undefined,
    };

    yoastGlobalCache = { data, fetchedAt: Date.now() };
    return data;
  } catch (error) {
    console.warn('[Yoast Global] Could not fetch global SEO defaults:', error instanceof Error ? error.message : error);
    return {};
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
