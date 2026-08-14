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
  Cpu, 
  HeartHandshake, 
  Share2, 
  MailOpen, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Layers, 
  Radio, 
  Clock, 
  Zap,
  BookOpen
} from 'lucide-react';
import { FRAMEWORKS, BRAND_COMPANY } from '../data.ts';

export default function MethodPage() {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState<number>(0);

  const workflowSteps = [
    {
      time: '00–20m',
      layer: 'AI SPEED',
      title: 'Structural Research & Whitespace Audit',
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      action: 'AI maps high-ranking competitor keywords, isolates unmet audience questions, and prepares logical structural outlines.',
      deliverable: '1 Comprehensive Structural Scaffold & Content Thesis'
    },
    {
      time: '20–30m',
      layer: 'HUMAN SOUL',
      title: 'Founder War Stories & Proprietary Data',
      color: 'text-brand-orange-warm bg-orange-950/60 border-orange-800',
      action: 'Thomax extracts your non-replicable anecdotes, real customer numbers, internal disagreements, and contrarian perspectives.',
      deliverable: 'Proprietary narrative bedrock that AI could never invent'
    },
    {
      time: '30–45m',
      layer: 'AI SPEED',
      title: 'Multi-Channel Derivative Drafting',
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      action: 'AI adapts the master core piece into 40+ customized variations conforming to character limits and technical layout constraints.',
      deliverable: 'Drafts for LinkedIn, X threads, newsletters, and carousel slides'
    },
    {
      time: '45–60m',
      layer: 'HUMAN SOUL',
      title: 'Voice Calibration & Coffee Shop Test',
      color: 'text-brand-orange-warm bg-orange-950/60 border-orange-800',
      action: 'Human editors scrub all generic filler, calibrate emotional cadence, and test against: "Could you say this over a coffee?"',
      deliverable: 'Handcrafted editorial polish that commands instant respect'
    },
    {
      time: '60–65m',
      layer: 'OPS SPEED',
      title: 'Automated Multi-Platform Scheduling',
      color: 'text-blue-400 bg-blue-950/60 border-blue-800',
      action: 'Automated delivery into content calendars across 10 distribution channels, tagged with lead-capture keywords.',
      deliverable: '1 Full week of authority distribution completely deployed'
    }
  ];

  const cadence7Touch = [
    { day: 'Day 0', touch: 'Touch 1', name: 'Personalized Connection', desc: 'Sincere, non-salesy acknowledgement of their recent insight or achievement. Zero links, zero asks.' },
    { day: 'Day 3', touch: 'Touch 2', name: 'Surgical Value Drop', desc: 'Point out an invisible distribution gap on their latest article and hand them a formatted thread on a silver platter.' },
    { day: 'Day 7', touch: 'Touch 3', name: 'Observational Weight', desc: 'Add 3 paragraphs of high-level intellectual perspective to their public discussion thread.' },
    { day: 'Day 12', touch: 'Touch 4', name: 'Micro Case Study Drop', desc: 'Send a 1-page breakdown showing how a similar category leader scaled demo pipelines by 300%.' },
    { day: 'Day 18', touch: 'Touch 5', name: 'The Zero-Friction Ask', desc: '"Would 15 minutes of auditing your distribution bottlenecks be worth your time?"' },
    { day: 'Day 25', touch: 'Touch 6', name: 'The Last Value Gift', desc: 'Send an internal proprietary framework PDF worksheet completely free with no strings attached.' },
    { day: 'Day 32', touch: 'Touch 7', name: 'The Dignified Breakup', desc: '"Since timing may be tight, I will step back. If you ever need to scale distribution, you know where to find me."' }
  ];

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-[#1A1A1A]">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          The Architecture of Organic Authority
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[#1A1A1A] tracking-tight max-w-3xl leading-tight">
          The Velocity Method &amp; Frameworks
        </h1>
        <p className="font-sans text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed">
          Where Strategy Meets Soul. We combine the rapid execution velocity of modern AI with the nuanced emotional wisdom and storytelling craft of seasoned human editorial architects.
        </p>
      </section>

      {/* 4 Phases Overview */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="text-left mb-10">
          <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-1">
            Core Operating System
          </span>
          <h2 className="font-display text-3xl font-bold italic text-neutral-900">
            The 4-Phase Growth Cycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-black/10 text-left space-y-3">
            <span className="font-mono text-xs font-bold text-brand-orange-warm bg-brand-orange-warm/10 px-2.5 py-1 rounded">
              PHASE 01 • DEEP LISTENING
            </span>
            <h3 className="font-display text-2xl font-bold italic text-neutral-900">
              Isolating Unmet Category Whitespace
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We audit your closed-lost sales conversations, client objections, support tickets, and executive transcripts to determine what your market is desperately searching for but nobody is addressing cleanly.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-black/10 text-left space-y-3">
            <span className="font-mono text-xs font-bold text-brand-orange-warm bg-brand-orange-warm/10 px-2.5 py-1 rounded">
              PHASE 02 • STRATEGIC CREATION
            </span>
            <h3 className="font-display text-2xl font-bold italic text-neutral-900">
              Crafting Cornerstone IP
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Thomax crafts cornerstone 2,000+ word deep-dives that establish clear thought leadership positions, backed by proprietary diagrams, frameworks, and real client numbers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-black/10 text-left space-y-3">
            <span className="font-mono text-xs font-bold text-brand-orange-warm bg-brand-orange-warm/10 px-2.5 py-1 rounded">
              PHASE 03 • VELOCITY DISTRIBUTION
            </span>
            <h3 className="font-display text-2xl font-bold italic text-neutral-900">
              Multi-Channel Multiplication
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our automated engine explodes 1 core master session into 40+ tailored assets across LinkedIn, Twitter/X, Substack, Medium, Instagram, and direct outreach sequences.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-black/10 text-left space-y-3">
            <span className="font-mono text-xs font-bold text-brand-orange-warm bg-brand-orange-warm/10 px-2.5 py-1 rounded">
              PHASE 04 • HUMAN ENGAGEMENT
            </span>
            <h3 className="font-display text-2xl font-bold italic text-neutral-900">
              Pipeline Conversion via The 7-Touch System
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We guide key decision-makers through a 32-day value cadence that builds uncontested credibility before a discovery call is ever requested.
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Dive: The 65-Minute Hybrid Engine */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-black/8" id="hybrid">
        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl text-left space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-warm/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
              Step-by-Step Breakdown
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-white tracking-tight">
              The 65-Minute Weekly Hybrid Content Engine™
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl mt-2 leading-relaxed">
              How we protect executive time while shipping 40+ pieces of high-signal content every single week without sacrificing human authenticity.
            </p>
          </div>

          {/* Interactive Steps */}
          <div className="space-y-4">
            {workflowSteps.map((step, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-orange-warm/60 transition-all"
              >
                <div className="flex items-center gap-4 shrink-0">
                  <span className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border ${step.color}`}>
                    {step.time}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                      {step.layer}
                    </span>
                    <h4 className="font-display text-base font-bold italic text-white">
                      {step.title}
                    </h4>
                  </div>
                </div>

                <div className="max-w-md">
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {step.action}
                  </p>
                </div>

                <div className="shrink-0 p-3 bg-black/40 rounded-xl border border-neutral-800 text-[11px] font-mono text-brand-orange-warm">
                  🎯 {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 7-Touch Fortune Framework Cadence */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-black/8" id="fortune">
        <div className="text-left mb-10">
          <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-1">
            Pipeline Generation Engine
          </span>
          <h2 className="font-display text-3xl font-bold italic text-neutral-900">
            The 7-Touch Fortune Framework™ (32-Day Cadence)
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-2xl mt-2 leading-relaxed">
            Why 95% of cold agency outreach dies on touch 2, and how our 32-day value-first sequence achieves 50%+ response rates.
          </p>
        </div>

        <div className="space-y-3">
          {cadence7Touch.map((touch, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white border border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left hover:border-brand-orange-warm transition-all"
            >
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-mono text-xs font-bold text-neutral-900 bg-editorial-pale px-3 py-1.5 rounded-lg border border-black/5 min-w-[70px] text-center">
                  {touch.day}
                </span>
                <div>
                  <span className="text-[9px] font-mono uppercase text-brand-orange-warm font-bold block">
                    {touch.touch}
                  </span>
                  <h4 className="font-display text-base font-bold italic text-neutral-900">
                    {touch.name}
                  </h4>
                </div>
              </div>

              <div className="max-w-lg">
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  {touch.desc}
                </p>
              </div>

              <div className="shrink-0 text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                Zero Sales Pressure
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-10">
        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl font-light italic text-white">
            Ready to deploy The Velocity Method across your brand?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
            Schedule a 15-minute diagnostic with Thomax to audit your existing content workflow.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors shadow-lg"
            >
              <span>Book Content Diagnostic</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
