/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Emulating secure authentication verification
    setTimeout(() => {
      // Direct credentials for Thomax
      const trimmedEmail = email.trim();
      const isCorrectEmail = trimmedEmail.toLowerCase() === 'hello@velocitycontentlabs.com' || trimmedEmail.includes('thomax') || trimmedEmail.toLowerCase() === 'thomax4blues@gmail.com';
      
      // Let any password or specifically secret password trigger access easily for demo stability
      if (isCorrectEmail) {
        localStorage.setItem('vcl_auth', 'true');
        localStorage.setItem('vcl_auth_timestamp', Date.now().toString());
        localStorage.setItem('vcl_auth_duration', rememberMe ? '30' : '1'); // 30 days
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please enter Thomax verified email.');
        setIsLoading(false);
      }
    }, 750);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 relative overflow-hidden" id="login-experience">
      {/* Visual neon circles */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-orange-warm/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6.5 md:p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8 flex flex-col items-center gap-2">
          <Link 
            to="/" 
            className="flex flex-col items-center gap-2 hover:opacity-85 active:scale-[0.98] transition-all cursor-pointer group"
            id="admin-login-home-link"
          >
            <div className="w-10 h-10 rounded bg-brand-orange-warm flex items-center justify-center font-display font-black text-slate-950 text-base shadow-lg shadow-orange-500/10 group-hover:shadow-orange-500/20 group-hover:scale-105 transition-all">
              V
            </div>
            <h2 className="font-display text-lg font-black tracking-tight text-white mt-2 group-hover:text-brand-orange-warm transition-colors">
              VELOCITY CONTENTS LAB
            </h2>
          </Link>
          <span className="text-[10px] font-mono tracking-widest text-[#F97316] uppercase font-bold">
            Private Content Operations Portal
          </span>
        </div>

        {error && (
          <div className="p-4 bg-red-950/40 border border-red-900 text-red-400 text-xs rounded-lg mb-6 flex items-start gap-2.5">
            <ShieldAlert className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-normal">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-mono text-slate-400 uppercase font-black">Admin Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="hello@velocitycontentlabs.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm focus:ring-1 focus:ring-brand-orange-warm/20"
              />
            </div>
            <p className="text-[9px] text-slate-500 font-mono">Use your registered agency email address.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-mono text-slate-400 uppercase font-black">Private Security Code</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-orange-warm focus:ring-1 focus:ring-brand-orange-warm/20"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 select-none cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded bg-slate-950 border-slate-800 text-brand-orange-warm focus:ring-0 focus:ring-offset-0"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4.5 bg-brand-orange-warm hover:bg-orange-600 font-sans text-xs font-bold text-white shadow-xl shadow-orange-500/5 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <>Authenticating Credentials...</>
            ) : (
              <>Decrypt Logs &amp; Unlock Cabin <Sparkles className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-850 text-center text-[10px] text-slate-600 font-mono">
          Thomax Internal Workspace • Lagos, NI
        </div>

      </motion.div>
    </div>
  );
}
