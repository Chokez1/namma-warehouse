import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import { DemandZone } from '../types';
import { formatNumber, formatMinutes } from '../utils/formatters';

interface DemandTableProps {
  zones: DemandZone[];
}

export const DemandTable: React.FC<DemandTableProps> = ({ zones }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'dailyDemand' | 'deliveryTimeMinutes'>('dailyDemand');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'dailyDemand' | 'deliveryTimeMinutes') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedZones = useMemo(() => {
    return zones
      .filter(
        (z) =>
          z.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          z.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          z.assignedWarehouseId.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (sortOrder === 'asc') return valA - valB;
        return valB - valA;
      });
  }, [zones, searchTerm, sortField, sortOrder]);

  return (
    <div className="bg-white rounded-xl border border-[#E7E2D4] shadow-xs overflow-hidden flex flex-col">
      {/* Table Header & Search */}
      <div className="p-4 border-b border-[#E7E2D4] bg-[#FAF7EF]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            Demand Zones Dispatch Schedule
          </h3>
          <p className="text-xs text-[#78716C] mt-0.5">
            {zones.length} urban districts mapped to assigned fulfillment hubs
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            placeholder="Search locality or hub..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E7E2D4] rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-[#1C1917]"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-[#FAF7EF] text-[#78716C] sticky top-0 z-10 border-b border-[#E7E2D4]">
            <tr>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Zone ID
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Locality / Hub
              </th>
              <th
                onClick={() => handleSort('dailyDemand')}
                className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px] cursor-pointer hover:text-[#1C1917]"
              >
                <div className="flex items-center gap-1">
                  <span>Daily Demand</span>
                  {sortField === 'dailyDemand' ? (
                    sortOrder === 'desc' ? (
                      <ArrowDown className="w-3 h-3 text-amber-600" />
                    ) : (
                      <ArrowUp className="w-3 h-3 text-amber-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 opacity-40" />
                  )}
                </div>
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Priority
              </th>
              <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">
                Assigned Hub
              </th>
              <th
                onClick={() => handleSort('deliveryTimeMinutes')}
                className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px] cursor-pointer hover:text-[#1C1917]"
              >
                <div className="flex items-center gap-1">
                  <span>Delivery Time</span>
                  {sortField === 'deliveryTimeMinutes' ? (
                    sortOrder === 'desc' ? (
                      <ArrowDown className="w-3 h-3 text-amber-600" />
                    ) : (
                      <ArrowUp className="w-3 h-3 text-amber-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 opacity-40" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F0E4]">
            {filteredAndSortedZones.map((zone) => (
              <tr key={zone.id} className="hover:bg-[#FAF7EF]/60 transition-colors">
                <td className="py-2.5 px-3.5 font-mono text-[11px] font-bold text-[#57534E]">
                  {zone.id}
                </td>
                <td className="py-2.5 px-3.5 font-bold text-[#1C1917]">
                  {zone.name}
                </td>
                <td className="py-2.5 px-3.5 font-semibold text-[#1C1917]">
                  {formatNumber(zone.dailyDemand)}{' '}
                  <span className="text-[10px] text-[#A8A29E] font-normal">orders</span>
                </td>
                <td className="py-2.5 px-3.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      zone.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : zone.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {zone.priority}
                  </span>
                </td>
                <td className="py-2.5 px-3.5">
                  {zone.assignedWarehouseId ? (
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                      {zone.assignedWarehouseId}
                    </span>
                  ) : (
                    <span className="text-stone-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="py-2.5 px-3.5 font-mono font-bold text-[#292524]">
                  {formatMinutes(zone.deliveryTimeMinutes)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
