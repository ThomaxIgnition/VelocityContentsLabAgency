import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { COMPANY, ENGAGEMENT_MODELS, SERVICE_LINES } from '../content.ts';
import { Container, PageHero, Reveal, openCal } from '../components/ui.tsx';
import { submitLead, LeadResult } from '../lib/leads.ts';

type Status = 'idle' | 'sending' | 'error' | LeadResult;

const SERVICE_OPTIONS = [...SERVICE_LINES.map((s) => s.short), 'More than one', 'Not sure yet'];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    engagement: '',
    message: ''
  });
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const result = await submitLead({ ...form, source: 'Contact page' });
      setStatus(result);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Starting is simple."
        accent="simple."
        intro="Book a free discovery call. A short conversation about what you need. No pitch, no pressure. You’ll have a written proposal within 2 business days."
      />

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                {status === 'sent' || status === 'mailto' ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="on-dark p-8 sm:p-12 rounded-[32px] bg-ink text-paper grain"
                    role="status"
                  >
                    <span className="w-14 h-14 rounded-full bg-ember text-coal flex items-center justify-center">
                      <Check className="w-6 h-6" />
                    </span>
                    <h2 className="mt-8 font-display text-4xl font-light tracking-tight">
                      {status === 'sent' ? `Thank you, ${form.name.split(' ')[0]}.` : 'Almost there.'}
                    </h2>
                    <p className="mt-4 text-paper/70 text-lg leading-relaxed max-w-lg">
                      {status === 'sent'
                        ? `Your request is with us. Expect a reply at ${form.email} ${COMPANY.responseTime.toLowerCase()}.`
                        : `Your email app should have opened with your message ready to send to ${COMPANY.email}. Press send and we will reply ${COMPANY.responseTime.toLowerCase()}.`}
                    </p>
                    {status === 'mailto' && (
                      <a href={`mailto:${COMPANY.email}`} className="mt-6 inline-flex items-center gap-2 text-ember underline underline-offset-4">
                        Didn’t open? Email {COMPANY.email}
                      </a>
                    )}
                    <ol className="mt-10 space-y-4 border-t border-paper/10 pt-8">
                      {['We review your request and reply', 'A 15 to 30 minute discovery call', 'A written proposal within 2 business days'].map((s, i) => (
                        <li key={s} className="flex gap-4 text-paper/80">
                          <span className="font-mono text-xs text-ember pt-1">0{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Reveal>
                      <h2 className="font-display text-3xl sm:text-4xl font-light tracking-tight">Tell us what you need.</h2>
                      <p className="mt-3 text-muted">Fields marked * are required.</p>
                    </Reveal>

                    <div className="mt-10 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      <Field label="Your name *" id="name" value={form.name} onChange={set('name')} required autoComplete="name" />
                      <Field label="Email *" id="email" type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
                      <div className="sm:col-span-2">
                        <Field label="Company or website" id="company" value={form.company} onChange={set('company')} autoComplete="organization" />
                      </div>
                    </div>

                    <ChoiceGroup label="What can we help with?" options={SERVICE_OPTIONS} value={form.service} onChange={set('service')} />
                    <ChoiceGroup
                      label="How would you like to start?"
                      options={[...ENGAGEMENT_MODELS.map((m) => m.name), 'Not sure yet']}
                      value={form.engagement}
                      onChange={set('engagement')}
                    />

                    <div className="mt-8">
                      <label htmlFor="message" className="block text-sm text-muted">
                        What is the challenge, and what would success look like?
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => set('message')(e.target.value)}
                        className="mt-3 w-full p-4 rounded-2xl bg-paper-deep/60 border border-ink/12 text-[16px] leading-relaxed placeholder:text-ink/35 focus:outline-none focus:border-ink focus:bg-paper transition-colors resize-y"
                        placeholder="For example: we miss WhatsApp enquiries after hours and want them answered and logged automatically."
                      />
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="mt-6 p-4 rounded-xl bg-clay/10 text-clay text-sm">
                        Something went wrong sending your request. Please try again, or email us directly at{' '}
                        <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a>.
                      </p>
                    )}

                    <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="group inline-flex items-center justify-center gap-2.5 min-h-[56px] px-8 rounded-full bg-ink text-paper text-[16px] font-medium hover:bg-clay disabled:opacity-60 transition-colors"
                      >
                        {status === 'sending' ? 'Sending…' : 'Request my discovery call'}
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                      <p className="text-sm text-muted max-w-xs">
                        We use your details only to reply, in line with the Nigeria Data Protection Act 2023.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Details */}
            <aside className="lg:col-span-5 order-1 lg:order-2 space-y-5">
              <Reveal className="p-8 rounded-[28px] bg-paper-deep">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Reach us directly</h2>
                <ul className="mt-6 space-y-5">
                  <li className="flex gap-4">
                    <Mail className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                    <a href={`mailto:${COMPANY.email}`} className="text-[17px] hover:text-clay underline decoration-ink/20 underline-offset-4 break-all">
                      {COMPANY.email}
                    </a>
                  </li>
                  <li className="flex gap-4">
                    <Clock className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed">
                      {COMPANY.hours}
                      <span className="block text-muted">Replies {COMPANY.responseTime.toLowerCase()}</span>
                    </span>
                  </li>
                  <li className="flex gap-4">
                    <MapPin className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed">
                      {COMPANY.address}
                      <span className="block text-muted">{COMPANY.delivery}</span>
                    </span>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="on-dark p-8 rounded-[28px] bg-ink text-paper grain">
                <h2 className="font-display text-2xl tracking-tight">Prefer to chat now?</h2>
                <p className="mt-2 text-paper/65 leading-relaxed">
                  Cal, our AI customer care agent, can answer questions and collect your details any time of day.
                </p>
                <button
                  onClick={openCal}
                  className="mt-6 inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-ember text-coal font-medium hover:bg-paper transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat with Cal
                </button>
              </Reveal>

              <Reveal delay={0.15} className="p-8 rounded-[28px] border border-ink/12">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">On the discovery call</h2>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed">
                  {['The challenge you are facing', 'What it is costing you today', 'What has already been tried', 'What success looks like'].map((x) => (
                    <li key={x} className="flex gap-3">
                      <Check className="w-4 h-4 text-clay shrink-0 mt-1" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="relative pt-6">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full h-14 bg-transparent border-0 border-b border-ink/20 text-[17px] focus:outline-none focus:border-ink transition-colors"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-10 text-muted text-[17px] pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-clay peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
      <span className="absolute left-0 bottom-0 h-px w-full bg-clay origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500" />
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="mt-10">
      <legend className="text-sm text-muted">{label}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o;
          return (
            <label
              key={o}
              className={`cursor-pointer inline-flex items-center min-h-[44px] px-5 rounded-full border text-[15px] transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay ${
                active ? 'bg-ink text-paper border-ink' : 'border-ink/15 hover:border-ink/40'
              }`}
            >
              <input type="radio" name={label} value={o} checked={active} onChange={() => onChange(o)} className="sr-only" />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
