import { Helmet } from 'react-helmet-async';
import type { SeoMetadata } from '@shared/schema';

interface SeoHeadProps {
  seo?: SeoMetadata | null;
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
}

export function SeoHead({ seo, title, description, canonical, type = 'website' }: SeoHeadProps) {
  const pageTitle = seo?.title || title || 'WordPress Headless CMS';
  const pageDescription = seo?.metaDesc || description || '';
  const pageCanonical = seo?.canonical || canonical;
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      
      {pageDescription && <meta name="description" content={pageDescription} />}
      {pageCanonical && <link rel="canonical" href={pageCanonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={seo?.opengraphTitle || pageTitle} />
      {(seo?.opengraphDescription || pageDescription) && (
        <meta property="og:description" content={seo?.opengraphDescription || pageDescription} />
      )}
      <meta property="og:type" content={seo?.opengraphType || type} />
      {seo?.opengraphUrl && <meta property="og:url" content={seo.opengraphUrl} />}
      {seo?.opengraphImage && <meta property="og:image" content={seo.opengraphImage} />}
      {seo?.opengraphSiteName && <meta property="og:site_name" content={seo.opengraphSiteName} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={seo?.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={seo?.twitterTitle || pageTitle} />
      {(seo?.twitterDescription || pageDescription) && (
        <meta name="twitter:description" content={seo?.twitterDescription || pageDescription} />
      )}
      {seo?.twitterImage && <meta name="twitter:image" content={seo.twitterImage} />}
    </Helmet>
  );
}
