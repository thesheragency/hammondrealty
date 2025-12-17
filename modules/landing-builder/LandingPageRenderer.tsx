/**
 * Landing Page Renderer
 * 
 * Main component that renders a landing page by mapping ACF blocks to React components.
 */

import type { LandingPageData, LandingBlock } from './types';
import { HeroBlock } from './blocks/HeroBlock';
import { LogoReelBlock } from './blocks/LogoReelBlock';
import { AccordionBlock } from './blocks/AccordionBlock';
import { ServicesGridBlock } from './blocks/ServicesGridBlock';
import { VideoSectionBlock } from './blocks/VideoSectionBlock';
import { ValuesBlock } from './blocks/ValuesBlock';
import { ContentSplitBlock } from './blocks/ContentSplitBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { PhotoGalleryBlock } from './blocks/PhotoGalleryBlock';
import { ContactFormBlock } from './blocks/ContactFormBlock';
import { FeatureGridBlock } from './blocks/FeatureGridBlock';
import { CtaBannerBlock } from './blocks/CtaBannerBlock';
import { FormSectionBlock } from './blocks/FormSectionBlock';
import { RichTextBlock } from './blocks/RichTextBlock';

interface Props {
  data: LandingPageData;
  isPreview?: boolean;
}

/**
 * Render a single block based on its fieldGroupName
 */
function renderBlock(block: LandingBlock, index: number) {
  const key = `${block.fieldGroupName}-${index}`;

  switch (block.fieldGroupName) {
    case 'LandingSectionsHeroSection':
      return <HeroBlock key={key} block={block} />;
    
    case 'LandingSectionsLogoReel':
      return <LogoReelBlock key={key} block={block} />;
    
    case 'LandingSectionsAccordion':
      return <AccordionBlock key={key} block={block} />;
    
    case 'LandingSectionsServicesGrid':
      return <ServicesGridBlock key={key} block={block} />;
    
    case 'LandingSectionsVideoSection':
      return <VideoSectionBlock key={key} block={block} />;
    
    case 'LandingSectionsValues':
      return <ValuesBlock key={key} block={block} />;
    
    case 'LandingSectionsContentSplit':
      return <ContentSplitBlock key={key} block={block} />;
    
    case 'LandingSectionsTestimonials':
      return <TestimonialsBlock key={key} block={block} />;
    
    case 'LandingSectionsPhotoGallery':
      return <PhotoGalleryBlock key={key} block={block} />;
    
    case 'LandingSectionsContactForm':
      return <ContactFormBlock key={key} block={block} />;
    
    case 'LandingSectionsFeatureGrid':
      return <FeatureGridBlock key={key} block={block} />;
    
    case 'LandingSectionsCtaBanner':
      return <CtaBannerBlock key={key} block={block} />;
    
    case 'LandingSectionsFormSection':
      return <FormSectionBlock key={key} block={block} />;
    
    case 'LandingSectionsRichText':
      return <RichTextBlock key={key} block={block} />;
    
    default:
      console.warn('[Landing Builder] Unknown block type:', (block as LandingBlock).fieldGroupName);
      return null;
  }
}

export function LandingPageRenderer({ data, isPreview }: Props) {
  const { sections } = data;

  if (!sections || sections.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          This landing page has no sections yet. Add sections in WordPress.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="landing-page-renderer">
      {isPreview && (
        <div className="bg-yellow-500 text-yellow-900 text-center py-2 text-sm font-medium">
          Preview Mode - This content is not yet published
        </div>
      )}
      
      <main>
        {sections.map((block, index) => renderBlock(block, index))}
      </main>
    </div>
  );
}
