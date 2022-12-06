import { MonthData, Transaction } from '@/types/transaction';
import { Moment } from 'moment';

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

const toNumberString = (n: number, isSign: boolean) =>
  (isSign ? '\u20B9 ' : '') +
  Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

const calculateTotalMonthlyTransaction = (data: MonthData): number => {
  let total = 0;
  Object.keys(data).forEach(month => {
    if (month in data) {
      let t = calculateTotalDailyTransaction(data[month]);
      total += Number(t);
    }
  });

  return total;
};

const calculateTotalDailyTransaction = (data: Transaction[]): number => {
  let total: number = 0;
  data.forEach(d => {
    total += Number(d?.amount);
  });
  return total;
};

const calculateMonthlyExpense = (income: MonthData, expense: MonthData) => {
  const totalMonthlyIncome = calculateTotalMonthlyTransaction(income);
  const totalMonthlyExpense = calculateTotalMonthlyTransaction(expense);
  return {
    income: Number(totalMonthlyIncome),
    expense: Number(totalMonthlyExpense),
    total: Number(totalMonthlyIncome) - Number(totalMonthlyExpense)
  };
};

const combineIncomeExpenseData = (
  income: MonthData,
  expense: MonthData,
  dateObj: Moment
): MonthData => {
  const data: MonthData = {};
  for (let i = dateObj.daysInMonth(); i > 0; i--) {
    const dayData: Transaction[] = [];
    if (i in expense) {
      dayData.push(...expense[i]);
    }
    if (i in income) {
      dayData.push(...income[i]);
    }

    if (dayData.length > 0) {
      const key = `${i}-${dateObj.month() + 1}-${dateObj.year()}`;
      data[key] = dayData;
    }
  }
  return data;
};

const sumIncomeExpenseData = (data: Transaction[]) => {
  let totalDailyIncome = 0;
  let totalDailyExpense = 0;

  data.forEach(d => {
    if (d.type === TransactionType.Income) {
      totalDailyIncome += Number(d.amount);
    } else if (d.type === TransactionType.Expense) {
      totalDailyExpense += Number(d.amount);
    }
  });

  return {
    totalDailyIncome,
    totalDailyExpense
  };
};

export {
  calculateTotalDailyTransaction,
  calculateTotalMonthlyTransaction,
  calculateMonthlyExpense,
  combineIncomeExpenseData,
  toNumberString,
  sumIncomeExpenseData
};
