/**
 * Landing Page Renderer
 * 
 * Main component that renders a landing page by mapping ACF blocks to React components.
 */

import type { LandingPageData, LandingBlock } from './types';
import { HeroBlock } from './blocks/HeroBlock';
import { FeatureGridBlock } from './blocks/FeatureGridBlock';
import { CtaBannerBlock } from './blocks/CtaBannerBlock';
import { FormSectionBlock } from './blocks/FormSectionBlock';
import { RichTextBlock } from './blocks/RichTextBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';

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
    
    case 'LandingSectionsFeatureGrid':
      return <FeatureGridBlock key={key} block={block} />;
    
    case 'LandingSectionsCtaBanner':
      return <CtaBannerBlock key={key} block={block} />;
    
    case 'LandingSectionsFormSection':
      return <FormSectionBlock key={key} block={block} />;
    
    case 'LandingSectionsRichText':
      return <RichTextBlock key={key} block={block} />;
    
    case 'LandingSectionsTestimonials':
      return <TestimonialsBlock key={key} block={block} />;
    
    default:
      // Unknown block type - log for debugging but don't break the page
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
