'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  Scale, 
  Briefcase, 
  CreditCard, 
  AlertTriangle, 
  ShieldAlert, 
  Gavel, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const termsSections = [
    { id: 'acceptance', title: '1. Acceptance & Eligibility' },
    { id: 'services-scope', title: '2. Architectural & Advisory Scope' },
    { id: 'financial-terms', title: '3. Financial Terms & Commitments' },
    { id: 'intellectual-property', title: '4. Intellectual Property Rights' },
    { id: 'client-responsibilities', title: '5. Client Warranties' },
    { id: 'liability-limitation', title: '6. Limitation of Liability' },
    { id: 'governing-law', title: '7. Governing Law & Dispute' }
  ];

  // Pure CSS smooth scroll enabled at page root
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Simple scroll tracker to highlight active pill/item
  useEffect(() => {
    const handleScroll = () => {
      const offset = 180;
      for (let i = termsSections.length - 1; i >= 0; i--) {
        const sec = termsSections[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121820] font-sans antialiased selection:bg-slate-200 selection:text-[#121820]">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-20 bg-[#0D131A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              Legal Framework & Operating Mandate
            </span>
            <h1 className="text-3xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Terms of Service & <br />
              <span className="font-serif italic text-white font-normal">Engagement Protocol</span>
            </h1>
            <p className="text-slate-300 text-xs md:text-base font-light leading-relaxed max-w-xl">
              These terms govern all architectural commissions, real estate acquisitions, and professional advisory engagements executed with Shabach Empire.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Effective Date: October 2026</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>Binding Legal Agreement</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MOBILE HORIZONTAL PILL BAR (CSS Horizontal Scroll) */}
      <div className="lg:hidden sticky top-14 z-20 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-max">
          {termsSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-[#0D131A] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sec.title}
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. MAIN CONTENT LAYOUT */}
      <section className="py-8 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* DESKTOP VERTICAL SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Scale className="w-4 h-4 text-slate-900" />
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Terms Navigation</h3>
            </div>
            
            <nav className="space-y-1">
              {termsSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0D131A] text-white shadow-md translate-x-1'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span>{sec.title}</span>
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-emerald-400 scale-125' : 'bg-transparent'
                    }`} />
                  </a>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl text-xs text-slate-600 space-y-2">
              <span className="font-semibold text-slate-900 block">Advisory Consultation Notice</span>
              <p className="text-[11px] font-light leading-relaxed">
                By retaining Shabach Empire for BIM developments or property acquisitions, you enter into a legally binding agreement under federal and state real estate laws.
              </p>
            </div>
          </aside>

          {/* MAIN DOCUMENT SECTIONS */}
          <main className="lg:col-span-8 bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-12 md:space-y-16">
            
            {/* 1. Acceptance & Eligibility */}
            <div id="acceptance" className="scroll-mt-28 md:scroll-mt-36 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                1. Acceptance <span className="font-serif italic font-normal">& Eligibility</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                By accessing this platform, initiating an architectural consultation, or executing a property allocation form with Shabach Empire, you confirm that you are at least 18 years of age and hold the legal authority to enter into enforceable contracts.
              </p>
              <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Engagement Mandates:</h4>
                <ul className="space-y-2 text-xs text-slate-600 font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Compliance with all Know Your Customer (KYC) and Anti-Money Laundering (AML) regulatory standards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Providing verified, legally accurate documentation for land title transfers and structural approvals.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Scope of Services */}
            <div id="services-scope" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                2. Architectural <span className="font-serif italic font-normal">& Advisory Scope</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Shabach Empire delivers high-end architectural masterplanning, Building Information Modeling (BIM), structural engineering consultation, and premium real estate sales.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Off-Plan Developments</span>
                  <p className="text-slate-600 font-light">Architectural renderings and timelines represent design intent. Final physical deliveries conform strictly to underlying construction contracts.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Advisory Services</span>
                  <p className="text-slate-600 font-light">Real estate valuations and projections provided by Shabach Empire serve as professional estimates based on current market dynamics.</p>
                </div>
              </div>
            </div>

            {/* 3. Financial Terms */}
            <div id="financial-terms" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                3. Financial Terms <span className="font-serif italic font-normal">& Payment Commitments</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                All financial transactions, deposit schedules, and fee structures are executed under explicit formal agreements.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 font-light pl-2">
                <li>• <strong>Retainers & Commitments:</strong> Architectural design fees and property deposits must be made strictly via designated corporate escrow channels.</li>
                <li>• <strong>Payment Milestones:</strong> Off-plan property stage payments must adhere to agreed schedules to ensure construction continuity.</li>
                <li>• <strong>Refund Policies:</strong> Consultation and design retainers are non-refundable once physical or BIM drafting work has commenced.</li>
              </ul>
            </div>

            {/* 4. Intellectual Property */}
            <div id="intellectual-property" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                4. Intellectual <span className="font-serif italic font-normal">Property Rights</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                All CAD blueprints, BIM models, elevation designs, site plans, brand identity assets, and digital media rendered by Shabach Empire remain the exclusive intellectual property of Shabach Empire until full contractual execution and title transfer.
              </p>
            </div>

            {/* 5. Client Warranties */}
            <div id="client-responsibilities" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                5. Client Warranties <span className="font-serif italic font-normal">& Declarations</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Clients agree not to duplicate, resell, or distribute Shabach Empire’s proprietary architectural concepts without express written consent.
              </p>
            </div>

            {/* 6. Limitation of Liability */}
            <div id="liability-limitation" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                6. Limitation <span className="font-serif italic font-normal">of Liability</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Shabach Empire is not liable for project delays caused by regulatory permit delays from municipal bodies, statutory changes, or unforeseeable environmental force majeure events.
              </p>
            </div>

            {/* 7. Governing Law */}
            <div id="governing-law" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-[#0D131A] text-white flex items-center justify-center mb-2">
                <Gavel className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                7. Governing Law <span className="font-serif italic font-normal">& Jurisdiction</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising shall be subjected to binding arbitration in Lagos State before resorting to judicial litigation.
              </p>

              <div className="bg-[#0D131A] text-white p-6 rounded-2xl space-y-3 text-xs mt-6">
                <span className="font-semibold text-white block mb-1">Legal Affairs & Arbitration Inquiries</span>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>legal@shabachempire.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-slate-400" />
                  <span>+234 (0) 800 SHABACH (Ext. 401)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Legal Secretariat, Shabach Empire HQ, Ikoyi, Lagos, Nigeria</span>
                </div>
              </div>
            </div>

          </main>

        </div>
      </section>

    </div>
  );
}