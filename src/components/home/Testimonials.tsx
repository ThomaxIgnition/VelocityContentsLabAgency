import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../../content.ts';

/** Rotating client testimonials. Pauses while hovered or focused; arrows and dots for manual control. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 9000);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (d: number) => setIndex((i) => (i + d + count) % count);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="grid lg:grid-cols-12 gap-10 lg:gap-16"
    >
      <div className="lg:col-span-4 flex lg:flex-col justify-between gap-6">
        <div className="hidden lg:block">
          <span className="font-display italic font-light text-[9rem] leading-[0.7] text-ember select-none" aria-hidden="true">
            “
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full border border-paper/20 flex items-center justify-center text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full border border-paper/20 flex items-center justify-center text-paper hover:bg-paper hover:text-ink transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="ml-3 font-mono text-xs text-paper/50" aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="lg:col-span-8 min-h-[420px] sm:min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <blockquote className="font-display font-light text-paper text-[1.3rem] sm:text-[1.6rem] lg:text-[1.8rem] leading-[1.4] tracking-[-0.01em]">
              {t.quote}
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-ember text-coal flex items-center justify-center font-display text-lg">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-paper font-medium">{t.name}</span>
                <span className="block text-sm text-paper/55">{t.project}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-10 flex gap-2" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              role="tab"
              aria-selected={i === index}
              aria-label={item.name}
              onClick={() => setIndex(i)}
              className="relative h-11 flex items-center"
            >
              <span className={`block h-[3px] rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-ember' : 'w-6 bg-paper/20 hover:bg-paper/40'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
