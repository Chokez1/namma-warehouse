import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { TrendingDown, Layers, PieChart as PieIcon } from 'lucide-react';
import { OptimizationResult } from '../types';

interface DashboardChartsProps {
  analytics: OptimizationResult['analytics'];
  selectedCount: number;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  analytics,
  selectedCount = 3,
}) => {
  const { costVsWarehouses } = analytics;

  const DONUT_COLORS = ['#3D2411', '#B45309', '#C7B08B'];

  const utilizationData = [
    { name: 'W1', value: 85, location: 'Koramangala' },
    { name: 'W2', value: 76, location: 'Whitefield' },
    { name: 'W3', value: 71, location: 'Peenya' },
  ];

  const costBreakdownData = [
    { name: 'Transportation', value: 32, color: '#D97706' },
    { name: 'Warehouse Lease', value: 28, color: '#4A2E12' },
    { name: 'Labour & Pick', value: 18, color: '#8C592C' },
    { name: 'Fuel & EV Charging', value: 12, color: '#C9A977' },
    { name: 'Overhead & Maint', value: 10, color: '#E5D8C3' },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#261B14] tracking-tight">
          Financial & Operational Analytics
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7168] mt-0.5">
          Cost-to-serve tradeoffs, warehouse capacity utilization, and expenditure splits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* 1. Cost vs Number of Warehouses */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E0CE] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-sm text-[#1F1A16] flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-amber-600" />
                <span>Cost vs Warehouses Curve</span>
              </h4>
              <p className="text-xs text-[#7A7168] mt-0.5">
                Balancing fixed warehouse lease with road transit
              </p>
            </div>
            <span className="text-xs font-bold bg-[#FDE89C] text-[#3D270C] px-2.5 py-1 rounded-full border border-amber-300">
              Optimal: {selectedCount} hubs
            </span>
          </div>

          <div className="h-52 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={costVsWarehouses}
                margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#F5EFE0" />
                <XAxis
                  dataKey="count"
                  tick={{ fontSize: 11, fill: '#7A7168' }}
                  tickFormatter={(v) => `${v} Hubs`}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#7A7168' }}
                  tickFormatter={(val) => `₹${val}L`}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${val} Lakhs`, 'Total Cost']}
                  labelFormatter={(lbl) => `${lbl} Warehouses`}
                  contentStyle={{
                    backgroundColor: '#FAF5E8',
                    borderRadius: '10px',
                    borderColor: '#E8E0CE',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#D97706"
                  strokeWidth={3}
                  dot={{ r: 4.5, fill: '#8C592C', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 7, fill: '#D97706' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Warehouse Utilization */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E0CE] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-sm text-[#1F1A16] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#8C592C]" />
                <span>Warehouse Utilization</span>
              </h4>
              <p className="text-xs text-[#7A7168] mt-0.5">
                Active capacity & inventory throughput
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Optimal Load
            </span>
          </div>

          <div className="flex items-center justify-between h-52">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell
                        key={`util-${index}`}
                        fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Capacity Used']}
                    contentStyle={{
                      backgroundColor: '#FAF5E8',
                      borderRadius: '10px',
                      borderColor: '#E8E0CE',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Metric Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base font-black text-[#1F1A16] font-['Space_Grotesk']">
                  78%
                </span>
                <span className="text-[9px] font-bold text-[#7A7168] uppercase tracking-wider">
                  Avg. Load
                </span>
              </div>
            </div>

            {/* Legend with generous spacing */}
            <div className="space-y-2.5 text-xs flex-1 pl-3">
              {utilizationData.map((u, i) => (
                <div key={u.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: DONUT_COLORS[i] }}
                    />
                    <span className="text-xs font-bold text-[#1F1A16]">
                      {u.name}
                    </span>
                    <span className="text-[11px] text-[#8C8377] truncate max-w-[80px]">
                      {u.location}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1F1A16]">
                    {u.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Cost Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E0CE] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-bold text-sm text-[#1F1A16] flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-amber-700" />
                <span>Opex Breakdown</span>
              </h4>
              <p className="text-xs text-[#7A7168] mt-0.5">
                Daily expenditure allocation
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between h-52">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={36}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cost-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, 'Share']}
                    contentStyle={{
                      backgroundColor: '#FAF5E8',
                      borderRadius: '10px',
                      borderColor: '#E8E0CE',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs flex-1 pl-2">
              {costBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[11px] text-[#5C5248] truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1F1A16]">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
