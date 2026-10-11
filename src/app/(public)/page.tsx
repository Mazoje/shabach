import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Globe2, 
  ArrowUpRight 
} from 'lucide-react';
import { getFeaturedProperties } from '@/actions/properties';
import HeroSearch from '../components/HeroSearch';

export default async function ShabachRealEstateWebsite() {
  const result = await getFeaturedProperties(6);
  const properties = result.success && result.data ? result.data : [];

  return (
    <div className="bg-[#FDFBF7] text-[#121820] font-sans antialiased selection:bg-slate-200 selection:text-[#121820]">

      {/* 1. HERO SECTION */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#0D131A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              More Than Spaces
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Homes for a <br />
              <span className="font-serif italic text-white font-normal">brighter tomorrow</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-lg font-light leading-relaxed mb-8">
              Thoughtfully designed living spaces that bring comfort, convenience, and a better tomorrow.
            </p>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/properties" 
                className="px-6 py-3 rounded-full bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4" /> Explore Properties
              </Link>
            </div>
          </div>

          {/* Interactive Hero Search Bar */}
          <HeroSearch />
        </div>
      </section>

      {/* 2. MINIMAL FEATURE STRIP */}
      <section className="bg-white py-10 px-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-slate-900">Prime Locations</h4>
              <p className="text-[11px] text-slate-500">Close to what matters</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-slate-900">Modern Design</h4>
              <p className="text-[11px] text-slate-500">For modern living</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-slate-900">Secure Investment</h4>
              <p className="text-[11px] text-slate-500">Built for your future</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs text-slate-900">End-to-End Support</h4>
              <p className="text-[11px] text-slate-500">We're with you always</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
              Featured Properties
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#121820]">
              Spaces that <span className="font-serif italic font-normal">inspire</span>
            </h2>
          </div>
          <Link href="/properties" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition">
            View All Properties <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="text-slate-400 text-xs text-center py-12">
            No properties found in the database.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div 
                key={prop.id} 
                className="bg-white rounded-3xl overflow-hidden hover:shadow-lg transition duration-300 group border border-slate-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={prop.coverImage} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium text-slate-800">
                    {prop.type ? prop.type.replace('_', ' ') : 'Luxury'}
                  </div>
                </div>

                <div className="p-6">
                  <Link href={`/properties/${prop.slug}`}>
                    <h3 className="font-semibold text-base text-slate-900 mb-1 hover:text-slate-600 transition">
                      {prop.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3 text-slate-400" /> {prop.city}, {prop.country}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-slate-400" /> {prop.bedrooms} Beds</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-slate-400" /> {prop.bathrooms} Baths</span>
                    <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-400" /> {prop.sqft} sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="py-20 px-6 bg-[#0D131A] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px] rounded-3xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200" 
              alt="Shabach Empire Story" 
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-2">
              About Shabach
            </span>
            <h2 className="text-3xl md:text-4xl font-light mb-4 leading-tight">
              Building better lives
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed mb-8 font-light max-w-md">
              We believe a home is more than a structure — it's the foundation for a happier, healthier life. At Shabach Empire, we create spaces that inspire, connect, and grow with you.
            </p>

            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <h4 className="text-2xl font-light text-white">10+</h4>
                <p className="text-[11px] text-slate-400 mt-1">Years of Trust</p>
              </div>
              <div>
                <h4 className="text-2xl font-light text-white">25+</h4>
                <p className="text-[11px] text-slate-400 mt-1">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-2xl font-light text-white">5,000+</h4>
                <p className="text-[11px] text-slate-400 mt-1">Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}