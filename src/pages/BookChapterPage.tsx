import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BOOK, headingId, useBook } from '../lib/book.ts';
import { usePageMeta } from '../lib/seo.ts';
import { Button, Container } from '../components/ui.tsx';
import {
  ChapterBody,
  ChapterHero,
  ExerciseBox,
  LeadParagraph,
  NextChapterCard,
  ResourceCTA,
  TakeawaysBox
} from '../components/book/ChapterParts.tsx';

export default function BookChapterPage() {
  const { slug } = useParams();
  const { chapters, loading } = useBook();
  const chapter = chapters.find((c) => c.slug === slug);
  const published = chapters.filter((c) => c.status === 'published').sort((a, b) => a.number - b.number);
  const index = published.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? published[index - 1] : null;
  const next = index >= 0 ? published[index + 1] ?? null : null;

  usePageMeta(
    chapter && chapter.status === 'published'
      ? {
          title: `${chapter.title} | ${BOOK.title} | Velocity Contents Lab`,
          description: chapter.summary,
          path: `/book/${chapter.slug}`,
          image: BOOK.portrait,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Chapter',
            name: chapter.title,
            position: chapter.number,
            description: chapter.summary,
            url: `https://velocitycontentlabs.com/book/${chapter.slug}`,
            author: { '@type': 'Person', name: BOOK.author },
            publisher: { '@type': 'Organization', name: BOOK.publisher },
            isPartOf: { '@type': 'Book', name: BOOK.title, author: { '@type': 'Person', name: BOOK.author } }
          }
        }
      : null
  );

  if (loading && !chapter) return <div className="min-h-screen bg-paper" aria-busy="true" />;

  if (!chapter || chapter.status !== 'published') {
    return (
      <section className="min-h-screen bg-paper flex items-center">
        <Container className="py-40 text-center flex flex-col items-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-clay">{chapter ? `Chapter ${chapter.number}` : BOOK.title}</p>
          <h1 className="mt-5 max-w-2xl font-display text-4xl sm:text-5xl font-light tracking-tight">
            {chapter ? chapter.title : 'This chapter could not be found.'}
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            {chapter ? 'This chapter is coming soon. New chapters are published as the Velocity Method continues.' : 'It may have moved, or the link is incorrect.'}
          </p>
          <Button to="/book" variant="primary" className="mt-10">See all chapters</Button>
        </Container>
      </section>
    );
  }

  const headings = chapter.body.filter((b) => b.type === 'heading').map((b) => (b as { text: string }).text);
  const nextLink = next ? `/book/${next.slug}` : '/book';

  return (
    <article>
      <ReadingProgress />
      <ChapterHero chapter={chapter} />

      <div className="bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 xl:gap-24">
            <div className="max-w-[68ch] mx-auto lg:mx-0 w-full">
              {chapter.lead && <LeadParagraph text={chapter.lead} />}
              <div className="mt-10">
                <ChapterBody blocks={chapter.body} />
              </div>
              <TakeawaysBox number={chapter.number} takeaways={chapter.takeaways} />
              {chapter.exercise && chapter.exercise.steps.length > 0 && <ExerciseBox slug={chapter.slug} exercise={chapter.exercise} />}
              {chapter.dmKeyword && <ResourceCTA keyword={chapter.dmKeyword} />}
              {chapter.nextChapter && <NextChapterCard next={chapter.nextChapter} to={nextLink} />}

              <nav aria-label="Chapters" className="mt-14 pt-8 border-t border-ink/12 grid sm:grid-cols-2 gap-4">
                {prev ? (
                  <Link to={`/book/${prev.slug}`} className="p-5 rounded-2xl border border-ink/12 hover:border-ink/40 transition-colors">
                    <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft className="w-4 h-4" /> Chapter {prev.number}</span>
                    <span className="mt-1.5 block font-display text-lg leading-snug">{prev.title}</span>
                  </Link>
                ) : (
                  <Link to="/book" className="p-5 rounded-2xl border border-ink/12 hover:border-ink/40 transition-colors">
                    <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft className="w-4 h-4" /> The book</span>
                    <span className="mt-1.5 block font-display text-lg leading-snug">All chapters</span>
                  </Link>
                )}
                {next && (
                  <Link to={`/book/${next.slug}`} className="p-5 rounded-2xl border border-ink/12 hover:border-ink/40 transition-colors sm:text-right">
                    <span className="flex items-center sm:justify-end gap-2 text-sm text-muted">Chapter {next.number} <ArrowRight className="w-4 h-4" /></span>
                    <span className="mt-1.5 block font-display text-lg leading-snug">{next.title}</span>
                  </Link>
                )}
              </nav>
            </div>

            {headings.length > 1 && (
              <aside className="hidden lg:block">
                <TableOfContents headings={headings} />
              </aside>
            )}
          </div>
        </Container>
      </div>
    </article>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-ember origin-left z-[60]" />;
}

function TableOfContents({ headings }: { headings: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(headingId(h))).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="In this chapter" className="sticky top-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">In this chapter</p>
      <ul className="mt-4 space-y-1 border-l border-ink/12">
        {headings.map((h) => {
          const id = headingId(h);
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`block -ml-px pl-4 py-1.5 border-l-2 text-sm leading-snug transition-colors ${
                  active === id ? 'border-ember text-ink' : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {h}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
