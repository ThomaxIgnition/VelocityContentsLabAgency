/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Mail, Clock, ArrowUpRight, Sparkles, AlertCircle } from 'lucide-react';
import { LeadCapture } from '../types.ts';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '$3,500/mo retainer', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Save Lead to database state
    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push({
      id: `lead-contact-page-${Date.now()}`,
      name: form.name,
      email: form.email,
      companySize: form.company,
      budget: form.budget,
      source: `Contact Page Screen`,
      timestamp: new Date().toISOString(),
      message: form.message
    });
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setSubmitted(true);
    // Track count for dashboard
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-editorial-dark animate-fade-in" id="contact-directory-experience">
      
      {/* Editorial Title */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/5 mb-8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          Initiate Partnership
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-light italic text-editorial-dark tracking-tight max-w-2xl leading-none">
          Book a 15-Minute Diagnostic Call
        </h1>
        <p className="font-sans text-xs md:text-sm text-slate-505 max-w-xl leading-relaxed tracking-normal">
          Thomax will review your brand's digital footprints, compile a custom diagnostic report, and present the findings live over Zoom. Zero boilerplate pitches.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        
        {/* Left Columns Information */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="bg-[#121212] text-white p-6 md:p-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-orange-warm/5 rounded-full blur-2xl pointer-events-none" />
            <span className="font-mono text-[9px] text-brand-orange-warm uppercase tracking-[0.15em] font-bold block mb-1">
              Response SLA guarantee
            </span>
            <h3 className="font-display italic text-lg font-light text-white leading-snug mb-3">
              No long waiting loops.
            </h3>
            <p className="text-xs text-slate-350 font-sans leading-relaxed">
              We operate across West Africa Time (WAT) but sync with global coordinates. All screen applications are reviewed and scheduled within 4 business hours. Guaranteed.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-editorial-pale border border-[#1A1A1A]/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-orange-warm/15 text-brand-orange-warm flex items-center justify-center shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono font-bold">Direct Inquiry:</span>
                <a href="mailto:hello@velocitycontentlabs.com" className="hover:text-brand-orange-warm text-xs font-semibold font-mono text-[#1A1A1A] transition-colors">
                  hello@velocitycontentlabs.com
                </a>
              </div>
            </div>

            <div className="p-4 bg-editorial-pale border border-[#1A1A1A]/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#1A1A1A]/5 text-editorial-dark flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono font-bold">Operating Hours:</span>
                <span className="block text-xs font-bold text-editorial-dark">
                  Monday–Friday, 9 AM – 5 PM WAT (UTC+1)
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 border-l-4 border-brand-orange-warm bg-[#F0E6D2]/60 flex items-start gap-3">
            <AlertCircle className="w-4.5 h-4.5 text-brand-orange-warm shrink-0 mt-0.5" />
            <p className="text-[10px] font-sans text-amber-900 leading-normal font-medium">
              We only onboard 2 new retainer accounts per month to guarantee Emmanuel Sunday Thomas manages and designs every content architecture himself.
            </p>
          </div>
        </div>

        {/* Right Columns form */}
        <div className="lg:col-span-7">
          <div className="bg-editorial-pale border border-[#1A1A1A]/10 p-6 md:p-8">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-left" id="contact-screen-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Emmanuel Sunday" 
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Business Email</label>
                    <input 
                      type="email" 
                      placeholder="hello@firm.com" 
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Your Company Name</label>
                    <input 
                      type="text" 
                      placeholder="Pulse Digital" 
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Engagement Target Budget</label>
                    <select 
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    >
                      <option value="$3,500/mo retainer">The Velocity Engine — $3,500/mo</option>
                      <option value="$2,500/mo retainer">The Authority Accelerator — $2,500/mo</option>
                      <option value="$5,000 one-time">The Launch System — $5,000 one-time</option>
                      <option value="$1,500 one-time">The Strategic Sprint — $1,500 one-time</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Objectives and current operational barriers</label>
                  <textarea 
                    placeholder="We publish consistently, but our content has zero emotional soul or distribution volume..." 
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm font-sans leading-relaxed"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-brand-orange-warm font-sans text-[11px] uppercase tracking-wider font-bold text-editorial-cream transition-colors flex items-center justify-center gap-2"
                >
                  Verify Data &amp; Request Calendar Slot <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-brand-green-emerald rounded-full flex items-center justify-center mb-1">
                  <Check className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="font-display italic text-lg font-semibold text-editorial-dark">Your Screening Dossier Is Saved!</h3>
                <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed">
                  The dashboard has captured your screening. We will review your current online footprint, compile a visual summary, and dispatch a booking Calendly directly to <span className="text-[#1A1A1A] font-bold font-mono">{form.email}</span> within 4 business hours.
                </p>
              </div>
            )}

          </div>
        </div>

      </section>

    </div>
  );
}
