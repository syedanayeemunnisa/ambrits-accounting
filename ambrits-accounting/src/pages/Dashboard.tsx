// ============================================================
// Dashboard — Business Overview
// ============================================================

import { useApp } from '../store/AppContext';
import StatCard from '../components/ui/StatCard';
import {
  IndianRupee, Users, TrendingUp, ArrowDownToLine,
  ArrowUpFromLine, Package, CreditCard, BookOpen,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0891b2'];

export default function Dashboard() {
  const { invoices, payments, expenses, courses, students, inventoryItems } = useApp();

  // Compute totals
  const totalRevenue = invoices.reduce((sum, i) => sum + i.netAmount, 0);
  const totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.totalAmount, 0);
  const totalReceivables = invoices.reduce((sum, i) => sum + i.balanceAmount, 0);
  const netProfit = totalReceived - totalExpenses;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const inventoryValue = inventoryItems.reduce((sum, i) => sum + i.totalValue, 0);

  // Course-wise data
  const courseData = courses.map(c => {
    const courseInvoices = invoices.filter(i => i.courseId === c.id);
    const coursePayments = payments.filter(p => p.courseId === c.id);
    return {
      name: c.name,
      billing: courseInvoices.reduce((s, i) => s + i.netAmount, 0),
      received: coursePayments.reduce((s, p) => s + p.amount, 0),
    };
  }).filter(c => c.billing > 0);

  // Payment mode data
  const modeMap: Record<string, number> = {};
  payments.forEach(p => {
    modeMap[p.paymentMode] = (modeMap[p.paymentMode] || 0) + p.amount;
  });
  const modeData = Object.entries(modeMap).map(([name, value]) => ({ name: name.toUpperCase(), value }));

  // Monthly trend (mock)
  const monthlyData = [
    { month: 'Apr', revenue: 36000, expenses: 57000 },
    { month: 'May', revenue: 54500, expenses: 69500 },
    { month: 'Jun', revenue: 4000, expenses: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Business Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Ambrits Training Hub — Financial Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<IndianRupee size={22} />} change="Invoices raised" changeType="positive" />
        <StatCard title="Payments Received" value={`₹${totalReceived.toLocaleString()}`} icon={<CreditCard size={22} />} change="Collected from students" changeType="positive" />
        <StatCard title="Total Expenses" value={`₹${totalExpenses.toLocaleString()}`} icon={<ArrowUpFromLine size={22} />} change="Operating expenses" changeType="negative" />
        <StatCard title="Net Profit" value={`₹${netProfit.toLocaleString()}`} icon={<TrendingUp size={22} />} change={netProfit >= 0 ? 'Profitable' : 'Loss'} changeType={netProfit >= 0 ? 'positive' : 'negative'} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Student Receivables" value={`₹${totalReceivables.toLocaleString()}`} icon={<ArrowDownToLine size={22} />} change="Outstanding fees" />
        <StatCard title="Active Students" value={String(activeStudents)} icon={<Users size={22} />} change={`of ${students.length} total`} changeType="neutral" />
        <StatCard title="Inventory Value" value={`₹${inventoryValue.toLocaleString()}`} icon={<Package size={22} />} change={`${inventoryItems.length} items`} changeType="neutral" />
        <StatCard title="Open Journals" value="9" icon={<BookOpen size={22} />} change="Posted this period" changeType="neutral" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue vs Expense */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Monthly Revenue vs Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(val: any) => `₹${Number(val).toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#2563eb" radius={[4, 4, 0, 0]} name="Revenue" />
              <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Mode Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Payment Mode Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={modeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                {modeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(val: any) => `₹${Number(val).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {modeData.map((m, i) => (
              <div key={m.name} className="flex items-center gap-1 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                {m.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Course Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 uppercase">Course</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase">Gross Billing</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase">Received</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-slate-500 uppercase">Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map(c => (
                <tr key={c.name} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-700">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-right text-slate-700">₹{c.billing.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">₹{c.received.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">₹{(c.billing - c.received).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
