import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useChapters } from '../lib/chapters.ts';
import { COMPANY } from '../content.ts';
import ChapterContent from '../components/ChapterContent.tsx';
import { Button, Container, Reveal } from '../components/ui.tsx';

export default function ChapterPage() {
  const { slug } = useParams();
  const { chapters, loading } = useChapters();
  const published = chapters.filter((c) => c.status === 'PUBLISHED').sort((a, b) => a.chapterNumber - b.chapterNumber);
  const chapter = chapters.find((c) => c.slug === slug);

  if (loading && !chapter?.content) {
    return <div className="min-h-screen bg-paper" aria-busy="true" />;
  }

  if (!chapter || chapter.status !== 'PUBLISHED' || !chapter.content) {
    return (
      <section className="min-h-screen bg-paper flex items-center">
        <Container className="py-40 text-center flex flex-col items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
            {chapter ? `Chapter ${chapter.chapterNumber}` : 'The book'}
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl font-light tracking-tight max-w-2xl">
            {chapter ? chapter.title : 'This chapter could not be found.'}
          </h1>
          <p className="mt-5 text-muted text-lg max-w-md">
            {chapter ? 'This chapter is still being written. It will appear here as soon as it is published.' : 'It may have moved, or the link is incorrect.'}
          </p>
          <Button to="/insights" variant="primary" className="mt-10">Browse all chapters</Button>
        </Container>
      </section>
    );
  }

  const words = chapter.content.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  const date = chapter.publishedAt
    ? new Date(chapter.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;
  const index = published.findIndex((c) => c.slug === chapter.slug);
  const prev = index > 0 ? published[index - 1] : null;
  const next = index >= 0 && index < published.length - 1 ? published[index + 1] : null;

  return (
    <article className="bg-paper">
      <Container className="pt-32 sm:pt-40 pb-24">
        <div className="max-w-[720px] mx-auto">
          <Link to="/insights" className="inline-flex items-center gap-2 min-h-[44px] text-sm text-muted hover:text-ink transition-colors">
            <ArrowLeft className="w-4 h-4" /> All chapters
          </Link>

          <Reveal>
            <header className="mt-8 pb-10 border-b border-ink/12">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="text-clay">Chapter {chapter.chapterNumber}</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {minutes} min read
                </span>
              </div>
              <h1 className="mt-6 font-display text-[2.4rem] sm:text-5xl font-light leading-[1.08] tracking-[-0.02em] text-balance">
                {chapter.title}
              </h1>
              {chapter.description && <p className="mt-5 text-lg text-muted leading-relaxed">{chapter.description}</p>}
              <div className="mt-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center font-display">T</span>
                <span className="text-sm">
                  <span className="block font-medium">{COMPANY.founder}</span>
                  <span className="block text-muted">{[COMPANY.city, date].filter(Boolean).join(' · ')}</span>
                </span>
              </div>
            </header>
          </Reveal>

          <div className="mt-10">
            <ChapterContent content={chapter.content} />
          </div>

          <nav aria-label="More chapters" className="mt-16 grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="group p-6 rounded-2xl border border-ink/12 hover:border-ink/40 transition-colors">
                <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft className="w-4 h-4" /> Previous chapter</span>
                <span className="mt-2 block font-display text-lg leading-snug">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/blog/${next.slug}`} className="group p-6 rounded-2xl border border-ink/12 hover:border-ink/40 transition-colors sm:text-right">
                <span className="flex items-center sm:justify-end gap-2 text-sm text-muted">Next chapter <ArrowRight className="w-4 h-4" /></span>
                <span className="mt-2 block font-display text-lg leading-snug">{next.title}</span>
              </Link>
            )}
          </nav>

          <div className="on-dark mt-12 p-8 sm:p-10 rounded-3xl bg-ink text-paper grain flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl tracking-tight">Want these ideas working in your business?</h2>
              <p className="mt-2 text-paper/65">Book a free discovery call with Thomax.</p>
            </div>
            <Button to="/contact" variant="ember" className="shrink-0">Book a call</Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
