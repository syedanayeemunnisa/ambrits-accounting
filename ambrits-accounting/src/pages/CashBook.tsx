import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function CashBook() {
  const { cashTransactions } = useApp();
  const totalReceived = cashTransactions.reduce((s, t) => s + t.cashReceived, 0);
  const totalPaid = cashTransactions.reduce((s, t) => s + t.cashPaid, 0);

  const columns = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'voucherNumber', label: 'Voucher #', render: (r: any) => <span className="font-mono text-xs">{r.voucherNumber}</span> },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'studentName', label: 'Student', render: (r: any) => r.studentName || '—' },
    { key: 'courseName', label: 'Course', render: (r: any) => r.courseName || '—' },
    { key: 'cashReceived', label: 'Received', render: (r: any) => r.cashReceived > 0 ? <span className="text-green-600 font-medium">₹{r.cashReceived.toLocaleString()}</span> : '' },
    { key: 'cashPaid', label: 'Paid', render: (r: any) => r.cashPaid > 0 ? <span className="text-red-600 font-medium">₹{r.cashPaid.toLocaleString()}</span> : '' },
    { key: 'runningBalance', label: 'Balance', render: (r: any) => <span className="font-medium">₹{r.runningBalance.toLocaleString()}</span> },
    { key: 'userName', label: 'User' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Cash Book</h1>
        <p className="text-sm text-slate-500 mt-1">Daily cash receipts and payments</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Received</p>
          <p className="text-2xl font-bold text-green-600 mt-1">₹{totalReceived.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Paid</p>
          <p className="text-2xl font-bold text-red-600 mt-1">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Closing Balance</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">₹{(totalReceived - totalPaid).toLocaleString()}</p>
        </div>
      </div>
      <DataTable columns={columns} data={cashTransactions as any} />
    </div>
  );
}
