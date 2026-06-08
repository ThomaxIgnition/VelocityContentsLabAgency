/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
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
  Scale
} from 'lucide-react';
import { 
  SERVICES, 
  FRAMEWORKS, 
  RESOURCES, 
  CASE_STUDIES, 
  CHAPTERS, 
  ORIGIN_STORY_TEXT 
} from '../data.ts';
import BrandImage from '../components/shared/BrandImage.tsx';
import LemonadeStory from '../components/shared/LemonadeStory.tsx';
import { LeadCapture } from '../types.ts';

export default function HomePage() {
  const navigate = useNavigate();

  // Word cycling state for Hero
  const cycles = [
    '…that build authority.',
    '…that fill pipelines.',
    '…that close clients.'
  ];
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycles.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Expandable case studies
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(null);
  const [activeStoryModal, setActiveStoryModal] = useState<'daughter' | 'wife' | 'goodfellas' | null>(null);

  const toggleCaseStudy = (id: string) => {
    if (expandedCaseStudy === id) {
      setExpandedCaseStudy(null);
    } else {
      setExpandedCaseStudy(id);
    }
  };

  // Resources state
  const [downloadModal, setDownloadModal] = useState<string | null>(null);
  const [resourceEmail, setResourceEmail] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // General contact message state
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', budget: '$3,500/mo retainer', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleResourceDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceEmail || !resourceName) return;

    const selectedResource = RESOURCES.find(r => r.keyword === downloadModal);
    
    // Log lead capture
    const lead: LeadCapture = {
      id: `lead-res-${Date.now()}`,
      name: resourceName,
      email: resourceEmail,
      source: `Resource Download: ${selectedResource?.keyword || 'GENERAL'}`,
      timestamp: new Date().toISOString()
    };

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push(lead);
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    // Update keyword stats in store
    const localStats = JSON.parse(localStorage.getItem('vcl_keyword_stats') || '[]');
    const targetIdx = localStats.findIndex((s: any) => s.keyword === downloadModal);
    if (targetIdx !== -1) {
      localStats[targetIdx].downloads += 1;
    } else {
      localStats.push({ keyword: downloadModal, title: selectedResource?.title || 'Unknown', downloads: 1, completionRate: '90%', conversionRate: '15%' });
    }
    localStorage.setItem('vcl_keyword_stats', JSON.stringify(localStats));

    setDownloadSuccess(true);
    // Track count for dashboard
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    // Log lead capture
    const lead: LeadCapture = {
      id: `lead-con-${Date.now()}`,
      name: contactForm.name,
      email: contactForm.email,
      companySize: contactForm.company,
      budget: contactForm.budget,
      source: `Contact Screen Panel`,
      timestamp: new Date().toISOString(),
      message: contactForm.message
    };

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push(lead);
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setContactSuccess(true);
    // Track count for dashboard
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  const currentMonthName = "June 2026";

  const getFrameworkIcon = (iconName: string) => {
    switch (iconName) {
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'MailOpen': return <MailOpen className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="pt-16 pb-0 overflow-hidden bg-editorial-cream text-[#2A2421]" id="home-authority-hub">
      
      {/* SECTION 1: DYNAMIC cycled HERO WITH PHOTO B */}
      <section className="w-full relative px-6 md:px-12 py-24 md:py-32 bg-[#121212] text-white overflow-hidden border-b border-white/[0.05]">
        {/* Abstract cybernetic graphics */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-warm/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 animate-fade-in">
          
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange-warm/10 text-brand-orange-warm border border-brand-orange-warm/25 self-start">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange-warm" />
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] font-bold">The Intellectual Headquarters</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic tracking-tight leading-[1.05] text-white">
              Strategy <br />
              Meets <span className="text-brand-orange-warm italic">Soul</span>
            </h1>

            {/* Cycling Word Statement */}
            <div className="h-10 md:h-12 flex items-center">
              <span className="font-display text-xl md:text-2xl text-slate-300 font-light italic border-l-2 border-brand-orange-warm pl-4">
                {cycles[cycleIndex]}
              </span>
            </div>
            
            <p className="font-sans text-xs md:text-sm text-slate-400 font-normal max-w-xl leading-relaxed">
              We design, build, and distribute highly technical Content Systems that turn cold, raw expertise into absolute enterprise authority and qualified marketing revenue pipelines.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#services"
                className="px-8 py-4 bg-brand-orange-warm text-white font-sans text-[11px] uppercase tracking-widest font-bold text-center hover:bg-[#8F4E34] transition-colors"
              >
                Explore Full Services Breakdown
              </a>
              <a
                href="#resources"
                className="px-8 py-4 bg-[#1E1E1E] text-slate-300 border border-white/10 font-sans text-[11px] uppercase tracking-widest font-bold text-center hover:bg-slate-800 transition-colors"
              >
                Download PDF Frameworks ↓
              </a>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-brand-orange-warm/5 blur-3xl opacity-30 pointer-events-none" />
            <BrandImage
              src="/photos/1000335398.png"
              alt="Thomax Photo B reflecting holographic backdrop and professional black turtleneck"
              stylingType="photoB"
              aspectRatio="1:1"
              className="w-full max-w-sm border border-white/10 shadow-2xl relative z-10"
            />
          </div>

        </div>
      </section>

      {/* SECTION 2: SERVICES PARTNERSHIP BREAKDOWN */}
      <section id="services" className="w-full py-24 px-6 md:px-12 bg-editorial-cream border-b border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-bold">The Strategic Menu</span>
            <h2 className="font-display text-3xl md:text-4xl font-light italic text-editorial-dark tracking-tight">
              Strategic Services &amp; Architectures
            </h2>
            <p className="text-xs text-slate-500 font-sans tracking-normal leading-relaxed">
              Radically transparent retainers built to capture real revenue outcomes. No hidden line items.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service, idx) => (
              <div 
                key={service.id} 
                className="bg-editorial-pale border border-[#1A1A1A]/10 p-8 hover:bg-[#F4F2EE] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 border-b border-[#1A1A1A]/10 pb-5 mb-6">
                    <div>
                      <span className="inline-block text-[8px] font-mono tracking-wider uppercase bg-[#1A1A1A]/5 text-[#1A1A1A] border border-[#1A1A1A]/10 px-2 py-0.5 font-bold">
                        {service.id.includes('sprint') || service.id.includes('launch') ? 'Fixed Scope' : 'Ongoing Retainer'}
                      </span>
                      <h3 className="font-display italic font-semibold text-[#1A1A1A] text-lg mt-2 leading-tight">
                        {service.name}
                      </h3>
                    </div>
                    <span className="font-display text-xl md:text-2xl font-light italic text-brand-orange-warm bg-white px-4 py-2 border border-[#1A1A1A]/10 shrink-0">
                      {service.price}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-slate-600 leading-relaxed font-normal mb-6">
                    {service.description}
                  </p>

                  <h4 className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-3">What Is Included:</h4>
                  <ul className="space-y-2.5 mb-8">
                    {service.includes.map((incl, id) => (
                      <li key={id} className="flex items-start gap-3 text-xs text-slate-705 leading-normal">
                        <div className="w-4 h-4 rounded-full bg-brand-orange-warm/15 text-brand-orange-warm flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="font-normal font-sans text-slate-700">{incl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-400">Perfect For:</span>
                    <span className="block text-xs font-bold text-editorial-dark pr-1">{service.bestFor}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-400">Execution Schedule:</span>
                    <span className="block text-xs font-bold text-editorial-dark">{service.timeline}</span>
                  </div>
                  <div className="sm:col-span-2 mt-3">
                    <a 
                      href="#contact" 
                      className="w-full text-center block text-[10px] uppercase tracking-wider font-bold font-sans text-editorial-cream bg-editorial-dark hover:bg-brand-orange-warm py-4 transition-all"
                    >
                      Start Here — Setup Engagement
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: CASE STUDIES WITH EXPANDABLE PANEL */}
      <section id="results" className="w-full py-24 px-6 md:px-12 bg-slate-50/40 border-y border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-widest uppercase font-bold">The Proof Stack</span>
            <h2 className="font-display text-2xl md:text-3xl font-black text-brand-blue-deep tracking-tight">
              Case Studies &amp; Real Outcomes
            </h2>
            <p className="text-xs text-slate-500 font-sans tracking-tight">
              We do not track vague "engagement factors." We measure actual pipelines, converted leads, and business revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {CASE_STUDIES.map((study) => {
              const isOpen = expandedCaseStudy === study.id;
              return (
                <div 
                  key={study.id} 
                  className={`border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group bg-white ${
                    isOpen ? 'lg:col-span-5 border-brand-orange-warm shadow-md' : 'lg:col-span-1 border-slate-150 hover:border-slate-350 shadow-sm'
                  }`}
                >
                  {/* Highlight Ribbon */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange-warm via-orange-400 to-amber-500" />

                  <div className="flex flex-col gap-4">
                    <span className="text-[9px] font-mono uppercase text-brand-orange-warm font-bold block">{study.industry}</span>
                    <h3 className="font-display text-base font-black text-brand-blue-deep">
                      {study.client}
                    </h3>

                    {/* Compact Metrics */}
                    <div className="py-2.5 border-y border-slate-100 font-mono">
                      <span className="block text-[9px] uppercase text-slate-400 tracking-wider">Before &amp; After:</span>
                      <span className="block text-xs text-red-600 line-through mt-0.5">{study.metrics.before}</span>
                      <span className="block text-xs text-emerald-600 font-bold font-mono">{study.metrics.after}</span>
                    </div>

                    <p className={`text-xs text-slate-600 font-sans leading-relaxed ${isOpen ? 'm-0' : 'line-clamp-3'}`}>
                      {study.highlightMetric}
                    </p>

                    {/* EXPANDED CONTENT VIEW */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-slate-100 flex flex-col gap-4 text-left"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-600">
                            <div>
                              <h4 className="font-mono text-[10px] text-brand-orange-warm uppercase font-bold mb-1">The Challenge:</h4>
                              <p className="leading-relaxed font-normal">{study.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-mono text-[10px] text-brand-orange-warm uppercase font-bold mb-1">The Strategic Solution:</h4>
                              <p className="leading-relaxed font-normal">{study.solution}</p>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                            <h4 className="font-mono text-[10px] text-brand-blue-deep uppercase font-bold mb-1">Real Verified Growth Metrics:</h4>
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {study.client} {study.expandedDetails}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <button 
                      onClick={() => toggleCaseStudy(study.id)}
                      className="text-xs font-bold font-sans text-brand-blue-deep flex items-center gap-1 hover:text-brand-orange-warm transition-colors"
                    >
                      {isOpen ? (
                        <>Collapse Study <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>View Full Breakdown <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                    {!isOpen && <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-brand-orange-warm duration-150" />}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 5: PROPRIETARY FRAMEWORKS SECTION */}
      <section id="frameworks" className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-widest uppercase font-bold">The Intellectual Property</span>
            <h2 className="font-display text-2xl md:text-3xl font-black text-brand-blue-deep tracking-tight">
              Proprietary Frameworks™
            </h2>
            <p className="text-xs text-slate-500 font-sans tracking-tight">
              Our core blueprints. These systems have scaled operations globally, built entirely in-house.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {FRAMEWORKS.map((frame, idx) => (
              <div 
                key={frame.id} 
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm relative group"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-orange-warm group-hover:bg-brand-orange-warm group-hover:text-white transition-colors duration-200 border border-slate-100">
                    {getFrameworkIcon(frame.icon)}
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-black text-[#1E2A3A] group-hover:text-brand-orange-warm transition-colors pr-1 leading-normal">
                      {frame.name}
                    </h3>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
                      {frame.principle}
                    </p>
                  </div>

                  <p className="font-sans text-xs text-slate-500 leading-relaxed pr-1">
                    {frame.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div className="mb-4">
                    <span className="block text-[8px] uppercase font-mono tracking-wider text-slate-400">Key Outcome:</span>
                    <span className="block text-xs font-bold font-sans text-slate-800 leading-normal">{frame.result}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-orange-100 text-brand-orange-warm border border-orange-200 px-2 py-0.5 rounded font-black uppercase">
                      DM: {frame.keyword}
                    </span>
                    <a 
                      href="#resources" 
                      className="text-slate-300 group-hover:text-brand-orange-warm duration-150"
                      title="Request Toolkit Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: THE LEMONADE STAND STORY (FULL NARRATIVE EXPOSURE WITH OTHER PHOTOS) */}
      <section className="w-full py-24 px-6 md:px-12 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-warm/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-deep/15 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
          
          <div className="text-left max-w-xl flex flex-col gap-1">
            <span className="text-xs font-mono text-brand-orange-warm tracking-widest uppercase font-bold">The Origin &amp; The Soul</span>
            <h2 className="font-display text-xl md:text-3xl font-black text-white tracking-tight">
              The Lemonade Stand Engine (Full Version)
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              Dismantling the entire system, aligning partnership honesty, and accountability roots.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 font-sans text-xs text-slate-300 leading-relaxed max-w-xl">
              <h3 className="font-display text-lg text-white font-black border-l-2 border-brand-orange-warm pl-3">
                "Daddy, my lemonade is not good enough."
              </h3>
              <p>
                My seven-year-old daughter diagnosed her failed lemonade stand incorrectly. She felt her craftsmanship was flawed. 
                But her lemonade was exceptional. Her distribution channels were broken. 
                We posted in the WhatsApp groups, placed physical markers, and personally booked friend contacts. Twenty minutes later: sold out.
              </p>
              <p className="font-semibold text-brand-orange-warm leading-relaxed">
                She looked at me and said: "Daddy, it doesn't matter how good it is if nobody knows where to find it."
              </p>
              <p>
                This became the core foundation of VELOCITY CONTENTS LAB. We protect founders from wasting hours creating exceptional intelligence which nobody distributes. 2 hours of creation time. 10 platforms of native distribution. That is the mathematical standard.
              </p>
            </div>

            {/* Premium Daughter Picture Placement */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative z-10 bg-slate-900 aspect-[3/4]">
                <BrandImage
                  src="/photos/VCL_Daughter_Branded_Premium.png"
                  alt="Daughter Lemonade Branded Premium Image"
                  stylingType="daughter"
                  aspectRatio="3:4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* Sub narratives: The Wife Origin and Goodfellas Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-900">
            {/* Wife origin: Coffee shop standard */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5">
                <BrandImage
                  src="/photos/1000313924.png"
                  alt="Thomax and Wife outdoor on camel outfit"
                  stylingType="couple1"
                  aspectRatio="1:1"
                  className="w-full rounded-2xl border border-slate-800"
                />
              </div>
              <div className="sm:col-span-7 flex flex-col gap-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-orange-warm font-bold">The Wife Standard</span>
                <h4 className="font-display text-base font-bold text-slate-100">
                  The Coffee Shop Test
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  My wife read two hours of my best content strategies, put the phone down, and said: <span className="text-white">"If you cannot explain this over a coffee — why would a client trust you with their brand?"</span> This standard removed jargon entirely from our agency operations.
                </p>
              </div>
            </div>

            {/* The Goodfellas: $120k lesson */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5">
                <BrandImage
                  src="/photos/1000319397.jpg"
                  alt="Accountability group the Goodfellas Lagos"
                  stylingType="goodfellas"
                  aspectRatio="1:1"
                  className="w-full rounded-2xl border border-slate-800"
                />
              </div>
              <div className="sm:col-span-7 flex flex-col gap-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-orange-warm font-bold">Accountability Stack</span>
                <h4 className="font-display text-base font-bold text-slate-100">
                  The Goodfellas Story
                </h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  The Lagos accountability crew. Back in July 2024, I sat paralyzed after losing a $120K annual deal. This crew of five founders forced me to stop complaining and build the undisputable Founder Trust Framework™. Proof stacks are updated weekly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: FOUNDER DEEP DIVE IDENTITY PROFILE */}
      <section id="founder" className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute inset-0 bg-brand-orange-warm/5 rounded-full blur-2xl pointer-events-none" />
              <BrandImage
                src="/photos/1000335399.png"
                alt="Emmanuel Sunday Thomas cream suit in VCL office"
                stylingType="photoA"
                aspectRatio="3:4"
                className="w-full max-w-sm border border-slate-100 shadow-2xl rounded-2xl relative z-10"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div>
                <span className="text-[10px] font-mono text-brand-orange-warm tracking-widest uppercase font-bold">The Creative Director</span>
                <h2 className="font-display text-2xl md:text-3xl font-black text-brand-blue-deep tracking-tight mt-1">
                  Founder &amp; Head of Content Strategy
                </h2>
              </div>
              
              <h3 className="font-display text-lg font-black text-slate-900 flex items-center gap-2">
                Emmanuel Sunday Thomas (Thomax)
              </h3>

              <div className="font-mono text-[10px] px-2.5 py-1 bg-slate-100 text-slate-600 rounded border border-slate-200 uppercase font-bold self-start leading-none">
                Lagos, Nigeria &#8594; Global Scope
              </div>

              <div className="font-sans text-xs text-slate-600 space-y-4 leading-relaxed tracking-normal max-w-xl">
                <p>
                  As a hybrid founder with deep roots in developers architecture and storytelling psychology, my target has been simple: dismantle boring structural blockages that make expert companies sound robotic, generic, and predictable on public digital directories.
                </p>
                <p>
                  Lagos is one of the world's most creative, competitive sandbox environments. Managing operations from here gives us an unmatched energetic output threshold. We do not rest on past milestones; we verify client pipelines daily.
                </p>
              </div>

              {/* Three personal stories cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <Link 
                  to="/origin-story"
                  className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden text-left hover:border-brand-orange-warm hover:bg-[#FDFCFB] hover:shadow-md transition-all duration-300 group cursor-pointer focus:outline-none block"
                  id="trigger-daughter-story"
                >
                  <span className="font-mono text-[10px] text-brand-orange-warm font-bold block mb-1 group-hover:underline">Daughter Story</span>
                  <p className="text-[11px] font-sans text-slate-500 leading-normal mb-1">
                    The Lemonade Stand lesson showing distribution is 90% of outcomes.
                  </p>
                  <span className="text-[9px] font-mono text-slate-400 block tracking-tight group-hover:text-brand-orange-warm transition-colors">&#8594; Read full story</span>
                </Link>
                <button 
                  onClick={() => setActiveStoryModal('wife')}
                  className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left hover:border-brand-orange-warm hover:bg-[#FDFCFB] hover:shadow-md transition-all duration-300 group cursor-pointer focus:outline-none"
                  id="trigger-wife-story"
                >
                  <span className="font-mono text-[10px] text-brand-orange-warm font-bold block mb-1 group-hover:underline">Wife Story</span>
                  <p className="text-[11px] font-sans text-slate-500 leading-normal mb-1">
                    The Coffee Shop Test standard showing clarity removes complex jargon.
                  </p>
                  <span className="text-[9px] font-mono text-slate-400 block tracking-tight group-hover:text-brand-orange-warm transition-colors">&#8594; Click to read</span>
                </button>
                <button 
                  onClick={() => setActiveStoryModal('goodfellas')}
                  className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-left hover:border-brand-orange-warm hover:bg-[#FDFCFB] hover:shadow-md transition-all duration-300 group cursor-pointer focus:outline-none"
                  id="trigger-goodfellas-story"
                >
                  <span className="font-mono text-[10px] text-brand-orange-warm font-bold block mb-1 group-hover:underline">Goodfellas Story</span>
                  <p className="text-[11px] font-sans text-slate-500 leading-normal mb-1">
                    Lagos accountability crew lesson forcing verified visible trust.
                  </p>
                  <span className="text-[9px] font-mono text-slate-400 block tracking-tight group-hover:text-brand-orange-warm transition-colors">&#8594; Click to read</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: RESOURCE LIBRARY DIRECTORY AND BOOK CAPTURES */}
      <section id="resources" className="w-full py-24 px-6 md:px-12 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-widest uppercase font-bold">The Free Toolkit Library</span>
            <h2 className="font-display text-2xl md:text-3xl font-black text-brand-blue-deep tracking-tight">
              Resources Library &amp; PDF Guides
            </h2>
            <p className="text-xs text-slate-500 font-sans tracking-tight">
              Download our highly praised internal operating structures. All scripts, layouts, and tools are free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.map((resource) => (
              <div 
                key={resource.keyword} 
                className="bg-white border border-slate-150 rounded-2xl p-6.5 flex flex-col justify-between hover:border-brand-orange-warm transition-all group shadow-sm hover:shadow"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono bg-brand-blue-deep/5 text-brand-blue-deep border border-brand-blue-deep/15 px-2.5 py-0.5 rounded font-black">
                      DM KEYWORD: {resource.keyword}
                    </span>
                    <BookOpen className="w-4 h-4 text-slate-300 group-hover:text-brand-orange-warm transition-colors" />
                  </div>

                  <h3 className="font-display text-slate-900 text-sm font-black tracking-tight leading-normal mt-1 pr-4">
                    {resource.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-slate-550 leading-relaxed font-normal">
                    {resource.description}
                  </p>

                  <ul className="space-y-1.5 pt-2">
                    {resource.bulletDesc.map((bullet, id) => (
                      <li key={id} className="text-[11px] font-sans text-slate-500 flex items-start gap-2">
                        <span className="text-brand-orange-warm shrink-0 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      setDownloadModal(resource.keyword);
                      setDownloadSuccess(false);
                      setResourceEmail('');
                      setResourceName('');
                    }}
                    className="w-full text-center py-3 rounded-lg border border-slate-200 text-brand-blue-deep font-sans text-xs font-bold hover:bg-brand-orange-warm hover:text-white hover:border-brand-orange-warm transition-all flex items-center justify-center gap-2 group-hover:bg-brand-blue-deep group-hover:text-white group-hover:border-brand-blue-deep"
                  >
                    Download Free PDF <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: 10-CHAPTER EBOOK VISUAL JOURNEY */}
      <section id="blog" className="w-full py-24 px-6 md:px-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] font-mono text-brand-orange-warm tracking-widest uppercase font-bold">The Velocity Doctrine</span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-brand-blue-deep tracking-tight mt-1">
                The 10-Chapter Ebook Roadmap
              </h2>
            </div>
            <Link 
              to="/blog" 
              className="px-5 py-2.5 bg-brand-orange-warm text-white font-sans text-xs font-bold rounded-lg shrink-0 self-start hover:bg-orange-600 transition-colors shadow-sm"
            >
              Browse Complete Blog Directory &#8594;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CHAPTERS.map((chapter) => (
              <div 
                key={chapter.slug} 
                className="bg-slate-50 hover:bg-slate-50/50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between transition-all"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-brand-orange-warm">
                      CH.0{chapter.chapterNumber}
                    </span>
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase leading-none ${
                      chapter.status === 'PUBLISHED' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-slate-200 text-slate-500 border border-slate-250'
                    }`}>
                      {chapter.status}
                    </span>
                  </div>

                  <h3 className="font-display text-slate-900 text-xs font-bold leading-normal">
                    {chapter.title.split('—').pop()?.trim() || chapter.title}
                  </h3>
                  
                  <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-normal line-clamp-3">
                    {chapter.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  {chapter.status === 'PUBLISHED' ? (
                    <Link 
                      to={`/blog/${chapter.slug}`}
                      className="text-xs font-bold text-brand-blue-deep hover:text-brand-orange-warm transition-colors inline-flex items-center gap-1 font-sans"
                    >
                      Read Chapter <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono font-bold">
                      Coming Summer 2026
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: BOTTOM CONTACT AND CALENDLY SIMULATOR */}
      <section id="contact" className="w-full py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div>
              <span className="text-[10px] font-mono text-brand-orange-warm tracking-widest uppercase font-bold">Work with Us</span>
              <h2 className="font-display text-2xl md:text-3xl font-black text-brand-blue-deep tracking-tight mt-1">
                Let us build something your competitors will study.
              </h2>
            </div>
            
            <p className="text-xs text-slate-550 font-sans leading-relaxed tracking-tight max-w-sm">
              We do not pitch standard boilerplate scripts. We inspect your business reality first. Fill the grid, or use direct email setup.
            </p>

            <div className="space-y-3.5 pt-4">
              <div className="p-4 bg-white border border-slate-150 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-brand-orange-warm shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono font-bold">Direct Dispatch:</span>
                  <a href="mailto:hello@velocitycontentlabs.com" className="hover:text-brand-orange-warm text-xs font-bold font-mono text-brand-blue-deep transition-colors">
                    hello@velocitycontentlabs.com
                  </a>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-150 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-blue-deep/5 flex items-center justify-center text-brand-blue-deep shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono font-bold">Availability:</span>
                  <span className="block text-xs font-bold text-slate-800">
                    Responses inside 4 hours WAT (UTC+1)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-150 rounded-2xl p-6 md:p-8 shadow-sm">
              
              {!contactSuccess ? (
                <form onSubmit={handleContactSubmit} className="space-y-4 text-left" id="con-main-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Emmanuel Sunday" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Business Email</label>
                      <input 
                        type="email" 
                        placeholder="hello@firm.com" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Company Name</label>
                      <input 
                        type="text" 
                        placeholder="Pulse Digital" 
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Advisory Budget Range</label>
                      <select 
                        value={contactForm.budget}
                        onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm transition-colors"
                      >
                        <option value="$3,500/mo retainer">The Velocity Engine — $3,500/mo</option>
                        <option value="$2,500/mo retainer">The Authority Accelerator — $2,500/mo</option>
                        <option value="$5,000 one-time">The Launch System — $5,000 one-time</option>
                        <option value="$1,500 one-time">The Strategic Sprint — $1,500 one-time</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Your Objectives &amp; Platforms</label>
                    <textarea 
                      placeholder="My team is creating pristine technical briefs, but we lack native multi-platform distribution..." 
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm transition-colors font-sans"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 rounded-xl bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs font-bold shadow-lg shadow-orange-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    Submit Booking Request
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-brand-green-emerald rounded-full flex items-center justify-center mb-2">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#1E2A3A]">Your Booking Package Is Saved!</h3>
                  <p className="text-xs text-slate-500 font-sans max-w-sm leading-relaxed">
                    Thomax will review your company's digital presence (Lagos team will draft diagnostic data maps beforehand) and email a Calendly scheduler to <span className="text-[#1E2A3A] font-bold font-mono">{contactForm.email}</span> within 4 business hours.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* DOWNLOAD INTERCEPT MODAL DIALOG */}
      <AnimatePresence>
        {downloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDownloadModal(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white border border-slate-150 rounded-2xl p-6.5 md:p-8 max-w-md w-full relative z-10 shadow-xl"
            >
              <h3 className="font-display text-base font-black text-brand-blue-deep mb-2">
                Download Free Blueprint
              </h3>
              
              <p className="text-xs text-slate-550 font-sans leading-relaxed mb-6">
                Enter your professional business email to capture the full PDF file for keyword: <span className="font-mono font-bold text-brand-orange-warm bg-orange-50 px-1.5 py-0.5 border border-orange-200/50 rounded">{downloadModal}</span>.
              </p>

              {!downloadSuccess ? (
                <form onSubmit={handleResourceDownload} className="space-y-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Emmanuel Thomas" 
                      required
                      value={resourceName}
                      onChange={(e) => setResourceName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-black">Business Email</label>
                    <input 
                      type="email" 
                      placeholder="hello@company.com" 
                      required
                      value={resourceEmail}
                      onChange={(e) => setResourceEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-150 text-slate-800 font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4.5 bg-brand-orange-warm text-white font-sans text-xs font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Authorize Decent &amp; Email Copy <Download className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center flex flex-col items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-brand-green-emerald rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 animate-bounce" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-[#1E2A3A]">Download Process Complete!</h4>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    Your PDF resource is compiled. The VCL dispatcher has injected the PDF download link directly to <span className="text-[#1E2A3A] font-bold font-mono">{resourceEmail}</span>. The 5-stage strategic nurture has begun.
                  </p>
                  <button 
                    onClick={() => setDownloadModal(null)}
                    className="mt-2 text-xs font-mono font-bold text-brand-orange-warm underline"
                  >
                    Back to Library
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PERSONAL STORY DETAIL MODAL */}
      <AnimatePresence>
        {activeStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStoryModal(null)}
              className="absolute inset-0 bg-[#0F0D0D]/75 backdrop-blur-sm"
              id="story-modal-backdrop"
            />

            {/* Content Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white border border-[#1A1A1A]/10 p-6 md:p-8 max-w-lg w-full relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto"
              id="story-modal-dialog"
            >
              {activeStoryModal === 'daughter' && (
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
                    The Origin Story • July 2024
                  </span>
                  <h3 className="font-display italic text-2xl font-semibold text-[#1A1A1A] leading-tight">
                    The Lemonade Stand
                  </h3>
                  
                  {/* Quote element style */}
                  <div className="p-5 bg-orange-50/50 border-l-4 border-brand-orange-warm pl-4 my-2">
                    <p className="font-display italic text-sm text-brand-orange-warm font-semibold leading-relaxed">
                      "Daddy, it doesn't matter how good it is if nobody knows where to find it."
                    </p>
                    <span className="text-[9px] font-mono text-slate-400 mt-2 block uppercase tracking-wider font-bold">
                      — The daughter of Thomax. Age 7.
                    </span>
                  </div>

                  <div className="font-sans text-xs text-slate-600 space-y-3 leading-relaxed">
                    <p>
                      My daughter started a lemonade stand. She made the best lemonade I have ever tasted in Lagos. But nobody came.
                    </p>
                    <p>
                      After an hour, she was devastated. <span className="italic">"Daddy, my lemonade is not good enough."</span>
                    </p>
                    <p className="font-mono text-[10px] text-brand-orange-warm uppercase tracking-wider font-bold">
                      Wrong diagnosis entirely.
                    </p>
                    <p>
                      Her lemonade was exceptional. Her distribution was broken.
                    </p>
                    <p>
                      We fixed three things: posted inside the neighborhood WhatsApp group, put up clear signboards where people actually walked, and she personally invited her friends' parents.
                    </p>
                    <p>
                      Twenty minutes later — 15 customers. $43 earned. Sold out.
                    </p>
                    <p className="font-semibold text-[#1A1A1A]">
                      From a 7-year-old: she solved the entire digital content distribution problem in one single elegant sentence. That is the soul and the infrastructure running inside VELOCITY CONTENTS LAB.
                    </p>
                  </div>
                </div>
              )}

              {activeStoryModal === 'wife' && (
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
                    The Operational Filter
                  </span>
                  <h3 className="font-display italic text-2xl font-semibold text-[#1A1A1A] leading-tight">
                    The Coffee Shop Test
                  </h3>
                  
                  <div className="p-5 bg-orange-50/50 border-l-4 border-brand-orange-warm pl-4 my-2">
                    <p className="font-display italic text-sm text-brand-orange-warm font-semibold leading-relaxed">
                      "If you cannot explain this over a coffee — why would a client trust you with their brand?"
                    </p>
                    <span className="text-[9px] font-mono text-slate-400 mt-2 block uppercase tracking-wider font-bold">
                      — The Wife Standard Standardizer
                    </span>
                  </div>

                  <div className="font-sans text-xs text-slate-600 space-y-3 leading-relaxed">
                    <p>
                      My wife read two full hours of my most complex, highly technical content strategy architectures. She put the phone down, sighed, and said: <span className="italic">"If you cannot explain this to someone over a coffee — why would a client trust you with their brand?"</span>
                    </p>
                    <p>
                      This standard immediately removed useless administrative jargon and complexity from our entire agency's framework. Every strategy must be simple enough to outline elegantly on a paper napkin.
                    </p>
                  </div>
                </div>
              )}

              {activeStoryModal === 'goodfellas' && (
                <div className="flex flex-col gap-4 text-left">
                  <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
                    The Accountability Stack
                  </span>
                  <h3 className="font-display italic text-2xl font-semibold text-[#1A1A1A] leading-tight">
                    The Goodfellas Story
                  </h3>
                  
                  <div className="p-5 bg-orange-50/50 border-l-4 border-brand-orange-warm pl-4 my-2">
                    <p className="font-display italic text-sm text-brand-orange-warm font-semibold leading-relaxed">
                      "Abstractions die. Proof lives. Stop complaining and build the undisputable framework."
                    </p>
                    <span className="text-[9px] font-mono text-slate-400 mt-2 block uppercase tracking-wider font-bold">
                      — Lagos Accountability Crew
                    </span>
                  </div>

                  <div className="font-sans text-xs text-slate-600 space-y-3 leading-relaxed">
                    <p>
                      Back in July 2024, I sat completely paralyzed after losing a major $120,000 annual contract. I complained about geographic bias and skepticism due to serving global clients from Lagos, Nigeria.
                    </p>
                    <p>
                      My crew of five fellow high-ticket founders meeting weekly—known affectionately as the Goodfellas—did not offer cheap words of comfort. Instead, they demanded absolute, undeniable transparency.
                    </p>
                    <p>
                      This forced us to build the **Founder Trust Framework™**, updating and proof-stacking client revenue results and metric proofs on a weekly schedule. If our authority is bulletproof, geographic skepticism disappears.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-[#1A1A1A]/10 flex justify-end">
                <button 
                  onClick={() => setActiveStoryModal(null)}
                  className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-brand-orange-warm text-[#F8F6F2] font-sans text-xs uppercase tracking-wider font-bold transition-all cursor-pointer focus:outline-none"
                  id="close-story-modal-btn"
                >
                  Close Story
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
