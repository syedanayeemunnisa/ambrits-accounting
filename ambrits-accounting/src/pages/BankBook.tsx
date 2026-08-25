import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function BankBook() {
  const { bankTransactions, bankAccounts } = useApp();

  const columns = [
    { key: 'transactionDate', label: 'Date', sortable: true },
    { key: 'referenceNumber', label: 'Reference', render: (r: any) => <span className="font-mono text-xs">{r.referenceNumber}</span> },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'studentName', label: 'Student', render: (r: any) => r.studentName || '—' },
    { key: 'deposit', label: 'Deposit', render: (r: any) => r.deposit > 0 ? <span className="text-green-600 font-medium">₹{r.deposit.toLocaleString()}</span> : '' },
    { key: 'withdrawal', label: 'Withdrawal', render: (r: any) => r.withdrawal > 0 ? <span className="text-red-600 font-medium">₹{r.withdrawal.toLocaleString()}</span> : '' },
    { key: 'bankCharge', label: 'Charge', render: (r: any) => r.bankCharge > 0 ? <span className="text-orange-600">₹{r.bankCharge.toLocaleString()}</span> : '' },
    { key: 'runningBalance', label: 'Balance', render: (r: any) => <span className="font-medium">₹{r.runningBalance.toLocaleString()}</span> },
    { key: 'reconciliationStatus', label: 'Status', render: (r: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        r.reconciliationStatus === 'reconciled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
      }`}>{r.reconciliationStatus}</span>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bank Book</h1>
        <p className="text-sm text-slate-500 mt-1">Bank and payment gateway transactions</p>
      </div>

      {/* Bank Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bankAccounts.map(b => (
          <div key={b.id} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                {b.bankName.slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{b.accountName}</p>
                <p className="text-xs text-slate-400">{b.bankName} • {b.accountNumber.slice(-4)}</p>
              </div>
            </div>
            <p className="text-xl font-bold text-slate-800 mt-3">₹{b.currentBalance.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={bankTransactions as any} />
    </div>
  );
}
