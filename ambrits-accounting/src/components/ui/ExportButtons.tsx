// ============================================================
// ExportButtons — Reusable PDF / CSV / Excel export buttons
// ============================================================

import { FileText, FileSpreadsheet, FileDown } from 'lucide-react';
import { exportToPDF, exportToCSV, exportToExcel, type ExportColumn } from '../../utils/export';

interface ExportButtonsProps {
  columns: ExportColumn[];
  data: Record<string, any>[];
  filename: string;
  title: string;
  subtitle?: string;
  summary?: { label: string; value: string }[];
}

export default function ExportButtons({ columns, data, filename, title, subtitle, summary }: ExportButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => exportToPDF(columns, data, filename, title, subtitle, summary)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
      >
        <FileText size={16} />
        Export PDF
      </button>
      <button
        onClick={() => exportToExcel(columns, data, filename)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
      >
        <FileSpreadsheet size={16} />
        Export Excel
      </button>
      <button
        onClick={() => exportToCSV(columns, data, filename)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors"
      >
        <FileDown size={16} />
        Export CSV
      </button>
    </div>
  );
}
