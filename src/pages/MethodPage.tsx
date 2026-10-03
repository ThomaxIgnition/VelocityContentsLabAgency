import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { CLIENT_NEEDS, COFFEE_SHOP_TEST, COMMITMENTS, METHODS, PROCESS } from '../content.ts';
import { ClosingCTA, Container, PageHero, Reveal, SectionHeader } from '../components/ui.tsx';

export default function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title="A clear process, with sign-off at every stage."
        accent="sign-off"
        intro="You always know what happens next, what it costs, and what ‘done’ means, before any work begins."
      />
      <Timeline />

      {/* What we need */}
      <section className="bg-paper-deep">
        <Container className="py-24 sm:py-32">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="What we need from you"
                title="Four things that keep projects on time."
                accent="on time."
              />
            </div>
            <ol className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {CLIENT_NEEDS.map((need, i) => (
                <Reveal as="li" key={need} delay={i * 0.08} className="p-7 rounded-3xl bg-paper border border-ink/10">
                  <span className="font-display text-4xl font-light text-clay">{i + 1}</span>
                  <p className="mt-4 text-[17px] leading-relaxed text-ink/85">{need}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Commitments */}
      <section className="on-dark bg-ink text-paper grain" id="commitments">
        <Container className="py-24 sm:py-32">
          <SectionHeader
            dark
            eyebrow="Commitments & risk management"
            title="How we protect your investment."
            accent="protect"
          />
          <dl className="mt-14 grid md:grid-cols-2 gap-x-12">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.area} delay={(i % 2) * 0.08} className="group flex gap-5 py-7 border-t border-paper/12">
                <ShieldCheck className="w-5 h-5 text-ember shrink-0 mt-1 transition-transform duration-500 group-hover:scale-125" />
                <div>
                  <dt className="font-display text-xl tracking-tight">{c.area}</dt>
                  <dd className="mt-2 text-paper/65 leading-relaxed">{c.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Methods */}
      <section className="bg-paper">
        <Container className="py-24 sm:py-32">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Methods developed in-house"
                title="Documented, repeatable, explainable."
                accent="explainable."
              />
              <Reveal delay={0.2}>
                <div className="mt-10 p-8 rounded-3xl bg-ember text-coal">
                  <h3 className="font-display text-3xl tracking-tight">The Coffee Shop Test</h3>
                  <p className="mt-3 text-coal/80 leading-relaxed">{COFFEE_SHOP_TEST}</p>
                </div>
              </Reveal>
            </div>
            <ul className="lg:col-span-7 border-t border-ink/15">
              {METHODS.map((m, i) => (
                <Reveal as="li" key={m.id} delay={i * 0.06} className="group py-7 border-b border-ink/15">
                  <div className="flex gap-6">
                    <span className="font-mono text-xs text-clay pt-2">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display text-2xl tracking-tight group-hover:text-clay transition-colors">{m.name}</h3>
                      <p className="mt-2 text-muted leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] });

  return (
    <section className="bg-paper">
      <Container className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader eyebrow="Six stages" title="From first call to final handover." accent="final handover." />
            </div>
          </div>
          <ol ref={ref} className="relative lg:col-span-8 pl-12 sm:pl-16">
            <span className="absolute left-[19px] sm:left-[23px] top-2 bottom-2 w-px bg-ink/12" aria-hidden="true" />
            <motion.span
              aria-hidden="true"
              style={{ scaleY: scrollYProgress }}
              className="absolute left-[19px] sm:left-[23px] top-2 bottom-2 w-px bg-clay origin-top"
            />
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={0.05} className={`relative ${i < PROCESS.length - 1 ? 'pb-14 sm:pb-20' : ''}`}>
                <span className="absolute -left-12 sm:-left-16 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-paper border border-ink/15 flex items-center justify-center font-mono text-xs text-clay">
                  {p.n}
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-paper-deep font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {p.when}
                </span>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl font-light tracking-tight">{p.title}</h3>
                <p className="mt-3 text-lg text-muted leading-relaxed max-w-xl">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
