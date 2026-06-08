/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ORIGIN_STORY_TEXT } from '../../data.ts';
import BrandImage from './BrandImage.tsx';

export default function LemonadeStory() {
  return (
    <section 
      id="lemonade" 
      className="w-full bg-[#121212] text-white py-24 px-6 md:px-12 relative overflow-hidden border-y border-black/10"
    >
      {/* Background subtle overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-orange-warm/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Story Text Left */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-bold">
              Agency Genesis • July 2024
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-light italic tracking-tight text-white mb-2">
              The Lemonade Stand Story
            </h2>
          </div>

          <div className="space-y-4 font-sans text-sm text-slate-300 leading-relaxed tracking-normal max-w-xl">
            <p>
              My daughter started a lemonade stand. She made the best lemonade I have ever tasted. 
              But nobody came.
            </p>
            <p>
              After an hour, she was devastated. <span className="text-white font-semibold italic">"Daddy, my lemonade is not good enough."</span>
            </p>
            <p className="font-bold uppercase tracking-wider text-brand-orange-warm font-sans text-xs">
              Wrong diagnosis entirely.
            </p>
            <p>
              Her lemonade was exceptional. Her distribution was broken.
            </p>
            <p>
              We fixed three things: posted in the neighbourhood WhatsApp group, put signs where people actually walked, and she personally invited her friends' parents.
            </p>
            <p>
              Twenty minutes later — 15 customers. $43 earned. Sold out.
            </p>
          </div>

          {/* Daughter Quote Box */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 bg-[#1A1918] border border-white/5 relative mt-4 group"
            id="origin-story-quote"
          >
            {/* Quote Graphic */}
            <span className="absolute top-4 left-4 font-display text-6xl text-brand-orange-warm/15 select-none leading-none pointer-events-none font-black italic">
              "
            </span>
            
            <div className="relative pl-6">
              <p className="font-display text-lg md:text-xl text-brand-orange-warm leading-relaxed font-semibold italic tracking-tight mb-4">
                {ORIGIN_STORY_TEXT.quote}
              </p>
              <div className="border-t border-white/5 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <p className="text-[10px] text-slate-400 font-mono tracking-wider">
                  {ORIGIN_STORY_TEXT.attribution}
                </p>
                <span className="text-[8px] font-mono bg-brand-orange-warm/10 text-brand-orange-warm border border-brand-orange-warm/25 px-2 py-0.5 uppercase font-bold self-start sm:self-center">
                  Corporate Axiom
                </span>
              </div>
            </div>
          </motion.div>

          <p className="font-sans text-sm text-slate-300 leading-relaxed tracking-normal font-medium italic mt-2 max-w-xl">
            The entire content marketing problem solved in one sentence by a seven-year-old. That is the soul running inside VELOCITY CONTENTS LAB.
          </p>
          <div className="pt-2">
            <Link 
              to="/origin-story" 
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#E37E52] border-b border-[#E37E52]/30 hover:border-[#E37E52] pb-0.5 transition-all text-left"
              id="read-full-lemonade-story-link"
            >
              Read full unabridged story &#8594;
            </Link>
          </div>
        </div>

        {/* Daughter Photo Right */}
        <div className="lg:col-span-5 order-first lg:order-last">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-orange-warm/5 blur-2xl transform rotate-1 scale-105 pointer-events-none" />
            
            <BrandImage
              src="/photos/VCL_Daughter_Branded_Premium.png"
              alt="The Daughter of Thomax with a premium VCL branding ribbon"
              stylingType="daughter"
              aspectRatio="3:4"
              className="relative z-10 border border-white/10 shadow-2xl overflow-hidden"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
