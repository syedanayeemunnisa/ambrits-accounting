import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function Receivables() {
  const { invoices } = useApp();

  // Build receivables from invoices with balance
  const receivables = invoices
    .filter(i => i.balanceAmount > 0)
    .map(i => ({
      ...i,
      daysOverdue: Math.max(0, Math.floor((Date.now() - new Date(i.dueDate).getTime()) / 86400000)),
    }));

  const totalReceivables = receivables.reduce((s, r) => s + r.balanceAmount, 0);
  const overdue = receivables.filter(r => r.status === 'overdue');
  const totalOverdue = overdue.reduce((s, r) => s + r.balanceAmount, 0);

  const columns = [
    { key: 'studentName', label: 'Student', sortable: true },
    { key: 'courseName', label: 'Course', sortable: true },
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'netAmount', label: 'Invoice Amount', render: (r: any) => `₹${r.netAmount.toLocaleString()}` },
    { key: 'paidAmount', label: 'Paid', render: (r: any) => <span className="text-green-600">₹{r.paidAmount.toLocaleString()}</span> },
    { key: 'balanceAmount', label: 'Outstanding', sortable: true, render: (r: any) => <span className="text-red-600 font-semibold">₹{r.balanceAmount.toLocaleString()}</span> },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'ageing', label: 'Ageing', render: (r: any) => {
      if (r.daysOverdue <= 0) return <span className="text-green-600 text-xs">Not Due</span>;
      if (r.daysOverdue <= 30) return <span className="text-yellow-600 text-xs">{r.daysOverdue}d overdue</span>;
      if (r.daysOverdue <= 60) return <span className="text-orange-600 text-xs">{r.daysOverdue}d overdue</span>;
      return <span className="text-red-600 text-xs font-medium">{r.daysOverdue}d overdue</span>;
    }},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Accounts Receivable</h1>
        <p className="text-sm text-slate-500 mt-1">Student fee receivables</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Outstanding</p>
          <p className="text-2xl font-bold text-red-600 mt-1">₹{totalReceivables.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Overdue Amount</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">₹{totalOverdue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Pending Invoices</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{receivables.length}</p>
        </div>
      </div>
      <DataTable columns={columns} data={receivables} />
    </div>
  );
}
