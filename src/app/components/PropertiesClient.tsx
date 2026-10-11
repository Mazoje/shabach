'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Heart,
  X,
  Plus,
  Trash2,
  Edit,
  Ruler,
  Compass,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

interface Property {
  id: string | number;
  title: string;
  slug?: string;
  location: string;
  price: string;
  type: 'buy' | 'rent' | 'offplan';
  category: 'Villa' | 'Penthouse' | 'Apartment' | 'Commercial' | 'Land';
  tag: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  images?: string[];
  description: string;
  amenities?: { id: string; name: string }[];
  featured?: boolean;
}

export default function PropertiesClient({ initialProperties }: { initialProperties: Property[] }) {
  // Navigation & View Modes
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'offplan' | 'all'>('all');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<(string | number)[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Property State Management
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingPropertyId, setEditingPropertyId] = useState<string | number | null>(null);

  // Gallery Active Image State inside Modal
  const [activeModalImage, setActiveModalImage] = useState<string>('');

  // Inquiry Form State inside Modal
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Property Form Fields (Admin)
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formType, setFormType] = useState<'buy' | 'rent' | 'offplan'>('buy');
  const [formCategory, setFormCategory] = useState<'Villa' | 'Penthouse' | 'Apartment' | 'Commercial' | 'Land'>('Villa');
  const [formTag, setFormTag] = useState('New Listing');
  const [formBeds, setFormBeds] = useState(3);
  const [formBaths, setFormBaths] = useState(3);
  const [formSqft, setFormSqft] = useState('1,500 Sq.Ft');
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const toggleFavorite = (id: string | number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleOpenModal = (prop: Property) => {
    setSelectedProperty(prop);
    setActiveModalImage(prop.image);
    setInquirySubmitted(false);
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLocation || !formPrice) {
      alert("Please fill in all required property details.");
      return;
    }

    const defaultImage = formImage.trim() || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200";

    if (editingPropertyId !== null) {
      setProperties(prev => prev.map(p => p.id === editingPropertyId ? {
        ...p,
        title: formTitle,
        location: formLocation,
        price: formPrice,
        type: formType,
        category: formCategory,
        tag: formTag,
        beds: Number(formBeds),
        baths: Number(formBaths),
        sqft: formSqft,
        image: defaultImage,
        description: formDescription || "Standard property listing."
      } : p));
      setEditingPropertyId(null);
    } else {
      const newProp: Property = {
        id: Date.now(),
        title: formTitle,
        location: formLocation,
        price: formPrice,
        type: formType,
        category: formCategory,
        tag: formTag || 'New Listing',
        beds: Number(formBeds),
        baths: Number(formBaths),
        sqft: formSqft,
        image: defaultImage,
        description: formDescription || "Newly published architectural property listing.",
        featured: false
      };
      setProperties([newProp, ...properties]);
    }

    resetForm();
  };

  const handleEditInit = (prop: Property) => {
    setEditingPropertyId(prop.id);
    setFormTitle(prop.title);
    setFormLocation(prop.location);
    setFormPrice(prop.price);
    setFormType(prop.type);
    setFormCategory(prop.category);
    setFormTag(prop.tag);
    setFormBeds(prop.beds);
    setFormBaths(prop.baths);
    setFormSqft(prop.sqft);
    setFormImage(prop.image);
    setFormDescription(prop.description);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleDeleteProperty = (id: string | number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setProperties(prev => prev.filter(p => p.id !== id));
      if (selectedProperty?.id === id) setSelectedProperty(null);
    }
  };

  const resetForm = () => {
    setEditingPropertyId(null);
    setFormTitle('');
    setFormLocation('');
    setFormPrice('');
    setFormTag('New Listing');
    setFormBeds(3);
    setFormBaths(3);
    setFormSqft('1,500 Sq.Ft');
    setFormImage('');
    setFormDescription('');
  };

  // Filter Logic
  const filteredProperties = properties.filter(prop => {
    const matchesTab = activeTab === 'all' || prop.type === activeTab;
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prop.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121820] font-sans antialiased selection:bg-slate-200 selection:text-[#121820]">
      
      {/* HERO HEADER */}
      <section className="relative pt-44 pb-16 bg-[#0D131A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/70 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              Shabach Property & Architecture Module
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Curated Estates & <br />
              <span className="font-serif italic text-white font-normal">Architectural Design</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Browse our live real estate collection or utilize our administrative suite to manage properties, update pricing, and handle architectural project inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* ADMIN MANAGEMENT FORM */}
      {isAdminMode && (
        <section id="admin-portal" className="py-12 px-6 bg-slate-900 text-white border-y border-emerald-500/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-1">
                  Administrator Workspace
                </span>
                <h2 className="text-2xl font-light text-white">
                  {editingPropertyId ? 'Edit Existing Property' : 'Add New Property Listing'}
                </h2>
              </div>
              {editingPropertyId && (
                <button 
                  onClick={resetForm} 
                  className="px-4 py-2 bg-white/10 text-xs rounded-full hover:bg-white/20 transition"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProperty} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Property Title *</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder="e.g. Sapphire Horizon Mansion" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Location *</label>
                <input 
                  type="text" 
                  value={formLocation}
                  onChange={e => setFormLocation(e.target.value)}
                  placeholder="e.g. Banana Island, Lagos" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Display Price *</label>
                <input 
                  type="text" 
                  value={formPrice}
                  onChange={e => setFormPrice(e.target.value)}
                  placeholder="e.g. $2,100,000" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Listing Type</label>
                <select 
                  value={formType}
                  onChange={e => setFormType(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="buy">For Sale (Buy)</option>
                  <option value="rent">For Rent</option>
                  <option value="offplan">Off-Plan Development</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Category</label>
                <select 
                  value={formCategory}
                  onChange={e => setFormCategory(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">Tag / Badge</label>
                <input 
                  type="text" 
                  value={formTag}
                  onChange={e => setFormTag(e.target.value)}
                  placeholder="e.g. Ready to Move" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-2">Beds</label>
                  <input 
                    type="number" 
                    value={formBeds}
                    onChange={e => setFormBeds(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-2">Baths</label>
                  <input 
                    type="number" 
                    value={formBaths}
                    onChange={e => setFormBaths(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-2">Sq.Ft</label>
                  <input 
                    type="text" 
                    value={formSqft}
                    onChange={e => setFormSqft(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-3 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-2">Image URL</label>
                <input 
                  type="text" 
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-300 mb-2">Property Description</label>
                <textarea 
                  rows={3}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Detail architectural highlights..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                <button 
                  type="submit"
                  className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  {editingPropertyId ? 'Update Property Listing' : 'Publish Property Listing'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* MAIN PROPERTY DIRECTORY */}
      <section id="properties" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-full w-full lg:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Listings' },
                { id: 'buy', label: 'For Sale' },
                { id: 'rent', label: 'For Rent' },
                { id: 'offplan', label: 'Off-Plan' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 rounded-full text-xs font-medium transition whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input & Category Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search location or title..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <select 
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Villa">Villas</option>
                <option value="Penthouse">Penthouses</option>
                <option value="Apartment">Apartments</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900">
              Available <span className="font-serif italic font-normal">Properties</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Showing {filteredProperties.length} properties</p>
          </div>
          <button 
            onClick={() => setIsAdminMode(!isAdminMode)}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition text-slate-700"
          >
            {isAdminMode ? 'Exit Admin Mode' : 'Admin Portal'}
          </button>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-700">No properties found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or switch listing tabs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div 
                key={prop.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img 
                      src={prop.image} 
                      alt={prop.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-slate-800">
                      {prop.tag}
                    </div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => toggleFavorite(prop.id)}
                        className="p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-red-500 transition shadow-sm"
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorites.includes(prop.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-semibold">
                      {prop.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-slate-900">
                        {prop.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {prop.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {prop.location}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 font-light leading-relaxed mb-6">
                      {prop.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5 text-slate-400" /> {prop.beds} Beds</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-slate-400" /> {prop.baths} Baths</span>
                      <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-slate-400" /> {prop.sqft}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-50/50 flex items-center justify-between gap-2">
                  {isAdminMode ? (
                    <div className="flex items-center justify-between w-full gap-2">
                      <button 
                        onClick={() => handleEditInit(prop)}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                      >
                        <Edit className="w-3 h-3 text-slate-600" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProperty(prop.id)}
                        className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center justify-center transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleOpenModal(prop)}
                      className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      View Details & Inquiry <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ARCHITECTURAL STUDIO */}
      <section className="py-24 px-6 bg-[#0D131A] text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-2">
              Architectural Studio & Design Consultancy
            </span>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-4">
              Crafting <span className="font-serif italic text-white font-normal">architectural masterworks</span>
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
              In addition to real estate brokerage, Shabach Empire houses an elite architectural practice delivering bespoke residential, commercial, and structural blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">Architectural Design</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Comprehensive conceptualization, site analysis, elevation plans, and precise construction documentation.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">Interior Architecture</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Space optimization, spatial flow planning, material curation, custom lighting design, and artisanal finishes.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">3D Visualization</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                High-definition 3D rendering, virtual walkthrough animations, and BIM modeling for visionaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED MINIMALIST PROPERTY DETAIL MODAL POP-UP */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="bg-[#FDFBF7] text-[#121820] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative shadow-2xl border border-slate-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-12">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">
                {selectedProperty.category} • {selectedProperty.tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-light mt-3 mb-1 text-slate-900">{selectedProperty.title}</h2>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedProperty.location}
              </p>
            </div>

            {/* INLINE IMAGE GALLERY VIEWER */}
            <div className="mb-8">
              <div className="relative h-72 md:h-[400px] rounded-2xl overflow-hidden mb-3 bg-slate-100 border border-slate-200 shadow-inner">
                <img 
                  src={activeModalImage} 
                  alt={selectedProperty.title} 
                  className="w-full h-full object-cover transition duration-300" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {selectedProperty.price}
                </div>
              </div>

              {/* Thumbnails */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {[selectedProperty.image, ...selectedProperty.images].map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveModalImage(img)}
                      className={`relative h-20 rounded-xl overflow-hidden border transition ${
                        activeModalImage === img ? 'border-slate-900 ring-2 ring-slate-900/30' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left Column: Specs, Description, Amenities */}
              <div className="md:col-span-2 space-y-6">
                
                <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl text-xs text-slate-700 border border-slate-200 shadow-sm text-center">
                  <div>
                    <strong className="block text-slate-900 text-sm font-medium">{selectedProperty.beds}</strong> 
                    <span className="text-[11px] text-slate-500">Bedrooms</span>
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-medium">{selectedProperty.baths}</strong> 
                    <span className="text-[11px] text-slate-500">Bathrooms</span>
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-medium">{selectedProperty.sqft}</strong> 
                    <span className="text-[11px] text-slate-500">Total Area</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">About Residence</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">{selectedProperty.description}</p>
                </div>

                {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-slate-500 tracking-wider mb-3">Key Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProperty.amenities.map(amenity => (
                        <div key={amenity.id} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Inquiry Form inside Modal */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Private Client Services</span>
                  <h4 className="text-base font-medium text-slate-900 mb-2">Schedule a Viewing</h4>
                  <p className="text-[11px] text-slate-500 mb-4 font-light">
                    Connect directly with our advisory team for this residence.
                  </p>
                </div>

                {inquirySubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <h5 className="text-xs font-semibold text-slate-900">Inquiry Confirmed</h5>
                    <p className="text-[11px] text-slate-600 mt-0.5">We will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if(fullName && email) setInquirySubmitted(true); }} className="space-y-3">
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Your Full Name *" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                      required
                    />
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Email Address *" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                      required
                    />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="Phone Number" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                    <button 
                      type="submit"
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Request Private Tour
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}