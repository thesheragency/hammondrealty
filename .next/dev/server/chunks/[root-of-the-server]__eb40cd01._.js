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
"[project]/lib/seo-proxy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFrontendUrl",
    ()=>getFrontendUrl,
    "proxyWordPressFile",
    ()=>proxyWordPressFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
function getWordPressBaseUrl() {
    const wpApiUrl = process.env.WP_API_URL || '';
    return wpApiUrl.replace(/\/graphql\/?$/, '');
}
function shouldUseBasicAuth() {
    const enabled = process.env.WP_BASIC_AUTH_ENABLED;
    if (enabled === 'false' || enabled === '0') {
        return false;
    }
    return !!(process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD);
}
function getWordPressAuthHeaders() {
    const authHeaders = {};
    if (shouldUseBasicAuth()) {
        const credentials = Buffer.from(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`).toString('base64');
        authHeaders['Authorization'] = `Basic ${credentials}`;
    }
    return authHeaders;
}
async function getFrontendUrl() {
    if (process.env.FRONTEND_URL) {
        return process.env.FRONTEND_URL.replace(/\/$/, '');
    }
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
    const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';
    const protocol = headersList.get('x-forwarded-proto') || 'https';
    return `${protocol}://${host}`;
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
async function proxyWordPressFile(wpPath, frontendUrl) {
    const wpBaseUrl = getWordPressBaseUrl();
    if (!wpBaseUrl) {
        return null;
    }
    try {
        const authHeaders = getWordPressAuthHeaders();
        const response = await fetch(`${wpBaseUrl}${wpPath}`, {
            headers: authHeaders,
            next: {
                revalidate: 3600
            }
        });
        if (!response.ok) {
            return null;
        }
        let content = await response.text();
        const contentType = response.headers.get('content-type') || 'text/plain';
        const wpUrl = new URL(wpBaseUrl);
        const wpDomain = wpUrl.origin;
        const wpHost = wpUrl.host;
        const frontendUrlObj = new URL(frontendUrl);
        const frontendHost = frontendUrlObj.host;
        content = content.replace(new RegExp(escapeRegExp(wpDomain), 'g'), frontendUrl);
        content = content.replace(new RegExp(`//${escapeRegExp(wpHost)}`, 'g'), `//${frontendHost}`);
        return {
            content,
            contentType
        };
    } catch (error) {
        console.error(`Error fetching ${wpPath} from WordPress:`, error);
        return null;
    }
}
}),
"[project]/app/robots.txt/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/seo-proxy.ts [app-route] (ecmascript)");
;
;
const dynamic = 'force-dynamic';
async function GET() {
    const frontendUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFrontendUrl"])();
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyWordPressFile"])('/robots.txt', frontendUrl);
    let robotsContent;
    if (!result) {
        robotsContent = `User-agent: *
Allow: /

Sitemap: ${frontendUrl}/sitemap_index.xml
`;
    } else {
        robotsContent = result.content;
        if (!robotsContent.toLowerCase().includes('sitemap:')) {
            robotsContent = robotsContent.trimEnd() + `\n\nSitemap: ${frontendUrl}/sitemap_index.xml\n`;
        }
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](robotsContent, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__eb40cd01._.js.map