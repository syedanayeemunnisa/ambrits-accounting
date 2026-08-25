import { useState, Fragment } from 'react';
import { useApp } from '../store/AppContext';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function JournalEntries() {
  const { journalEntries, journalLines, accounts } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [narration, setNarration] = useState('');
  const [lines, setLines] = useState([
    { accountId: '', debit: '', credit: '' },
    { accountId: '', debit: '', credit: '' },
  ]);

  const toggle = (id: string) => setExpanded(prev => prev === id ? null : id);

  const addLine = () => setLines(prev => [...prev, { accountId: '', debit: '', credit: '' }]);
  const removeLine = (i: number) => { if (lines.length > 2) setLines(prev => prev.filter((_, idx) => idx !== i)); };
  const updateLine = (i: number, field: string, val: string) => {
    setLines(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  };

  const totalDebit = lines.reduce((s, l) => s + Number(l.debit || 0), 0);
  const totalCredit = lines.reduce((s, l) => s + Number(l.credit || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01 && totalDebit > 0;

  const handleCreate = () => {
    if (!narration || !isBalanced) return;
    setShowManual(false);
    setToast('Journal entry created successfully');
    setNarration('');
    setLines([{ accountId: '', debit: '', credit: '' }, { accountId: '', debit: '', credit: '' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Journal Entries</h1>
          <p className="text-sm text-slate-500 mt-1">{journalEntries.length} journal entries</p>
        </div>
        <button onClick={() => setShowManual(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Manual Journal
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 w-8" />
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Journal #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Narration</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Debit</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Credit</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {journalEntries.map(je => {
                const lines = journalLines.filter(l => l.journalId === je.id);
                const isExpanded = expanded === je.id;
                return (
                  <Fragment key={je.id}>
                    <tr key={je.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer" onClick={() => toggle(je.id)}>
                      <td className="px-4 py-3">{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</td>
                      <td className="px-4 py-3 text-sm font-mono font-medium text-blue-600">{je.journalNumber}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{je.journalDate}</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">{je.journalType.replace('_', ' ')}</span></td>
                      <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{je.narration}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-slate-700">₹{je.totalDebit.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-slate-700">₹{je.totalCredit.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-medium ${je.status === 'posted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{je.status}</span></td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${je.id}-detail`}>
                        <td colSpan={8} className="px-4 py-3 bg-slate-50">
                          <div className="ml-8">
                            <table className="w-full max-w-2xl">
                              <thead><tr className="text-xs text-slate-500"><th className="text-left py-1">Account</th><th className="text-right py-1">Debit</th><th className="text-right py-1">Credit</th><th className="text-left py-1 pl-4">Description</th></tr></thead>
                              <tbody>
                                {lines.map(l => (
                                  <tr key={l.id} className="border-t border-slate-200">
                                    <td className="py-2 text-sm"><span className="font-mono text-xs text-slate-500">{l.accountCode}</span><span className="ml-2 text-slate-700">{l.accountName}</span></td>
                                    <td className="py-2 text-sm text-right">{l.debitAmount > 0 ? `₹${l.debitAmount.toLocaleString()}` : ''}</td>
                                    <td className="py-2 text-sm text-right">{l.creditAmount > 0 ? `₹${l.creditAmount.toLocaleString()}` : ''}</td>
                                    <td className="py-2 text-sm text-slate-500 pl-4">{l.narration || '—'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Journal Modal */}
      <Modal isOpen={showManual} onClose={() => setShowManual(false)} title="Create Manual Journal Entry" maxWidth="max-w-3xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Narration *</label>
            <input value={narration} onChange={e => setNarration(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="Describe this journal entry..." />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Journal Lines *</label>
              <button onClick={addLine} className="text-xs text-blue-600 hover:text-blue-800">+ Add Line</button>
            </div>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500">
                    <th className="text-left px-3 py-2">Account</th>
                    <th className="text-right px-3 py-2 w-32">Debit (₹)</th>
                    <th className="text-right px-3 py-2 w-32">Credit (₹)</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="px-3 py-2">
                        <select value={line.accountId} onChange={e => updateLine(i, 'accountId', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm">
                          <option value="">Select account</option>
                          {accounts.filter(a => a.isActive).map(a => <option key={a.id} value={a.id}>{a.accountCode} — {a.accountName}</option>)}
                        </select>
                      </td>
                      <td className="px-3 py-2"><input type="number" value={line.debit} onChange={e => updateLine(i, 'debit', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm text-right" placeholder="0" /></td>
                      <td className="px-3 py-2"><input type="number" value={line.credit} onChange={e => updateLine(i, 'credit', e.target.value)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm text-right" placeholder="0" /></td>
                      <td className="px-3 py-2">{lines.length > 2 && <button onClick={() => removeLine(i)} className="text-red-400 hover:text-red-600 text-xs">✕</button>}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 border-t border-slate-200 font-medium text-sm">
                    <td className="px-3 py-2">Total</td>
                    <td className="px-3 py-2 text-right">₹{totalDebit.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right">₹{totalCredit.toLocaleString()}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
            {totalDebit > 0 && !isBalanced && (
              <p className="text-xs text-red-600">⚠ Debits (₹{totalDebit.toLocaleString()}) ≠ Credits (₹{totalCredit.toLocaleString()})</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowManual(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleCreate} disabled={!isBalanced} className={`px-4 py-2 rounded-lg text-sm font-medium ${isBalanced ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
              Post Journal
            </button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
