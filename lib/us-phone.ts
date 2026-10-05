// Accept common US formatting and an optional +1 country prefix.
export function normalizeUsPhone(value: unknown): string | null {
  if (typeof value !== "string" || !/^[\d\s()+.-]+$/.test(value)) return null;
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  return `+1${digits}`;
}
