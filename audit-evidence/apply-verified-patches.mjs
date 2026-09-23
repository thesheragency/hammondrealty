// Audit utility only. Does not modify the frontend or WordPress schema.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const backup = JSON.parse(fs.readFileSync('audit-evidence/acf-prewrite-live-backup.json'));
const plan = JSON.parse(fs.readFileSync('audit-evidence/approved-patches.json'));
const base = process.env.WP_API_URL.replace(/\/graphql\/?$/, '');
const headers = {
  Authorization: `Basic ${Buffer.from(`${process.env.WP_USER}:${process.env.WP_APPLIC_PASS}`).toString('base64')}`,
  'Content-Type': 'application/json',
};
async function request(path, options = {}) {
  const res = await fetch(`${base}/wp-json/wp/v2/${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`WordPress request failed: ${res.status} ${path}`);
  return res.json();
}
function normalized(value, schema) {
  if (value === '' && schema?.type?.includes('integer')) return null;
  if (Array.isArray(value)) return value.map(v => normalized(v, schema?.items));
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, normalized(v, schema?.properties?.[k])]));
  return value;
}
const prepared = [];
for (const patch of plan) {
  const old = backup.objects.find(x => x.id === patch.id && x.type === 'page');
  assert(old, 'Page missing from pre-write backup');
  const current = await request(`pages/${patch.id}?context=edit`);
  assert.deepEqual(current.acf, old.acf, `Concurrent edit detected for ${patch.id}; abort`);
  const options = await request(`pages/${patch.id}`, { method: 'OPTIONS' });
  const schema = options.schema.properties.acf;
  const acf = normalized(patch.acf, schema);
  for (const key of Object.keys(acf)) assert(key in schema.properties, `Unknown field ${key}`);
  prepared.push({ ...patch, acf, oldAcf: old.acf, schema });
}
fs.writeFileSync('audit-evidence/validated-patches.json', JSON.stringify(prepared.map(
  ({ schema, ...x }) => x), null, 2));
if (!process.argv.includes('--apply')) {
  console.log(`Preflight passed for ${prepared.length} pages; no writes performed.`);
  process.exit(0);
}
const changes = [];
for (const patch of prepared) {
  // Re-check immediately before each write.
  const before = await request(`pages/${patch.id}?context=edit`);
  assert.deepEqual(before.acf, patch.oldAcf, `Concurrent edit detected for ${patch.id}; abort`);
  await request(`pages/${patch.id}`, { method: 'POST', body: JSON.stringify({ acf: patch.acf }) });
  const after = await request(`pages/${patch.id}?context=edit`);
  for (const [field, expected] of Object.entries(patch.acf)) {
    assert.deepEqual(normalized(after.acf[field], patch.schema.properties[field]), expected,
      `Readback mismatch ${patch.id}.${field}`);
    changes.push({ id: patch.id, field, old: before.acf[field], new: after.acf[field], verified: true });
  }
  for (const [field, value] of Object.entries(before.acf)) {
    if (!(field in patch.acf)) assert.deepEqual(after.acf[field], value,
      `Unrelated field changed ${patch.id}.${field}`);
  }
  fs.writeFileSync('audit-evidence/verified-change-log.json', JSON.stringify(changes, null, 2));
  console.log(`Page ${patch.id}: ${Object.keys(patch.acf).length} fields written and verified.`);
}