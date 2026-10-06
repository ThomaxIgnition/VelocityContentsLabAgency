import { ArrowRight, BookOpen, CalendarDays, Inbox } from 'lucide-react';
import { CalendarItem, Chapter, Enquiry, formatDateTime, isLive, useLiveTable } from './api.ts';
import type { Tab } from './AdminApp.tsx';

export default function Overview({ goTo }: { goTo: (t: Tab) => void }) {
  const { rows: chapters, loading: lc } = useLiveTable<Chapter>('chapters', 'chapter_number');
  const { rows: posts, loading: lp } = useLiveTable<CalendarItem>('calendar_items', 'scheduled_at');
  const { rows: enquiries } = useLiveTable<Enquiry>('enquiries', 'created_at');
  const newEnquiries = enquiries.filter((e) => e.status === 'new');

  const now = new Date();
  const weekAhead = new Date(now.getTime() + 7 * 864e5);
  const live = chapters.filter(isLive);
  const nextChapter = chapters
    .filter((c) => c.status === 'scheduled' && c.publish_at && new Date(c.publish_at) > now)
    .sort((a, b) => +new Date(a.publish_at!) - +new Date(b.publish_at!))[0];
  const inProgress = chapters.filter((c) => !isLive(c));
  const upcoming = posts
    .filter((p) => p.scheduled_at && new Date(p.scheduled_at) >= now && p.status !== 'published')
    .sort((a, b) => +new Date(a.scheduled_at!) - +new Date(b.scheduled_at!));
  const thisWeek = upcoming.filter((p) => new Date(p.scheduled_at!) <= weekAhead);
  const ideas = posts.filter((p) => p.status === 'idea' || p.status === 'draft');

  const stats = [
    { label: 'Chapters published', value: live.length, of: chapters.length },
    { label: 'Chapters in progress', value: inProgress.length },
    { label: 'Posts this week', value: thisWeek.length },
    { label: 'Ideas & drafts', value: ideas.length }
  ];

  return (
    <div>
      <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight">
        {greeting()}, Thomax.
      </h1>
      <p className="mt-2 text-muted">Here is where the book and your content stand today.</p>

      {newEnquiries.length > 0 && (
        <button
          onClick={() => goTo('enquiries')}
          className="mt-6 w-full text-left flex items-center gap-4 p-5 rounded-2xl bg-ember/15 border border-ember/40 hover:bg-ember/25 transition-colors"
        >
          <Inbox className="w-6 h-6 text-clay shrink-0" />
          <span className="flex-1">
            <span className="block font-medium">
              {newEnquiries.length} new {newEnquiries.length === 1 ? 'enquiry' : 'enquiries'} waiting for a reply
            </span>
            <span className="block text-sm text-muted">Latest from {newEnquiries.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))[0].name}</span>
          </span>
          <ArrowRight className="w-5 h-5 text-clay" />
        </button>
      )}

      <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
        {stats.map((s) => (
          <div key={s.label} className="bg-paper p-5 sm:p-6">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="mt-2 font-display text-4xl font-light">
              {lc || lp ? '–' : s.value}
              {s.of !== undefined && !lc && <span className="text-xl text-muted"> / {s.of}</span>}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid lg:grid-cols-2 gap-5">
        <section className="p-6 sm:p-8 rounded-3xl border border-ink/12">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-2xl tracking-tight">
              <BookOpen className="w-5 h-5 text-clay" /> The book
            </h2>
            <button onClick={() => goTo('book')} className="inline-flex items-center gap-1 text-sm text-clay min-h-[44px]">
              Open <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {nextChapter ? (
            <p className="mt-4 text-[15px]">
              Next release: <strong>Chapter {nextChapter.chapter_number}, {nextChapter.title}</strong>
              <span className="block text-muted text-sm mt-1">Goes live {formatDateTime(nextChapter.publish_at)}</span>
            </p>
          ) : (
            <p className="mt-4 text-[15px] text-muted">No chapter is scheduled yet. Open the Book to write or schedule the next one.</p>
          )}
          <ul className="mt-5 space-y-2">
            {chapters.slice(0, 10).map((c) => (
              <li key={c.id} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-muted font-mono text-xs">{String(c.chapter_number).padStart(2, '0')}</span>
                <span className="flex-1 truncate">{c.title}</span>
                <StatusDot live={isLive(c)} status={c.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className="p-6 sm:p-8 rounded-3xl border border-ink/12">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-2xl tracking-tight">
              <CalendarDays className="w-5 h-5 text-clay" /> Coming up
            </h2>
            <button onClick={() => goTo('calendar')} className="inline-flex items-center gap-1 text-sm text-clay min-h-[44px]">
              Calendar <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-[15px] text-muted">Nothing scheduled. Add posts in the Calendar.</p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/10">
              {upcoming.slice(0, 8).map((p) => (
                <li key={p.id} className="py-3 flex gap-4">
                  <span className="w-28 shrink-0 text-sm text-muted">{formatDateTime(p.scheduled_at)}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[15px]">{p.title}</span>
                    <span className="text-xs text-muted">{p.platform}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function StatusDot({ live, status }: { live: boolean; status: Chapter['status'] }) {
  const label = live ? 'Live' : status === 'scheduled' ? 'Scheduled' : status === 'coming' ? 'Coming soon' : 'Draft';
  const color = live ? 'bg-sage' : status === 'scheduled' ? 'bg-ember' : status === 'coming' ? 'bg-ink/30' : 'bg-ink/15';
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted shrink-0">
      <span className={`w-2 h-2 rounded-full ${color}`} /> {label}
    </span>
  );
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
