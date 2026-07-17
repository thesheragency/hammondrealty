function capFirst(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function tc(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => {
      const result = capFirst(word);
      // Capitalize the first letter after any embedded newline within a word token
      // e.g. "Service\r\nfrom" → "Service\r\nFrom"
      return result.replace(/([\r\n]+)([a-z])/g, (_, nl, char) => nl + char.toUpperCase());
    })
    .join(" ");
}
