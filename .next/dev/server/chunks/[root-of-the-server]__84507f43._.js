module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/config/post-types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Post Type Configuration
 * 
 * Register WordPress post types and their corresponding Next.js routes here.
 * When adding a new custom post type in WordPress:
 * 1. Add it to POST_TYPE_CONFIG below
 * 2. Ensure the WordPress preview plugin has the same frontend route configured
 * 3. Test preview functionality from WordPress
 */ __turbopack_context__.s([
    "POST_TYPE_CONFIG",
    ()=>POST_TYPE_CONFIG,
    "buildPreviewPath",
    ()=>buildPreviewPath,
    "getPostTypeConfig",
    ()=>getPostTypeConfig,
    "getRegisteredPostTypes",
    ()=>getRegisteredPostTypes,
    "isValidPostType",
    ()=>isValidPostType
]);
const POST_TYPE_CONFIG = {
    post: {
        route: '/blog/[slug]',
        fetcher: 'post',
        label: 'Blog Post'
    },
    page: {
        route: '/[slug]',
        fetcher: 'page',
        label: 'Page'
    }
};
function getPostTypeConfig(type) {
    return POST_TYPE_CONFIG[type];
}
function isValidPostType(type) {
    return type in POST_TYPE_CONFIG;
}
function getRegisteredPostTypes() {
    return Object.keys(POST_TYPE_CONFIG);
}
function buildPreviewPath(type, slug) {
    const config = getPostTypeConfig(type);
    if (!config) return null;
    return config.route.replace('[slug]', slug);
}
}),
"[project]/app/api/preview/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$post$2d$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config/post-types.ts [app-route] (ecmascript)");
;
;
;
/**
 * Validate and sanitize a slug to prevent security issues
 * - Decodes URL encoding to catch encoded attacks
 * - Rejects path traversal attempts (.., backslashes)
 * - Rejects protocol handlers and special characters
 * - Allows hierarchical slugs (parent/child) for nested WordPress pages
 * - Each segment must be alphanumeric with hyphens/underscores
 */ function sanitizeSlug(slug) {
    if (!slug) return null;
    // Decode URL encoding to catch encoded attacks like %2e%2e
    let decoded;
    try {
        decoded = decodeURIComponent(slug);
    } catch  {
        // Invalid encoding
        return null;
    }
    // Reject path traversal patterns
    if (decoded.includes('..') || decoded.includes('\\') || decoded.includes('//')) {
        return null;
    }
    // Reject protocol handlers and special patterns
    if (decoded.includes('://') || decoded.includes(':')) {
        return null;
    }
    // Reject control characters and null bytes
    if (/[\x00-\x1f\x7f]/.test(decoded)) {
        return null;
    }
    // Remove leading/trailing slashes and whitespace
    const cleaned = decoded.replace(/^\/+|\/+$/g, '').trim();
    // Split into segments for hierarchical slugs (parent/child)
    const segments = cleaned.split('/');
    // Validate each segment: alphanumeric, hyphens, underscores only
    // This allows paths like "parent/child" but blocks malicious patterns
    for (const segment of segments){
        if (!segment || !/^[a-zA-Z0-9_-]+$/.test(segment)) {
            return null;
        }
    }
    return cleaned;
}
/**
 * Validate post type against allowlist
 * Only alphanumeric and underscores allowed (WordPress post type format)
 */ function sanitizeType(type) {
    if (!type) return null;
    // WordPress post types are lowercase alphanumeric with underscores
    if (!/^[a-z0-9_]+$/.test(type)) {
        return null;
    }
    return type;
}
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'post';
    // Validate the preview secret
    if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid preview secret'
        }, {
            status: 401
        });
    }
    // Either slug or id is required
    if (!slug && !id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Missing slug or id parameter'
        }, {
            status: 400
        });
    }
    // Sanitize and validate the type parameter
    const sanitizedType = sanitizeType(type);
    if (!sanitizedType) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid type format'
        }, {
            status: 400
        });
    }
    // Validate type against registered post types
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$post$2d$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidPostType"])(sanitizedType)) {
        console.warn(`[Preview] Unregistered post type requested: ${sanitizedType}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Post type '${sanitizedType}' is not registered. Add it to lib/config/post-types.ts`
        }, {
            status: 400
        });
    }
    // Sanitize slug if provided
    const sanitizedSlug = slug ? sanitizeSlug(slug) : null;
    if (slug && !sanitizedSlug) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid slug format'
        }, {
            status: 400
        });
    }
    // Validate ID is numeric if provided
    if (id && !/^\d+$/.test(id)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Invalid id format'
        }, {
            status: 400
        });
    }
    // Enable Draft Mode
    const draft = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["draftMode"])();
    draft.enable();
    // Build the redirect path using the post type configuration
    const pathSlug = sanitizedSlug || `preview-${id}`;
    const redirectPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2f$post$2d$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildPreviewPath"])(sanitizedType, pathSlug);
    if (!redirectPath) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to build preview path'
        }, {
            status: 500
        });
    }
    // Get the actual host from headers (handles proxied environments like Replit)
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const baseUrl = `${protocol}://${host}`;
    const redirectUrl = new URL(redirectPath, baseUrl);
    // Pass the WordPress post ID as a query parameter for draft content fetching
    if (id) {
        redirectUrl.searchParams.set('previewId', id);
    }
    // Pass the type for the catch-all route to know which fetcher to use
    redirectUrl.searchParams.set('type', sanitizedType);
    console.log(`[Preview] Redirecting to: ${redirectUrl.pathname}${redirectUrl.search}`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].redirect(redirectUrl);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__84507f43._.js.map