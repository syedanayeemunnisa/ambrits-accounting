import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function FeePlans() {
  const { invoices, students, courses } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ studentId: '', courseId: '', totalFee: '', discount: '', instalments: '3' });

  const feePlans = invoices.map(inv => ({
    id: `fp-${inv.id}`, studentName: inv.studentName, courseName: inv.courseName,
    totalAmount: inv.totalAmount, discount: inv.discount, netAmount: inv.netAmount,
    instalments: inv.balanceAmount > 0 ? 3 : 1, invoiceNumber: inv.invoiceNumber, status: inv.status,
  }));

  const handleCreate = () => {
    if (!form.studentId || !form.courseId || !form.totalFee) return;
    setShowCreate(false);
    setToast('Fee plan created successfully');
    setForm({ studentId: '', courseId: '', totalFee: '', discount: '', instalments: '3' });
  };

  const columns = [
    { key: 'studentName', label: 'Student', sortable: true },
    { key: 'courseName', label: 'Course', sortable: true },
    { key: 'totalAmount', label: 'Total Fee', render: (r: any) => `₹${r.totalAmount.toLocaleString()}` },
    { key: 'discount', label: 'Discount', render: (r: any) => r.discount > 0 ? <span className="text-orange-600">-₹{r.discount.toLocaleString()}</span> : '—' },
    { key: 'netAmount', label: 'Net Amount', render: (r: any) => <span className="font-medium">₹{r.netAmount.toLocaleString()}</span> },
    { key: 'instalments', label: 'Instalments' },
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.status}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fee Plans</h1>
          <p className="text-sm text-slate-500 mt-1">{feePlans.length} fee plans</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ Create Fee Plan</button>
      </div>
      <DataTable columns={columns} data={feePlans} />
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Fee Plan">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Student *</label>
            <select value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select student</option>
              {students.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.name} — {s.courseName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
            <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name} — ₹{c.defaultFee.toLocaleString()}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Fee (₹) *</label>
              <input type="number" value={form.totalFee} onChange={e => setForm(f => ({ ...f, totalFee: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount (₹)</label>
              <input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Instalments</label>
              <select value={form.instalments} onChange={e => setForm(f => ({ ...f, instalments: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="1">1 (Full)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          {form.totalFee && (
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-600">Net Fee: <span className="font-bold text-slate-800">₹{(Number(form.totalFee) - Number(form.discount || 0)).toLocaleString()}</span></p>
              <p className="text-xs text-slate-500 mt-1">Per instalment: ₹{Math.ceil((Number(form.totalFee) - Number(form.discount || 0)) / Number(form.instalments)).toLocaleString()}</p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Fee Plan</button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
