/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const footerElementHeight = 450; // Approximated footer height

      // Show after scrolling 500px, hide near bottom where footer is in view
      const isPastHero = scrollY > 500;
      const isCloseToBottom = docHeight - scrollY - clientHeight < footerElementHeight;

      if (isPastHero && !isCloseToBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.3, type: 'spring', damping: 15 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-brand-orange-warm hover:bg-orange-600 text-white font-sans text-xs font-bold shadow-lg shadow-orange-500/20 tracking-tight transition-transform duration-200 active:scale-95 group border border-orange-400"
            id="sticky-book-call"
          >
            <span>Book a Strategy Call</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
