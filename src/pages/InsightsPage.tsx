/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  BellRing, 
  Check, 
  X,
  Lock,
  Unlock
} from 'lucide-react';
import { CHAPTERS, RESOURCES, BRAND_COMPANY } from '../data.ts';

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<'ebook' | 'toolkits'>('ebook');
  
  // Toolkit download modal
  const [downloadModal, setDownloadModal] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Ebook release alert modal
  const [alertModalChapter, setAlertModalChapter] = useState<number | null>(null);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadName || !downloadEmail) return;

    const resource = RESOURCES.find(r => r.keyword === downloadModal);

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push({
      id: `lead-res-${Date.now()}`,
      name: downloadName,
      email: downloadEmail,
      source: `Resource Toolkit: ${downloadModal}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    // Update keyword stats
    const localStats = JSON.parse(localStorage.getItem('vcl_keyword_stats') || '[]');
    const targetIdx = localStats.findIndex((s: any) => s.keyword === downloadModal);
    if (targetIdx !== -1) {
      localStats[targetIdx].downloads += 1;
    } else {
      localStats.push({
        keyword: downloadModal,
        title: resource?.title || 'Unknown Guide',
        downloads: 1,
        completionRate: '92%',
        conversionRate: '14%'
      });
    }
    localStorage.setItem('vcl_keyword_stats', JSON.stringify(localStats));

    setDownloadSuccess(true);
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail) return;

    const savedLeads = JSON.parse(localStorage.getItem('vcl_leads') || '[]');
    savedLeads.push({
      id: `lead-notify-${Date.now()}`,
      name: 'Chapter Launch Subscriber',
      email: alertEmail,
      source: `Ebook Chapter 0${alertModalChapter} Alert`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('vcl_leads', JSON.stringify(savedLeads));

    setAlertSuccess(true);
    const currentCount = parseInt(localStorage.getItem('vcl_emails_captured') || '0', 10);
    localStorage.setItem('vcl_emails_captured', (currentCount + 1).toString());
  };

  return (
    <div className="legacy-page pt-28 pb-20 bg-editorial-cream min-h-screen text-[#1A1A1A]">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          Intellectual Infrastructure &amp; Doctrine
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[#1A1A1A] tracking-tight max-w-3xl leading-tight">
          Insights, Ebook &amp; Toolkits
        </h1>
        <p className="font-sans text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed">
          The complete master collection of agency lessons, BD outreach cadences, and content distribution frameworks authored by Thomax. Zero paywalls.
        </p>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2 mt-4 p-1.5 bg-editorial-pale border border-black/10 rounded-full">
          <button
            onClick={() => setActiveTab('ebook')}
            className={`px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'ebook' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>10-Chapter Ebook</span>
          </button>
          <button
            onClick={() => setActiveTab('toolkits')}
            className={`px-6 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'toolkits' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF Blueprints ({RESOURCES.length})</span>
          </button>
        </div>
      </section>

      {/* TAB 1: 10-CHAPTER EBOOK */}
      {activeTab === 'ebook' && (
        <section className="max-w-5xl mx-auto px-6 md:px-12 py-16">
          <div className="text-left mb-10 pb-6 border-b border-black/5">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm font-bold">
              Featured Doctrine
            </span>
            <h2 className="font-display text-3xl font-bold italic text-neutral-900 mt-1">
              "Where Strategy Meets Soul"
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-1">
              Subtitled: <span className="italic font-semibold text-neutral-800">The Velocity Method for Turning Content Into Customers</span>.
            </p>
          </div>

          <div className="relative border-l-2 border-black/10 pl-6 md:pl-10 space-y-10 text-left">
            {CHAPTERS.map((chapter) => {
              const isPublished = chapter.status === 'PUBLISHED';
              return (
                <div key={chapter.slug} className="relative group">
                  {/* Timeline bullet */}
                  <div
                    className={`absolute -left-[31px] md:-left-[47px] top-2 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                      isPublished
                        ? 'border-brand-orange-warm bg-brand-orange-warm shadow-sm'
                        : 'border-neutral-300 bg-neutral-200'
                    }`}
                  />

                  <div className="bg-white border border-black/10 p-6 md:p-8 rounded-2xl hover:border-brand-orange-warm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                    <div className="max-w-xl space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-brand-orange-warm uppercase tracking-wider">
                          CHAPTER 0{chapter.chapterNumber}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                          }`}
                        >
                          {chapter.status}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold italic text-neutral-900 leading-tight">
                        {chapter.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                        {chapter.description}
                      </p>
                    </div>

                    <div className="shrink-0">
                      {isPublished ? (
                        <Link
                          to={`/blog/${chapter.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
                        >
                          <span>Read Chapter</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            setAlertModalChapter(chapter.chapterNumber);
                            setAlertSuccess(false);
                            setAlertEmail('');
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/15 hover:border-brand-orange-warm text-neutral-700 hover:text-brand-orange-warm font-mono text-xs font-semibold transition-colors"
                        >
                          <BellRing className="w-3.5 h-3.5 text-brand-orange-warm" />
                          <span>Get Notified</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: DOWNLOAD TOOLKITS */}
      {activeTab === 'toolkits' && (
        <section className="max-w-6xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {RESOURCES.map((resource) => (
              <div
                key={resource.keyword}
                className="bg-white border border-black/10 p-7 rounded-3xl flex flex-col justify-between hover:border-brand-orange-warm shadow-sm transition-all relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono bg-brand-orange-warm/10 text-brand-orange-warm font-bold px-2.5 py-1 rounded uppercase">
                      DM KEYWORD: {resource.keyword}
                    </span>
                    <FileText className="w-4 h-4 text-neutral-400" />
                  </div>

                  <h3 className="font-display text-xl font-bold italic text-neutral-900 mb-2 leading-snug">
                    {resource.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-sans leading-relaxed mb-4">
                    {resource.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {resource.bulletDesc.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-neutral-700">
                        <Check className="w-3.5 h-3.5 text-brand-orange-warm shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <button
                    onClick={() => {
                      setDownloadModal(resource.keyword);
                      setDownloadSuccess(false);
                      setDownloadName('');
                      setDownloadEmail('');
                    }}
                    className="w-full py-3 rounded-full bg-editorial-pale hover:bg-brand-orange-warm hover:text-white text-neutral-900 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 border border-black/5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Blueprint</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Download Toolkit Modal */}
      <AnimatePresence>
        {downloadModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-left shadow-2xl relative border border-black/10"
            >
              <button
                onClick={() => setDownloadModal(null)}
                className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>

              {downloadSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold italic text-neutral-900">
                    Blueprint Dispatched!
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    We've emailed the <strong>{downloadModal}</strong> framework package to <strong>{downloadEmail}</strong>. Check your inbox in the next 60 seconds.
                  </p>
                  <button
                    onClick={() => setDownloadModal(null)}
                    className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white font-mono text-xs font-bold uppercase mt-2"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <span className="text-[10px] font-mono uppercase bg-brand-orange-warm/10 text-brand-orange-warm font-bold px-2.5 py-0.5 rounded">
                    KEYWORD UNLOCK: {downloadModal}
                  </span>
                  <h3 className="font-display text-2xl font-bold italic text-neutral-900">
                    Instant Blueprint Download
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    Enter your work details below to receive the complete PDF template, execution worksheet, and video breakdown.
                  </p>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={downloadName}
                      onChange={(e) => setDownloadName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={downloadEmail}
                      onChange={(e) => setDownloadEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Blueprint Now</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chapter Alert Modal */}
      <AnimatePresence>
        {alertModalChapter && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-left shadow-2xl relative border border-black/10"
            >
              <button
                onClick={() => setAlertModalChapter(null)}
                className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>

              {alertSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold italic text-neutral-900">
                    You're on the VIP Release List!
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    We will notify <strong>{alertEmail}</strong> the moment Chapter 0{alertModalChapter} goes live.
                  </p>
                  <button
                    onClick={() => setAlertModalChapter(null)}
                    className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white font-mono text-xs font-bold uppercase mt-2"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAlertSubmit} className="space-y-4">
                  <span className="text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700 font-bold px-2.5 py-0.5 rounded">
                    RELEASE NOTIFICATION • CHAPTER 0{alertModalChapter}
                  </span>
                  <h3 className="font-display text-2xl font-bold italic text-neutral-900">
                    Get Notified on Publish
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    Drop your email to receive early-access editorial notes from Thomax when this chapter is published.
                  </p>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-brand-orange-warm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <BellRing className="w-4 h-4 text-brand-orange-warm" />
                    <span>Set Release Alert</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
