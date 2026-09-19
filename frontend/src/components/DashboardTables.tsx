import React, { useState } from 'react';
import {
  Building,
  CheckCircle,
  Activity,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { Warehouse, ActivityEvent } from '../types';
import {
  formatINR,
  formatNumber,
  formatPercent,
} from '../utils/formatters';

interface DashboardTablesProps {
  warehouses: Warehouse[];
  events: ActivityEvent[];
  onToggleWarehouse?: (id: string) => void;
}

export const DashboardTables: React.FC<DashboardTablesProps> = ({
  warehouses,
  events,
  onToggleWarehouse,
}) => {
  const [filter, setFilter] = useState<'all' | 'selected'>('all');

  const filteredWarehouses =
    filter === 'selected' ? warehouses.filter((w) => w.isSelected) : warehouses;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#261B14] tracking-tight">
          Facilities Roster & Live Network Feed
        </h3>
        <p className="text-xs sm:text-sm text-[#7A7168] mt-0.5">
          Detailed inventory capacities, lease economics, and real-time operational telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Left 2 Cols: Warehouse Roster Table with generous spacing */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E8E0CE] shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-[#E8E0CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF5E8]/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3E3] border border-[#EFE5D0] flex items-center justify-center text-[#9E471A]">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#1F1A16] font-serif">
                  Bengaluru Candidate & Active Warehouses
                </h4>
                <p className="text-xs text-[#7A7168]">
                  BBMP municipal ward coordinates and daily operational capacity
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E0CE] text-xs self-start sm:self-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  filter === 'all'
                    ? 'bg-[#FDE89C] text-[#3D270C]'
                    : 'text-[#7A7168] hover:text-[#1F1A16]'
                }`}
              >
                All ({warehouses.length})
              </button>
              <button
                onClick={() => setFilter('selected')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                  filter === 'selected'
                    ? 'bg-[#FDE89C] text-[#3D270C]'
                    : 'text-[#7A7168] hover:text-[#1F1A16]'
                }`}
              >
                Selected ({warehouses.filter((w) => w.isSelected).length})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs text-[#1F1A16]">
              <thead className="bg-[#FAF5E8]/80 text-[#7A7168] text-[11px] uppercase tracking-wider border-b border-[#E8E0CE]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Warehouse / Ward</th>
                  <th className="px-4 py-3 font-semibold">Capacity</th>
                  <th className="px-4 py-3 font-semibold">Cost / Day</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5EFE0]">
                {filteredWarehouses.map((w) => (
                  <tr
                    key={w.id}
                    className={`transition-colors hover:bg-amber-50/40 ${
                      w.isSelected ? 'bg-amber-50/20 font-medium' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            w.isSelected ? 'bg-emerald-500 ring-2 ring-emerald-200' : 'bg-stone-300'
                          }`}
                        />
                        <div>
                          <div className="font-bold text-xs text-[#1F1A16]">{w.name}</div>
                          <div className="text-[11px] text-[#7A7168]">
                            {w.location} ({w.id})
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-mono text-xs">{formatNumber(w.capacity)} orders</div>
                      <div className="text-[11px] text-[#8C8377]">{w.location}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-xs text-[#9E471A]">
                        {formatINR(w.operatingCost / 100000)}
                      </span>
                      <div className="text-[10px] text-[#A8A29E]">Lease + labor</div>
                    </td>
                    <td className="px-4 py-3.5">
                      {w.isSelected ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100/80 text-emerald-900 border border-emerald-300">
                          <CheckCircle className="w-3 h-3 text-emerald-700" />
                          <span>Active Hub</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                          Standby Candidate
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => onToggleWarehouse?.(w.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                          w.isSelected
                            ? 'border-red-200 text-red-700 hover:bg-red-50'
                            : 'border-amber-300 bg-[#FFF8EE] text-[#9E471A] hover:bg-amber-100'
                        }`}
                      >
                        {w.isSelected ? 'Deactivate' : 'Select'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3.5 bg-[#FAF5E8]/60 border-t border-[#E8E0CE] text-[11px] text-[#7A7168] flex items-center justify-between px-5">
            <span>Showing {filteredWarehouses.length} locations across BBMP limits</span>
            <span className="font-semibold text-[#9E471A]">Live Optimization Sync Enabled</span>
          </div>
        </div>

        {/* Right 1 Col: Live Activity Feed */}
        <div className="bg-white rounded-2xl border border-[#E8E0CE] shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="p-5 border-b border-[#E8E0CE] flex items-center justify-between bg-[#FAF5E8]/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3E3] border border-[#EFE5D0] flex items-center justify-center text-[#9E471A]">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm sm:text-base text-[#1F1A16] font-serif">
                Activity Feed
              </h4>
            </div>
            <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>

          <div className="p-5 divide-y divide-[#F5EFE0] overflow-y-auto max-h-[380px] flex-1 space-y-3">
            {events.slice(0, 7).map((ev) => (
              <div key={ev.id} className="pt-3 first:pt-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs capitalize text-[#1F1A16]">
                    {ev.type} update
                  </span>
                  <span className="text-[10px] text-[#A8A29E] shrink-0">{ev.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#6B6156] mt-0.5 leading-relaxed">{ev.message}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-[#8C8377]">
                  <span className="font-mono bg-[#FAF5E8] px-1.5 py-0.5 rounded border border-[#E8E0CE] capitalize">
                    {ev.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#FAF5E8]/60 border-t border-[#E8E0CE] text-center text-xs text-[#9E471A] font-bold">
            800 coordinate nodes polled continuously
          </div>
        </div>
      </div>
    </section>
  );
};
