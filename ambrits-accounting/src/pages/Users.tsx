import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

const roleColors: Record<string, string> = {
  super_admin: 'bg-purple-100 text-purple-700', owner: 'bg-blue-100 text-blue-700',
  finance_manager: 'bg-green-100 text-green-700', accountant: 'bg-teal-100 text-teal-700',
  counsellor: 'bg-yellow-100 text-yellow-700', cashier: 'bg-orange-100 text-orange-700',
  inventory_user: 'bg-slate-100 text-slate-700', ca_auditor: 'bg-red-100 text-red-700',
};

export default function Users() {
  const { users } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', role: 'counsellor' });

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    setShowAdd(false);
    setToast(`User "${form.name}" added successfully`);
    setForm({ name: '', email: '', role: 'counsellor' });
  };

  const columns = [
    { key: 'name', label: 'Name', sortable: true, render: (r: any) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">{r.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</div>
        <div><div className="font-medium text-slate-800">{r.name}</div><div className="text-xs text-slate-400">{r.email}</div></div>
      </div>
    )},
    { key: 'role', label: 'Role', sortable: true, render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[r.role] || 'bg-slate-100 text-slate-600'}`}>{r.role.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</span>
    )},
    { key: 'isActive', label: 'Status', render: (r: any) => <span className={`w-2 h-2 rounded-full inline-block ${r.isActive ? 'bg-green-500' : 'bg-red-500'}`} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Users & Roles</h1>
          <p className="text-sm text-slate-500 mt-1">{users.length} users</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ Add User</button>
      </div>
      <DataTable columns={columns} data={users as any} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New User">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. Priya Sharma" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="user@ambrits.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role *</label>
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="super_admin">Super Administrator</option>
              <option value="owner">Owner / Director</option>
              <option value="finance_manager">Finance Manager</option>
              <option value="accountant">Accountant</option>
              <option value="counsellor">Counsellor</option>
              <option value="cashier">Cashier</option>
              <option value="inventory_user">Inventory User</option>
              <option value="ca_auditor">Chartered Accountant / Auditor</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add User</button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
