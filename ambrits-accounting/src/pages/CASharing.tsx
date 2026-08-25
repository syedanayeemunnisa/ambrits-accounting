import { useState } from 'react';
import { useApp } from '../store/AppContext';
import Toast from '../components/ui/Toast';

const reportList = [
  'Chart of Accounts', 'General Ledger', 'Journal Register', 'Day Book',
  'Trial Balance', 'Profit and Loss', 'Cash Book', 'Bank Book',
  'Accounts Receivable', 'Accounts Payable', 'Purchase Report', 'Expense Report',
  'Payment Received Report', 'Payment Mode Report', 'Credit Notes', 'Debit Notes',
  'Referral Reward Report', 'Incentive Report', 'Inventory Report', 'Audit Logs',
];

export default function CASharing() {
  const { users } = useApp();
  const caUsers = users.filter(u => u.role === 'ca_auditor');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const toggleReport = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const handleShare = () => {
    if (selected.size === 0) return;
    setToast(`${selected.size} report(s) shared with CA successfully`);
    setSelected(new Set());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">CA Report Sharing</h1>
        <p className="text-sm text-slate-500 mt-1">Securely share financial reports with your CA</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">CA / Auditor Access</h2>
        {caUsers.map(ca => (
          <div key={ca.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold text-sm">CA</div>
              <div><p className="text-sm font-medium text-slate-800">{ca.name}</p><p className="text-xs text-slate-400">{ca.email}</p></div>
            </div>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Available Reports for Sharing {selected.size > 0 && <span className="text-sm font-normal text-blue-600">({selected.size} selected)</span>}</h2>
          <button onClick={handleShare} disabled={selected.size === 0} className={`px-4 py-2 rounded-lg text-sm font-medium ${selected.size > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
            Share Selected Reports
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {reportList.map(report => (
            <label key={report} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selected.has(report) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}>
              <input type="checkbox" checked={selected.has(report)} onChange={() => toggleReport(report)} className="rounded" />
              <span className="text-sm text-slate-700">{report}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Sharing Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ label: 'PDF Export', desc: 'Password-protected PDF files', icon: '📄' },
            { label: 'Excel Export', desc: 'Editable spreadsheet format', icon: '📊' },
            { label: 'Secure Link', desc: 'Expiring online report link', icon: '🔗' },
            { label: 'CSV Export', desc: 'Raw data format', icon: '📋' }
          ].map(opt => (
            <label key={opt.label} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input type="radio" name="format" defaultChecked={opt.label === 'PDF Export'} />
              <span className="text-xl">{opt.icon}</span>
              <div><p className="text-sm font-medium text-slate-700">{opt.label}</p><p className="text-xs text-slate-400">{opt.desc}</p></div>
            </label>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
