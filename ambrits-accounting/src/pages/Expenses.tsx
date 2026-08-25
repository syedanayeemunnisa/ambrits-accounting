import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function Expenses() {
  const { expenses, vendors, courses } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', category: '', vendorId: '', amount: '', courseId: '', paymentMode: 'cash', expenseDate: '' });

  const totalExpenses = expenses.reduce((s, e) => s + e.totalAmount, 0);

  const categories = [
    'Trainer Payments', 'Salaries', 'Office Rent', 'Electricity', 'Internet',
    'Telephone', 'Advertising', 'Software Subscriptions', 'Printing and Stationery',
    'Professional Fees', 'Teaching Materials', 'Travel and Conveyance', 'Other Expenses',
  ];

  const handleAdd = () => {
    if (!form.title || !form.amount) return;
    setShowAdd(false);
    setToast(`Expense "${form.title}" created successfully`);
    setForm({ title: '', category: '', vendorId: '', amount: '', courseId: '', paymentMode: 'cash', expenseDate: '' });
  };

  const columns = [
    { key: 'expenseNumber', label: 'Expense #', sortable: true },
    { key: 'title', label: 'Description', sortable: true },
    { key: 'category', label: 'Category', sortable: true, render: (r: any) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{r.category}</span>
    )},
    { key: 'vendorName', label: 'Vendor', render: (r: any) => r.vendorName || '—' },
    { key: 'courseName', label: 'Course', render: (r: any) => r.courseName || '—' },
    { key: 'totalAmount', label: 'Amount', sortable: true, render: (r: any) => <span className="font-medium">₹{r.totalAmount.toLocaleString()}</span> },
    { key: 'expenseDate', label: 'Date', sortable: true },
    { key: 'paymentMode', label: 'Mode', render: (r: any) => r.paymentMode ? <span className="uppercase text-xs">{r.paymentMode}</span> : '—' },
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.status === 'paid' ? 'bg-green-100 text-green-700' :
        r.status === 'approved' ? 'bg-blue-100 text-blue-700' :
        r.status === 'rejected' ? 'bg-red-100 text-red-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>{r.status}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Expenses</h1>
          <p className="text-sm text-slate-500 mt-1">{expenses.length} expenses — Total: ₹{totalExpenses.toLocaleString()}</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add Expense
        </button>
      </div>
      <DataTable columns={columns} data={expenses as any} />

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Expense">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. Office supplies" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Vendor</label>
              <select value={form.vendorId} onChange={e => setForm(f => ({ ...f, vendorId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="">Select vendor (optional)</option>
                {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₹) *</label>
              <input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="5000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
              <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="">Select course (optional)</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Payment Mode</label>
              <select value={form.paymentMode} onChange={e => setForm(f => ({ ...f, paymentMode: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input type="date" value={form.expenseDate} onChange={e => setForm(f => ({ ...f, expenseDate: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Create Expense</button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
