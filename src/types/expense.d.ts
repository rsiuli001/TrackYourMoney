import { TransactionType } from '../utils/transaction';

export interface Expense {
  type: TransactionType;
  date: Date;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
}
