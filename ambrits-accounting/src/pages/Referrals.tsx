import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function Referrals() {
  const { referrals } = useApp();
  const totalRewards = referrals.reduce((s, r) => s + r.rewardAmount, 0);
  const pendingPay = referrals.filter(r => r.paymentStatus === 'pending').reduce((s, r) => s + r.rewardAmount, 0);

  const columns = [
    { key: 'referralCode', label: 'Code', sortable: true, render: (r: any) => <span className="font-mono text-xs">{r.referralCode}</span> },
    { key: 'referrerName', label: 'Referrer', sortable: true },
    { key: 'referredStudentName', label: 'Referred Student', sortable: true },
    { key: 'courseName', label: 'Course' },
    { key: 'rewardAmount', label: 'Reward', render: (r: any) => <span className="font-medium">₹{r.rewardAmount.toLocaleString()}</span> },
    { key: 'rewardType', label: 'Type', render: (r: any) => <span className="capitalize">{r.rewardType}</span> },
    { key: 'approvalStatus', label: 'Approval', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.approvalStatus === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Referrals</h1>
          <p className="text-sm text-slate-500 mt-1">{referrals.length} referrals</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Total Reward Value</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">₹{totalRewards.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Pending Payment</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">₹{pendingPay.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{referrals.filter(r => r.paymentStatus === 'paid').length}</p>
        </div>
      </div>
      <DataTable columns={columns} data={referrals as any} />
    </div>
  );
}
