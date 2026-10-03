import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, MessageCircle, Moon, Sun } from 'lucide-react';
import { COMPANY } from '../../content.ts';
import { openCal } from '../ui.tsx';
import { useTheme } from '../../lib/theme.ts';

const NAV_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'How We Work', href: '/method' },
  { name: 'About', href: '/about' },
  { name: 'Insights', href: '/insights' }
];

// Pages that open on a dark hero, where the bar starts transparent with light text.
const DARK_HERO_ROUTES = ['/', '/services', '/work', '/method', '/about', '/contact'];

export function Logo({ light = false, tagline = true }: { light?: boolean; tagline?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 64 64" className="w-9 h-9 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="14" className={light ? 'fill-paper' : 'fill-ink'} />
        <path d="M17 18h7.5L32 39.5 39.5 18H47L35.6 47h-7.2z" className={light ? 'fill-ink' : 'fill-paper'} />
        <circle cx="47" cy="47" r="4" className="fill-ember" />
      </svg>
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className={`font-display text-[19px] tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>Velocity</span>
        <span className={`font-mono text-[9px] uppercase tracking-[0.28em] mt-1 ${light ? 'text-paper/60' : 'text-muted'}`}>
          Contents Lab
        </span>
        {tagline && (
          <span className={`font-display italic text-[11px] tracking-normal mt-1 ${light ? 'text-ember' : 'text-clay'}`}>
            “{COMPANY.tagline}”
          </span>
        )}
      </span>
    </span>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY + 4);
      if (y < lastY - 4) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (pathname.startsWith('/admin')) return null;

  const overDark = DARK_HERO_ROUTES.includes(pathname) && !scrolled;
  const light = overDark || open;

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-300 ${light ? 'on-dark' : ''} ${
          open
            ? 'bg-transparent py-4'
            : scrolled
              ? 'bg-paper/85 backdrop-blur-xl shadow-[0_1px_0_rgba(21,19,15,0.08)] py-3'
              : overDark
                ? 'bg-transparent py-5'
                : 'bg-paper py-5'
        }`}
      >
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 flex items-center justify-between gap-6">
          <Link to="/" aria-label={`${COMPANY.name} home`} className="relative z-10">
            <Logo light={light} />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-[15px] transition-colors ${
                    light
                      ? isActive ? 'text-paper' : 'text-paper/65 hover:text-paper'
                      : isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute left-1/2 -bottom-0.5 w-1 h-1 -ml-0.5 rounded-full bg-ember"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 relative z-10">
            <ThemeToggle light={light} />
            <button
              onClick={openCal}
              className={`hidden sm:inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full text-sm transition-colors ${
                light ? 'text-paper/80 hover:text-paper' : 'text-ink/70 hover:text-ink'
              }`}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-sage animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-sage" />
              </span>
              Ask Cal
            </button>
            <Link
              to="/contact"
              className={`hidden md:inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-medium transition-colors ${
                light ? 'bg-paper text-ink hover:bg-ember' : 'bg-ink text-paper hover:bg-clay'
              }`}
            >
              Book a call
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`lg:hidden w-12 h-12 -mr-2 flex flex-col items-center justify-center gap-[6px] rounded-full ${
                light ? 'text-paper' : 'text-ink'
              }`}
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="block w-6 h-[1.5px] bg-current" />
              <motion.span animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} className="block w-6 h-[1.5px] bg-current" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="on-dark fixed inset-0 z-40 bg-ink text-paper grain lg:hidden overflow-y-auto"
          >
            <div className="min-h-full flex flex-col px-5 sm:px-8 pt-28 pb-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {[{ name: 'Home', href: '/' }, ...NAV_LINKS, { name: 'Contact', href: '/contact' }].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 py-3 border-b border-paper/10 font-display text-[2.1rem] leading-tight tracking-tight ${
                          isActive ? 'text-ember italic' : 'text-paper'
                        }`
                      }
                    >
                      <span className="font-mono text-[11px] text-paper/40 w-6">0{i + 1}</span>
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-10 grid gap-3"
              >
                <Link to="/contact" className="flex items-center justify-center gap-2 min-h-[52px] rounded-full bg-ember text-coal font-medium">
                  Book a free discovery call <ArrowUpRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    openCal();
                  }}
                  className="flex items-center justify-center gap-2 min-h-[52px] rounded-full border border-paper/25 text-paper"
                >
                  <MessageCircle className="w-4 h-4" /> Ask Cal, our AI assistant
                </button>
                <a href={`mailto:${COMPANY.email}`} className="text-center text-sm text-paper/60 pt-3">
                  {COMPANY.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ThemeToggle({ light = false, className = '' }: { light?: boolean; className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={`relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden transition-colors ${
        light ? 'text-paper/80 hover:text-paper hover:bg-paper/10' : 'text-ink/70 hover:text-ink hover:bg-ink/5'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
