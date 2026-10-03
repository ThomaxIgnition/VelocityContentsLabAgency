import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { CalendarCheck, Check, Database, MessageCircle, Sparkles } from 'lucide-react';

const STEPS = [
  {
    icon: MessageCircle,
    label: 'New enquiry',
    meta: 'WhatsApp · 9:42 PM',
    text: 'Hi, can you help us reply to customers faster? We miss messages after hours.'
  },
  {
    icon: Sparkles,
    label: 'AI agent replies',
    meta: 'Answered in seconds',
    text: 'Yes, we can. May I ask your name and the best email to send details to?'
  },
  {
    icon: Check,
    label: 'Lead qualified',
    meta: 'Details collected',
    text: 'Retail business · 3 staff · wants WhatsApp + email automation'
  },
  {
    icon: CalendarCheck,
    label: 'Meeting booked',
    meta: 'Google Calendar',
    text: 'Discovery call · Thursday, 10:00 AM WAT'
  },
  {
    icon: Database,
    label: 'Lead logged',
    meta: 'CRM updated',
    text: 'New row added to Leads sheet. Founder notified.'
  }
];

/**
 * An animated walk-through of the AI Customer Care & Appointment Agent,
 * one of the systems listed in the company profile.
 */
export default function SystemDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(STEPS.length - 1);
      return;
    }
    const t = setInterval(() => setActive((a) => (a + 1) % (STEPS.length + 1)), 1700);
    return () => clearInterval(t);
  }, [inView]);

  const shown = Math.min(active, STEPS.length - 1);

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-6 rounded-[40px] bg-ember/10 blur-3xl pointer-events-none" />
      <div className="relative rounded-[28px] border border-paper/12 bg-ink-soft/80 backdrop-blur p-5 sm:p-6 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between pb-4 border-b border-paper/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-sage animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-[#7FA58C]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">System running</span>
          </div>
          <span className="font-mono text-[11px] text-paper/55">AI Customer Care Agent</span>
        </div>

        <div className="relative mt-5">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-paper/10" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            className="absolute left-[19px] top-3 w-px bg-ember origin-top"
            animate={{ height: `${(shown / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxHeight: 'calc(100% - 24px)' }}
          />
        <ol className="relative space-y-2.5" aria-label="How an AI customer care agent handles an enquiry">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const done = i < active;
            const current = i === shown && active < STEPS.length;
            const visible = i <= shown;
            return (
              <li key={step.label} className="relative flex gap-4">
                <motion.span
                  animate={{
                    backgroundColor: visible ? '#EC8A5C' : 'rgba(246,242,236,0.06)',
                    color: visible ? '#15130F' : 'rgba(246,242,236,0.45)',
                    scale: current ? 1.08 : 1
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </motion.span>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className={`text-[15px] font-medium transition-colors ${visible ? 'text-paper' : 'text-paper/55'}`}>
                      {step.label}
                    </span>
                    <span className="font-mono text-[10px] text-paper/55 shrink-0">{step.meta}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {visible && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`overflow-hidden text-sm leading-relaxed ${done || !current ? 'text-paper/55' : 'text-paper/85'}`}
                      >
                        <span className="block pt-1 pb-1.5">{step.text}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
        </div>

        <p className="mt-5 pt-4 border-t border-paper/10 text-xs text-paper/60 leading-relaxed">
          Illustrative flow. Pricing, contracts, and payments always stay with people.
        </p>
      </div>
    </div>
  );
}
