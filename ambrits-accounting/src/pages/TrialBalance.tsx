import { useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { calculateTrialBalance } from '../engine/accounting';
import ExportButtons from '../components/ui/ExportButtons';
import type { ExportColumn } from '../utils/export';

export default function TrialBalance() {
  const { journalEntries, journalLines, accounts, currentPeriod } = useApp();

  const { rows, totalDebit, totalCredit, difference } = useMemo(() =>
    calculateTrialBalance(journalEntries, journalLines, accounts, currentPeriod.startDate, currentPeriod.endDate),
    [journalEntries, journalLines, accounts, currentPeriod]
  );

  const isBalanced = Math.abs(difference) < 0.01;

  const exportColumns: ExportColumn[] = [
    { header: 'Code', key: 'accountCode', width: 10 },
    { header: 'Account Name', key: 'accountName', width: 30 },
    { header: 'Type', key: 'accountType', width: 12 },
    { header: 'Opening Dr', key: 'openingDebit', width: 15 },
    { header: 'Opening Cr', key: 'openingCredit', width: 15 },
    { header: 'Period Dr', key: 'periodDebit', width: 15 },
    { header: 'Period Cr', key: 'periodCredit', width: 15 },
    { header: 'Closing Dr', key: 'closingDebit', width: 15 },
    { header: 'Closing Cr', key: 'closingCredit', width: 15 },
  ];

  const exportData = rows.map(r => ({
    ...r,
    openingDebit: r.openingDebit > 0 ? `₹${r.openingDebit.toLocaleString()}` : '',
    openingCredit: r.openingCredit > 0 ? `₹${r.openingCredit.toLocaleString()}` : '',
    periodDebit: r.periodDebit > 0 ? `₹${r.periodDebit.toLocaleString()}` : '',
    periodCredit: r.periodCredit > 0 ? `₹${r.periodCredit.toLocaleString()}` : '',
    closingDebit: r.closingDebit > 0 ? `₹${r.closingDebit.toLocaleString()}` : '',
    closingCredit: r.closingCredit > 0 ? `₹${r.closingCredit.toLocaleString()}` : '',
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Trial Balance</h1>
          <p className="text-sm text-slate-500 mt-1">{currentPeriod.periodName} — {currentPeriod.startDate} to {currentPeriod.endDate}</p>
        </div>
        <ExportButtons
          columns={exportColumns}
          data={exportData}
          filename={`trial-balance-${currentPeriod.periodName}`}
          title="Trial Balance"
          subtitle={`${currentPeriod.periodName} — ${currentPeriod.startDate} to ${currentPeriod.endDate}`}
          summary={[
            { label: 'Total Debit:', value: `₹${totalDebit.toLocaleString()}` },
            { label: 'Total Credit:', value: `₹${totalCredit.toLocaleString()}` },
            { label: 'Difference:', value: `₹${difference.toLocaleString()}` },
          ]}
        />
      </div>

      {/* Balance Status Banner */}
      <div className={`rounded-xl p-4 ${isBalanced ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBalanced ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <span className="text-lg">{isBalanced ? '✓' : '!'}</span>
          </div>
          <div>
            <p className={`font-semibold ${isBalanced ? 'text-green-800' : 'text-red-800'}`}>
              {isBalanced ? 'Trial Balance is Balanced' : 'Trial Balance is NOT Balanced'}
            </p>
            {!isBalanced && <p className="text-sm text-red-600">Difference: ₹{difference.toLocaleString()}</p>}
          </div>
        </div>
      </div>

      {/* Trial Balance Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Account Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Opening Dr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Opening Cr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Period Dr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Period Cr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Closing Dr</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Closing Cr</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.accountId} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-mono text-slate-800">{r.accountCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{r.accountName}</td>
                  <td className="px-4 py-3 text-xs text-slate-500 capitalize">{r.accountType}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">{r.openingDebit > 0 ? `₹${r.openingDebit.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">{r.openingCredit > 0 ? `₹${r.openingCredit.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">{r.periodDebit > 0 ? `₹${r.periodDebit.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-600">{r.periodCredit > 0 ? `₹${r.periodCredit.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-slate-700">{r.closingDebit > 0 ? `₹${r.closingDebit.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-3 text-sm text-right font-medium text-slate-700">{r.closingCredit > 0 ? `₹${r.closingCredit.toLocaleString()}` : ''}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 border-t-2 border-slate-300 font-bold">
                <td colSpan={3} className="px-4 py-3 text-sm text-slate-800">TOTAL</td>
                <td className="px-4 py-3 text-sm text-right">{rows.reduce((s, r) => s + r.openingDebit, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right">{rows.reduce((s, r) => s + r.openingCredit, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right">{rows.reduce((s, r) => s + r.periodDebit, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right">{rows.reduce((s, r) => s + r.periodCredit, 0).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right text-blue-700">{totalDebit.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-right text-blue-700">{totalCredit.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
