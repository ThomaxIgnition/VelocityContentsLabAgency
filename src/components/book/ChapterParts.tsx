import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Block, Chapter, headingId, pad2, readingMinutes } from '../../lib/book.ts';

/*
 * The building blocks of a chapter page, in the order set by the book brief.
 * Shared by the public chapter page and the admin preview so both look identical.
 */

export function ChapterHero({ chapter }: { chapter: Chapter }) {
  const minutes = readingMinutes(chapter);
  return (
    <header className="on-dark relative overflow-hidden bg-ink text-paper grain">
      <span
        aria-hidden="true"
        className="absolute -top-6 right-2 sm:right-10 font-display font-light leading-none text-paper/[0.06] text-[11rem] sm:text-[16rem] select-none"
      >
        {pad2(chapter.number)}
      </span>
      {/* Diagonal accent stripes, bottom right */}
      <span aria-hidden="true" className="absolute -bottom-10 -right-16 w-[340px] h-24 rotate-[-28deg] bg-violet/80" />
      <span aria-hidden="true" className="absolute -bottom-2 -right-24 w-[340px] h-10 rotate-[-28deg] bg-ember" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 pt-36 sm:pt-44 pb-16 sm:pb-20">
        <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-ember">Chapter {pad2(chapter.number)}</p>
        <span aria-hidden="true" className="mt-6 block w-12 h-[3px] bg-ember" />
        <h1 className="mt-6 max-w-3xl font-display text-[2.5rem] sm:text-6xl font-normal leading-[1.05] tracking-[-0.02em] text-balance">
          {chapter.title}
        </h1>
        {chapter.subtitle && <p className="mt-4 text-xl sm:text-2xl text-paper/70">{chapter.subtitle}</p>}
        <p className="mt-5 inline-flex items-center gap-2 text-sm text-paper/60">
          <Clock className="w-4 h-4" /> {minutes} min read
        </p>
        {chapter.epigraph && (
          <blockquote className="mt-8 max-w-2xl font-display italic font-light text-xl sm:text-2xl leading-snug text-paper/85">
            “{chapter.epigraph}”
          </blockquote>
        )}
        {(chapter.week || chapter.dmKeyword) && (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/55">
            {[chapter.week && `Week ${chapter.week}`, chapter.dmKeyword && `Resource keyword: ${chapter.dmKeyword}`].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </header>
  );
}

export function LeadParagraph({ text }: { text: string }) {
  return <p className="font-display italic text-[1.35rem] sm:text-[1.5rem] leading-[1.55] text-ink">{text}</p>;
}

export function ChapterBody({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.type === 'heading') {
          return (
            <h2 key={i} id={headingId(b.text)} className="scroll-mt-28 mt-14 mb-5 font-display text-[1.75rem] sm:text-[2rem] font-normal leading-tight tracking-tight text-ink">
              {b.text}
            </h2>
          );
        }
        if (b.type === 'steps') {
          return (
            <ol key={i} className="my-8 space-y-3">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-4 sm:gap-5 p-5 sm:p-6 bg-paper-deep border-l-[3px] border-ember">
                  <span className="font-mono text-sm font-semibold text-clay pt-0.5">{pad2(j + 1)}</span>
                  <span>
                    <span className="block font-semibold text-[17px] text-ink">{item.title}</span>
                    <span className="block mt-1.5 text-[17px] leading-[1.7] text-ink/80">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} className="mb-6 text-[18px] leading-[1.7] text-ink/85 whitespace-pre-line">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export function TakeawaysBox({ number, takeaways }: { number: number; takeaways: string[] }) {
  if (!takeaways.length) return null;
  return (
    <section aria-labelledby="takeaways" className="on-dark mt-14 p-7 sm:p-9 bg-ink text-paper grain rounded-2xl">
      <h2 id="takeaways" className="font-mono text-[12px] uppercase tracking-[0.2em] text-ember">
        Chapter {number} takeaways
      </h2>
      <ul className="mt-5 space-y-3">
        {takeaways.map((t, i) => (
          <li key={i} className="flex gap-3 text-[17px] leading-relaxed">
            <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Exercise with checkboxes that remember their state on this device. */
export function ExerciseBox({ slug, exercise }: { slug: string; exercise: NonNullable<Chapter['exercise']> }) {
  const key = `book-exercise-${slug}`;
  const [done, setDone] = useState<boolean[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      setDone(Array.isArray(saved) ? saved : []);
    } catch {
      setDone([]);
    }
  }, [key]);

  const toggle = (i: number) => {
    const next = exercise.steps.map((_, j) => (j === i ? !done[j] : Boolean(done[j])));
    setDone(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Progress still works for this visit.
    }
  };

  const completed = exercise.steps.filter((_, i) => done[i]).length;

  return (
    <section aria-labelledby="exercise" className="mt-8 p-7 sm:p-9 bg-paper-deep border-l-4 border-teal">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-teal-text">Your exercise</p>
      <h2 id="exercise" className="mt-3 font-display text-2xl tracking-tight text-ink">
        {exercise.title}
      </h2>
      <ul className="mt-5 space-y-2">
        {exercise.steps.map((s, i) => (
          <li key={i}>
            <label className="flex items-start gap-3 py-2 cursor-pointer">
              <input type="checkbox" checked={Boolean(done[i])} onChange={() => toggle(i)} className="peer sr-only" />
              <span
                aria-hidden="true"
                className="mt-0.5 w-6 h-6 shrink-0 rounded-md border-2 border-teal flex items-center justify-center peer-checked:bg-teal peer-focus-visible:ring-2 peer-focus-visible:ring-teal peer-focus-visible:ring-offset-2"
              >
                {done[i] && <Check className="w-4 h-4 text-white" />}
              </span>
              <span className={`text-[17px] leading-relaxed ${done[i] ? 'text-muted line-through' : 'text-ink/85'}`}>{s}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {completed} of {exercise.steps.length} done
      </p>
    </section>
  );
}

export function ResourceCTA({ keyword }: { keyword: string }) {
  return (
    <section className="mt-8 p-7 sm:p-9 rounded-2xl border border-ink/12 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <p className="text-[17px] leading-relaxed text-ink/85">
        Get the companion resource: <strong className="font-semibold text-ink">DM {keyword}</strong> on LinkedIn or Instagram.
      </p>
      <Link to="/insights#toolkits" className="inline-flex items-center gap-2 min-h-[44px] text-clay font-medium shrink-0 hover:underline underline-offset-4">
        Resource Vault <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

export function NextChapterCard({ next, to }: { next: NonNullable<Chapter['nextChapter']>; to: string }) {
  return (
    <Link to={to} className="group mt-8 block p-7 sm:p-9 bg-paper-deep border-l-4 border-violet hover:bg-ink/5 transition-colors">
      <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-violet-text">Coming up next</p>
      <h2 className="mt-3 font-display text-2xl tracking-tight text-ink flex items-center gap-2">
        {next.title}
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </h2>
      <p className="mt-2 text-[17px] leading-relaxed text-ink/75">{next.text}</p>
    </Link>
  );
}
