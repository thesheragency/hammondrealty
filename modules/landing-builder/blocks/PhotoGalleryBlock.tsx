/**
 * Photo Gallery Block
 * 
 * Grid of photos with optional CTA.
 * Uses design system typography and spacing.
 */

import type { PhotoGalleryBlock as PhotoGalleryBlockType } from '../types';
import { Button } from '@/components/ui/button';

interface Props {
  block: PhotoGalleryBlockType;
}

export function PhotoGalleryBlock({ block }: Props) {
  const photos = block.photos || [];

  if (photos.length === 0) {
    return null;
  }

  // Layout: First photo is large (left), remaining 4 in 2x2 grid (right)
  const mainPhoto = photos[0];
  const gridPhotos = photos.slice(1, 5);

  return (
    <section className="bg-background py-24 lg:py-36" data-testid="block-photo-gallery">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            {block.sectionTitle && (
              <h2 className="text-h2 mb-2" data-testid="photo-gallery-title">
                {block.sectionTitle}
              </h2>
            )}
            {block.sectionDescription && (
              <p className="text-body text-muted-foreground">
                {block.sectionDescription}
              </p>
            )}
          </div>
          
          {/* Navigation arrows */}
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Photo Grid - 2 columns with matched heights */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Large photo - fills left column */}
          <div className="aspect-square lg:aspect-auto lg:row-span-2 overflow-hidden rounded-xl">
            <img
              src={mainPhoto.sourceUrl}
              alt={mainPhoto.altText || 'Gallery photo'}
              className="w-full h-full object-cover"
              data-testid="gallery-main-photo"
            />
          </div>

          {/* 2x2 Grid - matches height of main photo */}
          <div className="grid grid-cols-2 gap-6">
            {gridPhotos.map((photo, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={photo.sourceUrl}
                  alt={photo.altText || `Gallery photo ${index + 2}`}
                  className="w-full h-full object-cover"
                  data-testid={`gallery-photo-${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {block.ctaText && block.ctaUrl && (
          <div className="flex items-center justify-center gap-6">
            <p className="text-body font-bold">Want the same?</p>
            <Button asChild size="lg">
              <a href={block.ctaUrl}>{block.ctaText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
