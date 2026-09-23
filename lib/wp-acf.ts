// AUTO-GENERATED from WordPress ACF schema introspection (see replit.md).
// Fetchers return the raw ACF group object for a page, or null when unavailable.
import { getWpAuthHeaders } from './wp-auth';

export type WpImage = { node?: { sourceUrl?: string | null; altText?: string | null } | null } | null;

export function imgUrl(img: WpImage | undefined, fallback: string): string {
  return img?.node?.sourceUrl || fallback;
}
export function imgAlt(img: WpImage | undefined, fallback: string): string {
  return img?.node?.altText || fallback;
}

// 30-minute data-cache TTL for ISR — WordPress is fetched at most once per 30
// minutes per page. The /api/revalidate webhook purges pages instantly when
// content changes in WordPress, so the TTL is only a safety net.
const ACF_REVALIDATE_SECONDS = 1800;

async function gqlFetch(query: string, variables?: Record<string, unknown>, fresh = false): Promise<any> {
  const wpApiUrl = process.env.WP_API_URL;
  if (!wpApiUrl) throw new Error('WP_API_URL environment variable is not set');
  const res = await fetch(wpApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getWpAuthHeaders() },
    body: JSON.stringify({ query, variables }),
    ...(fresh ? { cache: 'no-store' as const } : { next: { revalidate: ACF_REVALIDATE_SECONDS, tags: ['wp-content'] } }),
  });
  if (!res.ok) throw new Error(`WPGraphQL request failed with status ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(`WPGraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data;
}

async function fetchGroup<T>(uri: string, groupField: string, selection: string, fresh = false): Promise<T | null> {
  try {
    const query = `query GetAcf($uri: ID!) { page(id: $uri, idType: URI) { ${groupField} { ${selection} } } }`;
    const data = await gqlFetch(query, { uri }, fresh);
    return (data?.page?.[groupField] as T) ?? null;
  } catch (error) {
    console.error(`[wp-acf] Failed to fetch ${groupField} for /${uri}:`, error);
    return null;
  }
}

const HOME_SELECTION = `featuredTestimonials { name quote } helpBody helpCards { desc href image { node { sourceUrl altText } } title } helpEyebrow helpHeading heroBedroomImage { node { sourceUrl altText } } heroBody heroCtaLink heroCtaText heroGraphicImage { node { sourceUrl altText } } heroHeading heroSecondaryLink heroSecondaryText mastersClubAlt mastersClubImage { node { sourceUrl altText } } processBuyingLabel processBuyingSteps { desc image { node { sourceUrl altText } } num title } processCtaLink processCtaText processHeading processPreparingLabel processPreparingSteps { desc image { node { sourceUrl altText } } num title } processSellingLabel processSellingSteps { desc image { node { sourceUrl altText } } num title } processSubtitle stats { label prefix suffix value } whyBullets { desc icon title } whyCtaLink whyCtaText whyHeading whyImage { node { sourceUrl altText } } whyImageAlt whySecondaryLink whySecondaryText`;
export function fetchHomeAcf() { return fetchGroup<Record<string, any>>('home', 'homeFields', HOME_SELECTION); }

const BUYING_SELECTION = `faqsIntro heroBody heroCtaLink heroCtaText heroEyebrow heroHeading processCtaLink processCtaText processEyebrow processHeading processSubtitle steps { desc image { node { sourceUrl altText } } num title } tips { desc highlighted image { node { sourceUrl altText } } title } tipsEyebrow tipsHeading tipsSubtitle whyBody whyBullets { desc icon title } whyCtaLink whyCtaText whyEyebrow whyHeading whySecondaryLink whySecondaryText whyVideoImage { node { sourceUrl altText } }`;
export function fetchBuyingAcf() { return fetchGroup<Record<string, any>>('buyer', 'buyingFields', BUYING_SELECTION); }

const SELLING_SELECTION = `faqsIntro guaranteeBody guaranteeEyebrow guaranteeHeading guaranteeItems { desc icon title } heroBody heroCtaLink heroCtaText heroEyebrow heroHeading prepAfterImage { node { sourceUrl altText } } prepBeforeImage { node { sourceUrl altText } } prepBody prepBullets { desc num title } prepCtaLink prepCtaText prepEyebrow prepHeading prepPhoneLink prepPhoneText processCtaLink processCtaText processEyebrow processHeading processSubtitle steps { desc image { node { sourceUrl altText } } num title } whyBody whyBullets { desc icon title } whyCtaLink whyCtaText whyEyebrow whyHeading whySecondaryLink whySecondaryText whyVideoId whyVideoImage { node { sourceUrl altText } } zillowBody zillowCtaLink zillowCtaText zillowHeading zillowImage { node { sourceUrl altText } } zillowSecondaryLink zillowSecondaryText`;
export function fetchSellingAcf() { return fetchGroup<Record<string, any>>('seller', 'sellingFields', SELLING_SELECTION); }

const FAQS_SELECTION = `heading intro`;
export function fetchFaqsAcf() { return fetchGroup<Record<string, any>>('faqs', 'faqsFields', FAQS_SELECTION); }

const ABOUT_SELECTION = `bioCtaLink bioCtaText bioEyebrow bioHeading bioParagraphs { text } faqsIntro helpBody helpCards { desc href image { node { sourceUrl altText } } title } helpEyebrow helpHeading heroBody heroCtaLink heroCtaText heroEyebrow heroHeading heroImage { node { sourceUrl altText } } portraitImage { node { sourceUrl altText } } stats { label prefix suffix value } values { desc icon title } valuesEyebrow valuesHeading`;
export function fetchAboutAcf() { return fetchGroup<Record<string, any>>('about', 'aboutFields', ABOUT_SELECTION); }

const HOMEVALUE_SELECTION = `ctaBody ctaEyebrow ctaHeading ctaPrimaryLabel ctaSecondaryLabel formBody formEyebrow formHeading formSuccessBody formSuccessHeading heroBody heroCtaLink heroCtaText heroEyebrow heroHeading heroImage { node { sourceUrl altText } } howItWorks { desc num title } howItWorksHeading howItWorksSubtitle notSelling { desc icon title } notSellingHeading notSellingSubtitle whatYouGet { desc icon title } whatYouGetHeading whatYouGetSubtitle`;
export function fetchHomeValueAcf() { return fetchGroup<Record<string, any>>('home-value-analysis', 'homeValueFields', HOMEVALUE_SELECTION); }

const GETINTOUCH_SELECTION = `body email emailCardDesc emailCardTitle eyebrow formEyebrow formHeading heading heroImage { node { sourceUrl altText } } phone phoneCardDesc phoneCardTitle ps successBody successHeading`;
export function fetchGetInTouchAcf() { return fetchGroup<Record<string, any>>('connect', 'getInTouchFields', GETINTOUCH_SELECTION); }

const BOOKCONSULTATION_SELECTION = `body body2 calendarEmbed calendarHeading calendarText confirmLink confirmText expectations { desc title } eyebrow heading scheduleLink scheduleText`;
export function fetchBookConsultationAcf() { return fetchGroup<Record<string, any>>('book-consultation', 'bookConsultationFields', BOOKCONSULTATION_SELECTION); }

const BOOKED_SELECTION = `badge body buttonLink buttonText heading videoEmbed`;
export function fetchBookedAcf() { return fetchGroup<Record<string, any>>('booked', 'bookedFields', BOOKED_SELECTION); }

const THANKYOU_SELECTION = `body buttonLink buttonText heading`;
export function fetchThankYouAcf() { return fetchGroup<Record<string, any>>('thank-you', 'thankYouFields', THANKYOU_SELECTION); }

const HOMEPREP_SELECTION = `caseAfterImage { node { sourceUrl altText } } caseBeforeImage { node { sourceUrl altText } } caseBody caseBullets { text } caseCtaLink caseCtaText caseEyebrow caseHeading casePhoneLink casePhoneText caseSectionHeading familiarBody familiarCtaLink familiarCtaText familiarHeading familiarImage { node { sourceUrl altText } } familiarPhoneLink familiarPhoneText familiarSubheading familiarWorries { text } faqsIntro heroBody heroCtaLink heroCtaText heroEyebrow heroHeading heroImage { node { sourceUrl altText } } includedCards { desc image { node { sourceUrl altText } } title } includedEyebrow includedHeading processCtaLink processCtaText processEyebrow processHeading processSecondaryLink processSecondaryText processSubtitle steps { desc image { node { sourceUrl altText } } num title } whyBody whyBullets { desc title } whyCtaLink whyCtaText whyEyebrow whyHeading whyImage { node { sourceUrl altText } } whySecondaryLink whySecondaryText`;
export function fetchHomePrepAcf() { return fetchGroup<Record<string, any>>('home-prep-program', 'homePrepFields', HOMEPREP_SELECTION, true); }

export type WpFaq = { question: string; answer: string };
export async function fetchFaqs(): Promise<WpFaq[]> {
  try {
    const query = `{ faqs(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) { nodes { title content menuOrder } } }`;
    const data = await gqlFetch(query);
    const nodes = data?.faqs?.nodes ?? [];
    return nodes.map((n: any) => ({ question: n.title || '', answer: (n.content || '').replace(/<[^>]+>/g, '').trim() }));
  } catch (error) {
    console.error('[wp-acf] Failed to fetch FAQs:', error);
    return [];
  }
}

export type WpTestimonial = { name: string; quote: string; source?: 'google' | 'zillow' };

function normalizeSource(val?: string | string[] | null): 'google' | 'zillow' | undefined {
  if (!val) return undefined;
  const str = Array.isArray(val) ? val[0] : val;
  if (!str) return undefined;
  const lower = str.toLowerCase();
  if (lower.includes('zillow')) return 'zillow';
  if (lower.includes('google')) return 'google';
  return undefined;
}

export async function fetchTestimonials(): Promise<WpTestimonial[]> {
  // Field group: testimonialFields  Sub-fields: reviewerName, quote, platform (array), rating
  try {
    const query = `{
      testimonials(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes {
          testimonialFields { reviewerName quote platform rating }
          menuOrder
        }
      }
    }`;
    const data = await gqlFetch(query);
    const nodes = data?.testimonials?.nodes ?? [];
    const results: WpTestimonial[] = nodes
      .map((n: any) => ({
        name:   n.testimonialFields?.reviewerName || '',
        quote:  n.testimonialFields?.quote        || '',
        source: normalizeSource(n.testimonialFields?.platform),
      }))
      .filter((t: WpTestimonial) => t.name && t.quote);
    if (results.length > 0) return results;
  } catch (error) {
    console.error('[wp-acf] fetchTestimonials ACF query failed:', error);
  }

  // Fallback: native title + content (for testimonials stored without ACF)
  try {
    const query = `{
      testimonials(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
        nodes { title content menuOrder }
      }
    }`;
    const data = await gqlFetch(query);
    const nodes = data?.testimonials?.nodes ?? [];
    return nodes
      .map((n: any) => ({
        name:  n.title || '',
        quote: (n.content || '').replace(/<[^>]+>/g, '').trim(),
      }))
      .filter((t: WpTestimonial) => t.name && t.quote);
  } catch (error) {
    console.error('[wp-acf] fetchTestimonials native fallback failed:', error);
    return [];
  }
}
