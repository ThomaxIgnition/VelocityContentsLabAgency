/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Share2, Sparkles, AlertTriangle } from 'lucide-react';
import { CHAPTERS, BRAND_COMPANY } from '../data.ts';

export default function ChapterPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const chapter = CHAPTERS.find((ch) => ch.slug === slug);

  if (!chapter || chapter.status === 'COMING') {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-editorial-cream flex items-center justify-center px-6">
        <div className="bg-editorial-pale border border-[#1A1A1A]/10 p-8 max-w-sm w-full text-center flex flex-col items-center gap-4">
          <AlertTriangle className="w-12 h-12 text-brand-orange-warm animate-pulse" />
          <h2 className="font-display italic text-lg font-semibold text-editorial-dark">Chapter Not Published</h2>
          <p className="text-xs text-slate-550 font-sans leading-relaxed">
            This analytical chapter is scheduled in the 90-day pipeline but does not exist in public records yet.
          </p>
          <button 
            onClick={() => navigate('/blog')}
            className="px-6 py-3.5 bg-[#1A1A1A] hover:bg-brand-orange-warm text-editorial-cream font-sans text-xs uppercase tracking-wider font-bold transition-all"
          >
            ← Back to Blog Directory
          </button>
        </div>
      </div>
    );
  }

  // Helper to render basic lines as high-end paragraphs, quotes and styled items manually
  const renderStyledContent = (content: string) => {
    const lines = content.split('\n');
    let insideUl = false;
    const listItems: string[] = [];

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        insideUl = true;
        listItems.push(trimmed.substring(2));
        return;
      }

      if (insideUl && !trimmed.startsWith('* ') && !trimmed.startsWith('- ')) {
        insideUl = false;
        elements.push(
          <ul key={`ul-${idx}`} className="space-y-2.5 my-6 list-disc pl-5 text-xs md:text-sm text-slate-650 leading-relaxed font-sans list-outside">
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        listItems.length = 0; // Clear array
      }

      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="font-display text-xl md:text-2xl font-light italic text-[#1A1A1A] mt-10 mb-4 leading-tight">
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="font-display text-sm md:text-base font-semibold text-[#1A1A1A] mt-8 mb-3 border-l-2 border-brand-orange-warm pl-3">
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ') || trimmed.startsWith('5. ') || trimmed.startsWith('6. ') || trimmed.startsWith('7. ')) {
        elements.push(
          <p key={idx} className="font-sans text-xs md:text-sm text-slate-650 leading-relaxed tracking-normal font-normal pl-4 border-l-2 border-[#1A1A1A]/10 my-4 py-1">
            <strong>{trimmed.charAt(0)}.</strong> {trimmed.substring(3)}
          </p>
        );
      } else if (trimmed.length > 0) {
        // Look for bold highlights or wrap normally
        elements.push(
          <p key={idx} className="font-sans text-xs md:text-sm text-[#3E3632] leading-relaxed tracking-normal mb-5 font-normal">
            {trimmed}
          </p>
        );
      }
    });

    // Cleanup open arrays
    if (insideUl && listItems.length > 0) {
      elements.push(
        <ul key="ul-end" className="space-y-2.5 my-6 list-disc pl-5 text-xs md:text-sm text-slate-650 leading-relaxed font-sans">
          {listItems.map((item, i) => (
            <li key={i} className="font-medium">{item}</li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-editorial-dark" id="chapter-reader-canvas">
      
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Navigation back */}
        <div className="mb-8 text-left">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:text-brand-orange-warm transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO DIRECTORY
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-[#FDFCFB] border border-[#1A1A1A]/10 p-6 md:p-12 shadow-md text-left relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange-warm" />
          
          {/* Hero Metadata */}
          <div className="flex flex-col gap-4 border-b border-[#1A1A1A]/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-black text-brand-orange-warm uppercase tracking-widest bg-[#1A1A1A]/5 px-2.5 py-0.5 border border-brand-orange-warm">
                Chapter 0{chapter.chapterNumber}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>5 Min Read</span>
              </div>
            </div>

            <h1 className="font-display text-2xl md:text-3.5xl font-light italic text-[#1A1A1A] tracking-tight mb-1 leading-snug">
              {chapter.title}
            </h1>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 bg-[#1A1A1A] text-editorial-cream font-display font-medium text-xs flex items-center justify-center">
                T
              </div>
              <div>
                <span className="block text-xs font-bold text-editorial-dark">Emmanuel Sunday Thomas</span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-mono">Lagos, Nigeria • June 2026</span>
              </div>
            </div>
          </div>

          {/* Core Body text */}
          <div className="prose prose-slate max-w-none">
            {chapter.content ? renderStyledContent(chapter.content) : (
              <p className="font-sans text-sm text-slate-500">No content loaded.</p>
            )}
          </div>

          {/* Book Call Intercept Footer */}
          <div className="mt-12 pt-8 border-t border-[#1A1A1A]/10 bg-editorial-pale -mx-6 md:-mx-12 px-6 md:px-12 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left flex items-start gap-3 max-w-lg">
              <div className="w-8 h-8 bg-brand-orange-warm/20 text-brand-orange-warm flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display italic text-xs font-semibold text-[#1A1A1A]">Bypass Geographic Barriers</h4>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                  Let us demonstrate our pre-call "Proof Stack" live. Grab a direct 1-1 session with Thomax.
                </p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="px-6 py-3.5 bg-brand-orange-warm hover:bg-[#8F4E34] text-white font-sans text-[10px] uppercase tracking-wider font-bold shrink-0 transition-colors"
            >
              Book 15-Min Audit Call
            </Link>
          </div>

        </article>

      </div>

    </div>
  );
}
