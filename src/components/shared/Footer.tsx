/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Mail, Clock, MapPin, ArrowUpRight } from 'lucide-react';
import { BRAND_COMPANY, BRAND_TAGLINE } from '../../data.ts';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-brand-navy-dark text-slate-300 border-t border-slate-800 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange-warm/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue-deep/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div>
            <span className="font-display font-black text-xl text-white tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-brand-orange-warm flex items-center justify-center text-slate-950 font-black text-xs">V</span>
              {BRAND_COMPANY}
            </span>
            <p className="text-xs text-brand-orange-warm font-mono tracking-widest uppercase mt-2 font-bold">
              {BRAND_TAGLINE}
            </p>
          </div>
          <p className="text-sm text-slate-400 font-sans leading-relaxed tracking-tight max-w-sm">
            Lagos, Nigeria &#8594; Global content strategy and automated pipelines turning raw expertise into organic authority and client pipelines.
          </p>
          
          <div className="flex flex-col gap-2.5 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-brand-orange-warm shrink-0" />
              <span>Lagos, Nigeria — Serving clients globally across 5 continents</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-brand-orange-warm shrink-0" />
              <a href="mailto:hello@velocitycontentlabs.com" className="hover:text-brand-orange-warm transition-colors font-mono">
                hello@velocitycontentlabs.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-brand-orange-warm shrink-0" />
              <span>Monday–Friday 9:00 AM – 5:00 PM WAT | Responses within 4 hours</span>
            </div>
          </div>
        </div>

        {/* Links Column 1: Core Navigation */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="font-display text-white text-xs font-bold tracking-wider uppercase border-l-2 border-brand-orange-warm pl-2">
            Authority Hub
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li>
              <Link to="/home#services" className="hover:text-white transition-colors flex items-center gap-1 group">
                Strategic Services <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/home#frameworks" className="hover:text-white transition-colors flex items-center gap-1 group">
                Proprietary Frameworks <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/home#results" className="hover:text-white transition-colors flex items-center gap-1 group">
                Accountability Proofs <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors flex items-center gap-1 group animate-pulse text-brand-orange-warm">
                10-Chapter Ebook <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-white transition-colors flex items-center gap-1 group text-slate-300 font-semibold font-mono">
                Free Download Toolkit <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Legal/Private ops */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-display text-white text-xs font-bold tracking-wider uppercase border-l-2 border-brand-orange-warm pl-2">
            Identity &amp; Ops
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
            <li>
              <Link to="/home#founder" className="hover:text-white transition-colors">
                Founder Biography: Emmanuel Sunday Thomas
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Book 15-Min Strategy call
              </Link>
            </li>
            <li className="pt-4 mt-4 border-t border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-orange-warm duration-150 block mb-1">
                Internal Dashboard
              </span>
              <Link 
                to="/admin/login" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                id="footer-admin-login"
              >
                Access Content Engine
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-850 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 z-10 relative">
        <p className="font-mono text-center md:text-left">
          &copy; {currentYear} {BRAND_COMPANY}. All rights reserved. Serviced from Lagos, Nigeria.
        </p>
        <p className="font-display text-[10px] uppercase tracking-wider text-slate-400 font-bold border-t md:border-t-0 pt-2 md:pt-0">
          Where Strategy Meets Soul
        </p>
      </div>
    </footer>
  );
}
