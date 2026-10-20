import { writeFile } from "node:fs/promises";
import { getWpAuthHeaders } from "../../lib/wp-auth";

const base = "https://cms.hammondrealty.net/wp-json";
async function request(path: string, method = "GET", body?: unknown): Promise<any> {
  const response = await fetch(base + path, {
    method, headers: { ...getWpAuthHeaders(), "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`${method} ${path}: ${response.status} ${data.code || ""}`);
  return data;
}

async function main() {
  if (!process.argv.includes("--apply")) throw new Error("Pass --apply to run the authorized additive CMS migration.");
  const snippets = await request("/code-snippets/v1/snippets");
  const snippet = snippets.find((s: any) => s.name === "Register Page ACF Field Groups" && s.active);
  if (!snippet) throw new Error("Page ACF registration not found.");
  const original = await request(`/code-snippets/v1/snippets/${snippet.id}`);
  await writeFile("/tmp/gravity-migration-acf-backup.json", JSON.stringify(original));
  const bookingPage = (await request("/wp/v2/pages?slug=book-consultation&_fields=id,acf"))[0];
  const a = bookingPage.acf;
  const template = await request("/gf/v2/forms/1");
  const forms = Object.values(await request("/gf/v2/forms")) as any[];
  let booking = forms.find(f => f.title === a.form_heading && Number(f.id) > 4);
  if (!booking) {
    const notifications = Object.fromEntries(Object.entries(template.notifications).map(([key, raw]: [string, any]) => [
      key, { ...raw, replyTo: "", subject: "New booking inquiry — {form_title}", isActive: true },
    ]));
    const choice = `${a.form_privacy_prefix} <a href="${a.form_privacy_link}">${a.form_privacy_link_label}</a>.`;
    const definition = {
      title: a.form_heading, description: a.form_intro, labelPlacement: "top_label",
      button: { type: "text", text: a.schedule_text }, is_active: true,
      fields: [
        { id: 1, type: "text", label: a.form_name_label, placeholder: a.form_name_placeholder, isRequired: true, errorMessage: a.form_name_required_error },
        { id: 2, type: "phone", label: a.form_phone_label, placeholder: a.form_phone_placeholder, isRequired: true, phoneFormat: "international", errorMessage: a.form_phone_invalid_error },
        { id: 3, type: "checkbox", label: "Privacy Policy", isRequired: true, errorMessage: a.form_privacy_error,
          choices: [{ text: choice, value: "I accept the Privacy Policy", isSelected: false }],
          inputs: [{ id: "3.1", label: choice }] },
      ],
      notifications,
      confirmations: { default: { id: "default", name: "Calendar", type: "message", isDefault: true, isActive: true, message: "Your information was submitted successfully. Please choose a time below." } },
      bhBooking: true,
      bhFubSource: "Blake Hammond Website - Connect Form",
      bhMessages: { phoneRequired: a.form_phone_required_error, submitError: a.form_submit_error, submitting: a.form_submitting_label },
    };
    const result = await request("/gf/v2/forms", "POST", definition);
    const id = Number(result.id);
    if (!id) throw new Error("New Gravity Form ID not returned.");
    booking = await request(`/gf/v2/forms/${id}`);
  }
  const configs = [
    { slug: "connect", group: "group_bh_get_in_touch", id: 1, source: "Connect Form" },
    { slug: "home-value-analysis", group: "group_bh_home_value", id: 2, source: "Home Value Analysis Form" },
    { slug: "buyer", group: "group_bh_buying", id: 3, source: "Buyer Form" },
    { slug: "seller", group: "group_bh_selling", id: 4, source: "Seller Form" },
    { slug: "book-consultation", group: "group_bh_book_consultation", id: Number(booking.id), source: "Connect Form" },
  ];
  let code = original.code as string;
  for (const c of configs) {
    const form = await request(`/gf/v2/forms/${c.id}`);
    await writeFile(`/tmp/gravity-migration-form-${c.id}-backup.json`, JSON.stringify(form));
    // Persist source on the form so CRM routing completes server-side before navigation.
    form.bhFubSource = `Blake Hammond Website - ${c.source}`;
    await request(`/gf/v2/forms/${c.id}`, "PUT", form);
    const begin = code.indexOf(`'key'=>'${c.group}'`);
    if (begin < 0) throw new Error(`Missing group ${c.group}`);
    const next = code.indexOf("acf_add_local_field_group", begin);
    const end = next < 0 ? code.length : next;
    const group = code.slice(begin, end);
    if (!group.includes(`'key'=>'${c.group}_gform_embed'`)) {
      const field = `array('key'=>'${c.group}_gform_embed', 'label'=>'Gravity Form Embed', 'name'=>'gform_embed', 'type'=>'textarea', 'instructions'=>'Paste the Gravity Forms shortcode. Fields, validation, buttons and notifications are managed in Gravity Forms. Legacy form fields are retained until migration approval.', 'default_value'=>'[gravityform id="${c.id}" title="false" description="false" ajax="true"]', 'rows'=>2, 'new_lines'=>'', 'show_in_rest'=>1, 'show_in_graphql'=>1, 'graphql_field_name'=>'gformEmbed'), `;
      const updated = group.replace(/'fields'\s*=>\s*array\(/, match => match + field);
      if (updated === group) throw new Error(`No fields array in ${c.group}`);
      code = code.slice(0, begin) + updated + code.slice(end);
    }
  }
  if (code !== original.code) {
    await request(`/code-snippets/v1/snippets/${snippet.id}`, "PUT", { ...original, code });
  }
  // Write only the new metadata; existing required values are retained when necessary.
  for (const c of configs) {
    const page = (await request(`/wp/v2/pages?slug=${c.slug}&_fields=id,acf`))[0];
    const embed = `[gravityform id="${c.id}" title="false" description="false" ajax="true"]`;
    const fields = { gform_embed: embed };
    await request(`/wp/v2/pages/${page.id}`, "POST", { acf: fields });
    const check = await request(`/wp/v2/pages/${page.id}?_fields=acf`);
    if (check.acf.gform_embed !== embed) throw new Error(`Embed verification failed: ${c.slug}`);
    console.log(`${c.slug}: Gravity Form ${c.id}; legacy ACF retained.`);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
