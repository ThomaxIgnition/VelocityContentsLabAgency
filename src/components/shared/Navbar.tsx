/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Bot, Sparkles } from 'lucide-react';
import { BRAND_COMPANY, BRAND_TAGLINE } from '../../data.ts';

interface NavbarProps {
  onOpenCal?: () => void;
}

export default function Navbar({ onOpenCal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isAdminRoute = currentPath.startsWith('/admin');

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Work & Proof', href: '/work' },
    { name: 'The Method', href: '/method' },
    { name: 'Insights & Ebook', href: '/insights' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  if (isAdminRoute) {
    return (
      <header className="sticky top-0 z-50 w-full bg-[#121212] border-b border-neutral-800 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-gradient-to-br from-brand-orange-warm to-amber-600 flex items-center justify-center font-black text-white text-sm">
              V
            </span>
            <span>VELOCITY <span className="text-brand-orange-warm">CONTENTS LAB</span></span>
          </Link>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-full border border-neutral-700">
            PRIVATE CONTENT OPS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs text-neutral-400 hover:text-white font-mono flex items-center gap-1 transition-colors">
            Return to Public Website <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-editorial-cream/95 backdrop-blur-md border-b border-[#1A1A1A]/8 px-4 md:px-8 py-4 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-11">
        
        {/* BRAND LOGO */}
        <Link 
          to="/" 
          className="group flex items-center gap-3"
          id="brand-logo"
          title="Velocity Contents Lab - Where Strategy Meets Soul"
        >
          <div className="w-9 h-9 border border-editorial-dark flex items-center justify-center text-editorial-dark font-display font-medium italic text-base group-hover:bg-editorial-dark group-hover:text-editorial-cream transition-all duration-200 shadow-sm">
            V
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-semibold italic text-xl text-editorial-dark tracking-tight leading-none group-hover:text-brand-orange-warm transition-colors">
              Velocity
            </span>
            <span className="font-sans text-[8px] uppercase font-bold tracking-[0.25em] text-brand-orange-warm mt-0.5">
              Contents Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive = currentPath === item.href || (item.href === '/insights' && currentPath.startsWith('/insights'));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-[11px] tracking-[0.18em] uppercase font-bold transition-colors py-1 relative ${
                  isActive
                    ? 'text-brand-orange-warm'
                    : 'text-[#1A1A1A]/75 hover:text-brand-orange-warm'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange-warm rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Cal AI quick trigger */}
          <button
            onClick={() => {
              if (onOpenCal) onOpenCal();
              window.dispatchEvent(new CustomEvent('velocity-open-cal'));
              const launcher = document.querySelector('.cal-launcher') as HTMLButtonElement | null;
              if (launcher) launcher.click();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-editorial-pale hover:bg-editorial-beige text-[#1A1A1A] font-mono text-[10px] font-semibold tracking-wider transition-colors border border-black/10"
            title="Chat with Cal, our AI representative"
          >
            <Bot className="w-3.5 h-3.5 text-brand-orange-warm" />
            <span>Ask Cal AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {/* Book Call Button */}
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-editorial-cream font-sans text-[11px] uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-sm"
            id="nav-book-call"
          >
            <span>Book Diagnostic</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-editorial-dark hover:text-brand-orange-warm focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden w-full bg-editorial-cream border-b border-black/10 mt-3 overflow-hidden"
          >
            <div className="flex flex-col gap-3 py-4 px-2">
              {navLinks.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs tracking-[0.15em] uppercase font-bold py-2 px-3 rounded transition-colors ${
                      isActive 
                        ? 'bg-editorial-pale text-brand-orange-warm font-black' 
                        : 'text-editorial-dark hover:text-brand-orange-warm'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="pt-3 border-t border-black/5 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent('velocity-open-cal'));
                    const launcher = document.querySelector('.cal-launcher') as HTMLButtonElement | null;
                    if (launcher) launcher.click();
                  }}
                  className="w-full py-2.5 rounded-full bg-editorial-pale text-editorial-dark font-mono text-xs font-bold flex items-center justify-center gap-2 border border-black/10"
                >
                  <Bot className="w-4 h-4 text-brand-orange-warm" />
                  <span>Talk with Cal AI Customer Care</span>
                </button>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-full bg-[#1A1A1A] hover:bg-brand-orange-warm text-white text-center text-xs uppercase font-bold tracking-wider block transition-colors"
                >
                  Book 15-Min Content Diagnostic
                </Link>

                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 rounded-full text-slate-500 font-mono text-[10px] text-center block bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  Private Content Ops Portal (Admin)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
