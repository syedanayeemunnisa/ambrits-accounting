import { useApp } from '../store/AppContext';
import DataTable from '../components/ui/DataTable';

export default function AuditLogs() {
  const { auditLogs } = useApp();
  const sorted = [...auditLogs].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true, render: (r: any) => {
      const d = new Date(r.timestamp);
      return <span className="text-xs">{d.toLocaleDateString()} {d.toLocaleTimeString()}</span>;
    }},
    { key: 'actionType', label: 'Action', sortable: true, render: (r: any) => (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize">
        {r.actionType.replace(/_/g, ' ')}
      </span>
    )},
    { key: 'entityType', label: 'Entity', render: (r: any) => <span className="capitalize">{r.entityType}</span> },
    { key: 'voucherNumber', label: 'Voucher #', render: (r: any) => r.voucherNumber ? <span className="font-mono text-xs">{r.voucherNumber}</span> : '—' },
    { key: 'userName', label: 'User', sortable: true },
    { key: 'reason', label: 'Reason', render: (r: any) => r.reason || '—' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>
        <p className="text-sm text-slate-500 mt-1">{auditLogs.length} audit records — Append-only</p>
      </div>
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">⚠ Note:</span> Audit logs are append-only. Historical records cannot be modified or deleted.
        </p>
      </div>
      <DataTable columns={columns} data={sorted as any} />
    </div>
  );
}
