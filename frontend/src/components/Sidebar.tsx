import React from 'react';
import {
  LayoutDashboard,
  GitFork,
  BarChart3,
  Database,
  Settings,
  Leaf,
  Cpu,
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'scenarios' | 'analytics' | 'data' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'scenarios' | 'analytics' | 'data' | 'settings') => void;
  pointCount: number;
}

interface NavItem {
  id: 'dashboard' | 'scenarios' | 'analytics' | 'data' | 'settings';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  pointCount,
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scenarios', label: 'Scenarios', icon: GitFork, badge: 'Sim' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'data', label: 'Data', icon: Database, badge: `${pointCount}` },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-56 bg-[#FAF5EB] border-r border-[#E8E0CE] flex flex-col justify-between shrink-0 h-[calc(100vh-61px)] sticky top-[61px] z-20 transition-all select-none">
      {/* Navigation Items */}
      <div className="p-3">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-150 group ${
                  isActive
                    ? 'bg-[#FDE89C] text-[#3D270C] shadow-2xs border border-amber-300'
                    : 'text-[#696157] hover:text-[#1F1A16] hover:bg-[#F2ECE0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#8A562B]' : 'text-[#8A8175] group-hover:text-[#1F1A16]'
                    }`}
                  />
                  <span className="font-semibold text-xs tracking-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-[#8A562B] text-white'
                        : 'bg-[#EADFCB] text-[#696157]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Illustrated Eco Delivery Truck & Green Tomorrow Motto */}
      <div className="p-3.5 border-t border-[#E8E0CE] bg-[#F5EFE0]/60 space-y-3">
        {/* Solver Engine Pill */}
        <div className="p-2 rounded-lg bg-white/80 border border-[#E8E0CE] text-[11px] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-1.5 text-[#5C544C]">
            <Cpu className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-medium">BBMP Solver</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Active
          </span>
        </div>

        {/* Illustrated Scene: Delivery Van + Grass knoll + Motto */}
        <div className="pt-2 text-center relative overflow-hidden">
          <div className="flex justify-center items-end relative h-12 mb-1">
            {/* Green grassy mound */}
            <div className="absolute -bottom-2 w-36 h-8 bg-emerald-100/90 rounded-t-full border-t border-emerald-300/60"></div>

            {/* Little trees */}
            <div className="absolute bottom-1 left-9 flex items-end gap-1">
              <span className="w-2 h-4 bg-emerald-600 rounded-t-full"></span>
              <span className="w-2.5 h-6 bg-emerald-700 rounded-t-full"></span>
            </div>
            <div className="absolute bottom-1 right-8 flex items-end gap-1">
              <span className="w-2.5 h-5 bg-emerald-600 rounded-t-full"></span>
            </div>

            {/* Cute Yellow Delivery Truck */}
            <div className="relative z-10 mb-0.5">
              <svg
                className="w-8 h-8 text-amber-900 drop-shadow-xs"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" fill="#FBBF24" />
                <path d="M15 18H9" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" fill="#F59E0B" />
                <circle cx="17" cy="18" r="2" fill="#26211C" />
                <circle cx="7" cy="18" r="2" fill="#26211C" />
              </svg>
            </div>
          </div>

          {/* Slogan with Leaf */}
          <div className="flex items-center justify-center gap-1 text-[11px] text-[#5C544C] font-serif italic mt-1">
            <span>"Better logistics. A greener tomorrow."</span>
            <Leaf className="w-3.5 h-3.5 text-emerald-600 shrink-0 not-italic" />
          </div>
        </div>
      </div>
    </aside>
  );
};
