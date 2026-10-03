import { ReactNode } from 'react';

/**
 * Renders chapter text written in simple Markdown:
 *   ## Heading, ### Subheading, - bullet, 1. numbered, > quote, **bold**, *italic*
 * Used by the public chapter page and the admin preview, so both look the same.
 */
export default function ChapterContent({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] = [];

  const flushList = (key: string) => {
    if (!list) return;
    const Tag = list.ordered ? 'ol' : 'ul';
    blocks.push(
      <Tag
        key={key}
        className={`my-6 space-y-3 pl-6 text-[17px] leading-relaxed text-ink/85 ${list.ordered ? 'list-decimal' : 'list-disc'} marker:text-clay`}
      >
        {list.items.map((item, i) => (
          <li key={i} className="pl-1">
            {item.split('\n').map((part, j) => (
              <span key={j} className={j ? 'block mt-1' : ''}>
                {inline(part)}
              </span>
            ))}
          </li>
        ))}
      </Tag>
    );
    list = null;
  };

  const flushQuote = (key: string) => {
    if (!quote.length) return;
    blocks.push(
      <blockquote key={key} className="my-8 pl-6 border-l-2 border-clay font-display text-xl sm:text-2xl font-light italic leading-snug text-ink">
        {inline(quote.join(' '))}
      </blockquote>
    );
    quote = [];
  };

  content.split('\n').forEach((raw, idx) => {
    const line = raw.trim();
    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+\.\s+(.*)$/);
    const quoted = line.match(/^>\s?(.*)$/);

    if (!quoted) flushQuote(`q-${idx}`);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      if (list && list.ordered !== ordered) flushList(`l-${idx}`);
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet ?? numbered)![1]);
      return;
    }
    // Blank lines separate blocks but do not end a list (items are often spaced out).
    if (!line) return;
    // Indented continuation lines belong to the previous list item.
    if (list && /^\s{2,}/.test(raw)) {
      list.items[list.items.length - 1] += '\n' + line;
      return;
    }
    flushList(`l-${idx}`);

    if (quoted) {
      quote.push(quoted[1]);
    } else if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={idx} className="mt-10 mb-3 font-display text-xl sm:text-2xl tracking-tight text-ink">
          {inline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={idx} className="mt-12 mb-4 font-display text-2xl sm:text-3xl font-light tracking-tight text-ink">
          {inline(line.slice(3))}
        </h2>
      );
    } else if (line) {
      blocks.push(
        <p key={idx} className="mb-5 text-[17px] leading-[1.75] text-ink/85">
          {inline(line)}
        </p>
      );
    }
  });
  flushList('l-end');
  flushQuote('q-end');

  return <>{blocks}</>;
}

/** Bold (**text**) and italic (*text*) inside a line. */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
