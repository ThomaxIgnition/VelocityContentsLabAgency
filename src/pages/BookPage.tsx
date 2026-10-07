import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowDown, ArrowRight, Clock } from 'lucide-react';
import { BOOK, headingId, pad2, useBook } from '../lib/book.ts';
import { usePageMeta } from '../lib/seo.ts';
import { Container, Eyebrow, Reveal } from '../components/ui.tsx';
import story from '../content/about-the-book.json';

type StoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: { title: string; text: string }[] }
  | { type: 'button'; label: string; link: string }
  | { type: 'signature'; name: string; title: string };

const BLOCKS = story.sections as StoryBlock[];
const HEADINGS = BLOCKS.filter((b): b is { type: 'heading'; text: string } => b.type === 'heading').map((b) => b.text);
const STORY_MINUTES = Math.max(
  1,
  Math.round(
    BLOCKS.map((b) => ('text' in b ? b.text : b.type === 'list' ? b.items.map((i) => `${i.title} ${i.text}`).join(' ') : ''))
      .join(' ')
      .split(/\s+/).length / 200
  )
);

export default function BookPage() {
  const { chapters } = useBook();
  const published = chapters.filter((c) => c.status === 'published').sort((a, b) => a.number - b.number);
  const first = published[0];

  usePageMeta({
    title: `${story.headline} | ${BOOK.title} | Velocity Contents Lab`,
    description: story.metaDescription,
    path: '/book',
    image: BOOK.portrait,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: BOOK.title,
      alternativeHeadline: BOOK.subtitle,
      description: story.metaDescription,
      author: { '@type': 'Person', name: BOOK.author },
      publisher: { '@type': 'Organization', name: BOOK.publisher },
      bookEdition: BOOK.edition,
      image: `https://velocitycontentlabs.com${BOOK.portrait}`,
      url: 'https://velocitycontentlabs.com/book'
    }
  });

  return (
    <>
      <StoryProgress />

      {/* Hero */}
      <section className="on-dark relative overflow-hidden bg-ink text-paper grain">
        <span aria-hidden="true" className="absolute -bottom-10 -right-16 w-[380px] h-24 rotate-[-28deg] bg-violet/80" />
        <span aria-hidden="true" className="absolute -bottom-2 -right-24 w-[380px] h-10 rotate-[-28deg] bg-ember" />
        <Container className="relative pt-36 sm:pt-44 pb-20 sm:pb-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Eyebrow dark>{BOOK.title}</Eyebrow>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 font-display text-[2.75rem] sm:text-6xl lg:text-[4.5rem] font-light leading-[1.02] tracking-[-0.03em] text-balance"
              >
                It Started With a <span className="italic text-ember">Glass of Lemonade</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 max-w-xl text-xl text-paper/75 leading-relaxed"
              >
                {story.subheadline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-10 flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 rounded-full bg-ember text-coal font-medium hover:bg-paper transition-colors"
                >
                  Read the story <ArrowDown className="w-4 h-4" />
                </a>
                {first && (
                  <Link
                    to={`/book/${first.slug}`}
                    className="inline-flex items-center justify-center gap-2.5 min-h-[50px] px-7 rounded-full border border-paper/25 text-paper hover:bg-paper hover:text-ink transition-colors"
                  >
                    Start with Chapter 1 <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </motion.div>
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-paper/60">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {STORY_MINUTES} min read</span>
                <span aria-hidden="true">·</span>
                <span>{published.length} chapters free to read</span>
                <span aria-hidden="true">·</span>
                <span>By {BOOK.author}</span>
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <AuthorPortrait />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* The story */}
      <section id="story" className="bg-paper scroll-mt-16">
        <Container className="py-20 sm:py-28">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 xl:gap-24">
            <article className="max-w-[68ch] mx-auto lg:mx-0 w-full">
              <StoryBody />
            </article>
            <aside className="hidden lg:block">
              <StoryNav first={first?.slug} />
            </aside>
          </div>
        </Container>
      </section>

    </>
  );
}

/** Renders the "About the book" story exactly as written. */
function StoryBody() {
  let firstParagraph = true;
  return (
    <>
      {BLOCKS.map((b, i) => {
        switch (b.type) {
          case 'paragraph': {
            const isFirst = firstParagraph;
            firstParagraph = false;
            return (
              <Reveal key={i} y={14}>
                <p
                  className={`mb-6 text-[19px] leading-[1.75] text-ink/85 ${
                    isFirst
                      ? 'first-letter:float-left first-letter:font-display first-letter:text-[4.5rem] first-letter:leading-[0.85] first-letter:mr-3 first-letter:mt-1 first-letter:text-clay text-ink'
                      : ''
                  }`}
                >
                  {b.text}
                </p>
              </Reveal>
            );
          }
          case 'quote':
            return (
              <Reveal key={i}>
                <figure className="on-dark my-12 -mx-1 sm:-mx-6 p-8 sm:p-10 rounded-3xl bg-ink text-paper grain relative overflow-hidden">
                  <span aria-hidden="true" className="absolute -top-6 left-4 font-display italic text-[9rem] leading-none text-ember/25 select-none">“</span>
                  <blockquote className="relative font-display italic font-light text-2xl sm:text-[2rem] leading-snug">
                    {b.text}
                  </blockquote>
                  <figcaption className="relative mt-5 text-sm text-paper/60">His daughter, at her lemonade stand</figcaption>
                </figure>
              </Reveal>
            );
          case 'heading':
            return (
              <Reveal key={i}>
                <h2 id={headingId(b.text)} className="scroll-mt-28 mt-16 mb-6 font-display text-[1.9rem] sm:text-[2.25rem] font-light leading-tight tracking-tight text-ink">
                  <span aria-hidden="true" className="block w-10 h-[3px] bg-ember mb-5" />
                  {b.text}
                </h2>
              </Reveal>
            );
          case 'list':
            return (
              <ul key={i} className="my-8 grid gap-3">
                {b.items.map((item, j) => (
                  <Reveal as="li" key={j} delay={j * 0.06} className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-paper-deep border-l-[3px] border-ember">
                    <span className="font-mono text-sm font-semibold text-clay pt-0.5">{pad2(j + 1)}</span>
                    <span className="text-[17px] leading-relaxed">
                      <strong className="font-semibold text-ink">{item.title}</strong> <span className="text-ink/80">{item.text}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
            );
          case 'button':
            return (
              <Reveal key={i}>
                <Link
                  to={b.link}
                  className="group mt-4 mb-12 inline-flex items-center gap-2.5 min-h-[54px] px-8 rounded-full bg-ink text-paper font-medium hover:bg-clay transition-colors"
                >
                  {b.label}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            );
          case 'signature':
            return (
              <Reveal key={i}>
                <div className="pt-8 border-t border-ink/12 flex items-center gap-4">
                  <img src={BOOK.portrait} alt="" className="w-14 h-14 rounded-full object-cover object-[50%_22%]" />
                  <div>
                    <p className="font-display italic text-3xl leading-none text-ink">{b.name}</p>
                    <p className="mt-2 text-sm text-muted">{b.title}</p>
                  </div>
                </div>
              </Reveal>
            );
        }
      })}
    </>
  );
}

/** Desktop side panel: where you are in the story, plus the way into Chapter 1. */
function StoryNav({ first }: { first?: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = HEADINGS.map((h) => document.getElementById(headingId(h))).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="The story" className="sticky top-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">The story</p>
      <ul className="mt-4 space-y-1 border-l border-ink/12">
        {HEADINGS.map((h) => {
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
      <div className="mt-10 p-5 rounded-2xl bg-paper-deep">
        <p className="text-sm text-muted">Ready for the method?</p>
        {first && (
          <Link to={`/book/${first}`} className="mt-2 inline-flex items-center gap-1.5 min-h-[40px] font-medium text-ink hover:text-clay">
            Chapter 1 <ArrowRight className="w-4 h-4" />
          </Link>
        )}
        <Link to="/insights" className="block text-sm text-clay hover:underline underline-offset-4">
          See all chapters
        </Link>
      </div>
    </nav>
  );
}

function StoryProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] bg-ember origin-left z-[60]" />;
}

/** The author portrait, framed with an offset ember outline and a name plate. */
function AuthorPortrait() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="relative mx-auto max-w-[340px] sm:max-w-sm lg:max-w-none pr-4 pb-4 sm:pr-6 sm:pb-6">
      <span aria-hidden="true" className="absolute inset-0 top-4 left-4 sm:top-6 sm:left-6 rounded-[28px] border-2 border-ember" />
      <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-ink-soft grid-lines shadow-2xl shadow-black/40">
        {!failed ? (
          <img
            src={BOOK.portrait}
            alt={`${BOOK.author}, author of ${BOOK.title}`}
            className="w-full h-full object-cover object-[50%_22%]"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display italic font-light text-[9rem] leading-none text-paper/85">T</span>
          </div>
        )}
      </div>
      <figcaption className="absolute left-4 bottom-0 sm:left-6 px-5 py-3.5 rounded-2xl bg-paper text-ink shadow-xl">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Written by</span>
        <span className="block mt-1 font-display text-xl leading-none">{BOOK.author}</span>
      </figcaption>
    </figure>
  );
}
