import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight, Layers, MessagesSquare, ShieldCheck, UserRound } from 'lucide-react';
import {
  COMPANY,
  COMBINED_FLOW,
  MARQUEE_ITEMS,
  PHILOSOPHY,
  PROCESS,
  SERVICE_LINES,
  WHY_US
} from '../content.ts';
import {
  Button,
  ClosingCTA,
  Container,
  CountUp,
  Eyebrow,
  Reveal,
  ScrollText,
  SectionHeader,
  SplitHeading,
  openCal
} from '../components/ui.tsx';
import SystemDemo from '../components/home/SystemDemo.tsx';
import Testimonials from '../components/home/Testimonials.tsx';
import CalAssistant from '../components/shared/CalAssistant.tsx';

const EASE = [0.22, 1, 0.36, 1] as const;
const WHY_ICONS = [Layers, UserRound, MessagesSquare, ShieldCheck];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Positioning statement */}
      <section className="bg-paper">
        <Container className="py-24 sm:py-36">
          <Reveal>
            <Eyebrow>Why one team</Eyebrow>
          </Reveal>
          <ScrollText
            text="Most firms offer one of these. We bring all three under one roof, so the message a business sends and the systems that deliver it are designed together, by the same team, with one point of accountability."
            className="mt-8 max-w-5xl font-display font-light text-[1.9rem] sm:text-5xl lg:text-[3.6rem] leading-[1.12] tracking-[-0.02em] text-ink"
          />
        </Container>
      </section>

      <ServiceLines />
      <WorkingTogether />
      <WhyUs />

      {/* Client evidence */}
      <section className="on-dark bg-ink text-paper grain overflow-hidden">
        <Container className="py-24 sm:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <SectionHeader dark eyebrow="Client evidence" title="What clients say about working with us." accent="clients" />
            <Reveal delay={0.2}>
              <Link to="/work" className="group inline-flex items-center gap-2 text-paper/80 hover:text-ember transition-colors shrink-0 min-h-[44px]">
                See all client work
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
          <Testimonials />
        </Container>
      </section>

      <ProcessPreview />

      {/* Live demo with Cal */}
      <section className="bg-paper-deep" id="cal">
        <Container className="py-24 sm:py-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="See it for yourself"
                title="The strongest evidence is a working system."
                accent="working system."
                intro="Cal is our own AI customer care agent, built the same way we build them for clients. Ask about services, pricing, or how automation would fit your business."
              />
              <Reveal delay={0.25}>
                <ul className="mt-8 space-y-3 text-[15px] text-ink/80">
                  {['Answers from company knowledge', 'Collects details one question at a time', 'Hands over to Thomax when it matters'].map((x) => (
                    <li key={x} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-7">
              <CalAssistant embedded />
            </Reveal>
          </div>
        </Container>
      </section>

      <Philosophy />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="on-dark relative bg-ink text-paper grain overflow-hidden">
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)] pointer-events-none" />
      <motion.div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full border border-paper/[0.07] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full bg-ember" />
      </motion.div>

      <Container className="relative pt-36 sm:pt-44 lg:pt-48 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          <motion.div style={{ y, opacity: fade }} className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <Eyebrow dark>Content · AI Automation · Software</Eyebrow>
            </motion.div>

            <SplitHeading
              as="h1"
              text="The message and the engine, built together."
              accent="message engine,"
              delay={0.1}
              className="mt-7 font-display font-light tracking-[-0.035em] leading-[0.98] text-[3rem] sm:text-7xl xl:text-[6rem] text-paper [&_.text-clay]:text-ember"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
              className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-paper/70"
            >
              We build content strategies that make your business visible, AI automation that takes repetitive work off
              your team’s desks, and custom software that connects the tools you already depend on.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Button to="/contact" variant="ember">Book a free discovery call</Button>
              <Button to="/services" variant="ghost-dark" icon={false}>Explore services</Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60"
            >
              <li>Founder-led since {COMPANY.operatingSince}</li>
              <li aria-hidden="true" className="hidden sm:list-item">·</li>
              <li>{COMPANY.legalName} · {COMPANY.rc}</li>
              <li aria-hidden="true" className="hidden sm:list-item">·</li>
              <li>Lagos → anywhere</li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <SystemDemo />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-ember text-coal overflow-hidden border-y border-coal/10" aria-label="What we do">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 pr-8 py-5 font-display text-xl sm:text-2xl whitespace-nowrap" aria-hidden={i >= MARQUEE_ITEMS.length}>
            {item}
            <span className="w-2 h-2 rounded-full bg-coal/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ServiceLines() {
  return (
    <section className="bg-paper border-t border-ink/10" id="services">
      <Container className="py-24 sm:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="Core capabilities"
            title="Three service lines. One accountable team."
            accent="One accountable"
            intro="Each line can be engaged on its own. They are most powerful together."
          />
          <Reveal delay={0.2}>
            <Button to="/services" variant="ghost" className="shrink-0">Services & pricing</Button>
          </Reveal>
        </div>

        <ul className="border-t border-ink/15">
          {SERVICE_LINES.map((line, i) => (
            <Reveal as="li" key={line.id} delay={i * 0.08}>
              <Link
                to={`/services#${line.id}`}
                className="group relative grid grid-cols-12 gap-x-4 gap-y-4 py-10 sm:py-12 border-b border-ink/15 overflow-hidden"
              >
                <span className="absolute inset-0 bg-ink origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative col-span-2 sm:col-span-1 font-mono text-sm text-clay group-hover:text-ember transition-colors pt-2 sm:pl-4">
                  {line.number}
                </span>
                <div className="relative col-span-10 sm:col-span-6">
                  <h3 className="font-display text-[1.75rem] sm:text-4xl font-light leading-tight tracking-tight text-ink group-hover:text-paper transition-colors duration-300">
                    {line.short}
                  </h3>
                  <p className="mt-3 text-[15px] sm:text-base text-muted group-hover:text-paper/65 transition-colors duration-300 max-w-md">
                    {line.promise}
                  </p>
                </div>
                <div className="relative col-span-10 col-start-3 sm:col-span-4 sm:col-start-auto flex flex-wrap content-start gap-2">
                  {line.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full border border-ink/15 text-[13px] text-ink/75 group-hover:border-paper/20 group-hover:text-paper/75 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="relative hidden sm:flex col-span-1 justify-end pr-4 pt-2">
                  <span className="w-12 h-12 rounded-full border border-ink/15 flex items-center justify-center text-ink group-hover:bg-ember group-hover:text-coal group-hover:border-ember group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function WorkingTogether() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineLabel: Record<string, string> = { content: 'Content', automation: 'Automation', software: 'Software' };

  return (
    <section className="bg-paper-deep">
      <Container className="py-24 sm:py-32">
        <SectionHeader
          eyebrow="Working together"
          title="Strategy and system, designed as one."
          accent="designed as one."
          intro="A typical combined engagement: we shape the message, build the content that carries it, then build the AI agent that answers the enquiries that content brings in, booking qualified meetings straight into your calendar."
        />

        <div ref={ref} className="relative mt-16">
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-ink/15" aria-hidden="true" />
          <motion.div className="hidden lg:block absolute top-7 left-0 h-px bg-clay" style={{ width }} aria-hidden="true" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {COMBINED_FLOW.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 0.12} className="relative">
                <span className="relative z-10 w-14 h-14 rounded-full bg-paper border border-ink/15 flex items-center justify-center font-display text-xl text-clay">
                  {i + 1}
                </span>
                <div className="mt-6 p-6 rounded-2xl bg-paper border border-ink/10 h-[calc(100%-5rem)] hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 transition-all duration-500">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{lineLabel[s.line]}</span>
                  <h3 className="mt-2 font-display text-2xl tracking-tight text-ink">{s.step}</h3>
                  <p className="mt-2 text-[15px] text-muted leading-relaxed">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function WhyUs() {
  const facts = [
    { n: 4, suffix: ' hrs', label: 'Response time, business days' },
    { n: 2, suffix: ' days', label: 'From call to written proposal' },
    { n: 1, suffix: ' week', label: 'Support included at handover' },
    { n: 3, suffix: '', label: 'Disciplines under one roof' }
  ];
  return (
    <section className="bg-paper">
      <Container className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Why clients work with us" title="Fewer hand-offs. More accountability." accent="accountability." />
            <dl className="mt-12 grid grid-cols-2 gap-px bg-ink/10 rounded-2xl overflow-hidden border border-ink/10">
              {facts.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.08} className="bg-paper p-5 sm:p-6">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl sm:text-5xl font-light tracking-tight text-ink">
                      <CountUp to={f.n} suffix={f.suffix} />
                    </span>
                    <span className="block mt-2 text-sm text-muted leading-snug">{f.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {WHY_US.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <Reveal as="li" key={w.title} delay={i * 0.1} className="group p-7 sm:p-8 rounded-3xl bg-paper-deep/60 border border-ink/10 hover:bg-ink transition-colors duration-500">
                  <span className="w-12 h-12 rounded-2xl bg-paper flex items-center justify-center text-clay group-hover:bg-ember group-hover:text-coal transition-colors duration-500">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="mt-8 font-display text-2xl tracking-tight text-ink group-hover:text-paper transition-colors duration-500">{w.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted group-hover:text-paper/65 transition-colors duration-500">{w.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function ProcessPreview() {
  return (
    <section className="bg-paper">
      <Container className="py-24 sm:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow="How we work"
            title="A clear process, with sign-off at every stage."
            accent="sign-off"
          />
          <Reveal delay={0.2}>
            <Button to="/method" variant="ghost" className="shrink-0">Our full process</Button>
          </Reveal>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 rounded-3xl overflow-hidden border border-ink/10">
          {PROCESS.map((p, i) => (
            <Reveal as="li" key={p.n} delay={(i % 3) * 0.08} className="group bg-paper p-7 sm:p-8 hover:bg-paper-deep transition-colors duration-300">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-light text-ink/15 group-hover:text-clay transition-colors duration-500">{p.n}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.when}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-muted leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="bg-paper border-t border-ink/10 overflow-hidden">
      <Container className="py-24 sm:py-36">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <Reveal>
            <Eyebrow>Our philosophy</Eyebrow>
          </Reveal>
          <SplitHeading
            text="“It does not matter how good something is if nobody knows where to find it.”"
            accent="nobody find"
            className="mt-8 font-display font-light text-[2rem] sm:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.02em]"
          />
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-lg text-muted leading-relaxed text-balance">{PHILOSOPHY.split('. ').slice(1).join('. ')}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button to="/about" variant="primary">The story behind it</Button>
              <Button onClick={openCal} variant="ghost" icon={false}>Ask Cal a question</Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
