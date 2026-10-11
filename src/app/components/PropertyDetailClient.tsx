'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Calendar, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface PropertyDetailClientProps {
  property: {
    id: string | number;
    title: string;
    slug: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    coverImage: string;
    images?: string[];
    city: string;
    country: string;
    status: string;
    type: string;
    amenities: { id: string; name: string }[];
  };
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  // Gallery active image state (defaults to cover image, includes additional images if available)
  const allImages = [property.coverImage, ...(property.images || [])];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  // Inquiry Form State
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`I am interested in scheduling a private viewing for ${property.title}.`);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0D131A] text-white font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200">

      {/* Top Navigation / Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-6">
        <Link 
          href="/properties" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                {property.type.replace('_', ' ')}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase">
                {property.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2">
              {property.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 flex items-center gap-1.5 font-light">
              <MapPin className="w-4 h-4 text-amber-400" /> {property.city}, {property.country}
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1">Offered At</span>
            <div className="text-3xl md:text-4xl font-light text-amber-200 font-serif">
              ${property.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* INLINE GALLERY SECTION */}
        <div className="mb-16">
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-4 bg-slate-900">
            <img 
              src={activeImage} 
              alt={property.title} 
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-slate-300 border border-white/10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Luxury Showcase
            </div>
          </div>

          {/* Thumbnail Selector */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-24 rounded-2xl overflow-hidden border transition ${
                    activeImage === img ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left 2 Columns: Specs, About & Amenities */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Bedrooms</span>
                <span className="text-xl font-light text-white flex items-center justify-center gap-2">
                  <Bed className="w-4 h-4 text-amber-400" /> {property.bedrooms}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Bathrooms</span>
                <span className="text-xl font-light text-white flex items-center justify-center gap-2">
                  <Bath className="w-4 h-4 text-amber-400" /> {property.bathrooms}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Total Area</span>
                <span className="text-xl font-light text-white flex items-center justify-center gap-2">
                  <Maximize2 className="w-4 h-4 text-amber-400" /> {property.sqft.toLocaleString()} sqft
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Security</span>
                <span className="text-xl font-light text-amber-300 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Verified
                </span>
              </div>
            </div>

            {/* About the Residence */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <h2 className="text-xl font-light text-white mb-4">About the Residence</h2>
              <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Key Amenities */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <h2 className="text-xl font-light text-white mb-6">Key Amenities & Features</h2>
              {property.amenities.length === 0 ? (
                <p className="text-xs text-slate-400">Standard luxury finishing and structural features included.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-2xl">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-light text-slate-200">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Contact & Private Inquiry Form */}
          <div>
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 p-8 rounded-3xl sticky top-28 shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block mb-1">Private Client Services</span>
              <h3 className="text-xl font-light text-white mb-2">Inquire About This Property</h3>
              <p className="text-xs text-slate-400 font-light mb-6">
                Schedule a private physical or virtual walkthrough with our senior advisory team.
              </p>

              {inquirySubmitted ? (
                <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl text-center">
                  <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-white">Inquiry Received Successfully</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Thank you, {fullName}. Our luxury property consultant assigned to {property.title} will reach out shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Jonathan Sterling" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. jonathan@example.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Message / Preferred Date</label>
                    <textarea 
                      rows={3}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-xl transition shadow-lg mt-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" /> Request Private Viewing
                  </button>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-amber-400" /> Direct Concierge</span>
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-amber-400" /> VIP Support</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}