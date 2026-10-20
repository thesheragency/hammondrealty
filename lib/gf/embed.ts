/** Read the standard Gravity Forms shortcode stored in a page's ACF embed field. */
export function gravityFormId(embed: unknown, legacyId: number): number {
  if (embed === undefined || embed === null || embed === "") return legacyId;
  if (typeof embed !== "string") throw new Error("Invalid Gravity Form embed.");
  const match = embed.trim().match(/^\[gravityform\b[^\]]*\bid\s*=\s*["']?(\d+)["']?[^\]]*\]$/i);
  const id = Number(match?.[1]);
  if (!Number.isSafeInteger(id) || id < 1) throw new Error("Invalid Gravity Form embed.");
  return id;
}

export interface BookingGravityForm {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  name: BookingField;
  phone: BookingField;
  consent: BookingField;
  messages: { phoneRequired: string; submitError: string; submitting: string };
}

export interface BookingField {
  id: number;
  label: string;
  placeholder: string;
  errorMessage: string;
  choices: { text: string; value: string }[];
}

/** Render a CMS-managed consent link without injecting arbitrary HTML. */
export function consentCopy(html: string) {
  const plain = (s: string) => s.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"');
  const match = html.match(/^(.*?)<a\b[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>(.*)$/i);
  if (!match || !/^(\/(?!\/)|https:\/\/)/i.test(match[2])) {
    return { prefix: plain(html), href: "", label: "", suffix: "" };
  }
  return { prefix: plain(match[1]), href: match[2], label: plain(match[3]), suffix: plain(match[4]) };
}
