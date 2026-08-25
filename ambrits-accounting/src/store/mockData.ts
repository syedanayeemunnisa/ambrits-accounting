// ============================================================
// Mock Data Store — Ambrits Training Hub
// ============================================================

import type {
  Course, Student, Invoice, Payment,
  Expense, Vendor, Referral, Incentive, JournalEntry, JournalLine,
  CashTransaction, BankTransaction, BankAccount,
  FinancialPeriod, User, InventoryItem, AuditLog, Account,
} from '../types';
import { defaultAccounts } from '../engine/seedData';

// ---------- Organisation ----------
export const currentFinancialPeriod: FinancialPeriod = {
  id: 'fp-2025-26',
  organisationId: 'org-1',
  periodName: 'FY 2025-26',
  startDate: '2025-04-01',
  endDate: '2026-03-31',
  status: 'open',
  createdAt: '2025-04-01T00:00:00Z',
};

// ---------- Users ----------
export const users: User[] = [
  { id: 'user-1', name: 'Admin', email: 'admin@ambrits.com', role: 'super_admin', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'user-2', name: 'Priya Sharma', email: 'priya@ambrits.com', role: 'owner', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'user-3', name: 'Ravi Kumar', email: 'ravi@ambrits.com', role: 'finance_manager', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'user-4', name: 'Anita Desai', email: 'anita@ambrits.com', role: 'accountant', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'user-5', name: 'Sneha Patel', email: 'sneha@ambrits.com', role: 'counsellor', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'user-6', name: 'Raj Menon', email: 'raj@ambrits.com', role: 'cashier', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'user-7', name: 'CA Mehta & Associates', email: 'ca@mehta.com', role: 'ca_auditor', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
];

// ---------- Courses ----------
export const courses: Course[] = [
  { id: 'crs-1', name: 'IELTS', code: 'IELTS', description: 'International English Language Testing System', defaultFee: 12000, duration: '2 months', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'crs-2', name: 'PTE', code: 'PTE', description: 'Pearson Test of English', defaultFee: 10000, duration: '6 weeks', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'crs-3', name: 'Duolingo', code: 'DET', description: 'Duolingo English Test', defaultFee: 8000, duration: '1 month', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'crs-4', name: 'English Speaking', code: 'ENG', description: 'English Speaking and Fluency', defaultFee: 5000, duration: '3 months', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'crs-5', name: 'Foundation English', code: 'FND', description: 'Foundation English Programme', defaultFee: 6000, duration: '4 months', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'crs-6', name: 'GRE', code: 'GRE', description: 'Graduate Record Examination', defaultFee: 15000, duration: '3 months', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'crs-7', name: 'LanguageCert', code: 'LC', description: 'LanguageCert International ESOL', defaultFee: 9000, duration: '6 weeks', isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
];

// ---------- Students ----------
export const students: Student[] = [
  { id: 'stu-1', name: 'Aisha Khan', email: 'aisha@email.com', phone: '9876543210', courseId: 'crs-1', courseName: 'IELTS', counsellorId: 'user-5', counsellorName: 'Sneha Patel', status: 'active', referralCode: 'REF-AISHA', createdAt: '2025-04-10', updatedAt: '2025-04-10' },
  { id: 'stu-2', name: 'Vikram Rao', email: 'vikram@email.com', phone: '9876543211', courseId: 'crs-2', courseName: 'PTE', counsellorId: 'user-5', counsellorName: 'Sneha Patel', status: 'active', createdAt: '2025-04-15', updatedAt: '2025-04-15' },
  { id: 'stu-3', name: 'Meera Joshi', email: 'meera@email.com', phone: '9876543212', courseId: 'crs-1', courseName: 'IELTS', counsellorId: 'user-5', counsellorName: 'Sneha Patel', status: 'active', createdAt: '2025-04-20', updatedAt: '2025-04-20' },
  { id: 'stu-4', name: 'Arjun Nair', email: 'arjun@email.com', phone: '9876543213', courseId: 'crs-3', courseName: 'Duolingo', status: 'active', createdAt: '2025-05-01', updatedAt: '2025-05-01' },
  { id: 'stu-5', name: 'Fatima Syed', email: 'fatima@email.com', phone: '9876543214', courseId: 'crs-4', courseName: 'English Speaking', counsellorId: 'user-5', counsellorName: 'Sneha Patel', status: 'active', createdAt: '2025-05-05', updatedAt: '2025-05-05' },
  { id: 'stu-6', name: 'Rohan Mehta', email: 'rohan@email.com', phone: '9876543215', courseId: 'crs-6', courseName: 'GRE', status: 'active', referredById: 'stu-1', createdAt: '2025-05-10', updatedAt: '2025-05-10' },
  { id: 'stu-7', name: 'Priyanka Gupta', email: 'priyanka@email.com', phone: '9876543216', courseId: 'crs-1', courseName: 'IELTS', counsellorId: 'user-5', counsellorName: 'Sneha Patel', status: 'active', createdAt: '2025-05-15', updatedAt: '2025-05-15' },
  { id: 'stu-8', name: 'Sanjay Verma', email: 'sanjay@email.com', phone: '9876543217', courseId: 'crs-2', courseName: 'PTE', status: 'inactive', createdAt: '2025-03-01', updatedAt: '2025-04-01' },
  { id: 'stu-9', name: 'Neha Agarwal', email: 'neha@email.com', phone: '9876543218', courseId: 'crs-7', courseName: 'LanguageCert', status: 'active', createdAt: '2025-05-20', updatedAt: '2025-05-20' },
  { id: 'stu-10', name: 'Karan Singh', email: 'karan@email.com', phone: '9876543219', courseId: 'crs-5', courseName: 'Foundation English', status: 'active', createdAt: '2025-06-01', updatedAt: '2025-06-01' },
];

// ---------- Invoices ----------
export const invoices: Invoice[] = [
  { id: 'inv-1', invoiceNumber: 'INV-202504-00001', admissionId: 'adm-1', studentId: 'stu-1', studentName: 'Aisha Khan', courseId: 'crs-1', courseName: 'IELTS', counsellorId: 'user-5', invoiceDate: '2025-04-10', dueDate: '2025-05-10', totalAmount: 12000, discount: 1000, taxAmount: 0, netAmount: 11000, paidAmount: 5500, balanceAmount: 5500, status: 'partial', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-10', updatedAt: '2025-04-20' },
  { id: 'inv-2', invoiceNumber: 'INV-202504-00002', admissionId: 'adm-2', studentId: 'stu-2', studentName: 'Vikram Rao', courseId: 'crs-2', courseName: 'PTE', invoiceDate: '2025-04-15', dueDate: '2025-05-15', totalAmount: 10000, discount: 0, taxAmount: 0, netAmount: 10000, paidAmount: 10000, balanceAmount: 0, status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-15', updatedAt: '2025-04-30' },
  { id: 'inv-3', invoiceNumber: 'INV-202504-00003', admissionId: 'adm-3', studentId: 'stu-3', studentName: 'Meera Joshi', courseId: 'crs-1', courseName: 'IELTS', invoiceDate: '2025-04-20', dueDate: '2025-05-20', totalAmount: 12000, discount: 2000, taxAmount: 0, netAmount: 10000, paidAmount: 3333, balanceAmount: 6667, status: 'partial', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-20', updatedAt: '2025-05-01' },
  { id: 'inv-4', invoiceNumber: 'INV-202505-00004', admissionId: 'adm-4', studentId: 'stu-4', studentName: 'Arjun Nair', courseId: 'crs-3', courseName: 'Duolingo', invoiceDate: '2025-05-01', dueDate: '2025-06-01', totalAmount: 8000, discount: 0, taxAmount: 0, netAmount: 8000, paidAmount: 0, balanceAmount: 8000, status: 'overdue', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-01', updatedAt: '2025-06-02' },
  { id: 'inv-5', invoiceNumber: 'INV-202505-00005', admissionId: 'adm-5', studentId: 'stu-5', studentName: 'Fatima Syed', courseId: 'crs-4', courseName: 'English Speaking', invoiceDate: '2025-05-05', dueDate: '2025-06-05', totalAmount: 5000, discount: 500, taxAmount: 0, netAmount: 4500, paidAmount: 4500, balanceAmount: 0, status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-05', updatedAt: '2025-05-20' },
  { id: 'inv-6', invoiceNumber: 'INV-202505-00006', admissionId: 'adm-6', studentId: 'stu-6', studentName: 'Rohan Mehta', courseId: 'crs-6', courseName: 'GRE', invoiceDate: '2025-05-10', dueDate: '2025-06-10', totalAmount: 15000, discount: 0, taxAmount: 0, netAmount: 15000, paidAmount: 7500, balanceAmount: 7500, status: 'partial', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-10', updatedAt: '2025-05-25' },
  { id: 'inv-7', invoiceNumber: 'INV-202505-00007', admissionId: 'adm-7', studentId: 'stu-7', studentName: 'Priyanka Gupta', courseId: 'crs-1', courseName: 'IELTS', invoiceDate: '2025-05-15', dueDate: '2025-06-15', totalAmount: 12000, discount: 0, taxAmount: 0, netAmount: 12000, paidAmount: 4000, balanceAmount: 8000, status: 'partial', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-15', updatedAt: '2025-06-01' },
  { id: 'inv-8', invoiceNumber: 'INV-202506-00008', admissionId: 'adm-9', studentId: 'stu-9', studentName: 'Neha Agarwal', courseId: 'crs-7', courseName: 'LanguageCert', invoiceDate: '2025-05-20', dueDate: '2025-06-20', totalAmount: 9000, discount: 0, taxAmount: 0, netAmount: 9000, paidAmount: 0, balanceAmount: 9000, status: 'sent', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-20', updatedAt: '2025-05-20' },
];

// ---------- Payments ----------
export const payments: Payment[] = [
  { id: 'pay-1', receiptNumber: 'RCP-202504-00001', studentId: 'stu-1', studentName: 'Aisha Khan', invoiceId: 'inv-1', courseId: 'crs-1', courseName: 'IELTS', amount: 5500, paymentMode: 'upi', paymentDate: '2025-04-20', referenceNumber: 'UPI-123456', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-04-20' },
  { id: 'pay-2', receiptNumber: 'RCP-202504-00002', studentId: 'stu-2', studentName: 'Vikram Rao', invoiceId: 'inv-2', courseId: 'crs-2', courseName: 'PTE', amount: 5000, paymentMode: 'cash', paymentDate: '2025-04-16', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-04-16' },
  { id: 'pay-3', receiptNumber: 'RCP-202504-00003', studentId: 'stu-2', studentName: 'Vikram Rao', invoiceId: 'inv-2', courseId: 'crs-2', courseName: 'PTE', amount: 5000, paymentMode: 'card', paymentDate: '2025-04-30', referenceNumber: 'CARD-789012', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-04-30' },
  { id: 'pay-4', receiptNumber: 'RCP-202505-00004', studentId: 'stu-3', studentName: 'Meera Joshi', invoiceId: 'inv-3', courseId: 'crs-1', courseName: 'IELTS', amount: 3333, paymentMode: 'bank_transfer', paymentDate: '2025-05-01', referenceNumber: 'NEFT-345678', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-05-01' },
  { id: 'pay-5', receiptNumber: 'RCP-202505-00005', studentId: 'stu-5', studentName: 'Fatima Syed', invoiceId: 'inv-5', courseId: 'crs-4', courseName: 'English Speaking', amount: 4500, paymentMode: 'upi', paymentDate: '2025-05-20', referenceNumber: 'UPI-901234', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-05-20' },
  { id: 'pay-6', receiptNumber: 'RCP-202505-00006', studentId: 'stu-6', studentName: 'Rohan Mehta', invoiceId: 'inv-6', courseId: 'crs-6', courseName: 'GRE', amount: 7500, paymentMode: 'cheque', paymentDate: '2025-05-25', referenceNumber: 'CHQ-567890', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-05-25' },
  { id: 'pay-7', receiptNumber: 'RCP-202506-00007', studentId: 'stu-7', studentName: 'Priyanka Gupta', invoiceId: 'inv-7', courseId: 'crs-1', courseName: 'IELTS', amount: 4000, paymentMode: 'cash', paymentDate: '2025-06-01', status: 'completed', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-06-01' },
];

// ---------- Vendors ----------
export const vendors: Vendor[] = [
  { id: 'vnd-1', name: 'ABC Publishers', phone: '9876000001', email: 'abc@publishers.com', paymentTerms: 30, isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'vnd-2', name: 'Tech Solutions Pvt Ltd', phone: '9876000002', email: 'info@techsolutions.com', paymentTerms: 15, isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 'vnd-3', name: 'PrintHub Services', phone: '9876000003', email: 'print@hub.com', paymentTerms: 7, isActive: true, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
];

// ---------- Expenses ----------
export const expenses: Expense[] = [
  { id: 'exp-1', expenseNumber: 'EXP-202504-00001', vendorId: 'vnd-1', vendorName: 'ABC Publishers', title: 'IELTS Study Materials', description: 'Cambridge IELTS books batch', category: 'Teaching Materials', courseId: 'crs-1', courseName: 'IELTS', amount: 15000, taxAmount: 0, totalAmount: 15000, paymentMode: 'bank_transfer', expenseDate: '2025-04-05', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-05', updatedAt: '2025-04-05' },
  { id: 'exp-2', expenseNumber: 'EXP-202504-00002', title: 'Office Rent - April', category: 'Office Rent', amount: 35000, taxAmount: 0, totalAmount: 35000, paymentMode: 'bank_transfer', expenseDate: '2025-04-01', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-01', updatedAt: '2025-04-01' },
  { id: 'exp-3', expenseNumber: 'EXP-202504-00003', title: 'Internet - April', category: 'Internet', amount: 2500, taxAmount: 0, totalAmount: 2500, paymentMode: 'upi', expenseDate: '2025-04-05', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-04-05', updatedAt: '2025-04-05' },
  { id: 'exp-4', expenseNumber: 'EXP-202504-00004', title: 'Electricity - April', category: 'Electricity', amount: 4500, taxAmount: 0, totalAmount: 4500, paymentMode: 'cash', expenseDate: '2025-04-10', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-04-10', updatedAt: '2025-04-10' },
  { id: 'exp-5', expenseNumber: 'EXP-202505-00005', vendorId: 'vnd-2', vendorName: 'Tech Solutions Pvt Ltd', title: 'Software Subscription - May', category: 'Software Subscriptions', amount: 8000, taxAmount: 0, totalAmount: 8000, paymentMode: 'card', expenseDate: '2025-05-01', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-01', updatedAt: '2025-05-01' },
  { id: 'exp-6', expenseNumber: 'EXP-202505-00006', vendorId: 'vnd-3', vendorName: 'PrintHub Services', title: 'Brochures & Flyers', category: 'Printing and Stationery', amount: 3000, taxAmount: 0, totalAmount: 3000, paymentMode: 'cash', expenseDate: '2025-05-10', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', createdAt: '2025-05-10', updatedAt: '2025-05-10' },
  { id: 'exp-7', expenseNumber: 'EXP-202505-00007', title: 'Office Rent - May', category: 'Office Rent', amount: 35000, taxAmount: 0, totalAmount: 35000, paymentMode: 'bank_transfer', expenseDate: '2025-05-01', status: 'paid', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-05-01', updatedAt: '2025-05-01' },
  { id: 'exp-8', expenseNumber: 'EXP-202505-00008', title: 'Trainer Payment - IELTS May', category: 'Trainer Payments', courseId: 'crs-1', courseName: 'IELTS', amount: 20000, taxAmount: 0, totalAmount: 20000, paymentMode: 'bank_transfer', expenseDate: '2025-05-30', status: 'approved', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', approvedBy: 'user-4', createdAt: '2025-05-28', updatedAt: '2025-05-30' },
];

// ---------- Referrals ----------
export const referrals: Referral[] = [
  { id: 'ref-1', referralCode: 'REF-AISHA', referrerStudentId: 'stu-1', referrerName: 'Aisha Khan', referredStudentId: 'stu-6', referredStudentName: 'Rohan Mehta', referredAdmissionId: 'adm-6', courseId: 'crs-6', courseName: 'GRE', referralDate: '2025-05-08', conversionDate: '2025-05-10', discountApplied: 0, rewardAmount: 1000, rewardType: 'cash', rewardStatus: 'approved', accountingStatus: 'approved', approvalStatus: 'approved', paymentStatus: 'pending', financialPeriodId: 'fp-2025-26', createdAt: '2025-05-08', updatedAt: '2025-05-12' },
];

// ---------- Incentives ----------
export const incentives: Incentive[] = [
  { id: 'inc-1', incentiveType: 'counsellor', userId: 'user-5', userName: 'Sneha Patel', courseId: 'crs-1', courseName: 'IELTS', admissionId: 'adm-1', amount: 500, calculationRule: '5% of net invoice', approvalStatus: 'approved', payableStatus: 'payable', paymentStatus: 'pending', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-10', updatedAt: '2025-04-15' },
  { id: 'inc-2', incentiveType: 'counsellor', userId: 'user-5', userName: 'Sneha Patel', courseId: 'crs-2', courseName: 'PTE', admissionId: 'adm-2', amount: 400, calculationRule: '4% of net invoice', approvalStatus: 'approved', payableStatus: 'payable', paymentStatus: 'pending', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', createdAt: '2025-04-15', updatedAt: '2025-04-20' },
];

// ---------- Journal Entries ----------
export const journalEntries: JournalEntry[] = [
  { id: 'je-1', journalNumber: 'JV-202504-00001', journalDate: '2025-04-10', journalType: 'invoice', sourceType: 'invoice', sourceId: 'inv-1', narration: 'Invoice INV-202504-00001 raised for Aisha Khan - IELTS', totalDebit: 11000, totalCredit: 11000, courseId: 'crs-1', courseName: 'IELTS', studentId: 'stu-1', studentName: 'Aisha Khan', status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-4', postedAt: '2025-04-10T10:00:00Z', createdAt: '2025-04-10T10:00:00Z', updatedAt: '2025-04-10T10:00:00Z' },
  { id: 'je-2', journalNumber: 'JV-202504-00002', journalDate: '2025-04-20', journalType: 'payment', sourceType: 'payment', sourceId: 'pay-1', narration: 'Payment received from Aisha Khan via upi - ₹5500', totalDebit: 5500, totalCredit: 5500, courseId: 'crs-1', courseName: 'IELTS', studentId: 'stu-1', studentName: 'Aisha Khan', status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', postedAt: '2025-04-20T10:00:00Z', createdAt: '2025-04-20T10:00:00Z', updatedAt: '2025-04-20T10:00:00Z' },
  { id: 'je-3', journalNumber: 'JV-202504-00003', journalDate: '2025-04-15', journalType: 'invoice', sourceType: 'invoice', sourceId: 'inv-2', narration: 'Invoice INV-202504-00002 raised for Vikram Rao - PTE', totalDebit: 10000, totalCredit: 10000, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-4', postedAt: '2025-04-15T10:00:00Z', createdAt: '2025-04-15T10:00:00Z', updatedAt: '2025-04-15T10:00:00Z' },
  { id: 'je-4', journalNumber: 'JV-202504-00004', journalDate: '2025-04-16', journalType: 'payment', sourceType: 'payment', sourceId: 'pay-2', narration: 'Payment received from Vikram Rao via cash - ₹5000', totalDebit: 5000, totalCredit: 5000, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', postedAt: '2025-04-16T10:00:00Z', createdAt: '2025-04-16T10:00:00Z', updatedAt: '2025-04-16T10:00:00Z' },
  { id: 'je-5', journalNumber: 'JV-202504-00005', journalDate: '2025-04-30', journalType: 'payment', sourceType: 'payment', sourceId: 'pay-3', narration: 'Payment received from Vikram Rao via card - ₹5000', totalDebit: 5000, totalCredit: 5000, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', postedAt: '2025-04-30T10:00:00Z', createdAt: '2025-04-30T10:00:00Z', updatedAt: '2025-04-30T10:00:00Z' },
  { id: 'je-6', journalNumber: 'JV-202504-00006', journalDate: '2025-04-05', journalType: 'expense', sourceType: 'expense', sourceId: 'exp-1', narration: 'Expense: IELTS Study Materials - ₹15000', totalDebit: 15000, totalCredit: 15000, courseId: 'crs-1', courseName: 'IELTS', status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', postedAt: '2025-04-05T10:00:00Z', createdAt: '2025-04-05T10:00:00Z', updatedAt: '2025-04-05T10:00:00Z' },
  { id: 'je-7', journalNumber: 'JV-202504-00007', journalDate: '2025-04-01', journalType: 'expense', sourceType: 'expense', sourceId: 'exp-2', narration: 'Expense: Office Rent - April - ₹35000', totalDebit: 35000, totalCredit: 35000, status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-3', postedAt: '2025-04-01T10:00:00Z', createdAt: '2025-04-01T10:00:00Z', updatedAt: '2025-04-01T10:00:00Z' },
  { id: 'je-8', journalNumber: 'JV-202504-00008', journalDate: '2025-04-05', journalType: 'expense', sourceType: 'expense', sourceId: 'exp-3', narration: 'Expense: Internet - April - ₹2500', totalDebit: 2500, totalCredit: 2500, status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', postedAt: '2025-04-05T10:00:00Z', createdAt: '2025-04-05T10:00:00Z', updatedAt: '2025-04-05T10:00:00Z' },
  { id: 'je-9', journalNumber: 'JV-202504-00009', journalDate: '2025-04-10', journalType: 'expense', sourceType: 'expense', sourceId: 'exp-4', narration: 'Expense: Electricity - April - ₹4500', totalDebit: 4500, totalCredit: 4500, status: 'posted', reversalStatus: 'none', financialPeriodId: 'fp-2025-26', createdBy: 'user-6', postedAt: '2025-04-10T10:00:00Z', createdAt: '2025-04-10T10:00:00Z', updatedAt: '2025-04-10T10:00:00Z' },
];

// ---------- Journal Lines ----------
export const journalLines: JournalLine[] = [
  // JE-1: Invoice for Aisha Khan
  { id: 'jl-1', journalId: 'je-1', accountId: 'acc-1200', accountCode: '1200', accountName: 'Student Receivables', debitAmount: 11000, creditAmount: 0, courseId: 'crs-1', courseName: 'IELTS', studentId: 'stu-1', studentName: 'Aisha Khan', narration: 'Student receivable for IELTS' },
  { id: 'jl-2', journalId: 'je-1', accountId: 'acc-4000', accountCode: '4000', accountName: 'IELTS Course Revenue', debitAmount: 0, creditAmount: 11000, courseId: 'crs-1', courseName: 'IELTS', narration: 'Revenue recognized for IELTS' },
  // JE-2: Payment from Aisha Khan
  { id: 'jl-3', journalId: 'je-2', accountId: 'acc-1110', accountCode: '1110', accountName: 'Bank Account', debitAmount: 5500, creditAmount: 0, courseId: 'crs-1', courseName: 'IELTS', studentId: 'stu-1', studentName: 'Aisha Khan', narration: 'UPI receipt' },
  { id: 'jl-4', journalId: 'je-2', accountId: 'acc-1200', accountCode: '1200', accountName: 'Student Receivables', debitAmount: 0, creditAmount: 5500, courseId: 'crs-1', courseName: 'IELTS', studentId: 'stu-1', studentName: 'Aisha Khan', narration: 'Reduce student receivable' },
  // JE-3: Invoice for Vikram Rao
  { id: 'jl-5', journalId: 'je-3', accountId: 'acc-1200', accountCode: '1200', accountName: 'Student Receivables', debitAmount: 10000, creditAmount: 0, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', narration: 'Student receivable for PTE' },
  { id: 'jl-6', journalId: 'je-3', accountId: 'acc-4010', accountCode: '4010', accountName: 'PTE Course Revenue', debitAmount: 0, creditAmount: 10000, courseId: 'crs-2', courseName: 'PTE', narration: 'Revenue recognized for PTE' },
  // JE-4: Payment from Vikram (cash)
  { id: 'jl-7', journalId: 'je-4', accountId: 'acc-1100', accountCode: '1100', accountName: 'Cash in Hand', debitAmount: 5000, creditAmount: 0, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', narration: 'Cash receipt' },
  { id: 'jl-8', journalId: 'je-4', accountId: 'acc-1200', accountCode: '1200', accountName: 'Student Receivables', debitAmount: 0, creditAmount: 5000, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', narration: 'Reduce student receivable' },
  // JE-5: Payment from Vikram (card)
  { id: 'jl-9', journalId: 'je-5', accountId: 'acc-1110', accountCode: '1110', accountName: 'Bank Account', debitAmount: 5000, creditAmount: 0, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', narration: 'Card receipt' },
  { id: 'jl-10', journalId: 'je-5', accountId: 'acc-1200', accountCode: '1200', accountName: 'Student Receivables', debitAmount: 0, creditAmount: 5000, courseId: 'crs-2', courseName: 'PTE', studentId: 'stu-2', studentName: 'Vikram Rao', narration: 'Reduce student receivable' },
  // JE-6: Expense - Study Materials
  { id: 'jl-11', journalId: 'je-6', accountId: 'acc-5600', accountCode: '5600', accountName: 'Teaching Materials', debitAmount: 15000, creditAmount: 0, courseId: 'crs-1', courseName: 'IELTS', vendorId: 'vnd-1', vendorName: 'ABC Publishers', narration: 'IELTS study materials' },
  { id: 'jl-12', journalId: 'je-6', accountId: 'acc-1110', accountCode: '1110', accountName: 'Bank Account', debitAmount: 0, creditAmount: 15000, vendorId: 'vnd-1', vendorName: 'ABC Publishers', narration: 'Bank payment' },
  // JE-7: Office Rent
  { id: 'jl-13', journalId: 'je-7', accountId: 'acc-5500', accountCode: '5500', accountName: 'Office Rent', debitAmount: 35000, creditAmount: 0, narration: 'Office rent April' },
  { id: 'jl-14', journalId: 'je-7', accountId: 'acc-1110', accountCode: '1110', accountName: 'Bank Account', debitAmount: 0, creditAmount: 35000, narration: 'Bank payment' },
  // JE-8: Internet
  { id: 'jl-15', journalId: 'je-8', accountId: 'acc-5520', accountCode: '5520', accountName: 'Internet', debitAmount: 2500, creditAmount: 0, narration: 'Internet April' },
  { id: 'jl-16', journalId: 'je-8', accountId: 'acc-1110', accountCode: '1110', accountName: 'Bank Account', debitAmount: 0, creditAmount: 2500, narration: 'UPI payment' },
  // JE-9: Electricity
  { id: 'jl-17', journalId: 'je-9', accountId: 'acc-5510', accountCode: '5510', accountName: 'Electricity', debitAmount: 4500, creditAmount: 0, narration: 'Electricity April' },
  { id: 'jl-18', journalId: 'je-9', accountId: 'acc-1100', accountCode: '1100', accountName: 'Cash in Hand', debitAmount: 0, creditAmount: 4500, narration: 'Cash payment' },
];

// ---------- Bank Accounts ----------
export const bankAccounts: BankAccount[] = [
  { id: 'bank-1', accountName: 'HDFC Business Account', bankName: 'HDFC Bank', accountNumber: '50100012345678', ifscCode: 'HDFC0001234', openingBalance: 50000, currentBalance: 50000 + 10500 - 23000, isActive: true, chartOfAccountsId: 'acc-1110', createdAt: '2025-01-01' },
];

// ---------- Cash Transactions ----------
export const cashTransactions: CashTransaction[] = [
  { id: 'ctx-1', date: '2025-04-16', voucherNumber: 'JV-202504-00004', voucherType: 'payment', description: 'Payment from Vikram Rao - Cash', studentId: 'stu-2', studentName: 'Vikram Rao', courseId: 'crs-2', courseName: 'PTE', cashReceived: 5000, cashPaid: 0, runningBalance: 5000, userId: 'user-6', userName: 'Raj Menon', reconciliationStatus: 'unreconciled', journalId: 'je-4', financialPeriodId: 'fp-2025-26', createdAt: '2025-04-16' },
  { id: 'ctx-2', date: '2025-04-10', voucherNumber: 'JV-202504-00009', voucherType: 'expense', description: 'Electricity - April', cashReceived: 0, cashPaid: 4500, runningBalance: 5000 - 4500, userId: 'user-6', userName: 'Raj Menon', reconciliationStatus: 'unreconciled', journalId: 'je-9', financialPeriodId: 'fp-2025-26', createdAt: '2025-04-10' },
  { id: 'ctx-3', date: '2025-05-20', voucherNumber: 'JV-202505-00005', voucherType: 'payment', description: 'Payment from Fatima Syed - UPI→Cash', studentId: 'stu-5', studentName: 'Fatima Syed', courseId: 'crs-4', courseName: 'English Speaking', cashReceived: 4500, cashPaid: 0, runningBalance: 500 + 4500, userId: 'user-6', userName: 'Raj Menon', reconciliationStatus: 'unreconciled', journalId: 'je-2', financialPeriodId: 'fp-2025-26', createdAt: '2025-05-20' },
  { id: 'ctx-4', date: '2025-06-01', voucherNumber: 'JV-202506-00007', voucherType: 'payment', description: 'Payment from Priyanka Gupta - Cash', studentId: 'stu-7', studentName: 'Priyanka Gupta', courseId: 'crs-1', courseName: 'IELTS', cashReceived: 4000, cashPaid: 0, runningBalance: 5000 + 4000, userId: 'user-6', userName: 'Raj Menon', reconciliationStatus: 'unreconciled', journalId: 'je-2', financialPeriodId: 'fp-2025-26', createdAt: '2025-06-01' },
];

// ---------- Bank Transactions ----------
export const bankTransactions: BankTransaction[] = [
  { id: 'btx-1', bankAccountId: 'bank-1', bankAccountName: 'HDFC Business Account', transactionDate: '2025-04-20', referenceNumber: 'UPI-123456', description: 'Payment from Aisha Khan', studentId: 'stu-1', studentName: 'Aisha Khan', courseId: 'crs-1', courseName: 'IELTS', deposit: 5500, withdrawal: 0, bankCharge: 0, runningBalance: 50000 + 5500, reconciliationStatus: 'unreconciled', journalId: 'je-2', financialPeriodId: 'fp-2025-26', createdAt: '2025-04-20' },
  { id: 'btx-2', bankAccountId: 'bank-1', bankAccountName: 'HDFC Business Account', transactionDate: '2025-04-30', referenceNumber: 'CARD-789012', description: 'Payment from Vikram Rao', studentId: 'stu-2', studentName: 'Vikram Rao', courseId: 'crs-2', courseName: 'PTE', deposit: 5000, withdrawal: 0, bankCharge: 50, runningBalance: 55500 + 5000 - 50, reconciliationStatus: 'unreconciled', journalId: 'je-5', financialPeriodId: 'fp-2025-26', createdAt: '2025-04-30' },
  { id: 'btx-3', bankAccountId: 'bank-1', bankAccountName: 'HDFC Business Account', transactionDate: '2025-04-05', referenceNumber: 'NEFT-OUT-001', description: 'ABC Publishers - Study Materials', vendorId: 'vnd-1', vendorName: 'ABC Publishers', deposit: 0, withdrawal: 15000, bankCharge: 0, runningBalance: 50000 - 15000, reconciliationStatus: 'reconciled', journalId: 'je-6', financialPeriodId: 'fp-2025-26', createdAt: '2025-04-05' },
  { id: 'btx-4', bankAccountId: 'bank-1', bankAccountName: 'HDFC Business Account', transactionDate: '2025-04-01', referenceNumber: 'NEFT-OUT-002', description: 'Office Rent - April', deposit: 0, withdrawal: 35000, bankCharge: 0, runningBalance: 35000 - 35000, reconciliationStatus: 'reconciled', journalId: 'je-7', financialPeriodId: 'fp-2025-26', createdAt: '2025-04-01' },
  { id: 'btx-5', bankAccountId: 'bank-1', bankAccountName: 'HDFC Business Account', transactionDate: '2025-05-01', referenceNumber: 'NEFT-OUT-003', description: 'Office Rent - May', deposit: 0, withdrawal: 35000, bankCharge: 0, runningBalance: 0 + 5000 - 35000, reconciliationStatus: 'unreconciled', journalId: 'je-7', financialPeriodId: 'fp-2025-26', createdAt: '2025-05-01' },
];

// ---------- Inventory ----------
export const inventoryItems: InventoryItem[] = [
  { id: 'inv-01', itemName: 'Cambridge IELTS Book 18', category: 'Books', unit: 'pcs', currentStock: 45, minimumStock: 10, costPerUnit: 500, totalValue: 22500, status: 'in_stock', courseId: 'crs-1', courseName: 'IELTS', createdAt: '2025-01-01', updatedAt: '2025-05-01' },
  { id: 'inv-02', itemName: 'PTE Practice Workbook', category: 'Books', unit: 'pcs', currentStock: 30, minimumStock: 8, costPerUnit: 400, totalValue: 12000, status: 'in_stock', courseId: 'crs-2', courseName: 'PTE', createdAt: '2025-01-01', updatedAt: '2025-05-01' },
  { id: 'inv-03', itemName: 'Headphones (Lab)', category: 'Equipment', unit: 'pcs', currentStock: 15, minimumStock: 5, costPerUnit: 800, totalValue: 12000, status: 'in_stock', createdAt: '2025-01-01', updatedAt: '2025-05-01' },
  { id: 'inv-04', itemName: 'Notepads', category: 'Stationery', unit: 'pcs', currentStock: 200, minimumStock: 50, costPerUnit: 30, totalValue: 6000, status: 'in_stock', createdAt: '2025-01-01', updatedAt: '2025-05-01' },
  { id: 'inv-05', itemName: 'Duolingo Prep Guide', category: 'Books', unit: 'pcs', currentStock: 3, minimumStock: 5, costPerUnit: 350, totalValue: 1050, status: 'low_stock', courseId: 'crs-3', courseName: 'Duolingo', createdAt: '2025-01-01', updatedAt: '2025-05-01' },
];

// ---------- Audit Logs ----------
export const auditLogs: AuditLog[] = [
  { id: 'al-1', actionType: 'invoice_created', entityType: 'invoice', entityId: 'inv-1', voucherNumber: 'INV-202504-00001', userId: 'user-3', userName: 'Ravi Kumar', timestamp: '2025-04-10T09:30:00Z', oldValue: '{}', newValue: '{"invoiceNumber":"INV-202504-00001","amount":11000}' },
  { id: 'al-2', actionType: 'payment_created', entityType: 'payment', entityId: 'pay-1', voucherNumber: 'RCP-202504-00001', userId: 'user-6', userName: 'Raj Menon', timestamp: '2025-04-20T11:00:00Z', oldValue: '{}', newValue: '{"amount":5500,"mode":"upi"}' },
  { id: 'al-3', actionType: 'expense_approved', entityType: 'expense', entityId: 'exp-8', userId: 'user-4', userName: 'Anita Desai', timestamp: '2025-05-30T14:00:00Z', oldValue: '{"status":"approved"}', newValue: '{"status":"paid"}', reason: 'Approved for trainer payment' },
  { id: 'al-4', actionType: 'journal_posted', entityType: 'journal', entityId: 'je-1', voucherNumber: 'JV-202504-00001', userId: 'user-4', userName: 'Anita Desai', timestamp: '2025-04-10T10:00:00Z', newValue: '{"totalDebit":11000,"totalCredit":11000}' },
  { id: 'al-5', actionType: 'journal_posted', entityType: 'journal', entityId: 'je-2', voucherNumber: 'JV-202504-00002', userId: 'user-6', userName: 'Raj Menon', timestamp: '2025-04-20T10:00:00Z', newValue: '{"totalDebit":5500,"totalCredit":5500}' },
];

// ---------- Accounts (mutable copy for state) ----------
export const allAccounts: Account[] = [...defaultAccounts];
