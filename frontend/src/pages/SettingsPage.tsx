import React, { useState } from 'react';
import {
  Settings,
  Server,
  Sliders,
  CheckCircle2,
  Database,
  Globe,
  Shield,
  Save,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [backendMode, setBackendMode] = useState<'client_engine' | 'custom_api'>('client_engine');
  const [customApiUrl, setCustomApiUrl] = useState('http://localhost:8000');
  const [dieselPrice, setDieselPrice] = useState(96.5);
  const [currency, setCurrency] = useState('INR');
  const [evShare, setEvShare] = useState(15);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="border-b border-[#E7E2D4] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
            <Settings className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
            System & Engine Settings
          </h1>
        </div>
        <p className="text-xs text-[#78716C] mt-1">
          Manage solver configuration, API endpoints, economic baselines, and environmental fleet metrics.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* API & Solver Engine Configuration */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5F0E4] pb-3">
            <Server className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm text-[#1C1917]">Backend & Solver Architecture</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="block font-semibold text-[#292524]">Optimization Execution Mode</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setBackendMode('client_engine')}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  backendMode === 'client_engine'
                    ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-semibold'
                    : 'border-[#E7E2D4] bg-[#FAF7EF] text-[#57534E]'
                }`}
              >
                <div className="font-bold text-xs">Native TypeScript Solver Engine</div>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  Instant offline multi-criteria P-Median solver running with zero latency.
                </p>
              </div>

              <div
                onClick={() => setBackendMode('custom_api')}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  backendMode === 'custom_api'
                    ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-semibold'
                    : 'border-[#E7E2D4] bg-[#FAF7EF] text-[#57534E]'
                }`}
              >
                <div className="font-bold text-xs">External REST API Endpoint</div>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  Connect to Python FastAPI / PuLP / OR-Tools optimization backend.
                </p>
              </div>
            </div>

            {backendMode === 'custom_api' && (
              <div className="pt-2">
                <label className="block font-semibold text-[#292524] mb-1">
                  API Base URL
                </label>
                <input
                  type="text"
                  value={customApiUrl}
                  onChange={(e) => setCustomApiUrl(e.target.value)}
                  className="w-full p-2 bg-[#FAF7EF] border border-[#E7E2D4] rounded-lg font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Economic & Environmental Parameters */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F5F0E4] pb-3">
            <Globe className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-[#1C1917]">Economic & Sustainability Baselines</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#292524] mb-1">Currency Format</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 bg-[#FAF7EF] border border-[#E7E2D4] rounded-lg text-xs font-semibold text-[#1C1917] outline-none"
              >
                <option value="INR">Indian Rupee (₹ Lakhs & Crores)</option>
                <option value="USD">US Dollar ($ USD)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#292524] mb-1">Base Diesel Cost (₹/L)</label>
              <input
                type="number"
                step="0.1"
                value={dieselPrice}
                onChange={(e) => setDieselPrice(Number(e.target.value))}
                className="w-full p-2 bg-[#FAF7EF] border border-[#E7E2D4] rounded-lg text-xs font-semibold text-[#1C1917] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#292524] mb-1">
                Green EV Fleet Transition (% Share)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={evShare}
                onChange={(e) => setEvShare(Number(e.target.value))}
                className="w-full p-2 bg-[#FAF7EF] border border-[#E7E2D4] rounded-lg text-xs font-semibold text-[#1C1917] outline-none"
              />
              <p className="text-[10px] text-[#78716C] mt-1">
                Portion of intra-city deliveries handled by electric 2W/3W vehicles.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-[#292524] mb-1">Spatial Distance Metric</label>
              <div className="p-2 bg-[#FAF7EF] border border-[#E7E2D4] rounded-lg text-xs text-[#57534E]">
                Haversine with Urban Tortuosity Multiplier (1.32x road factor)
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>

          {saved && (
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Settings updated successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
