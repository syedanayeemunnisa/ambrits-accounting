import { useMemo } from 'react';
import { useApp } from '../store/AppContext';
import { calculateProfitAndLoss } from '../engine/accounting';
import ExportButtons from '../components/ui/ExportButtons';
import type { ExportColumn } from '../utils/export';

export default function ProfitLoss() {
  const { journalEntries, journalLines, accounts, currentPeriod } = useApp();

  const pnl = useMemo(() =>
    calculateProfitAndLoss(journalEntries, journalLines, accounts, currentPeriod.startDate, currentPeriod.endDate),
    [journalEntries, journalLines, accounts, currentPeriod]
  );

  const totalRevenue = pnl.revenue.reduce((s, r) => s + r.amount, 0);
  const totalExpenses = pnl.directCosts.reduce((s, r) => s + r.amount, 0) + pnl.operatingExpenses.reduce((s, r) => s + r.amount, 0);

  const pnlColumns: ExportColumn[] = [
    { header: 'Category', key: 'category', width: 40 },
    { header: 'Type', key: 'type', width: 20 },
    { header: 'Amount', key: 'amount', width: 20 },
  ];

  const pnlData = [
    ...pnl.revenue.map(r => ({ category: r.category, type: 'Revenue', amount: `₹${r.amount.toLocaleString()}` })),
    { category: 'Total Revenue', type: '', amount: `₹${totalRevenue.toLocaleString()}` },
    ...pnl.directCosts.map(r => ({ category: r.category, type: 'Direct Cost', amount: `₹${r.amount.toLocaleString()}` })),
    ...pnl.operatingExpenses.map(r => ({ category: r.category, type: 'Operating Expense', amount: `₹${r.amount.toLocaleString()}` })),
    { category: 'Total Expenses', type: '', amount: `₹${totalExpenses.toLocaleString()}` },
    { category: 'Net Profit / (Loss)', type: '', amount: `₹${pnl.netProfit.toLocaleString()}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Profit & Loss Statement</h1>
          <p className="text-sm text-slate-500 mt-1">{currentPeriod.periodName} — {currentPeriod.startDate} to {currentPeriod.endDate}</p>
        </div>
        <ExportButtons
          columns={pnlColumns}
          data={pnlData}
          filename={`profit-loss-${currentPeriod.periodName}`}
          title="Profit & Loss Statement"
          subtitle={`${currentPeriod.periodName} — ${currentPeriod.startDate} to ${currentPeriod.endDate}`}
          summary={[
            { label: 'Total Revenue:', value: `₹${totalRevenue.toLocaleString()}` },
            { label: 'Total Expenses:', value: `₹${(pnl.directCosts.reduce((s, r) => s + r.amount, 0) + pnl.operatingExpenses.reduce((s, r) => s + r.amount, 0)).toLocaleString()}` },
            { label: 'Net Profit:', value: `₹${pnl.netProfit.toLocaleString()}` },
          ]}
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Ambrits Training Hub</h2>
        <p className="text-sm text-slate-500 mb-6">Profit & Loss Statement for {currentPeriod.periodName}</p>

        {/* Revenue */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">Revenue</h3>
          {pnl.revenue.map(r => (
            <div key={r.category} className="flex justify-between py-1.5">
              <span className="text-sm text-slate-600">{r.category}</span>
              <span className="text-sm font-medium text-slate-700">₹{r.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-t border-slate-200 mt-2">
            <span className="text-sm font-bold text-slate-800">Total Revenue</span>
            <span className="text-sm font-bold text-green-700">₹{totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Direct Costs */}
        {pnl.directCosts.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">Direct Costs</h3>
            {pnl.directCosts.map(r => (
              <div key={r.category} className="flex justify-between py-1.5">
                <span className="text-sm text-slate-600">{r.category}</span>
                <span className="text-sm font-medium text-slate-700">₹{r.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-t border-slate-200 mt-2">
              <span className="text-sm font-bold text-slate-800">Gross Profit</span>
              <span className={`text-sm font-bold ${pnl.grossProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                ₹{pnl.grossProfit.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Operating Expenses */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">Operating Expenses</h3>
          {pnl.operatingExpenses.map(r => (
            <div key={r.category} className="flex justify-between py-1.5">
              <span className="text-sm text-slate-600">{r.category}</span>
              <span className="text-sm font-medium text-slate-700">₹{r.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-t border-slate-200 mt-2">
            <span className="text-sm font-bold text-slate-800">Total Operating Expenses</span>
            <span className="text-sm font-bold text-red-700">
              ₹{pnl.operatingExpenses.reduce((s, r) => s + r.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Net Profit */}
        <div className={`p-4 rounded-lg ${pnl.netProfit >= 0 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex justify-between">
            <span className="text-lg font-bold text-slate-800">Net Profit / (Loss)</span>
            <span className={`text-lg font-bold ${pnl.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              ₹{pnl.netProfit.toLocaleString()}
            </span>
          </div>
          {totalRevenue > 0 && (
            <div className="text-right mt-1">
              <span className="text-xs text-slate-500">Profit Margin: {((pnl.netProfit / totalRevenue) * 100).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
