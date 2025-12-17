/**
 * Landing Page Builder Module
 * 
 * Public exports for the landing page builder.
 * Import from this file to use the landing builder in your application.
 */

// Main renderer
export { LandingPageRenderer } from './LandingPageRenderer';

// Types
export type {
  LandingPageData,
  LandingBlock,
  HeroBlock,
  FeatureGridBlock,
  CtaBannerBlock,
  FormSectionBlock,
  RichTextBlock,
  TestimonialsBlock,
} from './types';

// Server utilities
export { fetchLandingPage, isLandingPageTemplate } from './server/query';
export { getPageTemplateInfo, getLandingPageData, type PageTemplateInfo } from './server/resolve';
