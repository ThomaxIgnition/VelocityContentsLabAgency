import { COMPANY } from '../content.ts';
import { LeadCapture } from '../types.ts';

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
 * Where enquiries are delivered. Set VITE_LEAD_WEBHOOK_URL (for example an n8n
 * webhook that emails you and logs the lead to Google Sheets) in your hosting
 * provider's environment variables. Without it, the visitor's email app opens
 * with the enquiry pre-filled and addressed to the company inbox.
 */
const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined;

export type LeadResult = 'sent' | 'mailto';

export async function submitLead(lead: LeadInput): Promise<LeadResult> {
  const record: LeadCapture = {
    id: `lead-${Date.now()}`,
    name: lead.name,
    email: lead.email,
    companySize: lead.company,
    budget: lead.engagement,
    source: lead.source,
    timestamp: new Date().toISOString(),
    message: [lead.service && `Service: ${lead.service}`, lead.message].filter(Boolean).join(' | ')
  };

  // Keep a local copy so the existing admin dashboard continues to work on this device.
  try {
    const saved = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    saved.push(record);
    localStorage.setItem('vcl_leads', JSON.stringify(saved));
  } catch {
    // Storage can be unavailable in private browsing; delivery below still happens.
  }

  if (WEBHOOK_URL) {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, submittedAt: record.timestamp, page: window.location.href })
    });
    if (!res.ok) throw new Error(`Lead webhook responded with ${res.status}`);
    return 'sent';
  }

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
