import { COMPANY } from '../content.ts';
import { supabase } from './supabase.ts';

export interface LeadInput {
  name: string;
  email: string;
  company?: string;
  service?: string;
  engagement?: string;
  message?: string;
  source: string;
}

/**
 * Enquiries are saved to the database and listed in the admin dashboard's
 * Enquiries tab. Optionally, VITE_LEAD_WEBHOOK_URL (for example an n8n workflow
 * that sends email notifications) receives a copy too. Only if the database
 * cannot be reached does the form fall back to the visitor's email app.
 */
const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;

export type LeadResult = 'sent' | 'mailto';

export async function submitLead(lead: LeadInput): Promise<LeadResult> {
  const submittedAt = new Date().toISOString();
  const clean = (v?: string) => (v && v.trim() ? v.trim() : null);

  const { error } = await supabase.from('enquiries').insert({
    name: lead.name.trim(),
    email: lead.email.trim(),
    company: clean(lead.company),
    service: clean(lead.service),
    engagement: clean(lead.engagement),
    message: clean(lead.message),
    source: lead.source,
    page: window.location.href.slice(0, 500)
  });

  if (WEBHOOK_URL) {
    // Notifications are a bonus: a failure here must not lose the enquiry.
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, submittedAt, page: window.location.href })
    }).catch((err) => console.warn('Lead webhook failed', err));
  }

  if (!error) return 'sent';
  console.error('Saving enquiry failed', error);

  const subject = `Discovery call request from ${lead.name}${lead.company ? ` (${lead.company})` : ''}`;
  const body = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company && `Company / website: ${lead.company}`,
    lead.service && `Interested in: ${lead.service}`,
    lead.engagement && `Preferred way to start: ${lead.engagement}`,
    '',
    lead.message || ''
  ]
    .filter((line): line is string => typeof line === 'string')
    .join('\n');
  window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
