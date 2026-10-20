import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { getWpAuthHeaders } from "../../lib/wp-auth";
import { gravityFormId } from "../../lib/gf/embed";

const cms = "https://cms.hammondrealty.net/wp-json";
async function wp(path: string) {
  const response = await fetch(cms + path, { headers: getWpAuthHeaders() });
  assert.equal(response.status, 200, `WordPress read failed: ${path}`);
  return response.json();
}

async function main() {
  if (!process.argv.includes("--send-tests")) throw new Error("Pass --send-tests only with permission to send test notifications and CRM leads.");
  // Fail before sending anything if the temporary administrator-only mail probe
  // is not installed. A later re-run must not send emails without mail evidence.
  await wp("/bh-form-check/v1/results");
  const base = `https://${process.env.REPLIT_DEV_DOMAIN}`;
  const resume = process.argv.includes("--resume");
  const marker = resume
    ? (await readFile("/tmp/gravity-test-marker", "utf8")).trim()
    : `BH_GF_TEST_${Date.now()}`;
  if (!resume) await writeFile("/tmp/gravity-test-marker", marker);
  const pages = ["connect", "home-value-analysis", "buyer", "seller", "book-consultation"];
  const definitions: { slug: string; form: any }[] = [];
  for (const slug of pages) {
    const page = (await wp(`/wp/v2/pages?slug=${slug}&_fields=id,acf`))[0];
    const id = gravityFormId(page.acf.gform_embed, 0);
    const form = await wp(`/gf/v2/forms/${id}`);
    assert(form.bhFubSource, `Missing CRM routing: ${slug}`);
    if (slug !== "book-consultation") {
      const response = await fetch(`${base}/api/forms/submit?formId=${id}`);
      assert.equal(response.status, 200);
      assert((await response.json()).form?.formFields?.nodes?.length, `Missing frontend field schema: ${slug}`);
    } else {
      const response = await fetch(`${base}/book-consultation`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert(html.includes(`data-gravity-form-id="${id}"`));
      assert(html.includes(form.button.text));
      assert(!html.includes('data-testid="input-bc-email"'));
    }
    definitions.push({ slug, form });
  }
  function dataFor(form: any, index: number) {
    const data = new FormData();
    data.set("formId", String(form.id));
    for (const field of form.fields) {
      const type = field.type.toLowerCase();
      const key = `input_${field.id}`;
      if (type === "text") data.set(key, field.label.toLowerCase().includes("name") ? `${marker} ${index}` : "AUTHORIZED WEBSITE TEST — no property request");
      else if (type === "email") data.set(key, `replit-form-test-${index}@example.invalid`);
      else if (type === "phone") data.set(key, `202555010${index}`);
      else if (type === "textarea") data.set(key, `${marker}: authorized notification/CRM test. Do not contact.`);
      else if (type === "checkbox") {
        for (const [i, choice] of (field.choices || []).entries()) {
          data.set(`${key}.${i + 1}`, choice.value || choice.text);
        }
      }
    }
    return data;
  }
  // Invalid/unchecked booking attempts and invalid standard forms must not create leads.
  const booking = definitions[4].form;
  for (const fault of ["phone", "consent"]) {
    const data = dataFor(booking, 5);
    if (fault === "phone") data.set(`input_${booking.fields.find((f: any) => f.type === "phone").id}`, "invalid");
    else data.delete(`input_${booking.fields.find((f: any) => f.type === "checkbox").id}.1`);
    const response = await fetch(`${base}/api/forms/submit-rest`, { method: "POST", body: data });
    assert.equal(response.status, 400, `Invalid booking ${fault} was accepted.`);
  }
  const bad = dataFor(definitions[0].form, 1);
  bad.delete("input_1");
  const rejected = await fetch(`${base}/api/forms/submit-rest`, { method: "POST", body: bad });
  assert.equal(rejected.status, 400, "Gravity Forms required-name validation must reject the submission.");

  const results: { page: string; formId: number; entryId: number; crmAccepted: boolean; mailAccepted?: boolean; transport?: string }[] =
    resume ? JSON.parse(await readFile("/tmp/gravity-submission-test-report.json", "utf8")) : [];
  for (const [index, { slug, form }] of definitions.entries()) {
    if (results.some(result => result.page === slug)) {
      console.log(`${slug}: retaining the already-confirmed test; no duplicate email sent.`);
      continue;
    }
    const response = await fetch(`${base}/api/forms/submit-rest`, {
      method: "POST", body: dataFor(form, index + 1),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(`${slug}: ${response.status} ${result.error || "submission failed"}`);
    assert(result.is_valid && result.crm_synced, `${slug}: incomplete success response.`);
    // Native GF submissions do not promise an entry_id in their public response.
    // Independently locate the unique marked entry through the authenticated API.
    const search = encodeURIComponent(JSON.stringify({ field_filters: [{ key: "1", value: `${marker} ${index + 1}`, operator: "is" }] }));
    const entries = await wp(`/gf/v2/forms/${form.id}/entries?search=${search}&paging[page_size]=2`);
    assert.equal(entries.entries.length, 1, `${slug}: test entry missing or duplicated.`);
    const entry = entries.entries[0];
    assert.equal(Number(entry.form_id), Number(form.id));
    assert(String(entry["1"]).includes(marker), "Saved entry must be the marked test.");
    results.push({ page: slug, formId: Number(form.id), entryId: Number(entry.id), crmAccepted: result.crm_synced });
    await writeFile("/tmp/gravity-submission-test-report.json", JSON.stringify(results, null, 2));
    console.log(`${slug}: saved Gravity Forms entry ${entry.id}; CRM accepted.`);
  }
  const evidence = await wp("/bh-form-check/v1/results");
  for (const result of results) {
    const rows = evidence.mail.filter((row: any) => row.entry_id === result.entryId);
    assert(rows.length > 0, `${result.page}: no native mail result was recorded.`);
    assert(rows.every((row: any) => row.accepted), `${result.page}: native mail transport rejected a notification.`);
    result.mailAccepted = true;
    result.transport = rows[0].transport;
    console.log(`${result.page}: native notification accepted by ${result.transport}.`);
  }
  await writeFile("/tmp/gravity-submission-test-report.json", JSON.stringify(results, null, 2));
  console.log("PASS: five saved entries, five CRM acknowledgements, native notification success for every form, and invalid submissions rejected.");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
