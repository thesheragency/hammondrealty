module.exports = [
"[project]/lib/wordpress.ts [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_f897ca29._.js",
  "server/chunks/ssr/lib_wordpress_ts_251326cf._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/lib/wordpress.ts [app-rsc] (ecmascript)");
    });
});
}),
];