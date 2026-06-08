/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  HelpCircle, 
  ChevronRight, 
  Layers, 
  Share2, 
  MessageSquare, 
  Radio, 
  DollarSign, 
  BarChart2, 
  CheckCircle,
  Inbox
} from 'lucide-react';
import { SERVICES, AGENCY_METRICS } from '../data.ts';
import BrandImage from '../components/shared/BrandImage.tsx';
import LemonadeStory from '../components/shared/LemonadeStory.tsx';
import { LeadCapture } from '../types.ts';

export default function LandingPage() {
  const navigate = useNavigate();
  
  // Local leads management representing offline persistence logic
  const [leadForm, setLeadForm] = useState({ name: '', email: '', companySize: '1-10' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;

    // Simulate saving lead capturing to local state
    const newLead: LeadCapture = {
      id: `lead-${Date.now()}`,
      name: leadForm.name,
      email: leadForm.email,
      companySize: leadForm.companySize,
      source: 'Landing Page Bottom CTA Campaign',
      timestamp: new Date().toISOString()
    };

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push(newLead);
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setFormSubmitted(true);
    // Track count for dashboard
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  const problemCards = [
    {
      id: 1,
      title: "Posting consistently but pipeline stays empty",
      stat: "92% of posts produce zero business pipeline.",
      consequence: "Your busy creative team spends hours writing for algorithmic likes rather than your enterprise bottom line."
    },
    {
      id: 2,
      title: "Spending on ads but visibility is broken",
      stat: "Ad CPC inflation reaches historic highs.",
      consequence: "High budgets buy accidental clicks and machine bots, while your real high-intent buyers ignore your banners entirely."
    },
    {
      id: 3,
      title: "Great content that nobody distributes",
      stat: "Only 8% of original insights survive past day one.",
      consequence: "Your elite executive intelligence remains buried in ignored PDFs and archived slide-decks, rendering your authority invisible."
    }
  ];

  const methodologyPhases = [
    {
      phase: "01",
      title: "Deep Listening",
      icon: <Radio className="w-5 h-5 text-brand-orange-warm" />,
      desc: "We dive straight into your current sales logs, support folders, and chat histories to isolate the exact, non-generic pain points your clients face."
    },
    {
      phase: "02",
      title: "Strategic Creation",
      icon: <Layers className="w-5 h-5 text-brand-orange-warm" />,
      desc: "Thomax and our team construct core comprehensive authority assets in your real voice, ensuring there is zero generic AI robotic jargon."
    },
    {
      phase: "03",
      title: "Velocity Distribution",
      icon: <Share2 className="w-5 h-5 text-brand-orange-warm" />,
      desc: "Our proprietary engine fragments 1 master asset into customized updates styled natively for 10 distinct social platforms in one sweep."
    },
    {
      phase: "04",
      title: "Human Engagement",
      icon: <MessageSquare className="w-5 h-5 text-brand-orange-warm" />,
      desc: "We drive friendly conversations under your high-value releases, converting passing social impressions into real booked discovery meetings."
    }
  ];

  return (
    <div className="pt-[80px] pb-0 bg-editorial-cream text-editorial-dark font-sans" id="landing-experience">
      
      {/* SECTION 1: HERO CONTAINER */}
      <section className="w-full relative px-6 md:px-12 py-16 md:py-24 bg-editorial-cream border-b border-black/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex gap-10 items-stretch relative z-10">
          
          {/* Side Editorial Metadata Track - matching Design aside class */}
          <aside className="hidden md:flex w-10 flex-col justify-between items-center py-2 border-r border-[#1A1A1A]/8 mr-4 shrink-0">
            <div className="rotate-180 [writing-mode:vertical-lr] text-[9px] tracking-[0.3em] uppercase opacity-40 font-mono font-bold">
              Volume VII — Lagos to Global
            </div>
            <div className="w-1.5 h-1.5 bg-brand-orange-warm rounded-full"></div>
          </aside>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex items-center gap-2 text-[#1A1A1A]/50 text-[10px] uppercase font-mono tracking-[0.25em] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-warm" />
                <span>Lagos &#8594; Global Presence</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-editorial-dark tracking-tight leading-[0.95] mb-2">
                Where Strategy<br />
                Meets <span className="font-display italic font-semibold text-brand-orange-warm underline decoration-1 underline-offset-8">Soul</span>.
              </h1>
              
              <p className="font-sans text-base md:text-lg text-slate-600 font-medium max-w-xl leading-relaxed">
                Lagos &#8594; Global content strategy that turns client knowledge into authority, and authority into pipeline. No generic robot jargon.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-brand-orange-warm hover:bg-[#8F4E34] text-white font-sans text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shrink-0"
                  id="hero-primary-cta"
                >
                  Book a Strategy Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#services"
                  className="py-4 text-[#1A1A1A] hover:text-brand-orange-warm font-sans text-[11px] uppercase tracking-widest font-bold underline underline-offset-8 decoration-1 transition-all text-center sm:text-left"
                >
                  See Our Services &#8594;
                </a>
              </div>

              {/* Quick credentials metric overview */}
              <div className="pt-8 border-t border-black/5 grid grid-cols-3 gap-6">
                <div>
                  <span className="block font-display text-2xl md:text-3xl font-light italic text-[#1A1A1A]">$2.3M</span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold mt-1 font-mono">Client Rev Gen</span>
                </div>
                <div>
                  <span className="block font-display text-2xl md:text-3xl font-light italic text-[#1A1A1A]">847K+</span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold mt-1 font-mono">Impressions</span>
                </div>
                <div>
                  <span className="block font-display text-2xl md:text-3xl font-light italic text-[#1A1A1A]">23:1</span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold mt-1 font-mono">Average ROI</span>
                </div>
              </div>
            </div>

            {/* Hero Brand Picture (Thomax Photo C - cinematic explosion style representation) */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="absolute inset-0 bg-brand-orange-warm/5 blur-3xl transform scale-110 rotate-3 pointer-events-none" />
              <BrandImage
                src="/photos/1000335381.png"
                alt="Thomax Solo C visual representing cinematic world class creative explosion"
                stylingType="photoC"
                aspectRatio="1:1"
                className="w-full max-w-sm border border-black/5 shadow-2xl relative z-10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM SECTION (The Content Trap) */}
      <section id="problem" className="w-full py-24 px-6 md:px-12 bg-editorial-cream border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-bold">The Strategic Reality Check</span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-editorial-dark tracking-tight">
              The Content Trap
            </h2>
            <p className="text-xs text-slate-500 font-sans tracking-normal leading-relaxed">
              Why traditional agency outputs keep your pipeline empty despite beautiful publish reports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-editorial-pale border border-[#1A1A1A]/10 hover:bg-[#F4F2EE] p-8 flex flex-col justify-between transition-all duration-300 relative group"
              >
                {/* Visual Accent */}
                <span className="absolute top-6 right-6 text-xs font-mono font-bold text-slate-300 group-hover:text-brand-orange-warm transition-colors select-none">
                  #0{card.id}
                </span>

                <div className="flex flex-col gap-4">
                  <div className="text-brand-orange-warm text-[10px] font-mono tracking-widest uppercase font-bold">
                    Anomaly Case
                  </div>
                  <h3 className="font-display font-semibold italic text-lg text-editorial-dark pr-6 leading-snug">
                    {card.title}
                  </h3>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100/85">
                  <p className="font-mono text-xs font-black text-brand-orange-warm mb-1">
                    {card.stat}
                  </p>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed font-normal">
                    {card.consequence}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: LEMONADE STAND ORIGIN (Reused custom component) */}
      <LemonadeStory />

      {/* SECTION 4: THE SOLUTION OVERVIEW (The Velocity Method - Animated Horizontal Flow) */}
      <section id="method" className="w-full py-24 px-6 md:px-12 bg-editorial-cream border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-bold">Our Operating System</span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-editorial-dark tracking-tight">
              The Velocity Method™
            </h2>
            <p className="text-xs text-slate-500 font-sans tracking-normal leading-relaxed">
              A 4-phase structured flow designed to yield undisputed expertise down your entire conversion pipeline.
            </p>
          </div>

          {/* Flow cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {methodologyPhases.map((phase, idx) => (
              <div 
                key={phase.phase} 
                className="bg-editorial-pale border border-[#1A1A1A]/10 p-8 relative flex flex-col gap-4 group hover:bg-[#F4F2EE] transition-all"
              >
                <div className="flex items-center justify-between">
                  {phase.icon}
                  <span className="font-display text-2xl font-light italic text-slate-300 group-hover:text-brand-orange-warm transition-colors">
                    {phase.phase}
                  </span>
                </div>
                
                <h3 className="font-display text-base font-semibold text-editorial-dark">
                  {phase.title}
                </h3>
                
                <p className="font-sans text-xs text-slate-500 leading-relaxed font-normal">
                  {phase.desc}
                </p>

                {/* Connecting arrow for desktop layout */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-slate-200">
                    <ChevronRight className="w-7 h-7" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: ACCOUNTABILITY METRICS STRIP */}
      <section id="results" className="w-full bg-[#121212] py-20 px-6 md:px-12 text-white overflow-hidden relative border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange-warm/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 relative z-10 text-center">
          {AGENCY_METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col gap-2 group">
              <span className="font-display text-3xl md:text-4xl font-light italic text-brand-orange-warm block transform transition-transform duration-200 group-hover:scale-105">
                {metric.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-slate-300 block">
                {metric.label}
              </span>
              <span className="text-[10px] text-slate-400 font-sans block leading-snug font-normal">
                {metric.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: SERVICES PREVIEW */}
      <section id="services" className="w-full py-24 px-6 md:px-12 bg-editorial-cream border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-xl text-left">
              <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-bold">Transparent Strategic Sizing</span>
              <h2 className="font-display text-3xl md:text-4xl font-light italic text-editorial-dark tracking-tight">
                Our Retainers &amp; Engagements
              </h2>
            </div>
            <Link 
              to="/home" 
              className="font-mono text-[10px] tracking-widest uppercase font-bold text-brand-orange-warm hover:underline flex items-center gap-1 shrink-0 self-start mt-2"
            >
              Learn more inside Authority Hub &#8594;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="bg-editorial-pale border border-[#1A1A1A]/10 p-8 flex flex-col justify-between hover:bg-[#F4F2EE] transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="inline-block text-[8px] font-mono tracking-wider uppercase bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A]/10 px-2 py-0.5 mr-2 mb-3 font-bold">
                      {service.id.includes('sprint') || service.id.includes('launch') ? 'Fixed Scope' : 'Ongoing Retainer'}
                    </span>
                    <h3 className="font-display italic font-semibold text-[#1A1A1A] text-base mt-1 pr-2 leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  
                  <div className="py-2">
                    <span className="text-2xl font-display font-light italic text-brand-orange-warm">{service.price}</span>
                  </div>

                  <p className="font-sans text-xs text-slate-500 leading-relaxed pr-1 font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10">
                  <p className="text-[9px] font-sans text-slate-400 font-bold mb-1 uppercase tracking-wider">Best Audience:</p>
                  <p className="text-xs text-slate-700 font-medium font-sans mb-5 leading-normal">
                    {service.bestFor}
                  </p>
                  <button 
                    onClick={() => navigate('/home#services')}
                    className="w-full text-center text-[10px] uppercase tracking-wider font-bold font-sans text-editorial-dark border border-editorial-dark hover:bg-editorial-dark hover:text-editorial-cream py-3 transition-all"
                  >
                    Explore Service Details
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: FOUNDER PREVIEW */}
      <section className="w-full py-24 px-6 md:px-12 bg-editorial-cream border-b border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-brand-orange-warm/5 blur-3xl transform rotate-1 scale-105 pointer-events-none" />
            <BrandImage
              src="/photos/1000335399.png"
              alt="Emmanuel Sunday Thomas in premium cream suit with VCL signage"
              stylingType="photoA"
              aspectRatio="1:1"
              className="w-full max-w-sm border border-[#1A1A1A]/10 shadow-2xl relative z-10"
            />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-bold">Human Behind the Machine</span>
              <h2 className="font-display text-3xl md:text-4xl font-light italic text-editorial-dark tracking-tight mt-1">
                The Founder of Velocity
              </h2>
            </div>
            
            <h3 className="text-base font-sans font-bold text-editorial-dark">
              Emmanuel Sunday Thomas (Thomax)
            </h3>

            <div className="font-sans text-xs text-slate-600 space-y-4 leading-relaxed tracking-normal max-w-xl">
              <p>
                My entire career has been balanced across a technical axis and a storytelling axis. As a developer, I understand architecture, automations, and operational speed. As a copywriter, I understand emotional triggers, character limits, and visual rhythm.
              </p>
              <p>
                When you collaborate with Velocity Contents Lab, you are not engaging some disconnected junior template script-writers. You are securing a structured, battle-tested system run directly by practitioners who have managed millions of impressions and attrited real pipelines.
              </p>
            </div>

            <div className="pt-2">
              <Link 
                to="/home#founder" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-editorial-dark text-editorial-cream font-sans text-[10px] uppercase tracking-widest font-bold hover:bg-brand-orange-warm transition-all"
              >
                Read Full Biography &amp; Lagos Stories
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: PRIMARY CONVERSION FORM */}
      <section className="w-full py-24 px-6 md:px-12 bg-brand-orange-warm text-white relative overflow-hidden border-b border-black/15" id="cta-funnel-panel">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center gap-8">
          
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-orange-100 font-bold">
              Let Us Build Your Engine
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-white tracking-tight leading-tight">
              Ready to turn your content into clients?
            </h2>
            <p className="text-xs text-orange-50/90 font-sans leading-relaxed tracking-normal">
              Secure a highly responsive 15-minute diagnostic slot today. Let us dismantle your current social presence and highlight where you are losing prospects.
            </p>
          </div>

          {!formSubmitted ? (
            <form 
              onSubmit={handleLeadSubmit} 
              className="w-full bg-[#121212]/95 border border-white/5 p-8 md:p-10 text-left grid grid-cols-1 md:grid-cols-12 gap-6 shadow-2xl relative"
              id="landing-lead-form"
            >
              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="text-[9px] font-mono text-slate-300 uppercase tracking-wider font-bold">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Emmanuel Thomas" 
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[#1A1918] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm font-medium transition-colors"
                />
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="text-[9px] font-mono text-slate-300 uppercase tracking-wider font-bold">Business Email</label>
                <input 
                  type="email" 
                  placeholder="hello@company.com" 
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-[#1A1918] border border-white/10 text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm font-medium transition-colors"
                />
              </div>

              <div className="md:col-span-4 flex flex-col gap-2">
                <label className="text-[9px] font-mono text-slate-300 uppercase tracking-wider font-bold">Company Size</label>
                <select 
                  value={leadForm.companySize}
                  onChange={(e) => setLeadForm({ ...leadForm, companySize: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1918] border border-white/10 text-slate-200 font-sans text-xs focus:outline-none focus:border-brand-orange-warm font-medium transition-colors"
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>

              <div className="md:col-span-12 pt-2">
                <button 
                  type="submit" 
                  className="w-full py-4 bg-brand-orange-warm text-white font-sans text-[11px] uppercase tracking-widest font-bold shadow-lg shadow-orange-500/10 hover:bg-[#8F4E34] transition-colors flex items-center justify-center gap-2"
                >
                  Book My Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-[#121212] border border-white/10 p-10 flex flex-col items-center justify-center gap-4 text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-[#5F7A68]/20 text-[#5F7A68] flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display italic text-lg text-slate-100">Your Diagnostic Request Is Filed!</h3>
              <p className="text-xs text-slate-400 font-sans max-w-sm leading-relaxed">
                Thomax's calendar dispatch has captured your slot. We will reach back using <span className="text-white font-medium font-mono">{leadForm.email}</span> within 4 hours. No delays.
              </p>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-orange-100 font-mono text-[9px] uppercase tracking-[0.15em] font-semibold opacity-85">
            <span>✓ No spam ever</span>
            <span>✓ Responses inside 4 hours WAT</span>
            <span>✓ Direct expert audit focus</span>
          </div>

        </div>
      </section>

    </div>
  );
}
