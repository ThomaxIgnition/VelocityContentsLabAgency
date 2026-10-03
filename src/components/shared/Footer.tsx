import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { COMPANY, SERVICE_LINES } from '../../content.ts';
import { openCal } from '../ui.tsx';
import { Logo } from './Navbar.tsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-paper border-t border-paper/10 grain overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-8 font-display text-3xl sm:text-4xl font-light leading-tight tracking-tight max-w-md">
              Clear messages. Reliable systems. <span className="italic text-ember">Built together.</span>
            </p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="group mt-8 inline-flex items-center gap-2 text-lg text-paper border-b border-paper/25 hover:border-ember hover:text-ember transition-colors pb-1"
            >
              {COMPANY.email}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">Services</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {SERVICE_LINES.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services#${s.id}`} className="text-paper/75 hover:text-paper transition-colors">
                      {s.short}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/services#pricing" className="text-paper/75 hover:text-paper transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">Company</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {[
                  ['Work', '/work'],
                  ['How We Work', '/method'],
                  ['About', '/about'],
                  ['Insights', '/insights'],
                  ['Contact', '/contact']
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="text-paper/75 hover:text-paper transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button onClick={openCal} className="text-paper/75 hover:text-paper transition-colors">
                    Ask Cal
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/45">Visit</h2>
              <address className="mt-5 not-italic text-[15px] text-paper/75 leading-relaxed">
                {COMPANY.address}
              </address>
              <p className="mt-4 text-[15px] text-paper/75 leading-relaxed">{COMPANY.hours}</p>
              <p className="mt-4 text-sm text-paper/50">Replies {COMPANY.responseTime.toLowerCase()}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-10">
          <div
            aria-hidden="true"
            className="font-display font-light tracking-[-0.05em] leading-[0.8] text-paper/[0.07] text-[22vw] lg:text-[13rem] whitespace-nowrap select-none"
          >
            Velocity
          </div>
          <p className="font-display italic font-light text-ember text-2xl sm:text-3xl lg:text-4xl tracking-tight lg:pb-4 lg:text-right">
            “{COMPANY.tagline}”
          </p>
        </div>

        <div className="mt-6 pt-8 border-t border-paper/10 flex flex-col md:flex-row gap-4 md:items-center justify-between text-sm text-paper/50">
          <p>
            © {year} {COMPANY.legalName} · {COMPANY.rc} · Lagos, Nigeria
          </p>
          <p className="md:text-center">Personal data handled in line with the Nigeria Data Protection Act 2023.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 self-start md:self-auto min-h-[44px] text-paper/70 hover:text-paper"
          >
            Back to top
            <span className="w-9 h-9 rounded-full border border-paper/20 flex items-center justify-center group-hover:bg-paper group-hover:text-ink transition-colors">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
