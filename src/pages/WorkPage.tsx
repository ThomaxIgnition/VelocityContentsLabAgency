import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ENGAGEMENTS, SERVICE_LINES, ServiceLineId, TESTIMONIALS } from '../content.ts';
import { Button, ClosingCTA, Container, PageHero, Reveal, SectionHeader, openCal } from '../components/ui.tsx';

const LINE_LABEL: Record<ServiceLineId, string> = { content: 'Content', automation: 'Automation', software: 'Software' };

export default function WorkPage() {
  const [filter, setFilter] = useState<ServiceLineId | 'all'>('all');
  const rows = ENGAGEMENTS.filter((e) => filter === 'all' || e.lines.includes(filter));
  const [featured, ...others] = TESTIMONIALS;

  return (
    <>
      <PageHero
        eyebrow="Client work"
        title="Proof lives in working systems and happy clients."
        accent="working systems"
        intro="Recent client work across our three service lines, in our clients’ own words. References are available on request."
      />

      {/* Featured story */}
      <section className="bg-paper">
        <Container className="py-24 sm:py-32">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="Featured client story" title={featured.name} />
              <Reveal delay={0.15}>
                <p className="mt-4 text-muted">{featured.project}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featured.lines.map((l) => (
                    <span key={l} className="px-3 py-1.5 rounded-full border border-ink/15 text-[13px]">{LINE_LABEL[l]}</span>
                  ))}
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-8">
              <figure className="relative">
                <span aria-hidden="true" className="absolute -top-10 -left-2 font-display italic text-[8rem] leading-none text-clay/20 select-none">“</span>
                <blockquote className="relative font-display font-light text-[1.5rem] sm:text-[2rem] leading-[1.35] tracking-[-0.01em] text-ink">
                  {featured.quote}
                  <span className="block mt-6">
                    I would confidently recommend Velocity Contents Lab to any business or organization looking for a custom software solution, system
                    integration, or technology project that needs to be properly understood and professionally delivered.
                  </span>
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Other testimonials */}
      <section className="bg-paper-deep">
        <Container className="py-24 sm:py-28">
          <ul className="grid md:grid-cols-2 gap-5">
            {others.map((t, i) => (
              <Reveal as="li" key={t.name} delay={i * 0.1} className="flex flex-col p-8 sm:p-10 rounded-3xl bg-paper border border-ink/10">
                <div className="flex flex-wrap gap-2">
                  {t.lines.map((l) => (
                    <span key={l} className="px-3 py-1 rounded-full bg-paper-deep text-[12px] text-ink/75">{LINE_LABEL[l]}</span>
                  ))}
                </div>
                <blockquote className="mt-8 font-display text-xl sm:text-[1.4rem] font-light leading-relaxed tracking-tight">“{t.quote}”</blockquote>
                <div className="mt-auto pt-10 flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center font-display">{t.name.charAt(0)}</span>
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-sm text-muted">{t.project}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* In their own words */}
      <section className="on-dark bg-ink text-paper grain overflow-hidden">
        <Container className="py-24 sm:py-32">
          <SectionHeader dark eyebrow="Results in clients’ own words" title="What changed for them." accent="changed" />
          <ul className="mt-14 grid md:grid-cols-3 gap-px bg-paper/10 rounded-3xl overflow-hidden border border-paper/10">
            {[
              ['A software and integration project that', 'continues to deliver value'],
              ['A website and WhatsApp system that', 'made a noticeable difference in how we serve our customers'],
              ['Content that doesn’t only convert to sales, and automation that lets the owner', 'make money while I sleep']
            ].map(([lead, quote], i) => (
              <Reveal as="li" key={quote} delay={i * 0.1} className="bg-ink p-8 sm:p-10">
                <p className="text-paper/60 leading-relaxed">{lead}</p>
                <p className="mt-4 font-display text-2xl sm:text-3xl font-light italic leading-snug text-ember">“{quote}”</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Engagement table */}
      <section className="bg-paper">
        <Container className="py-24 sm:py-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <SectionHeader
              eyebrow="Selected engagements"
              title="Recent client work."
              accent="client"
              intro="Client identities not shown are shared with permission during evaluation."
            />
            <Reveal delay={0.15}>
              <div role="tablist" aria-label="Filter by service line" className="flex flex-wrap gap-2">
                {(['all', ...SERVICE_LINES.map((s) => s.id)] as const).map((id) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={filter === id}
                    onClick={() => setFilter(id)}
                    className={`min-h-[44px] px-5 rounded-full text-sm transition-colors ${
                      filter === id ? 'bg-ink text-paper' : 'border border-ink/15 text-ink/75 hover:border-ink/40'
                    }`}
                  >
                    {id === 'all' ? 'All work' : LINE_LABEL[id]}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.ul layout className="mt-12 border-t border-ink/15">
            <AnimatePresence initial={false}>
              {rows.map((e) => (
                <motion.li
                  layout
                  key={`${e.client}-${e.type}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-12 gap-x-6 gap-y-2 py-7 border-b border-ink/15"
                >
                  <div className="col-span-12 md:col-span-4">
                    <p className="font-display text-xl sm:text-2xl tracking-tight">{e.client}</p>
                    <p className="text-sm text-muted mt-1">{e.type}</p>
                  </div>
                  <p className="col-span-12 md:col-span-6 text-[15px] text-ink/80 leading-relaxed">{e.delivered}</p>
                  <div className="col-span-12 md:col-span-2 flex flex-wrap md:justify-end gap-1.5 content-start">
                    {e.lines.map((l) => (
                      <span key={l} className="px-2.5 py-1 rounded-full bg-paper-deep text-[12px] text-ink/70">{LINE_LABEL[l]}</span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <Reveal>
            <div className="mt-16 grid md:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-[32px] bg-paper-deep">
              <div className="md:col-span-8">
                <h3 className="font-display text-3xl sm:text-4xl font-light tracking-tight">See it for yourself.</h3>
                <p className="mt-3 text-muted leading-relaxed max-w-xl">
                  On request, we demonstrate our AI customer care agent and automation workflows live, so you can test them before you commit.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
                <Button to="/contact" variant="primary">Request a live demo</Button>
                <Button onClick={openCal} variant="ghost" icon={false}>Try Cal now</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}
