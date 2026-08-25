// ============================================================
// App.tsx — Main Application with Routing
// ============================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Admissions from './pages/Admissions';
import FeePlans from './pages/FeePlans';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Receivables from './pages/Receivables';
import Vendors from './pages/Vendors';
import Expenses from './pages/Expenses';
import Payables from './pages/Payables';
import Inventory from './pages/Inventory';
import Referrals from './pages/Referrals';
import Incentives from './pages/Incentives';
import CashBook from './pages/CashBook';
import BankBook from './pages/BankBook';
import ChartOfAccounts from './pages/ChartOfAccounts';
import JournalEntries from './pages/JournalEntries';
import GeneralLedger from './pages/GeneralLedger';
import DayBook from './pages/DayBook';
import CreditNotes from './pages/CreditNotes';
import DebitNotes from './pages/DebitNotes';
import TrialBalance from './pages/TrialBalance';
import ProfitLoss from './pages/ProfitLoss';
import PeriodClosing from './pages/PeriodClosing';
import AuditLogs from './pages/AuditLogs';
import CASharing from './pages/CASharing';
import Users from './pages/Users';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/fee-plans" element={<FeePlans />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/receivables" element={<Receivables />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/payables" element={<Payables />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/incentives" element={<Incentives />} />
            <Route path="/cash-book" element={<CashBook />} />
            <Route path="/bank-book" element={<BankBook />} />
            <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
            <Route path="/journal-entries" element={<JournalEntries />} />
            <Route path="/general-ledger" element={<GeneralLedger />} />
            <Route path="/day-book" element={<DayBook />} />
            <Route path="/credit-notes" element={<CreditNotes />} />
            <Route path="/debit-notes" element={<DebitNotes />} />
            <Route path="/trial-balance" element={<TrialBalance />} />
            <Route path="/profit-loss" element={<ProfitLoss />} />
            <Route path="/period-closing" element={<PeriodClosing />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/ca-sharing" element={<CASharing />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
