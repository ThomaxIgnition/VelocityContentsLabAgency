import { COMPANY, FOUNDER, HISTORY, TOOLS, WHO_WE_SERVE } from '../content.ts';
import {
  ClosingCTA,
  Container,
  Eyebrow,
  FounderPortrait,
  PageHero,
  Reveal,
  ScrollText,
  SectionHeader
} from '../components/ui.tsx';
import LemonadeStory from '../components/shared/LemonadeStory.tsx';

export default function AboutPage() {
  const companyFacts: [string, string][] = [
    ['Registered name', 'VELOCITY CONTENTS LAB LTD'],
    ['Company type', COMPANY.companyType],
    ['Registration', `${COMPANY.registrationAuthority} · ${COMPANY.rc}`],
    ['Incorporated', COMPANY.incorporated],
    ['Operating since', `${COMPANY.operatingSince}, as a founder-led practice`],
    ['Registered address', COMPANY.address],
    ['Delivery', COMPANY.delivery],
    ['Business hours', COMPANY.hours],
    ['Response time', COMPANY.responseTime],
    ['Email', COMPANY.email]
  ];

  return (
    <>
      <PageHero
        eyebrow="About Velocity Contents Lab"
        title="Founder-led, from first call to final handover."
        accent="first call final handover."
        intro="We help businesses communicate clearly and operate efficiently. Every engagement is led personally by our founder, Emmanuel Sunday Thomas."
      />

      <section className="bg-paper">
        <Container className="py-24 sm:py-36">
          <Reveal>
            <Eyebrow>Who we are</Eyebrow>
          </Reveal>
          <ScrollText
            text="We build content strategies that make a business and its leaders visible to the right people. We build AI automation that takes repetitive work off people’s desks. And we build custom software that connects the tools a business already depends on."
            className="mt-8 max-w-5xl font-display font-light text-[1.9rem] sm:text-5xl leading-[1.15] tracking-[-0.02em]"
          />
        </Container>
      </section>

      {/* History */}
      <section className="bg-paper-deep">
        <Container className="py-24 sm:py-32">
          <SectionHeader eyebrow="Company history" title="From practice to company." accent="company." />
          <ol className="mt-14 grid md:grid-cols-3 gap-5">
            {HISTORY.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.12} className="relative p-8 rounded-3xl bg-paper border border-ink/10">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-clay">{h.when}</span>
                <h3 className="mt-5 font-display text-2xl tracking-tight">{h.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{h.body}</p>
                {i < HISTORY.length - 1 && (
                  <span aria-hidden="true" className="hidden md:block absolute top-1/2 -right-[14px] w-[23px] h-px bg-clay" />
                )}
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-paper" id="founder">
        <Container className="py-24 sm:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
              <FounderPortrait className="aspect-[4/5]" />
            </Reveal>
            <div className="lg:col-span-7">
              <SectionHeader eyebrow="Leadership" title={`${COMPANY.founder} (Thomax)`} />
              <Reveal delay={0.1}>
                <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{COMPANY.founderTitle}</p>
                <p className="mt-8 text-xl leading-relaxed text-ink/85">{FOUNDER.bio}</p>
              </Reveal>

              <div className="mt-12 grid sm:grid-cols-2 gap-10">
                <Reveal delay={0.1}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Education & training</h3>
                  <ul className="mt-5 space-y-4">
                    {FOUNDER.education.map((e) => (
                      <li key={e} className="pl-4 border-l-2 border-clay text-[15px] leading-relaxed">{e}</li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.2}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Expertise</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {FOUNDER.expertise.map((e) => (
                      <li key={e} className="px-3.5 py-2 rounded-full bg-paper-deep text-[14px]">{e}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={0.1}>
                <h3 className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Who we serve</h3>
                <ul className="mt-5 border-t border-ink/15">
                  {WHO_WE_SERVE.map((w, i) => (
                    <li key={w} className="flex gap-5 py-5 border-b border-ink/15">
                      <span className="font-mono text-xs text-clay pt-1">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[17px] leading-relaxed">{w}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <LemonadeStory />

      {/* Company info + tools */}
      <section className="bg-paper" id="company">
        <Container className="py-24 sm:py-32">
          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-6">
              <SectionHeader eyebrow="Company information" title="Registration and corporate details." accent="corporate" />
              <dl className="mt-10 border-t border-ink/15">
                {companyFacts.map(([k, v]) => (
                  <Reveal key={k} className="grid grid-cols-12 gap-4 py-4 border-b border-ink/15">
                    <dt className="col-span-12 sm:col-span-4 text-sm text-muted">{k}</dt>
                    <dd className="col-span-12 sm:col-span-8 text-[15px]">
                      {k === 'Email' ? (
                        <a href={`mailto:${v}`} className="underline decoration-ink/20 underline-offset-4 hover:decoration-clay hover:text-clay">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-6">
              <SectionHeader eyebrow="Technology & tools" title="The tools behind the work." accent="tools" />
              <ul className="mt-10 space-y-6">
                {TOOLS.map((t, i) => (
                  <Reveal as="li" key={t.area} delay={i * 0.05}>
                    <h3 className="text-sm text-muted">{t.area}</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3.5 py-2 rounded-xl border border-ink/12 text-[14px] hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}
