import { ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export function openCal() {
  window.dispatchEvent(new CustomEvent('velocity-open-cal'));
}

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div'
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Splits a headline into words that rise in one after another. */
export function SplitHeading({
  text,
  className = '',
  accent,
  delay = 0,
  as = 'h2'
}: {
  text: string;
  className?: string;
  accent?: string;
  delay?: number;
  as?: 'h1' | 'h2';
}) {
  const words = text.split(' ');
  const accentWords = new Set((accent ?? '').split(' ').filter(Boolean));
  // The heading owns the in-view trigger: the words start clipped out of view,
  // so observing them individually would never fire.
  const Tag = motion[as];
  return (
    <Tag
      className={`text-balance ${className}`}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <motion.span
            className={`inline-block ${accentWords.has(word) ? 'italic text-clay' : ''}`}
            variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, dark = false, className = '' }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] ${
        dark ? 'text-ember' : 'text-clay'
      } ${className}`}
    >
      <span className={`h-px w-6 ${dark ? 'bg-ember' : 'bg-clay'}`} />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  intro,
  dark = false,
  align = 'left',
  className = ''
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  dark?: boolean;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center flex flex-col items-center' : ''} ${className}`}>
      <Reveal>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitHeading
        text={title}
        accent={accent}
        className={`font-display font-light tracking-[-0.02em] leading-[1.05] text-[2.25rem] sm:text-5xl lg:text-[3.5rem] mt-5 ${
          dark ? 'text-paper [&_.text-clay]:text-ember' : 'text-ink'
        }`}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-6 text-base sm:text-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-muted'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

type ButtonVariant = 'primary' | 'ember' | 'ghost' | 'ghost-dark';

const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-paper hover:bg-clay',
  ember: 'bg-ember text-coal hover:bg-paper hover:text-ink',
  ghost: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  'ghost-dark': 'border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink'
};

export function Button({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  icon = true,
  className = '',
  type = 'button'
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}) {
  const cls = `group inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 sm:px-7 rounded-full text-[15px] font-medium tracking-tight transition-all duration-300 active:scale-[0.97] ${buttonStyles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="relative w-4 h-4 overflow-hidden">
          <ArrowUpRight className="absolute inset-0 w-4 h-4 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
          <ArrowUpRight className="absolute inset-0 w-4 h-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  );
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Counts up to a number once visible. Only for real, verifiable figures. */
export function CountUp({ to, suffix = '', duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/** A paragraph whose words brighten one by one as it scrolls through the viewport. */
export function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </ScrollWord>
      ))}
    </p>
  );
}

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  );
}

/** Founder portrait: shows /photos/founder.jpg when present, otherwise a designed monogram card. */
export function FounderPortrait({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`on-dark relative overflow-hidden rounded-[28px] bg-ink grain ${className}`}>
      {!failed ? (
        <img
          src="/photos/founder.jpg"
          alt="Emmanuel Sunday Thomas (Thomax), Founder and CEO of Velocity Contents Lab"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 grid-lines flex items-center justify-center">
          <span className="font-display italic font-light text-paper/90 text-[9rem] sm:text-[11rem] leading-none select-none">T</span>
          <span className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Founder · Lagos</span>
          <span className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-ember" />
        </div>
      )}
    </div>
  );
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Shared dark page hero used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative bg-ink text-paper grain overflow-hidden pt-36 sm:pt-44 pb-20 sm:pb-28">
      <div className="absolute inset-0 grid-lines [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />
      <motion.div
        className="absolute -right-40 top-10 w-[520px] h-[520px] rounded-full border border-paper/10 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </motion.div>
        <SplitHeading
          as="h1"
          text={title}
          accent={accent}
          delay={0.1}
          className="mt-6 max-w-4xl font-display font-light tracking-[-0.03em] leading-[1.02] text-[2.75rem] sm:text-6xl lg:text-[5.25rem] text-paper [&_.text-clay]:text-ember"
        />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-paper/70"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

/** Final call to action used at the foot of most pages. */
export function ClosingCTA() {
  return (
    <section className="on-dark bg-ink text-paper grain overflow-hidden">
      <Container className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Eyebrow dark>Starting is simple</Eyebrow>
            <SplitHeading
              text="Let’s build the message and the engine together."
              accent="message engine"
              className="mt-6 font-display font-light tracking-[-0.03em] leading-[1.02] text-[2.5rem] sm:text-6xl text-paper [&_.text-clay]:text-ember"
            />
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button to="/contact" variant="ember">Book a free discovery call</Button>
                <Button onClick={openCal} variant="ghost-dark" icon={false}>Ask Cal a question</Button>
              </div>
            </Reveal>
          </div>
          <ol className="lg:col-span-5 space-y-px rounded-3xl overflow-hidden border border-paper/10">
            {[
              ['01', 'Book a free discovery call', 'A short conversation about what you need. No pitch, no pressure.'],
              ['02', 'Receive a written proposal', 'Scope, timeline, acceptance criteria, and price, within 2 business days.'],
              ['03', 'Begin, with a pilot if you prefer', 'Start small and fixed-scope, or go straight to the full engagement.']
            ].map(([n, t, b], i) => (
              <Reveal as="li" key={n} delay={0.1 * i} className="bg-ink-soft/70 p-6 flex gap-5">
                <span className="font-mono text-xs text-ember pt-1">{n}</span>
                <div>
                  <p className="font-medium text-paper">{t}</p>
                  <p className="text-sm text-paper/60 mt-1 leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
