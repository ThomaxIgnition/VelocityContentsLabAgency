import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Download } from 'lucide-react';
import { BOOK, pad2, readingMinutes, useBook } from '../lib/book.ts';
import { usePageMeta } from '../lib/seo.ts';
import { Container, Eyebrow, Reveal, SectionHeader } from '../components/ui.tsx';

export default function BookPage() {
  const { chapters } = useBook();
  const sorted = [...chapters].sort((a, b) => a.number - b.number);
  const publishedCount = sorted.filter((c) => c.status === 'published').length;

  usePageMeta({
    title: `${BOOK.title} | The Velocity Method | Velocity Contents Lab`,
    description: `${BOOK.subtitle}. A book by ${BOOK.author}, published chapter by chapter.`,
    path: '/book',
    image: BOOK.portrait,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: BOOK.title,
      alternativeHeadline: BOOK.subtitle,
      author: { '@type': 'Person', name: BOOK.author },
      publisher: { '@type': 'Organization', name: BOOK.publisher },
      bookEdition: BOOK.edition,
      url: 'https://velocitycontentlabs.com/book'
    }
  });

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative overflow-hidden bg-ink text-paper grain">
        <span aria-hidden="true" className="absolute -bottom-10 -right-16 w-[380px] h-24 rotate-[-28deg] bg-violet/80" />
        <span aria-hidden="true" className="absolute -bottom-2 -right-24 w-[380px] h-10 rotate-[-28deg] bg-ember" />
        <Container className="relative pt-36 sm:pt-44 pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow dark>The Velocity Method</Eyebrow>
              <h1 className="mt-6 font-display text-[2.75rem] sm:text-6xl lg:text-7xl font-light leading-[1.02] tracking-[-0.03em] text-balance">
                {BOOK.title}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-paper/75 leading-relaxed">{BOOK.subtitle}</p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.22em] text-paper/60">By {BOOK.author}</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href={BOOK.pdf}
                  download
                  className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 rounded-full bg-ember text-coal font-medium hover:bg-paper transition-colors"
                >
                  <Download className="w-4 h-4" /> Download the PDF edition
                </a>
                {publishedCount > 0 && (
                  <Link
                    to={`/book/${sorted.find((c) => c.status === 'published')!.slug}`}
                    className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 rounded-full border border-paper/25 text-paper hover:bg-paper hover:text-ink transition-colors"
                  >
                    Start reading <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
              <p className="mt-4 text-sm text-paper/50">Chapters 1 to {publishedCount} · {BOOK.edition}</p>
            </div>
            <div className="lg:col-span-5">
              <AuthorPortrait />
            </div>
          </div>
        </Container>
      </section>

      {/* Before you begin */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="Before you begin" title="How this book works." accent="works." />
            </div>
            <div className="lg:col-span-8 max-w-[68ch] space-y-6">
              {BOOK.intro.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={`leading-[1.7] ${i === 0 ? 'font-display text-[1.4rem] text-ink' : 'text-[18px] text-ink/85'}`}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Chapters */}
      <section className="bg-paper-deep" id="chapters">
        <Container className="py-20 sm:py-28">
          <SectionHeader eyebrow="Chapters" title="Read chapter by chapter." accent="chapter by chapter." />
          <ol className="mt-12 grid md:grid-cols-2 gap-4">
            {sorted.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 2) * 0.06}>
                {c.status === 'published' ? (
                  <Link
                    to={`/book/${c.slug}`}
                    className="group h-full flex flex-col p-7 sm:p-8 rounded-3xl bg-paper border border-ink/10 hover:border-ink/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-4xl font-light text-clay">{pad2(c.number)}</span>
                      {c.dmKeyword && (
                        <span className="px-2.5 py-1 rounded-full bg-ember/15 text-clay font-mono text-[11px] tracking-[0.12em]">{c.dmKeyword}</span>
                      )}
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-snug tracking-tight text-ink">{c.title}</h3>
                    {c.subtitle && <p className="mt-1 text-[15px] text-clay">{c.subtitle}</p>}
                    {c.summary && <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.summary}</p>}
                    <div className="mt-auto pt-6 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted"><Clock className="w-4 h-4" /> {readingMinutes(c)} min read</span>
                      <span className="flex items-center gap-1.5 font-medium text-ink">
                        Read <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div aria-disabled="true" className="h-full flex flex-col p-7 sm:p-8 rounded-3xl border border-dashed border-ink/20">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-4xl font-light text-muted">{pad2(c.number)}</span>
                      <span className="px-2.5 py-1 rounded-full bg-ink/5 text-ink/75 text-[12px]">Coming soon</span>
                    </div>
                    <h3 className="mt-5 font-display text-2xl leading-snug tracking-tight text-ink/55">{c.title}</h3>
                    {c.summary && <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.summary}</p>}
                  </div>
                )}
              </Reveal>
            ))}
          </ol>
          <p className="mt-12 text-center text-muted">New chapters are published as the Velocity Method continues.</p>
        </Container>
      </section>
    </>
  );
}

/** Uses the author portrait if it has been added, otherwise a designed monogram. */
function AuthorPortrait() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="relative mx-auto max-w-sm lg:max-w-none">
      <div className="aspect-[4/5] rounded-[28px] overflow-hidden bg-ink-soft border border-paper/10 grid-lines">
        {!failed ? (
          <img
            src={BOOK.portrait}
            alt={`${BOOK.author}, author of ${BOOK.title}`}
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="font-display italic font-light text-[9rem] leading-none text-paper/85">T</span>
            <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-paper/50">{BOOK.author}</span>
          </div>
        )}
      </div>
      <figcaption className="mt-4 text-sm text-paper/60 text-center lg:text-left">
        {BOOK.author}, founder of Velocity Contents Lab
      </figcaption>
    </figure>
  );
}
