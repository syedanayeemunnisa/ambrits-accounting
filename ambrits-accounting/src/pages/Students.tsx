import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function Students() {
  const { students, invoices, payments, courses } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', courseId: '' });

  const handleAdd = () => {
    if (!form.name || !form.phone || !form.courseId) return;
    setShowAdd(false);
    setToast(`Student "${form.name}" added successfully`);
    setForm({ name: '', phone: '', email: '', courseId: '' });
  };

  const columns = [
    { key: 'name', label: 'Student Name', sortable: true, render: (r: any) => (
      <div>
        <div className="font-medium text-slate-800">{r.name}</div>
        <div className="text-xs text-slate-400">{r.phone}</div>
      </div>
    )},
    { key: 'courseName', label: 'Course', sortable: true },
    { key: 'counsellorName', label: 'Counsellor', render: (r: any) => r.counsellorName || '—' },
    { key: 'invoiced', label: 'Invoiced', render: (r: any) => {
      const total = invoices.filter(i => i.studentId === r.id).reduce((s, i) => s + i.netAmount, 0);
      return `₹${total.toLocaleString()}`;
    }},
    { key: 'paid', label: 'Paid', render: (r: any) => {
      const total = payments.filter(p => p.studentId === r.id).reduce((s, p) => s + p.amount, 0);
      return <span className="text-green-600">₹{total.toLocaleString()}</span>;
    }},
    { key: 'balance', label: 'Balance Due', render: (r: any) => {
      const inv = invoices.filter(i => i.studentId === r.id).reduce((s, i) => s + i.balanceAmount, 0);
      return <span className={inv > 0 ? 'text-red-600 font-medium' : 'text-slate-500'}>₹{inv.toLocaleString()}</span>;
    }},
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.status === 'active' ? 'bg-green-100 text-green-700' :
        r.status === 'inactive' ? 'bg-slate-100 text-slate-600' :
        r.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
        'bg-blue-100 text-blue-700'
      }`}>{r.status}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Students</h1>
          <p className="text-sm text-slate-500 mt-1">{students.length} total students</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add Student
        </button>
      </div>
      <DataTable columns={columns} data={students as any} />

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Student">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. Aisha Khan" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="student@email.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
            <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Select course</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name} — ₹{c.defaultFee.toLocaleString()}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Student</button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
