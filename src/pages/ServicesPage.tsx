/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, ArrowUpRight, ArrowRight, ShieldCheck, Zap, HelpCircle, Bot, Sparkles, Clock } from 'lucide-react';
import { SERVICES, BRAND_COMPANY } from '../data.ts';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'retainers' | 'sprints'>('all');

  const filteredServices = SERVICES.filter(s => {
    if (activeTab === 'retainers') return s.price.includes('/month');
    if (activeTab === 'sprints') return s.price.includes('one-time');
    return true;
  });

  const faqs = [
    {
      q: "How does Thomax work with our internal team?",
      a: "Thomax acts as your fractional Chief Content Architect. For retainers, we conduct a 45-minute weekly or bi-weekly strategic extraction session with your founders or subject matter experts, and our team handles 100% of the copywriting, repurposing, design formatting, and multi-channel scheduling."
    },
    {
      q: "How long until we see measurable pipeline momentum?",
      a: "For The Authority Accelerator and The Velocity Engine, visibility and executive reach compound significantly within 30–60 days. Inbound pipeline attribution and inbound discovery inquiries typically surge between day 60 and 90."
    },
    {
      q: "Do you write with AI or human writers?",
      a: "We utilize our proprietary AI-Human Hybrid Content System™. AI is used for structural research, whitespace identification, and initial adaptation across technical specs, but 100% of the narrative stories, editorial nuance, client data, and final polish are handcrafted by human strategists led by Thomax."
    },
    {
      q: "What platforms do you distribute to?",
      a: "Our distribution engine covers LinkedIn (personal profiles + company pages), Twitter/X (standalone posts + threads), Substack / Email newsletters, Medium / Blog cornerstone articles, Instagram (carousels + stories), and direct outbound executive sequences."
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-[#1A1A1A]">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          Engagement Models
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[#1A1A1A] tracking-tight max-w-3xl leading-tight">
          Strategic Services &amp; Retainers
        </h1>
        <p className="font-sans text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed">
          Predictable, high-leverage content engines designed for B2B founders, SaaS teams, and executive leaders who need enterprise pipeline without the 20-hour weekly writing tax.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 p-1.5 bg-editorial-pale border border-black/10 rounded-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
              activeTab === 'all' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            All Packages ({SERVICES.length})
          </button>
          <button
            onClick={() => setActiveTab('retainers')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
              activeTab === 'retainers' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Monthly Retainers
          </button>
          <button
            onClick={() => setActiveTab('sprints')}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
              activeTab === 'sprints' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Fixed Sprints
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const isFeatured = service.id === 'velocity-engine';
            return (
              <div
                key={service.id}
                className={`p-8 md:p-10 rounded-3xl flex flex-col justify-between text-left transition-all relative ${
                  isFeatured
                    ? 'bg-[#121212] text-white border-2 border-brand-orange-warm shadow-2xl'
                    : 'bg-white border border-black/10 text-[#1A1A1A] hover:border-brand-orange-warm shadow-sm'
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3.5 right-8 bg-brand-orange-warm text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-full shadow-md">
                    Flagship Retainer
                  </span>
                )}

                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                    <h2 className={`font-display text-2xl md:text-3xl font-bold italic ${isFeatured ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {service.name}
                    </h2>
                    <span className={`font-display text-2xl font-black ${isFeatured ? 'text-brand-orange-warm' : 'text-[#1A1A1A]'}`}>
                      {service.price}
                    </span>
                  </div>

                  <p className={`text-sm font-sans leading-relaxed mb-6 ${isFeatured ? 'text-neutral-300' : 'text-neutral-600'}`}>
                    {service.description}
                  </p>

                  <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 space-y-2 mb-8 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Target Fit:</span>
                      <span className={`font-semibold ${isFeatured ? 'text-white' : 'text-neutral-900'}`}>{service.bestFor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-400">Momentum Timeline:</span>
                      <span className="text-brand-orange-warm font-semibold">{service.timeline}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-3">
                      Everything Included:
                    </span>
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs leading-relaxed">
                        <Check className="w-4 h-4 text-brand-orange-warm shrink-0 mt-0.5" />
                        <span className={isFeatured ? 'text-neutral-200' : 'text-neutral-700'}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    to="/contact"
                    className={`w-full py-4 rounded-full text-center text-xs uppercase font-bold tracking-widest transition-all ${
                      isFeatured
                        ? 'bg-brand-orange-warm hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-[#1A1A1A] hover:bg-brand-orange-warm text-white'
                    }`}
                  >
                    Initiate {service.name} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-black/8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
            Side-by-Side Clarity
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light italic text-[#1A1A1A] tracking-tight">
            Compare Engagement Matrix
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-black/10 shadow-sm p-4 md:p-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-black/10 text-neutral-400 font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Feature / Deliverable</th>
                <th className="py-3 px-4 text-brand-orange-warm font-bold">Velocity Engine</th>
                <th className="py-3 px-4">Authority Accelerator</th>
                <th className="py-3 px-4">The Launch System</th>
                <th className="py-3 px-4">Strategic Sprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 font-sans">
              <tr>
                <td className="py-4 px-4 font-semibold text-neutral-900">Investment</td>
                <td className="py-4 px-4 font-bold text-brand-orange-warm font-mono">$3,500/mo</td>
                <td className="py-4 px-4 font-mono">$2,500/mo</td>
                <td className="py-4 px-4 font-mono">$5,000 once</td>
                <td className="py-4 px-4 font-mono">$1,500 once</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-neutral-700">Long-Form Cornerstone Pieces</td>
                <td className="py-4 px-4 font-semibold text-emerald-800">4 / month (2,000+ words)</td>
                <td className="py-4 px-4">8 thought leadership</td>
                <td className="py-4 px-4">12 launch suite</td>
                <td className="py-4 px-4">Audit blueprint</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-neutral-700">Derivative Micro-Assets</td>
                <td className="py-4 px-4 font-semibold text-emerald-800">40+ across 10 channels</td>
                <td className="py-4 px-4">LinkedIn + Twitter focus</td>
                <td className="py-4 px-4">30-day calendar</td>
                <td className="py-4 px-4">90-day roadmap</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-neutral-700">Strategy Sessions with Thomax</td>
                <td className="py-4 px-4 font-semibold text-emerald-800">Weekly 1-on-1 calls</td>
                <td className="py-4 px-4">Bi-weekly 1-on-1 calls</td>
                <td className="py-4 px-4">Sprint check-ins</td>
                <td className="py-4 px-4">Audit readout call</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-neutral-700">Distribution Automation Engine</td>
                <td className="py-4 px-4 text-emerald-700 font-bold">✓ Full 10-Platform</td>
                <td className="py-4 px-4 text-emerald-700 font-bold">✓ Core Channels</td>
                <td className="py-4 px-4 text-emerald-700 font-bold">✓ Launch Blitz</td>
                <td className="py-4 px-4 text-neutral-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 border-t border-black/8 text-left">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-light italic text-[#1A1A1A] tracking-tight">
            Clear Answers on Collaboration
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-black/10">
              <h3 className="font-display text-lg font-bold italic text-neutral-900 mb-2">
                {faq.q}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-10">
        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl font-light italic text-white">
            Unsure which engagement tier matches your current growth stage?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
            Book a 15-minute diagnostic. Thomax will review your current pipeline metrics and advise transparently on the best fit.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors shadow-lg"
            >
              <span>Book 15-Minute Diagnostic Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
