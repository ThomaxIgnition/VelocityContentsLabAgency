/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Quote, 
  MapPin, 
  Globe, 
  ArrowUpRight, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  Coffee,
  Users
} from 'lucide-react';
import { 
  BRAND_COMPANY, 
  BRAND_TAGLINE, 
  FOUNDER_NAME, 
  ORIGIN_STORY_TEXT, 
  COFFEE_SHOP_TEST_QUOTE 
} from '../data.ts';
import BrandImage from '../components/shared/BrandImage.tsx';
import LemonadeStory from '../components/shared/LemonadeStory.tsx';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-editorial-cream min-h-screen text-[#1A1A1A]">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 text-center flex flex-col items-center gap-4 border-b border-black/8">
        <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black leading-none">
          Origin, Identity &amp; Philosophy
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light italic text-[#1A1A1A] tracking-tight max-w-3xl leading-tight">
          Where Strategy Meets Soul
        </h1>
        <p className="font-sans text-sm md:text-base text-neutral-600 max-w-2xl leading-relaxed">
          The story of an African agency built in Lagos, Nigeria, powered by deep human truth, uncompromising distribution discipline, and global ambition.
        </p>
      </section>

      {/* Origin Story: The Lemonade Stand */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16" id="lemonade">
        <LemonadeStory />
      </section>

      {/* Founder Profile & Sartorial Identity */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-black/8" id="founder">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-5 space-y-4">
            <BrandImage
              src="/photos/1000335399.png"
              alt="Thomax - Emmanuel Sunday Thomas"
              aspectRatio="3:4"
              stylingType="photoA"
              className="w-full shadow-xl rounded-2xl"
            />
            <div className="p-4 bg-white rounded-xl border border-black/10 text-center">
              <h4 className="font-display text-base font-bold italic text-neutral-900">
                {FOUNDER_NAME}
              </h4>
              <p className="text-xs font-mono text-brand-orange-warm mt-0.5">
                Founder &amp; Chief Content Architect
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase font-mono text-brand-orange-warm tracking-[0.25em] font-black block">
              The Founder's Journey
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-light italic text-neutral-900 leading-tight">
              "We don't sell marketing. We build incontestable digital trust."
            </h2>

            <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Operating out of Lagos, Nigeria, Thomax has advised global software founders, high-ticket consultants, VC firms, and enterprise executives across 5 continents.
            </p>

            <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Having experienced firsthand how international deals were often lost not to superior technology, but to superior distribution, he formulated the proprietary <strong>Velocity Method</strong> to eliminate the gap between what you know and who knows you.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-black/10">
                <span className="text-[10px] font-mono text-brand-orange-warm uppercase font-bold block mb-1">
                  Location
                </span>
                <span className="text-xs font-bold text-neutral-900 font-sans">
                  Lagos, Nigeria (WAT / UTC+1)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/10">
                <span className="text-[10px] font-mono text-brand-orange-warm uppercase font-bold block mb-1">
                  Global Footprint
                </span>
                <span className="text-xs font-bold text-neutral-900 font-sans">
                  US, UK, Europe, Africa, Asia
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The Core Standards: Coffee Shop Test & Accountability */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t border-black/8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Coffee Shop Test */}
          <div className="p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-brand-orange-warm">
              <Coffee className="w-5 h-5" />
            </div>

            <h3 className="font-display text-2xl font-bold italic text-neutral-900">
              The Coffee Shop Test Standard
            </h3>

            <p className="font-display text-base italic text-brand-orange-warm leading-relaxed">
              "{COFFEE_SHOP_TEST_QUOTE}"
            </p>

            <p className="font-sans text-xs text-neutral-600 leading-relaxed">
              We apply this filter to every single article, newsletter, and social post we write. If an idea relies on corporate jargon, buzzwords, or convoluted phrasing to sound intelligent, we throw it out and rewrite it until it's crystal-clear.
            </p>
          </div>

          {/* Lagos to Global Mission */}
          <div className="p-8 rounded-3xl bg-[#121212] text-white border border-neutral-800 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>

            <h3 className="font-display text-2xl font-bold italic text-white">
              Lagos → Global Execution
            </h3>

            <p className="font-sans text-xs text-neutral-300 leading-relaxed">
              Lagos is one of the most creatively dynamic, resilient, and fast-moving cities on earth. We channel that raw energy, intellectual rigor, and relentless hustle into building world-class content systems for international category leaders.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cross-continental sync across US, UK &amp; European time zones</span>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 pt-10">
        <div className="bg-[#121212] text-white p-8 md:p-12 rounded-3xl text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl font-light italic text-white">
            Let's build your category authority together.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-sans leading-relaxed">
            Schedule a 15-minute diagnostic session with Thomax.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs uppercase font-bold tracking-wider transition-colors shadow-lg"
            >
              <span>Schedule Strategy Diagnostic</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
