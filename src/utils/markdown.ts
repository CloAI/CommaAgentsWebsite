import { marked } from "marked";

/**
 * Render a string of inline markdown to an HTML string.
 *
 * @param content - Inline markdown (no block-level wrapping).
 * @example
 * ```ts
 * markdownify("Comma **Agents**"); // "Comma <strong>Agents</strong>"
 * ```
 */
export function markdownify(content: string): string {
  if (!content) return "";
  return marked.parseInline(content) as string;
}

/**
 * Strip HTML tags, collapse blank lines, and decode common HTML entities.
 * Used to produce safe plain-text values for meta tags and titles.
 *
 * @param content - Source text that may contain HTML or entities.
 */
export function plainify(content: string): string {
  if (!content) return "";
  const withoutTags = content.replace(/<\/?[^>]+(>|$)/gm, "");
  const withoutBlankLines = withoutTags.replace(/[\r\n]\s*[\r\n]/gm, "");
  return decodeHtmlEntities(withoutBlankLines);
}

const htmlEntities: Readonly<Record<string, string>> = {
  "&nbsp;": " ",
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
};

/** Replace the small set of HTML entities that survive tag stripping. */
function decodeHtmlEntities(htmlWithEntities: string): string {
  return htmlWithEntities.replace(
    /(&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity) => htmlEntities[entity] ?? entity,
  );
}
