import type { WebsiteLead } from "@/lib/fub";

export function gravityLead(
  fields: { id: number; type: string; label: string }[],
  values: Record<string, string>,
  source: string,
  isBooking = false,
): WebsiteLead {
  const lead: WebsiteLead = { name: "", email: "", phone: "", address: "", notes: "", source, isBooking };
  for (const field of fields) {
    const value = (values[String(field.id)] || "").replaceAll("\u200b", "").trim();
    const type = field.type.toLowerCase();
    const label = field.label.toLowerCase();
    if (type === "name" || (type === "text" && label.includes("name"))) lead.name = value;
    else if (type === "email") lead.email = value;
    else if (type === "phone") lead.phone = value;
    else if (type === "address" || (type === "text" && label.includes("address"))) lead.address = value;
    else if (type === "textarea") lead.notes = value;
  }
  return lead;
}
