/**
 * Feature Flags Configuration
 * 
 * Toggle features on/off for the boilerplate.
 * Set via environment variables or defaults here.
 */

export const FEATURES = {
  /**
   * Landing Page Builder
   * 
   * When enabled, pages with the "Landing Page" template in WordPress
   * will be rendered using the ACF Flexible Content block system
   * instead of the standard page template.
   * 
   * Requirements:
   * - WordPress: "Landing Page" page template registered
   * - WordPress: ACF Flexible Content field group attached to the template
   * - WordPress: WPGraphQL for ACF plugin installed and configured
   * 
   * Set FEATURE_LANDING_BUILDER=false to disable
   */
  LANDING_BUILDER: process.env.FEATURE_LANDING_BUILDER !== 'false',

  /**
   * Landing Page Template Name
   * 
   * The exact template name as it appears in WordPress.
   * This must match the template filename (without .php) or the
   * Template Name defined in the template file header.
   */
  LANDING_TEMPLATE_NAME: process.env.LANDING_TEMPLATE_NAME || 'template-landing-page',
} as const;

/**
 * Check if landing page builder is enabled
 */
export function isLandingBuilderEnabled(): boolean {
  return FEATURES.LANDING_BUILDER;
}

/**
 * Get the landing page template name for matching
 */
export function getLandingTemplateName(): string {
  return FEATURES.LANDING_TEMPLATE_NAME;
}
