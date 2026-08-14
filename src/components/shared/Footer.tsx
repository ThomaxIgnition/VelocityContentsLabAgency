/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Mail, Clock, MapPin, ArrowUpRight, Bot, Sparkles } from 'lucide-react';
import { BRAND_COMPANY, BRAND_TAGLINE } from '../../data.ts';

export default function Footer() {
  const currentYear = 2026;

  const triggerCal = () => {
    const el = document.getElementById('floating-cal-button');
    if (el) el.click();
  };

  return (
    <footer className="w-full bg-[#121212] text-slate-300 border-t border-neutral-800 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange-warm/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-5 text-left">
          <div>
            <span className="font-display font-black text-xl text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-gradient-to-br from-brand-orange-warm to-amber-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                V
              </span>
              {BRAND_COMPANY}
            </span>
            <p className="text-xs text-brand-orange-warm font-mono tracking-widest uppercase mt-2 font-bold">
              {BRAND_TAGLINE}
            </p>
          </div>
          
          <p className="text-sm text-slate-400 font-sans leading-relaxed tracking-tight">
            Founder-led content strategy and multi-channel automation engineered in Lagos, Nigeria and serving high-growth brands globally across 5 continents.
          </p>
          
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-brand-orange-warm shrink-0" />
              <span>Lagos, Nigeria • Global Operations</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-brand-orange-warm shrink-0" />
              <a href="mailto:hello@velocitycontentlabs.com" className="hover:text-brand-orange-warm transition-colors font-mono">
                hello@velocitycontentlabs.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-brand-orange-warm shrink-0" />
              <span>Monday–Friday 9:00 AM – 5:00 PM WAT (UTC+1)</span>
            </div>
          </div>
        </div>

        {/* Navigation Column 1: Core Architecture */}
        <div className="md:col-span-3 flex flex-col gap-4 text-left">
          <h4 className="font-display text-white text-xs font-bold tracking-wider uppercase border-l-2 border-brand-orange-warm pl-2">
            Architecture
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li>
              <Link to="/services" className="hover:text-white transition-colors flex items-center gap-1 group">
                Strategic Services <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-white transition-colors flex items-center gap-1 group">
                Case Studies &amp; Proof <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/method" className="hover:text-white transition-colors flex items-center gap-1 group">
                The Velocity Method <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/insights" className="hover:text-white transition-colors flex items-center gap-1 group">
                10-Chapter Ebook &amp; Insights <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1 group">
                Origin Story &amp; Founder <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1 group text-brand-orange-warm font-semibold">
                Book 15-Min Diagnostic <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Cal AI & Frameworks */}
        <div className="md:col-span-2 flex flex-col gap-4 text-left">
          <h4 className="font-display text-white text-xs font-bold tracking-wider uppercase border-l-2 border-brand-orange-warm pl-2">
            AI &amp; Frameworks
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li>
              <button 
                onClick={triggerCal} 
                className="hover:text-brand-orange-warm transition-colors flex items-center gap-1.5 text-left text-xs text-emerald-400 font-mono"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Cal AI Care Specialist</span>
              </button>
            </li>
            <li>
              <Link to="/method#fortune" className="hover:text-white transition-colors">
                7-Touch Fortune Framework
              </Link>
            </li>
            <li>
              <Link to="/method#trust" className="hover:text-white transition-colors">
                Founder Trust Framework
              </Link>
            </li>
            <li>
              <Link to="/method#hybrid" className="hover:text-white transition-colors">
                65-Min Hybrid Engine
              </Link>
            </li>
            <li>
              <Link to="/about#lemonade" className="hover:text-white transition-colors">
                The Lemonade Stand Story
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Private Ops / Legal */}
        <div className="md:col-span-3 flex flex-col gap-4 text-left">
          <h4 className="font-display text-white text-xs font-bold tracking-wider uppercase border-l-2 border-brand-orange-warm pl-2">
            Operations &amp; Security
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Content operations and pipeline data are protected under strict enterprise confidentiality standards.
          </p>
          <div className="pt-2">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-orange-warm duration-150 block mb-1.5">
              Private Ops Portal
            </span>
            <Link 
              to="/admin/login" 
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-neutral-800 border border-neutral-700 font-mono text-[11px] text-slate-300 hover:bg-neutral-700 hover:text-white transition-colors"
              id="footer-admin-login"
            >
              <span>Operator Login</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 z-10 relative">
        <p className="font-mono text-center md:text-left">
          &copy; {currentYear} {BRAND_COMPANY}. All rights reserved. Engineered in Lagos, Nigeria for global impact.
        </p>
        <p className="font-display text-[10px] uppercase tracking-wider text-slate-400 font-bold">
          Where Strategy Meets Soul™
        </p>
      </div>
    </footer>
  );
}
