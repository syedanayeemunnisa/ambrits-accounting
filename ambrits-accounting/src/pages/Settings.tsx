import { useApp } from '../store/AppContext';

export default function Settings() {
  const { currentPeriod } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Organisation and accounting configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organisation */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Organisation</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Organisation Name</label>
              <input type="text" defaultValue="Ambrits Training Hub" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" defaultValue="info@ambrits.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="tel" defaultValue="+91 9876543210" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GST Number</label>
              <input type="text" placeholder="Optional" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        {/* Accounting */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Accounting</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Base Currency</label>
              <input type="text" defaultValue="INR (₹)" disabled className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Current Financial Period</label>
              <input type="text" defaultValue={`${currentPeriod.periodName} (${currentPeriod.startDate} to ${currentPeriod.endDate})`} disabled className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <label className="text-sm text-slate-700">Auto-post journal entries from invoices and payments</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <label className="text-sm text-slate-700">Require approval for manual journals</label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <label className="text-sm text-slate-700">Two-factor authentication</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="rounded" />
              <label className="text-sm text-slate-700">Audit logging</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Session timeout (minutes)</label>
              <input type="number" defaultValue={30} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        {/* Firebase */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Firebase Configuration</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              Firebase configuration will be provided later. The application is currently using mock data for development.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
