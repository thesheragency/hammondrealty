/**
 * Rich Text Block
 * 
 * WYSIWYG content block with configurable width.
 */

import type { RichTextBlock as RichTextBlockType } from '../types';

interface Props {
  block: RichTextBlockType;
}

const bgColorClasses = {
  default: 'bg-background',
  muted: 'bg-muted',
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
      className={`py-12 md:py-16 ${bgColorClasses[bgColor]}`}
      data-testid="block-rich-text"
    >
      <div className="container mx-auto px-4">
        <div
          className={`prose prose-lg dark:prose-invert mx-auto ${maxWidthClasses[maxWidth]}`}
          dangerouslySetInnerHTML={{ __html: block.content }}
          data-testid="rich-text-content"
        />
      </div>
    </section>
  );
}
