import "server-only";
import { getWpAuthHeaders, getWordPressBaseUrl } from "@/lib/wp-auth";
import type { BookingGravityForm, BookingField } from "./embed";

export interface NativeGravityField {
  id: number;
  type: string;
  label: string;
  placeholder?: string;
  errorMessage?: string;
  choices?: { text: string; value: string }[];
}

export interface NativeGravityForm {
  id: number;
  title: string;
  description?: string;
  button?: { text?: string };
  fields: NativeGravityField[];
  bhBooking?: boolean;
  bhFubSource?: string;
  bhMessages?: BookingGravityForm["messages"];
}

export async function getNativeGravityForm(id: number): Promise<NativeGravityForm> {
  if (!Number.isSafeInteger(id) || id < 1) throw new Error("Invalid Gravity Form ID.");
  const response = await fetch(`${getWordPressBaseUrl()}/wp-json/gf/v2/forms/${id}`, {
    headers: getWpAuthHeaders(),
    next: { revalidate: 60, tags: ["wp-content", `gravity-form-${id}`] },
  });
  if (!response.ok) throw new Error("Unable to load Gravity Form.");
  const form = await response.json();
  if (!Array.isArray(form.fields)) throw new Error("Invalid Gravity Form definition.");
  return form;
}

export function bookingFormDefinition(form: NativeGravityForm): BookingGravityForm {
  const name = form.fields.find(f => f.type === "text" && f.id === 1);
  const phone = form.fields.find(f => f.type === "phone");
  const consent = form.fields.find(f => f.type === "checkbox" || f.type === "consent");
  if (!form.bhBooking || !name || !phone || !consent || !form.bhMessages) {
    throw new Error("The booking embed must select the migrated booking Gravity Form.");
  }
  const field = (f: NativeGravityField): BookingField => ({
    id: f.id, label: f.label, placeholder: f.placeholder || "",
    errorMessage: f.errorMessage || "", choices: f.choices || [],
  });
  return {
    id: Number(form.id), title: form.title, description: form.description || "",
    buttonText: form.button?.text || "", name: field(name), phone: field(phone),
    consent: field(consent), messages: form.bhMessages,
  };
}
