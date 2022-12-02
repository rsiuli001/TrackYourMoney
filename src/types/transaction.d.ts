import { TransactionType } from '../utils/transaction';

export interface AddTransactionFormValues {
  date: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
}

export interface AddTransactionFormValues extends AddTransactionFormValues {
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

export interface Transaction {
  id: string; // moment().valueOf() you will get a full timestamp (in milliseconds)
  type: TransactionType;
  date: string;
  account: string;
  category: string;
  amount: number;
  note: string;
  description: string;
}

export interface TransactionState {
  [key: string]: Transaction[];
}

export interface AddTransactionPayload {
  key: string; // DD-MM-YYYY format
  value: Transaction;
}

export interface UpdateTransactionPayload {
  id: string;
  value: Transaction;
}
