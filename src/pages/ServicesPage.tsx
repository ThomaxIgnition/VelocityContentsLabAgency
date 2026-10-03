import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, Hand } from 'lucide-react';
import {
  AUTOMATION_PRICING,
  AUTOMATION_SYSTEMS,
  COFFEE_SHOP_TEST,
  CONTENT_PRICING,
  ENGAGEMENT_MODELS,
  ENGINEERING_STACK,
  METHODS,
  PRICING_NOTE,
  SERVICE_LINES,
  ServiceLine
} from '../content.ts';
import { Button, ClosingCTA, Container, Eyebrow, PageHero, Reveal, SectionHeader } from '../components/ui.tsx';

export default function ServicesPage() {
  const [content, automation, software] = SERVICE_LINES;

  return (
    <>
      <PageHero
        eyebrow="Services & pricing"
        title="Three disciplines. Engaged alone or together."
        accent="alone together."
        intro="Content that makes you visible, automation that keeps working when your team cannot, and software that fits the way you work."
      >
        <nav aria-label="Jump to" className="flex flex-wrap gap-2">
          {[...SERVICE_LINES.map((s) => [s.id, s.short]), ['pricing', 'Pricing']].map(([id, label]) => (
            <Link
              key={id}
              to={`/services#${id}`}
              className="group inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-paper/20 text-paper/85 hover:bg-paper hover:text-ink transition-colors"
            >
              {label}
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </Link>
          ))}
        </nav>
      </PageHero>

      <LineSection line={content} tone="paper">
        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Our methods</h3>
            <p className="mt-3 text-muted max-w-lg">Our content work runs on documented, repeatable methods developed in-house.</p>
            <ul className="mt-8 border-t border-ink/15">
              {METHODS.map((m, i) => (
                <Reveal as="li" key={m.id} delay={i * 0.05} className="grid sm:grid-cols-12 gap-2 sm:gap-6 py-5 border-b border-ink/15">
                  <span className="sm:col-span-5 font-display text-lg tracking-tight">{m.name}</span>
                  <span className="sm:col-span-7 text-[15px] text-muted leading-relaxed">{m.body}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="on-dark h-full p-8 sm:p-10 rounded-3xl bg-ink text-paper grain">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">Quality standard</span>
              <h3 className="mt-4 font-display text-4xl font-light tracking-tight">The Coffee Shop Test</h3>
              <p className="mt-5 text-paper/70 leading-relaxed">{COFFEE_SHOP_TEST}</p>
            </div>
          </Reveal>
        </div>
      </LineSection>

      <LineSection line={automation} tone="deep">
        <div className="mt-16">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Systems we have designed, built, and tested</h3>
          <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUTOMATION_SYSTEMS.map((s, i) => (
              <Reveal
                as="li"
                key={s.name}
                delay={(i % 4) * 0.06}
                className="group p-6 rounded-2xl bg-paper border border-ink/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 transition-all duration-500"
              >
                <span className="font-mono text-xs text-clay">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="mt-4 font-display text-xl leading-snug tracking-tight">{s.name}</h4>
                <p className="mt-3 text-sm text-muted leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 grid lg:grid-cols-2 gap-4">
            <Reveal className="on-dark p-8 rounded-3xl bg-ink text-paper grain flex gap-5">
              <Hand className="w-6 h-6 text-ember shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-2xl tracking-tight">Human in the loop, by design</h4>
                <p className="mt-3 text-paper/70 leading-relaxed">
                  AI agents answer and organise; decisions about pricing, contracts, payments, and publishing stay with people. Where approval
                  matters, the system asks before it acts.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="p-8 rounded-3xl border border-ink/15">
              <h4 className="font-display text-2xl tracking-tight">Built on established platforms</h4>
              <p className="mt-3 text-muted leading-relaxed">
                n8n, OpenAI language models, Google Workspace (Gmail, Calendar, Sheets), WhatsApp, Telegram, and voice transcription. We choose
                tools you can own and maintain, and document every workflow.
              </p>
              <p className="mt-5 text-sm text-ink/80">
                Deployed for clients including Fitins &amp; Cute Collections Hub, House of Matiggy, and a multi-service client.
              </p>
            </Reveal>
          </div>
        </div>
      </LineSection>

      <LineSection line={software} tone="paper">
        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Engineering stack</h3>
            <dl className="mt-8 border-t border-ink/15">
              {ENGINEERING_STACK.map((row, i) => (
                <Reveal key={row.layer} delay={i * 0.05} className="grid sm:grid-cols-12 gap-1 sm:gap-6 py-5 border-b border-ink/15">
                  <dt className="sm:col-span-5 font-display text-lg tracking-tight">{row.layer}</dt>
                  <dd className="sm:col-span-7 text-[15px] text-muted">{row.tech}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-paper-deep border border-ink/10">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">Delivered work</span>
              <p className="mt-5 text-ink/85 leading-relaxed">
                Recent engagements include a custom software solution with system integration for Olatunde Oloyode, a professional business website
                for Fitins &amp; Cute Collections Hub, and a business website with productivity tools for a multi-service client.
              </p>
              <p className="mt-4 text-muted text-sm">Portfolio walkthroughs are available on request.</p>
              <Button to="/work" variant="ghost" className="mt-8">See client work</Button>
            </div>
          </Reveal>
        </div>
      </LineSection>

      {/* Engagement models */}
      <section className="on-dark bg-ink text-paper grain">
        <Container className="py-24 sm:py-32">
          <SectionHeader dark eyebrow="Engagement models" title="Flexible ways to work together." accent="Flexible" />
          <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 rounded-3xl overflow-hidden border border-paper/10">
            {ENGAGEMENT_MODELS.map((m, i) => (
              <Reveal as="li" key={m.name} delay={i * 0.08} className="bg-ink p-8 hover:bg-ink-soft transition-colors">
                <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{m.name}</h3>
                <p className="mt-3 text-paper/65 text-[15px] leading-relaxed">{m.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <Pricing />
      <ClosingCTA />
    </>
  );
}

function LineSection({ line, tone, children }: { line: ServiceLine; tone: 'paper' | 'deep'; children?: ReactNode }) {
  return (
    <section id={line.id} className={`scroll-mt-16 ${tone === 'deep' ? 'bg-paper-deep' : 'bg-paper'}`}>
      <Container className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="font-display text-[7rem] sm:text-[9rem] font-light leading-[0.8] text-ink/10">{line.number}</span>
            </Reveal>
            <SectionHeader eyebrow={line.short} title={line.name} className="mt-4" />
          </div>
          <div className="lg:col-span-7 lg:pt-16">
            <Reveal>
              <p className="font-display text-2xl sm:text-3xl font-light leading-snug tracking-tight text-ink">{line.promise}</p>
              <p className="mt-6 text-lg text-muted leading-relaxed">{line.intro}</p>
            </Reveal>
            <h3 className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Scope of services</h3>
            <ul className="mt-5 space-y-3">
              {line.scope.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.05} className="flex gap-4 items-start">
                  <span className="mt-1 w-6 h-6 rounded-full bg-ink text-paper flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[17px] text-ink/85 leading-relaxed">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-paper scroll-mt-16">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="Indicative pricing"
          title="Clear prices, confirmed in writing."
          accent="confirmed in writing."
          intro="Every engagement starts with a written proposal. These figures show where most projects land."
        />

        <div className="mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-3xl tracking-tight">Content strategy</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">USD</span>
          </div>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_PRICING.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={i * 0.07}
                className={`relative flex flex-col p-7 rounded-3xl border transition-all duration-500 hover:-translate-y-1 ${
                  p.featured ? 'on-dark bg-ink text-paper border-ink grain' : 'bg-paper border-ink/15 hover:border-ink/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 min-h-[24px]">
                  <span className={`font-mono text-[11px] uppercase tracking-[0.16em] ${p.featured ? 'text-paper/50' : 'text-muted'}`}>{p.format}</span>
                  {p.featured && (
                    <span className="px-2.5 py-1 rounded-full bg-ember text-coal text-[11px] font-medium whitespace-nowrap">Full ecosystem</span>
                  )}
                </div>
                <h4 className="mt-5 font-display text-2xl leading-tight tracking-tight">{p.name}</h4>
                <p className={`mt-2 text-[15px] ${p.featured ? 'text-paper/65' : 'text-muted'}`}>{p.what}</p>
                <p className="mt-auto pt-10">
                  <span className="font-display text-5xl font-light tracking-tight">{p.price}</span>
                  <span className={`block mt-1 text-sm ${p.featured ? 'text-paper/55' : 'text-muted'}`}>{p.unit}</span>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-3xl tracking-tight">AI automation &amp; software engineering</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted shrink-0">USD</span>
          </div>
          <ul className="mt-6 border-t border-ink/15">
            {AUTOMATION_PRICING.map((p, i) => (
              <Reveal
                as="li"
                key={p.scope}
                delay={i * 0.06}
                className="group grid grid-cols-12 gap-x-4 gap-y-1 items-baseline py-7 border-b border-ink/15 "
              >
                <span className="col-span-12 sm:col-span-4 font-display text-xl sm:text-2xl tracking-tight">
                  {p.scope}
                  {p.featured && (
                    <span className="block w-fit mt-2 px-2.5 py-0.5 rounded-full bg-clay text-paper text-[11px] font-sans tracking-normal whitespace-nowrap">
                      Most requested
                    </span>
                  )}
                </span>
                <span className="col-span-12 sm:col-span-5 text-[15px] text-muted">{p.example}</span>
                <span className="col-span-12 sm:col-span-3 sm:text-right font-display text-2xl tracking-tight text-clay mt-2 sm:mt-0">{p.price}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 p-7 rounded-3xl bg-paper-deep">
            <p className="text-sm text-muted leading-relaxed max-w-2xl">{PRICING_NOTE}</p>
            <Button to="/contact" variant="primary" className="shrink-0">Request a proposal</Button>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted">
            <Eyebrow className="!tracking-[0.16em]">Low-risk start</Eyebrow>
            <span>Not sure yet? Begin with a small pilot engagement.</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
