// ============================================================
// Main Layout — Sidebar Navigation + Top Bar
// ============================================================

import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, GraduationCap, Users, UserPlus, FileText,
  Receipt, CreditCard, ArrowDownToLine, ArrowUpFromLine,
  Package, Gift, Award, BookOpen, Landmark, Calendar,
  FileSpreadsheet, Scale, BookCopy, ClipboardList, Settings,
  Share2, Shield, ChevronDown, ChevronRight, Menu, X,
  Search, Bell, CircleDollarSign, Building2,
} from 'lucide-react';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  group?: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },

  { label: 'Courses', path: '/courses', icon: <GraduationCap size={18} />, group: 'Operations' },
  { label: 'Students', path: '/students', icon: <Users size={18} />, group: 'Operations' },
  { label: 'Admissions', path: '/admissions', icon: <UserPlus size={18} />, group: 'Operations' },

  { label: 'Fee Plans', path: '/fee-plans', icon: <FileText size={18} />, group: 'Revenue' },
  { label: 'Invoices', path: '/invoices', icon: <Receipt size={18} />, group: 'Revenue' },
  { label: 'Payments Received', path: '/payments', icon: <CreditCard size={18} />, group: 'Revenue' },
  { label: 'Receivables', path: '/receivables', icon: <ArrowDownToLine size={18} />, group: 'Revenue' },

  { label: 'Vendors', path: '/vendors', icon: <Building2 size={18} />, group: 'Expenses' },
  { label: 'Expenses', path: '/expenses', icon: <ArrowUpFromLine size={18} />, group: 'Expenses' },
  { label: 'Payables', path: '/payables', icon: <ArrowUpFromLine size={18} />, group: 'Expenses' },

  { label: 'Inventory', path: '/inventory', icon: <Package size={18} />, group: 'Inventory' },

  { label: 'Referrals', path: '/referrals', icon: <Gift size={18} />, group: 'People' },
  { label: 'Incentives', path: '/incentives', icon: <Award size={18} />, group: 'People' },

  { label: 'Cash Book', path: '/cash-book', icon: <CircleDollarSign size={18} />, group: 'Banking' },
  { label: 'Bank Book', path: '/bank-book', icon: <Landmark size={18} />, group: 'Banking' },

  { label: 'Chart of Accounts', path: '/chart-of-accounts', icon: <BookOpen size={18} />, group: 'Accounting' },
  { label: 'Journal Entries', path: '/journal-entries', icon: <BookCopy size={18} />, group: 'Accounting' },
  { label: 'General Ledger', path: '/general-ledger', icon: <ClipboardList size={18} />, group: 'Accounting' },
  { label: 'Day Book', path: '/day-book', icon: <Calendar size={18} />, group: 'Accounting' },
  { label: 'Credit Notes', path: '/credit-notes', icon: <FileSpreadsheet size={18} />, group: 'Accounting' },
  { label: 'Debit Notes', path: '/debit-notes', icon: <FileSpreadsheet size={18} />, group: 'Accounting' },
  { label: 'Trial Balance', path: '/trial-balance', icon: <Scale size={18} />, group: 'Accounting' },
  { label: 'Profit & Loss', path: '/profit-loss', icon: <Scale size={18} />, group: 'Accounting' },
  { label: 'Period Closing', path: '/period-closing', icon: <Calendar size={18} />, group: 'Accounting' },

  { label: 'Audit Logs', path: '/audit-logs', icon: <Shield size={18} />, group: 'Admin' },
  { label: 'CA Sharing', path: '/ca-sharing', icon: <Share2 size={18} />, group: 'Admin' },
  { label: 'User & Roles', path: '/users', icon: <Users size={18} />, group: 'Admin' },
  { label: 'Settings', path: '/settings', icon: <Settings size={18} />, group: 'Admin' },
];

export default function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Operations: true, Revenue: true, Expenses: true, Inventory: true,
    People: true, Banking: true, Accounting: true, Admin: true,
  });

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const grouped: Record<string, SidebarItem[]> = {};
  const ungrouped: SidebarItem[] = [];
  sidebarItems.forEach(item => {
    if (item.group) {
      if (!grouped[item.group]) grouped[item.group] = [];
      grouped[item.group].push(item);
    } else {
      ungrouped.push(item);
    }
  });

  const renderNavItem = (item: SidebarItem) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
          isActive
            ? 'bg-blue-600 text-white font-medium'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} hidden md:flex flex-col bg-slate-800 text-white transition-all duration-300 flex-shrink-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-700">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">A</div>
          {sidebarOpen && <span className="font-semibold text-sm">Ambrits Accounting</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {ungrouped.map(item => renderNavItem(item))}

          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="pt-2">
              {sidebarOpen && (
                <button
                  onClick={() => toggleGroup(group)}
                  className="flex items-center justify-between w-full px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {group}
                  {expandedGroups[group] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              )}
              {(!sidebarOpen || expandedGroups[group]) && items.map(item => renderNavItem(item))}
            </div>
          ))}
        </nav>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-12 border-t border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-colors"
        >
          <Menu size={18} />
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-slate-800 text-white flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-700">
              <span className="font-semibold">Ambrits Accounting</span>
              <button onClick={() => setMobileOpen(false)}><X size={18} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {sidebarItems.map(item => renderNavItem(item))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="md:hidden">
              <Menu size={20} className="text-slate-600" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm text-slate-600 w-48" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell size={20} className="text-slate-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">A</div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-slate-700">Admin</div>
                <div className="text-xs text-slate-400">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
