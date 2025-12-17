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
  narrow: 'max-w-2xl',
  medium: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
} as const;

export function RichTextBlock({ block }: Props) {
  const maxWidth = block.maxWidth || 'medium';

  if (!block.content) {
    return null;
  }

  return (
    <section
      className="bg-background py-16 md:py-24"
      data-testid="block-rich-text"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
          <div 
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-medium prose-headings:tracking-tight
              prose-h2:text-h2 prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-h3 prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-body prose-p:text-muted-foreground
              prose-a:text-brand prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ol:my-8 prose-ul:my-8
              prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: block.content }}
            data-testid="rich-text-content"
          />
        </div>
      </div>
    </section>
  );
}
