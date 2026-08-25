import { useState, useMemo } from 'react';
import { useApp } from '../store/AppContext';

export default function GeneralLedger() {
  const { journalEntries, journalLines, accounts } = useApp();
  const [selectedAccount, setSelectedAccount] = useState('acc-1200');

  const account = accounts.find(a => a.id === selectedAccount);

  const ledgerEntries = useMemo(() => {
    const relevantLines = journalLines.filter(l => l.accountId === selectedAccount);
    let runningBalance = 0;
    return relevantLines.map(l => {
      const entry = journalEntries.find(j => j.id === l.journalId);
      if (l.debitAmount > 0) runningBalance += l.debitAmount;
      else runningBalance -= l.creditAmount;
      return {
        ...l,
        journalDate: entry?.journalDate || '',
        journalNumber: entry?.journalNumber || '',
        voucherType: entry?.journalType || '',
        narration: entry?.narration || '',
        runningBalance,
      };
    }).sort((a, b) => a.journalDate.localeCompare(b.journalDate));
  }, [selectedAccount, journalLines, journalEntries]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">General Ledger</h1>
        <p className="text-sm text-slate-500 mt-1">Account-wise transaction history</p>
      </div>

      {/* Account Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-slate-700">Select Account:</label>
        <select
          value={selectedAccount}
          onChange={e => setSelectedAccount(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {accounts.filter(a => a.isActive).map(a => (
            <option key={a.id} value={a.id}>{a.accountCode} — {a.accountName}</option>
          ))}
        </select>
      </div>

      {account && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-blue-800">{account.accountCode}</span>
            <span className="text-lg font-medium text-blue-700">{account.accountName}</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs uppercase">{account.accountType}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Journal #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Narration</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Debit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Credit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">No transactions for this account</td>
                </tr>
              ) : (
                ledgerEntries.map((le, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-600">{le.journalDate}</td>
                    <td className="px-4 py-3 text-sm font-mono text-blue-600">{le.journalNumber}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 capitalize">{le.voucherType.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{le.narration}</td>
                    <td className="px-4 py-3 text-sm text-right">{le.debitAmount > 0 ? `₹${le.debitAmount.toLocaleString()}` : ''}</td>
                    <td className="px-4 py-3 text-sm text-right">{le.creditAmount > 0 ? `₹${le.creditAmount.toLocaleString()}` : ''}</td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-slate-800">₹{le.runningBalance.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
            {ledgerEntries.length > 0 && (
              <tfoot>
                <tr className="bg-slate-50 border-t-2 border-slate-300 font-bold">
                  <td colSpan={4} className="px-4 py-3 text-sm">Total</td>
                  <td className="px-4 py-3 text-sm text-right">₹{ledgerEntries.reduce((s, l) => s + l.debitAmount, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">₹{ledgerEntries.reduce((s, l) => s + l.creditAmount, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">₹{ledgerEntries[ledgerEntries.length - 1]?.runningBalance.toLocaleString()}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
