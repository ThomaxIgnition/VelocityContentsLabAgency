/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  ArrowRight,
  Share2, 
  MailOpen, 
  ShieldCheck, 
  Cpu, 
  HeartHandshake, 
  Check, 
  Download, 
  Calendar, 
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Mail,
  Scale,
  Radio,
  Layers,
  Bot,
  Zap,
  HelpCircle,
  Clock,
  TrendingUp,
  Globe,
  Quote
} from 'lucide-react';
import { 
  SERVICES, 
  FRAMEWORKS, 
  RESOURCES, 
  CASE_STUDIES, 
  CHAPTERS, 
  ORIGIN_STORY_TEXT,
  AGENCY_METRICS,
  BRAND_COMPANY,
  BRAND_TAGLINE,
  FOUNDER_NAME,
  COFFEE_SHOP_TEST_QUOTE
} from '../data.ts';
import BrandImage from '../components/shared/BrandImage.tsx';
import LemonadeStory from '../components/shared/LemonadeStory.tsx';
import CalAssistant from '../components/shared/CalAssistant.tsx';
import { LeadCapture } from '../types.ts';

export default function HomePage() {
  const navigate = useNavigate();

  // Cyclical word rotator for Hero
  const cycles = [
    'build undisputed market authority.',
    'generate predictable organic pipelines.',
    'turn quiet experts into category leaders.',
    'close five-figure client retainers.'
  ];
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Case study expander state
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);

  const toggleCaseStudy = (id: string) => {
    setExpandedCaseStudy(prev => (prev === id ? null : id));
  };

  // Lead capture state for bottom section
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', budget: '$3,500/mo retainer', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    const newLead: LeadCapture = {
      id: `lead-home-${Date.now()}`,
      name: leadForm.name,
      email: leadForm.email,
      companySize: leadForm.company,
      budget: leadForm.budget,
      source: 'Homepage Master Diagnostic Form',
      timestamp: new Date().toISOString(),
      message: leadForm.message
    };

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push(newLead);
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setFormSubmitted(true);
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  const triggerCal = () => {
    const el = document.getElementById('floating-cal-button');
    if (el) el.click();
  };

  const problemPoints = [
    {
      num: '01',
      title: 'Posting Constantly, Yet Pipeline Stays Empty',
      stat: '92% of organic content yields zero business pipeline',
      consequence: 'Creative teams spend dozens of hours writing for superficial vanity likes rather than enterprise decision-makers who actually sign retainers.'
    },
    {
      num: '02',
      title: 'Spending Heavily on Ads with Diminishing Returns',
      stat: 'Ad CPCs have inflated by over 40% across major platforms',
      consequence: 'Budgets purchase accidental clicks and bots while authentic buyers develop ad-blindness and seek trusted founder recommendations.'
    },
    {
      num: '03',
      title: 'Cornerstone Genius Locked Inside Ignored PDFs',
      stat: 'Less than 8% of proprietary thinking ever gets distributed',
      consequence: 'Elite institutional intelligence sits dead in archived slide decks, internal Notion docs, and unpublished notes while louder competitors win the market.'
    }
  ];

  const methodologyPhases = [
    {
      phase: '01',
      title: 'Deep Listening',
      icon: <Radio className="w-5 h-5 text-brand-orange-warm" />,
      desc: 'We extract real objections, sales recordings, support tickets, and raw executive conversations to pinpoint the exact whitespace in your category.'
    },
    {
      phase: '02',
      title: 'Strategic Creation',
      icon: <Layers className="w-5 h-5 text-brand-orange-warm" />,
      desc: 'Thomax and our editorial team craft cornerstone intellectual assets loaded with proprietary frameworks and authentic human voice—never synthetic filler.'
    },
    {
      phase: '03',
      title: 'Velocity Distribution',
      icon: <Share2 className="w-5 h-5 text-brand-orange-warm" />,
      desc: 'Our proprietary engine converts 1 weekly cornerstone session into 10+ tailored derivative formats across LinkedIn, X, newsletters, carousels, and media pitches.'
    },
    {
      phase: '04',
      title: 'Human Engagement',
      icon: <HeartHandshake className="w-5 h-5 text-brand-orange-warm" />,
      desc: 'We deploy The 7-Touch Fortune Framework to engage key decision-makers naturally, converting public authority into qualified inbound discovery calls.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-editorial-cream text-[#1A1A1A] overflow-hidden" id="homepage-flagship-root">
      
      {/* ========================================================================= */}
      {/* SECTION 1: FLAGSHIP HERO */}
      {/* ========================================================================= */}
      <section className="relative px-6 md:px-12 pt-12 pb-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8">
        
        {/* Background glow accents */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-orange-warm/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-editorial-pale border border-[#1A1A1A]/10 text-xs font-mono font-medium text-neutral-800">
            <span className="w-2 h-2 rounded-full bg-brand-orange-warm animate-pulse" />
            <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Lagos → Global Content Agency</span>
            <span className="text-neutral-300">•</span>
            <span className="text-brand-orange-warm font-semibold">Where Strategy Meets Soul</span>
          </div>

          {/* Master Headline with Dynamic Cycler */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light italic text-[#1A1A1A] tracking-tight leading-[1.08] max-w-5xl">
            We turn cornerstone thinking into distribution systems that{' '}
            <span className="font-medium text-brand-orange-warm not-italic block mt-1 sm:inline sm:mt-0 underline decoration-brand-orange-warm/30 underline-offset-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={cycleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="inline-block"
                >
                  {cycles[cycleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl leading-relaxed tracking-normal mt-2">
            The world's best content doesn't win. The <strong className="text-neutral-900 font-semibold">best distributed</strong> content wins. 
            We architect high-impact editorial pipelines that convert executive expertise into multi-channel authority and pipeline revenue in 65 minutes a week.
          </p>

          {/* Primary Action Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-editorial-cream font-sans text-xs uppercase font-bold tracking-widest transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/10 hover:shadow-orange-500/20 active:scale-95"
              id="hero-book-diagnostic"
            >
              <span>Book 15-Min Content Diagnostic</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={triggerCal}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-editorial-pale text-neutral-800 font-sans text-xs font-bold uppercase tracking-widest border border-black/10 transition-all flex items-center justify-center gap-2 shadow-sm"
              id="hero-talk-cal"
            >
              <Bot className="w-4 h-4 text-brand-orange-warm" />
              <span>Ask Cal (AI Care Representative)</span>
            </button>
          </div>

          {/* Micro Guarantee SLA */}
          <p className="text-[11px] font-mono text-neutral-400 mt-1 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero sales pressure • Custom 90-day pipeline roadmap presented live • 4-hour response SLA</span>
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: PROOF & CLIENT IMPACT METRICS BAR */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto border-b border-[#1A1A1A]/8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {AGENCY_METRICS.map((metric, i) => (
            <div 
              key={i} 
              className="flex flex-col text-left p-4 rounded-xl bg-editorial-pale border border-[#1A1A1A]/5 hover:border-brand-orange-warm/40 transition-colors"
            >
              <span className="font-display font-bold text-2xl md:text-3xl text-brand-orange-warm tracking-tight">
                {metric.value}
              </span>
              <span className="font-sans text-xs font-bold text-[#1A1A1A] mt-1">
                {metric.label}
              </span>
              <span className="font-sans text-[11px] text-neutral-500 mt-1 leading-snug">
                {metric.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE PROBLEM ("THE CONTENT TRAP") */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="problem">
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
            The Industry Blindspot
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
            The Content Trap: Why Great Ideas Die in Silence
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
            Most companies mistakenly believe their content problem is a <span className="italic">creation</span> deficit. In reality, it is almost always a <span className="font-semibold text-neutral-900">distribution bottleneck</span> coupled with robotic voice alienation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemPoints.map((p) => (
            <div 
              key={p.num}
              className="bg-editorial-pale border border-[#1A1A1A]/10 p-8 rounded-2xl flex flex-col justify-between hover:border-brand-orange-warm/50 transition-all text-left relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-brand-orange-warm bg-brand-orange-warm/10 px-2.5 py-1 rounded">
                    PHASE {p.num}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    DIAGNOSTIC
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold italic text-[#1A1A1A] leading-snug mb-3">
                  {p.title}
                </h3>

                <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-lg mb-4">
                  <p className="text-xs font-mono font-bold text-red-900">
                    ⚠️ {p.stat}
                  </p>
                </div>

                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {p.consequence}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Velocity Solution:</span>
                <span className="text-brand-orange-warm font-semibold">Native Distribution</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: THE LEMONADE STAND ORIGIN STORY */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="origin-story">
        <LemonadeStory />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: THE VELOCITY METHOD */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="method">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-left">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
              Our Proprietary Architecture
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
              The Velocity Method: 4 Phases to Undisputed Authority
            </h2>
            <p className="font-sans text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
              We operate a closed-loop system that takes your raw institutional thinking and deploys it across the exact channels your target enterprise buyers read every single morning.
            </p>
          </div>

          <Link
            to="/method"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-brand-orange-warm hover:text-orange-700 transition-colors shrink-0"
          >
            <span>Explore All 5 Frameworks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologyPhases.map((phase) => (
            <div 
              key={phase.phase}
              className="bg-white border border-[#1A1A1A]/10 p-7 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-editorial-pale border border-black/5 flex items-center justify-center">
                    {phase.icon}
                  </div>
                  <span className="font-mono text-xs font-black text-neutral-400">
                    {phase.phase}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold italic text-[#1A1A1A] mb-2">
                  {phase.title}
                </h3>

                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {phase.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 text-[10px] font-mono text-brand-orange-warm font-semibold uppercase tracking-wider">
                Continuous Calibration
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: STRATEGIC SERVICES */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="services">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
              Transparent Retainers &amp; Sprints
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
              Four High-Impact Engagement Models
            </h2>
            <p className="font-sans text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
              No hidden fees, no junior hand-offs, no vague agency hours. Every engagement delivers tangible, verifiable distribution assets with Thomax leading the strategy.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-brand-orange-warm hover:text-orange-700 transition-colors shrink-0"
          >
            <span>Compare Detailed Inclusions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const isFeatured = service.id === 'velocity-engine';
            return (
              <div 
                key={service.id}
                className={`p-8 rounded-2xl flex flex-col justify-between text-left transition-all relative ${
                  isFeatured 
                    ? 'bg-[#121212] text-white border-2 border-brand-orange-warm shadow-xl' 
                    : 'bg-editorial-pale border border-[#1A1A1A]/10 text-[#1A1A1A] hover:border-brand-orange-warm'
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3.5 right-8 bg-brand-orange-warm text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow">
                    Most Popular Retainer
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className={`font-display text-2xl font-bold italic ${isFeatured ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        {service.name}
                      </h3>
                      <p className={`text-xs mt-1 font-sans ${isFeatured ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`font-display text-2xl font-black ${isFeatured ? 'text-brand-orange-warm' : 'text-[#1A1A1A]'}`}>
                        {service.price}
                      </span>
                    </div>
                  </div>

                  {/* Best For & Timeline */}
                  <div className="my-5 p-3 rounded-lg bg-black/5 dark:bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono">
                    <div>
                      <span className="text-neutral-400">Best for: </span>
                      <span className={`font-semibold ${isFeatured ? 'text-neutral-200' : 'text-neutral-800'}`}>{service.bestFor}</span>
                    </div>
                    <div className="text-brand-orange-warm font-semibold shrink-0">
                      ⏱ {service.timeline}
                    </div>
                  </div>

                  {/* Includes List */}
                  <div className="space-y-2.5 my-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-2">
                      Core Deliverables:
                    </span>
                    {service.includes.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 text-brand-orange-warm shrink-0 mt-0.5" />
                        <span className={isFeatured ? 'text-neutral-300' : 'text-neutral-700'}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
                  <Link
                    to="/contact"
                    className={`w-full py-3.5 rounded-full text-center text-xs uppercase font-bold tracking-widest transition-all ${
                      isFeatured
                        ? 'bg-brand-orange-warm hover:bg-orange-600 text-white shadow-md'
                        : 'bg-[#1A1A1A] hover:bg-brand-orange-warm text-white'
                    }`}
                  >
                    Select {service.name} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: THE 65-MINUTE AI-HUMAN HYBRID ENGINE */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8">
        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-warm/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
              The Anti-Robot Creation Protocol
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-white tracking-tight leading-tight">
              The 65-Minute Weekly Hybrid Content Engine™
            </h2>
            <p className="font-sans text-sm text-neutral-400 mt-2 leading-relaxed">
              We leverage AI where machines excel (rapid synthesis, outline mapping, multi-platform formatting) while strictly protecting human emotional depth, personal war stories, and soul.
            </p>
          </div>

          {/* 5-Step Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  00–20m • AI
                </span>
                <h4 className="font-display text-base font-bold italic text-white mt-3 mb-1">
                  Structural Mapping
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Competitor whitespace audit, semantic outline generation, and angle exploration.
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-4">Speed Multiplier</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-brand-orange-warm/40 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-brand-orange-warm bg-orange-950 px-2 py-0.5 rounded border border-orange-800/40">
                  20–30m • HUMAN
                </span>
                <h4 className="font-display text-base font-bold italic text-white mt-3 mb-1">
                  Soul &amp; War Stories
                </h4>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Thomax stitches your unreplicable personal lessons, client numbers, and proprietary opinions.
                </p>
              </div>
              <span className="text-[10px] font-mono text-brand-orange-warm font-semibold mt-4">Zero Robotic Filler</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  30–45m • AI
                </span>
                <h4 className="font-display text-base font-bold italic text-white mt-3 mb-1">
                  Derivative Drafting
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Drafting 40+ customized variants tailored to LinkedIn, X, newsletters, and visual slides.
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-4">10 Channels in Minutes</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-brand-orange-warm/40 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-brand-orange-warm bg-orange-950 px-2 py-0.5 rounded border border-orange-800/40">
                  45–60m • HUMAN
                </span>
                <h4 className="font-display text-base font-bold italic text-white mt-3 mb-1">
                  Voice &amp; Soul Edit
                </h4>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Sentence cadence fine-tuning, removal of generic SaaS jargon, and punchy hook calibration.
                </p>
              </div>
              <span className="text-[10px] font-mono text-brand-orange-warm font-semibold mt-4">The Coffee Shop Test</span>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-800/40">
                  60–65m • OPS
                </span>
                <h4 className="font-display text-base font-bold italic text-white mt-3 mb-1">
                  Auto Distribution
                </h4>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Scheduled multi-channel broadcasting across your brand and founder personal profiles.
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-4">100% Scheduled</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: EMBEDDED CAL AI CUSTOMER CARE SHOWCASE */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="cal-ai">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
            Intelligent Customer Care
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
            Meet Cal: Your AI Care Representative
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
            Have questions about our retainer models, the 65-minute workflow, or want to book a direct 15-minute diagnostic with Thomax? Chat with Cal in real-time below.
          </p>
        </div>

        {/* Embedded Cal Assistant Component */}
        <CalAssistant embedded={true} />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CASE STUDIES & PROOF STACK */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="results">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
              Verified Client Proof
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
              The Proof Stack: Results Across 5 Continents
            </h2>
            <p className="font-sans text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
              Abstractions die; verified proof lives. Review actual client transformations across B2B SaaS, executive advisory, direct-to-consumer, and high-ticket service firms.
            </p>
          </div>

          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-brand-orange-warm hover:text-orange-700 transition-colors shrink-0"
          >
            <span>View Complete Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {CASE_STUDIES.map((study) => {
            const isExpanded = expandedCaseStudy === study.id;
            return (
              <div 
                key={study.id}
                className="bg-editorial-pale border border-[#1A1A1A]/10 rounded-2xl p-6 md:p-8 hover:border-brand-orange-warm transition-all text-left"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Client info */}
                  <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-bold text-xl text-[#1A1A1A]">
                        {study.client}
                      </span>
                      <span className="text-[10px] font-mono bg-black/5 text-neutral-700 px-2.5 py-0.5 rounded font-bold uppercase">
                        {study.industry}
                      </span>
                    </div>

                    <p className="text-sm font-sans font-semibold text-brand-orange-warm leading-snug">
                      ✨ {study.highlightMetric}
                    </p>
                  </div>

                  {/* Middle Metrics Before/After */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="p-3 bg-white border border-black/5 rounded-xl">
                      <span className="text-neutral-400 block text-[9px] uppercase">Before</span>
                      <span className="font-semibold text-neutral-700">{study.metrics.before}</span>
                    </div>
                    <span className="text-brand-orange-warm font-bold">→</span>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <span className="text-emerald-700 block text-[9px] uppercase font-bold">After (90 Days)</span>
                      <span className="font-bold text-emerald-950">{study.metrics.after}</span>
                    </div>
                  </div>

                  {/* Right Button */}
                  <button
                    onClick={() => toggleCaseStudy(study.id)}
                    className="self-start lg:self-center px-4 py-2 rounded-full border border-black/15 hover:bg-black hover:text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>{isExpanded ? 'Collapse Blueprint' : 'Inspect Strategy'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Expanded Details Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-6 pt-6 border-t border-black/10 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                    >
                      <div className="p-4 bg-white rounded-xl border border-black/5">
                        <span className="text-[10px] font-mono uppercase text-red-700 font-bold block mb-1">
                          The Core Bottleneck:
                        </span>
                        <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-xl border border-black/5">
                        <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block mb-1">
                          Velocity Method Deployed:
                        </span>
                        <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                          {study.solution} {study.expandedDetails}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: PROPRIETARY FRAMEWORKS PREVIEW */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block mb-2">
              Intellectual Infrastructure
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
              Battle-Tested Growth Frameworks
            </h2>
            <p className="font-sans text-sm md:text-base text-neutral-600 mt-3 leading-relaxed">
              Every system we deploy is documented into step-by-step frameworks engineered to bypass friction, cultivate instant buyer trust, and convert attention into contracts.
            </p>
          </div>

          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-brand-orange-warm hover:text-orange-700 transition-colors shrink-0"
          >
            <span>Download PDF Toolkits</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FRAMEWORKS.map((fw) => (
            <div 
              key={fw.id}
              className="bg-white border border-[#1A1A1A]/10 p-7 rounded-2xl flex flex-col justify-between hover:border-brand-orange-warm hover:shadow-md transition-all text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-mono bg-brand-orange-warm/10 text-brand-orange-warm px-2 py-0.5 rounded font-bold uppercase">
                    KEYWORD: {fw.keyword}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">VCL-IP</span>
                </div>

                <h3 className="font-display text-lg font-bold italic text-[#1A1A1A] mb-1">
                  {fw.name}
                </h3>
                <p className="text-xs font-mono text-brand-orange-warm mb-3 font-semibold">
                  "{fw.principle}"
                </p>

                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {fw.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5">
                <span className="text-[11px] font-sans font-bold text-emerald-800 block">
                  🎯 Verified Result: {fw.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11: THE FOUNDER & PHILOSOPHY */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto border-b border-[#1A1A1A]/8" id="founder">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Left Column Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              <BrandImage
                src="/photos/1000335399.png"
                alt="Thomax - Emmanuel Sunday Thomas"
                aspectRatio="3:4"
                stylingType="photoA"
                className="w-full shadow-2xl rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl border border-black/10 shadow-lg">
                <h4 className="font-display text-base font-bold italic text-neutral-900 leading-none">
                  {FOUNDER_NAME}
                </h4>
                <p className="text-[11px] font-mono text-brand-orange-warm mt-1 font-semibold">
                  Founder &amp; Chief Content Architect
                </p>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Lagos, Nigeria • Leading Global Distribution Strategy
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block">
              Founder Profile &amp; Ethos
            </span>

            <h2 className="font-display text-3xl md:text-5xl font-light italic text-[#1A1A1A] tracking-tight leading-tight">
              "Where Strategy Meets Soul is not a slogan. It is an operational standard."
            </h2>

            <p className="font-sans text-sm md:text-base text-neutral-700 leading-relaxed">
              I founded Velocity Contents Lab after a sobering realization in Lagos: the most brilliant minds and transformative software products in the world were losing deals to mediocre competitors simply because they lacked distribution discipline.
            </p>

            <p className="font-sans text-sm md:text-base text-neutral-700 leading-relaxed">
              We reject the wave of lazy, synthetic AI spam flooding the internet today. When you work with Velocity Contents Lab, you get cutting-edge semantic speed combined with the unreplicable warmth, wisdom, and punch of true human voice.
            </p>

            {/* The Coffee Shop Test Callout */}
            <div className="p-6 bg-editorial-pale border-l-4 border-brand-orange-warm rounded-r-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-orange-warm uppercase mb-1">
                <Quote className="w-4 h-4" />
                <span>The Coffee Shop Test Standard</span>
              </div>
              <p className="font-display text-base italic font-semibold text-neutral-900 leading-relaxed">
                "{COFFEE_SHOP_TEST_QUOTE}"
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/about"
                className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Read Full Biography &amp; Origin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-full border border-black/20 hover:border-black text-neutral-900 font-sans text-xs uppercase font-bold tracking-wider transition-colors inline-flex items-center gap-2"
              >
                <span>Book 1-on-1 with Thomax</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: FINAL HIGH-CONVERSION DIAGNOSTIC CTA */}
      {/* ========================================================================= */}
      <section className="px-6 md:px-12 pt-20 max-w-7xl mx-auto" id="contact">
        <div className="bg-[#121212] text-white p-8 md:p-16 rounded-3xl relative overflow-hidden text-left border border-neutral-800">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange-warm/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
            
            {/* Left pitch */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block">
                Direct Partnership Inquiry
              </span>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light italic text-white tracking-tight leading-tight">
                Ready to turn your knowledge into an incontestable pipeline?
              </h2>

              <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                Book a complimentary 15-Minute Content Diagnostic with Thomax. We will review your public distribution footprint, identify immediate pipeline leaks, and outline a tailored 90-day roadmap.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct diagnostic led personally by Thomax (Founder)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Guaranteed response SLA within 4 business hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero hard-sell tactics—pure structural diagnostic value</span>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-6 bg-white text-neutral-900 p-8 rounded-2xl shadow-2xl">
              {formSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold italic text-neutral-900">
                    Diagnostic Request Received!
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Thomax and the Velocity team are reviewing your brand footprint. Expect a calendar confirmation link in your inbox within 4 business hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-mono text-brand-orange-warm font-semibold hover:underline mt-2"
                  >
                    Submit another inquiry →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <h3 className="font-display text-xl font-bold italic text-neutral-900 mb-1">
                    Book 15-Min Diagnostic Call
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans mb-4">
                    Fill out the details below to schedule your audit session.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
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
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Company &amp; Website
                      </label>
                      <input
                        type="text"
                        value={leadForm.company}
                        onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                        placeholder="Acme Analytics (acme.com)"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                        Target Engagement
                      </label>
                      <select
                        value={leadForm.budget}
                        onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                      >
                        <option value="$3,500/mo retainer">The Velocity Engine ($3,500/mo)</option>
                        <option value="$2,500/mo retainer">The Authority Accelerator ($2,500/mo)</option>
                        <option value="$5,000 one-time">The Launch System ($5,000 one-time)</option>
                        <option value="$1,500 one-time">The Strategic Sprint ($1,500 one-time)</option>
                        <option value="Custom/Enterprise">Custom Enterprise Scope</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                      What is your biggest content or distribution bottleneck?
                    </label>
                    <textarea
                      rows={3}
                      value={leadForm.message}
                      onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                      placeholder="e.g. We have great technical case studies but no time to repurpose them across LinkedIn and newsletter channels..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                  >
                    <span>Request Diagnostic Schedule</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
