/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

interface BrandImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9' | 'custom';
  stylingType?: 'photoA' | 'photoB' | 'photoC' | 'couple1' | 'couple2' | 'daughter' | 'goodfellas';
}

export default function BrandImage({
  src,
  alt,
  className = '',
  aspectRatio = '1:1',
  stylingType
}: BrandImageProps) {
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '1:1': 'aspect-square',
    '3:4': 'aspect-[3/4]',
    '4:3': 'aspect-[4/3]',
    '9:16': 'aspect-[9/16]',
    '16:9': 'aspect-[16/9]',
    'custom': ''
  }[aspectRatio];

  // Provide premium stylized vector layouts to back up missing photos and provide an undisputed, beautiful editorial presence
  const renderFallbackPlaceholder = () => {
    switch (stylingType) {
      case 'photoA':
        return (
          <div className="w-full h-full bg-slate-900 border border-slate-800 flex flex-col justify-end p-6 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
            
            {/* abstract geometry representing premium studio workspace */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-slate-700/35 opacity-40 animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-500/5 blur-3xl" />
            
            <div className="z-20 relative">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono bg-amber-500 text-amber-950 rounded mb-3 font-semibold">
                Thomax Solo • Cream Suit
              </span>
              <h4 className="font-display text-lg font-bold text-slate-100">Emmanuel Sunday Thomas</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Founder &amp; Chief Content Architect</p>
              <p className="text-xs text-amber-500/90 mt-2 italic font-sans border-l-2 border-amber-500/40 pl-2">
                "Where Strategy Meets Soul" — Lagos, Nigeria
              </p>
            </div>
          </div>
        );
      case 'photoB':
        return (
          <div className="w-full h-full bg-slate-950 border border-slate-800 flex flex-col justify-end p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
            
            {/* tech holographic graphics */}
            <div className="absolute inset-0 opacity-10 font-mono text-[9px] select-none p-4 leading-none tracking-tighter text-emerald-500 truncate whitespace-pre">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="mb-1">
                  010101 SYSTEM_ONLINE // VELOCITY_DISTRIBUTION // FRAME_TRUST_{i}
                </div>
              ))}
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-3xl" />
            
            <div className="z-20 relative">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono bg-emerald-500 text-emerald-950 rounded mb-3 font-semibold">
                AI Automation Hub
              </span>
              <h4 className="font-display text-lg font-bold text-slate-100">The Hybrid Content Engine</h4>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">65-Minute Master Workflow</p>
            </div>
          </div>
        );
      case 'photoC':
        return (
          <div className="w-full h-full bg-slate-900 border border-slate-800 flex flex-col justify-end p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-orange-600/10 blur-3xl" />
            
            <div className="z-20 relative">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono bg-orange-500 text-orange-950 rounded mb-3 font-semibold">
                Lagos &#8594; Global
              </span>
              <h4 className="font-display text-lg font-bold text-slate-100">Disruptive Strategy Center</h4>
              <p className="text-xs text-orange-400 font-mono mt-0.5">Cinematic Narrative Design</p>
            </div>
          </div>
        );
      case 'couple1':
        return (
          <div className="w-full h-full bg-gradient-to-br from-[#1A365D] to-[#1E2A3A] border border-slate-800 flex flex-col justify-end p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
            
            <div className="z-20 relative">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono bg-orange-500 text-slate-950 rounded mb-3 font-semibold">
                The Partnership Origin
              </span>
              <h4 className="font-display text-base font-bold text-slate-100">The Coffee Shop Test Standard</h4>
              <p className="text-xs text-slate-300 mt-1 font-sans italic">
                "Wife-approved clarity holds the key to client trust. No jargon allowed."
              </p>
            </div>
          </div>
        );
      case 'couple2':
        return (
          <div className="w-full h-full bg-slate-900 border border-slate-800 flex flex-col justify-end p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
            
            <div className="z-20 relative">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono bg-slate-950 text-amber-500 rounded mb-3 font-semibold">
                VCL Premium Moments
              </span>
              <h4 className="font-display text-lg font-bold text-slate-100">Symmetrical Creative Alignment</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Sartorial Studio Archive</p>
            </div>
          </div>
        );
      case 'daughter':
        return (
          <div className="w-full h-full bg-slate-950 border-2 border-orange-500/30 flex flex-col justify-end p-6 text-white relative overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
            <div className="absolute -right-4 -top-4 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl" />
            
            <div className="z-20 relative">
              <div className="font-display text-4xl text-orange-500/80 mb-3 block leading-none font-bold">"</div>
              <p className="font-display text-base italic text-slate-100 leading-relaxed font-semibold">
                It doesn't matter how good it is if nobody knows where to find it.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-sans text-xs font-bold text-orange-500">The Lemonade Stand</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Insight from Age 7</p>
                </div>
                <div className="text-[8px] font-mono uppercase bg-orange-950 text-orange-400 px-2 py-0.5 border border-orange-500/30 rounded">
                  GUARANTEE STATE
                </div>
              </div>
            </div>
            {/* Brand strip */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-amber-600" />
          </div>
        );
      case 'goodfellas':
        return (
          <div className="w-full h-full bg-slate-950 border border-slate-800 flex flex-col justify-end p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10" />
            
            <div className="z-20 relative">
              <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono bg-slate-800 text-slate-100 rounded mb-3 font-semibold">
                Lagos Accountability crew
              </span>
              <h4 className="font-display text-base font-bold text-slate-100 italic">"The Goodfellas"</h4>
              <p className="text-xs text-slate-400 mt-1 pb-1">
                Thomax with Donmark, Dortmund, Twinix, &amp; Classic Chinex in Lagos.
              </p>
              <p className="text-[10px] font-mono text-emerald-400">
                $120K Accountability Team Lesson
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs">
            {alt || 'Asset Visual Frame'}
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden group/image rounded-xl ${aspectClass} ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
          referrerPolicy="no-referrer"
        />
      ) : (
        renderFallbackPlaceholder()
      )}
    </div>
  );
}
