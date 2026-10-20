import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gravityFormId, consentCopy } from "../lib/gf/embed";
import { gravityLead } from "../lib/gf/lead";
import { normalizeUsPhone } from "../lib/us-phone";

assert.equal(gravityFormId('[gravityform id="9" title="false" ajax="true"]', 1), 9);
assert.equal(gravityFormId("[gravityform id='2']", 1), 2);
assert.equal(gravityFormId(undefined, 4), 4);
for (const input of ["<script>bad</script>", "[gravityform id=\"no\"]", "[other id=\"2\"]"]) {
  assert.throws(() => gravityFormId(input, 1));
}
assert.deepEqual(consentCopy('I accept the <a href="/privacy-policy">Privacy Policy</a>.'), {
  prefix: "I accept the ", href: "/privacy-policy", label: "Privacy Policy", suffix: ".",
});
assert.equal(consentCopy('<a href="javascript:alert(1)">Privacy Policy</a>').href, "");
assert.equal(consentCopy('<a href="//unsafe.example">Privacy</a>').href, "");
const lead = gravityLead([
  { id: 1, type: "text", label: "Name" }, { id: 2, type: "email", label: "Email" },
  { id: 3, type: "phone", label: "Phone" }, { id: 4, type: "textarea", label: "Message" },
  { id: 5, type: "text", label: "Property Address" },
], { "1": "Marked Form Test", "2": "test@example.invalid", "3": "2025550101", "4": "\u200b", "5": "Test property" }, "Existing source");
assert.equal(lead.name, "Marked Form Test");
assert.equal(lead.address, "Test property");
assert.equal(lead.notes, "");
assert.equal(lead.source, "Existing source");
assert.equal(normalizeUsPhone("(202) 555-0101"), "+12025550101");
assert.equal(normalizeUsPhone("bad"), null);
const booking = readFileSync("components/pages/BookConsultationPage.tsx", "utf8");
assert(booking.includes('fetch("/api/forms/submit-rest"'));
assert(!booking.includes('fetch("/api/submit-lead"'));
assert(!booking.includes('formEmailLabel'));
assert(booking.indexOf('!result.crm_synced') < booking.indexOf('dispatchEvent(new Event("submit"'));
assert(booking.indexOf('dispatchEvent(new Event("submit"') < booking.indexOf('setStep("calendar")'));
const rest = readFileSync("app/api/forms/submit-rest/route.ts", "utf8");
assert(rest.includes("await submitWebsiteLead"));
assert(!rest.includes("sendFormNotification("));
const widget = readFileSync("components/CalendlyInlineWidget.tsx", "utf8");
assert(widget.includes("initInlineWidget"));
console.log("PASS: embed parsing, consent link safety, lead mapping, US phone validation, success-only booking tracking, calendar flow and native notification ownership.");
