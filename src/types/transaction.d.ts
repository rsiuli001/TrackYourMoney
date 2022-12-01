import { TransactionType } from '../utils/transaction';

export interface AddTransactionFormValues {
  date: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
}

export interface AddIncomeFormValues extends AddTransactionFormValues {
  type: TransactionType;
}

export interface AddExpenseFormValues {
  type: TransactionType;
}

export interface AddTransferFormValues {
  date: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  note: string;
  description: string;
}
