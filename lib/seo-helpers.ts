import type { Metadata } from 'next';
import type { SeoMetadata } from '@/shared/schema';
import { fetchYoastGlobalDefaults } from './wordpress';

function validUrl(value: string | undefined | null): string | undefined {
  if (!value || value.trim() === '') return undefined;
  return value;
}

interface BuildMetadataOptions {
  seo?: SeoMetadata;
  title: string;
  description?: string;
  ogType?: 'website' | 'article';
  featuredImage?: string | null;
  /** Path (e.g. "/buying") used to build a canonical URL when no Yoast canonical exists. */
  canonicalPath?: string;
}

export async function buildMetadata({
  seo,
  title,
  description,
  ogType = 'website',
  featuredImage,
  canonicalPath,
}: BuildMetadataOptions): Promise<Metadata> {
  const globalDefaults = await fetchYoastGlobalDefaults();
  const fallbackImage = validUrl(featuredImage) || validUrl(globalDefaults.defaultImage);

  const ogImage = validUrl(seo?.opengraphImage) || fallbackImage;
  const twImage = validUrl(seo?.twitterImage) || fallbackImage;
  const hasImage = !!(ogImage || twImage);

  return {
    title: seo?.title || title,
    description: seo?.metaDesc || description || '',
    ...(seo?.canonical
      ? { alternates: { canonical: seo.canonical } }
      : canonicalPath
        ? { alternates: { canonical: canonicalPath } }
        : {}),
    openGraph: {
      title: seo?.opengraphTitle || title,
      description: seo?.opengraphDescription || description || '',
      type: ogType,
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(seo?.opengraphSiteName || globalDefaults.siteName
        ? { siteName: seo?.opengraphSiteName || globalDefaults.siteName }
        : {}),
    },
    twitter: {
      card: hasImage ? 'summary_large_image' : 'summary',
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description || '',
      ...(twImage ? { images: [twImage] } : {}),
    },
  };
}
