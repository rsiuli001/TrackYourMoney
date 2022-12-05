import { getLocalStorageKey } from '@/utils/calendar';
import { TransactionType } from '@/utils/transaction';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { TransactionState } from '../types/transaction';
import {
  fetchLocalData,
  onAddTransaction,
  onDeleteTransaction,
  onUpdateTransaction
} from './transactionActions';

const date = moment();
const initalDataFromLocal = fetchLocalData(
  getLocalStorageKey(TransactionType.Expense, date.year().toString(), date.month().toString())
);

const initialState: TransactionState = initalDataFromLocal
  ? { [date.year()]: initalDataFromLocal }
  : {};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: onAddTransaction,
    updateExpense: onUpdateTransaction,
    deleteExpense: onDeleteTransaction
  }
});

export const { addExpense, deleteExpense, updateExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
