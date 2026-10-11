'use client';

import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'offplan'>('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  
  const router = useRouter();

  // Check if all three fields are properly filled
  const isFullyFilled = location.trim() !== '' && propertyType !== '' && priceRange !== '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Block search if not all fields are filled
    if (!isFullyFilled) {
      setShowErrors(true);
      return;
    }

    // Reset error state on success
    setShowErrors(false);

    // Route to properties page with filter queries
    const params = new URLSearchParams();
    params.set('intent', activeTab);
    params.set('city', location.trim());
    params.set('type', propertyType);
    params.set('price', priceRange);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-3xl bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-3xl border border-white/10 shadow-2xl">
      {/* Seamless Tab Selection */}
      <div className="flex gap-2 mb-3">
        {(['buy', 'rent', 'offplan'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition capitalize ${
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-300 hover:text-white bg-white/5'
            }`}
          >
            {tab === 'offplan' ? 'Off-Plan' : tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
        {/* Location Input */}
        <div 
          className={`bg-white/10 rounded-2xl p-3 flex items-center gap-2.5 border transition ${
            showErrors && !location.trim() ? 'border-red-400/80 bg-red-500/10' : 'border-transparent'
          }`}
        >
          <MapPin className="w-4 h-4 text-slate-300 shrink-0" />
          <input 
            type="text" 
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (showErrors) setShowErrors(false);
            }}
            placeholder="Location..."
            className="bg-transparent text-xs text-white focus:outline-none w-full placeholder:text-slate-400"
          />
        </div>

        {/* Property Type Dropdown */}
        <div 
          className={`bg-white/10 rounded-2xl p-3 flex items-center gap-2.5 border transition ${
            showErrors && !propertyType ? 'border-red-400/80 bg-red-500/10' : 'border-transparent'
          }`}
        >
          <Home className="w-4 h-4 text-slate-300 shrink-0" />
          <select 
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
              if (showErrors) setShowErrors(false);
            }}
            className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer border-none [&>option]:bg-[#0D131A] [&>option]:text-white"
          >
            <option value="">Property Type</option>
            <option value="RESIDENTIAL_VILLA">Villa</option>
            <option value="PENTHOUSE">Penthouse</option>
            <option value="APARTMENT">Apartment</option>
          </select>
        </div>

        {/* Price Range Dropdown */}
        <div 
          className={`bg-white/10 rounded-2xl p-3 flex items-center gap-2.5 border transition ${
            showErrors && !priceRange ? 'border-red-400/80 bg-red-500/10' : 'border-transparent'
          }`}
        >
          <DollarSign className="w-4 h-4 text-slate-300 shrink-0" />
          <select 
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              if (showErrors) setShowErrors(false);
            }}
            className="bg-transparent text-xs text-white focus:outline-none w-full cursor-pointer border-none [&>option]:bg-[#0D131A] [&>option]:text-white"
          >
            <option value="">Price Range</option>
            <option value="500000">Up to $500k</option>
            <option value="1500000">Up to $1.5M</option>
            <option value="5000000">$1.5M+</option>
          </select>
        </div>

        {/* White Search Button */}
        <button 
          type="submit"
          className="h-full py-3.5 bg-white text-slate-900 font-semibold text-xs rounded-2xl hover:bg-slate-100 transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
        >
          <Search className="w-3.5 h-3.5" />
          Search
        </button>
      </form>
    </div>
  );
}