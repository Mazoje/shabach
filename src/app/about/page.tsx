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
  ChevronRight
} from 'lucide-react';

// Team Members Data Interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  division: 'Executive' | 'Architecture' | 'Real Estate';
  image: string;
  bio: string;
  credentials: string[];
  linkedin?: string;
  twitter?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Arc. Precious Edirin",
    role: "Founder & Principal Architect",
    division: "Executive",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    bio: "With over 18 years of pioneering architectural experience across West Africa and Europe, Arc. Edirin leads the creative direction and masterplanning vision of Shabach Empire.",
    credentials: ["MNIA Certified", "M.Sc. Architecture (RIBA)", "Lead Structural Visionary"]
  },
  {
    id: 2,
    name: "Victoria Adebayo",
    role: "Head of Luxury Real Estate & Advisory",
    division: "Real Estate",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    bio: "Victoria brings extensive experience in private wealth real estate acquisitions, off-plan portfolio structuring, and high-net-worth client asset management in Ikoyi and Banana Island.",
    credentials: ["Certified Real Estate Broker", "12+ Years Wealth Advisory", "$80M+ Closed Deals"]
  },
  {
    id: 3,
    name: "Arc. Michael Chen",
    role: "Lead Structural Engineer & Design Director",
    division: "Architecture",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    bio: "Specializing in zero-emission luxury villas and ultra-modern high-rise penthouses, Michael oversees BIM modeling, sustainable structural physics, and construction engineering.",
    credentials: ["BIM Specialist", "Eco-Construction Pioneer", "M.Eng Structural Engineering"]
  },
  {
    id: 4,
    name: "Amara Nnamdi",
    role: "Director of Interior Architecture & Design",
    division: "Architecture",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    bio: "Amara transforms structural interiors into bespoke living art, collaborating with world-class Italian and Scandinavian artisans for luxury residential and hospitality spaces.",
    credentials: ["B.Des Interior Architecture", "Bespoke FF&E Specialist", "Award-Winning Designer"]
  }
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePillar, setActivePillar] = useState('all');
  const [activeTeamFilter, setActiveTeamFilter] = useState<string>('All');
  const [selectedBioMember, setSelectedBioMember] = useState<TeamMember | null>(null);

  const filteredTeam = TEAM_MEMBERS.filter(member => 
    activeTeamFilter === 'All' || member.division === activeTeamFilter
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121820] font-sans antialiased selection:bg-slate-200 selection:text-[#121820]">
      
     

      {/* 2. HERO HEADER SECTION */}
      <section className="relative pt-44 pb-20 bg-[#0D131A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              About Shabach Empire
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Where Architecture Meets <br />
              <span className="font-serif italic text-white font-normal">Luxury Real Estate</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Shabach Empire is a premier dual-discipline firm bridging bespoke architectural mastery with exclusive, high-yield real estate acquisition and advisory.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS / IDENTITY SWITCHER */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-2">
            Our Foundation
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            Dual Disciplines, <span className="font-serif italic font-normal">One Vision</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-slate-200/80 shadow-sm">
            {[
              { id: 'all', label: 'Overview' },
              { id: 'architecture', label: 'Architectural Studio' },
              { id: 'realestate', label: 'Real Estate Firm' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActivePillar(tab.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-medium transition ${
                  activePillar === tab.id 
                    ? 'bg-[#0D131A] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Architecture Pillar */}
          {(activePillar === 'all' || activePillar === 'architecture') && (
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                  Design Studio
                </span>
                <h3 className="text-2xl font-light text-slate-900 mb-4">
                  Bespoke <span className="font-serif italic font-normal">Architectural Design</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Our architecture arm creates landmark residential and commercial blueprints. From structural spatial planning to bespoke luxury interiors, every layout combines modern aesthetics with sustainable engineering.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Conceptual Masterplanning', '3D Visualisation & BIM Blueprints', 'Structural & Interior Engineering', 'Sustainable Eco-Villas'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#services" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:gap-3 transition">
                Explore Architectural Services <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Real Estate Pillar */}
          {(activePillar === 'all' || activePillar === 'realestate') && (
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                  Property Portfolio
                </span>
                <h3 className="text-2xl font-light text-slate-900 mb-4">
                  Prime <span className="font-serif italic font-normal">Real Estate Portfolio</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed mb-6">
                  We curate high-end off-plan, residential, and commercial developments across Lagos's most exclusive districts—Ikoyi, Banana Island, Victoria Island, and Lekki Phase 1.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Off-Plan Development Allocations', 'Private Ultra-Luxury Villas & Penthouses', 'Commercial Real Estate Investments', 'Property & Advisory Management'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#properties" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-900 hover:gap-3 transition">
                View Available Listings <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

        </div>
      </section>

      {/* 4. TEAM & LEADERSHIP BIO SECTION */}
      <section id="team" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-2">
              Leadership & Artisans
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-slate-900">
              Meet the Minds Behind <span className="font-serif italic font-normal">Shabach Empire</span>
            </h2>
          </div>

          {/* Division Filter Pills */}
          <div className="mt-6 md:mt-0 flex items-center gap-2 bg-white p-1 rounded-full border border-slate-200/80 shadow-sm self-start">
            {['All', 'Executive', 'Architecture', 'Real Estate'].map(division => (
              <button
                key={division}
                onClick={() => setActiveTeamFilter(division)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  activeTeamFilter === division 
                    ? 'bg-[#0D131A] text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {division}
              </button>
            ))}
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTeam.map(member => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-slate-800">
                    {member.division}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">{member.role}</p>
                  <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {/* Badges / Credentials */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {member.credentials.map((cred, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-50">
                <button
                  onClick={() => setSelectedBioMember(member)}
                  className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  View Full Profile <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM BIO MODAL */}
      {selectedBioMember && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedBioMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 h-64 md:h-full relative bg-slate-100">
                <img 
                  src={selectedBioMember.image} 
                  alt={selectedBioMember.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-3 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                    {selectedBioMember.division} Division
                  </span>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-1">{selectedBioMember.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-6">{selectedBioMember.role}</p>

                  <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Biography</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">
                    {selectedBioMember.bio}
                  </p>

                  <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Key Qualifications</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedBioMember.credentials.map((cred, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" /> {cred}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-light">Shabach Empire Principal Staff</span>
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedBioMember(null)}
                    className="px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    Schedule Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. METRICS / STATS SECTION */}
      <section className="py-16 bg-[#0D131A] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-3xl md:text-5xl font-light font-serif mb-2">$50M+</span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Property Volume</span>
          </div>
          <div>
            <span className="block text-3xl md:text-5xl font-light font-serif mb-2">120+</span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Architectural Projects</span>
          </div>
          <div>
            <span className="block text-3xl md:text-5xl font-light font-serif mb-2">15+</span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Prime Locations</span>
          </div>
          <div>
            <span className="block text-3xl md:text-5xl font-light font-serif mb-2">100%</span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Client Satisfaction</span>
          </div>
        </div>
      </section>

     
    </div>
  );
}