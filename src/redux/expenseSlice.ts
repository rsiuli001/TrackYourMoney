import { createSlice } from '@reduxjs/toolkit';
import { TransactionState } from '../types/transaction';
import {
  fetchLocalData,
  onAddTransaction,
  onDeleteTransaction,
  onUpdateTransaction
} from './transactionActions';

const initalDataFromLocal = fetchLocalData('expense');

const initialState: TransactionState = initalDataFromLocal ? initalDataFromLocal : {};

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
