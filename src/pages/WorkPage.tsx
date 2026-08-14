/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Filter, 
  Sparkles, 
  Quote, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { CASE_STUDIES, AGENCY_METRICS, BRAND_COMPANY } from '../data.ts';

export default function WorkPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('pulse-digital');

  const industries = ['All', 'High-Ticket Agency', 'B2B SaaS', 'E-commerce Brand', 'Enterprise Advisory', 'Generative Tech / VC'];

  const filteredStudies = CASE_STUDIES.filter(study => {
    if (selectedIndustry === 'All') return true;
    return study.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
  });

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-[#1A1A1A]">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          Verified Evidence
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[#1A1A1A] tracking-tight max-w-3xl leading-tight">
          Case Studies &amp; The Proof Stack
        </h1>
        <p className="font-sans text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed">
          In high-ticket B2B and executive advisory, abstractions die and proof lives. Explore how we transformed quiet expertise into category-defining organic pipelines.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all border ${
                selectedIndustry === ind
                  ? 'bg-[#1A1A1A] text-white border-black shadow-sm'
                  : 'bg-white text-neutral-600 border-black/10 hover:border-black/30'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </section>

      {/* Aggregate Stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AGENCY_METRICS.map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-black/10 text-left">
              <span className="font-display font-bold text-2xl text-brand-orange-warm block">
                {m.value}
              </span>
              <span className="font-sans text-xs font-bold text-neutral-900 block mt-0.5">
                {m.label}
              </span>
              <span className="font-sans text-[10px] text-neutral-500 block mt-1">
                {m.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Case Studies List */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-8 space-y-10">
        {filteredStudies.map((study, idx) => {
          const isExpanded = expandedId === study.id;
          return (
            <div
              key={study.id}
              className="bg-white border border-black/10 rounded-3xl p-8 md:p-10 shadow-sm hover:border-brand-orange-warm/60 transition-all text-left relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Left Overview */}
                <div className="max-w-2xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-brand-orange-warm uppercase tracking-wider">
                      CASE 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono bg-editorial-pale text-neutral-700 px-2.5 py-0.5 rounded border border-black/5 font-bold uppercase">
                      {study.industry}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl font-bold italic text-neutral-900">
                    {study.client}
                  </h2>

                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                    <p className="font-sans text-sm font-bold text-emerald-950 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{study.highlightMetric}</span>
                    </p>
                  </div>
                </div>

                {/* Right Comparison Box */}
                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-center min-w-[120px]">
                    <span className="text-[9px] uppercase text-neutral-400 font-bold block mb-1">Baseline</span>
                    <span className="font-semibold text-neutral-700">{study.metrics.before}</span>
                  </div>
                  <span className="text-brand-orange-warm font-black text-base">→</span>
                  <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center min-w-[120px]">
                    <span className="text-[9px] uppercase text-emerald-700 font-bold block mb-1">Compounded Result</span>
                    <span className="font-bold text-emerald-950">{study.metrics.after}</span>
                  </div>
                </div>

              </div>

              {/* Problem / Solution Breakdown */}
              <div className="mt-8 pt-8 border-t border-black/8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-editorial-pale border border-black/5">
                  <span className="text-[10px] font-mono uppercase text-red-800 font-bold tracking-wider block mb-2">
                    The Initial Bottleneck:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                    {study.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-editorial-pale border border-black/5">
                  <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold tracking-wider block mb-2">
                    The Velocity Solution:
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed">
                    {study.solution} {study.expandedDetails}
                  </p>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-6 pt-6 border-t border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-neutral-500 font-mono">
                  Strategy led by Thomax • Lagos → Global execution
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors self-start sm:self-auto"
                >
                  <span>Build This System for Your Brand</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Footer */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-12">
        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl font-light italic text-white">
            Want to see how your metrics could look in 90 days?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
            Schedule a 15-minute diagnostic session with Thomax. We'll audit your category competitors and map out an organic distribution strategy.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors shadow-lg"
            >
              <span>Schedule Diagnostic Strategy Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
