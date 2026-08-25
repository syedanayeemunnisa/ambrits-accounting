import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function Payables() {
  const { expenses } = useApp();
  const unpaid = expenses.filter(e => e.status !== 'paid').map(e => ({
    ...e,
    vendorName: e.vendorName || 'Direct Expense',
    daysOverdue: Math.max(0, Math.floor((Date.now() - new Date(e.expenseDate).getTime()) / 86400000)),
  }));
  const totalPayable = unpaid.reduce((s, e) => s + e.totalAmount, 0);

  const columns = [
    { key: 'expenseNumber', label: 'Expense #', sortable: true },
    { key: 'title', label: 'Description', sortable: true },
    { key: 'vendorName', label: 'Vendor' },
    { key: 'category', label: 'Category' },
    { key: 'totalAmount', label: 'Amount', render: (r: any) => <span className="font-medium">₹{r.totalAmount.toLocaleString()}</span> },
    { key: 'expenseDate', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.status === 'approved' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
      }`}>{r.status}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Accounts Payable</h1>
        <p className="text-sm text-slate-500 mt-1">Outstanding vendor and expense payments</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-500 uppercase">Total Payable</p>
        <p className="text-2xl font-bold text-red-600 mt-1">₹{totalPayable.toLocaleString()}</p>
      </div>
      <DataTable columns={columns} data={unpaid as any} />
    </div>
  );
}
