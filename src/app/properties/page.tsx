'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  Maximize2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Heart,
  Menu,
  X,
  PhoneCall,
  Mail,
  ArrowUpRight,
  Send,
  Plus,
  Trash2,
  Edit,
  Ruler,
  Compass,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Eye,
  Lock,
  Sparkles
} from 'lucide-react';

// Property interface model
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: 'buy' | 'rent' | 'offplan';
  category: 'Villa' | 'Penthouse' | 'Apartment' | 'Commercial' | 'Land';
  tag: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  description: string;
  featured?: boolean;
}

// Initial Property Data
const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Skyline Residences",
    location: "Ikoyi, Lagos",
    price: "$1,850,000",
    type: "buy",
    category: "Apartment",
    tag: "Ready to Move",
    beds: 3,
    baths: 3,
    sqft: "1,850 Sq.Ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    description: "Ultra-luxury high-rise luxury apartment overlooking the Atlantic ocean with floor-to-ceiling panoramic glass windows and smart home automation.",
    featured: true
  },
  {
    id: 2,
    title: "The Green Villas",
    location: "Banana Island, Lagos",
    price: "$2,400,000",
    type: "buy",
    category: "Villa",
    tag: "Premium",
    beds: 4,
    baths: 4,
    sqft: "2,600 Sq.Ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    description: "Modern eco-conscious luxury villa featuring zero-emission solar systems, private infinity edge pool, and lush manicured gardens.",
    featured: true
  },
  {
    id: 3,
    title: "Shabach Heights",
    location: "Victoria Island, Lagos",
    price: "$1,200,000",
    type: "offplan",
    category: "Penthouse",
    tag: "New Launch",
    beds: 2,
    baths: 2,
    sqft: "1,200 Sq.Ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    description: "Exclusive luxury off-plan penthouse development featuring private rooftop helipad access, concierge services, and bespoke Italian interior finishes.",
    featured: true
  },
  {
    id: 4,
    title: "Lekki Waterfront Estate",
    location: "Lekki Phase 1, Lagos",
    price: "$8,000 / month",
    type: "rent",
    category: "Villa",
    tag: "For Rent",
    beds: 5,
    baths: 5,
    sqft: "3,100 Sq.Ft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
    description: "Spacious waterfront duplex offering direct jetty access, modern security installation, private cinema room, and luxury swimming pool.",
    featured: false
  }
];

export default function ShabachPropertyAndArchitecturalPage() {
  // Navigation & View Modes
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'offplan' | 'all'>('all');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Property State Management (Add, Edit, Delete)
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);

  // Property Form Fields
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

  // Architectural Consultation Form State
  const [archConsultName, setArchConsultName] = useState('');
  const [archConsultEmail, setArchConsultEmail] = useState('');
  const [archConsultScope, setArchConsultScope] = useState('Residential Architecture');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Property Actions: Create or Update
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formLocation || !formPrice) {
      alert("Please fill in all required property details.");
      return;
    }

    const defaultImage = formImage.trim() || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200";

    if (editingPropertyId !== null) {
      // Update Existing
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
      // Add New
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

    // Reset Form
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

  const handleDeleteProperty = (id: number) => {
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

    
      {/* 2. HERO HEADER */}
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

      {/* 3. ADMIN MANAGEMENT FORM (IF ADMIN MODE ACTIVE) */}
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
                  placeholder="e.g. $2,100,000 or $5,000 / month" 
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
                  placeholder="e.g. Ready to Move, New Launch, Exclusive" 
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
                  placeholder="Detail architectural highlights, interior specifications, and location amenities..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="px-6 py-3 rounded-full text-xs font-medium text-slate-400 hover:text-white transition"
                >
                  Reset
                </button>
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

      {/* 4. MAIN PROPERTY DIRECTORY */}
      <section id="properties" className="py-16 px-6 max-w-7xl mx-auto">
        
        {/* Controls & Filters Bar */}
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

        {/* Directory Grid Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900">
              Available <span className="font-serif italic font-normal">Properties</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Showing {filteredProperties.length} properties</p>
          </div>
          {isAdminMode && (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Admin Mode: Click Edit/Delete on cards below
            </span>
          )}
        </div>

        {/* Property Grid */}
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
                  {/* Image Container */}
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

                  {/* Body Content */}
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

                {/* Footer Action Buttons */}
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
                        title="Delete Property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setSelectedProperty(prop)}
                      className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-2"
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

      {/* 5. ARCHITECTURAL SERVICES STUDIO */}
      <section id="architecture" className="py-24 px-6 bg-[#0D131A] text-white relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-2">
              Architectural Studio & Design Consultancy
            </span>
            <h2 className="text-3xl md:text-5xl font-light leading-tight mb-4">
              Crafting <span className="font-serif italic text-white font-normal">architectural masterworks</span>
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-light leading-relaxed">
              In addition to real estate brokerage, Shabach Empire houses an elite architectural practice delivering bespoke residential, commercial, and structural blueprints for visionaries.
            </p>
          </div>

          {/* Architecture Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">Architectural Design & Blueprints</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Comprehensive conceptualization, site analysis, elevation plans, and precise construction documentation crafted to modern international standards.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Structural Engineering</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Sustainable Site Planning</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">Interior Architecture</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                Space optimization, bespoke spatial flow planning, material curation, custom lighting design, and artisanal luxury finishes integration.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Custom Joinery & Lighting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Material Sourcing & Curation</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">3D Photorealistic Visualization</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-6">
                High-definition 3D rendering, virtual walkthrough animations, and BIM modeling allowing developers and owners to experience projects prior to build.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> VR Architectural Tours</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> BIM Modeling</li>
              </ul>
            </div>

          </div>

          {/* Architectural Inquiry Box */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block mb-2">Book a Studio Session</span>
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                Have a vision for a custom architectural project?
              </h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Connect directly with our lead architects to discuss site feasibility, design concepts, project budgeting, and timelines.
              </p>
            </div>

            {consultSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-base font-semibold text-white">Consultation Request Received</h4>
                <p className="text-xs text-slate-300 mt-1">Our principal architect will contact you within 24 business hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setConsultSubmitted(true); }} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  value={archConsultName}
                  onChange={e => setArchConsultName(e.target.value)}
                  placeholder="Your Full Name" 
                  className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                  required
                />
                <input 
                  type="email" 
                  value={archConsultEmail}
                  onChange={e => setArchConsultEmail(e.target.value)}
                  placeholder="Your Email Address" 
                  className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-white/30"
                  required
                />
                <select 
                  value={archConsultScope}
                  onChange={e => setArchConsultScope(e.target.value)}
                  className="bg-[#121820] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 cursor-pointer"
                >
                  <option value="Residential Architecture">Residential Villa Architecture</option>
                  <option value="Commercial Complex">Commercial & High-Rise Design</option>
                  <option value="Interior Refurbishment">Luxury Interior Architecture</option>
                  <option value="Master Planning">Land Master Planning</option>
                </select>
                <button 
                  type="submit"
                  className="bg-white text-slate-900 font-semibold text-xs py-3.5 rounded-xl hover:bg-slate-100 transition mt-1"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 6. PROPERTY DETAIL MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative text-slate-900 shadow-2xl">
            <button 
              onClick={() => setSelectedProperty(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {selectedProperty.category} • {selectedProperty.tag}
            </span>

            <h2 className="text-2xl font-semibold mt-3 mb-1 text-slate-900">{selectedProperty.title}</h2>
            <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
              <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedProperty.location}
            </p>

            <div className="text-xl font-semibold text-slate-900 mb-6">{selectedProperty.price}</div>

            <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 mb-6">
              <div><strong className="block text-slate-900">Bedrooms</strong> {selectedProperty.beds} Beds</div>
              <div><strong className="block text-slate-900">Bathrooms</strong> {selectedProperty.baths} Baths</div>
              <div><strong className="block text-slate-900">Total Area</strong> {selectedProperty.sqft}</div>
            </div>

            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2">Description</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed mb-6">{selectedProperty.description}</p>

            <div className="flex gap-3">
              <a 
                href="#contact" 
                onClick={() => setSelectedProperty(null)}
                className="flex-1 py-3 rounded-full bg-slate-900 text-white text-xs font-semibold text-center hover:bg-slate-800 transition"
              >
                Schedule Private Viewing
              </a>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}