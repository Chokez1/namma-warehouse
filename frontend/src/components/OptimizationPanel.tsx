import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Sliders,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import {
  OptimizationConfig,
  OptimizationPriority,
  TrafficLevel,
  OptimizationResult,
} from '../types';

interface OptimizationPanelProps {
  config: OptimizationConfig;
  onChangeConfig: (newConfig: Partial<OptimizationConfig>) => void;
  onRunOptimization: () => void;
  isOptimizing: boolean;
  currentStep: string;
  stepIndex: number;
  lastResult?: OptimizationResult | null;
  onReset: () => void;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  config,
  onChangeConfig,
  onRunOptimization,
  isOptimizing,
  stepIndex,
  lastResult,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'scenario'>('basic');

  const priorityOptions: { id: OptimizationPriority; label: string }[] = [
    { id: 'cost', label: 'Cost Focused' },
    { id: 'speed', label: 'Speed (<25m)' },
    { id: 'sustainability', label: 'Eco / Low Carbon' },
    { id: 'balanced', label: 'Balanced Optimum' },
  ];

  const stepsList = [
    'Analyzing demand zones & traffic...',
    'Calculating spatial transport costs...',
    'Evaluating candidate warehouse footprints...',
    'Generating optimal network...',
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E8E0CE] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Panel Header */}
      <div className="p-5 border-b border-[#E8E0CE] flex items-center justify-between shrink-0 bg-[#FAF5E8]/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAF3E3] border border-[#EFE5D0] flex items-center justify-center text-[#9E471A] shadow-2xs">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-[#1F1A16] font-serif">
              Optimization Controls
            </h3>
            <p className="text-[11px] text-[#7A7168]">
              P-Median facility location parameters
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-[#7A7168] hover:text-[#1F1A16] px-2.5 py-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#E8E0CE] transition-all"
            title="Reset to baseline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Tabs: Basic, Advanced, Scenario */}
      <div className="flex border-b border-[#E8E0CE] bg-[#FAF5E8]/40 p-2 gap-2 text-xs">
        {(['basic', 'advanced', 'scenario'] as const).map((tab) => (
          <button
            key={tab}
            id={`optimization-tab-${tab}`}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 font-bold text-center rounded-xl transition-all capitalize text-xs ${
              activeTab === tab
                ? 'bg-[#FDE89C] text-[#3D270C] shadow-2xs border border-amber-300'
                : 'text-[#7A7168] hover:text-[#1F1A16] hover:bg-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Content with comfortable spacing */}
      <div className="p-5 space-y-5 overflow-y-auto flex-1 text-xs">
        {activeTab === 'basic' && (
          <>
            {/* City / Area Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5C5248] block">
                Target Logistics Region
              </label>
              <div className="relative">
                <select
                  disabled
                  className="w-full bg-[#FAF5E8]/90 border border-[#E8E0CE] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1F1A16] appearance-none cursor-pointer focus:outline-none"
                  defaultValue="Bengaluru"
                >
                  <option value="Bengaluru">Bengaluru Central & BBMP Urban Zone (800 Nodes)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#7A7168] absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Daily Demand */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#5C5248]">
                  Daily Demand Volume
                </label>
                <span className="font-bold text-[#1F1A16] text-xs font-mono bg-[#FAF5E8] px-2.5 py-1 rounded-md border border-[#E8E0CE]">
                  {Math.round(15000 * config.demandMultiplier).toLocaleString()} orders/day
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={config.demandMultiplier}
                onChange={(e) => onChangeConfig({ demandMultiplier: Number(e.target.value) })}
                className="w-full accent-[#9E471A] cursor-pointer h-2 bg-[#E8DEC7] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#A8A29E]">
                <span>7,500 (Low)</span>
                <span>15,000 (Baseline)</span>
                <span>30,000 (Peak Surge)</span>
              </div>
            </div>

            {/* Max Warehouses */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#5C5248]">
                  Max Allowed Warehouses (p)
                </label>
                <span className="font-bold text-[#1F1A16] text-xs font-mono bg-[#FAF5E8] px-2.5 py-1 rounded-md border border-[#E8E0CE]">
                  {config.maxWarehouses} Warehouses
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={config.maxWarehouses}
                onChange={(e) => onChangeConfig({ maxWarehouses: Number(e.target.value) })}
                className="w-full accent-[#9E471A] cursor-pointer h-2 bg-[#E8DEC7] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#A8A29E]">
                <span>1 Hub</span>
                <span>3 (Optimal Frontier)</span>
                <span>6 Hubs</span>
              </div>
            </div>

            {/* Max Delivery Time */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#5C5248]">
                  Target Max Delivery Time (SLA)
                </label>
                <span className="font-bold text-[#1F1A16] text-xs font-mono bg-[#FAF5E8] px-2.5 py-1 rounded-md border border-[#E8E0CE]">
                  {config.maxDeliveryTime} min
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                step="5"
                value={config.maxDeliveryTime}
                onChange={(e) => onChangeConfig({ maxDeliveryTime: Number(e.target.value) })}
                className="w-full accent-[#9E471A] cursor-pointer h-2 bg-[#E8DEC7] rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[#A8A29E]">
                <span>20 min (Hyperlocal)</span>
                <span>35 min</span>
                <span>50 min</span>
              </div>
            </div>

            {/* Fuel Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#5C5248]">Commercial Fuel Rate</label>
                <span className="font-bold text-[#1F1A16] text-xs font-mono bg-[#FAF5E8] px-2.5 py-1 rounded-md border border-[#E8E0CE]">
                  ₹ {Math.round(config.fuelPrice)} / Liter
                </span>
              </div>
              <input
                type="range"
                min="85"
                max="120"
                step="1"
                value={config.fuelPrice}
                onChange={(e) => onChangeConfig({ fuelPrice: Number(e.target.value) })}
                className="w-full accent-[#9E471A] cursor-pointer h-2 bg-[#E8DEC7] rounded-lg"
              />
            </div>

            {/* Traffic Level */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#5C5248]">Corridor Congestion</label>
                <span className="capitalize font-bold text-xs text-[#9E471A]">
                  {config.trafficLevel} Level
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as TrafficLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onChangeConfig({ trafficLevel: lvl })}
                    className={`py-2 text-center rounded-xl border capitalize text-xs font-bold transition-all ${
                      config.trafficLevel === lvl
                        ? 'bg-[#FDE89C] text-[#3D270C] border-amber-400 shadow-2xs'
                        : 'border-[#E8E0CE] bg-[#FAF5E8]/60 text-[#7A7168] hover:bg-[#FAF5E8]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Optimization Priority */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#5C5248] block">
                Mathematical Objective Focus
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {priorityOptions.map((opt) => {
                  const isSelected = config.priority === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onChangeConfig({ priority: opt.id })}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#9E471A] bg-[#FAF3E3] text-[#3D270C] font-bold shadow-2xs'
                          : 'border-[#E8E0CE] bg-white text-[#5C5248] hover:bg-[#FAF5E8]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#9E471A] bg-[#9E471A]'
                            : 'border-stone-400 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <span className="text-xs">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-[#FAF5E8] rounded-xl border border-[#E8E0CE] text-xs text-[#5C5248] space-y-1.5">
              <span className="font-bold text-[#1F1A16] block">P-Median Formulation</span>
              <p className="leading-relaxed">
                Minimizes weighted transport distances subject to warehouse lease rates from BBMP ward records.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-[#E8E0CE] text-xs space-y-1.5">
              <span className="font-semibold text-[#1F1A16] block">Emission Standard</span>
              <p className="text-[#7A7168] leading-relaxed">
                2.68 kg CO₂ per liter of commercial diesel with regenerative EV fleet offsets.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'scenario' && (
          <div className="space-y-3">
            <button
              onClick={() => onChangeConfig({ demandMultiplier: 1.4 })}
              className="w-full p-3.5 bg-[#FAF5E8] hover:bg-[#FAF3E3] border border-[#E8E0CE] rounded-xl text-left transition-colors"
            >
              <div className="font-bold text-[#1F1A16] flex justify-between text-xs">
                <span>Diwali Festive Surge</span>
                <span className="text-amber-900 text-[11px] bg-[#FDE89C] px-2 py-0.5 rounded font-bold">+40%</span>
              </div>
              <p className="text-[11px] text-[#7A7168] mt-1">High festive demand spike across all wards.</p>
            </button>
            <button
              onClick={() => onChangeConfig({ trafficLevel: 'high' })}
              className="w-full p-3.5 bg-[#FAF5E8] hover:bg-[#FAF3E3] border border-[#E8E0CE] rounded-xl text-left transition-colors"
            >
              <div className="font-bold text-[#1F1A16] flex justify-between text-xs">
                <span>Monsoon Waterlogging</span>
                <span className="text-amber-900 text-[11px] bg-[#FDE89C] px-2 py-0.5 rounded font-bold">Severe</span>
              </div>
              <p className="text-[11px] text-[#7A7168] mt-1">Silk Board & Bellandur corridor congestion.</p>
            </button>
            <button
              onClick={() => onChangeConfig({ disabledWarehouseIds: ['W3'] })}
              className="w-full p-3.5 bg-red-50/70 hover:bg-red-50 border border-red-200 rounded-xl text-left transition-colors"
            >
              <div className="font-bold text-red-950 flex justify-between text-xs">
                <span>Whitefield Hub Outage</span>
                <span className="text-red-800 text-[11px] bg-red-100 px-2 py-0.5 rounded font-bold">Simulate</span>
              </div>
              <p className="text-[11px] text-red-700 mt-1">Simulates hub shutdown and automated re-routing.</p>
            </button>
          </div>
        )}
      </div>

      {/* Button: Run Optimization */}
      <div className="p-5 border-t border-[#E8E0CE] bg-[#FAF5E8]/60 shrink-0 space-y-2.5">
        {isOptimizing ? (
          <div className="p-3 bg-white rounded-xl border border-amber-300 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                SOLVING NETWORK OPTIMIZATION...
              </span>
              <span className="font-mono text-xs">
                {Math.min(100, Math.round(((stepIndex + 1) / 4) * 100))}%
              </span>
            </div>
            <div className="w-full bg-[#E8DEC7] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9E471A] transition-all duration-300"
                style={{ width: `${Math.min(100, ((stepIndex + 1) / 4) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-[#7A7168] truncate">{stepsList[stepIndex]}</p>
          </div>
        ) : (
          <button
            id="run-optimization-btn"
            onClick={onRunOptimization}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-[#9E471A] via-[#8F3E15] to-[#7B3410] hover:from-[#8A3B12] hover:to-[#6F2E0D] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Optimize Logistics Network</span>
          </button>
        )}

        {lastResult && !isOptimizing && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">{lastResult.summaryMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};
