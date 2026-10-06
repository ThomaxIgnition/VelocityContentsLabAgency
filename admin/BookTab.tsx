import { ReactNode, useEffect, useMemo, useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowUp, ClipboardPaste, ExternalLink, Eye, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { Block } from '../src/lib/book.ts';
import { fromRow, wordCount } from '../src/lib/book.ts';
import {
  ChapterBody,
  ChapterHero,
  ExerciseBox,
  LeadParagraph,
  NextChapterCard,
  ResourceCTA,
  TakeawaysBox
} from '../src/components/book/ChapterParts.tsx';
import {
  Chapter,
  ChapterStatus,
  deleteChapter,
  formatDateTime,
  fromLocalInput,
  isLive,
  saveChapter,
  slugify,
  toLocalInput,
  useLiveTable
} from './api.ts';

const PUBLIC_SITE = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) ?? 'https://velocitycontentslabagency.velocitycontentslab.workers.dev';

type Draft = Omit<Chapter, 'id' | 'created_at' | 'updated_at'> & { id?: string };

const STATUS_OPTIONS: { value: ChapterStatus; label: string; hint: string }[] = [
  { value: 'draft', label: 'Draft', hint: 'Hidden from the website.' },
  { value: 'coming_soon', label: 'Coming soon', hint: 'Listed with its title, greyed out.' },
  { value: 'scheduled', label: 'Scheduled', hint: 'Goes live by itself at the date you set.' },
  { value: 'published', label: 'Published', hint: 'Live on the website now.' }
];

export default function BookTab() {
  const { rows: chapters, loading, error, reload } = useLiveTable<Chapter>('book_chapters', 'number');
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [openKey, setOpenKey] = useState(0);
  const open = (id: string | 'new' | null) => {
    setEditingId(id);
    setOpenKey((k) => k + 1);
  };

  if (error) return <p className="p-4 rounded-xl bg-clay/10 text-clay">Could not load chapters: {error}</p>;

  if (editingId) {
    return (
      <Editor
        key={openKey}
        chapter={editingId === 'new' ? null : chapters.find((c) => c.id === editingId) ?? null}
        all={chapters}
        onClose={() => open(null)}
        onSaved={(c) => {
          setEditingId(c.id);
          reload();
        }}
        onDeleted={() => {
          open(null);
          reload();
        }}
      />
    );
  }

  return <ChapterList chapters={chapters} loading={loading} onEdit={open} onChanged={reload} />;
}

/* ------------------------------------------------------------------ */
/* List view                                                            */
/* ------------------------------------------------------------------ */

function ChapterList({
  chapters,
  loading,
  onEdit,
  onChanged
}: {
  chapters: Chapter[];
  loading: boolean;
  onEdit: (id: string | 'new') => void;
  onChanged: () => void;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const togglePublish = async (c: Chapter) => {
    const live = isLive(c);
    if (live) {
      if (!window.confirm(`Unpublish Chapter ${c.number}? It will be hidden from the website (saved as a draft).`)) return;
    } else {
      if (!c.body.length) return setErr(`Chapter ${c.number} has no text yet. Open it and add the chapter before publishing.`);
      if (!window.confirm(`Publish Chapter ${c.number}, “${c.title}”, on the website now?`)) return;
    }
    setBusyId(c.id);
    setErr(null);
    try {
      await saveChapter({ id: c.id, status: live ? 'draft' : 'published', published_at: live ? c.published_at : c.published_at && c.status === 'published' ? c.published_at : new Date().toISOString() });
      onChanged();
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusyId(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-tight">The book</h1>
          <p className="mt-2 text-sm text-muted">“Where Strategy Meets Soul”. Published chapters appear on the website straight away.</p>
        </div>
        <button
          onClick={() => onEdit('new')}
          className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-5 rounded-full bg-ink text-paper text-sm hover:bg-clay transition-colors"
        >
          <Plus className="w-4 h-4" /> New chapter
        </button>
      </div>

      {err && <p role="alert" className="mt-5 p-3 rounded-xl bg-clay/10 text-clay text-sm">{err}</p>}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/12">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="bg-paper-deep text-left text-muted">
            <tr>
              {['#', 'Title', 'Slug', 'Keyword', 'Week', 'Status', 'Reading', 'Published', 'Updated', 'Actions'].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {loading && (
              <tr><td colSpan={10} className="px-4 py-6 text-muted">Loading…</td></tr>
            )}
            {chapters.map((c) => {
              const live = isLive(c);
              return (
                <tr key={c.id} className="hover:bg-paper-deep/40">
                  <td className="px-4 py-3 font-mono">{String(c.number).padStart(2, '0')}</td>
                  <td className="px-4 py-3 font-medium max-w-[260px]">
                    <button onClick={() => onEdit(c.id)} className="text-left hover:text-clay">{c.title}</button>
                  </td>
                  <td className="px-4 py-3 text-muted max-w-[200px] truncate" title={c.slug}>{c.slug}</td>
                  <td className="px-4 py-3 font-mono text-xs">{c.dm_keyword || '—'}</td>
                  <td className="px-4 py-3">{c.week ?? '—'}</td>
                  <td className="px-4 py-3"><StatusPill chapter={c} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.reading_time_minutes ? `${c.reading_time_minutes} min` : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{c.published_at ? shortDate(c.published_at) : '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted">{shortDate(c.updated_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <button onClick={() => onEdit(c.id)} className="min-h-[36px] px-3 rounded-full border border-ink/15 hover:border-ink/40">Edit</button>
                      {live && (
                        <a
                          href={`${PUBLIC_SITE}/#/book/${c.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="min-h-[36px] px-3 inline-flex items-center gap-1 rounded-full border border-ink/15 hover:border-ink/40"
                        >
                          Preview <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={() => togglePublish(c)}
                        disabled={busyId === c.id}
                        className={`min-h-[36px] px-3 rounded-full disabled:opacity-60 ${live ? 'text-muted hover:text-clay' : 'bg-ink text-paper hover:bg-clay'}`}
                      >
                        {busyId === c.id ? '…' : live ? 'Unpublish' : 'Publish'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ chapter }: { chapter: Chapter }) {
  const live = isLive(chapter);
  const [label, cls] = live
    ? ['Published', 'bg-sage/15 text-sage']
    : chapter.status === 'scheduled'
      ? [`Scheduled · ${shortDate(chapter.published_at!)}`, 'bg-ember/20 text-clay']
      : chapter.status === 'coming_soon'
        ? ['Coming soon', 'bg-violet/15 text-violet-text']
        : ['Draft', 'bg-ink/8 text-muted'];
  return <span className={`inline-block px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap ${cls}`}>{label}</span>;
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ------------------------------------------------------------------ */
/* Editor                                                               */
/* ------------------------------------------------------------------ */

function emptyDraft(number: number): Draft {
  return {
    number,
    slug: '',
    title: '',
    subtitle: null,
    dm_keyword: null,
    week: null,
    epigraph: null,
    summary: null,
    lead: null,
    body: [],
    takeaways: [],
    exercise: null,
    next_chapter: null,
    reading_time_minutes: null,
    status: 'draft',
    published_at: null
  };
}

function Editor({
  chapter,
  all,
  onClose,
  onSaved,
  onDeleted
}: {
  chapter: Chapter | null;
  all: Chapter[];
  onClose: () => void;
  onSaved: (c: Chapter) => void;
  onDeleted: () => void;
}) {
  const nextNumber = all.reduce((m, c) => Math.max(m, c.number), 0) + 1;
  const initial = useMemo<Draft>(() => chapter ?? emptyDraft(nextNumber), [chapter, nextNumber]);
  const [baseline, setBaseline] = useState<Draft>(initial);
  const [draft, setDraft] = useState<Draft>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(chapter));
  const [readingAuto, setReadingAuto] = useState(!chapter?.reading_time_minutes);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [pasteOpen, setPasteOpen] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const words = wordCount({ lead: draft.lead, body: draft.body, takeaways: draft.takeaways, exercise: draft.exercise });
  const autoMinutes = Math.max(1, Math.round(words / 200));
  const dirty = JSON.stringify(strip(draft)) !== JSON.stringify(strip(baseline));
  const live = isLive(draft);

  useEffect(() => {
    if (readingAuto) setDraft((d) => (d.reading_time_minutes === autoMinutes ? d : { ...d, reading_time_minutes: words ? autoMinutes : null }));
  }, [autoMinutes, readingAuto, words]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async (overrides: Partial<Draft> = {}) => {
    const next: Draft = { ...draft, ...overrides };
    const others = all.filter((c) => c.id !== next.id);
    if (!next.title.trim()) return setNotice({ kind: 'error', text: 'Give the chapter a title.' });
    if (!next.slug) next.slug = slugify(next.title);
    if (others.some((c) => c.number === next.number)) return setNotice({ kind: 'error', text: `Chapter ${next.number} already exists. Choose another number.` });
    if (others.some((c) => c.slug === next.slug)) return setNotice({ kind: 'error', text: 'Another chapter already uses this web address. Change the slug.' });
    if ((next.status === 'published' || next.status === 'scheduled') && next.body.length === 0) {
      return setNotice({ kind: 'error', text: 'Add the chapter text (at least one block) before publishing or scheduling.' });
    }
    if (next.status === 'scheduled' && !next.published_at) return setNotice({ kind: 'error', text: 'Choose the date and time it should go live.' });
    // First publish sets the publish date; it is kept on later edits.
    if (next.status === 'published' && (!next.published_at || baseline.status !== 'published')) {
      next.published_at = baseline.status === 'published' && baseline.published_at ? baseline.published_at : new Date().toISOString();
    }
    setBusy(true);
    setNotice(null);
    try {
      const saved = await saveChapter(clean(next));
      setDraft(saved);
      setBaseline(saved);
      setSlugTouched(true);
      setNotice({
        kind: 'ok',
        text: isLive(saved)
          ? 'Saved. It is live on the website.'
          : saved.status === 'scheduled'
            ? `Saved. It goes live ${formatDateTime(saved.published_at)}.`
            : 'Saved.'
      });
      onSaved(saved);
    } catch (e) {
      setNotice({ kind: 'error', text: (e as Error).message });
    }
    setBusy(false);
  };

  const remove = async () => {
    if (!draft.id) return onClose();
    if (!window.confirm(`Delete Chapter ${draft.number}, “${draft.title}”? This cannot be undone.`)) return;
    try {
      await deleteChapter(draft.id);
      onDeleted();
    } catch (e) {
      setNotice({ kind: 'error', text: (e as Error).message });
    }
  };

  const close = () => {
    if (dirty && !window.confirm('You have unsaved changes. Leave without saving?')) return;
    onClose();
  };

  const nextInBook = all.filter((c) => c.number > draft.number).sort((a, b) => a.number - b.number)[0];

  return (
    <div>
      <div className="sticky top-[112px] z-20 -mx-4 sm:-mx-8 px-4 sm:px-8 py-3 bg-paper/95 backdrop-blur border-b border-ink/10 flex flex-wrap items-center justify-between gap-3">
        <button onClick={close} className="inline-flex items-center gap-1.5 min-h-[44px] text-sm text-muted hover:text-ink">
          <ArrowLeft className="w-4 h-4" /> All chapters
        </button>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex p-1 rounded-full bg-paper-deep" role="tablist" aria-label="Mode">
            {(['edit', 'preview'] as const).map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={`inline-flex items-center gap-1.5 min-h-[36px] px-4 rounded-full text-sm ${view === v ? 'bg-ink text-paper' : 'text-muted'}`}
              >
                {v === 'edit' ? <Pencil className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {v === 'edit' ? 'Edit' : 'Preview'}
              </button>
            ))}
          </div>
          <button
            onClick={() => save()}
            disabled={busy}
            className="min-h-[44px] px-5 rounded-full bg-ink text-paper text-sm font-medium hover:bg-clay disabled:opacity-60"
          >
            {busy ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
          </button>
          {!live && (
            <button
              onClick={() => window.confirm('Publish this chapter on the website now?') && save({ status: 'published' })}
              disabled={busy}
              className="min-h-[44px] px-5 rounded-full bg-ember text-coal text-sm font-medium disabled:opacity-60"
            >
              Publish now
            </button>
          )}
        </div>
      </div>

      {notice && (
        <p role="status" className={`mt-4 p-3 rounded-xl text-sm ${notice.kind === 'ok' ? 'bg-sage/10 text-sage' : 'bg-clay/10 text-clay'}`}>
          {notice.text}
        </p>
      )}

      {view === 'preview' ? (
        <Preview draft={draft} />
      ) : (
        <div className="mt-6 space-y-10 max-w-4xl">
          <Section title="Chapter details">
            <div className="grid sm:grid-cols-[110px_1fr] gap-4">
              <Field label="Number">
                <input type="number" min={1} value={draft.number} onChange={(e) => set('number', Number(e.target.value))} className={inputCls} />
              </Field>
              <Field label="Title *">
                <input
                  value={draft.title}
                  onChange={(e) => {
                    set('title', e.target.value);
                    if (!slugTouched) set('slug', slugify(e.target.value));
                  }}
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Web address (slug)" hint={`${PUBLIC_SITE.replace(/^https?:\/\//, '')}/#/book/${draft.slug || '…'}`}>
              <input
                value={draft.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', slugify(e.target.value));
                }}
                className={inputCls}
              />
            </Field>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Subtitle / framework">
                <input value={draft.subtitle ?? ''} onChange={(e) => set('subtitle', e.target.value || null)} className={inputCls} placeholder="The 7-Touch Fortune Framework™" />
              </Field>
              <Field label="DM keyword">
                <input value={draft.dm_keyword ?? ''} onChange={(e) => set('dm_keyword', e.target.value.toUpperCase() || null)} className={inputCls} placeholder="FORTUNE" />
              </Field>
              <Field label="Week">
                <input type="number" min={1} value={draft.week ?? ''} onChange={(e) => set('week', e.target.value ? Number(e.target.value) : null)} className={inputCls} />
              </Field>
            </div>
            <Field label="Epigraph" hint="A short quote shown in the chapter header.">
              <input value={draft.epigraph ?? ''} onChange={(e) => set('epigraph', e.target.value || null)} className={inputCls} />
            </Field>
            <Field label="Summary" hint="Shown on the book page and in search results.">
              <textarea value={draft.summary ?? ''} onChange={(e) => set('summary', e.target.value || null)} rows={2} className={areaCls} />
            </Field>
            <Field label="Lead paragraph" hint="The italic opening paragraph.">
              <textarea value={draft.lead ?? ''} onChange={(e) => set('lead', e.target.value || null)} rows={3} className={areaCls} />
            </Field>
          </Section>

          <Section
            title={`Chapter text · ${draft.body.length} blocks · ${words.toLocaleString()} words`}
            action={
              <button onClick={() => setPasteOpen(true)} className="inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full border border-ink/15 text-sm hover:border-ink/40">
                <ClipboardPaste className="w-4 h-4" /> Paste whole chapter
              </button>
            }
          >
            <BlockEditor blocks={draft.body} onChange={(b) => set('body', b)} />
          </Section>

          <Section title="Takeaways">
            <ListEditor items={draft.takeaways} onChange={(t) => set('takeaways', t)} addLabel="Add takeaway" placeholder="One key idea from the chapter" />
          </Section>

          <Section title="Exercise">
            <Field label="Exercise title">
              <input
                value={draft.exercise?.title ?? ''}
                onChange={(e) => set('exercise', e.target.value || draft.exercise?.steps.length ? { title: e.target.value, steps: draft.exercise?.steps ?? [] } : null)}
                className={inputCls}
                placeholder="Your First Sequence (20 minutes)"
              />
            </Field>
            <ListEditor
              items={draft.exercise?.steps ?? []}
              onChange={(steps) => set('exercise', steps.length || draft.exercise?.title ? { title: draft.exercise?.title ?? '', steps } : null)}
              addLabel="Add step"
              placeholder="One thing the reader should do"
            />
          </Section>

          <Section
            title="Coming up next"
            action={
              nextInBook && (
                <button
                  onClick={() => set('next_chapter', { title: `Chapter ${nextInBook.number}: ${nextInBook.title}`, text: draft.next_chapter?.text ?? '' })}
                  className="min-h-[40px] px-4 rounded-full border border-ink/15 text-sm hover:border-ink/40"
                >
                  Use Chapter {nextInBook.number}
                </button>
              )
            }
          >
            <Field label="Title">
              <input
                value={draft.next_chapter?.title ?? ''}
                onChange={(e) => set('next_chapter', e.target.value || draft.next_chapter?.text ? { title: e.target.value, text: draft.next_chapter?.text ?? '' } : null)}
                className={inputCls}
              />
            </Field>
            <Field label="Text">
              <textarea
                value={draft.next_chapter?.text ?? ''}
                onChange={(e) => set('next_chapter', e.target.value || draft.next_chapter?.title ? { title: draft.next_chapter?.title ?? '', text: e.target.value } : null)}
                rows={2}
                className={areaCls}
              />
            </Field>
          </Section>

          <Section title="Publishing">
            <div className="grid sm:grid-cols-2 gap-2">
              {STATUS_OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className={`cursor-pointer p-4 rounded-2xl border transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay ${
                    draft.status === o.value ? 'border-ink bg-paper-deep' : 'border-ink/12 hover:border-ink/30'
                  }`}
                >
                  <input type="radio" name="status" className="sr-only" checked={draft.status === o.value} onChange={() => set('status', o.value)} />
                  <span className="block font-medium">{o.label}</span>
                  <span className="block mt-1 text-sm text-muted">{o.hint}</span>
                </label>
              ))}
            </div>
            {draft.status === 'scheduled' && (
              <div className="max-w-xs">
                <Field label="Goes live on">
                  <input type="datetime-local" value={toLocalInput(draft.published_at)} onChange={(e) => set('published_at', fromLocalInput(e.target.value))} className={inputCls} />
                </Field>
              </div>
            )}
            <div className="flex flex-wrap items-end gap-4">
              <Field label="Reading time (minutes)" hint={readingAuto ? `Worked out automatically at 200 words a minute.` : 'Set by you.'}>
                <input
                  type="number"
                  min={1}
                  value={draft.reading_time_minutes ?? ''}
                  onChange={(e) => {
                    setReadingAuto(false);
                    set('reading_time_minutes', e.target.value ? Number(e.target.value) : null);
                  }}
                  className={`${inputCls} max-w-[140px]`}
                />
              </Field>
              {!readingAuto && (
                <button onClick={() => setReadingAuto(true)} className="mb-7 min-h-[40px] px-4 rounded-full border border-ink/15 text-sm">
                  Use automatic ({autoMinutes} min)
                </button>
              )}
            </div>
          </Section>

          {draft.id && (
            <div className="pt-6 border-t border-ink/10">
              <button onClick={remove} className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full text-sm text-muted hover:text-clay hover:bg-clay/10">
                <Trash2 className="w-4 h-4" /> Delete this chapter
              </button>
            </div>
          )}
        </div>
      )}

      {pasteOpen && (
        <PasteDialog
          hasBlocks={draft.body.length > 0}
          onClose={() => setPasteOpen(false)}
          onApply={(blocks) => {
            set('body', blocks);
            setPasteOpen(false);
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Body block editor                                                    */
/* ------------------------------------------------------------------ */

function BlockEditor({ blocks, onChange }: { blocks: Block[]; onChange: (b: Block[]) => void }) {
  const update = (i: number, b: Block) => onChange(blocks.map((x, j) => (j === i ? b : x)));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  const removeAt = (i: number) => onChange(blocks.filter((_, j) => j !== i));
  const insert = (i: number, b: Block) => onChange([...blocks.slice(0, i), b, ...blocks.slice(i)]);
  const makers: { label: string; make: () => Block }[] = [
    { label: 'Paragraph', make: () => ({ type: 'paragraph', text: '' }) },
    { label: 'Heading', make: () => ({ type: 'heading', text: '' }) },
    { label: 'Steps', make: () => ({ type: 'steps', items: [{ title: '', text: '' }] }) }
  ];

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <p className="p-5 rounded-2xl border border-dashed border-ink/15 text-sm text-muted">
          No text yet. Add blocks below, or use “Paste whole chapter” to turn your text into blocks automatically.
        </p>
      )}
      {blocks.map((b, i) => (
        <div key={i} className={`rounded-2xl border border-ink/12 bg-paper ${b.type === 'heading' ? 'border-l-4 border-l-ink' : b.type === 'steps' ? 'border-l-4 border-l-ember' : ''}`}>
          <div className="flex items-center justify-between gap-2 px-3 pt-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {i + 1}. {b.type}
            </span>
            <div className="flex items-center">
              <IconBtn label="Move up" onClick={() => move(i, -1)} disabled={i === 0}><ArrowUp className="w-4 h-4" /></IconBtn>
              <IconBtn label="Move down" onClick={() => move(i, 1)} disabled={i === blocks.length - 1}><ArrowDown className="w-4 h-4" /></IconBtn>
              <IconBtn label="Delete block" onClick={() => removeAt(i)}><Trash2 className="w-4 h-4" /></IconBtn>
            </div>
          </div>
          <div className="p-3 pt-1">
            {b.type === 'heading' && (
              <input aria-label="Heading" value={b.text} onChange={(e) => update(i, { type: 'heading', text: e.target.value })} className={`${inputCls} font-display text-lg`} placeholder="Section heading" />
            )}
            {b.type === 'paragraph' && (
              <textarea aria-label="Paragraph" value={b.text} onChange={(e) => update(i, { type: 'paragraph', text: e.target.value })} rows={Math.min(10, Math.max(3, Math.ceil(b.text.length / 90)))} className={areaCls} placeholder="Paragraph text" />
            )}
            {b.type === 'steps' && (
              <div className="space-y-2">
                {b.items.map((item, k) => (
                  <div key={k} className="grid grid-cols-[28px_1fr_auto] gap-2 items-start p-2 rounded-xl bg-paper-deep/60">
                    <span className="pt-3 text-center font-mono text-xs text-clay">{String(k + 1).padStart(2, '0')}</span>
                    <div className="space-y-2">
                      <input aria-label="Step title" value={item.title} onChange={(e) => update(i, { type: 'steps', items: b.items.map((x, m) => (m === k ? { ...x, title: e.target.value } : x)) })} className={inputCls} placeholder="Step title" />
                      <textarea aria-label="Step text" value={item.text} onChange={(e) => update(i, { type: 'steps', items: b.items.map((x, m) => (m === k ? { ...x, text: e.target.value } : x)) })} rows={2} className={areaCls} placeholder="Step text" />
                    </div>
                    <div className="flex flex-col">
                      <IconBtn label="Move step up" onClick={() => k > 0 && update(i, { type: 'steps', items: swap(b.items, k, k - 1) })} disabled={k === 0}><ArrowUp className="w-4 h-4" /></IconBtn>
                      <IconBtn label="Move step down" onClick={() => k < b.items.length - 1 && update(i, { type: 'steps', items: swap(b.items, k, k + 1) })} disabled={k === b.items.length - 1}><ArrowDown className="w-4 h-4" /></IconBtn>
                      <IconBtn label="Delete step" onClick={() => update(i, { type: 'steps', items: b.items.filter((_, m) => m !== k) })}><X className="w-4 h-4" /></IconBtn>
                    </div>
                  </div>
                ))}
                <button onClick={() => update(i, { type: 'steps', items: [...b.items, { title: '', text: '' }] })} className="inline-flex items-center gap-1.5 min-h-[40px] px-3 text-sm text-clay">
                  <Plus className="w-4 h-4" /> Add step
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1 px-3 pb-2 text-xs text-muted">
            Insert below:
            {makers.map((m) => (
              <button key={m.label} onClick={() => insert(i + 1, m.make())} className="min-h-[32px] px-2.5 rounded-full hover:bg-paper-deep hover:text-ink">
                + {m.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2 pt-1">
        {makers.map((m) => (
          <button key={m.label} onClick={() => onChange([...blocks, m.make()])} className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full border border-ink/15 text-sm hover:border-ink/40">
            <Plus className="w-4 h-4" /> {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Turns plain text into blocks: "## " lines become headings, numbered or
 * dashed lists become steps ("Title: text"), and other paragraphs stay paragraphs. */
export function textToBlocks(text: string): Block[] {
  const chunks = text.replace(/\r\n/g, '\n').split(/\n\s*\n/).map((c) => c.trim()).filter(Boolean);
  const blocks: Block[] = [];
  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) {
      blocks.push({ type: 'heading', text: lines[0].replace(/^#{1,3}\s+/, '') });
      continue;
    }
    const listLine = /^(\d+[.)]|[-*•])\s+/;
    if (lines.every((l) => listLine.test(l))) {
      const items = lines.map((l) => {
        const body = l.replace(listLine, '').replace(/\*\*/g, '');
        const m = body.match(/^(.+?)(?::|\s[—–-])\s+(.+)$/);
        return m ? { title: m[1].trim(), text: m[2].trim() } : { title: body, text: '' };
      });
      const prev = blocks[blocks.length - 1];
      if (prev?.type === 'steps') prev.items.push(...items);
      else blocks.push({ type: 'steps', items });
      continue;
    }
    blocks.push({ type: 'paragraph', text: lines.join('\n') });
  }
  return blocks;
}

function PasteDialog({ hasBlocks, onClose, onApply }: { hasBlocks: boolean; onClose: () => void; onApply: (b: Block[]) => void }) {
  const [text, setText] = useState('');
  const blocks = useMemo(() => textToBlocks(text), [text]);
  const counts = { heading: 0, paragraph: 0, steps: 0 };
  blocks.forEach((b) => counts[b.type]++);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Paste whole chapter">
      <button className="absolute inset-0 bg-coal/50" aria-label="Close" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-paper p-6 sm:p-8 shadow-2xl">
        <h2 className="font-display text-2xl tracking-tight">Paste whole chapter</h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Paste the chapter text. Leave an empty line between paragraphs. Start a line with <code>## </code> to make a heading. Numbered
          lines like <code>1. Title: text</code> become step cards.
        </p>
        <textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} rows={14} className={`${areaCls} mt-4`} />
        <p className="mt-2 text-sm text-muted">
          {blocks.length} blocks: {counts.paragraph} paragraphs, {counts.heading} headings, {counts.steps} step groups.
        </p>
        {hasBlocks && <p className="mt-2 text-sm text-clay">This replaces the chapter text that is already there.</p>}
        <div className="mt-6 flex gap-3">
          <button disabled={!blocks.length} onClick={() => onApply(blocks)} className="min-h-[48px] px-6 rounded-full bg-ink text-paper font-medium hover:bg-clay disabled:opacity-50">
            Use this text
          </button>
          <button onClick={onClose} className="min-h-[48px] px-6 rounded-full border border-ink/15">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preview: the real chapter components                                 */
/* ------------------------------------------------------------------ */

function Preview({ draft }: { draft: Draft }) {
  const chapter = fromRow({ ...draft, status: 'published', published_at: draft.published_at } as any);
  return (
    <div className="mt-6 -mx-4 sm:-mx-8 border-y border-ink/10">
      <MemoryRouter>
        <ChapterHero chapter={chapter} />
        <div className="bg-paper px-5 sm:px-8 py-12">
          <div className="max-w-[68ch] mx-auto">
            {chapter.lead && <LeadParagraph text={chapter.lead} />}
            <div className="mt-10">
              {chapter.body.length ? <ChapterBody blocks={chapter.body} /> : <p className="text-muted">No chapter text yet.</p>}
            </div>
            <TakeawaysBox number={chapter.number} takeaways={chapter.takeaways} />
            {chapter.exercise && chapter.exercise.steps.length > 0 && <ExerciseBox slug={`preview-${chapter.slug}`} exercise={chapter.exercise} />}
            {chapter.dmKeyword && <ResourceCTA keyword={chapter.dmKeyword} />}
            {chapter.nextChapter && <NextChapterCard next={chapter.nextChapter} to="/book" />}
          </div>
        </div>
      </MemoryRouter>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                        */
/* ------------------------------------------------------------------ */

function ListEditor({ items, onChange, addLabel, placeholder }: { items: string[]; onChange: (v: string[]) => void; addLabel: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      {items.map((t, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="pt-3.5 w-6 font-mono text-xs text-muted text-right">{i + 1}.</span>
          <textarea value={t} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} rows={1} className={`${areaCls} min-h-[48px]`} placeholder={placeholder} />
          <div className="flex">
            <IconBtn label="Move up" onClick={() => i > 0 && onChange(swap(items, i, i - 1))} disabled={i === 0}><ArrowUp className="w-4 h-4" /></IconBtn>
            <IconBtn label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}><X className="w-4 h-4" /></IconBtn>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])} className="inline-flex items-center gap-1.5 min-h-[40px] px-3 text-sm text-clay">
        <Plus className="w-4 h-4" /> {addLabel}
      </button>
    </div>
  );
}

function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-ink/10">
        <h2 className="font-display text-xl tracking-tight">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1.5 block text-xs text-muted break-all">{hint}</span>}
    </label>
  );
}

function IconBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled} className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-ink hover:bg-paper-deep disabled:opacity-30 disabled:hover:bg-transparent">
      {children}
    </button>
  );
}

function swap<T>(arr: T[], a: number, b: number) {
  const copy = [...arr];
  [copy[a], copy[b]] = [copy[b], copy[a]];
  return copy;
}

/** Trims empty list entries before saving. */
function clean(d: Draft): Draft {
  return {
    ...d,
    takeaways: d.takeaways.map((t) => t.trim()).filter(Boolean),
    exercise: d.exercise && (d.exercise.title.trim() || d.exercise.steps.some((s) => s.trim()))
      ? { title: d.exercise.title.trim(), steps: d.exercise.steps.map((s) => s.trim()).filter(Boolean) }
      : null,
    next_chapter: d.next_chapter && (d.next_chapter.title.trim() || d.next_chapter.text.trim()) ? d.next_chapter : null
  };
}

function strip(d: Draft) {
  const { ...rest } = d as Draft & { created_at?: string; updated_at?: string };
  delete (rest as any).created_at;
  delete (rest as any).updated_at;
  return rest;
}

const inputCls = 'w-full h-12 px-4 rounded-xl bg-paper-deep/60 border border-ink/12 focus:outline-none focus:border-ink focus:bg-paper';
const areaCls = 'w-full px-4 py-3 rounded-xl bg-paper-deep/60 border border-ink/12 focus:outline-none focus:border-ink focus:bg-paper leading-relaxed resize-y';
