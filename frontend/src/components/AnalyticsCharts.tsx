import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  BarChart3,
  TrendingDown,
  PieChart as PieIcon,
  Clock,
  Leaf,
  Layers,
} from 'lucide-react';
import { OptimizationResult } from '../types';
import { formatINR, formatNumber } from '../utils/formatters';

interface AnalyticsChartsProps {
  analytics: OptimizationResult['analytics'];
  selectedCount: number;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  analytics,
  selectedCount,
}) => {
  const {
    costVsWarehouses,
    warehouseUtilization,
    costBreakdown,
    demandDistribution,
    deliveryTimeDistribution,
    co2ByWarehouse,
  } = analytics;

  const COLORS = ['#D97706', '#78350F', '#15803D', '#DC2626', '#4F46E5', '#0891B2'];

  return (
    <div className="space-y-6">
      {/* Grid: Chart 1 & Chart 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 1. Cost vs Number of Warehouses */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-amber-600" />
                Cost vs. Number of Warehouses
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Evaluates trade-off between fixed lease and intra-city transit mileage
              </p>
            </div>
            <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
              Optimal: {selectedCount} Hubs
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costVsWarehouses} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E4" />
                <XAxis
                  dataKey="count"
                  tick={{ fontSize: 11, fill: '#78716C' }}
                  tickFormatter={(v) => `${v} Hubs`}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#78716C' }}
                  tickFormatter={(val) => `₹${val}L`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${val} Lakhs / day`, 'Total Daily Cost']}
                  labelFormatter={(lbl) => `${lbl} Open Warehouses`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E7E2D4',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#D97706"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#D97706', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 7, fill: '#B45309' }}
                />
                <ReferenceLine
                  x={selectedCount}
                  stroke="#15803D"
                  strokeDasharray="4 4"
                  label={{ value: 'Optimal Point', fill: '#15803D', fontSize: 10, position: 'top' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Warehouse Utilization */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Warehouse Utilization (% Capacity)
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Current order throughput compared against nominal facility capacity
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
              Balanced
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseUtilization} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E4" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716C' }} />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: '#78716C' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val}% (${formatNumber(item.payload.demand)} / ${formatNumber(item.payload.capacity)} orders)`,
                    'Utilization',
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E7E2D4',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="utilization" radius={[6, 6, 0, 0]}>
                  {warehouseUtilization.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.utilization > 85 ? '#D97706' : '#15803D'}
                    />
                  ))}
                </Bar>
                <ReferenceLine
                  y={85}
                  stroke="#DC2626"
                  strokeDasharray="3 3"
                  label={{ value: 'Capacity Threshold (85%)', fill: '#DC2626', fontSize: 10 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid: Chart 3 & Chart 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 3. Cost Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-600" />
                Logistics Cost Breakdown
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Proportion of expenditure allocated by operational category
              </p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`₹${val} Lakhs`, 'Amount']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E7E2D4',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(val, entry: any) => (
                    <span className="text-xs text-[#57534E]">
                      {val} ({entry.payload.percentage}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Demand Distribution (Top Zones) */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                Demand Distribution (Top Corridors)
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Aggregated daily vs. peak order volumes across key delivery sectors
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandDistribution} margin={{ top: 10, right: 15, left: 0, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E4" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#78716C' }}
                  angle={-30}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#78716C' }}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val: any) => [`${formatNumber(val)} orders`, 'Orders']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E7E2D4',
                    fontSize: '12px',
                  }}
                />
                <Legend verticalAlign="top" height={24} />
                <Bar dataKey="demand" name="Daily Demand" fill="#D97706" radius={[4, 4, 0, 0]} />
                <Bar dataKey="peak" name="Peak Volume" fill="#FDE68A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid: Chart 5 & Chart 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 5. Delivery Time Distribution Histogram */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Delivery Time Distribution
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Number of delivery zones reached within specified duration buckets
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
              Target: &lt;35 min
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryTimeDistribution} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E4" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#78716C' }} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: '#78716C' }}
                  tickFormatter={(v) => `${v} zones`}
                />
                <Tooltip
                  formatter={(val: any) => [`${val} Zones`, 'Zones Served']}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E7E2D4',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#4F46E5" radius={[6, 6, 0, 0]}>
                  {deliveryTimeDistribution.map((entry, idx) => (
                    <Cell
                      key={`time-${idx}`}
                      fill={idx <= 1 ? '#15803D' : idx === 2 ? '#D97706' : '#DC2626'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 6. CO2 Emissions by Facility */}
        <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                CO₂ Emissions by Warehouse Hub
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Metric tons of greenhouse gases generated by intra-city dispatches
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
              Eco-Routing
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={co2ByWarehouse} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E4" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716C' }} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#78716C' }}
                  tickFormatter={(v) => `${v} t`}
                />
                <Tooltip
                  formatter={(val: any, name: any, item: any) => [
                    `${val} tons CO₂ (${formatNumber(item.payload.fuel)} L fuel)`,
                    'Emissions',
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    borderColor: '#E7E2D4',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="co2" name="CO₂ Tons" fill="#15803D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
