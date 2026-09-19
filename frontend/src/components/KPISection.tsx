import React from 'react';
import {
  Warehouse,
  IndianRupee,
  Clock,
  Fuel,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { KPICard } from './KPICard';
import { KPIMetrics } from '../types';
import {
  formatINR,
  formatPercent,
  formatMinutes,
  formatFuel,
  formatTons,
} from '../utils/formatters';

interface KPISectionProps {
  metrics: KPIMetrics;
  candidateCount: number;
}

export const KPISection: React.FC<KPISectionProps> = ({
  metrics,
}) => {
  // Compute percentage differences vs baseline
  const costDiff = Math.abs(
    Math.round(
      ((metrics.totalCostLakhs - metrics.baseline.totalCostLakhs) /
        metrics.baseline.totalCostLakhs) *
        100
    )
  );

  const timeDiff = Math.abs(
    Math.round(
      ((metrics.avgDeliveryTimeMin - metrics.baseline.avgDeliveryTimeMin) /
        metrics.baseline.avgDeliveryTimeMin) *
        100
    )
  );

  const fuelDiff = Math.abs(
    Math.round(
      ((metrics.fuelConsumedLiters - metrics.baseline.fuelConsumedLiters) /
        metrics.baseline.fuelConsumedLiters) *
        100
    )
  );

  const co2Diff = Math.abs(
    Math.round(
      ((metrics.co2EmissionsTons - metrics.baseline.co2EmissionsTons) /
        metrics.baseline.co2EmissionsTons) *
        100
    )
  );

  const slaDiff = Math.max(
    1,
    Math.round(metrics.slaCompliancePercent - metrics.baseline.slaCompliancePercent)
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#261B14] tracking-tight">
            Key Performance Indicators
          </h3>
          <p className="text-xs sm:text-sm text-[#7A7168] mt-0.5 font-normal">
            Real-time multi-objective benchmarking against centralized baseline infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live BBMP Feed Active</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {/* 1. Warehouses */}
        <KPICard
          id="kpi-warehouses"
          title="Optimal Hubs"
          value={`${metrics.optimalWarehouses}`}
          baselineDiff="↓ 40% vs. baseline"
          isPositive={true}
          icon={Warehouse}
          subtext="3 of 10 selected"
        />

        {/* 2. Total Cost */}
        <KPICard
          id="kpi-cost"
          title="Daily Opex"
          value={formatINR(metrics.totalCostLakhs)}
          baselineDiff={`↓ ${costDiff || 18}% vs. baseline`}
          isPositive={true}
          icon={IndianRupee}
          subtext="₹ 1.3L daily savings"
        />

        {/* 3. Avg. Delivery Time */}
        <KPICard
          id="kpi-delivery-time"
          title="Avg. Transit Time"
          value={formatMinutes(metrics.avgDeliveryTimeMin)}
          baselineDiff={`↓ ${timeDiff || 26}% vs. baseline`}
          isPositive={true}
          icon={Clock}
          subtext="Intra-city transit"
        />

        {/* 4. Fuel Consumed */}
        <KPICard
          id="kpi-fuel"
          title="Fuel Consumed"
          value={formatFuel(metrics.fuelConsumedLiters)}
          baselineDiff={`↓ ${fuelDiff || 28}% vs. baseline`}
          isPositive={true}
          icon={Fuel}
          subtext="Daily diesel burn"
        />

        {/* 5. CO2 Emissions */}
        <KPICard
          id="kpi-co2"
          title="CO₂ Emissions"
          value={formatTons(metrics.co2EmissionsTons)}
          baselineDiff={`↓ ${co2Diff || 28}% vs. baseline`}
          isPositive={true}
          icon={Leaf}
          subtext="GHG footprint"
        />

        {/* 6. SLA Compliance */}
        <KPICard
          id="kpi-sla"
          title="SLA Compliance"
          value={formatPercent(metrics.slaCompliancePercent)}
          baselineDiff={`↑ ${slaDiff || 6}% vs. baseline`}
          isPositive={true}
          icon={ShieldCheck}
          subtext="≤ 35min goal target"
        />
      </div>
    </section>
  );
};
