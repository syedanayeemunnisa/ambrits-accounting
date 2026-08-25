import { useApp } from '../store/AppContext';
import ExportButtons from '../components/ui/ExportButtons';
import type { ExportColumn } from '../utils/export';

export default function DayBook() {
  const { journalEntries, currentPeriod } = useApp();

  const sorted = [...journalEntries].sort((a, b) => b.journalDate.localeCompare(a.journalDate));

  const exportColumns: ExportColumn[] = [
    { header: 'Date', key: 'journalDate', width: 12 },
    { header: 'Journal #', key: 'journalNumber', width: 22 },
    { header: 'Type', key: 'journalType', width: 15 },
    { header: 'Narration', key: 'narration', width: 45 },
    { header: 'Student', key: 'studentName', width: 20 },
    { header: 'Course', key: 'courseName', width: 15 },
    { header: 'Debit', key: 'totalDebit', width: 15 },
    { header: 'Credit', key: 'totalCredit', width: 15 },
    { header: 'Status', key: 'status', width: 10 },
  ];

  const exportData = sorted.map(j => ({
    ...j,
    totalDebit: `₹${j.totalDebit.toLocaleString()}`,
    totalCredit: `₹${j.totalCredit.toLocaleString()}`,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Day Book</h1>
          <p className="text-sm text-slate-500 mt-1">Chronological record of all accounting transactions</p>
        </div>
        <ExportButtons
          columns={exportColumns}
          data={exportData}
          filename={`day-book-${currentPeriod.periodName}`}
          title="Day Book"
          subtitle="Chronological record of all transactions"
          summary={[
            { label: 'Total Debit:', value: `₹${sorted.reduce((s, j) => s + j.totalDebit, 0).toLocaleString()}` },
            { label: 'Total Credit:', value: `₹${sorted.reduce((s, j) => s + j.totalCredit, 0).toLocaleString()}` },
          ]}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Journal #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Narration</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Debit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Credit</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(je => (
                <tr key={je.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-600">{je.journalDate}</td>
                  <td className="px-4 py-3 text-sm font-mono text-blue-600">{je.journalNumber}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                      {je.journalType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{je.narration}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{je.studentName || '—'}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{je.courseName || '—'}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">₹{je.totalDebit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium">₹{je.totalCredit.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      je.status === 'posted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{je.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 border-t-2 border-slate-300 font-bold">
                <td colSpan={6} className="px-4 py-3 text-sm">TOTAL</td>
                <td className="px-4 py-3 text-sm text-right">₹{sorted.reduce((s, j) => s + j.totalDebit, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right">₹{sorted.reduce((s, j) => s + j.totalCredit, 0).toLocaleString()}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
