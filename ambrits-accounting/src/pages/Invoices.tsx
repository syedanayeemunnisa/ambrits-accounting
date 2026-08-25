import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

const statusColor: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  sent: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  partial: 'bg-yellow-100 text-yellow-700',
  overdue: 'bg-red-100 text-red-700',
  cancelled: 'bg-slate-100 text-slate-500',
};

export default function Invoices() {
  const { invoices, students, courses } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ studentId: '', courseId: '', amount: '', discount: '', dueDate: '' });

  const handleCreate = () => {
    if (!form.studentId || !form.courseId || !form.amount) return;
    const student = students.find(s => s.id === form.studentId);
    setShowCreate(false);
    setToast(`Invoice created for ${student?.name || 'student'}`);
    setForm({ studentId: '', courseId: '', amount: '', discount: '', dueDate: '' });
  };

  const columns = [
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'studentName', label: 'Student', sortable: true },
    { key: 'courseName', label: 'Course', sortable: true },
    { key: 'invoiceDate', label: 'Date', sortable: true },
    { key: 'netAmount', label: 'Amount', sortable: true, render: (r: any) => `₹${r.netAmount.toLocaleString()}` },
    { key: 'paidAmount', label: 'Paid', render: (r: any) => <span className="text-green-600">₹{r.paidAmount.toLocaleString()}</span> },
    { key: 'balanceAmount', label: 'Balance', render: (r: any) => (
      <span className={r.balanceAmount > 0 ? 'text-red-600 font-medium' : 'text-slate-500'}>₹{r.balanceAmount.toLocaleString()}</span>
    )},
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[r.status] || 'bg-slate-100'}`}>
        {r.status}
      </span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">{invoices.length} invoices</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Create Invoice
        </button>
      </div>
      <DataTable columns={columns} data={invoices as any} />

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create New Invoice">
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
            <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
            <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.name} — ₹{c.defaultFee.toLocaleString()}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹) *</label>
              <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="10000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount (₹)</label>
              <input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          {form.amount && (
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-600">Net Amount: <span className="font-bold text-slate-800">₹{(Number(form.amount) - Number(form.discount || 0)).toLocaleString()}</span></p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Invoice</button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
