'use client';

import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react';
import {
  Building2,
  Building,
  Home,
  DollarSign,
  Layers,
  Search,
  Plus,
  Eye,
  CheckCircle2,
  TrendingUp,
  FileText,
  X,
  Grid,
  List,
  Sparkles,
  MapPin,
  ShieldCheck,
  HardHat,
  AlertCircle,
  Download,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  createUnitAction, 
  updateUnitStatusAction, 
  createMilestoneAction, 
  createPropertyAction, 
  updatePropertyAction, 
  deletePropertyAction 
} from '@/actions/admin';
import { adminLogoutAction } from '@/actions/auth';
import { LogOut } from 'lucide-react';

export type TabType = 'units' | 'projects' | 'construction';
export type ViewMode = 'grid' | 'table';

export default function AdminClient({ initialProjects, initialUnits, initialMilestones }: { initialProjects: any[]; initialUnits: any[]; initialMilestones: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [units, setUnits] = useState(initialUnits);
  const [milestones, setMilestones] = useState(initialMilestones);

  // Filters & Views
  const [activeTab, setActiveTab] = useState<TabType>('units');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [selectedUnit, setSelectedUnit] = useState<any | null>(null);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState<boolean>(false);
  const [isAddLogModalOpen, setIsAddLogModalOpen] = useState<boolean>(false);
  
  // Property Add/Edit Modals
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState<boolean>(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  // Property Form State
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '3',
    bathrooms: '3.5',
    sqft: '2500',
    coverImage: '',
    gallery: [] as string[],
    city: 'Lagos',
    country: 'Nigeria',
    intent: 'buy' as 'buy' | 'rent' | 'offplan',
    category: 'Villa'
  });

  // Unit Form State
  const [newUnitForm, setNewUnitForm] = useState({
    unitNumber: '',
    propertyName: projects[0]?.title || '',
    type: 'Executive Residence',
    bedrooms: '3',
    bathrooms: '3.5',
    sqm: '250',
    floor: '5th Floor',
    orientation: 'Ocean View',
    price: '1250000',
    status: 'AVAILABLE' as string,
    interiorPackage: 'Royale Obsidian & Venetian Marble'
  });

  const [newLogForm, setNewLogForm] = useState({
    title: '',
    project: projects[0]?.title || 'Imperium Heights',
    inspector: '',
    notes: '',
    type: 'Quality Assurance'
  });

  // Helper: Convert File from Device to Data URL
  const handleCoverFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPropertyForm(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      const galleryUrls: string[] = [];

      fileList.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          galleryUrls.push(reader.result as string);
          if (galleryUrls.length === fileList.length) {
            setPropertyForm(prev => ({ ...prev, gallery: [...prev.gallery, ...galleryUrls] }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Filtered Units
  const filteredUnits = useMemo(() => {
    return units.filter((unit: any) => {
      const matchesProject =
        selectedProjectFilter === 'all' || unit.propertyId === selectedProjectFilter;
      const matchesStatus =
        selectedStatusFilter === 'all' || unit.status === selectedStatusFilter;
      const matchesSearch =
        unit.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (unit.property?.title && unit.property.title.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesProject && matchesStatus && matchesSearch;
    });
  }, [units, selectedProjectFilter, selectedStatusFilter, searchQuery]);

  // Analytics
  const analytics = useMemo(() => {
    const totalInventoryValue = units.reduce((acc: number, curr: any) => acc + (curr.price || 0), 0);
    const availableCount = units.filter((u: any) => u.status === 'AVAILABLE' || u.status === 'Available').length;
    const reservedCount = units.filter((u: any) => u.status === 'RESERVED' || u.status === 'Reserved').length;
    const contractedCount = units.filter((u: any) => u.status === 'UNDER_CONTRACT' || u.status === 'Under Contract').length;
    const soldCount = units.filter((u: any) => u.status === 'SOLD' || u.status === 'Sold').length;

    const totalUnitsCount = units.length;
    const reservedOrSolds = reservedCount + contractedCount + soldCount;
    const absorptionRate =
      totalUnitsCount > 0 ? ((reservedOrSolds / totalUnitsCount) * 100).toFixed(0) : '0';

    return {
      totalInventoryValue,
      availableCount,
      reservedCount,
      contractedCount,
      soldCount,
      totalUnitsCount,
      absorptionRate,
      avgCompletion: '78'
    };
  }, [units]);

  // --- Handlers ---

  const handleStatusChange = async (unitId: string, newStatus: string) => {
    const res = await updateUnitStatusAction(unitId, newStatus);
    if (res.success) {
      setUnits((prev: any[]) => prev.map((u: any) => (u.id === unitId ? { ...u, status: newStatus } : u)));
      if (selectedUnit && selectedUnit.id === unitId) {
        setSelectedUnit((prev: any) => (prev ? { ...prev, status: newStatus } : null));
      }
    } else {
      alert(res.error);
    }
  };

  const handleCreateUnit = async (e: FormEvent) => {
    e.preventDefault();
    const matchedProject = projects.find(
      (p: any) => p.title.toLowerCase() === newUnitForm.propertyName.toLowerCase()
    );
    const propertyId = matchedProject?.id || projects[0]?.id;

    if (!propertyId) {
      alert("Please specify a valid property project name.");
      return;
    }

    const res = await createUnitAction({
      unitNumber: newUnitForm.unitNumber,
      propertyId: propertyId,
      type: newUnitForm.type,
      bedrooms: Number(newUnitForm.bedrooms),
      bathrooms: Number(newUnitForm.bathrooms),
      sqm: Number(newUnitForm.sqm),
      floor: newUnitForm.floor,
      orientation: newUnitForm.orientation,
      price: Number(newUnitForm.price),
      status: newUnitForm.status,
      interiorPackage: newUnitForm.interiorPackage,
    });

    if (res.success && res.data) {
      setUnits([res.data, ...units]);
      setIsAddUnitModalOpen(false);
    } else {
      alert(res.error);
    }
  };

  const handleSaveProperty = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      title: propertyForm.title,
      description: propertyForm.description,
      price: Number(propertyForm.price) || 1000000,
      bedrooms: Number(propertyForm.bedrooms) || 3,
      bathrooms: Number(propertyForm.bathrooms) || 3,
      sqft: Number(propertyForm.sqft) || 2000,
      coverImage: propertyForm.coverImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      gallery: propertyForm.gallery,
      city: propertyForm.city,
      country: propertyForm.country,
      intent: propertyForm.intent,
      category: propertyForm.category,
    };

    if (editingProperty) {
      const res = await updatePropertyAction(editingProperty.id, payload);
      if (res.success && res.data) {
        setProjects(projects.map((p: any) => p.id === editingProperty.id ? res.data : p));
        setEditingProperty(null);
      } else {
        alert(res.error);
      }
    } else {
      const res = await createPropertyAction(payload);
      if (res.success && res.data) {
        setProjects([res.data, ...projects]);
        setIsAddPropertyModalOpen(false);
      } else {
        alert(res.error);
      }
    }

    setPropertyForm({
      title: '',
      description: '',
      price: '',
      bedrooms: '3',
      bathrooms: '3.5',
      sqft: '2500',
      coverImage: '',
      gallery: [],
      city: 'Lagos',
      country: 'Nigeria',
      intent: 'buy',
      category: 'Villa'
    });
  };

  const handleEditInit = (proj: any) => {
    setEditingProperty(proj);
    setPropertyForm({
      title: proj.title || '',
      description: proj.description || '',
      price: String(proj.price || ''),
      bedrooms: String(proj.bedrooms || 3),
      bathrooms: String(proj.bathrooms || 3),
      sqft: String(proj.sqft || 2500),
      coverImage: proj.coverImage || '',
      gallery: proj.gallery || [],
      city: proj.city || 'Lagos',
      country: proj.country || 'Nigeria',
      intent: proj.status === 'PLANNED' ? 'offplan' : proj.listingType === 'FOR_RENT' ? 'rent' : 'buy',
      category: proj.type?.includes('PENTHOUSE') ? 'Penthouse' : 'Villa'
    });
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm("Are you sure you want to delete this property listing?")) {
      const res = await deletePropertyAction(id);
      if (res.success) {
        setProjects(projects.filter((p: any) => p.id !== id));
      } else {
        alert(res.error);
      }
    }
  };

  const handleCreateLog = async (e: FormEvent) => {
    e.preventDefault();
    const res = await createMilestoneAction({
      title: newLogForm.title,
      projectName: newLogForm.project,
      inspector: newLogForm.inspector,
      notes: newLogForm.notes,
      type: newLogForm.type,
    });
    if (res.success) {
      const newLog = {
        id: `m-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        ...newLogForm,
        inspector: newLogForm.inspector || 'Senior Structural Engineer',
      };
      setMilestones([newLog, ...milestones]);
      setIsAddLogModalOpen(false);
    }
  };

  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const getStatusBadge = (status: string): string => {
    switch (status) {
      case 'AVAILABLE':
      case 'Available':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'RESERVED':
      case 'Reserved':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'UNDER_CONTRACT':
      case 'Under Contract':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'SOLD':
      case 'Sold':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121820] font-sans pb-20 selection:bg-slate-200">
      
      {/* Header */}
      <header className="bg-[#0D131A] text-white pt-10 pb-16 px-6 md:px-12 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Developer Back-Office
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                Property & Unit <span className="font-serif italic text-white font-normal">Management</span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAddPropertyModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-medium text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property Listing</span>
              </button>
              <button
                onClick={() => setIsAddUnitModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Inventory Unit</span>
              </button>
              <button
                onClick={() => setIsAddLogModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all backdrop-blur-md border border-white/10 flex items-center gap-2 cursor-pointer"
              >
                <HardHat className="w-4 h-4 text-emerald-400" />
                <span>Log Milestone</span>
              </button>
              <form action={adminLogoutAction}>
  <button
    type="submit"
    className="px-4 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium text-xs transition-all border border-red-500/20 flex items-center gap-2 cursor-pointer"
    title="Sign Out"
  >
    <LogOut className="w-3.5 h-3.5" />
    <span>Sign Out</span>
  </button>
</form>
            </div>
          </div>

          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Total Portfolio Value</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl md:text-2xl font-light text-white">
                {formatCurrency(analytics.totalInventoryValue)}
              </p>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{projects.length} Active Properties</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Available Inventory</span>
                <Home className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl md:text-2xl font-light text-white">
                {analytics.availableCount} <span className="text-sm text-slate-400">/ {analytics.totalUnitsCount} Units</span>
              </p>
              <div className="mt-2 text-[11px] text-slate-400">
                <span>{analytics.reservedCount} Reserved • {analytics.contractedCount} Under Contract</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Sales Absorption</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl md:text-2xl font-light text-white">
                {analytics.absorptionRate}%
              </p>
              <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{analytics.soldCount} Units Fully Settled</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Avg Build Progress</span>
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xl md:text-2xl font-light text-white">
                {analytics.avgCompletion}%
              </p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: `${analytics.avgCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Standalone Control Section */}
      <section className="bg-[#FDFBF7] pt-8 pb-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-3 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('units')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'units'
                    ? 'bg-[#0D131A] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Unit Matrix ({units.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-[#0D131A] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Property Catalog ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('construction')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'construction'
                    ? 'bg-[#0D131A] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>Construction Logs ({milestones.length})</span>
              </button>
            </div>

            {/* Quick Filters */}
            {activeTab === 'units' && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search unit, buyer, project..."
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 w-48 md:w-60"
                  />
                </div>

                <select
                  value={selectedProjectFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedProjectFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="all">All Properties</option>
                  {projects.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none font-medium cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="UNDER_CONTRACT">Under Contract</option>
                  <option value="SOLD">Sold</option>
                </select>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-md transition cursor-pointer ${
                      viewMode === 'table' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Table View"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-6">

        {/* Tab 1: Unit Matrix */}
        {activeTab === 'units' && (
          <div>
            {filteredUnits.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-800">No matching units found</h3>
                <p className="text-xs text-slate-500 mt-1">Try resetting your search query or status filter.</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUnits.map((unit: any) => (
                  <div
                    key={unit.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                            {unit.property?.title || 'Standalone Residence'}
                          </span>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition">
                            {unit.unitNumber}
                          </h3>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                            unit.status
                          )}`}
                        >
                          {unit.status}
                        </span>
                      </div>

                      <p className="text-xs font-light text-slate-500 mb-4">{unit.type}</p>

                      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl mb-5 text-center">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase block">Bedrooms</span>
                          <span className="text-xs font-semibold text-slate-800">{unit.bedrooms} Beds</span>
                        </div>
                        <div className="border-x border-slate-200">
                          <span className="text-[10px] text-slate-400 uppercase block">Area</span>
                          <span className="text-xs font-semibold text-slate-800">{unit.sqm} sqm</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase block">Floor</span>
                          <span className="text-xs font-semibold text-slate-800">{unit.floor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Asking Price</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {formatCurrency(unit.price)}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedUnit(unit)}
                        className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition flex items-center gap-1 text-xs font-medium cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Unit Designation</th>
                        <th className="px-6 py-4">Property Project</th>
                        <th className="px-6 py-4">Type & Layout</th>
                        <th className="px-6 py-4">Area (sqm)</th>
                        <th className="px-6 py-4">Asking Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUnits.map((unit: any) => (
                        <tr key={unit.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-6 py-4">
                            <span className="font-semibold text-slate-900 block">{unit.unitNumber}</span>
                            <span className="text-[10px] text-slate-400">{unit.floor}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">{unit.property?.title}</td>
                          <td className="px-6 py-4">
                            <span className="text-slate-800 block">{unit.type}</span>
                            <span className="text-[10px] text-slate-400">
                              {unit.bedrooms} Bed • {unit.bathrooms} Bath
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-700 font-mono">{unit.sqm} sqm</td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {formatCurrency(unit.price)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(
                                unit.status
                              )}`}
                            >
                              {unit.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setSelectedUnit(unit)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-semibold transition cursor-pointer"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Property Catalog (Clean Card without "View Public Page") */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((proj: any) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      <button
                        onClick={() => handleEditInit(proj)}
                        className="p-2 rounded-xl bg-white/90 text-slate-900 hover:bg-white transition shadow cursor-pointer"
                        title="Edit Property"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProperty(proj.id)}
                        className="p-2 rounded-xl bg-red-500/90 text-white hover:bg-red-600 transition shadow cursor-pointer"
                        title="Delete Property"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                        {proj.city}, {proj.country}
                      </span>
                      <h3 className="text-lg font-semibold">{proj.title}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase block">Listing Intent</span>
                        <span className="font-semibold text-slate-800 uppercase">{proj.listingType === 'FOR_RENT' ? 'Rent' : proj.status === 'PLANNED' ? 'Off-Plan' : 'Buy'}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase block">Base Price</span>
                        <span className="font-semibold text-slate-800">{formatCurrency(proj.price)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 font-light">{proj.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">Gallery Photos: <strong className="text-slate-900">{proj.gallery?.length || 0} attached</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Construction Logs */}
        {activeTab === 'construction' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 max-w-4xl mx-auto">
            <h3 className="text-base font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <HardHat className="w-5 h-5 text-emerald-500" />
              <span>Engineering & Construction Milestone Audit Log</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
              {milestones.map((log: any) => (
                <div key={log.id} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />
                  
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        {log.type}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{log.date}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-900">{log.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Project: <strong>{log.project}</strong></p>

                    <p className="text-xs text-slate-600 mt-3 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                      "{log.notes}"
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Inspected by: {log.inspector}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* INSPECT UNIT DRAWER */}
      {selectedUnit && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">
                    {selectedUnit.property?.title}
                  </span>
                  <h2 className="text-2xl font-light text-slate-900">{selectedUnit.unitNumber}</h2>
                </div>
                <button
                  onClick={() => setSelectedUnit(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    Update Reservation Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['AVAILABLE', 'RESERVED', 'UNDER_CONTRACT', 'SOLD'] as string[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(selectedUnit.id, st)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                          selectedUnit.status === st
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unit Type:</span>
                    <span className="font-semibold text-slate-800">{selectedUnit.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Asking Price:</span>
                    <span className="font-bold text-slate-900">{formatCurrency(selectedUnit.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Surface Area:</span>
                    <span className="font-medium text-slate-800">{selectedUnit.sqm} sqm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Floor Tier:</span>
                    <span className="font-medium text-slate-800">{selectedUnit.floor}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedUnit(null)}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
            >
              Done Inspecting
            </button>
          </div>
        </div>
      )}

      {/* ADD / EDIT PROPERTY MODAL WITH FILE UPLOADER */}
      {(isAddPropertyModalOpen || editingProperty) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => { setIsAddPropertyModalOpen(false); setEditingProperty(null); }}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-semibold text-slate-900 mb-1">
              {editingProperty ? 'Edit Property Listing' : 'Publish Fresh Property Listing'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">Upload photos directly from your device or use image links.</p>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline Residences"
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Asking Price (USD) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1850000"
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Listing Intent</label>
                  <select
                    value={propertyForm.intent}
                    onChange={(e: any) => setPropertyForm({ ...propertyForm, intent: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="buy">For Sale (Buy)</option>
                    <option value="rent">For Rent</option>
                    <option value="offplan">Off-Plan Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Category</label>
                  <select
                    value={propertyForm.category}
                    onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Location (City, Country)</label>
                  <input
                    type="text"
                    placeholder="Ikoyi, Lagos"
                    value={`${propertyForm.city}, ${propertyForm.country}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(',');
                      setPropertyForm({ ...propertyForm, city: parts[0]?.trim() || 'Lagos', country: parts[1]?.trim() || 'Nigeria' });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* COVER IMAGE FILE UPLOADER */}
              <div>
                <label className="block text-slate-600 font-medium mb-1">Cover Image *</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 border-2 border-dashed border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition flex items-center justify-center gap-2 text-slate-600">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>Upload Cover Photo from Device</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleCoverFileUpload} 
                      className="hidden" 
                    />
                  </label>
                  {propertyForm.coverImage && (
                    <img 
                      src={propertyForm.coverImage} 
                      alt="Cover Preview" 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                    />
                  )}
                </div>
              </div>

              {/* GALLERY FILES UPLOADER */}
              <div>
                <label className="block text-slate-600 font-medium mb-1">Gallery Photos (Optional)</label>
                <label className="border-2 border-dashed border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-50 transition flex items-center justify-center gap-2 text-slate-600 w-full mb-2">
                  <ImageIcon className="w-4 h-4 text-slate-400" />
                  <span>Upload Additional Photos from Device</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleGalleryFileUpload} 
                    className="hidden" 
                  />
                </label>

                {propertyForm.gallery.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {propertyForm.gallery.map((img, idx) => (
                      <div key={idx} className="relative group w-12 h-12">
                        <img src={img} alt={`Gallery ${idx}`} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                        <button
                          type="button"
                          onClick={() => setPropertyForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }))}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Property Description</label>
                <textarea
                  rows={3}
                  placeholder="Detail architectural highlights, interior finishes..."
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsAddPropertyModalOpen(false); setEditingProperty(null); }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-semibold shadow-md cursor-pointer"
                >
                  {editingProperty ? 'Save Changes' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD UNIT MODAL */}
      {isAddUnitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddUnitModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-slate-900 mb-1">Add New Inventory Unit</h3>
            <p className="text-xs text-slate-500 mb-6">Create a new unit listing in the Shabach Empire database.</p>

            <form onSubmit={handleCreateUnit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Property Project Name</label>
                <input
                  type="text"
                  required
                  list="property-suggestions"
                  placeholder="e.g. Skyline Residences"
                  value={newUnitForm.propertyName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUnitForm({ ...newUnitForm, propertyName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-slate-400"
                />
                <datalist id="property-suggestions">
                  {projects.map((p: any) => (
                    <option key={p.id} value={p.title} />
                  ))}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Unit Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Penthouse 14B"
                    value={newUnitForm.unitNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUnitForm({ ...newUnitForm, unitNumber: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Asking Price (USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="1500000"
                    value={newUnitForm.price}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUnitForm({ ...newUnitForm, price: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newUnitForm.bedrooms}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUnitForm({ ...newUnitForm, bedrooms: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Bathrooms</label>
                  <input
                    type="text"
                    value={newUnitForm.bathrooms}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUnitForm({ ...newUnitForm, bathrooms: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Area (sqm)</label>
                  <input
                    type="number"
                    value={newUnitForm.sqm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewUnitForm({ ...newUnitForm, sqm: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddUnitModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-semibold shadow-md cursor-pointer"
                >
                  Save & Add Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LOG MODAL */}
      {isAddLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsAddLogModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold text-slate-900 mb-1">Log Engineering Milestone</h3>
            <p className="text-xs text-slate-500 mb-6">Record structural inspections and site progress updates.</p>

            <form onSubmit={handleCreateLog} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elevator Shaft Core Complete"
                  value={newLogForm.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLogForm({ ...newLogForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Project</label>
                  <select
                    value={newLogForm.project}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewLogForm({ ...newLogForm, project: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {projects.map((p: any) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Inspector / Authority</label>
                  <input
                    type="text"
                    placeholder="Engr. Name or Firm"
                    value={newLogForm.inspector}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLogForm({ ...newLogForm, inspector: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Engineering Notes</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter detailed site inspection details..."
                  value={newLogForm.notes}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewLogForm({ ...newLogForm, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddLogModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-md cursor-pointer"
                >
                  Log Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}