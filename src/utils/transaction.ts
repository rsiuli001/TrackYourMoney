import { MonthData, Transaction } from '@/types/transaction';

export enum TransactionType {
  Income = 'INCOME',
  Expense = 'EXPENSE',
  Transfer = 'TRANSFER'
}

export enum Months {
  JAN = 'JANUARY',
  FEB = 'FEBRUARY',
  MAR = 'MARCH',
  APR = 'APRIL',
  MAY = 'MAY',
  JUN = 'JUNE',
  JUL = 'JULY',
  AUG = 'AUGUST',
  SEP = 'SEPTEMBER',
  OCT = 'OCTOBER',
  NOV = 'NOVEMBER',
  DEC = 'DECEMBER'
}

const calculateTotalMonthlyTransaction = (data: MonthData): number => {
  let total = 0;
  Object.keys(data).forEach(month => {
    const dailyTransactions: Transaction[] = data[month];
    dailyTransactions.forEach(transaction => {
      total += transaction.amount;
    });
  });

  return total;
};

const calculateMonthlyExpense = (income: MonthData, expense: MonthData) => {
  const totalMonthlyIncome = calculateTotalMonthlyTransaction(income);
  const totalMonthlyExpense = calculateTotalMonthlyTransaction(expense);
  return {
    income: totalMonthlyIncome,
    expense: totalMonthlyExpense,
    total: totalMonthlyIncome - totalMonthlyExpense
  };
};

export { calculateTotalMonthlyTransaction, calculateMonthlyExpense };
