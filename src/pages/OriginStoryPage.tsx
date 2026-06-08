/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Send, 
  MapPin, 
  Users,
  CheckCircle,
  FileText
} from 'lucide-react';
import BrandImage from '../components/shared/BrandImage.tsx';
import { ORIGIN_STORY_TEXT } from '../data.ts';

export default function OriginStoryPage() {
  const fixes = [
    {
      id: "01",
      title: "Leveraging Localized Groups",
      icon: <Users className="w-5 h-5 text-brand-orange-warm" />,
      action: "WhatsApp Neighborhood Broadcasting",
      desc: "We did not pitch randomly. We identified the exact digital pocket where all qualified local buyers gathered—the estate community WhatsApp network—and announced the presence of cold lemonade directly to them."
    },
    {
      id: "02",
      title: "Tactical High-Visibility Signage",
      icon: <MapPin className="w-5 h-5 text-brand-orange-warm" />,
      action: "Guaranteed Routing Interception",
      desc: "Instead of waiting inside our gated driveway, we mapped the neighborhood's active walking paths. Signboards were placed explicitly at pedestrian eye-level where hot joggers and residents were guaranteed to tread."
    },
    {
      id: "03",
      title: "Direct, Personal Invitations",
      icon: <Send className="w-5 h-5 text-brand-orange-warm" />,
      action: "High-Ticket Client Cultivation",
      desc: "We reached out directly to school peers and neighbors' parents with personalized invitations. In digital content, this is the equivalent of a tailored, high-converting outbound DM campaign that is impossible to ignore."
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-editorial-cream min-h-screen text-editorial-dark animate-fade-in" id="origin-story-view">
      
      {/* Editorial Header Block */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 border-b border-black/5 mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link 
            to="/" 
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-brand-orange-warm transition-colors"
            id="back-to-home-link"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" /> 
            Back to main site
          </Link>
          <span className="text-[10px] font-mono text-brand-orange-warm tracking-[0.25em] uppercase font-black">
            VCL GENESIS • JULY 2024
          </span>
        </div>
      </section>

      {/* Main Narrative Layout - Two Column Magazine Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Huge typography and imagery */}
          <div className="lg:col-span-5 flex flex-col gap-8 sticky lg:top-32">
            <span className="text-[10px] uppercase font-mono bg-brand-orange-warm/10 text-brand-orange-warm border border-brand-orange-warm/25 px-3.5 py-1.5 rounded-full font-black tracking-widest leading-none self-start">
              The Origin &amp; The Soul
            </span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light italic leading-[0.95] text-editorial-dark tracking-tight">
              The <br />
              <span className="font-semibold text-brand-orange-warm font-display decoration-1 underline underline-offset-8">Lemonade Stand</span>
            </h1>

            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed max-w-sm">
              The 7-year-old daughter of Thomax ran a lemonade stand in Lagos. Exceptional product, zero pipeline. The afternoon that re-engineered an entire agency's operational methodology.
            </p>

            {/* Premium Immersive Picture container */}
            <div className="relative mt-4">
              <div className="absolute inset-0 bg-brand-orange-warm/5 blur-3xl transform scale-110 pointer-events-none" />
              <BrandImage
                src="/photos/VCL_Daughter_Branded_Premium.png"
                alt="The daughter of Thomax with our premium VCL ribbon"
                stylingType="daughter"
                aspectRatio="3:4"
                className="w-full border border-black/5 shadow-2xl overflow-hidden relative z-10"
              />
              <span className="block text-[8px] font-mono text-slate-400 mt-2 text-left uppercase tracking-wider">
                Photo: The Daughter of Thomax. Age 7. The wisest advisor of Velocity Contents Lab.
              </span>
            </div>
          </div>

          {/* Right Column: Complete Unabridged Story Narrative (Documentary Realism Style) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Chronological Step 1 */}
            <article className="border-b border-black/5 pb-10">
              <span className="font-mono text-xs font-bold text-slate-300 block mb-2">CHAPTER I — THE CONFRONTATION</span>
              <p className="font-sans text-sm text-slate-600 leading-relaxed space-y-4">
                In July 2024, my seven-year-old daughter launched her very first business venture right in our Lagos estate: a lemonade stand. She insisted on a name with dramatic flair, calling it <span className="text-black font-semibold">"The Lemonade Stand"</span> to make absolutely sure neighbors would stop and look.
              </p>
              <p className="font-sans text-sm text-slate-600 leading-relaxed mt-4">
                She had spent hours squeezed in the kitchen with her mother, juicing organic lemons, fine-tuning the honey balance, and throwing in chilled mineral ice. It was, without hyperbole, the most refreshing, perfectly balanced lemonade I had ever tasted in my life.
              </p>
              <p className="font-sans text-sm text-slate-600 leading-relaxed mt-4">
                But after a long, sweltering hour under the Nigerian sun, she had sold exactly zero cups. No foot traffic reached her gated table.
              </p>
            </article>

            {/* Chronological Step 2 */}
            <article className="border-b border-black/5 pb-10">
              <span className="font-mono text-xs font-bold text-slate-300 block mb-2">CHAPTER II — THE DIAGNOSIS</span>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Dejected, she walked inside, put her head down on the dining table, and started weeping. 
              </p>
              <div className="p-6 bg-red-50/50 border-l-4 border-red-500 my-4 text-left">
                <span className="text-[9px] font-mono tracking-widest text-red-500 uppercase font-black block mb-1">Critical Faulty Analysis:</span>
                <p className="font-sans text-sm text-red-700 italic font-medium leading-relaxed">
                  "Daddy, our lemonade is not good enough. People do not like me. I need to squeeze better lemons."
                </p>
              </div>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Normally, as parents, we offer cheap comfort. But as a strategy practitioner, I realized the cosmic weights of her statement. This is the exact same tragedy high-ticket agency founders commit every single Q1. They build spectacular architecture, develop custom code, or write deep research whitepapers—then blame their "craftsmanship" when their revenue drops.
              </p>
              <p className="font-sans text-sm text-[#1A1A1A] font-semibold mt-4">
                Her craftsmanship was flawless. Her distribution strategy was entirely non-existent.
              </p>
            </article>

            {/* Chronological Step 3 (The Three fixes) */}
            <article className="border-b border-black/5 pb-10">
              <span className="font-mono text-xs font-bold text-slate-300 block mb-4">CHAPTER III — THE THREE STRATEGIC INTERVENTIONS</span>
              <p className="font-sans text-sm text-slate-600 leading-relaxed mb-6">
                Instead of squeezing more lemons, we paused and deployed three high-impact distribution channels to actively route eyes to her location:
              </p>

              <div className="space-y-6">
                {fixes.map((fix) => (
                  <div key={fix.id} className="bg-white border border-black/5 p-6 shadow-sm flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {fix.icon}
                        <h4 className="font-display italic font-semibold text-editorial-dark text-sm md:text-base">
                          {fix.title}
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">#{fix.id}</span>
                    </div>
                    <span className="text-[9px] font-mono text-brand-orange-warm tracking-wider uppercase font-bold">
                      Tactical Equivalent: {fix.action}
                    </span>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed mt-1">
                      {fix.desc}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* Chronological Step 4 */}
            <article className="pb-8">
              <span className="font-mono text-xs font-bold text-slate-300 block mb-2">CHAPTER IV — THE OUTCOME &amp; THE PRINCIPLE</span>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                The results of active distribution were instant. Inside twenty minutes, fifteen neighborhood customers arrived. She made $43 in cash, sold out completely, and walked back inside with a massive smile.
              </p>
              
              {/* Massive Callout block */}
              <div className="p-8 bg-editorial-pale border border-[#1A1A1A]/10 my-8">
                <span className="absolute -top-3 left-4 font-mono text-[9px] bg-brand-orange-warm text-white px-2 py-0.5 uppercase tracking-widest font-black">
                  The Axiom of Velocity
                </span>
                <p className="font-display text-base md:text-lg text-emerald-800 leading-relaxed font-semibold italic tracking-tight mb-4">
                  "Daddy, it doesn't matter how good it is if nobody knows where to find it."
                </p>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  Excellent creation completely dies in isolation. If you spend 90% of your energy building intelligence, and only 10% distributing it, your company remains invisible. We flipped that equation permanently inside VELOCITY CONTENTS LAB: 2 hours of expert creation. 10 channels of strategic, multi-platform native distribution.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-black/5">
                <h3 className="font-display italic text-[#1A1A1A] font-light text-xl mb-4">
                  Ready to fix your brand's distribution?
                </h3>
                <p className="font-sans text-xs text-slate-500 leading-relaxed mb-6">
                  Do not waste another month publishing deep thoughts for a silent void. Let us construct an automated content distribution engine that interceptions clients in their daily workflow.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange-warm hover:bg-[#8F4E34] text-[#F8F6F2] font-sans text-xs uppercase tracking-widest font-bold shadow-lg transition-all"
                >
                  Book your diagnostics session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

          </div>

        </div>
      </section>

    </div>
  );
}
