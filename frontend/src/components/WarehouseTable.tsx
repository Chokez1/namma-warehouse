import React from 'react';
import { Warehouse as WarehouseIcon, Building, Activity } from 'lucide-react';
import { Warehouse } from '../types';
import { formatNumber, formatINR } from '../utils/formatters';

interface WarehouseTableProps {
  warehouses: Warehouse[];
  onToggleWarehouse?: (warehouseId: string) => void;
}

export const WarehouseTable: React.FC<WarehouseTableProps> = ({
  warehouses,
  onToggleWarehouse,
}) => {
  const getStatusBadge = (status: Warehouse['status'], isSelected: boolean) => {
    if (status === 'Offline') {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
          Offline
        </span>
      );
    }
    if (isSelected) {
      if (status === 'Near Capacity') {
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            Near Capacity
          </span>
        );
      }
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          Optimal
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
        Candidate (Standby)
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-[#E7E2D4] shadow-xs overflow-hidden flex flex-col">
      <div className="p-4 border-b border-[#E7E2D4] bg-[#FAF7EF]/40 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
            <WarehouseIcon className="w-4 h-4 text-amber-600" />
            Candidate Warehouses & Fulfillment Hubs
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            Regional industrial logistics parks across Greater Bengaluru
          </p>
        </div>
      </div>

      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-[#FAF7EF] text-[#78716C] sticky top-0 z-10 border-b border-[#E7E2D4]">
            <tr>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Hub ID
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Warehouse Name & Location
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Capacity
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px] w-40">
                Utilization
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Demand Served
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Daily Opex
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0E4]">
            {warehouses.map((w) => (
              <tr
                key={w.id}
                className={`transition-colors ${
                  w.isSelected
                    ? 'bg-emerald-50/30 hover:bg-emerald-50/60'
                    : 'hover:bg-[#FAF7EF]/60'
                }`}
              >
                <td className="py-2.5 px-3.5 font-mono text-[11px] font-bold text-[#1C1917]">
                  <div className="flex items-center gap-1.5">
                    {w.isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                    <span>{w.id}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3.5">
                  <div className="font-bold text-[#1C1917]">{w.name}</div>
                  <div className="text-[10px] text-[#78716C]">{w.location}</div>
                </td>
                <td className="py-2.5 px-3.5 font-semibold text-[#57534E]">
                  {formatNumber(w.capacity)}{' '}
                  <span className="text-[10px] text-[#A8A29E]">orders/d</span>
                </td>
                <td className="py-2.5 px-3.5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold text-[#1C1917]">{w.utilization}%</span>
                      {w.isSelected && (
                        <span className="text-[10px] text-[#78716C]">
                          {w.assignedZones.length} zones
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-[#E7E2D4] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          w.utilization > 85
                            ? 'bg-amber-600'
                            : w.utilization > 0
                            ? 'bg-emerald-600'
                            : 'bg-stone-300'
                        }`}
                        style={{ width: `${w.utilization}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2.5 px-3.5 font-semibold text-[#1C1917]">
                  {formatNumber(w.demandServed)}
                </td>
                <td className="py-2.5 px-3.5 font-mono font-semibold text-[#1C1917]">
                  {formatINR(w.operatingCost / 100000)}
                </td>
                <td className="py-2.5 px-3.5">
                  {getStatusBadge(w.status, w.isSelected)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
