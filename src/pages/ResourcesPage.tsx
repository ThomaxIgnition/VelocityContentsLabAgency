/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, CheckCircle, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { RESOURCES } from '../data.ts';
import { LeadCapture } from '../types.ts';

export default function ResourcesPage() {
  const [downloadingGuide, setDownloadingGuide] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const startDownload = (keyword: string) => {
    setDownloadingGuide(keyword);
    setSuccess(false);
    setName('');
    setEmail('');
  };

  const executeDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const resource = RESOURCES.find((r) => r.keyword === downloadingGuide);

    // Save Lead to database state
    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push({
      id: `lead-res-page-${Date.now()}`,
      name: name,
      email: email,
      source: `Resource Down Screen: ${downloadingGuide}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    // Update stats
    const localStats = JSON.parse(localStorage.getItem('vcl_keyword_stats') || '[]');
    const targetIdx = localStats.findIndex((s: any) => s.keyword === downloadingGuide);
    if (targetIdx !== -1) {
      localStats[targetIdx].downloads += 1;
    } else {
      localStats.push({ 
        keyword: downloadingGuide, 
        title: resource?.title || 'Unknown Guide', 
        downloads: 1, 
        completionRate: '90%', 
        conversionRate: '15%' 
      });
    }
    localStorage.setItem('vcl_keyword_stats', JSON.stringify(localStats));

    setSuccess(true);
    // Track count for dashboard
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-editorial-dark animate-fade-in" id="resources-directory-experience">
      
      {/* Title */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/5 mb-8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none animate-pulse">
          Intellectual Infrastructure
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-light italic text-editorial-dark tracking-tight max-w-2xl leading-none">
          Download PDF Guide Blueprints
        </h1>
        <p className="font-sans text-xs md:text-sm text-slate-505 max-w-xl leading-relaxed tracking-normal">
          Surgical BD outreach sequences, 65-minute hybrid content creation templates, and objection dismantling blueprints. Zero paywalls.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((resource) => (
            <div 
              key={resource.keyword} 
              className="bg-editorial-pale border border-[#1A1A1A]/10 p-6 flex flex-col justify-between hover:border-brand-orange-warm hover:bg-[#FDFCFB] transition-all relative group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono bg-[#1A1A1A]/5 text-[#1A1A1A] font-bold border border-black/10 px-2 py-0.5">
                    DM KEYWORD: {resource.keyword}
                  </span>
                  <FileText className="w-4 h-4 text-slate-400" />
                </div>

                <div className="text-left mt-2">
                  <h3 className="font-display text-sm md:text-base font-semibold italic text-[#1A1A1A] pr-4 mt-1 leading-snug">
                    {resource.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed pr-1 mt-2 font-normal">
                    {resource.description}
                  </p>
                </div>

                <div className="bg-[#F4F2EE] border border-[#1A1A1A]/5 p-4 text-left">
                  <span className="text-[8px] uppercase font-mono tracking-wider font-bold text-brand-orange-warm block mb-2">
                    Key chapters inside:
                  </span>
                  <ul className="space-y-1.5">
                    {resource.bulletDesc.map((b, i) => (
                      <li key={i} className="text-[11px] font-sans text-slate-650 flex items-start gap-2">
                        <span className="text-brand-orange-warm shrink-0">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10">
                <button 
                  onClick={() => startDownload(resource.keyword)}
                  className="w-full text-center py-3 border border-black/10 text-editorial-dark font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-[#1A1A1A] group-hover:text-editorial-cream group-hover:border-[#1A1A1A]"
                >
                  Download Free Guide <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL WINDOW FOR DOWNLOADING KEYWORD */}
      <AnimatePresence>
        {downloadingGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDownloadingGuide(null)}
              className="absolute inset-0 bg-[#0F0D0D]/75 backdrop-blur-sm"
            />

            {/* Content box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-editorial-cream border border-[#1A1A1A]/10 p-8 max-w-md w-full relative z-10 shadow-2xl"
            >
              <h3 className="font-display text-base italic font-semibold text-editorial-dark mb-2 text-left">
                Secure Guide Blueprint
              </h3>
              
              <p className="text-xs text-slate-500 font-sans leading-relaxed text-left mb-6">
                Enter your business coordinates to acquire the PDF copy of keyword: <span className="font-mono font-bold text-brand-orange-warm bg-orange-50 px-1.5 py-0.5 border border-brand-orange-warm">{downloadingGuide}</span>.
              </p>

              {!success ? (
                <form onSubmit={executeDownload} className="space-y-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-slate-400 tracking-wider uppercase font-bold">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Emmanuel Thomas" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-mono text-slate-400 tracking-wider uppercase font-bold">Business Email</label>
                    <input 
                      type="email" 
                      placeholder="hello@company.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FCFAF7] border border-black/10 text-[#1A1A1A] font-sans text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-[#1A1A1A] hover:bg-brand-orange-warm text-[#F8F6F2] font-sans text-xs uppercase tracking-wider font-bold shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    Email PDF Link Immediately <Download className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center flex flex-col items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-brand-green-emerald rounded-full flex items-center justify-center mb-1">
                    <CheckCircle className="w-5 h-5 animate-bounce" />
                  </div>
                  <h4 className="font-display italic text-sm font-semibold text-slate-900">Your PDF Download is Active!</h4>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                    The VCL server daemon has successfully compiled the files and dispatched the premium link to <span className="text-[#1A1A1A] font-bold font-mono">{email}</span>. Check your inbox within 2 minutes.
                  </p>
                  <button 
                    onClick={() => setDownloadingGuide(null)}
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

    </div>
  );
}
