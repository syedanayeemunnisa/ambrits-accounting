import { useState } from 'react';
import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';

export default function Inventory() {
  const { inventoryItems, courses } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ itemName: '', category: 'Books', unit: 'pcs', currentStock: '', minimumStock: '', costPerUnit: '', courseId: '' });

  const totalValue = inventoryItems.reduce((s, i) => s + i.totalValue, 0);
  const lowStock = inventoryItems.filter(i => i.status === 'low_stock' || i.currentStock <= i.minimumStock);

  const handleAdd = () => {
    if (!form.itemName || !form.currentStock) return;
    setShowAdd(false);
    setToast(`Inventory item "${form.itemName}" added successfully`);
    setForm({ itemName: '', category: 'Books', unit: 'pcs', currentStock: '', minimumStock: '', costPerUnit: '', courseId: '' });
  };

  const columns = [
    { key: 'itemName', label: 'Item', sortable: true },
    { key: 'category', label: 'Category', sortable: true, render: (r: any) => <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{r.category}</span> },
    { key: 'courseName', label: 'Course', render: (r: any) => r.courseName || '—' },
    { key: 'unit', label: 'Unit' },
    { key: 'currentStock', label: 'Stock', sortable: true, render: (r: any) => <span className={r.currentStock <= r.minimumStock ? 'text-red-600 font-semibold' : 'text-slate-700'}>{r.currentStock}</span> },
    { key: 'minimumStock', label: 'Min Stock' },
    { key: 'costPerUnit', label: 'Cost/Unit', render: (r: any) => `₹${r.costPerUnit.toLocaleString()}` },
    { key: 'totalValue', label: 'Value', sortable: true, render: (r: any) => <span className="font-medium">₹{r.totalValue.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'in_stock' ? 'bg-green-100 text-green-700' : r.status === 'low_stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{r.status.replace('_', ' ')}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory</h1>
          <p className="text-sm text-slate-500 mt-1">{inventoryItems.length} items</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">+ Add Item</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Inventory Value</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Low Stock Alerts</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{lowStock.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Items</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{inventoryItems.length}</p>
        </div>
      </div>
      <DataTable columns={columns} data={inventoryItems as any} />
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Inventory Item">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Item Name *</label>
            <input value={form.itemName} onChange={e => setForm(f => ({ ...f, itemName: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="e.g. Cambridge IELTS Book 18" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option>Books</option><option>Equipment</option><option>Stationery</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
              <select value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option>pcs</option><option>kg</option><option>box</option><option>set</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
              <select value={form.courseId} onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="">—</option>
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Stock *</label>
              <input type="number" value={form.currentStock} onChange={e => setForm(f => ({ ...f, currentStock: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min Stock</label>
              <input type="number" value={form.minimumStock} onChange={e => setForm(f => ({ ...f, minimumStock: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="10" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cost/Unit (₹)</label>
              <input type="number" value={form.costPerUnit} onChange={e => setForm(f => ({ ...f, costPerUnit: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" placeholder="500" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Item</button>
          </div>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
