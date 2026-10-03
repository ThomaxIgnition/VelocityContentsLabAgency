import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ExternalLink, Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import ChapterContent from '../src/components/ChapterContent.tsx';
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

const VISIBILITY: { value: ChapterStatus; label: string; hint: string }[] = [
  { value: 'draft', label: 'Draft', hint: 'Hidden from the website.' },
  { value: 'coming', label: 'Coming soon', hint: 'Title and summary shown, marked “Coming”.' },
  { value: 'scheduled', label: 'Scheduled', hint: 'Shown as coming, then goes live automatically at the date you set.' },
  { value: 'published', label: 'Published', hint: 'Live on the website now.' }
];

export default function BookTab() {
  const { rows: chapters, loading, error, reload } = useLiveTable<Chapter>('chapters', 'chapter_number');
  const [selectedId, setSelectedId] = useState<string | 'new' | null>(null);
  // Changes only when you pick a chapter, so saving does not reset the editor.
  const [openKey, setOpenKey] = useState(0);
  const open = (id: string | 'new' | null) => {
    setSelectedId(id);
    setOpenKey((k) => k + 1);
  };

  const selected = selectedId === 'new' ? null : chapters.find((c) => c.id === selectedId) ?? null;
  const nextNumber = chapters.reduce((m, c) => Math.max(m, c.chapter_number), 0) + 1;

  if (error) return <p className="p-4 rounded-xl bg-clay/10 text-clay">Could not load chapters: {error}</p>;

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
      <aside className={`lg:col-span-4 ${selectedId ? 'hidden lg:block' : ''}`}>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl tracking-tight">The book</h1>
          <button
            onClick={() => open('new')}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 rounded-full bg-ink text-paper text-sm hover:bg-clay transition-colors"
          >
            <Plus className="w-4 h-4" /> New chapter
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">“Where Strategy Meets Soul”, chapter by chapter.</p>
        <ul className="mt-6 space-y-2">
          {loading && <li className="text-muted text-sm">Loading…</li>}
          {chapters.map((c) => {
            const live = isLive(c);
            return (
              <li key={c.id}>
                <button
                  onClick={() => open(c.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                    selectedId === c.id ? 'border-ink bg-paper-deep' : 'border-ink/10 hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-clay">Chapter {c.chapter_number}</span>
                    <Badge chapter={c} live={live} />
                  </div>
                  <span className="mt-1.5 block font-display text-[17px] leading-snug">{c.title}</span>
                  {c.status === 'scheduled' && !live && (
                    <span className="mt-1 block text-xs text-muted">Goes live {formatDateTime(c.publish_at)}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className={`lg:col-span-8 ${selectedId ? '' : 'hidden lg:block'}`}>
        {selectedId ? (
          <Editor
            key={openKey}
            chapter={selected}
            nextNumber={nextNumber}
            onClose={() => open(null)}
            onSaved={(c) => {
              setSelectedId(c.id);
              reload();
            }}
            onDeleted={() => {
              open(null);
              reload();
            }}
          />
        ) : (
          <div className="h-full min-h-[300px] rounded-3xl border border-dashed border-ink/15 flex items-center justify-center text-center p-8 text-muted">
            Choose a chapter to edit, or start a new one.
          </div>
        )}
      </section>
    </div>
  );
}

function Editor({
  chapter,
  nextNumber,
  onClose,
  onSaved,
  onDeleted
}: {
  chapter: Chapter | null;
  nextNumber: number;
  onClose: () => void;
  onSaved: (c: Chapter) => void;
  onDeleted: () => void;
}) {
  const initial: Draft = useMemo(
    () =>
      chapter ?? {
        slug: '',
        chapter_number: nextNumber,
        title: '',
        description: '',
        content: '',
        status: 'draft',
        publish_at: null
      },
    [chapter, nextNumber]
  );
  const [baseline, setBaseline] = useState<Draft>(initial);
  const [draft, setDraft] = useState<Draft>(initial);
  const [slugTouched, setSlugTouched] = useState(Boolean(chapter));
  const [view, setView] = useState<'write' | 'preview'>('write');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const dirty = JSON.stringify(pick(draft)) !== JSON.stringify(pick(baseline));
  const words = draft.content.trim() ? draft.content.trim().split(/\s+/).length : 0;
  const live = isLive(draft);

  // Warn before leaving the page with unsaved writing.
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const save = async (overrides: Partial<Draft> = {}) => {
    const next = { ...draft, ...overrides };
    if (!next.title.trim()) return setNotice({ kind: 'error', text: 'Give the chapter a title first.' });
    if (!next.slug.trim()) next.slug = slugify(`chapter-${next.chapter_number}-${next.title}`);
    if (next.status === 'scheduled' && !next.publish_at) return setNotice({ kind: 'error', text: 'Choose the date and time it should go live.' });
    if ((next.status === 'published' || next.status === 'scheduled') && !next.content.trim()) {
      return setNotice({ kind: 'error', text: 'Add the chapter text before publishing or scheduling it.' });
    }
    if (next.status === 'published' && !next.publish_at) next.publish_at = new Date().toISOString();
    setBusy(true);
    setNotice(null);
    try {
      const saved = await saveChapter(next);
      setDraft(saved);
      setBaseline(saved);
      setSlugTouched(true);
      setNotice({
        kind: 'ok',
        text: isLive(saved)
          ? 'Saved. It is live on the website.'
          : saved.status === 'scheduled'
            ? `Saved. It goes live ${formatDateTime(saved.publish_at)}.`
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
    if (!window.confirm(`Delete “${draft.title}”? This cannot be undone.`)) return;
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

  return (
    <div className="rounded-3xl border border-ink/12 bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-ink/10">
        <button onClick={close} className="inline-flex items-center gap-1.5 min-h-[44px] text-sm text-muted hover:text-ink">
          <ArrowLeft className="w-4 h-4" /> All chapters
        </button>
        <div className="flex items-center gap-2">
          {live && draft.slug && (
            <a
              href={`${PUBLIC_SITE}/#/blog/${draft.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm text-clay"
            >
              View on website <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {draft.id && (
            <button onClick={remove} aria-label="Delete chapter" className="w-11 h-11 rounded-full flex items-center justify-center text-muted hover:text-clay hover:bg-clay/10">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-[90px_1fr] gap-4">
          <Field label="Chapter">
            <input
              type="number"
              min={1}
              value={draft.chapter_number}
              onChange={(e) => set('chapter_number', Number(e.target.value))}
              className={inputCls}
            />
          </Field>
          <Field label="Title">
            <input
              value={draft.title}
              onChange={(e) => {
                set('title', e.target.value);
                if (!slugTouched) set('slug', slugify(`chapter-${draft.chapter_number}-${e.target.value}`));
              }}
              placeholder="e.g. She Asked Why 17 Times — The Discovery Build Framework"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Short summary" hint="Shown in the chapter list and under the title.">
          <textarea value={draft.description} onChange={(e) => set('description', e.target.value)} rows={2} className={`${inputCls} h-auto py-3`} />
        </Field>

        <Field label="Web address" hint={`${PUBLIC_SITE.replace(/^https?:\/\//, '')}/#/blog/${draft.slug || '…'}`}>
          <input
            value={draft.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set('slug', slugify(e.target.value));
            }}
            className={inputCls}
          />
        </Field>

        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-muted">Chapter text · {words.toLocaleString()} words</span>
            <div className="flex p-1 rounded-full bg-paper-deep" role="tablist">
              {(['write', 'preview'] as const).map((v) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={`inline-flex items-center gap-1.5 min-h-[36px] px-4 rounded-full text-sm ${view === v ? 'bg-ink text-paper' : 'text-muted'}`}
                >
                  {v === 'write' ? <Pencil className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {v === 'write' ? 'Write' : 'Preview'}
                </button>
              ))}
            </div>
          </div>
          {view === 'write' ? (
            <>
              <textarea
                value={draft.content}
                onChange={(e) => set('content', e.target.value)}
                rows={22}
                placeholder="Write or paste the chapter here…"
                className="mt-3 w-full p-4 sm:p-5 rounded-2xl bg-paper-deep/60 border border-ink/12 focus:outline-none focus:border-ink text-[16px] leading-relaxed font-[inherit] resize-y"
              />
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Formatting: <code>## Heading</code> · <code>### Subheading</code> · <code>- bullet</code> · <code>1. numbered</code> ·{' '}
                <code>&gt; quote</code> · <code>**bold**</code> · <code>*italic*</code>. Leave a blank line between paragraphs.
              </p>
            </>
          ) : (
            <div className="mt-3 p-5 sm:p-8 rounded-2xl border border-ink/12 min-h-[300px]">
              <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight">{draft.title || 'Untitled chapter'}</h1>
              {draft.description && <p className="mt-3 text-muted">{draft.description}</p>}
              <div className="mt-8">
                {draft.content ? <ChapterContent content={draft.content} /> : <p className="text-muted">Nothing written yet.</p>}
              </div>
            </div>
          )}
        </div>

        <fieldset>
          <legend className="text-sm text-muted">On the website</legend>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {VISIBILITY.map((v) => (
              <label
                key={v.value}
                className={`cursor-pointer p-4 rounded-2xl border transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay ${
                  draft.status === v.value ? 'border-ink bg-paper-deep' : 'border-ink/12 hover:border-ink/30'
                }`}
              >
                <input type="radio" name="visibility" className="sr-only" checked={draft.status === v.value} onChange={() => set('status', v.value)} />
                <span className="flex items-center gap-2 font-medium">
                  {draft.status === v.value && <Check className="w-4 h-4 text-clay" />} {v.label}
                </span>
                <span className="block mt-1 text-sm text-muted">{v.hint}</span>
              </label>
            ))}
          </div>
          {draft.status === 'scheduled' && (
            <div className="mt-4 max-w-xs">
              <Field label="Goes live on">
                <input
                  type="datetime-local"
                  value={toLocalInput(draft.publish_at)}
                  onChange={(e) => set('publish_at', fromLocalInput(e.target.value))}
                  className={inputCls}
                />
              </Field>
            </div>
          )}
        </fieldset>

        {notice && (
          <p role="status" className={`p-3 rounded-xl text-sm ${notice.kind === 'ok' ? 'bg-sage/10 text-sage' : 'bg-clay/10 text-clay'}`}>
            {notice.text}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => save()}
            disabled={busy}
            className="min-h-[50px] px-7 rounded-full bg-ink text-paper font-medium hover:bg-clay disabled:opacity-60 transition-colors"
          >
            {busy ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
          </button>
          {!live && (
            <button
              onClick={() => {
                if (window.confirm('Publish this chapter on the website now?')) save({ status: 'published', publish_at: new Date().toISOString() });
              }}
              disabled={busy}
              className="min-h-[50px] px-7 rounded-full bg-ember text-coal font-medium hover:brightness-95 disabled:opacity-60"
            >
              Publish now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full h-12 px-4 rounded-xl bg-paper-deep/60 border border-ink/12 focus:outline-none focus:border-ink focus:bg-paper';

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="mt-1.5 block text-xs text-muted break-all">{hint}</span>}
    </label>
  );
}

function Badge({ chapter, live }: { chapter: Chapter; live: boolean }) {
  const map = {
    live: ['Live', 'bg-sage/15 text-sage'],
    scheduled: ['Scheduled', 'bg-ember/20 text-clay'],
    coming: ['Coming soon', 'bg-ink/8 text-muted'],
    draft: ['Draft', 'bg-ink/5 text-muted'],
    published: ['Live', 'bg-sage/15 text-sage']
  } as const;
  const [label, cls] = live ? map.live : map[chapter.status];
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${cls}`}>{label}</span>;
}

function pick(d: Draft) {
  return [d.chapter_number, d.title, d.description, d.slug, d.content, d.status, d.publish_at];
}
