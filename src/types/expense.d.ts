export interface Expense {
  type: 'income' | 'expense' | 'transfer';
  date: Date;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
}
