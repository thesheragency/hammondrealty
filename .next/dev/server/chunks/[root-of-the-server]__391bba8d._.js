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
"[project]/lib/wp-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getNginxBasicAuthHeaders",
    ()=>getNginxBasicAuthHeaders,
    "getWordPressBaseUrl",
    ()=>getWordPressBaseUrl,
    "getWpAppPasswordHeaders",
    ()=>getWpAppPasswordHeaders,
    "getWpAuthHeaders",
    ()=>getWpAuthHeaders
]);
function shouldUseNginxBasicAuth() {
    const enabled = process.env.WP_BASIC_AUTH_ENABLED;
    if (enabled === 'false' || enabled === '0') {
        return false;
    }
    return !!(process.env.WP_AUTH_USER && process.env.WP_AUTH_PASSWORD);
}
function getNginxBasicAuthHeaders() {
    if (!shouldUseNginxBasicAuth()) {
        return {};
    }
    const credentials = Buffer.from(`${process.env.WP_AUTH_USER}:${process.env.WP_AUTH_PASSWORD}`).toString('base64');
    return {
        Authorization: `Basic ${credentials}`
    };
}
function getWpAppPasswordHeaders() {
    const user = process.env.WP_USER;
    const pass = process.env.WP_APPLIC_PASS;
    if (!user || !pass) {
        return {};
    }
    const credentials = Buffer.from(`${user}:${pass}`).toString('base64');
    return {
        Authorization: `Basic ${credentials}`
    };
}
function getWpAuthHeaders() {
    const appHeaders = getWpAppPasswordHeaders();
    if (appHeaders.Authorization) {
        return appHeaders;
    }
    return getNginxBasicAuthHeaders();
}
function getWordPressBaseUrl() {
    const wpApiUrl = process.env.WP_API_URL || '';
    return wpApiUrl.replace(/\/graphql\/?$/, '');
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wp-auth.ts [app-route] (ecmascript)");
;
;
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
    const wpBaseUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWordPressBaseUrl"])();
    if (!wpBaseUrl || wpBaseUrl === '') {
        return null;
    }
    try {
        const authHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWpAuthHeaders"])();
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
"[project]/app/sitemap.xml/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
    let result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyWordPressFile"])('/sitemap.xml', frontendUrl);
    if (!result) {
        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyWordPressFile"])('/sitemap_index.xml', frontendUrl);
    }
    if (!result) {
        result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$seo$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyWordPressFile"])('/wp-sitemap.xml', frontendUrl);
    }
    if (!result) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]('Sitemap not found', {
            status: 404,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](result.content, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__391bba8d._.js.map