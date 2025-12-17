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
  bulletPoints?: string[];
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  showRating?: boolean;
  ratingText?: string;
  backgroundImage?: {
    sourceUrl: string;
    altText?: string;
  };
  heroImage?: {
    sourceUrl: string;
    altText?: string;
  };
}

// Logo Reel Block
export interface LogoReelBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsLogoReel';
  logos?: Array<{
    sourceUrl: string;
    altText?: string;
  }>;
}

// Accordion Block (FAQ/Problem-Solution)
export interface AccordionBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsAccordion';
  sectionTitle?: string;
  sectionDescription?: string;
  ctaText?: string;
  ctaUrl?: string;
  items?: Array<{
    question: string;
    answer: string;
  }>;
  layout?: 'centered' | 'split';
}

// Services Grid Block
export interface ServicesGridBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsServicesGrid';
  sectionTitle?: string;
  sectionDescription?: string;
  services?: Array<{
    title: string;
    linkUrl?: string;
    image?: {
      sourceUrl: string;
      altText?: string;
    };
  }>;
  showCustomQuote?: boolean;
  customQuoteText?: string;
  customQuoteUrl?: string;
}

// Video Section Block
export interface VideoSectionBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsVideoSection';
  headline?: string;
  bulletPoints?: string[];
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  videoUrl?: string;
  videoThumbnail?: {
    sourceUrl: string;
    altText?: string;
  };
}

// Values/Features Block (3-column with icons)
export interface ValuesBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsValues';
  sectionTitle?: string;
  sectionDescription?: string;
  values?: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
}

// Content Split Block (Image + Text)
export interface ContentSplitBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsContentSplit';
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  imagePosition?: 'left' | 'right';
}

// Testimonials Block
export interface TestimonialsBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsTestimonials';
  sectionTitle?: string;
  sectionDescription?: string;
  testimonials?: Array<{
    quote?: string;
    authorName?: string;
    authorImage?: {
      sourceUrl: string;
      altText?: string;
    };
  }>;
}

// Photo Gallery Block
export interface PhotoGalleryBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsPhotoGallery';
  sectionTitle?: string;
  sectionDescription?: string;
  ctaText?: string;
  ctaUrl?: string;
  photos?: Array<{
    sourceUrl: string;
    altText?: string;
  }>;
}

// Contact/Form Block
export interface ContactFormBlock extends BaseBlock {
  fieldGroupName: 'LandingSectionsContactForm';
  headline?: string;
  bulletPoints?: string[];
  description?: string;
  formMode?: 'gravity' | 'iframe';
  gravityFormId?: number;
  iframeUrl?: string;
  iframeHeight?: number;
}

// Feature Grid Block (kept for backwards compatibility)
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

// Form Section Block (kept for backwards compatibility)
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

// Union type for all block types
export type LandingBlock =
  | HeroBlock
  | LogoReelBlock
  | AccordionBlock
  | ServicesGridBlock
  | VideoSectionBlock
  | ValuesBlock
  | ContentSplitBlock
  | TestimonialsBlock
  | PhotoGalleryBlock
  | ContactFormBlock
  | FeatureGridBlock
  | CtaBannerBlock
  | FormSectionBlock
  | RichTextBlock;

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
  'LandingSectionsLogoReel': 'logo-reel',
  'LandingSectionsAccordion': 'accordion',
  'LandingSectionsServicesGrid': 'services-grid',
  'LandingSectionsVideoSection': 'video-section',
  'LandingSectionsValues': 'values',
  'LandingSectionsContentSplit': 'content-split',
  'LandingSectionsTestimonials': 'testimonials',
  'LandingSectionsPhotoGallery': 'photo-gallery',
  'LandingSectionsContactForm': 'contact-form',
  'LandingSectionsFeatureGrid': 'feature-grid',
  'LandingSectionsCtaBanner': 'cta-banner',
  'LandingSectionsFormSection': 'form-section',
  'LandingSectionsRichText': 'rich-text',
} as const;

export type BlockTypeName = typeof BLOCK_TYPE_MAP[keyof typeof BLOCK_TYPE_MAP];
