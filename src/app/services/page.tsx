'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Compass, 
  Ruler, 
  Layers, 
  ShieldCheck, 
  Award, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Home,
  DraftingCompass,
  KeyRound,
  Hammer,
  TrendingUp,
  FileText,
  Sliders
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  category: 'architecture' | 'realestate';
  title: string;
  tagline: string;
  icon: any;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  processSteps: string[];
  pricingModel: string;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'arch-masterplanning',
    category: 'architecture',
    title: 'Architectural Masterplanning & BIM',
    tagline: 'Precision 3D Blueprints & Site Urbanism',
    icon: DraftingCompass,
    shortDesc: 'Comprehensive architectural concept designs, structural physics modeling, and BIM execution plans tailored for luxury estates.',
    fullDesc: 'We develop end-to-end architectural frameworks that unify landscape physics, structural integrity, and contemporary luxury. Using Building Information Modeling (BIM), our blueprints minimize construction waste and optimize spatial flow.',
    deliverables: [
      '3D Photorealistic Exterior Rendering',
      'Structural Engineering Physics Maps',
      'BIM Execution & CAD Schematics',
      'Zoning & Municipal Approval Compliance'
    ],
    processSteps: ['Site Analysis', 'Concept Sketching', 'BIM Modeling', 'Construction Blueprinting'],
    pricingModel: 'Custom Project Fee / Per Sq. Meter'
  },
  {
    id: 'arch-interior',
    category: 'architecture',
    title: 'Bespoke Interior Architecture',
    tagline: 'Artisanal Spatial Curation & Styling',
    icon: Layers,
    shortDesc: 'High-end interior structural design, custom lighting architecture, and bespoke FF&E sourcing for residential and commercial spaces.',
    fullDesc: 'Our interior architecture division seamlessly weaves raw materials, custom millwork, and lighting ergonomics. We source direct-from-artisan furnishings across Milan, Paris, and Tokyo to deliver living spaces.',
    deliverables: [
      'Custom Millwork & Lighting Schematics',
      'Material Selection Palette & Samples',
      'FF&E Procurement & Worldwide Sourcing',
      'Turnkey Installation Supervision'
    ],
    processSteps: ['Mood Boarding', 'Spatial Ergonomics', 'Procurement', 'On-Site Staging'],
    pricingModel: 'Retainer + Commission Sourcing'
  },
  {
    id: 'arch-sustainable',
    category: 'architecture',
    title: 'Sustainable Eco-Villa Development',
    tagline: 'Zero-Emission Off-Grid Estate Engineering',
    icon: Compass,
    shortDesc: 'Biophilic estate design integrating solar roofs, rainwater harvesting, smart energy automation, and micro-climate insulation.',
    fullDesc: 'Designed for forward-thinking property owners, our eco-villas harmonize opulent living with environmental efficiency. We engineer self-sustaining water systems, integrated solar microgrids, and natural cross-ventilation geometry.',
    deliverables: [
      'Passive Solar Cooling System Design',
      'Off-Grid Renewable Power Matrix',
      'Rainwater Filtration Engineering',
      'Eco-Smart Home IoT Integration'
    ],
    processSteps: ['Climate Audit', 'Energy Flow Design', 'System Integration', 'Efficiency Testing'],
    pricingModel: 'Turnkey Design-Build Quote'
  },
  {
    id: 're-acquisition',
    category: 'realestate',
    title: 'Off-Plan & Prime Property Acquisition',
    tagline: 'Exclusive Access to Prime District Assets',
    icon: KeyRound,
    shortDesc: 'Direct representation and private negotiation for high-yield off-plan developments and off-market luxury mansions in Ikoyi, Banana Island, & Lekki.',
    fullDesc: 'We provide VIP clients and institutional investors with priority allocation in Lagos’s highest-performing real estate developments. From title due diligence to structural audits, we safeguard every step of acquisition.',
    deliverables: [
      'Off-Market Mansion & Villa Sourcing',
      'Title Verification (C of O, Governor Consent)',
      'Contract & Payment Schedule Structuring',
      'Pre-Handover Snagging & Inspection'
    ],
    processSteps: ['Mandate Briefing', 'Private Showings', 'Legal Verification', 'Key Handover'],
    pricingModel: 'Standard Buyer Commission / Retainer'
  },
  {
    id: 're-advisory',
    category: 'realestate',
    title: 'Real Estate Wealth & Asset Advisory',
    tagline: 'Maximizing ROI in High-Density Districts',
    icon: TrendingUp,
    shortDesc: 'Data-driven portfolio management, yield forecasting, capital growth structuring, and high-value tenant management for landlords.',
    fullDesc: 'Transforming property portfolios into wealth compounding engines. We evaluate market appreciation velocity, rental yield optimization, and exit strategies across residential and commercial sectors.',
    deliverables: [
      'Quarterly Market Appreciation Audits',
      'Rental Yield Enhancement Strategies',
      'Asset Diversification Advisory',
      'Tax & Title Structuring Guidance'
    ],
    processSteps: ['Portfolio Review', 'Yield Analysis', 'Strategy Deployment', 'Quarterly Optimization'],
    pricingModel: 'Percentage of Assets Under Advisory'
  },
  {
    id: 're-[#0D131A]ment',
    category: 'realestate',
    title: 'Turnkey Project Management',
    tagline: 'From Structural Foundation to Tenant Onboarding',
    icon: Hammer,
    shortDesc: 'Full oversight of construction milestones, contractor management, materials budgeting, and quality control assurances.',
    fullDesc: 'Eliminate project delays and budget overruns. Our management team supervises contractors, enforces quality compliance, and manages vendor timelines from groundbreaking to site commissioning.',
    deliverables: [
      'Contractor Milestone Auditing',
      'Materials Budget Oversight',
      'Quality Standard Compliance Certifications',
      'Weekly Video Progress Reports'
    ],
    processSteps: ['Contractor Onboarding', 'Milestone Monitoring', 'Quality Sign-Off', 'Handover'],
    pricingModel: 'Fixed Management Retainer'
  }
];

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'architecture' | 'realestate'>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  const filteredServices = SERVICES_DATA.filter(service => 
    selectedCategory === 'all' || service.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121820] font-sans antialiased selection:bg-slate-200 selection:text-[#121820]">
      
     
     {/* 2. HERO HEADER SECTION */}
      <section className="relative pt-44 pb-20 bg-[#0D131A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              Capabilities & Offerings
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Architectural Mastery & <br />
              <span className="font-serif italic text-white font-normal">Real Estate Engineering</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Explore our unified suite of high-end design, site urbanism, structural masterplanning, and high-yield real estate acquisitions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SWITCHER & SERVICES LIST */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-2">
            Tailored Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            End-To-End Services for <span className="font-serif italic font-normal">Elite Clients</span>
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200/80 shadow-sm">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'architecture', label: 'Architectural Studio' },
              { id: 'realestate', label: 'Real Estate & Advisory' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-6 py-2.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === tab.id 
                    ? 'bg-[#0D131A] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#0D131A] group-hover:text-white transition duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      {service.category === 'architecture' ? 'Architecture' : 'Real Estate'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 italic font-serif mb-4">
                    "{service.tagline}"
                  </p>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Key Deliverables Bullet Points */}
                  <div className="space-y-2 mb-8">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    View Scope & Deliverables <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SERVICE DETAIL MODAL */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-[#0D131A] text-white p-8 relative">
              <button 
                onClick={() => setActiveModalService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-2">
                {activeModalService.category === 'architecture' ? 'Architectural Studio Division' : 'Real Estate Division'}
              </span>
              <h3 className="text-2xl md:text-3xl font-light mb-2">{activeModalService.title}</h3>
              <p className="text-xs font-serif italic text-slate-300">{activeModalService.tagline}</p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              {/* Full Description */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-2">Detailed Scope</h4>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                  {activeModalService.fullDesc}
                </p>
              </div>

              {/* Deliverables List */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-3">Core Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalService.deliverables.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Workflow Process */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 mb-3">Our Execution Process</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeModalService.processSteps.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-100/70 border border-slate-200/50 text-center">
                      <span className="block text-[10px] font-bold text-slate-400 mb-1">0{idx + 1}</span>
                      <span className="text-xs font-medium text-slate-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Model & CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Fee Structure</span>
                  <span className="text-sm font-semibold text-slate-900">{activeModalService.pricingModel}</span>
                </div>

                <a 
                  href="#contact" 
                  onClick={() => setActiveModalService(null)}
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition text-center shadow-sm"
                >
                  Request Consultation Proposal
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 5. CONSULTATION / GET IN TOUCH BANNER */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-[#0D131A] text-white rounded-3xl p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl relative z-10">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              Need A Customized Plan?
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-4 leading-tight">
              Let's Discuss Your Next <br />
              <span className="font-serif italic font-normal">Architectural Landmark</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
              Book a direct session with Arc. Shabach or our Head of Real Estate Advisory to tailor a bespoke execution plan for your estate or portfolio.
            </p>
          </div>

          <a 
            href="#contact" 
            className="relative z-10 px-8 py-4 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition text-xs font-semibold flex items-center gap-2 shrink-0 shadow-lg"
          >
            Schedule Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      
    </div>
  );
}