/**
 * Minimal inline formatter for revision-note text.
 * Supports `code` and **bold** only — deliberately not a markdown parser,
 * since the note data is authored in this repo and fully trusted.
 */
const TOKEN = /(`[^`]+`|\*\*[^*]+\*\*)/g;

export default function RichText({ text }) {
  const parts = String(text).split(TOKEN).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
