/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, BellRing, ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import { CHAPTERS } from '../data.ts';

export default function BlogPage() {
  const [subscribeModal, setSubscribeModal] = useState<string | null>(null);
  const [subEmail, setSubEmail] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    // Persist newsletter alerts to local storage database
    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push({
      id: `lead-notify-${Date.now()}`,
      name: 'Ebook Chapter Subscriber',
      email: subEmail,
      source: `Launch Alert Sub: Ch.${subscribeModal}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setSubSuccess(true);
    // Track count for dashboard
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-editorial-dark animate-fade-in" id="blog-directory-experience">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/5 mb-8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          The Agency Doctrine
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-light italic text-editorial-dark tracking-tight max-w-2xl leading-none">
          Where Strategy Meets Soul Ebook
        </h1>
        <p className="font-sans text-xs md:text-sm text-slate-500 max-w-xl leading-relaxed tracking-normal">
          Subtitled: <span className="text-[#1A1A1A] font-semibold italic">"The Velocity Method for Turning Content Into Customers"</span>. A master collection of lessons, warnings, and blueprints edited directly by Thomax.
        </p>
      </section>

      {/* Chapter timelines grid */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-8">
        <div className="relative border-l-2 border-[#1A1A1A]/10 pl-4 md:pl-8 space-y-12">
          {CHAPTERS.map((chapter) => {
            const isPublished = chapter.status === 'PUBLISHED';
            return (
              <div key={chapter.slug} className="relative group text-left">
                {/* Timeline Dot */}
                <div className={`absolute -left-[23px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full border-2 bg-white transition-colors duration-200 ${
                  isPublished 
                    ? 'border-brand-orange-warm bg-brand-orange-warm' 
                    : 'border-slate-300 bg-slate-200'
                }`} />

                <div className="bg-editorial-pale border border-[#1A1A1A]/10 p-6 md:p-8 hover:bg-[#F4F2EE] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Left Metadata & copy */}
                  <div className="flex flex-col gap-2 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-widest font-black text-brand-orange-warm uppercase">
                        Chapter 0{chapter.chapterNumber}
                      </span>
                      <span className={`text-[8px] font-mono uppercase font-black px-2 py-0.5 leading-none tracking-wider ${
                        isPublished 
                          ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-250' 
                          : 'bg-black/5 text-slate-500 border border-black/10'
                      }`}>
                        {chapter.status}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-semibold italic text-[#1A1A1A] leading-tight">
                      {chapter.title}
                    </h2>

                    <p className="font-sans text-xs text-slate-500 leading-relaxed font-normal">
                      {chapter.description}
                    </p>
                  </div>

                  {/* Action Right */}
                  <div className="shrink-0">
                    {isPublished ? (
                      <Link
                        to={`/blog/${chapter.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] hover:bg-brand-orange-warm text-editorial-cream font-sans text-xs uppercase tracking-wider font-bold transition-all"
                      >
                        Read Chapter <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setSubscribeModal(chapter.chapterNumber.toString());
                          setSubSuccess(false);
                          setSubEmail('');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#1A1A1A]/20 hover:border-brand-orange-warm text-slate-600 hover:text-brand-orange-warm bg-transparent font-sans text-xs uppercase tracking-wider font-bold transition-all"
                      >
                        Notify Me <BellRing className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Launch Alert Modal Container */}
      <AnimatePresence>
        {subscribeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubscribeModal(null)}
              className="absolute inset-0 bg-[#0A0A0A]/75 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="bg-editorial-pale border border-[#1A1A1A]/20 p-8 max-w-md w-full relative z-10 shadow-2xl"
            >
              <h3 className="font-display italic text-lg font-semibold text-editorial-dark mb-2">
                Subscribe to Alerts
              </h3>
              
              <p className="text-xs text-slate-500 font-sans leading-relaxed mb-6">
                Enter your professional business email to get a direct copy of Chapter <span className="font-bold text-brand-orange-warm bg-orange-50 px-1.5 py-0.5 border border-orange-200/50">{subscribeModal}</span> inside your inbox immediately upon launch.
              </p>

              {!subSuccess ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">Business Email</label>
                    <input 
                      type="email" 
                      placeholder="hello@company.com" 
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-[#1A1A1A] text-editorial-cream font-sans text-[11px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 hover:bg-brand-orange-warm"
                  >
                    Set Launch Notification <BellRing className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center flex flex-col items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                  </div>
                  <h4 className="font-display italic text-sm font-semibold text-[#1A1A1A]">Subscription Process Complete!</h4>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    Alert registered. We have earmarked <span className="text-[#1A1A1A] font-bold font-mono">{subEmail}</span> for instant dispatch upon Thomax's chapter publication. 
                  </p>
                  <button 
                    onClick={() => setSubscribeModal(null)}
                    className="mt-2 text-xs font-mono font-bold text-brand-orange-warm underline"
                  >
                    Back to Chapters
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
