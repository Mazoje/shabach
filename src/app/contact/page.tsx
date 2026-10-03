'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Compass, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Menu, 
  X, 
  Briefcase, 
  DollarSign, 
  MessageSquare,
  ShieldCheck,
  Check
} from 'lucide-react';

interface BookingFormData {
  serviceCategory: 'architecture' | 'realestate' | 'dual';
  serviceType: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  projectBudget: string;
  locationOrSite: string;
  additionalNotes: string;
}

export default function ConsultationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<BookingFormData>({
    serviceCategory: 'architecture',
    serviceType: 'Architectural Design & Masterplanning',
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTimeSlot: '10:00 AM - 11:30 AM',
    projectBudget: '$500,000 - $1,000,000',
    locationOrSite: 'Lagos (Ikoyi / Lekki / Victoria Island)',
    additionalNotes: ''
  });

  // Services Mapping
  const serviceOptions = {
    architecture: [
      'Architectural Design & Masterplanning',
      'Bespoke Interior Architecture',
      'Sustainable Eco-Villa Development',
      'Renovation & Spatial Restructuring'
    ],
    realestate: [
      'Off-Plan Property Acquisition',
      'Luxury Villa & Penthouse Buying Brief',
      'Real Estate Wealth & Yield Advisory',
      'Commercial Asset Investment'
    ],
    dual: [
      'Turnkey Design & Build Mandate',
      'Integrated Land Acquisition & Architectural Masterplan',
      'Property Portfolio Rehabilitation & Redesign'
    ]
  };

  const timeSlots = [
    '09:00 AM - 10:30 AM',
    '11:00 AM - 12:30 PM',
    '02:00 PM - 03:30 PM',
    '04:00 PM - 05:30 PM'
  ];

  const budgetRanges = [
    'Under $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1,000,000',
    '$1,000,000 - $5,000,000+'
  ];

  const handleCategoryChange = (category: 'architecture' | 'realestate' | 'dual') => {
    setFormData({
      ...formData,
      serviceCategory: category,
      serviceType: serviceOptions[category][0]
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#121820] font-sans antialiased selection:bg-slate-200 selection:text-[#121820]">
      
      

      {/* 2. HERO HEADER SECTION */}
      <section className="relative pt-44 pb-20 bg-[#0D131A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0D131A] via-[#0D131A]/80 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-slate-400 uppercase block mb-3">
              Private Executive Advisory
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.15] mb-6">
              Schedule Your Private <br />
              <span className="font-serif italic text-white font-normal">Strategy Session</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-xl">
              Engage directly with our lead architects and real estate investment directors to conceptualize your luxury project or structure your next property acquisition.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MULTI-STEP BOOKING FORM SECTION */}
      <section id="consultation" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Step Visualizer & Benefits Card */}
          <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-2">
                Consultation Workflow
              </span>
              <h3 className="text-2xl font-light text-slate-900">
                Simple <span className="font-serif italic font-normal">3-Step Process</span>
              </h3>
            </div>

            {/* Step Indicators */}
            <div className="space-y-6">
              {[
                { step: 1, title: 'Select Service & Domain', desc: 'Choose between architectural design, property buying, or dual mandates.' },
                { step: 2, title: 'Choose Date & Time Slot', desc: 'Pick an available executive slot that aligns with your schedule.' },
                { step: 3, title: 'Project Brief & Contact', desc: 'Provide site/budget details and confirm your consultation.' }
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition ${
                    bookingStep === item.step 
                      ? 'bg-[#0D131A] text-white' 
                      : bookingStep > item.step 
                        ? 'bg-slate-200 text-slate-900' 
                        : 'bg-slate-100 text-slate-400'
                  }`}>
                    {bookingStep > item.step ? <Check className="w-4 h-4" /> : item.step}
                  </div>
                  <div>
                    <h4 className={`text-xs font-semibold ${bookingStep === item.step ? 'text-slate-900' : 'text-slate-500'}`}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-light mt-0.5 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantees Box */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-slate-900" /> Executive Assurance
              </div>
              <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                All consultations remain strictly confidential under Non-Disclosure Agreements upon request.
              </p>
            </div>
          </div>

          {/* RIGHT: Dynamic Form Panel */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
            
            {submitted ? (
              /* Success Confirmation */
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                    Booking Confirmed
                  </span>
                  <h3 className="text-3xl font-light text-slate-900">
                    Thank You, <span className="font-serif italic font-normal">{formData.fullName}</span>
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 font-light mt-2 max-w-md mx-auto">
                    Your consultation request for <strong>{formData.serviceType}</strong> on <strong>{formData.preferredDate}</strong> ({formData.preferredTimeSlot}) has been logged.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-medium text-slate-800">{formData.serviceType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Scheduled Time:</span>
                    <span className="font-medium text-slate-800">{formData.preferredDate} ({formData.preferredTimeSlot})</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Estimated Budget:</span>
                    <span className="font-medium text-slate-800">{formData.projectBudget}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-light">
                  An executive invitation with a calendar attachment and video conference link has been sent to <strong>{formData.email}</strong>.
                </p>

                <button
                  onClick={() => { setSubmitted(false); setBookingStep(1); }}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              /* Multi-step Form Content */
              <form onSubmit={handleNextStep} className="space-y-8">
                
                {/* STEP 1: SERVICE CATEGORY & TYPE */}
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                        Step 1 of 3
                      </span>
                      <h3 className="text-2xl font-light text-slate-900">
                        Select Consultation <span className="font-serif italic font-normal">Domain</span>
                      </h3>
                    </div>

                    {/* Category Selector Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'architecture', label: 'Architectural Studio', icon: Compass },
                        { id: 'realestate', label: 'Real Estate Sales', icon: Building2 },
                        { id: 'dual', label: 'Integrated Mandate', icon: Briefcase }
                      ].map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id as any)}
                            className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between h-28 ${
                              formData.serviceCategory === cat.id 
                                ? 'border-[#0D131A] bg-[#0D131A] text-white shadow-sm' 
                                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                            }`}
                          >
                            <Icon className="w-5 h-5 mb-2" />
                            <span className="text-xs font-medium leading-snug">{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Service Type Specific Options */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Specific Offering Required
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition"
                      >
                        {serviceOptions[formData.serviceCategory].map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Target Capital / Budget Bracket
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {budgetRanges.map((range) => (
                          <button
                            type="button"
                            key={range}
                            onClick={() => setFormData({ ...formData, projectBudget: range })}
                            className={`py-2.5 px-3 rounded-xl border text-[11px] font-medium transition ${
                              formData.projectBudget === range
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: DATE & TIME SELECTION */}
                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                        Step 2 of 3
                      </span>
                      <h3 className="text-2xl font-light text-slate-900">
                        Choose Executive <span className="font-serif italic font-normal">Time Slot</span>
                      </h3>
                    </div>

                    {/* Date Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Preferred Date
                      </label>
                      <input 
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition"
                      />
                    </div>

                    {/* Time Slot Grid */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Available Consultation Windows (WAT / GMT+1)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setFormData({ ...formData, preferredTimeSlot: slot })}
                            className={`p-3.5 rounded-2xl border text-xs font-medium transition flex items-center justify-between ${
                              formData.preferredTimeSlot === slot
                                ? 'bg-[#0D131A] text-white border-[#0D131A]'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5" />
                              {slot}
                            </span>
                            {formData.preferredTimeSlot === slot && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Site Location */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Project Site / Target District Location
                      </label>
                      <input 
                        type="text"
                        name="locationOrSite"
                        placeholder="e.g., Banana Island, Ikoyi, Victoria Island, or International"
                        value={formData.locationOrSite}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT INFORMATION & CONFIRMATION */}
                {bookingStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase block mb-1">
                        Step 3 of 3
                      </span>
                      <h3 className="text-2xl font-light text-slate-900">
                        Client Details & <span className="font-serif italic font-normal">Project Brief</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input 
                          type="text"
                          name="fullName"
                          required
                          placeholder="Lord / Lady / Dr. / Mr. / Mrs."
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                          Email Address *
                        </label>
                        <input 
                          type="email"
                          name="email"
                          required
                          placeholder="client@domain.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Direct Phone Number / WhatsApp
                      </label>
                      <input 
                        type="tel"
                        name="phone"
                        placeholder="+234 800 000 0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                        Project Brief / Specific Notes
                      </label>
                      <textarea 
                        name="additionalNotes"
                        rows={3}
                        placeholder="Detail any initial concepts, plot sizes, architectural preferences, or investment expectations..."
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-slate-900 transition resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {bookingStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setBookingStep(bookingStep - 1)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
                  >
                    {bookingStep === 3 ? 'Confirm Consultation Request' : 'Continue to Next Step'} 
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>


    </div>
  );
}