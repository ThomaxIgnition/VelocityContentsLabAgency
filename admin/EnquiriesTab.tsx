import { useEffect, useState } from 'react';
import { ChevronDown, Mail, Trash2 } from 'lucide-react';
import { Enquiry, EnquiryStatus, deleteEnquiry, formatDateTime, updateEnquiry, useLiveTable } from './api.ts';

const STATUSES: { value: EnquiryStatus; label: string; cls: string }[] = [
  { value: 'new', label: 'New', cls: 'bg-ember/20 text-clay' },
  { value: 'contacted', label: 'Contacted', cls: 'bg-ink/8 text-ink' },
  { value: 'won', label: 'Won', cls: 'bg-sage/15 text-sage' },
  { value: 'closed', label: 'Closed', cls: 'bg-ink/5 text-muted' }
];

export default function EnquiriesTab() {
  const { rows, loading, error, reload } = useLiveTable<Enquiry>('enquiries', 'created_at');
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = [...rows].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
  const visible = sorted.filter((e) => filter === 'all' || e.status === filter);
  const count = (s: EnquiryStatus) => rows.filter((e) => e.status === s).length;

  if (error) return <p className="p-4 rounded-xl bg-clay/10 text-clay">Could not load enquiries: {error}</p>;

  return (
    <div>
      <h1 className="font-display text-3xl tracking-tight">Enquiries</h1>
      <p className="mt-2 text-sm text-muted">Every request sent from the website’s contact form, newest first.</p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
        {[{ value: 'all' as const, label: `All (${rows.length})` }, ...STATUSES.map((s) => ({ value: s.value, label: `${s.label} (${count(s.value)})` }))].map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`min-h-[40px] px-4 rounded-full text-sm transition-colors ${
              filter === f.value ? 'bg-ink text-paper' : 'border border-ink/15 text-ink/75 hover:border-ink/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-muted">Loading…</p>
      ) : visible.length === 0 ? (
        <div className="mt-8 p-10 rounded-3xl border border-dashed border-ink/15 text-center text-muted">
          {rows.length === 0 ? 'No enquiries yet. They will appear here the moment someone submits the contact form.' : 'Nothing with this status.'}
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((e) => (
            <EnquiryRow key={e.id} enquiry={e} open={openId === e.id} onToggle={() => setOpenId(openId === e.id ? null : e.id)} onChanged={reload} />
          ))}
        </ul>
      )}
    </div>
  );
}

function EnquiryRow({ enquiry: e, open, onToggle, onChanged }: { enquiry: Enquiry; open: boolean; onToggle: () => void; onChanged: () => void }) {
  const [notes, setNotes] = useState(e.notes);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => setNotes(e.notes), [e.notes]);
  const status = STATUSES.find((s) => s.value === e.status)!;

  const setStatus = async (value: EnquiryStatus) => {
    try {
      await updateEnquiry(e.id, { status: value });
      onChanged();
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  const saveNotes = async () => {
    if (notes === e.notes) return;
    try {
      await updateEnquiry(e.id, { notes });
      onChanged();
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete the enquiry from ${e.name}? This cannot be undone.`)) return;
    try {
      await deleteEnquiry(e.id);
      onChanged();
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  const replySubject = encodeURIComponent('Your discovery call with Velocity Contents Lab');
  const replyBody = encodeURIComponent(`Hi ${e.name.split(' ')[0]},\n\nThank you for reaching out to Velocity Contents Lab.\n\n`);

  return (
    <li className={`rounded-2xl border transition-colors ${open ? 'border-ink/30' : 'border-ink/10'} ${e.status === 'new' ? 'bg-paper-deep/50' : ''}`}>
      <button onClick={onToggle} aria-expanded={open} className="w-full text-left p-4 sm:p-5 flex items-start gap-4">
        <span className="w-10 h-10 shrink-0 rounded-full bg-ink text-paper flex items-center justify-center font-display">{e.name.charAt(0).toUpperCase()}</span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium">{e.name}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${status.cls}`}>{status.label}</span>
          </span>
          <span className="block text-sm text-muted truncate">
            {[e.service, e.engagement, e.company].filter(Boolean).join(' · ') || e.email}
          </span>
          {!open && e.message && <span className="block mt-1 text-sm text-ink/70 truncate">{e.message}</span>}
        </span>
        <span className="shrink-0 text-xs text-muted text-right">
          {formatDateTime(e.created_at)}
          <ChevronDown className={`ml-auto mt-2 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-ink/10 space-y-5">
          <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {[
              ['Email', e.email],
              ['Company / website', e.company],
              ['Interested in', e.service],
              ['Preferred start', e.engagement],
              ['Sent from', e.source]
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted">{k}</dt>
                <dd className="mt-0.5 break-words">{v || '—'}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="text-sm text-muted">Their message</h3>
            <p className="mt-1.5 p-4 rounded-xl bg-paper-deep/60 whitespace-pre-wrap leading-relaxed">{e.message || 'No message.'}</p>
          </div>
          <label className="block">
            <span className="text-sm text-muted">Your notes (private)</span>
            <textarea
              value={notes}
              onChange={(x) => setNotes(x.target.value)}
              onBlur={saveNotes}
              rows={3}
              placeholder="Call booked for Thursday, sent proposal…"
              className="mt-1.5 w-full p-3 rounded-xl bg-paper-deep/60 border border-ink/12 focus:outline-none focus:border-ink"
            />
          </label>
          {err && <p role="alert" className="p-3 rounded-xl bg-clay/10 text-clay text-sm">{err}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${e.email}?subject=${replySubject}&body=${replyBody}`}
              onClick={() => e.status === 'new' && setStatus('contacted')}
              className="inline-flex items-center gap-2 min-h-[46px] px-5 rounded-full bg-ink text-paper hover:bg-clay transition-colors"
            >
              <Mail className="w-4 h-4" /> Reply by email
            </a>
            <label className="flex items-center gap-2 text-sm text-muted">
              Status
              <select
                value={e.status}
                onChange={(x) => setStatus(x.target.value as EnquiryStatus)}
                className="h-11 px-3 rounded-xl bg-paper-deep border border-ink/12 text-ink"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </label>
            <button onClick={remove} aria-label="Delete enquiry" className="ml-auto w-11 h-11 rounded-full flex items-center justify-center text-muted hover:text-clay hover:bg-clay/10">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
