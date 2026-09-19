import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  GitFork,
  BarChart3,
  Database,
  Settings,
  X,
  Sparkles,
  ArrowRight,
  Warehouse,
  Leaf,
  ShieldCheck,
} from 'lucide-react';

export type TabType = 'dashboard' | 'scenarios' | 'analytics' | 'data' | 'settings';

interface FeatureDef {
  id: TabType;
  label: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  accentColor: string;
}

interface FeaturesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  pointCount: number;
}

export const FeaturesDrawer: React.FC<FeaturesDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  pointCount,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const features: FeatureDef[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      tagline: 'Spatial Network & Hub Mapping',
      description: 'Interactive map simulator, optimal micro-hub cluster assignments, and real-time transit telemetry.',
      icon: LayoutDashboard,
      accentColor: '#9E471A',
    },
    {
      id: 'scenarios',
      label: 'Scenarios',
      tagline: 'Congestion & Stress Simulation',
      description: 'Simulate peak traffic conditions, monsoon disruptions, and compare multi-hub SLA benchmarks.',
      icon: GitFork,
      badge: 'Sim',
      accentColor: '#B45309',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      tagline: 'Performance & ESG Benchmarks',
      description: 'Deep-dive metrics on 15-minute SLA fulfillment, green route emissions, and logistics cost savings.',
      icon: BarChart3,
      accentColor: '#047857',
    },
    {
      id: 'data',
      label: 'Data',
      tagline: 'BBMP Grid & Coordinates',
      description: 'Ward population density matrices, custom CSV coordinates, and industrial demand points.',
      icon: Database,
      badge: `${pointCount} pts`,
      accentColor: '#4338CA',
    },
    {
      id: 'settings',
      label: 'Settings',
      tagline: 'Parameters & Penalty Weights',
      description: 'Tuning candidate search radius, penalty factors, solver iterations, and cloud sync credentials.',
      icon: Settings,
      accentColor: '#475569',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1F1713]/60 backdrop-blur-xs"
          />

          {/* Slide-out Drawer from Left */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative w-full max-w-md sm:max-w-lg bg-[#FAF5EB] h-full shadow-2xl z-10 flex flex-col border-r border-[#E5DAC4] overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFC9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 4-Square Bento Icon header badge matching user's image */}
                <div className="w-10 h-10 rounded-xl bg-[#332219] flex items-center justify-center text-[#FAF5E8] shadow-xs shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#FAF5E8]"
                  >
                    <rect x="2" y="2" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.2" />
                    <rect x="11.5" y="2" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.2" />
                    <rect x="2" y="11.5" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.2" />
                    <rect x="11.5" y="11.5" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.2" />
                  </svg>
                </div>
                <div>
                  <h2
                    className="text-xl font-bold text-[#261B14] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Namma Features
                  </h2>
                  <p className="text-xs text-[#7A7168]">
                    Tap any feature to navigate & display
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-[#FAF5E8] hover:bg-[#EFE5D0] border border-[#E5DAC4] flex items-center justify-center text-[#5C5248] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Feature Cards List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              <div className="text-[11px] font-bold tracking-wider uppercase text-[#9E471A] px-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
                <span>Select Feature For Display</span>
              </div>

              <div className="space-y-2.5">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  const isSelected = activeTab === feature.id;

                  return (
                    <motion.button
                      key={feature.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setActiveTab(feature.id);
                        onClose();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-4 rounded-2xl transition-all border flex items-start justify-between gap-3.5 group cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#E9CDB0] shadow-sm ring-2 ring-[#9E471A]/20'
                          : 'bg-white/80 hover:bg-white border-[#E8DFC9] hover:border-[#D9CCA8] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'bg-[#FFF8EE] border-[#E9CDB0] text-[#9E471A]'
                              : 'bg-[#FAF7EF] border-[#E8E0CE] text-[#7A7168]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-sm sm:text-base text-[#261B14]">
                              {feature.label}
                            </h3>
                            {feature.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF3E3] text-[#9E471A] border border-[#E9CDB0]">
                                {feature.badge}
                              </span>
                            )}
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#9E471A] text-white">
                                Active Display
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-semibold text-[#9E471A] mt-0.5">
                            {feature.tagline}
                          </p>
                          <p className="text-xs text-[#7A7168] mt-1 line-clamp-2 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 self-center">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#9E471A] text-white'
                              : 'bg-[#FAF5E8] text-[#9E471A] group-hover:bg-[#FFF8EE]'
                          }`}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer Information Banner */}
            <div className="p-4 bg-white border-t border-[#E8DFC9] flex items-center justify-between text-xs text-[#7A7168]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-[#261B14]">24-Hour Logistics Ready</span>
              </div>
              <span className="font-mono text-[11px] text-[#9E471A] bg-[#FAF3E3] px-2 py-0.5 rounded-md border border-[#E8DFC9]">
                Bengaluru Spatial v2.4
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
