import { useEffect, useState } from 'react';
import { CHAPTERS } from '../data.ts';
import { BlogChapter } from '../types.ts';
import { supabase } from './supabase.ts';

interface PublicChapterRow {
  slug: string;
  chapter_number: number;
  title: string;
  description: string;
  status: 'PUBLISHED' | 'COMING';
  content: string | null;
  published_at: string | null;
}

function toChapter(row: PublicChapterRow): BlogChapter {
  return {
    slug: row.slug,
    chapterNumber: row.chapter_number,
    title: row.title,
    description: row.description,
    status: row.status,
    content: row.content ?? undefined,
    publishedAt: row.published_at ?? undefined
  };
}

let cache: BlogChapter[] | null = null;
let inflight: Promise<BlogChapter[]> | null = null;

/** Loads the book's chapters from the database, as published from the admin dashboard. */
export function loadChapters(): Promise<BlogChapter[]> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = Promise.resolve(supabase.rpc('get_public_chapters'))
      .then(({ data, error }) => {
        if (error || !Array.isArray(data) || data.length === 0) throw error ?? new Error('No chapters returned');
        cache = (data as PublicChapterRow[]).map(toChapter);
        return cache;
      })
      .catch((err) => {
        // If the database cannot be reached, fall back to the chapters bundled with the site.
        console.warn('Using bundled chapters:', err);
        inflight = null;
        return CHAPTERS;
      });
  }
  return inflight;
}

export function useChapters() {
  const [chapters, setChapters] = useState<BlogChapter[]>(cache ?? CHAPTERS);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let alive = true;
    loadChapters().then((list) => {
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
