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


/**
 * Page Template Configuration
 * 
 * Maps WordPress page template slugs to frontend renderer identifiers.
 * When WordPress returns a page with a specific template, this registry
 * determines which frontend component handles the rendering.
 * 
 * Template matching is case-insensitive and ignores the .php extension,
 * so "Landing Page", "template-landing-page", and "template-landing-page.php"
 * all resolve correctly.
 * 
 * IMPORTANT: All WordPress pages are routed through the dynamic app/[slug]/page.tsx
 * catch-all. The template determines which renderer handles the page — NOT the URL.
 * This means slug changes in WordPress are automatically reflected without any
 * frontend code changes. Never create hardcoded route directories for individual
 * WordPress page slugs.
 * 
 * To add a new page template:
 * 1. Create the template in WordPress (block editor or PHP template file)
 * 2. Add an entry below mapping the template name to a renderer identifier
 *    - Include ALL name variations WordPress might return (lowercased, with/without prefix)
 * 3. Create the renderer component and register it in TEMPLATE_RENDERERS (app/[slug]/page.tsx)
 * 4. Optionally gate behind a feature flag
 */

export type TemplateRenderer = string;

export interface PageTemplateConfig {
  renderer: TemplateRenderer;
  label: string;
  featureFlag?: string;
}

export const PAGE_TEMPLATE_CONFIG: Record<string, PageTemplateConfig> = {
  'template-landing-page': {
    renderer: 'landing-builder',
    label: 'Landing Page',
    featureFlag: 'FEATURE_LANDING_BUILDER',
  },
  'landing page': {
    renderer: 'landing-builder',
    label: 'Landing Page',
    featureFlag: 'FEATURE_LANDING_BUILDER',
  },
  // Add custom page templates below. Use the normalized template name
  // (lowercase, no .php extension) as the key. Include all name variations
  // WordPress might return for the same template.
  //
  // Example — a "Services" page template:
  //   'template-services': {
  //     renderer: 'services',
  //     label: 'Services Page',
  //   },
  //   'services': {
  //     renderer: 'services',
  //     label: 'Services Page',
  //   },
};

/**
 * Normalize a WordPress template name for registry lookup.
 * Strips .php extension and lowercases.
 */
function normalizeTemplateName(name: string): string {
  return name.toLowerCase().replace(/\.php$/, '').trim();
}

/**
 * Look up template configuration from a WordPress template name.
 * Returns the config if found and any associated feature flag is enabled.
 * Returns undefined if the template is not registered or its feature flag is disabled.
 */
export function getPageTemplateConfig(templateName: string | null | undefined): PageTemplateConfig | undefined {
  if (!templateName) return undefined;

  const normalized = normalizeTemplateName(templateName);
  const config = PAGE_TEMPLATE_CONFIG[normalized];

  if (!config) return undefined;

  if (config.featureFlag && process.env[config.featureFlag] === 'false') {
    return undefined;
  }

  return config;
}

/**
 * Determine the renderer for a given WordPress template name.
 * Returns 'default' if the template is not registered or its feature flag is disabled.
 */
export function getTemplateRenderer(templateName: string | null | undefined): TemplateRenderer {
  const config = getPageTemplateConfig(templateName);
  return config?.renderer ?? 'default';
}

/**
 * Check if a template name resolves to a specific renderer
 */
export function isTemplateRenderer(templateName: string | null | undefined, renderer: TemplateRenderer): boolean {
  return getTemplateRenderer(templateName) === renderer;
}

/**
 * Get all registered template slugs
 */
export function getRegisteredTemplates(): string[] {
  return Object.keys(PAGE_TEMPLATE_CONFIG);
}
