/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { BRAND_COMPANY } from '../../data.ts';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const isHomeRoute = path === '/home';
  const isAdminRoute = path.startsWith('/admin');

  // Specific logo toggle destination
  const logoDestination = isHomeRoute ? '/' : '/home';
  const logoSub = isHomeRoute ? 'Authority Hub' : 'Conversion Funnel';

  const menuItems = isHomeRoute
    ? [
        { name: 'Services', href: '/home#services' },
        { name: 'Frameworks', href: '/home#frameworks' },
        { name: 'Case Studies', href: '/home#results' },
        { name: 'Resources', href: '/home#resources' },
        { name: 'Ebook / Blog', href: '/blog' },
        { name: 'Founder Profile', href: '/home#founder' },
        { name: 'Contact', href: '/contact' }
      ]
    : [
        { name: 'The Content Trap', href: '/#problem' },
        { name: 'Daughter\'s Story', href: '/origin-story' },
        { name: 'The Velocity Method', href: '/#method' },
        { name: 'Case Studies', href: '/#results' },
        { name: 'Our Work', href: '/#services' },
        { name: 'Contact Us', href: '/contact' }
      ];

  const toggleMenu = () => setIsOpen(!isOpen);

  if (isAdminRoute) {
    return (
      <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display font-black text-xl tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-black text-slate-950 text-sm">V</span>
            <span>VELOCITY<span className="text-orange-500 font-bold">S</span></span>
          </Link>
          <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700">
            INTERNAL OPS ENGINE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/home" className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1">
            Back to Public Hub <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-editorial-cream/95 backdrop-blur-md border-b border-[#1A1A1A]/5 px-4 md:px-8 py-5 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-10">
        
        {/* LOGO WRAPPER: Routes to /home if on Landing, and / if on Home */}
        <Link 
          to={logoDestination} 
          className="group relative flex flex-col justify-center"
          title={`Click to switch to ${isHomeRoute ? 'Landing Page' : 'Authority Hub'}`}
          id="brand-logo"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 border border-editorial-dark flex items-center justify-center text-editorial-dark font-display font-medium italic text-sm group-hover:bg-editorial-dark group-hover:text-editorial-cream transition-colors duration-200">
              V
            </div>
            <span className="font-display font-semibold italic text-xl text-editorial-dark tracking-tight text-left flex items-center gap-1.5 leading-none">
              Velocity <span className="font-sans text-[9px] uppercase font-bold tracking-[0.2em] text-brand-orange-warm not-italic block mt-0.5">Content Lab</span>
            </span>
          </div>
          <span className="hidden md:inline-block absolute -bottom-5.5 left-10 text-[8px] uppercase tracking-[0.2em] font-mono text-brand-orange-warm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Switch to {isHomeRoute ? 'Landing Page' : 'Authority Hub'} &#8594;
          </span>
          <span className="md:hidden text-[7px] uppercase tracking-wider font-mono text-slate-400 font-medium">
            {logoSub} • Click to toggle
          </span>
        </Link>

        {/* Desktop Nav Actions */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, idx) => {
            const isAnchor = item.href.includes('#');
            if (isAnchor) {
              const [route, anchor] = item.href.split('#');
              const isCurrentRoute = path === route || (route === '/' && path === '/');
              return (
                <a
                  key={idx}
                  href={isCurrentRoute ? `#${anchor}` : item.href}
                  className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1A1A1A]/70 hover:text-brand-orange-warm transition-colors"
                >
                  {item.name}
                </a>
              );
            }
            return (
              <Link
                key={idx}
                to={item.href}
                className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#1A1A1A]/70 hover:text-brand-orange-warm transition-colors"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Trigger */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full border border-editorial-dark hover:bg-editorial-dark hover:text-editorial-cream text-editorial-dark font-sans text-[10px] uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5"
            id="nav-cta"
          >
            Book a Call <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-editorial-dark hover:text-brand-orange-warm focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden w-full bg-editorial-cream border-b border-black/5 mt-4 overflow-hidden"
          >
            <div className="flex flex-col gap-4 py-4 px-2">
              {menuItems.map((item, idx) => {
                const isAnchor = item.href.includes('#');
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] tracking-[0.15em] uppercase font-bold text-editorial-dark hover:text-brand-orange-warm transition-colors py-1 block"
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-black/5 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-full border border-editorial-dark hover:bg-editorial-dark hover:text-editorial-cream text-editorial-dark text-center text-[10px] uppercase font-bold tracking-wider block"
                >
                  Book a Strategy Call
                </Link>
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 rounded-full text-slate-500 font-mono text-[9px] text-center block bg-slate-50 border border-slate-200"
                >
                  Admin Portal Login (Private Ops)
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
