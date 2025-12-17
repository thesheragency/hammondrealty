/**
 * Landing Page Builder Types
 * 
 * Type definitions for ACF Flexible Content blocks used in landing pages.
 * Each block type corresponds to an ACF layout in the flexible content field.
 */

// Base block interface - all blocks extend this
export interface BaseBlock {
  fieldGroupName: string;
}

// Hero Block
export interface HeroBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsHeroSection';
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundImage?: {
    sourceUrl: string;
    altText?: string;
  };
  backgroundColor?: 'brand' | 'accent' | 'muted' | 'dark';
  textAlign?: 'left' | 'center' | 'right';
}

// Feature Grid Block
export interface FeatureGridBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsFeatureGrid';
  sectionTitle?: string;
  sectionDescription?: string;
  columns?: '2' | '3' | '4';
  features?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
  backgroundColor?: 'default' | 'muted' | 'card';
}

// CTA Banner Block
export interface CtaBannerBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsCtaBanner';
  headline?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  backgroundColor?: 'brand' | 'accent' | 'dark';
}

// Form Section Block
export interface FormSectionBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsFormSection';
  sectionTitle?: string;
  sectionDescription?: string;
  formMode?: 'gravity' | 'iframe';
  gravityFormId?: number;
  iframeUrl?: string;
  iframeHeight?: number;
  backgroundColor?: 'default' | 'muted' | 'card';
}

// Rich Text Block
export interface RichTextBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsRichText';
  content?: string;
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  backgroundColor?: 'default' | 'muted' | 'card';
}

// Testimonials Block
export interface TestimonialsBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsTestimonials';
  sectionTitle?: string;
  testimonials?: Array<{
    quote?: string;
    authorName?: string;
    authorTitle?: string;
    authorImage?: {
      sourceUrl: string;
      altText?: string;
    };
  }>;
  layout?: 'grid' | 'carousel';
  backgroundColor?: 'default' | 'muted' | 'card';
}

// Union type for all block types
export type LandingBlock =
  | HeroBlock
  | FeatureGridBlock
  | CtaBannerBlock
  | FormSectionBlock
  | RichTextBlock
  | TestimonialsBlock;

// Landing page data structure
export interface LandingPageData {
  title: string;
  slug: string;
  sections: LandingBlock[];
  seoMetadata?: {
    title?: string;
    metaDesc?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: string;
  };
}

// Map ACF field group names to block types for type guards
export const BLOCK_TYPE_MAP = {
  'LandingSectionsHeroSection': 'hero',
  'LandingSectionsFeatureGrid': 'feature-grid',
  'LandingSectionsCtaBanner': 'cta-banner',
  'LandingSectionsFormSection': 'form-section',
  'LandingSectionsRichText': 'rich-text',
  'LandingSectionsTestimonials': 'testimonials',
} as const;

export type BlockTypeName = typeof BLOCK_TYPE_MAP[keyof typeof BLOCK_TYPE_MAP];
