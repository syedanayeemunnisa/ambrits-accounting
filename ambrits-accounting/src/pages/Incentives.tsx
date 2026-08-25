import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function Incentives() {
  const { incentives } = useApp();
  const totalApproved = incentives.filter(i => i.approvalStatus === 'approved').reduce((s, i) => s + i.amount, 0);
  const totalPending = incentives.filter(i => i.paymentStatus === 'pending').reduce((s, i) => s + i.amount, 0);

  const columns = [
    { key: 'incentiveType', label: 'Type', sortable: true, render: (r: any) => <span className="capitalize">{r.incentiveType}</span> },
    { key: 'userName', label: 'Recipient', sortable: true },
    { key: 'courseName', label: 'Course', render: (r: any) => r.courseName || '—' },
    { key: 'amount', label: 'Amount', sortable: true, render: (r: any) => <span className="font-medium">₹{r.amount.toLocaleString()}</span> },
    { key: 'calculationRule', label: 'Rule', render: (r: any) => r.calculationRule || '—' },
    { key: 'approvalStatus', label: 'Approval', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.approvalStatus === 'approved' ? 'bg-green-100 text-green-700' :
        r.approvalStatus === 'rejected' ? 'bg-red-100 text-red-700' :
        'bg-yellow-100 text-yellow-700'
      }`}>{r.approvalStatus}</span>
    )},
    { key: 'paymentStatus', label: 'Payment', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}>{r.paymentStatus}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Incentives</h1>
        <p className="text-sm text-slate-500 mt-1">Counsellor and staff incentive tracking</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">₹{totalApproved.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Pending Payment</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Incentives</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{incentives.length}</p>
        </div>
      </div>
      <DataTable columns={columns} data={incentives as any} />
    </div>
  );
}
