import { useApp } from '../store/AppContext';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function PeriodClosing() {
  const { currentPeriod, journalEntries } = useApp();

  const validations = [
    { label: 'Unposted journals', status: 'pass', detail: `${journalEntries.filter(j => j.status !== 'posted').length} unposted` },
    { label: 'Unbalanced journals', status: 'pass', detail: 'All journals balanced' },
    { label: 'Unapproved expenses', status: 'warn', detail: '1 pending approval' },
    { label: 'Unallocated payments', status: 'pass', detail: '0 unallocated' },
    { label: 'Unreconciled cash', status: 'warn', detail: '4 unreconciled transactions' },
    { label: 'Unreconciled bank', status: 'warn', detail: '3 unreconciled transactions' },
    { label: 'Missing account mappings', status: 'pass', detail: 'All mapped' },
    { label: 'Pending credit notes', status: 'pass', detail: '0 pending' },
    { label: 'Pending debit notes', status: 'pass', detail: '0 pending' },
  ];

  const passCount = validations.filter(v => v.status === 'pass').length;
  const canClose = validations.every(v => v.status === 'pass');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Period Closing</h1>
        <p className="text-sm text-slate-500 mt-1">Close the current financial period</p>
      </div>

      {/* Current Period */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">{currentPeriod.periodName}</h2>
            <p className="text-sm text-slate-500">{currentPeriod.startDate} to {currentPeriod.endDate}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentPeriod.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
          }`}>
            {currentPeriod.status}
          </span>
        </div>

        {/* Validation Checklist */}
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Pre-Closing Validation Checklist</h3>
        <div className="space-y-2">
          {validations.map(v => (
            <div key={v.label} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50">
              <div className="flex items-center gap-3">
                {v.status === 'pass' ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : v.status === 'warn' ? (
                  <AlertTriangle size={16} className="text-yellow-500" />
                ) : (
                  <XCircle size={16} className="text-red-500" />
                )}
                <span className="text-sm text-slate-700">{v.label}</span>
              </div>
              <span className={`text-xs ${v.status === 'pass' ? 'text-green-600' : 'text-yellow-600'}`}>{v.detail}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-slate-600">{passCount}/{validations.length} checks passed</div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(passCount / validations.length) * 100}%` }} />
            </div>
          </div>
          <button
            disabled={!canClose}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              canClose
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Close Period
          </button>
        </div>
      </div>
    </div>
  );
}
