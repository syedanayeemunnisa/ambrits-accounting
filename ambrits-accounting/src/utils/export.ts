// ============================================================
// Export Utilities — PDF, CSV, Excel
// ============================================================

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface ExportColumn {
  header: string;
  key: string;
  width?: number;
}

// ---------- CSV Export ----------
export function exportToCSV(columns: ExportColumn[], data: Record<string, any>[], filename: string) {
  const headers = columns.map(c => c.header);
  const rows = data.map(row =>
    columns.map(c => {
      const val = row[c.key];
      if (val === null || val === undefined) return '';
      const str = String(val).replace(/"/g, '""');
      return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str}"` : str;
    })
  );

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
}

// ---------- Excel Export ----------
export function exportToExcel(columns: ExportColumn[], data: Record<string, any>[], filename: string, sheetName = 'Sheet1') {
  const headers = columns.map(c => c.header);
  const rows = data.map(row =>
    columns.map(c => row[c.key] ?? '')
  );

  const wsData = [headers, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Set column widths
  ws['!cols'] = columns.map(c => ({ wch: c.width || Math.max(c.header.length, 15) }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// ---------- PDF Export ----------
export function exportToPDF(
  columns: ExportColumn[],
  data: Record<string, any>[],
  filename: string,
  title: string,
  subtitle?: string,
  summary?: { label: string; value: string }[]
) {
  const doc = new jsPDF({ orientation: columns.length > 6 ? 'landscape' : 'portrait' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Ambrits Training Hub', pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(13);
  doc.text(title, pageWidth / 2, 23, { align: 'center' });

  if (subtitle) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(subtitle, pageWidth / 2, 29, { align: 'center' });
    doc.setTextColor(0, 0, 0);
  }

  const startY = subtitle ? 35 : 28;

  // Table
  autoTable(doc, {
    startY,
    head: [columns.map(c => c.header)],
    body: data.map(row => columns.map(c => {
      const val = row[c.key];
      return val === null || val === undefined ? '' : String(val);
    })),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 8 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 10, right: 10 },
  });

  // Summary
  if (summary) {
    const finalY = (doc as any).lastAutoTable.finalY || startY;
    let y = finalY + 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    summary.forEach(s => {
      doc.text(s.label, 14, y);
      doc.text(s.value, pageWidth - 14, y, { align: 'right' });
      y += 5;
    });
  }

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150);
  const date = new Date().toLocaleString();
  doc.text(`Generated on ${date}`, 14, doc.internal.pageSize.getHeight() - 8);
  doc.text('Ambrits Training Hub — Accounting System', pageWidth - 14, doc.internal.pageSize.getHeight() - 8, { align: 'right' });

  doc.save(`${filename}.pdf`);
}
