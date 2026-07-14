module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/global-error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/global-error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/seo-helpers.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildMetadata",
    ()=>buildMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wordpress.ts [app-rsc] (ecmascript)");
;
function validUrl(value) {
    if (!value || value.trim() === '') return undefined;
    return value;
}
async function buildMetadata({ seo, title, description, ogType = 'website', featuredImage, canonicalPath }) {
    const globalDefaults = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wordpress$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchYoastGlobalDefaults"])();
    const fallbackImage = validUrl(featuredImage) || validUrl(globalDefaults.defaultImage);
    const ogImage = validUrl(seo?.opengraphImage) || fallbackImage;
    const twImage = validUrl(seo?.twitterImage) || fallbackImage;
    const hasImage = !!(ogImage || twImage);
    return {
        title: seo?.title || title,
        description: seo?.metaDesc || description || '',
        ...seo?.canonical ? {
            alternates: {
                canonical: seo.canonical
            }
        } : canonicalPath ? {
            alternates: {
                canonical: canonicalPath
            }
        } : {},
        openGraph: {
            title: seo?.opengraphTitle || title,
            description: seo?.opengraphDescription || description || '',
            type: ogType,
            ...ogImage ? {
                images: [
                    ogImage
                ]
            } : {},
            ...seo?.opengraphSiteName || globalDefaults.siteName ? {
                siteName: seo?.opengraphSiteName || globalDefaults.siteName
            } : {}
        },
        twitter: {
            card: hasImage ? 'summary_large_image' : 'summary',
            title: seo?.twitterTitle || title,
            description: seo?.twitterDescription || description || '',
            ...twImage ? {
                images: [
                    twImage
                ]
            } : {}
        }
    };
}
}),
"[project]/lib/wp-acf.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// AUTO-GENERATED from WordPress ACF schema introspection (see replit.md).
// Fetchers return the raw ACF group object for a page, or null when unavailable.
__turbopack_context__.s([
    "fetchAboutAcf",
    ()=>fetchAboutAcf,
    "fetchBookConsultationAcf",
    ()=>fetchBookConsultationAcf,
    "fetchBookedAcf",
    ()=>fetchBookedAcf,
    "fetchBuyingAcf",
    ()=>fetchBuyingAcf,
    "fetchFaqs",
    ()=>fetchFaqs,
    "fetchFaqsAcf",
    ()=>fetchFaqsAcf,
    "fetchGetInTouchAcf",
    ()=>fetchGetInTouchAcf,
    "fetchHomeAcf",
    ()=>fetchHomeAcf,
    "fetchHomePrepAcf",
    ()=>fetchHomePrepAcf,
    "fetchHomeValueAcf",
    ()=>fetchHomeValueAcf,
    "fetchSellingAcf",
    ()=>fetchSellingAcf,
    "fetchTestimonials",
    ()=>fetchTestimonials,
    "fetchThankYouAcf",
    ()=>fetchThankYouAcf,
    "imgAlt",
    ()=>imgAlt,
    "imgUrl",
    ()=>imgUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wp-auth.ts [app-rsc] (ecmascript)");
;
function imgUrl(img, fallback) {
    return img?.node?.sourceUrl || fallback;
}
function imgAlt(img, fallback) {
    return img?.node?.altText || fallback;
}
// Short data-cache TTL so WordPress edits show up quickly; the /api/revalidate
// webhook purges pages instantly in production.
const ACF_REVALIDATE_SECONDS = 60;
async function gqlFetch(query, variables) {
    const wpApiUrl = process.env.WP_API_URL;
    if (!wpApiUrl) throw new Error('WP_API_URL environment variable is not set');
    const res = await fetch(wpApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getWpAuthHeaders"])()
        },
        body: JSON.stringify({
            query,
            variables
        }),
        next: {
            revalidate: ACF_REVALIDATE_SECONDS,
            tags: [
                'wp-content'
            ]
        }
    });
    if (!res.ok) throw new Error(`WPGraphQL request failed with status ${res.status}`);
    const json = await res.json();
    if (json.errors?.length) throw new Error(`WPGraphQL errors: ${JSON.stringify(json.errors)}`);
    return json.data;
}
async function fetchGroup(uri, groupField, selection) {
    try {
        const query = `query GetAcf($uri: ID!) { page(id: $uri, idType: URI) { ${groupField} { ${selection} } } }`;
        const data = await gqlFetch(query, {
            uri
        });
        return data?.page?.[groupField] ?? null;
    } catch (error) {
        console.error(`[wp-acf] Failed to fetch ${groupField} for /${uri}:`, error);
        return null;
    }
}
const HOME_SELECTION = `featuredTestimonials { name quote } helpBody helpCards { desc href image { node { sourceUrl altText } } title } helpEyebrow helpHeading heroBedroomImage { node { sourceUrl altText } } heroBody heroCtaLink heroCtaText heroGraphicImage { node { sourceUrl altText } } heroHeading heroSecondaryLink heroSecondaryText mastersClubAlt mastersClubImage { node { sourceUrl altText } } processBuyingLabel processBuyingSteps { desc image { node { sourceUrl altText } } num title } processCtaLink processCtaText processHeading processPreparingLabel processPreparingSteps { desc image { node { sourceUrl altText } } num title } processSellingLabel processSellingSteps { desc image { node { sourceUrl altText } } num title } processSubtitle stats { label prefix suffix value } whyBullets { desc icon title } whyCtaLink whyCtaText whyHeading whyImage { node { sourceUrl altText } } whyImageAlt whySecondaryLink whySecondaryText`;
function fetchHomeAcf() {
    return fetchGroup('home', 'homeFields', HOME_SELECTION);
}
const BUYING_SELECTION = `faqsIntro heroBody heroCtaLink heroCtaText heroEyebrow heroHeading processCtaLink processCtaText processEyebrow processHeading processSubtitle steps { desc image { node { sourceUrl altText } } num title } tips { desc highlighted image { node { sourceUrl altText } } title } tipsEyebrow tipsHeading tipsSubtitle whyBody whyBullets { desc icon title } whyCtaLink whyCtaText whyEyebrow whyHeading whySecondaryLink whySecondaryText whyVideoImage { node { sourceUrl altText } }`;
function fetchBuyingAcf() {
    return fetchGroup('buyer', 'buyingFields', BUYING_SELECTION);
}
const SELLING_SELECTION = `faqsIntro guaranteeBody guaranteeEyebrow guaranteeHeading guaranteeItems { desc icon title } heroBody heroCtaLink heroCtaText heroEyebrow heroHeading prepAfterImage { node { sourceUrl altText } } prepBeforeImage { node { sourceUrl altText } } prepBody prepBullets { desc num title } prepCtaLink prepCtaText prepEyebrow prepHeading prepPhoneLink prepPhoneText processCtaLink processCtaText processEyebrow processHeading processSubtitle steps { desc image { node { sourceUrl altText } } num title } whyBody whyBullets { desc icon title } whyCtaLink whyCtaText whyEyebrow whyHeading whySecondaryLink whySecondaryText whyVideoId whyVideoImage { node { sourceUrl altText } } zillowBody zillowCtaLink zillowCtaText zillowHeading zillowImage { node { sourceUrl altText } } zillowSecondaryLink zillowSecondaryText`;
function fetchSellingAcf() {
    return fetchGroup('seller', 'sellingFields', SELLING_SELECTION);
}
const FAQS_SELECTION = `heading intro`;
function fetchFaqsAcf() {
    return fetchGroup('faqs', 'faqsFields', FAQS_SELECTION);
}
const ABOUT_SELECTION = `bioCtaLink bioCtaText bioEyebrow bioHeading bioParagraphs { text } faqsIntro helpBody helpCards { desc href image { node { sourceUrl altText } } title } helpEyebrow helpHeading heroBody heroCtaLink heroCtaText heroEyebrow heroHeading heroImage { node { sourceUrl altText } } portraitImage { node { sourceUrl altText } } stats { label prefix suffix value } values { desc icon title } valuesEyebrow valuesHeading`;
function fetchAboutAcf() {
    return fetchGroup('about', 'aboutFields', ABOUT_SELECTION);
}
const HOMEVALUE_SELECTION = `ctaBody ctaEyebrow ctaHeading ctaPrimaryLabel ctaSecondaryLabel formBody formEyebrow formHeading formSuccessBody formSuccessHeading heroBody heroCtaLink heroCtaText heroEyebrow heroHeading heroImage { node { sourceUrl altText } } howItWorks { desc num title } howItWorksHeading howItWorksSubtitle notSelling { desc icon title } notSellingHeading notSellingSubtitle whatYouGet { desc icon title } whatYouGetHeading whatYouGetSubtitle`;
function fetchHomeValueAcf() {
    return fetchGroup('home-value-analysis', 'homeValueFields', HOMEVALUE_SELECTION);
}
const GETINTOUCH_SELECTION = `body email emailCardDesc emailCardTitle eyebrow formEyebrow formHeading heading heroImage { node { sourceUrl altText } } phone phoneCardDesc phoneCardTitle ps successBody successHeading`;
function fetchGetInTouchAcf() {
    return fetchGroup('connect', 'getInTouchFields', GETINTOUCH_SELECTION);
}
const BOOKCONSULTATION_SELECTION = `body body2 calendarEmbed calendarHeading calendarText confirmLink confirmText expectations { desc title } eyebrow heading scheduleLink scheduleText`;
function fetchBookConsultationAcf() {
    return fetchGroup('book-consultation', 'bookConsultationFields', BOOKCONSULTATION_SELECTION);
}
const BOOKED_SELECTION = `badge body buttonLink buttonText heading videoEmbed`;
function fetchBookedAcf() {
    return fetchGroup('booked', 'bookedFields', BOOKED_SELECTION);
}
const THANKYOU_SELECTION = `body buttonLink buttonText heading`;
function fetchThankYouAcf() {
    return fetchGroup('thank-you', 'thankYouFields', THANKYOU_SELECTION);
}
const HOMEPREP_SELECTION = `caseAfterImage { node { sourceUrl altText } } caseBeforeImage { node { sourceUrl altText } } caseBody caseBullets { text } caseCtaLink caseCtaText caseEyebrow caseHeading casePhoneLink casePhoneText caseSectionHeading familiarBody familiarCtaLink familiarCtaText familiarHeading familiarImage { node { sourceUrl altText } } familiarPhoneLink familiarPhoneText familiarSubheading familiarWorries { text } faqsIntro heroBody heroCtaLink heroCtaText heroEyebrow heroHeading heroImage { node { sourceUrl altText } } includedCards { desc image { node { sourceUrl altText } } title } includedEyebrow includedHeading processCtaLink processCtaText processEyebrow processHeading processSecondaryLink processSecondaryText processSubtitle steps { desc image { node { sourceUrl altText } } num title } whyBody whyBullets { desc title } whyCtaLink whyCtaText whyEyebrow whyHeading whyImage { node { sourceUrl altText } } whySecondaryLink whySecondaryText`;
function fetchHomePrepAcf() {
    return fetchGroup('home-prep-program', 'homePrepFields', HOMEPREP_SELECTION);
}
async function fetchFaqs() {
    try {
        const query = `{ faqs(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) { nodes { title content menuOrder } } }`;
        const data = await gqlFetch(query);
        const nodes = data?.faqs?.nodes ?? [];
        return nodes.map((n)=>({
                question: n.title || '',
                answer: (n.content || '').replace(/<[^>]+>/g, '').trim()
            }));
    } catch (error) {
        console.error('[wp-acf] Failed to fetch FAQs:', error);
        return [];
    }
}
async function fetchTestimonials() {
    try {
        const query = `{ testimonials(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) { nodes { title content menuOrder } } }`;
        const data = await gqlFetch(query);
        const nodes = data?.testimonials?.nodes ?? [];
        return nodes.map((n)=>({
                name: n.title || '',
                quote: (n.content || '').replace(/<[^>]+>/g, '').trim()
            }));
    } catch (error) {
        console.error('[wp-acf] Failed to fetch testimonials:', error);
        return [];
    }
}
}),
"[project]/components/pages/AboutPage.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/pages/AboutPage.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/pages/AboutPage.tsx <module evaluation>", "default");
}),
"[project]/components/pages/AboutPage.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/pages/AboutPage.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/pages/AboutPage.tsx", "default");
}),
"[project]/components/pages/AboutPage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/pages/AboutPage.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/pages/AboutPage.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/about/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page,
    "generateMetadata",
    ()=>generateMetadata,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/seo-helpers.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$acf$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wp-acf.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/pages/AboutPage.tsx [app-rsc] (ecmascript)");
;
;
;
;
const revalidate = 300;
async function generateMetadata() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildMetadata"])({
        title: 'About Blake Hammond | Blake Hammond Real Estate',
        description: "Meet Blake Hammond — a Sacramento-area real estate agent focused on honest advice and exceptional results.",
        canonicalPath: '/about'
    });
}
async function Page() {
    const acf = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$acf$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAboutAcf"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$pages$2f$AboutPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        acf: acf
    }, void 0, false, {
        fileName: "[project]/app/about/page.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/about/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/about/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a91e9667._.js.map