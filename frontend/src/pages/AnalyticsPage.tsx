import React from 'react';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { OptimizationResult } from '../types';
import { BarChart3, Download, FileText, Sparkles } from 'lucide-react';
import { formatINR, formatMinutes } from '../utils/formatters';

interface AnalyticsPageProps {
  result: OptimizationResult;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ result }) => {
  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      networkMetrics: result.kpi,
      selectedWarehouses: result.warehouses
        .filter((w) => w.isSelected)
        .map((w) => ({
          id: w.id,
          name: w.name,
          utilization: `${w.utilization}%`,
          demandServed: w.demandServed,
        })),
      assignmentsCount: result.assignments.length,
      solverSummary: result.summaryMessage,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gridpoint_analytics_report_${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E2D4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
              Logistics Network Analytics & Telemetry
            </h1>
          </div>
          <p className="text-xs text-[#78716C] mt-1">
            Deep econometric analysis covering cost curves, capacity utilization, dispatch histograms, and carbon footprints.
          </p>
        </div>

        <button
          onClick={exportReport}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E7E2D4] bg-white text-xs font-bold text-[#1C1917] hover:bg-[#FAF7EF] shadow-2xs transition-colors"
        >
          <Download className="w-4 h-4 text-amber-600" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-white p-4 rounded-xl border border-[#E7E2D4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-[#1C1917]">
              Pareto-Optimal Fleet Configuration Achieved
            </div>
            <p className="text-xs text-[#78716C] mt-0.5">
              {result.summaryMessage}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs shrink-0">
          <div className="text-right">
            <div className="text-[10px] text-[#A8A29E] uppercase font-bold">Solver Execution</div>
            <div className="font-mono font-bold text-[#1C1917]">{result.executionTimeMs} ms</div>
          </div>
          <div className="h-8 w-px bg-[#E7E2D4]"></div>
          <div className="text-right">
            <div className="text-[10px] text-[#A8A29E] uppercase font-bold">SLA Performance</div>
            <div className="font-mono font-bold text-emerald-700">{result.kpi.slaCompliancePercent}%</div>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Suite */}
      <AnalyticsCharts
        analytics={result.analytics}
        selectedCount={result.selectedWarehouseIds.length}
      />
    </div>
  );
};
