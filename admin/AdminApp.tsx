import { FormEvent, ReactNode, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { BookOpen, CalendarDays, ExternalLink, Eye, EyeOff, LayoutDashboard, LogOut } from 'lucide-react';
import { supabase } from '../src/lib/supabase.ts';
import { COMPANY } from '../src/content.ts';
import Overview from './Overview.tsx';
import BookTab from './BookTab.tsx';
import CalendarTab from './CalendarTab.tsx';

export type Tab = 'overview' | 'book' | 'calendar';

const PUBLIC_SITE = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) ?? 'https://velocitycontentslabagency.velocitycontentslab.workers.dev';

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    supabase.rpc('is_admin').then(({ data }) => setIsAdmin(data === true));
  }, [session]);

  if (checking || (session && isAdmin === null)) {
    return <div className="min-h-screen bg-paper flex items-center justify-center text-muted">Loading…</div>;
  }
  if (!session) return <SignIn />;
  if (!isAdmin) {
    return (
      <Centered>
        <h1 className="font-display text-3xl tracking-tight">Not authorised</h1>
        <p className="mt-3 text-muted">{session.user.email} does not have access to this dashboard.</p>
        <button onClick={() => supabase.auth.signOut()} className="mt-8 min-h-[48px] px-6 rounded-full bg-ink text-paper">
          Sign out
        </button>
      </Centered>
    );
  }
  return <Dashboard email={session.user.email ?? ''} />;
}

function Dashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>(() => (localStorage.getItem('vcl-admin-tab') as Tab) || 'overview');
  useEffect(() => localStorage.setItem('vcl-admin-tab', tab), [tab]);

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'book', label: 'Book', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays }
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="on-dark sticky top-0 z-30 bg-ink text-paper">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <svg viewBox="0 0 64 64" className="w-8 h-8 shrink-0" aria-hidden="true">
              <rect width="64" height="64" rx="14" className="fill-paper" />
              <path d="M17 18h7.5L32 39.5 39.5 18H47L35.6 47h-7.2z" className="fill-ink" />
              <circle cx="47" cy="47" r="4" className="fill-ember" />
            </svg>
            <span className="font-display text-lg truncate">Velocity Admin</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={PUBLIC_SITE}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-full text-sm text-paper/75 hover:text-paper"
            >
              View website <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="hidden md:inline text-sm text-paper/50 px-2">{email}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-full text-sm text-paper/75 hover:text-paper hover:bg-paper/10"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-[1240px] px-2 sm:px-6 flex gap-1 overflow-x-auto" aria-label="Dashboard sections">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={tab === id ? 'page' : undefined}
              className={`relative inline-flex items-center gap-2 min-h-[48px] px-4 text-[15px] transition-colors ${
                tab === id ? 'text-paper' : 'text-paper/55 hover:text-paper'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
              {tab === id && <span className="absolute left-3 right-3 bottom-0 h-[3px] rounded-t bg-ember" />}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-[1240px] px-4 sm:px-8 py-8 sm:py-10">
        {tab === 'overview' && <Overview goTo={setTab} />}
        {tab === 'book' && <BookTab />}
        {tab === 'calendar' && <CalendarTab />}
      </main>
    </div>
  );
}

function SignIn() {
  const [mode, setMode] = useState<'signin' | 'setup'>('signin');
  const [email, setEmail] = useState(COMPANY.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'info'; text: string } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({
          kind: 'error',
          text: error.message.includes('not confirmed')
            ? 'Your account is waiting for confirmation. Ask for it to be confirmed, then sign in again.'
            : 'Email or password is incorrect.'
        });
      }
    } else {
      if (password.length < 10) {
        setMessage({ kind: 'error', text: 'Use at least 10 characters for your password.' });
        setBusy(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage({ kind: 'error', text: error.message });
      else if (!data.session) {
        setMessage({ kind: 'info', text: 'Account created. Once it is confirmed you can sign in with this password.' });
        setMode('signin');
      }
    }
    setBusy(false);
  };

  return (
    <Centered>
      <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
        <rect width="64" height="64" rx="14" className="fill-ink" />
        <path d="M17 18h7.5L32 39.5 39.5 18H47L35.6 47h-7.2z" className="fill-paper" />
        <circle cx="47" cy="47" r="4" className="fill-ember" />
      </svg>
      <h1 className="mt-6 font-display text-3xl tracking-tight">{mode === 'signin' ? 'Velocity Admin' : 'Set up your account'}</h1>
      <p className="mt-2 text-muted">{mode === 'signin' ? 'Sign in to manage the book and calendar.' : 'Choose the password you will use to sign in.'}</p>

      <form onSubmit={submit} className="mt-8 w-full space-y-4 text-left">
        <label className="block">
          <span className="text-sm text-muted">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full h-12 px-4 rounded-xl bg-paper-deep border border-ink/12 focus:outline-none focus:border-ink"
          />
        </label>
        <div>
          <label htmlFor="admin-password" className="text-sm text-muted">
            Password
          </label>
          <div className="relative mt-1.5">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 pl-4 pr-12 rounded-xl bg-paper-deep border border-ink/12 focus:outline-none focus:border-ink"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:text-ink"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {message && (
          <p role="alert" className={`text-sm p-3 rounded-xl ${message.kind === 'error' ? 'bg-clay/10 text-clay' : 'bg-sage/10 text-sage'}`}>
            {message.text}
          </p>
        )}
        <button disabled={busy} className="w-full min-h-[52px] rounded-full bg-ink text-paper font-medium hover:bg-clay disabled:opacity-60 transition-colors">
          {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      <button
        onClick={() => {
          setMode(mode === 'signin' ? 'setup' : 'signin');
          setMessage(null);
        }}
        className="mt-6 min-h-[44px] text-sm text-muted underline underline-offset-4 hover:text-ink"
      >
        {mode === 'signin' ? 'First time here? Set up your account' : 'Already set up? Sign in'}
      </button>
    </Centered>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-5">
      <div className="w-full max-w-sm flex flex-col items-center text-center">{children}</div>
    </div>
  );
}
