// ============================================================
// App Context — Global State Management
// ============================================================

import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  Course, Student, Invoice, Payment, Expense, Vendor,
  JournalEntry, JournalLine, Account, Referral, Incentive,
  FinancialPeriod, User, CashTransaction, BankTransaction,
  BankAccount, InventoryItem, AuditLog, CreditNote, DebitNote,
} from '../types';
import {
  courses as defaultCourses,
  students as defaultStudents,
  invoices as defaultInvoices,
  payments as defaultPayments,
  expenses as defaultExpenses,
  vendors as defaultVendors,
  journalEntries as defaultJournals,
  journalLines as defaultJournalLines,
  allAccounts as defaultAccounts,
  referrals as defaultReferrals,
  incentives as defaultIncentives,
  users as defaultUsers,
  cashTransactions as defaultCash,
  bankTransactions as defaultBank,
  bankAccounts as defaultBankAccounts,
  inventoryItems as defaultInventory,
  auditLogs as defaultAuditLogs,
  currentFinancialPeriod,
} from './mockData';

interface AppState {
  // Data
  courses: Course[];
  students: Student[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  vendors: Vendor[];
  journalEntries: JournalEntry[];
  journalLines: JournalLine[];
  accounts: Account[];
  referrals: Referral[];
  incentives: Incentive[];
  users: User[];
  cashTransactions: CashTransaction[];
  bankTransactions: BankTransaction[];
  bankAccounts: BankAccount[];
  inventoryItems: InventoryItem[];
  auditLogs: AuditLog[];
  creditNotes: CreditNote[];
  debitNotes: DebitNote[];
  currentPeriod: FinancialPeriod;
  currentUser: User;

  // Actions
  addJournalEntry: (entry: JournalEntry, lines: JournalLine[]) => void;
  addPayment: (payment: Payment) => void;
  addExpense: (expense: Expense) => void;
  addAuditLog: (log: AuditLog) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [courses] = useState<Course[]>(defaultCourses);
  const [students] = useState<Student[]>(defaultStudents);
  const [invoices] = useState<Invoice[]>(defaultInvoices);
  const [payments] = useState<Payment[]>(defaultPayments);
  const [expenses] = useState<Expense[]>(defaultExpenses);
  const [vendors] = useState<Vendor[]>(defaultVendors);
  const [accounts] = useState<Account[]>(defaultAccounts);
  const [referrals] = useState<Referral[]>(defaultReferrals);
  const [incentives] = useState<Incentive[]>(defaultIncentives);
  const [users] = useState<User[]>(defaultUsers);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(defaultJournals);
  const [journalLines, setJournalLines] = useState<JournalLine[]>(defaultJournalLines);
  const [cashTransactions] = useState<CashTransaction[]>(defaultCash);
  const [bankTransactions] = useState<BankTransaction[]>(defaultBank);
  const [bankAccounts] = useState<BankAccount[]>(defaultBankAccounts);
  const [inventoryItems] = useState<InventoryItem[]>(defaultInventory);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(defaultAuditLogs);
  const [creditNotes] = useState<CreditNote[]>([]);
  const [debitNotes] = useState<DebitNote[]>([]);

  const addJournalEntry = (entry: JournalEntry, lines: JournalLine[]) => {
    setJournalEntries(prev => [...prev, entry]);
    setJournalLines(prev => [...prev, ...lines]);
  };

  const addPayment = (_payment: Payment) => {
    // In real app: save to Firebase, create journal, update invoice
  };

  const addExpense = (_expense: Expense) => {
    // In real app: save to Firebase, create journal
  };

  const addAuditLog = (log: AuditLog) => {
    setAuditLogs(prev => [...prev, log]);
  };

  return (
    <AppContext.Provider value={{
      courses, students, invoices, payments, expenses, vendors,
      journalEntries, journalLines, accounts, referrals, incentives,
      users, cashTransactions, bankTransactions, bankAccounts,
      inventoryItems, auditLogs, creditNotes, debitNotes,
      currentPeriod: currentFinancialPeriod,
      currentUser: users[0],
      addJournalEntry, addPayment, addExpense, addAuditLog,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
