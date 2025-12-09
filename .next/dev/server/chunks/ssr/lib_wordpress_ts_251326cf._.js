module.exports = [
"[project]/lib/wordpress.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkWordPressConnection",
    ()=>checkWordPressConnection,
    "fetchAcfGlobalScripts",
    ()=>fetchAcfGlobalScripts,
    "fetchPagePreview",
    ()=>fetchPagePreview,
    "fetchPages",
    ()=>fetchPages,
    "fetchPostBySlug",
    ()=>fetchPostBySlug,
    "fetchPostPreview",
    ()=>fetchPostPreview,
    "fetchPosts",
    ()=>fetchPosts,
    "fetchRedirects",
    ()=>fetchRedirects,
    "transformPage",
    ()=>transformPage,
    "transformPost",
    ()=>transformPost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$entrypoints$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/entrypoints/main.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$classes$2f$GraphQLClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/legacy/classes/GraphQLClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/legacy/functions/gql.js [app-rsc] (ecmascript)");
;
// WordPress GraphQL client configuration
const getWpClient = (authToken)=>{
    const wpApiUrl = process.env.WP_API_URL;
    if (!wpApiUrl) {
        throw new Error('WP_API_URL environment variable is not set');
    }
    const headers = {
        'Content-Type': 'application/json'
    };
    // Add Basic Auth if credentials are provided
    if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
        const credentials = Buffer.from(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`).toString('base64');
        headers['Authorization'] = `Basic ${credentials}`;
    }
    // Override with preview token if provided
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$classes$2f$GraphQLClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GraphQLClient"](wpApiUrl, {
        headers
    });
};
// GraphQL fragments for reusable queries
// Note: twitterCardType may not be available in all versions of WPGraphQL Yoast SEO
const SEO_FRAGMENT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
const FEATURED_IMAGE_FRAGMENT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
  fragment FeaturedImageFields on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;
const TAXONOMY_FRAGMENT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
  fragment TaxonomyFields on TermNode {
    databaseId
    name
    slug
    description
    count
  }
`;
// Query for fetching all posts (WordPress default post type)
const GET_POSTS_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
const GET_POST_BY_SLUG_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
// Query for preview (draft) content
const GET_POST_PREVIEW_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
// Query for pages
const GET_PAGES_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
const GET_PAGE_PREVIEW_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
const GET_REDIRECTS_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
// Note: The query field name is based on your ACF Options Page name (e.g., "SherOptions" -> "sherOptions")
// Update this query if your Options Page has a different name
const GET_ACF_OPTIONS_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
  query GetAcfOptions {
    sherOptions {
      globalScripts {
        globalHeadScripts
        globalBodyScripts
      }
    }
  }
`;
// Transform WordPress SEO data to our schema format
const transformSeoData = (seo)=>{
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
        twitterImage: seo.twitterImage?.sourceUrl
    };
};
// Transform taxonomy terms to our schema format
const transformTaxonomyTerms = (terms)=>{
    if (!terms || terms.length === 0) return null;
    return terms.map((term)=>({
            id: term.databaseId,
            name: term.name,
            slug: term.slug,
            description: term.description,
            count: term.count
        }));
};
const transformPost = (post)=>{
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
        isFeatured: false,
        wpModified: post.modified ? new Date(post.modified) : null
    };
};
const transformPage = (page)=>{
    return {
        wpId: page.databaseId,
        slug: page.slug,
        title: page.title,
        content: page.content,
        status: page.status.toLowerCase(),
        seoMetadata: transformSeoData(page.seo),
        wpModified: page.modified ? new Date(page.modified) : null
    };
};
async function fetchPosts() {
    const client = getWpClient();
    const allPosts = [];
    let hasNextPage = true;
    let after = null;
    while(hasNextPage){
        try {
            const response = await client.request(GET_POSTS_QUERY, {
                first: 100,
                after
            });
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
async function fetchPostBySlug(slug) {
    const client = getWpClient();
    try {
        const response = await client.request(GET_POST_BY_SLUG_QUERY, {
            slug
        });
        if (!response.post) return null;
        return transformPost(response.post);
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        throw error;
    }
}
async function fetchPostPreview(id, authToken) {
    const client = getWpClient(authToken);
    try {
        const response = await client.request(GET_POST_PREVIEW_QUERY, {
            id: id.toString()
        });
        if (!response.post) return null;
        return transformPost(response.post);
    } catch (error) {
        console.error('Error fetching post preview:', error);
        throw error;
    }
}
async function fetchPages() {
    const client = getWpClient();
    try {
        const response = await client.request(GET_PAGES_QUERY);
        return response.pages.nodes.map(transformPage);
    } catch (error) {
        console.error('Error fetching pages from WordPress:', error);
        throw error;
    }
}
async function fetchPagePreview(id, authToken) {
    const client = getWpClient(authToken);
    try {
        const response = await client.request(GET_PAGE_PREVIEW_QUERY, {
            id: id.toString()
        });
        if (!response.page) return null;
        return transformPage(response.page);
    } catch (error) {
        console.error('Error fetching page preview:', error);
        throw error;
    }
}
async function fetchRedirects() {
    const wpApiUrl = process.env.WP_API_URL;
    if (!wpApiUrl) {
        console.warn('WP_API_URL not set, cannot fetch redirects');
        return [];
    }
    // Get WordPress base URL (without /graphql)
    const wpBaseUrl = wpApiUrl.replace(/\/graphql\/?$/, '');
    const redirectsEndpoint = `${wpBaseUrl}/wp-json/headless/v1/redirects`;
    try {
        // Build request headers with authentication
        const headers = {
            'Content-Type': 'application/json'
        };
        if (process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD) {
            const credentials = Buffer.from(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`).toString('base64');
            headers['Authorization'] = `Basic ${credentials}`;
        }
        const response = await fetch(redirectsEndpoint, {
            headers
        });
        if (!response.ok) {
            console.warn(`Redirects API returned ${response.status} - mu-plugin may not be installed (see wordpress-plugins/headless-redirects-api.php)`);
            return [];
        }
        const data = await response.json();
        // Redirection plugin returns { items: [...] } with each item having:
        // url: source URL, action_data: { url: target }, action_code: redirect type (301, 302, etc.)
        const items = data.items || [];
        return items.filter((r)=>r.enabled).map((r)=>({
                origin: r.url.startsWith('/') ? r.url : `/${r.url}`,
                target: r.action_data?.url || '/',
                type: r.action_code || 301,
                format: 'plain'
            }));
    } catch (error) {
        console.warn('Could not fetch redirects from Redirection plugin:', error);
        return [];
    }
}
async function fetchAcfGlobalScripts() {
    const client = getWpClient();
    try {
        const response = await client.request(GET_ACF_OPTIONS_QUERY);
        const globalScripts = response.sherOptions?.globalScripts;
        return {
            headScripts: globalScripts?.globalHeadScripts || null,
            bodyScripts: globalScripts?.globalBodyScripts || null
        };
    } catch (error) {
        // ACF Options may not be configured, return empty
        console.warn('Could not fetch ACF global scripts (ACF Options may not be configured):', error);
        return {
            headScripts: null,
            bodyScripts: null
        };
    }
}
async function checkWordPressConnection() {
    try {
        const client = getWpClient();
        await client.request(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["gql"]`
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
}),
];

//# sourceMappingURL=lib_wordpress_ts_251326cf._.js.map