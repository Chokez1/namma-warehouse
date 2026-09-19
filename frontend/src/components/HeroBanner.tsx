import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Phone,
  Share2,
  Eye,
  Check,
  CheckCircle2,
  Building2,
  X,
  Send,
} from 'lucide-react';

interface HeroBannerProps {
  onEnquire?: () => void;
  activeHubCount?: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onEnquire,
  activeHubCount = 3,
}) => {
  const [showShareToast, setShowShareToast] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    phone: '',
    warehouseArea: 'Central Bengaluru',
    capacityNeed: '500 - 2,000 sq ft',
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      setIsEnquiryModalOpen(false);
      setEnquirySuccess(false);
    }, 2000);
  };

  return (
    <div className="relative w-[90%] mx-auto">
      {/* Main Hero Card resized to 90% of page */}
      <div
        id="hero-banner-card"
        className="group relative w-full rounded-3xl overflow-hidden border border-[#DCD3C0] hover:border-amber-400/70 shadow-md hover:shadow-2xl bg-stone-950 text-white min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-8 md:p-10 transition-all duration-500 cursor-pointer"
      >
        {/* Background Warehouse Image with interactive cursor hover highlight */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform group-hover:scale-105 group-hover:brightness-125 group-hover:contrast-105 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />

        {/* Dynamic Gradient Overlay that illuminates the image when cursor is on it */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/70 to-stone-950/80 transition-opacity duration-700 group-hover:opacity-65 pointer-events-none" />

        {/* Warm golden ambient spotlight glow highlighting the facility on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 via-amber-400/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-3 flex-wrap z-10">
          {/* Left pill: • Namma Storage • Bengaluru Central Hub */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md border border-white/15 text-stone-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse"></span>
            <span>Namma Storage • Bengaluru Central Hub</span>
          </div>

          {/* Right pill: ✨ Grade-A Smart Facility */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-950/60 backdrop-blur-md border border-teal-400/40 text-teal-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Grade-A Smart Facility</span>
          </div>
        </div>

        {/* Middle Content Section - Original vertical spacing and text hierarchy */}
        <div className="my-8 md:my-10 max-w-4xl z-10 space-y-4">
          {/* Sub-badges: ISO Certified & CCTV Compliant */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#EA580C] text-white shadow-xs">
              ISO CERTIFIED FACILITIES
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-semibold bg-black/55 backdrop-blur-sm border border-white/20 text-stone-200">
              100% CCTV & Fire Compliant
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.15] font-['Space_Grotesk',sans-serif]">
            Taking Care of Your Storage & Logistics Needs
          </h1>

          {/* Sub-paragraph */}
          <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed font-normal pt-1">
            Ultra-modern, temperature-regulated micro-warehouses and strategic fulfillment centers deployed across Bengaluru to conquer peak Outer Ring Road congestion and optimize last-mile SLAs.
          </p>

          {/* High-Bay Automated Racking Pill */}
          <div className="pt-2 flex justify-start sm:justify-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/65 backdrop-blur-md border border-white/20 text-stone-300 shadow-sm">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>High-Bay Automated Racking - 24/7 Security</span>
            </div>
          </div>
        </div>

        {/* Bottom Status & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/15 z-10">
          {/* Left Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/70 backdrop-blur-sm border border-emerald-400/40 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{activeHubCount} Bengaluru Micro-Hubs Active</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/55 backdrop-blur-sm border border-white/20 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Zero-Loss Guarantee</span>
            </div>
          </div>

          {/* Right Action Buttons matching screenshot */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* Bright Orange Enquire Now button */}
            <button
              id="hero-enquire-btn"
              onClick={() => {
                setIsEnquiryModalOpen(true);
                onEnquire?.();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#D44B07] text-white font-bold text-sm shadow-lg shadow-orange-950/30 active:scale-[0.98] transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Enquire Now</span>
            </button>

            {/* Dark Share button */}
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
              title="Share logistics hub"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Share toast feedback */}
        {showShareToast && (
          <div className="absolute top-4 right-4 z-30 bg-emerald-900/90 text-white text-xs font-semibold px-4 py-2 rounded-xl backdrop-blur-md border border-emerald-500/40 shadow-lg flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Link copied to clipboard!</span>
          </div>
        )}
      </div>

      {/* Enquiry Modal */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5D7BF] p-6 text-[#261B14] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#EA580C]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#261B14]">
                  Storage & Hub Booking Enquiry
                </h3>
                <p className="text-xs text-stone-500">
                  Namma Warehouse Bengaluru Logistics Operations
                </p>
              </div>
            </div>

            {enquirySuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-stone-800">Enquiry Submitted!</h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Our Bengaluru fulfillment coordinator will reach out to you within 30 minutes with slot availability and pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEnquiry} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Swaminathan"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D8CABE] focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Company / Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. RapidMart Express"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8CABE] focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8CABE] focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Preferred Hub Corridor
                    </label>
                    <select
                      value={formState.warehouseArea}
                      onChange={(e) => setFormState({ ...formState, warehouseArea: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8CABE] focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      <option value="Central Bengaluru">Central Bengaluru</option>
                      <option value="Whitefield / East">Whitefield / East</option>
                      <option value="Peenya / North">Peenya / North</option>
                      <option value="Electronic City / South">Electronic City / South</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Capacity Needed
                    </label>
                    <select
                      value={formState.capacityNeed}
                      onChange={(e) => setFormState({ ...formState, capacityNeed: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#D8CABE] focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      <option value="500 - 2,000 sq ft">500 - 2,000 sq ft</option>
                      <option value="2,000 - 10,000 sq ft">2,000 - 10,000 sq ft</option>
                      <option value="10,000+ sq ft (Bulk)">10,000+ sq ft (Bulk)</option>
                      <option value="Pallet Storage (10-100 Pallets)">Pallet Storage (10-100)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-[#D8CABE] text-stone-600 font-semibold hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#EA580C] hover:bg-[#D44B07] text-white font-bold shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
