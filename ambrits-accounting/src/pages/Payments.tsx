import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function Payments() {
  const { payments, invoices, students } = useApp();
  const [showRecord, setShowRecord] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ studentId: '', invoiceId: '', amount: '', paymentMode: 'cash', paymentDate: '', referenceNumber: '' });

  const totalReceived = payments.reduce((s, p) => s + p.amount, 0);

  const handleRecord = () => {
    if (!form.studentId || !form.amount) return;
    const student = students.find(s => s.id === form.studentId);
    setShowRecord(false);
    setToast(`Payment of ₹${Number(form.amount).toLocaleString()} recorded for ${student?.name || 'student'}`);
    setForm({ studentId: '', invoiceId: '', amount: '', paymentMode: 'cash', paymentDate: '', referenceNumber: '' });
  };

  const columns = [
    { key: 'receiptNumber', label: 'Receipt #', sortable: true },
    { key: 'studentName', label: 'Student', sortable: true },
    { key: 'courseName', label: 'Course', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, render: (r: any) => <span className="font-medium text-green-600">₹{r.amount.toLocaleString()}</span> },
    { key: 'paymentMode', label: 'Mode', sortable: true, render: (r: any) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 uppercase">{r.paymentMode}</span>
    )},
    { key: 'paymentDate', label: 'Date', sortable: true },
    { key: 'referenceNumber', label: 'Reference', render: (r: any) => r.referenceNumber || '—' },
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {r.status}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payments Received</h1>
          <p className="text-sm text-slate-500 mt-1">{payments.length} payments — Total: ₹{totalReceived.toLocaleString()}</p>
        </div>
        <button onClick={() => setShowRecord(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Record Payment
        </button>
      </div>
      <DataTable columns={columns} data={payments as any} />

      <Modal isOpen={showRecord} onClose={() => setShowRecord(false)} title="Record Payment">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student *</label>
            <select value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select student</option>
              {students.filter(s => s.status === 'active').map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.courseName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Invoice</label>
            <select value={form.invoiceId} onChange={e => setForm(f => ({ ...f, invoiceId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select invoice (optional)</option>
              {invoices.filter(i => i.balanceAmount > 0).map(i => (
                <option key={i.id} value={i.id}>{i.invoiceNumber} — ₹{i.balanceAmount.toLocaleString()} due</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹) *</label>
              <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="5000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode *</label>
              <select value={form.paymentMode} onChange={e => setForm(f => ({ ...f, paymentMode: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Payment Date</label>
              <input type="date" value={form.paymentDate} onChange={e => setForm(f => ({ ...f, paymentDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reference Number</label>
              <input value={form.referenceNumber} onChange={e => setForm(f => ({ ...f, referenceNumber: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="Optional" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowRecord(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleRecord} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Record Payment</button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
