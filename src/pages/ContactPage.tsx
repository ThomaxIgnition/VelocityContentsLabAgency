/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Clock, 
  MapPin, 
  Check, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Bot, 
  Calendar,
  MessageSquare,
  Zap
} from 'lucide-react';
import { BRAND_COMPANY, BRAND_TAGLINE, SERVICES, FOUNDER_NAME } from '../data.ts';
import { LeadCapture } from '../types.ts';
import CalAssistant from '../components/shared/CalAssistant.tsx';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$3,500/mo (The Velocity Engine)',
    timeline: 'Immediately (within 7 days)',
    bottleneck: '',
    channel: 'LinkedIn + Newsletter'
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'cal'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    const newLead: LeadCapture = {
      id: `lead-contact-${Date.now()}`,
      name: formState.name,
      email: formState.email,
      companySize: formState.company,
      budget: formState.budget,
      source: 'Contact Page Master Booking Form',
      timestamp: new Date().toISOString(),
      message: `Bottleneck: ${formState.bottleneck} | Preferred Channels: ${formState.channel} | Timeline: ${formState.timeline}`
    };

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push(newLead);
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setSubmitted(true);
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-[#1A1A1A]">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          Direct Inquiry &amp; Strategic Diagnostic
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[#1A1A1A] tracking-tight max-w-3xl leading-tight">
          Book Your 15-Minute Content Diagnostic
        </h1>
        <p className="font-sans text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed">
          Speak directly with Thomax. We will evaluate your current content pipeline, identify distribution bottlenecks, and present a clear 90-day authority roadmap.
        </p>

        {/* Tab switcher: Form vs Cal Assistant */}
        <div className="flex items-center gap-2 mt-4 p-1.5 bg-editorial-pale border border-black/10 rounded-full">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'form' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Diagnostic Booking Form</span>
          </button>
          <button
            onClick={() => setActiveTab('cal')}
            className={`px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'cal' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-brand-orange-warm" />
            <span>Chat with Cal AI Assistant</span>
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {activeTab === 'cal' ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Cal AI Customer Care Specialist Active
              </span>
            </div>
            <CalAssistant embedded={true} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-black/10 space-y-4 shadow-sm">
                <h3 className="font-display text-xl font-bold italic text-neutral-900">
                  What happens on the diagnostic?
                </h3>
                
                <div className="space-y-3 text-xs font-sans text-neutral-600 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-orange-warm shrink-0 mt-0.5" />
                    <span><strong>Distribution Audit:</strong> We analyze your current LinkedIn, X, and newsletter reach to isolate where your audience is dropping off.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-orange-warm shrink-0 mt-0.5" />
                    <span><strong>Category Whitespace:</strong> We identify 3 high-impact cornerstone topics your competitors have left completely wide open.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-orange-warm shrink-0 mt-0.5" />
                    <span><strong>Execution Roadmap:</strong> We show you how to implement the 65-minute weekly workflow to produce 40+ assets per week.</span>
                  </div>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="p-6 rounded-2xl bg-editorial-pale border border-black/10 space-y-4">
                <span className="text-[10px] font-mono uppercase text-brand-orange-warm font-bold block">
                  Direct Agency Contacts
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-orange-warm shrink-0" />
                    <a href="mailto:hello@velocitycontentlabs.com" className="font-mono text-neutral-800 hover:text-brand-orange-warm">
                      hello@velocitycontentlabs.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-orange-warm shrink-0" />
                    <span className="text-neutral-600">Response SLA: Within 4 business hours</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-orange-warm shrink-0" />
                    <span className="text-neutral-600">Lagos, Nigeria • Operating Globally</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7 bg-white border border-black/10 p-8 md:p-10 rounded-3xl shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-3xl font-bold italic text-neutral-900">
                    Diagnostic Request Confirmed!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you, {formState.name}. Thomax will review your company details and send a direct calendar scheduling link to <strong>{formState.email}</strong> within 4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white font-mono text-xs font-bold uppercase mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-bold italic text-neutral-900">
                    Tell Us About Your Brand
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Company &amp; Website
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="Acme Analytics (acme.com)"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Target Engagement Model
                      </label>
                      <select
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      >
                        <option value="$3,500/mo (The Velocity Engine)">The Velocity Engine ($3,500/mo)</option>
                        <option value="$2,500/mo (The Authority Accelerator)">The Authority Accelerator ($2,500/mo)</option>
                        <option value="$5,000 one-time (The Launch System)">The Launch System ($5,000 one-time)</option>
                        <option value="$1,500 one-time (The Strategic Sprint)">The Strategic Sprint ($1,500 one-time)</option>
                        <option value="Custom/Enterprise">Custom Enterprise Scope</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                      What is your single biggest bottleneck right now?
                    </label>
                    <textarea
                      rows={3}
                      value={formState.bottleneck}
                      onChange={(e) => setFormState({ ...formState, bottleneck: e.target.value })}
                      placeholder="e.g. We have deep technical case studies, but no consistency in repurposing them into LinkedIn carousels and email campaigns..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                  >
                    <span>Request Diagnostic Schedule</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        )}
      </section>

    </div>
  );
}
