import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, X } from 'lucide-react';
import {
  CalendarItem,
  Chapter,
  PLATFORMS,
  Platform,
  PostStatus,
  deleteCalendarItem,
  formatDateTime,
  fromLocalInput,
  saveCalendarItem,
  toLocalInput,
  useLiveTable
} from './api.ts';

const STATUSES: { value: PostStatus; label: string }[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'published', label: 'Posted' }
];

// One colour per platform so the month view is scannable.
const PLATFORM_COLOR: Record<Platform, string> = {
  LinkedIn: '#2F6FB0',
  Instagram: '#B4477A',
  'X (Twitter)': '#3B3833',
  Facebook: '#4C63B6',
  TikTok: '#1F8A84',
  YouTube: '#C0392B',
  WhatsApp: '#2E8B57',
  Newsletter: '#A84B24',
  'Blog / Website': '#7A6A2E'
};

type Editing = Partial<CalendarItem> | null;

export default function CalendarTab() {
  const { rows: items, loading, error, reload } = useLiveTable<CalendarItem>('calendar_items', 'scheduled_at');
  const { rows: chapters } = useLiveTable<Chapter>('book_chapters', 'number');
  const [view, setView] = useState<'month' | 'list'>(() => (window.innerWidth < 768 ? 'list' : 'month'));
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
  const [editing, setEditing] = useState<Editing>(null);

  const visible = items.filter((i) => platformFilter === 'all' || i.platform === platformFilter);

  const newAt = (date: Date) => {
    const d = new Date(date);
    d.setHours(9, 0, 0, 0);
    setEditing({ title: '', content: '', platform: 'LinkedIn', status: 'draft', scheduled_at: d.toISOString(), tags: [], cta_url: null, chapter_id: null });
  };

  if (error) return <p className="p-4 rounded-xl bg-clay/10 text-clay">Could not load the calendar: {error}</p>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">Content calendar</h1>
          <p className="mt-2 text-sm text-muted">Saved online and updated live on every device you sign in from.</p>
        </div>
        <button
          onClick={() => newAt(new Date())}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 rounded-full bg-ink text-paper text-sm hover:bg-clay transition-colors"
        >
          <Plus className="w-4 h-4" /> New post
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex p-1 rounded-full bg-paper-deep" role="tablist" aria-label="View">
          {(['month', 'list'] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`min-h-[36px] px-4 rounded-full text-sm ${view === v ? 'bg-ink text-paper' : 'text-muted'}`}
            >
              {v === 'month' ? 'Month' : 'List'}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Platform
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as Platform | 'all')}
            className="h-10 px-3 rounded-xl bg-paper-deep border border-ink/12 text-ink"
          >
            <option value="all">All</option>
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        {loading && <span className="text-sm text-muted">Loading…</span>}
      </div>

      {view === 'month' ? (
        <MonthView month={month} setMonth={setMonth} items={visible} onAdd={newAt} onOpen={setEditing} />
      ) : (
        <ListView items={visible} onOpen={setEditing} />
      )}

      {editing && (
        <ItemEditor
          item={editing}
          chapters={chapters}
          onClose={() => setEditing(null)}
          onChanged={reload}
        />
      )}
    </div>
  );
}

function MonthView({
  month,
  setMonth,
  items,
  onAdd,
  onOpen
}: {
  month: Date;
  setMonth: (d: Date) => void;
  items: CalendarItem[];
  onAdd: (d: Date) => void;
  onOpen: (i: CalendarItem) => void;
}) {
  const days = useMemo(() => monthGrid(month), [month]);
  const today = dayKey(new Date());
  const byDay = useMemo(() => {
    const map = new Map<string, CalendarItem[]>();
    for (const i of items) {
      if (!i.scheduled_at) continue;
      const k = dayKey(new Date(i.scheduled_at));
      map.set(k, [...(map.get(k) ?? []), i]);
    }
    return map;
  }, [items]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-tight">{month.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => setMonth(addMonths(month, -1))} aria-label="Previous month" className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-paper-deep">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setMonth(startOfMonth(new Date()))} className="min-h-[44px] px-3 text-sm rounded-full hover:bg-paper-deep">
            Today
          </button>
          <button onClick={() => setMonth(addMonths(month, 1))} aria-label="Next month" className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-paper-deep">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 text-xs text-muted">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="px-2 pb-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
        {days.map((d) => {
          const k = dayKey(d);
          const inMonth = d.getMonth() === month.getMonth();
          const list = byDay.get(k) ?? [];
          return (
            <div key={k} className={`group min-h-[112px] p-1.5 sm:p-2 ${inMonth ? 'bg-paper' : 'bg-paper-deep/50'}`}>
              <div className="flex items-center justify-between">
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                    k === today ? 'bg-ink text-paper' : inMonth ? '' : 'text-muted/60'
                  }`}
                >
                  {d.getDate()}
                </span>
                <button
                  onClick={() => onAdd(d)}
                  aria-label={`Add post on ${d.toDateString()}`}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-muted opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-paper-deep"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <ul className="mt-1 space-y-1">
                {list.map((i) => (
                  <li key={i.id}>
                    <button
                      onClick={() => onOpen(i)}
                      className={`w-full text-left px-1.5 py-1 rounded-md text-[11px] leading-tight text-white truncate ${i.status === 'published' ? 'opacity-55' : ''}`}
                      style={{ backgroundColor: PLATFORM_COLOR[i.platform] ?? '#555' }}
                      title={`${i.platform}: ${i.title}`}
                    >
                      {new Date(i.scheduled_at!).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} {i.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ListView({ items, onOpen }: { items: CalendarItem[]; onOpen: (i: CalendarItem) => void }) {
  const [showPast, setShowPast] = useState(false);
  const now = Date.now();
  const sorted = [...items].sort((a, b) => +new Date(a.scheduled_at ?? 0) - +new Date(b.scheduled_at ?? 0));
  const unscheduled = sorted.filter((i) => !i.scheduled_at);
  const upcoming = sorted.filter((i) => i.scheduled_at && +new Date(i.scheduled_at) >= now - 864e5);
  const past = sorted.filter((i) => i.scheduled_at && +new Date(i.scheduled_at) < now - 864e5).reverse();

  const Row = ({ i }: { i: CalendarItem }) => (
    <li>
      <button onClick={() => onOpen(i)} className="w-full text-left py-4 flex gap-4 items-start hover:bg-paper-deep/50 rounded-xl px-2 -mx-2">
        <span className="w-1.5 self-stretch rounded-full shrink-0" style={{ backgroundColor: PLATFORM_COLOR[i.platform] }} />
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium truncate">{i.title}</span>
          <span className="block text-sm text-muted">
            {i.platform} · {formatDateTime(i.scheduled_at)}
          </span>
        </span>
        <span className="text-xs text-muted shrink-0 pt-1">{STATUSES.find((s) => s.value === i.status)?.label}</span>
      </button>
    </li>
  );

  return (
    <div className="mt-6 grid lg:grid-cols-2 gap-8">
      <section>
        <h2 className="font-display text-xl">Upcoming</h2>
        {upcoming.length === 0 ? <p className="mt-3 text-sm text-muted">Nothing scheduled.</p> : <ul className="mt-2 divide-y divide-ink/10">{upcoming.map((i) => <Row key={i.id} i={i} />)}</ul>}
      </section>
      <section>
        {unscheduled.length > 0 && (
          <>
            <h2 className="font-display text-xl">Ideas without a date</h2>
            <ul className="mt-2 mb-8 divide-y divide-ink/10">{unscheduled.map((i) => <Row key={i.id} i={i} />)}</ul>
          </>
        )}
        <button onClick={() => setShowPast((v) => !v)} className="min-h-[44px] text-sm text-muted underline underline-offset-4">
          {showPast ? 'Hide' : 'Show'} past posts ({past.length})
        </button>
        {showPast && <ul className="mt-2 divide-y divide-ink/10">{past.map((i) => <Row key={i.id} i={i} />)}</ul>}
      </section>
    </div>
  );
}

function ItemEditor({
  item,
  chapters,
  onClose,
  onChanged
}: {
  item: Partial<CalendarItem>;
  chapters: Chapter[];
  onClose: () => void;
  onChanged: () => void;
}) {
  const [form, setForm] = useState({
    title: item.title ?? '',
    content: item.content ?? '',
    platform: (item.platform ?? 'LinkedIn') as Platform,
    status: (item.status ?? 'draft') as PostStatus,
    scheduled_at: toLocalInput(item.scheduled_at ?? null),
    tags: (item.tags ?? []).join(', '),
    cta_url: item.cta_url ?? '',
    chapter_id: item.chapter_id ?? ''
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return setErr('Add a title.');
    if (form.status === 'scheduled' && !form.scheduled_at) return setErr('Scheduled posts need a date and time.');
    setBusy(true);
    try {
      await saveCalendarItem({
        id: item.id,
        title: form.title.trim(),
        content: form.content,
        platform: form.platform,
        status: form.status,
        scheduled_at: fromLocalInput(form.scheduled_at),
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        cta_url: form.cta_url.trim() || null,
        chapter_id: form.chapter_id || null
      });
      onChanged();
      onClose();
    } catch (e) {
      setErr((e as Error).message);
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!item.id || !window.confirm('Delete this post from the calendar?')) return;
    try {
      await deleteCalendarItem(item.id);
      onChanged();
      onClose();
    } catch (e) {
      setErr((e as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={item.id ? 'Edit post' : 'New post'}>
      <button className="absolute inset-0 bg-coal/40" aria-label="Close" onClick={onClose} />
      <form onSubmit={submit} className="relative w-full max-w-lg h-full overflow-y-auto bg-paper shadow-2xl p-5 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl tracking-tight">{item.id ? 'Edit post' : 'New post'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-paper-deep">
            <X className="w-5 h-5" />
          </button>
        </div>

        <Field label="Title">
          <input autoFocus value={form.title} onChange={(e) => set('title')(e.target.value)} className={inputCls} placeholder="e.g. LinkedIn: The 7-Touch Fortune Framework" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Platform">
            <select value={form.platform} onChange={(e) => set('platform')(e.target.value)} className={inputCls}>
              {PLATFORMS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => set('status')(e.target.value)} className={inputCls}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Date and time">
          <input type="datetime-local" value={form.scheduled_at} onChange={(e) => set('scheduled_at')(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Post text">
          <textarea value={form.content} onChange={(e) => set('content')(e.target.value)} rows={8} className={`${inputCls} h-auto py-3 leading-relaxed`} />
          <span className="mt-1 block text-xs text-muted">{form.content.length.toLocaleString()} characters</span>
        </Field>
        <Field label="Promotes a book chapter (optional)">
          <select value={form.chapter_id} onChange={(e) => set('chapter_id')(e.target.value)} className={inputCls}>
            <option value="">None</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>Chapter {c.number}: {c.title}</option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Tags (comma separated)">
            <input value={form.tags} onChange={(e) => set('tags')(e.target.value)} className={inputCls} placeholder="FORTUNE, Chapter 1" />
          </Field>
          <Field label="Link (optional)">
            <input value={form.cta_url} onChange={(e) => set('cta_url')(e.target.value)} className={inputCls} placeholder="https://…" />
          </Field>
        </div>

        {err && <p role="alert" className="p-3 rounded-xl bg-clay/10 text-clay text-sm">{err}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button disabled={busy} className="flex-1 min-h-[50px] rounded-full bg-ink text-paper font-medium hover:bg-clay disabled:opacity-60 transition-colors">
            {busy ? 'Saving…' : 'Save'}
          </button>
          {item.id && (
            <button type="button" onClick={remove} aria-label="Delete post" className="w-12 h-12 rounded-full flex items-center justify-center text-muted hover:text-clay hover:bg-clay/10">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-xs text-muted">Posting to social platforms is done by you for now. Mark a post “Posted” once it is out.</p>
      </form>
    </div>
  );
}

const inputCls = 'w-full h-12 px-4 rounded-xl bg-paper-deep/60 border border-ink/12 focus:outline-none focus:border-ink focus:bg-paper';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
/** Six weeks of days covering the month, starting on Monday. */
function monthGrid(month: Date) {
  const first = startOfMonth(month);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}
