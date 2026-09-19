import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  X,
  Sliders,
  MapPin,
  Building2,
} from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';
import { KPISection } from '../components/KPISection';
import { LogisticsMap } from '../components/LogisticsMap';
import { OptimizationPanel } from '../components/OptimizationPanel';
import { DashboardCharts } from '../components/DashboardCharts';
import { DashboardTables } from '../components/DashboardTables';
import {
  CityOption,
  Warehouse,
  DemandZone,
  RouteAssignment,
  OptimizationConfig,
  OptimizationResult,
  ActivityEvent,
  GridPoint,
} from '../types';

interface DashboardPageProps {
  city: CityOption;
  warehouses: Warehouse[];
  zones: DemandZone[];
  assignments: RouteAssignment[];
  result: OptimizationResult;
  config: OptimizationConfig;
  onChangeConfig: (newConfig: Partial<OptimizationConfig>) => void;
  onRunOptimization: () => void;
  isOptimizing: boolean;
  currentStep: string;
  stepIndex: number;
  events: ActivityEvent[];
  customPoints?: GridPoint[];
  onReset: () => void;
  userName?: string;
  onNavigateTab?: (tab: 'dashboard' | 'scenarios' | 'analytics' | 'data' | 'settings') => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  city,
  warehouses,
  zones,
  assignments,
  result,
  config,
  onChangeConfig,
  onRunOptimization,
  isOptimizing,
  currentStep,
  stepIndex,
  events,
  customPoints,
  onReset,
  userName = 'Arjun',
  onNavigateTab,
}) => {
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="space-y-8 lg:space-y-10 max-w-[1700px] mx-auto pb-16">
      {/* 1. BEGINNING: Hero Banner matching user's facility branding */}
      <HeroBanner
        activeHubCount={result.kpi.optimalWarehouses}
        onEnquire={() => {}}
      />

      {/* 2. Operational Overview & Controls Header with Date / Status */}
      <div
        id="network-simulator-section"
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2"
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#261B14] tracking-tight">
              Bengaluru Logistics Network Simulator
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-[#FDE89C] text-[#3D270C] rounded-full border border-amber-300">
              P-Median v2.4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#7A7168] mt-1 font-normal">
            Continuous optimization engine matching BBMP Ward demand nodes against candidate micro-hubs.
          </p>
        </div>

        {/* Right: Date & Status Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8E0CE] rounded-xl text-xs font-semibold text-[#5C5248] shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#9E471A]" />
            <span>Today</span>
            <span className="text-[#D8CDBC]">|</span>
            <Clock className="w-3.5 h-3.5 text-[#7A7168]" />
            <span>Live Peak Sync</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E8E0CE] rounded-xl text-xs font-bold text-[#261B14] shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#9E471A]" />
            <span>BBMP Central Zone</span>
          </div>

          {showToast && (
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#FFF8EE] border border-[#E9CDB0] rounded-xl text-xs text-[#9E471A] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span className="font-semibold">Optimal frontier ready</span>
              <button
                onClick={() => setShowToast(false)}
                className="text-[#9E471A] hover:text-black p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Key Performance Indicators (6 Cards in spacious grid) */}
      <KPISection metrics={result.kpi} candidateCount={warehouses.length} />

      {/* 5. Main Centerpiece: Map & Optimization Control Panel with generous dimensions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Dominant Logistics Map (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <LogisticsMap
            city={city}
            warehouses={warehouses}
            zones={zones}
            assignments={assignments}
            customPoints={customPoints}
          />
        </div>

        {/* Optimization Settings Panel (4 cols) */}
        <div className="lg:col-span-4 h-[600px] lg:h-[650px]">
          <OptimizationPanel
            config={config}
            onChangeConfig={onChangeConfig}
            onRunOptimization={onRunOptimization}
            isOptimizing={isOptimizing}
            currentStep={currentStep}
            stepIndex={stepIndex}
            lastResult={result}
            onReset={onReset}
          />
        </div>
      </div>

      {/* 6. Analytics Charts (Row of 3 spacious cards) */}
      <DashboardCharts
        analytics={result.analytics}
        selectedCount={result.kpi.optimalWarehouses}
      />

      {/* 7. Tables & Recent Activity Feed */}
      <DashboardTables
        warehouses={warehouses}
        events={events}
        onToggleWarehouse={(id) => {
          const isSelected = config.disabledWarehouseIds?.includes(id);
          const newDisabled = isSelected
            ? (config.disabledWarehouseIds || []).filter((wId) => wId !== id)
            : [...(config.disabledWarehouseIds || []), id];
          onChangeConfig({ disabledWarehouseIds: newDisabled });
        }}
      />
    </div>
  );
};
