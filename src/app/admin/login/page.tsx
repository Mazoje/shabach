'use client';

import React, { useState } from 'react';
import { adminLoginAction } from '@/actions/auth';
import { ShieldCheck, Lock, Mail, ArrowRight, Building2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await adminLoginAction(formData);

    if (res && !res.success) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D131A] text-white font-sans flex items-center justify-center px-6 selection:bg-amber-500/30">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl relative z-10 shadow-2xl">
        
        {/* Header Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 block mb-1">
            Shabach Empire Security
          </span>
          <h1 className="text-2xl font-light text-white">Executive Back-Office</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to access inventory, unit matrix, and construction audits.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 p-3.5 rounded-2xl text-xs text-red-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1.5">Administrator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="email" 
                name="email"
                defaultValue="admin@shabachempire.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1.5">Security Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                name="password"
                defaultValue="shabach2026"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Access Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-[11px] text-slate-500">
          Protected by Shabach Enterprise Security Protocol
        </div>

      </div>
    </div>
  );
}