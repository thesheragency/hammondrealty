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
  /** Path (e.g. "/buyer") used to build a canonical URL when no Yoast canonical exists. */
  canonicalPath?: string;
  /** Override the default robots directive. Use e.g. { index: false, follow: true } for utility pages. */
  robots?: Metadata['robots'];
}

export async function buildMetadata({
  seo,
  title,
  description,
  ogType = 'website',
  featuredImage,
  canonicalPath,
  robots,
}: BuildMetadataOptions): Promise<Metadata> {
  const globalDefaults = await fetchYoastGlobalDefaults();
  const fallbackImage = validUrl(featuredImage) || validUrl(globalDefaults.defaultImage);

  const resolvedTitle = seo?.title || title;
  const resolvedDescription = seo?.metaDesc || description || '';

  const ogImage = validUrl(seo?.opengraphImage) || fallbackImage;
  const twImage = validUrl(seo?.twitterImage) || fallbackImage;
  const hasImage = !!(ogImage || twImage);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    ...(robots !== undefined ? { robots } : {}),
    // Strip www. from any Yoast-provided canonical to enforce non-www as primary
    ...(seo?.canonical
      ? { alternates: { canonical: seo.canonical.replace(/^(https?:\/\/)www\./, '$1') } }
      : canonicalPath
        ? { alternates: { canonical: canonicalPath } }
        : {}),
    openGraph: {
      title: seo?.opengraphTitle || resolvedTitle,
      description: seo?.opengraphDescription || resolvedDescription,
      type: ogType,
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(seo?.opengraphSiteName || globalDefaults.siteName
        ? { siteName: seo?.opengraphSiteName || globalDefaults.siteName }
        : {}),
    },
    twitter: {
      card: hasImage ? 'summary_large_image' : 'summary',
      title: seo?.twitterTitle || resolvedTitle,
      description: seo?.twitterDescription || resolvedDescription,
      ...(twImage ? { images: [twImage] } : {}),
    },
  };
}
