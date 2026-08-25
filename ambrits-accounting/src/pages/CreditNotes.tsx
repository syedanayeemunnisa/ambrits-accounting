import { useState } from 'react';
import { useApp } from '../store/AppContext';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function CreditNotes() {
  const { invoices, students } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ studentId: '', invoiceId: '', amount: '', reason: '' });

  const handleCreate = () => {
    if (!form.studentId || !form.amount || !form.reason) return;
    const student = students.find(s => s.id === form.studentId);
    setShowCreate(false);
    setToast(`Credit note of ₹${Number(form.amount).toLocaleString()} created for ${student?.name || 'student'}`);
    setForm({ studentId: '', invoiceId: '', amount: '', reason: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Credit Notes</h1>
          <p className="text-sm text-slate-500 mt-1">Fee adjustments and billing corrections</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ Create Credit Note</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-400 text-sm">No credit notes yet. Click the button above to create one.</p>
      </div>
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">When to use Credit Notes:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Fee correction after invoice</li><li>• Discount adjustment</li><li>• Service reduction</li><li>• Billing correction or duplicate invoice fix</li>
        </ul>
      </div>
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Credit Note">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student *</label>
            <select value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} — {s.courseName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Original Invoice</label>
            <select value={form.invoiceId} onChange={e => setForm(f => ({ ...f, invoiceId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select invoice (optional)</option>
              {invoices.map(i => <option key={i.id} value={i.id}>{i.invoiceNumber} — ₹{i.netAmount.toLocaleString()}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹) *</label>
            <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="1000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reason *</label>
            <textarea value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 h-20" placeholder="e.g. Fee correction for overcharge" />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Credit Note</button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
