import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../src/lib/supabase.ts';
import type { Block } from '../src/lib/book.ts';

export type ChapterStatus = 'draft' | 'coming_soon' | 'scheduled' | 'published';

/** A row of the book_chapters table. */
export interface Chapter {
  id: string;
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
  exercise: { title: string; steps: string[] } | null;
  next_chapter: { title: string; text: string } | null;
  reading_time_minutes: number | null;
  status: ChapterStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const PLATFORMS = ['LinkedIn', 'Instagram', 'X (Twitter)', 'Facebook', 'TikTok', 'YouTube', 'WhatsApp', 'Newsletter', 'Blog / Website'] as const;
export type Platform = (typeof PLATFORMS)[number];

export type PostStatus = 'idea' | 'draft' | 'scheduled' | 'published';

export interface CalendarItem {
  id: string;
  title: string;
  content: string;
  platform: Platform;
  status: PostStatus;
  scheduled_at: string | null;
  tags: string[];
  cta_url: string | null;
  chapter_id: string | null;
  created_at: string;
  updated_at: string;
}

/** Whether a chapter is visible to readers right now. */
export function isLive(c: Pick<Chapter, 'status' | 'published_at'>) {
  return c.status === 'published' || (c.status === 'scheduled' && !!c.published_at && new Date(c.published_at) <= new Date());
}

/**
 * Loads a table and keeps it in sync: changes made on any device (or in another
 * tab) arrive instantly through Supabase Realtime.
 */
export function useLiveTable<T extends { id: string }>(table: 'book_chapters' | 'calendar_items' | 'enquiries', orderBy: string) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const { data, error } = await supabase.from(table).select('*').order(orderBy, { ascending: true });
    if (error) setError(error.message);
    else {
      setRows((data ?? []) as T[]);
      setError(null);
    }
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => {
    reload();
    const channel = supabase
      .channel(`live-${table}-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => reload())
      .subscribe();
    // Refresh when returning to the tab, in case the connection slept.
    const onFocus = () => reload();
    window.addEventListener('focus', onFocus);
    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('focus', onFocus);
    };
  }, [table, reload]);

  return { rows, loading, error, reload, setRows };
}

export async function saveChapter(chapter: Partial<Chapter> & { id?: string }) {
  const { id, created_at, updated_at, ...fields } = chapter;
  const query = id
    ? supabase.from('book_chapters').update(fields).eq('id', id).select().single()
    : supabase.from('book_chapters').insert(fields).select().single();
  const { data, error } = await query;
  if (error) throw new Error(friendly(error.message));
  return data as Chapter;
}

export async function deleteChapter(id: string) {
  const { error } = await supabase.from('book_chapters').delete().eq('id', id);
  if (error) throw new Error(friendly(error.message));
}

export async function saveCalendarItem(item: Partial<CalendarItem> & { id?: string }) {
  const { id, created_at, updated_at, ...fields } = item;
  const query = id
    ? supabase.from('calendar_items').update(fields).eq('id', id).select().single()
    : supabase.from('calendar_items').insert(fields).select().single();
  const { data, error } = await query;
  if (error) throw new Error(friendly(error.message));
  return data as CalendarItem;
}

export async function deleteCalendarItem(id: string) {
  const { error } = await supabase.from('calendar_items').delete().eq('id', id);
  if (error) throw new Error(friendly(error.message));
}

function friendly(message: string) {
  if (message.includes('book_chapters_slug_key')) return 'Another chapter already uses this web address. Change the slug.';
  if (message.includes('book_chapters_number_key')) return 'Another chapter already has this number.';
  if (message.includes('row-level security')) return 'Your account is not allowed to make this change.';
  return message;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Converts between an ISO timestamp and the value a datetime-local input expects. */
export function toLocalInput(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export function fromLocalInput(value: string) {
  return value ? new Date(value).toISOString() : null;
}

export function formatDateTime(iso: string | null) {
  if (!iso) return 'No date';
  return new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export type EnquiryStatus = 'new' | 'contacted' | 'won' | 'closed';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  engagement: string | null;
  message: string | null;
  source: string;
  page: string | null;
  status: EnquiryStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export async function updateEnquiry(id: string, fields: Partial<Pick<Enquiry, 'status' | 'notes'>>) {
  const { error } = await supabase.from('enquiries').update(fields).eq('id', id);
  if (error) throw new Error(friendly(error.message));
}

export async function deleteEnquiry(id: string) {
  const { error } = await supabase.from('enquiries').delete().eq('id', id);
  if (error) throw new Error(friendly(error.message));
}
