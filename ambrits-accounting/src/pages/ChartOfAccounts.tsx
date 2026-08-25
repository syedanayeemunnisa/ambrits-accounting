import { useApp } from '../store/AppContext';
import { useState } from 'react';

const typeColors: Record<string, string> = {
  asset: 'bg-blue-100 text-blue-700',
  liability: 'bg-red-100 text-red-700',
  income: 'bg-green-100 text-green-700',
  expense: 'bg-orange-100 text-orange-700',
  equity: 'bg-purple-100 text-purple-700',
};

export default function ChartOfAccounts() {
  const { accounts } = useApp();
  const [filter, setFilter] = useState('all');

  const types = ['all', 'asset', 'liability', 'income', 'expense', 'equity'];
  const filtered = filter === 'all' ? accounts : accounts.filter(a => a.accountType === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Chart of Accounts</h1>
          <p className="text-sm text-slate-500 mt-1">{accounts.length} accounts</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add Account
        </button>
      </div>

      {/* Type Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === t ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Account Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Normal Bal.</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Opening Balance</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">System</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-slate-800">{a.accountCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{a.accountName}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[a.accountType]}`}>
                      {a.accountType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 capitalize">{a.normalBalance}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-700">₹{a.openingBalance.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    {a.isSystemAccount && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">System</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`w-2 h-2 rounded-full inline-block ${a.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
