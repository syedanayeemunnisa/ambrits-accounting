// ============================================================
// Core Accounting Engine — Double-Entry Journal System
// ============================================================

import type {
  JournalEntry,
  JournalLine,
  Account,
  Invoice,
  Payment,
  Expense,
  CreditNote,
  DebitNote,
  Referral,
  Incentive,
} from '../types';

// ---------- Helpers ----------
let journalCounter = 0;
let voucherCounter = 0;
let creditNoteCounter = 0;
let debitNoteCounter = 0;
let receiptCounter = 0;
let expenseCounter = 0;

export function generateJournalNumber(): string {
  journalCounter++;
  const date = new Date();
  const prefix = `JV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;
  return `${prefix}-${String(journalCounter).padStart(5, '0')}`;
}

export function generateVoucherNumber(type: string): string {
  voucherCounter++;
  const prefix = type.toUpperCase().slice(0, 2);
  const date = new Date();
  return `${prefix}-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(voucherCounter).padStart(5, '0')}`;
}

export function generateCreditNoteNumber(): string {
  creditNoteCounter++;
  const date = new Date();
  return `CN-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(creditNoteCounter).padStart(5, '0')}`;
}

export function generateDebitNoteNumber(): string {
  debitNoteCounter++;
  const date = new Date();
  return `DN-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(debitNoteCounter).padStart(5, '0')}`;
}

export function generateReceiptNumber(): string {
  receiptCounter++;
  const date = new Date();
  return `RCP-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(receiptCounter).padStart(5, '0')}`;
}

export function generateExpenseNumber(): string {
  expenseCounter++;
  const date = new Date();
  return `EXP-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(expenseCounter).padStart(5, '0')}`;
}

// ---------- Validation ----------
export function validateJournalEntry(lines: JournalLine[]): { valid: boolean; error?: string } {
  const totalDebit = lines.reduce((sum, l) => sum + l.debitAmount, 0);
  const totalCredit = lines.reduce((sum, l) => sum + l.creditAmount, 0);

  if (Math.abs(totalDebit - totalCredit) > 0.01) {
    return {
      valid: false,
      error: `Unbalanced journal: Debits ₹${totalDebit.toFixed(2)} ≠ Credits ₹${totalCredit.toFixed(2)}`,
    };
  }

  if (lines.length < 2) {
    return { valid: false, error: 'Journal must have at least 2 lines' };
  }

  const hasDebit = lines.some(l => l.debitAmount > 0);
  const hasCredit = lines.some(l => l.creditAmount > 0);
  if (!hasDebit || !hasCredit) {
    return { valid: false, error: 'Journal must have at least one debit and one credit' };
  }

  return { valid: true };
}

// ============================================================
// JOURNAL GENERATORS — Auto-generate double-entry journals
// ============================================================

export function createInvoiceJournal(
  invoice: Invoice,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const studentReceivable = accounts.find(a => a.accountCode === '1200');
  const courseRevenue = accounts.find(a => a.accountCode === '4000');

  if (!studentReceivable || !courseRevenue) {
    throw new Error('Required accounts not found: Student Receivables (1200) or Course Revenue (4000)');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();

  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: invoice.invoiceDate,
    journalType: 'invoice',
    sourceType: 'invoice',
    sourceId: invoice.id,
    narration: `Invoice ${invoice.invoiceNumber} raised for ${invoice.studentName} - ${invoice.courseName}`,
    totalDebit: invoice.netAmount,
    totalCredit: invoice.netAmount,
    courseId: invoice.courseId,
    courseName: invoice.courseName,
    studentId: invoice.studentId,
    studentName: invoice.studentName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: studentReceivable.id,
      accountCode: studentReceivable.accountCode,
      accountName: studentReceivable.accountName,
      debitAmount: invoice.netAmount,
      creditAmount: 0,
      courseId: invoice.courseId,
      courseName: invoice.courseName,
      studentId: invoice.studentId,
      studentName: invoice.studentName,
      narration: `Student receivable for ${invoice.courseName}`,
    },
    {
      accountId: courseRevenue.id,
      accountCode: courseRevenue.accountCode,
      accountName: courseRevenue.accountName,
      debitAmount: 0,
      creditAmount: invoice.netAmount,
      courseId: invoice.courseId,
      courseName: invoice.courseName,
      narration: `Revenue recognized for ${invoice.courseName}`,
    },
  ];

  return { entry, lines };
}

export function createPaymentJournal(
  payment: Payment,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const studentReceivable = accounts.find(a => a.accountCode === '1200');

  let cashBankAccount: Account | undefined;
  switch (payment.paymentMode) {
    case 'cash':
      cashBankAccount = accounts.find(a => a.accountCode === '1100');
      break;
    case 'upi':
    case 'card':
    case 'bank_transfer':
    case 'payment_gateway':
      cashBankAccount = accounts.find(a => a.accountCode === '1110');
      break;
    case 'cheque':
      cashBankAccount = accounts.find(a => a.accountCode === '1110');
      break;
    default:
      cashBankAccount = accounts.find(a => a.accountCode === '1100');
  }

  if (!studentReceivable || !cashBankAccount) {
    throw new Error('Required accounts not found for payment journal');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();

  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: payment.paymentDate,
    journalType: 'payment',
    sourceType: 'payment',
    sourceId: payment.id,
    narration: `Payment received from ${payment.studentName} via ${payment.paymentMode} - ₹${payment.amount}`,
    totalDebit: payment.amount,
    totalCredit: payment.amount,
    courseId: payment.courseId,
    courseName: payment.courseName,
    studentId: payment.studentId,
    studentName: payment.studentName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: cashBankAccount.id,
      accountCode: cashBankAccount.accountCode,
      accountName: cashBankAccount.accountName,
      debitAmount: payment.amount,
      creditAmount: 0,
      courseId: payment.courseId,
      courseName: payment.courseName,
      studentId: payment.studentId,
      studentName: payment.studentName,
      narration: `Cash/Bank receipt - ${payment.paymentMode}`,
    },
    {
      accountId: studentReceivable.id,
      accountCode: studentReceivable.accountCode,
      accountName: studentReceivable.accountName,
      debitAmount: 0,
      creditAmount: payment.amount,
      courseId: payment.courseId,
      courseName: payment.courseName,
      studentId: payment.studentId,
      studentName: payment.studentName,
      narration: `Reduce student receivable`,
    },
  ];

  return { entry, lines };
}

export function createExpenseJournal(
  expense: Expense,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const expenseAccount = accounts.find(a => a.accountType === 'expense' && a.accountGroup === expense.category.toLowerCase().replace(/\s+/g, '_') as any)
    || accounts.find(a => a.accountCode === '5900'); // Other Expenses fallback

  let paymentAccount: Account | undefined;
  if (expense.paymentMode === 'cash') {
    paymentAccount = accounts.find(a => a.accountCode === '1100');
  } else {
    paymentAccount = accounts.find(a => a.accountCode === '2100'); // Accounts Payable if not paid
  }

  if (!expenseAccount || !paymentAccount) {
    throw new Error('Required accounts not found for expense journal');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();
  const amount = expense.totalAmount || expense.amount;

  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: expense.expenseDate,
    journalType: 'expense',
    sourceType: 'expense',
    sourceId: expense.id,
    narration: `Expense: ${expense.title} - ₹${amount}`,
    totalDebit: amount,
    totalCredit: amount,
    courseId: expense.courseId,
    courseName: expense.courseName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: expenseAccount.id,
      accountCode: expenseAccount.accountCode,
      accountName: expenseAccount.accountName,
      debitAmount: amount,
      creditAmount: 0,
      courseId: expense.courseId,
      courseName: expense.courseName,
      vendorId: expense.vendorId,
      vendorName: expense.vendorName,
      narration: `Expense recorded: ${expense.title}`,
    },
    {
      accountId: paymentAccount.id,
      accountCode: paymentAccount.accountCode,
      accountName: paymentAccount.accountName,
      debitAmount: 0,
      creditAmount: amount,
      vendorId: expense.vendorId,
      vendorName: expense.vendorName,
      narration: expense.status === 'paid' ? 'Cash/Bank payment' : 'Accounts Payable',
    },
  ];

  return { entry, lines };
}

export function createCreditNoteJournal(
  creditNote: CreditNote,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const courseRevenue = accounts.find(a => a.accountCode === '4000');
  const studentReceivable = accounts.find(a => a.accountCode === '1200');

  if (!courseRevenue || !studentReceivable) {
    throw new Error('Required accounts not found for credit note journal');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();

  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: creditNote.date,
    journalType: 'credit_note',
    sourceType: 'credit_note',
    sourceId: creditNote.id,
    narration: `Credit Note ${creditNote.creditNoteNumber} for ${creditNote.studentName} - ₹${creditNote.totalAmount}`,
    totalDebit: creditNote.totalAmount,
    totalCredit: creditNote.totalAmount,
    courseId: creditNote.courseId,
    courseName: creditNote.courseName,
    studentId: creditNote.studentId,
    studentName: creditNote.studentName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: courseRevenue.id,
      accountCode: courseRevenue.accountCode,
      accountName: courseRevenue.accountName,
      debitAmount: creditNote.totalAmount,
      creditAmount: 0,
      courseId: creditNote.courseId,
      courseName: creditNote.courseName,
      studentId: creditNote.studentId,
      studentName: creditNote.studentName,
      narration: 'Revenue reduction via credit note',
    },
    {
      accountId: studentReceivable.id,
      accountCode: studentReceivable.accountCode,
      accountName: studentReceivable.accountName,
      debitAmount: 0,
      creditAmount: creditNote.totalAmount,
      courseId: creditNote.courseId,
      courseName: creditNote.courseName,
      studentId: creditNote.studentId,
      studentName: creditNote.studentName,
      narration: 'Reduce student receivable via credit note',
    },
  ];

  return { entry, lines };
}

export function createDebitNoteJournal(
  debitNote: DebitNote,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const studentReceivable = accounts.find(a => a.accountCode === '1200');
  const courseRevenue = accounts.find(a => a.accountCode === '4000');

  if (!studentReceivable || !courseRevenue) {
    throw new Error('Required accounts not found for debit note journal');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();

  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: debitNote.date,
    journalType: 'debit_note',
    sourceType: 'debit_note',
    sourceId: debitNote.id,
    narration: `Debit Note ${debitNote.debitNoteNumber} for ${debitNote.studentName} - ₹${debitNote.totalAmount}`,
    totalDebit: debitNote.totalAmount,
    totalCredit: debitNote.totalAmount,
    courseId: debitNote.courseId,
    courseName: debitNote.courseName,
    studentId: debitNote.studentId,
    studentName: debitNote.studentName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: studentReceivable.id,
      accountCode: studentReceivable.accountCode,
      accountName: studentReceivable.accountName,
      debitAmount: debitNote.totalAmount,
      creditAmount: 0,
      courseId: debitNote.courseId,
      courseName: debitNote.courseName,
      studentId: debitNote.studentId,
      studentName: debitNote.studentName,
      narration: 'Increase student receivable via debit note',
    },
    {
      accountId: courseRevenue.id,
      accountCode: courseRevenue.accountCode,
      accountName: courseRevenue.accountName,
      debitAmount: 0,
      creditAmount: debitNote.totalAmount,
      courseId: debitNote.courseId,
      courseName: debitNote.courseName,
      studentId: debitNote.studentId,
      studentName: debitNote.studentName,
      narration: 'Additional revenue via debit note',
    },
  ];

  return { entry, lines };
}

export function createReferralRewardJournal(
  referral: Referral,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string,
  isPayment: boolean
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const referralExpense = accounts.find(a => a.accountCode === '5300');
  const referralPayable = accounts.find(a => a.accountCode === '2500');
  const cashAccount = accounts.find(a => a.accountCode === '1100');

  if (!referralExpense || !referralPayable) {
    throw new Error('Required accounts not found for referral reward journal');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();

  if (isPayment) {
    // Payment: Dr Referral Payable, Cr Cash
    const entry: Omit<JournalEntry, 'id'> = {
      journalNumber,
      journalDate: now,
      journalType: 'referral',
      sourceType: 'referral_payment',
      sourceId: referral.id,
      narration: `Referral reward paid to ${referral.referrerName} - ₹${referral.rewardAmount}`,
      totalDebit: referral.rewardAmount,
      totalCredit: referral.rewardAmount,
      courseId: referral.courseId,
      courseName: referral.courseName,
      status: 'posted',
      reversalStatus: 'none',
      financialPeriodId,
      createdBy,
      postedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
      {
        accountId: referralPayable.id,
        accountCode: referralPayable.accountCode,
        accountName: referralPayable.accountName,
        debitAmount: referral.rewardAmount,
        creditAmount: 0,
        courseId: referral.courseId,
        courseName: referral.courseName,
        referralId: referral.id,
        narration: 'Reduce referral reward payable',
      },
      {
        accountId: (cashAccount || referralPayable).id,
        accountCode: (cashAccount || referralPayable).accountCode,
        accountName: (cashAccount || referralPayable).accountName,
        debitAmount: 0,
        creditAmount: referral.rewardAmount,
        courseId: referral.courseId,
        courseName: referral.courseName,
        referralId: referral.id,
        narration: 'Cash payment for referral reward',
      },
    ];

    return { entry, lines };
  }

  // Approval: Dr Referral Expense, Cr Referral Payable
  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: now,
    journalType: 'referral',
    sourceType: 'referral_approval',
    sourceId: referral.id,
    narration: `Referral reward approved for ${referral.referrerName} - ₹${referral.rewardAmount}`,
    totalDebit: referral.rewardAmount,
    totalCredit: referral.rewardAmount,
    courseId: referral.courseId,
    courseName: referral.courseName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: referralExpense.id,
      accountCode: referralExpense.accountCode,
      accountName: referralExpense.accountName,
      debitAmount: referral.rewardAmount,
      creditAmount: 0,
      courseId: referral.courseId,
      courseName: referral.courseName,
      referralId: referral.id,
      narration: 'Referral reward expense recognized',
    },
    {
      accountId: referralPayable.id,
      accountCode: referralPayable.accountCode,
      accountName: referralPayable.accountName,
      debitAmount: 0,
      creditAmount: referral.rewardAmount,
      courseId: referral.courseId,
      courseName: referral.courseName,
      referralId: referral.id,
      narration: 'Referral reward payable created',
    },
  ];

  return { entry, lines };
}

export function createIncentiveJournal(
  incentive: Incentive,
  accounts: Account[],
  financialPeriodId: string,
  createdBy: string,
  isPayment: boolean
): { entry: Omit<JournalEntry, 'id'>; lines: Omit<JournalLine, 'id' | 'journalId'>[] } {
  const incentiveExpense = accounts.find(a => a.accountCode === '5200');
  const incentivePayable = accounts.find(a => a.accountCode === '2400');
  const cashAccount = accounts.find(a => a.accountCode === '1100');

  if (!incentiveExpense || !incentivePayable) {
    throw new Error('Required accounts not found for incentive journal');
  }

  const journalNumber = generateJournalNumber();
  const now = new Date().toISOString();

  if (isPayment) {
    const entry: Omit<JournalEntry, 'id'> = {
      journalNumber,
      journalDate: incentive.paymentDate || now,
      journalType: 'incentive',
      sourceType: 'incentive_payment',
      sourceId: incentive.id,
      narration: `Incentive paid to ${incentive.userName} - ₹${incentive.amount}`,
      totalDebit: incentive.amount,
      totalCredit: incentive.amount,
      courseId: incentive.courseId,
      courseName: incentive.courseName,
      status: 'posted',
      reversalStatus: 'none',
      financialPeriodId,
      createdBy,
      postedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
      {
        accountId: incentivePayable.id,
        accountCode: incentivePayable.accountCode,
        accountName: incentivePayable.accountName,
        debitAmount: incentive.amount,
        creditAmount: 0,
        courseId: incentive.courseId,
        courseName: incentive.courseName,
        narration: 'Reduce incentive payable',
      },
      {
        accountId: (cashAccount || incentivePayable).id,
        accountCode: (cashAccount || incentivePayable).accountCode,
        accountName: (cashAccount || incentivePayable).accountName,
        debitAmount: 0,
        creditAmount: incentive.amount,
        courseId: incentive.courseId,
        courseName: incentive.courseName,
        narration: 'Cash payment for incentive',
      },
    ];

    return { entry, lines };
  }

  // Approval
  const entry: Omit<JournalEntry, 'id'> = {
    journalNumber,
    journalDate: now,
    journalType: 'incentive',
    sourceType: 'incentive_approval',
    sourceId: incentive.id,
    narration: `Incentive approved for ${incentive.userName} - ₹${incentive.amount}`,
    totalDebit: incentive.amount,
    totalCredit: incentive.amount,
    courseId: incentive.courseId,
    courseName: incentive.courseName,
    status: 'posted',
    reversalStatus: 'none',
    financialPeriodId,
    createdBy,
    postedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  const lines: Omit<JournalLine, 'id' | 'journalId'>[] = [
    {
      accountId: incentiveExpense.id,
      accountCode: incentiveExpense.accountCode,
      accountName: incentiveExpense.accountName,
      debitAmount: incentive.amount,
      creditAmount: 0,
      courseId: incentive.courseId,
      courseName: incentive.courseName,
      narration: 'Incentive expense recognized',
    },
    {
      accountId: incentivePayable.id,
      accountCode: incentivePayable.accountCode,
      accountName: incentivePayable.accountName,
      debitAmount: 0,
      creditAmount: incentive.amount,
      courseId: incentive.courseId,
      courseName: incentive.courseName,
      narration: 'Incentive payable created',
    },
  ];

  return { entry, lines };
}

// ============================================================
// REPORT CALCULATORS
// ============================================================

export function calculateTrialBalance(
  journalEntries: JournalEntry[],
  journalLines: JournalLine[],
  accounts: Account[],
  startDate: string,
  endDate: string
): { rows: any[]; totalDebit: number; totalCredit: number; difference: number } {
  const periodEntries = journalEntries.filter(
    e => e.journalDate >= startDate && e.journalDate <= endDate && e.status === 'posted'
  );

  const entryIds = new Set(periodEntries.map(e => e.id));

  const accountBalances = new Map<string, { openingDebit: number; openingCredit: number; periodDebit: number; periodCredit: number }>();

  accounts.forEach(a => {
    accountBalances.set(a.id, {
      openingDebit: a.normalBalance === 'debit' ? a.openingBalance : 0,
      openingCredit: a.normalBalance === 'credit' ? a.openingBalance : 0,
      periodDebit: 0,
      periodCredit: 0,
    });
  });

  const periodLines = journalLines.filter(l => entryIds.has(l.journalId));
  periodLines.forEach(line => {
    const bal = accountBalances.get(line.accountId);
    if (bal) {
      bal.periodDebit += line.debitAmount;
      bal.periodCredit += line.creditAmount;
    }
  });

  const rows = accounts
    .filter(a => a.isActive)
    .map(a => {
      const bal = accountBalances.get(a.id) || { openingDebit: 0, openingCredit: 0, periodDebit: 0, periodCredit: 0 };
      const closingDebit = bal.openingDebit + bal.periodDebit;
      const closingCredit = bal.openingCredit + bal.periodCredit;
      return {
        accountId: a.id,
        accountCode: a.accountCode,
        accountName: a.accountName,
        accountType: a.accountType,
        accountGroup: a.accountGroup,
        openingDebit: bal.openingDebit,
        openingCredit: bal.openingCredit,
        periodDebit: bal.periodDebit,
        periodCredit: bal.periodCredit,
        closingDebit,
        closingCredit,
        difference: closingDebit - closingCredit,
      };
    })
    .filter(r => r.closingDebit !== 0 || r.closingCredit !== 0);

  const totalDebit = rows.reduce((sum, r) => sum + r.closingDebit, 0);
  const totalCredit = rows.reduce((sum, r) => sum + r.closingCredit, 0);

  return { rows, totalDebit, totalCredit, difference: totalDebit - totalCredit };
}

export function calculateProfitAndLoss(
  journalEntries: JournalEntry[],
  journalLines: JournalLine[],
  accounts: Account[],
  startDate: string,
  endDate: string
): { revenue: any[]; directCosts: any[]; operatingExpenses: any[]; grossProfit: number; operatingProfit: number; netProfit: number } {
  const periodEntries = journalEntries.filter(
    e => e.journalDate >= startDate && e.journalDate <= endDate && e.status === 'posted'
  );
  const entryIds = new Set(periodEntries.map(e => e.id));
  const periodLines = journalLines.filter(l => entryIds.has(l.journalId));

  const accountTotals = new Map<string, number>();
  periodLines.forEach(line => {
    const existing = accountTotals.get(line.accountId) || 0;
    // For income: credit - debit (positive = income)
    // For expense: debit - credit (positive = expense)
    const account = accounts.find(a => a.id === line.accountId);
    if (account) {
      if (account.accountType === 'income') {
        accountTotals.set(line.accountId, existing + line.creditAmount - line.debitAmount);
      } else if (account.accountType === 'expense') {
        accountTotals.set(line.accountId, existing + line.debitAmount - line.creditAmount);
      }
    }
  });

  const revenue = accounts
    .filter(a => a.accountType === 'income' && a.isActive)
    .map(a => ({ category: a.accountName, amount: accountTotals.get(a.id) || 0 }))
    .filter(r => r.amount > 0);

  const directCosts = accounts
    .filter(a => a.accountType === 'expense' && a.isActive &&
      ['5100', '5110'].includes(a.accountCode))
    .map(a => ({ category: a.accountName, amount: accountTotals.get(a.id) || 0 }))
    .filter(r => r.amount > 0);

  const operatingExpenses = accounts
    .filter(a => a.accountType === 'expense' && a.isActive &&
      !['5100', '5110'].includes(a.accountCode))
    .map(a => ({ category: a.accountName, amount: accountTotals.get(a.id) || 0 }))
    .filter(r => r.amount > 0);

  const totalRevenue = revenue.reduce((sum, r) => sum + r.amount, 0);
  const totalDirectCosts = directCosts.reduce((sum, r) => sum + r.amount, 0);
  const totalOperatingExpenses = operatingExpenses.reduce((sum, r) => sum + r.amount, 0);

  const grossProfit = totalRevenue - totalDirectCosts;
  const operatingProfit = grossProfit - totalOperatingExpenses;
  const netProfit = operatingProfit;

  return { revenue, directCosts, operatingExpenses, grossProfit, operatingProfit, netProfit };
}
