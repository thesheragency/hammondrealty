const MINORS = new Set([
  "a","an","the","and","but","or","nor","for","so","yet",
  "at","by","in","of","on","to","up","as","is","it","via",
]);

function capFirst(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function tc(str: string | null | undefined): string {
  if (!str) return "";
  const words = str.split(" ");
  return words
    .map((word, i) => {
      if (i === 0 || i === words.length - 1) return capFirst(word);
      return MINORS.has(word.toLowerCase()) ? word.toLowerCase() : capFirst(word);
    })
    .join(" ");
}
