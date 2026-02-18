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
"[project]/lib/gf/queries.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET_GF_FORM_QUERY",
    ()=>GET_GF_FORM_QUERY,
    "GF_FORM_FIELDS_FRAGMENT",
    ()=>GF_FORM_FIELDS_FRAGMENT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$entrypoints$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/entrypoints/main.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/legacy/functions/gql.js [app-route] (ecmascript)");
;
const GF_FORM_FIELDS_FRAGMENT = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gql"]`
  fragment GfFormFields on GfForm {
    databaseId
    title
    description
    cssClass
    labelPlacement
    descriptionPlacement
    submitButton {
      text
      type
    }
    confirmations {
      id
      isDefault
      message
      type
      url
    }
    pagination {
      type
      pageNames
      progressbarCompletionText
    }
    formFields(first: 500) {
      nodes {
        id
        databaseId
        type
        layoutGridColumnSpan
        layoutSpacerGridColumnSpan
        pageNumber
        visibility
        displayOnly
        inputType
        ... on GfFieldWithLabelSetting {
          label
        }
        ... on GfFieldWithDescriptionSetting {
          description
        }
        ... on GfFieldWithPlaceholderSetting {
          placeholder
        }
        ... on GfFieldWithDefaultValueSetting {
          defaultValue
        }
        ... on GfFieldWithCssClassSetting {
          cssClass
        }
        ... on GfFieldWithMaxLengthSetting {
          maxLength
        }
        ... on GfFieldWithRulesSetting {
          isRequired
        }
        ... on GfFieldWithChoicesSetting {
          choices {
            text
            value
          }
        }
        ... on GfFieldWithConditionalLogicSetting {
          conditionalLogic {
            actionType
            logicType
            rules {
              fieldId
              operator
              value
            }
          }
        }
        ... on TextField {
          inputType
        }
        ... on TextAreaField {
          inputType
        }
        ... on EmailField {
          hasEmailConfirmation
        }
        ... on NumberField {
          rangeMin
          rangeMax
        }
        ... on PhoneField {
          phoneFormat
        }
        ... on SelectField {
          defaultValue
        }
        ... on RadioField {
          hasOtherChoice
        }
        ... on CheckboxField {
          hasSelectAll
        }
        ... on DateField {
          dateFormat
          dateType
          calendarIconType
        }
        ... on TimeField {
          timeFormat
          inputs {
            id
            label
            placeholder
          }
        }
        ... on FileUploadField {
          allowedExtensions
          maxFileSize
          maxFiles
        }
        ... on NameField {
          inputs {
            id
            label
            name
            placeholder
            isHidden
          }
        }
        ... on AddressField {
          inputs {
            id
            label
            name
            placeholder
            isHidden
          }
        }
        ... on HtmlField {
          content
        }
        ... on SectionField {
          label
          description
        }
      }
    }
  }
`;
const GET_GF_FORM_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gql"]`
  ${GF_FORM_FIELDS_FRAGMENT}
  query GetGfForm($formId: ID!, $idType: FormIdTypeEnum = DATABASE_ID) {
    gfForm(id: $formId, idType: $idType) {
      ...GfFormFields
    }
  }
`;
}),
"[project]/lib/gf/mutations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SUBMIT_GF_FORM_MUTATION",
    ()=>SUBMIT_GF_FORM_MUTATION
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$entrypoints$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/entrypoints/main.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/legacy/functions/gql.js [app-route] (ecmascript)");
;
const SUBMIT_GF_FORM_MUTATION = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gql"]`
  mutation SubmitGfForm($formId: ID!, $fieldValues: [FormFieldValuesInput]!, $saveAsDraft: Boolean) {
    submitGfForm(
      input: {
        id: $formId
        fieldValues: $fieldValues
        saveAsDraft: $saveAsDraft
      }
    ) {
      confirmation {
        message
        type
        url
      }
      errors {
        id
        message
      }
      entry {
        id
        ... on GfSubmittedEntry {
          databaseId
          dateCreated
        }
      }
    }
  }
`;
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
"[project]/app/api/forms/submit/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$entrypoints$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/entrypoints/main.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$classes$2f$GraphQLClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/legacy/classes/GraphQLClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/graphql-request/build/legacy/functions/gql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gf$2f$queries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gf/queries.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gf$2f$mutations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gf/mutations.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wp-auth.ts [app-route] (ecmascript)");
;
;
;
;
;
const CHECK_GF_SCHEMA_QUERY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$functions$2f$gql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gql"]`
  query CheckGfSchema {
    __schema {
      types {
        name
      }
    }
  }
`;
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;
function getClientIp(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return request.headers.get('x-real-ip') || 'unknown';
}
function checkRateLimit(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW
        });
        return true;
    }
    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }
    record.count++;
    return true;
}
function getWpClient() {
    const wpApiUrl = process.env.WP_API_URL;
    if (!wpApiUrl) {
        throw new Error('WP_API_URL environment variable is not set');
    }
    const headers = {
        'Content-Type': 'application/json',
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wp$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWpAuthHeaders"])()
    };
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$graphql$2d$request$2f$build$2f$legacy$2f$classes$2f$GraphQLClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GraphQLClient"](wpApiUrl, {
        headers
    });
}
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('formId');
    if (!formId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'formId is required'
        }, {
            status: 400
        });
    }
    try {
        const client = getWpClient();
        const response = await client.request(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gf$2f$queries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GET_GF_FORM_QUERY"], {
            formId,
            idType: 'DATABASE_ID'
        });
        if (!response.gfForm) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Form not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            form: response.gfForm
        });
    } catch (error) {
        console.error('Error fetching Gravity Form:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch form'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many submissions. Please try again later.'
        }, {
            status: 429
        });
    }
    try {
        const body = await request.json();
        const { formId, fieldValues, gf_hp } = body;
        if (gf_hp) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                confirmation: {
                    message: 'Thank you for your submission.',
                    type: 'MESSAGE'
                },
                entry: null,
                errors: null
            });
        }
        if (!formId || !Array.isArray(fieldValues)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'formId and fieldValues are required'
            }, {
                status: 400
            });
        }
        const client = getWpClient();
        const response = await client.request(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gf$2f$mutations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SUBMIT_GF_FORM_MUTATION"], {
            formId: String(formId),
            fieldValues,
            saveAsDraft: false
        });
        const { submitGfForm } = response;
        if (submitGfForm.errors && submitGfForm.errors.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                errors: submitGfForm.errors,
                confirmation: null,
                entry: null
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            confirmation: submitGfForm.confirmation,
            entry: submitGfForm.entry,
            errors: null
        });
    } catch (error) {
        console.error('Error submitting Gravity Form:', error);
        // Extract GraphQL error messages if available
        let errorMessage = 'Failed to submit form';
        if (error && typeof error === 'object' && 'response' in error) {
            const gqlError = error;
            if (gqlError.response?.errors?.length) {
                errorMessage = gqlError.response.errors.map((e)=>e.message).join(', ');
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a301782c._.js.map