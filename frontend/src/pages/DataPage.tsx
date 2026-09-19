import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Database,
  Upload,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { GridPoint, DemandZone } from '../types';
import { BENGALURU_800_POINTS } from '../data/rawBengaluruPoints';
import { formatNumber } from '../utils/formatters';

interface DataPageProps {
  onLoadCustomPoints: (points: GridPoint[]) => void;
  activePointCount: number;
}

export const DataPage: React.FC<DataPageProps> = ({
  onLoadCustomPoints,
  activePointCount,
}) => {
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [parsedPoints, setParsedPoints] = useState<GridPoint[] | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Handle CSV file upload
  const handleFileUpload = (file: File) => {
    setIsProcessing(true);
    setValidationErrors([]);
    setAppliedSuccess(false);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        setIsProcessing(false);
        const rows = results.data as any[];
        setParsedData(rows);

        // Validate and map columns
        const errors: string[] = [];
        const validPoints: GridPoint[] = [];

        rows.forEach((r, idx) => {
          const lat = r.latitude ?? r.lat ?? r.Latitude;
          const lng = r.longitude ?? r.lng ?? r.Longitude ?? r.lon;
          const orders = r.orders_per_day ?? r.orders ?? r.demand ?? r.Demand ?? 150;
          const traffic = r.traffic_index ?? r.traffic ?? 0.5;
          const price = r.price_per_sqft ?? r.price ?? 6500;
          const id = r.point_id ?? r.id ?? `PT_${idx + 1}`;

          if (lat === undefined || lng === undefined || isNaN(Number(lat)) || isNaN(Number(lng))) {
            if (errors.length < 5) {
              errors.push(`Row ${idx + 1}: Invalid or missing coordinates (lat: ${lat}, lng: ${lng})`);
            }
          } else {
            validPoints.push({
              id: String(id),
              lat: Number(lat),
              lng: Number(lng),
              orders: Number(orders),
              traffic: Number(traffic),
              price: Number(price),
            });
          }
        });

        if (validPoints.length === 0) {
          errors.push('No valid coordinate rows could be found in the uploaded file.');
        }

        setValidationErrors(errors);
        setParsedPoints(validPoints);
      },
      error: (err) => {
        setIsProcessing(false);
        setValidationErrors([`File parse failed: ${err.message}`]);
      },
    });
  };

  // Download Sample CSV matching Chokez1/namma-warehouse structure
  const downloadSampleCSV = () => {
    const sampleRows = BENGALURU_800_POINTS.slice(0, 50).map((pt) => ({
      point_id: pt.id,
      latitude: pt.lat,
      longitude: pt.lng,
      orders_per_day: pt.orders,
      traffic_index: pt.traffic || 0.65,
      price_per_sqft: pt.price || 6800,
    }));

    const csv = Papa.unparse(sampleRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bengaluru_sample_points.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const applyUploadedDataset = () => {
    if (parsedPoints && parsedPoints.length > 0) {
      onLoadCustomPoints(parsedPoints);
      setAppliedSuccess(true);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E7E2D4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <Database className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
              Data Management & Ingestion
            </h1>
          </div>
          <p className="text-xs text-[#78716C] mt-1">
            Seamlessly inspect repository datasets or ingest custom city spatial data with automated column detection.
          </p>
        </div>

        <button
          onClick={downloadSampleCSV}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E7E2D4] bg-white text-xs font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7EF] transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Sample CSV</span>
        </button>
      </div>

      {/* Repository Dataset Information Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5F0E4]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-[#1C1917]">
              Current Active Repository Datasets
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
            BBMP 800 Grid Synced
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="p-3 bg-[#FAF7EF] rounded-lg border border-[#E7E2D4]">
            <div className="font-bold text-[#1C1917] flex items-center justify-between">
              <span>grid.csv / demand.csv</span>
              <span className="text-[10px] text-amber-800 font-mono">800 Nodes</span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1">
              Bengaluru BBMP municipal boundary grid nodes with population-weighted daily demand.
            </p>
          </div>

          <div className="p-3 bg-[#FAF7EF] rounded-lg border border-[#E7E2D4]">
            <div className="font-bold text-[#1C1917] flex items-center justify-between">
              <span>prices.csv</span>
              <span className="text-[10px] text-amber-800 font-mono">198 Wards</span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1">
              Ward-wise commercial property prices (₹5,678 - ₹26,653/sq.ft) used for warehouse lease optimization.
            </p>
          </div>

          <div className="p-3 bg-[#FAF7EF] rounded-lg border border-[#E7E2D4]">
            <div className="font-bold text-[#1C1917] flex items-center justify-between">
              <span>traffic.csv</span>
              <span className="text-[10px] text-amber-800 font-mono">Corridor Indices</span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-1">
              Real-world road congestion multipliers dynamically incorporated into delivery transit speed models.
            </p>
          </div>
        </div>
      </div>

      {/* CSV File Upload Section */}
      <div className="bg-white p-5 rounded-xl border border-[#E7E2D4] shadow-xs">
        <h3 className="text-sm font-bold text-[#1C1917] mb-2">
          Ingest Custom Demand / Location CSV
        </h3>
        <p className="text-xs text-[#78716C] mb-4">
          Upload any CSV containing coordinates and demand. Supported columns: <code className="bg-[#FAF7EF] px-1 py-0.5 rounded text-[#78350F]">latitude/lat</code>, <code className="bg-[#FAF7EF] px-1 py-0.5 rounded text-[#78350F]">longitude/lng</code>, <code className="bg-[#FAF7EF] px-1 py-0.5 rounded text-[#78350F]">orders_per_day/demand</code>.
        </p>

        {/* Drag & Drop Area */}
        <label className="border-2 border-dashed border-[#D6CCBA] hover:border-amber-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FAF7EF]/40 hover:bg-amber-50/20">
          <Upload className="w-8 h-8 text-amber-600 mb-2" />
          <span className="font-bold text-sm text-[#1C1917]">
            Click to upload or drag & drop CSV file
          </span>
          <span className="text-xs text-[#78716C] mt-1">
            CSV files up to 25MB supported
          </span>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
            className="hidden"
          />
        </label>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-red-800">
              <AlertTriangle className="w-4 h-4" />
              <span>Dataset Validation Warnings ({validationErrors.length})</span>
            </div>
            {validationErrors.map((err, i) => (
              <div key={i} className="text-[11px] text-red-700 pl-5">
                • {err}
              </div>
            ))}
          </div>
        )}

        {/* Parsed Success & Action Bar */}
        {parsedPoints && parsedPoints.length > 0 && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-xs text-emerald-950">
                  {parsedPoints.length} valid data points parsed successfully!
                </div>
                <div className="text-[11px] text-emerald-800">
                  Total parsed volume: {formatNumber(parsedPoints.reduce((s, p) => s + p.orders, 0))} orders/day
                </div>
              </div>
            </div>

            <button
              onClick={applyUploadedDataset}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center gap-2 active:scale-95 shrink-0"
            >
              <span>Use This Dataset in Simulation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {appliedSuccess && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Active network updated with new dataset! Head to Dashboard or Scenarios to run optimization.
            </span>
          </div>
        )}
      </div>

      {/* Table Preview */}
      <div className="bg-white rounded-xl border border-[#E7E2D4] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E7E2D4] bg-[#FAF7EF]/40 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#1C1917] flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-600" />
              Dataset Rows Preview
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              {parsedData ? `Showing uploaded records` : `Showing Bengaluru BBMP baseline grid points`}
            </p>
          </div>
          <span className="text-xs font-mono text-[#78716C]">
            {parsedData ? parsedData.length : BENGALURU_800_POINTS.length} total rows
          </span>
        </div>

        <div className="overflow-x-auto max-h-72 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#FAF7EF] text-[#78716C] sticky top-0 z-10 border-b border-[#E7E2D4]">
              <tr>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">Point ID</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">Latitude</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">Longitude</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">Orders / Day</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">Traffic Index</th>
                <th className="py-2.5 px-3.5 font-bold uppercase tracking-wider text-[11px]">Price / Sq.Ft</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F0E4]">
              {(parsedPoints || BENGALURU_800_POINTS).slice(0, 30).map((pt, i) => (
                <tr key={i} className="hover:bg-[#FAF7EF]/60">
                  <td className="py-2 px-3.5 font-mono font-bold text-[#1C1917]">{pt.id}</td>
                  <td className="py-2 px-3.5 font-mono text-[#57534E]">{pt.lat.toFixed(5)}</td>
                  <td className="py-2 px-3.5 font-mono text-[#57534E]">{pt.lng.toFixed(5)}</td>
                  <td className="py-2 px-3.5 font-semibold text-[#1C1917]">{formatNumber(pt.orders)}</td>
                  <td className="py-2 px-3.5 font-mono text-[#78716C]">{(pt.traffic || 0.65).toFixed(2)}</td>
                  <td className="py-2 px-3.5 font-mono text-[#78716C]">₹{formatNumber(pt.price || 6500)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
