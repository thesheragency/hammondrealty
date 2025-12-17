/**
 * Post Type Configuration
 * 
 * Register WordPress post types and their corresponding Next.js routes here.
 * When adding a new custom post type in WordPress:
 * 1. Add it to POST_TYPE_CONFIG below
 * 2. Ensure the WordPress preview plugin has the same frontend route configured
 * 3. Test preview functionality from WordPress
 */

export interface PostTypeConfig {
  /** The frontend route pattern (use [slug] as placeholder) */
  route: string;
  /** Content fetcher type - determines which GraphQL query to use */
  fetcher: 'post' | 'page';
  /** Human-readable label for error messages */
  label: string;
}

/**
 * Registered post types and their route configurations.
 * 
 * To add a new custom post type:
 * 1. Add an entry here with the WordPress post type slug as the key
 * 2. Define the route pattern matching your Next.js file structure
 * 3. Specify the fetcher ('post' for blog-like content, 'page' for page-like content)
 * 
 * Example for a 'product' custom post type:
 *   product: { route: '/products/[slug]', fetcher: 'page', label: 'Product' },
 */
export const POST_TYPE_CONFIG: Record<string, PostTypeConfig> = {
  post: {
    route: '/blog/[slug]',
    fetcher: 'post',
    label: 'Blog Post',
  },
  page: {
    route: '/[slug]',
    fetcher: 'page',
    label: 'Page',
  },
  // Add custom post types below:
  // product: {
  //   route: '/products/[slug]',
  //   fetcher: 'page',
  //   label: 'Product',
  // },
  // event: {
  //   route: '/events/[slug]',
  //   fetcher: 'page',
  //   label: 'Event',
  // },
};

/**
 * Get configuration for a post type
 * Returns undefined if the post type is not registered (should 404)
 */
export function getPostTypeConfig(type: string): PostTypeConfig | undefined {
  return POST_TYPE_CONFIG[type];
}

/**
 * Check if a post type is registered
 */
export function isValidPostType(type: string): boolean {
  return type in POST_TYPE_CONFIG;
}

/**
 * Get all registered post type slugs
 */
export function getRegisteredPostTypes(): string[] {
  return Object.keys(POST_TYPE_CONFIG);
}

/**
 * Build the preview redirect path for a given post type and slug
 */
export function buildPreviewPath(type: string, slug: string): string | null {
  const config = getPostTypeConfig(type);
  if (!config) return null;
  return config.route.replace('[slug]', slug);
}
