/**
 * Landing Builder Layout Constants
 * 
 * Figma-matched spacing, sizing, and layout values.
 * These are consumed by block components for consistent layouts.
 */

export const layout = {
  section: {
    padding: 'py-24 lg:py-36',
    paddingSmall: 'py-16 lg:py-24',
  },
  container: {
    base: 'container mx-auto px-6 lg:px-12',
    maxWidth: 'max-w-[1200px]',
    full: 'container mx-auto px-6 lg:px-12 max-w-[1200px]',
  },
  gap: {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
    '2xl': 'gap-12',
    section: 'gap-8 lg:gap-12',
    grid: 'gap-8 lg:gap-10',
    cards: 'gap-6 lg:gap-8',
  },
  text: {
    heroHeadline: 'max-w-[680px]',
    heroCopy: 'max-w-[520px]',
    sectionHeader: 'max-w-[640px]',
    bodyContent: 'max-w-[640px]',
  },
  split: {
    leftColumn: 'w-full lg:w-[360px] lg:flex-shrink-0',
    gap: 'gap-8 lg:gap-12',
  },
} as const;

export const sectionClasses = `${layout.section.padding} ${layout.container.full}`;
export const sectionClassesSmall = `${layout.section.paddingSmall} ${layout.container.full}`;
