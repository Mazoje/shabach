'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Server, 
  UserCheck, 
  Globe2, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Scale
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('data-collection');

  const policySections = [
    { id: 'data-collection', title: '1. Information We Collect' },
    { id: 'data-use', title: '2. How We Use Your Data' },
    { id: 'data-sharing', title: '3. Data Sharing & Disclosure' },
    { id: 'data-security', title: '4. Security & Storage' },
    { id: 'client-rights', title: '5. Your Legal Rights' },
    { id: 'cookies-tracking', title: '6. Cookies & Tracking' },
    { id: 'contact-dpo', title: '7. Contact Data Officer' }
  ];

  // Set pure CSS smooth scrolling on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Simple scroll listener to highlight active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const offset = 180;
      for (let i = policySections.length - 1; i >= 0; i--) {
        const sec = policySections[i];
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
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              Governance & Compliance
            </span>
            <h1 className="text-3xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Privacy Policy & <br />
              <span className="font-serif italic text-white font-normal">Data Protection</span>
            </h1>
            <p className="text-slate-300 text-xs md:text-base font-light leading-relaxed max-w-xl">
              At Shabach Empire, we safeguard client privacy with the same rigor and precision applied to our architectural engineering and real estate developments.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Last Updated: October 2026</span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>NDPR & GDPR Compliant Framework</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MOBILE HORIZONTAL PILL NAVIGATION (CSS Scrollable, No JS Effects) */}
      <div className="lg:hidden sticky top-14 z-20 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-slate-200 py-3 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-max">
          {policySections.map((sec) => {
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
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Policy Navigation</h3>
            </div>
            
            <nav className="space-y-1">
              {policySections.map((sec) => {
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
              <span className="font-semibold text-slate-900 block">Confidentiality Guarantee</span>
              <p className="text-[11px] font-light leading-relaxed">
                All client briefing blueprints, financial disclosures, and acquisition documentation are secured under strict non-disclosure obligations.
              </p>
            </div>
          </aside>

          {/* DOCUMENT CONTENT */}
          <main className="lg:col-span-8 bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-sm space-y-12 md:space-y-16">
            
            {/* 1. Information We Collect */}
            <div id="data-collection" className="scroll-mt-28 md:scroll-mt-36 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Eye className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                1. Information <span className="font-serif italic font-normal">We Collect</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Shabach Empire collects personal and financial data necessary to facilitate high-end architectural masterplanning, property acquisitions, and wealth advisory services.
              </p>
              <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Data Categories Included:</h4>
                <ul className="space-y-2 text-xs text-slate-600 font-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0"></span>
                    <span><strong>Personal Identification:</strong> Full name, passport details, phone number, physical address, and email coordinates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0"></span>
                    <span><strong>Project & Site Blueprints:</strong> Property coordinates, plot sizes, design preferences, and land titling documents.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0"></span>
                    <span><strong>Financial & Acquisition Briefs:</strong> Budget allocation ranges, investment timelines, and proof-of-funds documentation for off-plan properties.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. How We Use Your Data */}
            <div id="data-use" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                2. How We Use <span className="font-serif italic font-normal">Your Data</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Your data is processed strictly for legitimate legal and professional business interests. We do not sell or rent client lists to third-party advertisers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Architectural Execution</span>
                  <p className="text-slate-600 font-light">Developing custom BIM blueprints, structural physics calculations, and municipal permits.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Real Estate Titling</span>
                  <p className="text-slate-600 font-light">Verifying Governor’s Consent, C of O documents, and allocation contracts with state registries.</p>
                </div>
              </div>
            </div>

            {/* 3. Data Sharing & Disclosure */}
            <div id="data-sharing" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Globe2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                3. Data Sharing <span className="font-serif italic font-normal">& Disclosure</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Information is shared solely with verified regulatory entities and direct project partners required to fulfill your engagement mandate:
              </p>
              <ul className="space-y-2 text-xs text-slate-600 font-light pl-2">
                <li>• Municipal Planning Authorities & Land Title Registries (for architectural approvals and deed recording).</li>
                <li>• Designated Structural Engineers and Principal Contractors under signed Non-Disclosure Agreements (NDAs).</li>
                <li>• Legal Counsel and Financial Institutions handling escrow and transaction clearance.</li>
              </ul>
            </div>

            {/* 4. Security & Storage */}
            <div id="data-security" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                4. Security <span className="font-serif italic font-normal">& Storage Standard</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Shabach Empire employs enterprise-grade AES-256 encryption for digital assets and CAD blueprints stored within our secure cloud infrastructure. Physical files are stored in access-controlled vaults in our Ikoyi executive offices.
              </p>
            </div>

            {/* 5. Client Rights */}
            <div id="client-rights" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                5. Your Legal <span className="font-serif italic font-normal">Rights</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                Under relevant data privacy laws (NDPR & GDPR), you hold full rights to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100"><strong>Right of Access:</strong> Request digital copies of stored project files.</div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100"><strong>Right to Erasure:</strong> Request purging of non-essential records following contract completion.</div>
              </div>
            </div>

            {/* 6. Cookies & Tracking */}
            <div id="cookies-tracking" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                6. Cookies <span className="font-serif italic font-normal">& Web Telemetry</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                We use essential session cookies to enhance navigation efficiency across our interactive CAD model previews and consultation booking suite. No invasive third-party tracking tags are deployed without consent.
              </p>
            </div>

            {/* 7. Contact Data Officer */}
            <div id="contact-dpo" className="scroll-mt-28 md:scroll-mt-36 space-y-4 pt-10 md:pt-12 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-[#0D131A] text-white flex items-center justify-center mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-light text-slate-900">
                7. Contact Our <span className="font-serif italic font-normal">Data Compliance Officer</span>
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                For questions concerning this Privacy Policy, NDA requests, or data deletion inquiries:
              </p>

              <div className="bg-[#0D131A] text-white p-6 rounded-2xl space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>privacy@shabachempire.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-slate-400" />
                  <span>+234 (0) 800 SHABACH (Ext. 402)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Executive Legal Counsel, Shabach Empire HQ, Ikoyi, Lagos, Nigeria</span>
                </div>
              </div>
            </div>

          </main>

        </div>
      </section>

    </div>
  );
}