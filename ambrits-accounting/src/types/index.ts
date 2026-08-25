// ============================================================
// Ambrits Training Hub — Accounting & Finance Types
// ============================================================

// ---------- Organisation & Settings ----------
export interface Organisation {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  gstNumber?: string;
  financialYearStart: string; // ISO date
  createdAt: string;
  updatedAt: string;
}

export interface AccountingSettings {
  id: string;
  organisationId: string;
  baseCurrency: string; // INR
  financialYearStart: string;
  autoPostJournals: boolean;
  requireJournalApproval: boolean;
  defaultPaymentTerms: number; // days
  createdAt: string;
  updatedAt: string;
}

// ---------- Financial Periods ----------
export type PeriodStatus = 'open' | 'under_review' | 'pending_approval' | 'closed' | 'reopened';

export interface FinancialPeriod {
  id: string;
  organisationId: string;
  periodName: string; // e.g. "FY 2025-26 Q1"
  startDate: string;
  endDate: string;
  status: PeriodStatus;
  closedBy?: string;
  closedAt?: string;
  reopenedBy?: string;
  reopenedAt?: string;
  closingJournalId?: string;
  createdAt: string;
}

// ---------- Users & Roles ----------
export type UserRole =
  | 'super_admin'
  | 'owner'
  | 'finance_manager'
  | 'accountant'
  | 'counsellor'
  | 'cashier'
  | 'inventory_user'
  | 'ca_auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------- Courses ----------
export interface Course {
  id: string;
  name: string; // IELTS, PTE, Duolingo, English, GRE, etc.
  code: string;
  description?: string;
  defaultFee: number;
  duration?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------- Students ----------
export type StudentStatus = 'active' | 'inactive' | 'completed' | 'paused';

export interface Student {
  id: string;
  name: string;
  email?: string;
  phone: string;
  courseId: string;
  courseName: string;
  counsellorId?: string;
  counsellorName?: string;
  status: StudentStatus;
  referralCode?: string;
  referredById?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Admissions ----------
export type AdmissionStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Admission {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  admissionDate: string;
  feePlanId?: string;
  status: AdmissionStatus;
  counsellorId?: string;
  counsellorName?: string;
  batchId?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Fee Plans ----------
export interface FeePlanItem {
  id: string;
  description: string;
  amount: number;
  taxCode?: string;
  taxAmount?: number;
}

export interface FeePlan {
  id: string;
  admissionId: string;
  studentId: string;
  courseId: string;
  totalAmount: number;
  discount: number;
  netAmount: number;
  instalments: number;
  items: FeePlanItem[];
  createdAt: string;
}

// ---------- Invoices ----------
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  admissionId: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  counsellorId?: string;
  invoiceDate: string;
  dueDate: string;
  promiseDate?: string;
  totalAmount: number;
  discount: number;
  taxAmount: number;
  netAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: InvoiceStatus;
  journalId?: string;
  financialPeriodId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Instalments ----------
export type InstalmentStatus = 'pending' | 'paid' | 'overdue' | 'partial' | 'waived';

export interface Instalment {
  id: string;
  invoiceId: string;
  studentId: string;
  instalmentNumber: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  status: InstalmentStatus;
  createdAt: string;
}

// ---------- Payments ----------
export type PaymentMode = 'cash' | 'upi' | 'card' | 'bank_transfer' | 'cheque' | 'payment_gateway' | 'payment_link' | 'other';
export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'cancelled' | 'refunded';

export interface Payment {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  invoiceId?: string;
  courseId: string;
  courseName: string;
  amount: number;
  paymentMode: PaymentMode;
  paymentDate: string;
  referenceNumber?: string;
  remarks?: string;
  proofUrl?: string;
  receiptUrl?: string;
  status: PaymentStatus;
  journalId?: string;
  financialPeriodId: string;
  createdBy: string;
  createdAt: string;
}

// ---------- Payment Allocations ----------
export interface PaymentAllocation {
  id: string;
  paymentId: string;
  invoiceId: string;
  instalmentId?: string;
  studentId: string;
  courseId: string;
  allocatedAmount: number;
  allocationDate: string;
  createdBy: string;
  createdAt: string;
}

// ---------- Vendors ----------
export interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  gstNumber?: string;
  paymentTerms: number; // days
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------- Expenses ----------
export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid';

export interface Expense {
  id: string;
  expenseNumber: string;
  vendorId?: string;
  vendorName?: string;
  title: string;
  description?: string;
  category: string;
  courseId?: string;
  courseName?: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  paymentMode?: PaymentMode;
  expenseDate: string;
  attachmentUrl?: string;
  status: ExpenseStatus;
  journalId?: string;
  financialPeriodId: string;
  approvedBy?: string;
  approvedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Payables ----------
export interface Payable {
  id: string;
  vendorId: string;
  vendorName: string;
  expenseId?: string;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: string;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  financialPeriodId: string;
  createdAt: string;
}

// ---------- Inventory ----------
export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  unit: string;
  currentStock: number;
  minimumStock: number;
  costPerUnit: number;
  totalValue: number;
  status: InventoryStatus;
  courseId?: string;
  courseName?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Referrals ----------
export type ReferralStatus = 'pending' | 'eligible' | 'approved' | 'paid' | 'rejected';
export type RewardStatus = 'pending' | 'approved' | 'paid' | 'cancelled';

export interface Referral {
  id: string;
  referralCode: string;
  referrerStudentId: string;
  referrerName: string;
  referredStudentId: string;
  referredStudentName: string;
  referredAdmissionId?: string;
  courseId: string;
  courseName: string;
  referralDate: string;
  conversionDate?: string;
  discountApplied: number;
  rewardAmount: number;
  rewardType: 'cash' | 'discount' | 'credit';
  rewardStatus: RewardStatus;
  accountingStatus: ReferralStatus;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  paymentStatus: 'pending' | 'paid';
  journalId?: string;
  financialPeriodId: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Incentives ----------
export type IncentiveType = 'counsellor' | 'salesperson' | 'referral_student' | 'trainer' | 'other';
export type IncentiveStatus = 'pending' | 'approved' | 'paid' | 'rejected';

export interface Incentive {
  id: string;
  incentiveType: IncentiveType;
  userId?: string;
  userName: string;
  studentId?: string;
  courseId?: string;
  courseName?: string;
  admissionId?: string;
  amount: number;
  calculationRule?: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  payableStatus: 'pending' | 'payable' | 'paid';
  paymentStatus: 'pending' | 'paid';
  paymentDate?: string;
  journalId?: string;
  financialPeriodId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// ACCOUNTING ENGINE TYPES
// ============================================================

// ---------- Chart of Accounts ----------
export type AccountType = 'asset' | 'liability' | 'income' | 'expense' | 'equity';
export type AccountGroup =
  | 'cash_in_hand' | 'bank_account' | 'payment_gateway_receivable'
  | 'student_receivables' | 'advance_to_vendors' | 'inventory'
  | 'input_gst' | 'security_deposits' | 'fixed_assets' | 'accumulated_depreciation'
  | 'student_advances' | 'accounts_payable' | 'output_gst_payable'
  | 'tds_payable' | 'salary_payable' | 'trainer_payable'
  | 'counsellor_incentive_payable' | 'referral_reward_payable'
  | 'other_current_liabilities'
  | 'course_revenue' | 'mock_test_revenue' | 'exam_slot_revenue'
  | 'course_addon_revenue' | 'study_material_revenue'
  | 'registration_revenue' | 'other_operating_income'
  | 'trainer_payments' | 'salaries' | 'counsellor_incentives'
  | 'referral_rewards_expense' | 'advertising' | 'office_rent'
  | 'electricity' | 'internet' | 'telephone'
  | 'teaching_materials' | 'inventory_consumption'
  | 'software_subscriptions' | 'payment_gateway_charges'
  | 'bank_charges' | 'repairs_maintenance' | 'professional_fees'
  | 'printing_stationery' | 'travel_conveyance' | 'depreciation' | 'other_expenses'
  | 'capital_account' | 'owners_drawings' | 'retained_earnings' | 'current_year_pl';

export type NormalBalance = 'debit' | 'credit';

export interface Account {
  id: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  accountGroup: AccountGroup;
  parentAccountId?: string;
  normalBalance: NormalBalance;
  courseRequired: boolean;
  taxCode?: string;
  isSystemAccount: boolean;
  isActive: boolean;
  description?: string;
  openingBalance: number;
  createdBy: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

// ---------- Journal Entries ----------
export type JournalType =
  | 'invoice' | 'payment' | 'expense' | 'purchase'
  | 'inventory' | 'referral' | 'incentive'
  | 'trainer_payment' | 'credit_note' | 'debit_note'
  | 'manual' | 'reversal' | 'period_close' | 'opening_balance';

export type JournalStatus = 'draft' | 'pending_approval' | 'approved' | 'posted' | 'reversed' | 'cancelled' | 'locked';

export interface JournalEntry {
  id: string;
  journalNumber: string;
  journalDate: string;
  journalType: JournalType;
  sourceType?: string;
  sourceId?: string;
  narration: string;
  totalDebit: number;
  totalCredit: number;
  courseId?: string;
  courseName?: string;
  studentId?: string;
  studentName?: string;
  status: JournalStatus;
  reversalStatus: 'none' | 'reversed' | 'partial';
  reversalOfJournalId?: string;
  financialPeriodId: string;
  createdBy: string;
  approvedBy?: string;
  postedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalLine {
  id: string;
  journalId: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  debitAmount: number;
  creditAmount: number;
  courseId?: string;
  courseName?: string;
  studentId?: string;
  studentName?: string;
  vendorId?: string;
  vendorName?: string;
  referralId?: string;
  costCategory?: string;
  taxCode?: string;
  narration?: string;
}

// ---------- General Ledger ----------
export interface LedgerEntry {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  transactionDate: string;
  voucherNumber: string;
  voucherType: JournalType;
  narration: string;
  studentId?: string;
  studentName?: string;
  courseId?: string;
  courseName?: string;
  debitAmount: number;
  creditAmount: number;
  runningBalance: number;
  journalId: string;
  financialPeriodId: string;
}

// ---------- Cash Book ----------
export interface CashTransaction {
  id: string;
  date: string;
  voucherNumber: string;
  voucherType: JournalType;
  description: string;
  studentId?: string;
  studentName?: string;
  vendorId?: string;
  vendorName?: string;
  courseId?: string;
  courseName?: string;
  cashReceived: number;
  cashPaid: number;
  runningBalance: number;
  userId: string;
  userName: string;
  supportingDocument?: string;
  reconciliationStatus: 'unreconciled' | 'reconciled';
  journalId: string;
  financialPeriodId: string;
  createdAt: string;
}

// ---------- Bank Book ----------
export interface BankTransaction {
  id: string;
  bankAccountId: string;
  bankAccountName: string;
  transactionDate: string;
  referenceNumber: string;
  description: string;
  studentId?: string;
  studentName?: string;
  vendorId?: string;
  vendorName?: string;
  courseId?: string;
  courseName?: string;
  deposit: number;
  withdrawal: number;
  bankCharge: number;
  runningBalance: number;
  reconciliationStatus: 'unreconciled' | 'reconciled';
  journalId: string;
  financialPeriodId: string;
  createdAt: string;
}

export interface BankAccount {
  id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode?: string;
  openingBalance: number;
  currentBalance: number;
  isActive: boolean;
  chartOfAccountsId: string;
  createdAt: string;
}

// ---------- Credit Notes ----------
export type CreditNoteStatus = 'draft' | 'pending_approval' | 'approved' | 'posted' | 'cancelled';

export interface CreditNote {
  id: string;
  creditNoteNumber: string;
  date: string;
  studentId: string;
  studentName: string;
  invoiceId: string;
  courseId: string;
  courseName: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  reason: string;
  status: CreditNoteStatus;
  journalId?: string;
  financialPeriodId: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
}

// ---------- Debit Notes ----------
export type DebitNoteStatus = 'draft' | 'pending_approval' | 'approved' | 'posted' | 'cancelled';

export interface DebitNote {
  id: string;
  debitNoteNumber: string;
  date: string;
  studentId: string;
  studentName: string;
  invoiceId?: string;
  courseId: string;
  courseName: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  reason: string;
  status: DebitNoteStatus;
  journalId?: string;
  financialPeriodId: string;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
}

// ---------- Reversal Entries ----------
export interface ReversalEntry {
  id: string;
  originalJournalId: string;
  reversalJournalId: string;
  reversalDate: string;
  reason: string;
  approvedBy: string;
  financialPeriodId: string;
  createdAt: string;
}

// ---------- Audit Logs ----------
export type AuditAction =
  | 'invoice_created' | 'invoice_edited' | 'invoice_cancelled'
  | 'payment_created' | 'payment_edited' | 'payment_cancelled'
  | 'expense_created' | 'expense_approved' | 'expense_rejected'
  | 'journal_created' | 'journal_edited' | 'journal_posted' | 'journal_reversed'
  | 'credit_note_created' | 'debit_note_created'
  | 'period_closed' | 'period_reopened'
  | 'chart_of_accounts_modified' | 'user_permission_changed'
  | 'report_exported' | 'report_shared_with_ca'
  | 'opening_balance_changed' | 'bank_reconciliation_completed';

export interface AuditLog {
  id: string;
  actionType: AuditAction;
  entityType: string;
  entityId: string;
  voucherNumber?: string;
  userId: string;
  userName: string;
  timestamp: string;
  ipAddress?: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
  approvalReference?: string;
  deviceInfo?: string;
}

// ---------- Report Shares ----------
export interface ReportShare {
  id: string;
  reportName: string;
  reportType: string;
  recipientName: string;
  recipientEmail: string;
  sharedBy: string;
  financialPeriod: string;
  permissions: {
    view: boolean;
    download: boolean;
    export: boolean;
  };
  accessExpiry?: string;
  passwordRequired: boolean;
  status: 'active' | 'expired' | 'revoked';
  createdAt: string;
  revokedAt?: string;
}

// ============================================================
// DASHBOARD / REPORT TYPES
// ============================================================

export interface BusinessOverview {
  totalRevenue: number;
  totalInvoices: number;
  totalPaymentsReceived: number;
  totalExpenses: number;
  netProfit: number;
  totalReceivables: number;
  totalPayables: number;
  cashBalance: number;
  bankBalance: number;
  inventoryValue: number;
  totalAdmissions: number;
  activeStudents: number;
  coursePerformance: CoursePerformance[];
  referralExpenses: number;
  incentiveExpenses: number;
  monthlyRevenueTrend: MonthlyTrend[];
  monthlyExpenseTrend: MonthlyTrend[];
  monthlyProfitTrend: MonthlyTrend[];
}

export interface CoursePerformance {
  courseId: string;
  courseName: string;
  admissions: number;
  grossBilling: number;
  netBilling: number;
  paymentsReceived: number;
  outstanding: number;
  profit: number;
  profitMargin: number;
}

export interface MonthlyTrend {
  month: string;
  amount: number;
}

export interface TrialBalanceRow {
  accountId: string;
  accountCode: string;
  accountName: string;
  accountType: AccountType;
  accountGroup: AccountGroup;
  openingDebit: number;
  openingCredit: number;
  periodDebit: number;
  periodCredit: number;
  closingDebit: number;
  closingCredit: number;
  difference: number;
}

export interface ProfitAndLossRow {
  category: string;
  subcategory?: string;
  amount: number;
  percentage?: number;
}

// ---------- Navigation / Menu ----------
export interface MenuItem {
  label: string;
  path: string;
  icon: string;
  children?: MenuItem[];
  requiredRoles?: UserRole[];
}
