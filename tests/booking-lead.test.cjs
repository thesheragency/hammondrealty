const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const { buildSync } = require("esbuild");

const root = path.resolve(__dirname, "..");
const routeCode = buildSync({
  entryPoints: [path.join(root, "app/api/submit-lead/route.ts")],
  bundle: true,
  platform: "node",
  format: "cjs",
  packages: "external",
  write: false,
}).outputFiles[0].text;

function loadRoute(upstreamOk = true) {
  const requests = [];
  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require,
    Buffer,
    process: { env: { FUB_API_KEY: "test-only-placeholder" } },
    console: { error() {} },
    fetch: async (url, options) => {
      requests.push({ url, payload: JSON.parse(options.body) });
      return { ok: upstreamOk, status: upstreamOk ? 200 : 503, text: async () => "Test upstream failure" };
    },
  };
  vm.runInNewContext(routeCode, context);
  return { POST: module.exports.POST, requests };
}

const booking = {
  formId: "book-consultation",
  name: "Booking QA",
  phone: "(202) 555-0100",
  privacyAccepted: true,
};

test("Name + Phone succeeds without email and preserves CRM notification routing", async () => {
  const { POST, requests } = loadRoute();
  const response = await POST({ json: async () => booking });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://api.followupboss.com/v1/events");
  assert.deepEqual(requests[0].payload, {
    source: "Blake Hammond Website - Connect Form",
    type: "General Inquiry",
    message: "",
    person: {
      firstName: "Booking",
      lastName: "QA",
      emails: [],
      phones: [{ value: "+12025550100" }],
      tags: ["Website Lead", "Connect Form"],
    },
  });
});

test("Booking still requires name, a valid phone, and Privacy Policy consent", async () => {
  for (const override of [
    { name: "" },
    { name: null },
    { phone: "" },
    { phone: "invalid" },
    { privacyAccepted: false },
    { privacyAccepted: undefined },
  ]) {
    const { POST, requests } = loadRoute();
    const response = await POST({ json: async () => ({ ...booking, ...override }) });
    assert.equal(response.status, 400);
    assert.equal(requests.length, 0);
  }
});

test("Previously loaded clients can still send a valid optional email", async () => {
  const { POST, requests } = loadRoute();
  const response = await POST({ json: async () => ({ ...booking, email: "booking-check@example.invalid" }) });
  assert.equal(response.status, 200);
  assert.deepEqual(requests[0].payload.person.emails, [{ value: "booking-check@example.invalid" }]);
});

test("Invalid supplied email is rejected and CRM failures are not reported as success", async () => {
  const invalid = loadRoute();
  assert.equal((await invalid.POST({ json: async () => ({ ...booking, email: "invalid" }) })).status, 400);
  assert.equal(invalid.requests.length, 0);
  const failed = loadRoute(false);
  assert.equal((await failed.POST({ json: async () => booking })).status, 502);
});

test("Other lead forms retain their existing email and message payload", async () => {
  const { POST, requests } = loadRoute();
  const response = await POST({
    json: async () => ({
      name: "Connect QA",
      email: "connect-check@example.invalid",
      phone: "(202) 555-0100",
      address: "Test property",
      notes: "Test note",
    }),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(requests[0].payload.person.emails, [{ value: "connect-check@example.invalid" }]);
  assert.equal(requests[0].payload.message, "Property Address: Test property\n\nTest note");
});

test("Consultation form omits email while retaining phone prefill and GTM success replay", () => {
  const page = readFileSync(path.join(root, "components/pages/BookConsultationPage.tsx"), "utf8");
  assert.ok(!page.includes("bc-email"));
  assert.ok(!page.includes("form.email"));
  assert.ok(!page.includes("email={"));
  for (const token of [
    'id="bc-name"',
    'id="bc-phone"',
    'id="bc-privacy"',
    'data-testid="button-bc-submit"',
    'params.set("location", phonePrefill)',
    'name={form.name}',
    'formElement.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))',
  ]) assert.ok(page.includes(token), `Missing preserved behavior: ${token}`);
  assert.ok(page.indexOf('if (!res.ok) throw new Error("submission_failed")') < page.indexOf('formElement.dispatchEvent'));
});
