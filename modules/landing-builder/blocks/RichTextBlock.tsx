/**
 * Rich Text Block
 * 
 * WYSIWYG content area for custom HTML content from WordPress.
 * Features elegant typography and responsive width options.
 */

import type { RichTextBlock as RichTextBlockType } from '../types';

interface Props {
  block: RichTextBlockType;
}

const bgColorClasses = {
  default: 'bg-background',
  muted: 'bg-muted/50',
  card: 'bg-card',
} as const;

const maxWidthClasses = {
  narrow: 'max-w-2xl',
  medium: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
} as const;

export function RichTextBlock({ block }: Props) {
  const bgColor = block.backgroundColor || 'default';
  const maxWidth = block.maxWidth || 'medium';

  if (!block.content) {
    return null;
  }

  return (
    <section
      className={`py-16 md:py-24 ${bgColorClasses[bgColor]}`}
      data-testid="block-rich-text"
    >
      <div className="container mx-auto px-4">
        <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
          {/* Decorative top accent */}
          <div className="w-16 h-1 bg-primary rounded-full mb-12" aria-hidden="true" />
          
          <div 
            className="prose prose-lg md:prose-xl max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:md:text-4xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:md:text-3xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ol:my-8 prose-ul:my-8
              prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground"
            dangerouslySetInnerHTML={{ __html: block.content }}
            data-testid="rich-text-content"
          />
        </div>
      </div>
    </section>
  );
}
