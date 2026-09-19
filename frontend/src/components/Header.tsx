import React, { useState, useEffect } from 'react';
import {
  Bell,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { CITIES } from '../data/cityData';
import { CityOption, UserNotification } from '../types';

interface HeaderProps {
  selectedCity: CityOption;
  onSelectCity: (city: CityOption) => void;
  onOpenDemoTour: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onSelectCity,
  onOpenDemoTour,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<UserNotification[]>([
    {
      id: '1',
      time: '10m ago',
      title: 'Optimal Configuration Ready',
      detail: '3 candidate hubs selected with 94.2% SLA compliance in Bengaluru.',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      time: '1h ago',
      title: 'Peak Traffic Alert',
      detail: 'Outer Ring Road traffic index reached 0.92 during morning peak hours.',
      read: false,
      type: 'warning',
    },
    {
      id: '3',
      time: '2h ago',
      title: 'BBMP Spatial Data Synced',
      detail: '800 coordinate grid nodes updated with Census density weighting.',
      read: true,
      type: 'info',
    },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white border-b border-[#E7E2D4] px-6 py-3.5 sticky top-0 z-20 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Greeting & Subtitle */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#1C1917] tracking-tight">
              Good Morning, Puneet
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Network
            </span>
          </div>
          <p className="text-xs text-[#78716C] mt-0.5">
            Here&apos;s how your logistics network is performing today.
          </p>
        </div>

        {/* Right: Date, Time, City Selector, Demo Button, Notifications */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Hackathon Demo Walkthrough Button */}
          <button
            id="demo-mode-header-btn"
            onClick={onOpenDemoTour}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95"
            title="Launch guided interactive judge demo"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>⚡ Demo Mode</span>
          </button>

          {/* Date & Time Widget */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-[#FAF7EF] rounded-lg border border-[#E7E2D4] text-xs text-[#57534E]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#78716C]" />
              <span>{dateStr || 'Sat, Sep 19, 2026'}</span>
            </div>
            <span className="text-[#D6CCBA]">•</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#292524]">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{timeStr || '10:35 AM'}</span>
            </div>
          </div>

          {/* City Selector */}
          <div className="relative">
            <label htmlFor="city-select" className="sr-only">Select City</label>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7EF] border border-[#E7E2D4] rounded-lg text-xs font-semibold text-[#1C1917] hover:border-amber-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <select
                id="city-select"
                value={selectedCity.id}
                onChange={(e) => {
                  const found = CITIES.find((c) => c.id === e.target.value);
                  if (found) onSelectCity(found);
                }}
                className="bg-transparent pr-4 font-semibold text-xs text-[#1C1917] outline-none cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.hasRealDataset ? '(Real 800-pt BBMP)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notification Button & Popover */}
          <div className="relative">
            <button
              id="notifications-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-[#FAF7EF] border border-[#E7E2D4] text-[#57534E] hover:text-[#1C1917] hover:border-amber-400 transition-colors relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E7E2D4] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 bg-[#FAF7EF] border-b border-[#E7E2D4] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-[#1C1917]">System Alerts</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-[#F5F0E4] max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs transition-colors ${
                        n.read ? 'bg-white' : 'bg-amber-50/60'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {n.type === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {n.type === 'warning' && (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        {n.type === 'info' && (
                          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1C1917]">{n.title}</span>
                            <span className="text-[10px] text-[#A8A29E]">{n.time}</span>
                          </div>
                          <p className="text-[#57534E] text-[11px] mt-0.5 leading-normal">
                            {n.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center bg-[#FAF7EF]/80 border-t border-[#E7E2D4]">
                  <span className="text-[11px] text-[#78716C]">
                    All systems synchronized with BBMP telemetry
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
