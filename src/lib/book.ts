import { useEffect, useState } from 'react';
import bookData from '../content/book.json';
import { supabase } from './supabase.ts';

/** Content blocks that make up a chapter body (see the developer brief, section 5). */
export type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'steps'; items: { title: string; text: string }[] };

export interface Chapter {
  number: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  dmKeyword?: string | null;
  week?: number | null;
  epigraph?: string | null;
  summary?: string | null;
  lead?: string | null;
  body: Block[];
  takeaways: string[];
  exercise?: { title: string; steps: string[] } | null;
  nextChapter?: { title: string; text: string } | null;
  readingTimeMinutes?: number | null;
  status: 'published' | 'coming_soon';
  publishedAt?: string | null;
}

export const BOOK = {
  title: bookData.book.title,
  subtitle: bookData.book.subtitle,
  author: bookData.book.author,
  publisher: bookData.book.publisher,
  edition: bookData.book.edition,
  intro: bookData.book.intro as string[],
  pdf: '/book/Where_Strategy_Meets_Soul_Ch1-6_Web_Edition.pdf',
  portrait: '/book/author-portrait.png'
};

/** The chapters bundled with the site, used if the database cannot be reached. */
const BUNDLED: Chapter[] = (bookData.chapters as any[]).map((c) => ({
  number: c.number,
  slug: c.slug,
  title: c.title,
  subtitle: c.subtitle ?? null,
  dmKeyword: c.dmKeyword ?? null,
  week: c.week ?? null,
  epigraph: c.epigraph ?? null,
  summary: c.summary ?? null,
  lead: c.lead ?? null,
  body: (c.body ?? []) as Block[],
  takeaways: c.takeaways ?? [],
  exercise: c.exercise ?? null,
  nextChapter: c.nextChapter ?? null,
  readingTimeMinutes: c.readingTimeMinutes ?? null,
  status: c.status === 'published' ? 'published' : 'coming_soon'
}));

interface Row {
  number: number;
  slug: string;
  title: string;
  subtitle: string | null;
  dm_keyword: string | null;
  week: number | null;
  epigraph: string | null;
  summary: string | null;
  lead: string | null;
  body: Block[];
  takeaways: string[];
  exercise: Chapter['exercise'];
  next_chapter: Chapter['nextChapter'];
  reading_time_minutes: number | null;
  status: 'published' | 'coming_soon';
  published_at: string | null;
}

export function fromRow(r: Row): Chapter {
  return {
    number: r.number,
    slug: r.slug,
    title: r.title,
    subtitle: r.subtitle,
    dmKeyword: r.dm_keyword,
    week: r.week,
    epigraph: r.epigraph,
    summary: r.summary,
    lead: r.lead,
    body: r.body ?? [],
    takeaways: r.takeaways ?? [],
    exercise: r.exercise,
    nextChapter: r.next_chapter,
    readingTimeMinutes: r.reading_time_minutes,
    status: r.status,
    publishedAt: r.published_at
  };
}

let cache: Chapter[] | null = null;
let inflight: Promise<Chapter[]> | null = null;

/** Loads the book from the database (as managed in the admin dashboard). */
export function loadBook(): Promise<Chapter[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = Promise.resolve(supabase.rpc('get_book_chapters'))
      .then(({ data, error }) => {
        if (error || !Array.isArray(data) || data.length === 0) throw error ?? new Error('No chapters returned');
        cache = (data as Row[]).map(fromRow);
        return cache;
      })
      .catch((err) => {
        console.warn('Using the book bundled with the site:', err);
        inflight = null;
        return BUNDLED;
      });
  }
  return inflight;
}

export function useBook() {
  const [chapters, setChapters] = useState<Chapter[]>(cache ?? BUNDLED);
  const [loading, setLoading] = useState(!cache);
  useEffect(() => {
    let alive = true;
    loadBook().then((list) => {
      if (!alive) return;
      setChapters(list);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);
  return { chapters, loading };
}

/** Words in a chapter, for the 200-words-per-minute reading-time estimate. */
export function wordCount(c: Pick<Chapter, 'lead' | 'body' | 'takeaways' | 'exercise'>) {
  const parts: string[] = [c.lead ?? ''];
  for (const b of c.body) {
    if (b.type === 'steps') b.items.forEach((i) => parts.push(i.title, i.text));
    else parts.push(b.text);
  }
  parts.push(...c.takeaways, c.exercise?.title ?? '', ...(c.exercise?.steps ?? []));
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(c: Parameters<typeof wordCount>[0] & { readingTimeMinutes?: number | null }) {
  return c.readingTimeMinutes || Math.max(1, Math.round(wordCount(c) / 200));
}

export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
