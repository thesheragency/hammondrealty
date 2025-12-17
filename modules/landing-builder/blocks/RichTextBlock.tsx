/**
 * Rich Text Block
 * 
 * WYSIWYG content area for custom HTML content from WordPress.
 * Uses design system typography with prose styling.
 */

import type { RichTextBlock as RichTextBlockType } from '../types';

interface Props {
  block: RichTextBlockType;
}

const maxWidthClasses = {
  narrow: 'max-w-[640px]',
  medium: 'max-w-[800px]',
  wide: 'max-w-[1000px]',
  full: 'max-w-none',
} as const;

export function RichTextBlock({ block }: Props) {
  const maxWidth = block.maxWidth || 'medium';

  if (!block.content) {
    return null;
  }

  return (
    <section
      className="bg-background py-24 lg:py-36"
      data-testid="block-rich-text"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
          <div 
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-medium prose-headings:tracking-tight
              prose-h2:text-h2 prose-h2:mt-16 prose-h2:mb-8
              prose-h3:text-h3 prose-h3:mt-12 prose-h3:mb-6
              prose-p:text-body prose-p:text-muted-foreground prose-p:my-6
              prose-a:text-brand prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ol:my-10 prose-ul:my-10
              prose-li:text-muted-foreground prose-li:my-2"
            dangerouslySetInnerHTML={{ __html: block.content }}
            data-testid="rich-text-content"
          />
        </div>
      </div>
    </section>
  );
}
