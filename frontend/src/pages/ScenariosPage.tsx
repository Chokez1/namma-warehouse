import React, { useState } from 'react';
import {
  GitFork,
  TrendingUp,
  Flame,
  Fuel,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Warehouse as WarehouseIcon,
  Clock,
  IndianRupee,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { Warehouse, DemandZone, OptimizationResult } from '../types';
import { api } from '../services/api';
import { formatINR, formatMinutes, formatFuel, formatTons } from '../utils/formatters';

interface ScenariosPageProps {
  currentResult: OptimizationResult;
  warehouses: Warehouse[];
  onApplyScenarioResult: (res: OptimizationResult) => void;
}

export const ScenariosPage: React.FC<ScenariosPageProps> = ({
  currentResult,
  warehouses,
  onApplyScenarioResult,
}) => {
  const [scenarioType, setScenarioType] = useState<
    'demand' | 'traffic' | 'fuel' | 'warehouse_failure'
  >('warehouse_failure');

  const [demandIncrease, setDemandIncrease] = useState(30);
  const [trafficIncrease, setTrafficIncrease] = useState(40);
  const [fuelIncrease, setFuelIncrease] = useState(25);
  const [failedWarehouseId, setFailedWarehouseId] = useState('W3');
  const [isSimulating, setIsSimulating] = useState(false);

  const [comparison, setComparison] = useState<{
    before: OptimizationResult;
    after: OptimizationResult;
  } | null>(null);

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      let params: any = { type: scenarioType };
      if (scenarioType === 'demand') params.percentageChange = demandIncrease;
      if (scenarioType === 'traffic') params.percentageChange = trafficIncrease;
      if (scenarioType === 'fuel') params.percentageChange = fuelIncrease;
      if (scenarioType === 'warehouse_failure') params.disabledWarehouseId = failedWarehouseId;

      const result = await api.simulateScenario(params);
      setComparison(result);
      onApplyScenarioResult(result.after);
    } finally {
      setIsSimulating(false);
    }
  };

  const resetBaseline = async () => {
    setIsSimulating(true);
    try {
      const reset = await api.resetScenario();
      setComparison(null);
      onApplyScenarioResult(reset);
    } finally {
      setIsSimulating(false);
    }
  };

  const before = comparison ? comparison.before.kpi : currentResult.kpi;
  const after = comparison ? comparison.after.kpi : currentResult.kpi;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E2D4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <GitFork className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
              Network Stress-Testing & What-If Scenarios
            </h1>
          </div>
          <p className="text-xs text-[#78716C] mt-1">
            Simulate operational disruptions, demand surges, traffic anomalies, and facility outages to measure resilience.
          </p>
        </div>

        {comparison && (
          <button
            onClick={resetBaseline}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E7E2D4] bg-white text-xs font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7EF] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Baseline</span>
          </button>
        )}
      </div>

      {/* Scenario Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Demand Surge */}
        <button
          onClick={() => setScenarioType('demand')}
          className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            scenarioType === 'demand'
              ? 'border-amber-600 bg-white ring-2 ring-amber-500/20 shadow-md'
              : 'border-[#E7E2D4] bg-white/70 hover:bg-white text-[#57534E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Festive / Peak
            </span>
          </div>
          <h3 className="font-bold text-sm text-[#1C1917] mt-2.5">Demand Spike</h3>
          <p className="text-[11px] text-[#78716C] mt-1">
            Simulate +20% to +60% order volume expansion and evaluate capacity ceilings.
          </p>
        </button>

        {/* 2. Traffic Spike */}
        <button
          onClick={() => setScenarioType('traffic')}
          className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            scenarioType === 'traffic'
              ? 'border-amber-600 bg-white ring-2 ring-amber-500/20 shadow-md'
              : 'border-[#E7E2D4] bg-white/70 hover:bg-white text-[#57534E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-800 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 bg-red-50 px-2 py-0.5 rounded">
              Congestion
            </span>
          </div>
          <h3 className="font-bold text-sm text-[#1C1917] mt-2.5">Monsoon Gridlock</h3>
          <p className="text-[11px] text-[#78716C] mt-1">
            Peak corridor delays (Outer Ring Rd, Silk Board) impacting delivery SLAs.
          </p>
        </button>

        {/* 3. Fuel Price Spike */}
        <button
          onClick={() => setScenarioType('fuel')}
          className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            scenarioType === 'fuel'
              ? 'border-amber-600 bg-white ring-2 ring-amber-500/20 shadow-md'
              : 'border-[#E7E2D4] bg-white/70 hover:bg-white text-[#57534E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-[#78350F]/10 text-[#78350F] flex items-center justify-center">
              <Fuel className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#78350F] bg-[#F5F0E4] px-2 py-0.5 rounded">
              Cost Shift
            </span>
          </div>
          <h3 className="font-bold text-sm text-[#1C1917] mt-2.5">Fuel Price Shock</h3>
          <p className="text-[11px] text-[#78716C] mt-1">
            Analyze diesel inflation impacts from ₹96/L up to ₹145/L on daily operating margins.
          </p>
        </button>

        {/* 4. Warehouse Outage */}
        <button
          onClick={() => setScenarioType('warehouse_failure')}
          className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
            scenarioType === 'warehouse_failure'
              ? 'border-red-600 bg-white ring-2 ring-red-500/20 shadow-md'
              : 'border-[#E7E2D4] bg-white/70 hover:bg-white text-[#57534E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 bg-red-50 px-2 py-0.5 rounded">
              Disruption
            </span>
          </div>
          <h3 className="font-bold text-sm text-[#1C1917] mt-2.5">Facility Outage</h3>
          <p className="text-[11px] text-[#78716C] mt-1">
            Simulate a sudden closure (fire, strike, tech down) and verify automatic demand failover.
          </p>
        </button>
      </div>

      {/* Scenario Parameter Controls & Action */}
      <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
        <h3 className="text-sm font-bold text-[#1C1917] mb-3">
          Configure Scenario Parameters
        </h3>

        <div className="max-w-xl space-y-4">
          {scenarioType === 'demand' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-[#57534E]">
                  Demand Increase Percentage:
                </span>
                <span className="font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-xs">
                  +{demandIncrease}%
                </span>
              </div>
              <div className="flex gap-2 mb-2">
                {[20, 30, 40, 60].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setDemandIncrease(pct)}
                    className={`px-3 py-1.5 text-xs rounded-lg border font-semibold ${
                      demandIncrease === pct
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-[#FAF7EF] text-[#57534E] border-[#E7E2D4] hover:bg-[#F5F0E4]'
                    }`}
                  >
                    +{pct}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {scenarioType === 'traffic' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-[#57534E]">
                  Transit Congestion Delay:
                </span>
                <span className="font-mono font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded text-xs">
                  +{trafficIncrease}%
                </span>
              </div>
              <div className="flex gap-2 mb-2">
                {[25, 40, 60, 80].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setTrafficIncrease(pct)}
                    className={`px-3 py-1.5 text-xs rounded-lg border font-semibold ${
                      trafficIncrease === pct
                        ? 'bg-red-600 text-white border-red-700'
                        : 'bg-[#FAF7EF] text-[#57534E] border-[#E7E2D4] hover:bg-[#F5F0E4]'
                    }`}
                  >
                    +{pct}% Slowdown
                  </button>
                ))}
              </div>
            </div>
          )}

          {scenarioType === 'fuel' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-[#57534E]">
                  Fuel Surcharge / Hike:
                </span>
                <span className="font-mono font-bold text-[#78350F] bg-[#F5F0E4] px-2 py-0.5 rounded text-xs">
                  +{fuelIncrease}%
                </span>
              </div>
              <div className="flex gap-2 mb-2">
                {[10, 25, 40, 50].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setFuelIncrease(pct)}
                    className={`px-3 py-1.5 text-xs rounded-lg border font-semibold ${
                      fuelIncrease === pct
                        ? 'bg-[#78350F] text-white border-[#57270B]'
                        : 'bg-[#FAF7EF] text-[#57534E] border-[#E7E2D4] hover:bg-[#F5F0E4]'
                    }`}
                  >
                    +{pct}% Price
                  </button>
                ))}
              </div>
            </div>
          )}

          {scenarioType === 'warehouse_failure' && (
            <div>
              <label className="block text-xs font-semibold text-[#57534E] mb-2">
                Select Facility to Deactivate (Simulate Outage):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {warehouses.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setFailedWarehouseId(w.id)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs ${
                      failedWarehouseId === w.id
                        ? 'border-red-500 bg-red-50/80 text-red-950 font-bold'
                        : 'border-[#E7E2D4] bg-[#FAF7EF] text-[#57534E] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{w.id} • {w.name}</div>
                      <div className="text-[10px] text-[#78716C]">{w.location}</div>
                    </div>
                    {failedWarehouseId === w.id && (
                      <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">
                        Outage
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimulating ? 'Simulating Re-optimization...' : 'Run What-If Simulation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Before vs After Comparison */}
      <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#1C1917]">
              Simulation Impact: Baseline vs. Post-Disruption
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              Comparative analysis of logistics KPIs and dynamic workload redistribution
            </p>
          </div>
          {comparison && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Dynamic Failover Computed
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Optimal Hubs */}
          <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E7E2D4]">
            <div className="text-[11px] text-[#78716C] font-semibold">Active Hubs</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-lg font-bold text-[#57534E] line-through">{before.optimalWarehouses}</span>
              <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
              <span className="text-xl font-extrabold text-[#1C1917]">{after.optimalWarehouses}</span>
            </div>
            <div className="text-[10px] text-[#78716C] mt-1">Facilities in service</div>
          </div>

          {/* Total Cost */}
          <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E7E2D4]">
            <div className="text-[11px] text-[#78716C] font-semibold">Total Cost / Day</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#57534E] line-through">{formatINR(before.totalCostLakhs)}</span>
              <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
              <span className="text-xl font-extrabold text-[#1C1917]">{formatINR(after.totalCostLakhs)}</span>
            </div>
            <div className="text-[10px] font-bold mt-1 text-amber-800">
              {after.totalCostLakhs > before.totalCostLakhs ? '+' : ''}
              {(after.totalCostLakhs - before.totalCostLakhs).toFixed(1)} L diff
            </div>
          </div>

          {/* Delivery Time */}
          <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E7E2D4]">
            <div className="text-[11px] text-[#78716C] font-semibold">Avg Delivery Time</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#57534E] line-through">{formatMinutes(before.avgDeliveryTimeMin)}</span>
              <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
              <span className="text-xl font-extrabold text-[#1C1917]">{formatMinutes(after.avgDeliveryTimeMin)}</span>
            </div>
            <div className="text-[10px] font-bold mt-1 text-amber-800">
              {after.avgDeliveryTimeMin > before.avgDeliveryTimeMin ? '+' : ''}
              {(after.avgDeliveryTimeMin - before.avgDeliveryTimeMin).toFixed(1)} min delta
            </div>
          </div>

          {/* Fuel */}
          <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E7E2D4]">
            <div className="text-[11px] text-[#78716C] font-semibold">Fuel Consumed</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#57534E] line-through">{formatFuel(before.fuelConsumedLiters)}</span>
              <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
              <span className="text-xl font-extrabold text-[#1C1917]">{formatFuel(after.fuelConsumedLiters)}</span>
            </div>
            <div className="text-[10px] text-[#78716C] mt-1">Intra-city liters</div>
          </div>

          {/* CO2 */}
          <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E7E2D4]">
            <div className="text-[11px] text-[#78716C] font-semibold">CO₂ Emissions</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#57534E] line-through">{formatTons(before.co2EmissionsTons)}</span>
              <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
              <span className="text-xl font-extrabold text-[#1C1917]">{formatTons(after.co2EmissionsTons)}</span>
            </div>
            <div className="text-[10px] text-[#78716C] mt-1">Metric tons</div>
          </div>

          {/* SLA */}
          <div className="p-3 bg-[#FAF7EF] rounded-xl border border-[#E7E2D4]">
            <div className="text-[11px] text-[#78716C] font-semibold">SLA Compliance</div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#57534E] line-through">{before.slaCompliancePercent}%</span>
              <ArrowRight className="w-3 h-3 text-[#A8A29E]" />
              <span className="text-xl font-extrabold text-[#1C1917]">{after.slaCompliancePercent}%</span>
            </div>
            <div className="text-[10px] text-[#78716C] mt-1">On-time rate</div>
          </div>
        </div>

        {/* Narrative Failover Summary */}
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-[#78350F] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Algorithmic Resiliency Insight: </span>
            {scenarioType === 'warehouse_failure' ? (
              <span>
                When facility <strong>{failedWarehouseId}</strong> was placed offline, GRIDPOINT&apos;s P-Median solver rerouted its assigned urban districts to neighboring hubs with the lowest marginal transit penalties. Capacity buffers absorbed the volume while maintaining SLA compliance at <strong>{after.slaCompliancePercent}%</strong>.
              </span>
            ) : scenarioType === 'demand' ? (
              <span>
                Under a <strong>+{demandIncrease}% demand spike</strong>, vehicle batch dispatches increased. Utilization at peak nodes increased, while the solver retained average delivery times within <strong>{formatMinutes(after.avgDeliveryTimeMin)}</strong>.
              </span>
            ) : (
              <span>
                Network evaluated against altered cost parameters. Re-balanced routing minimized deadhead transit miles.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
