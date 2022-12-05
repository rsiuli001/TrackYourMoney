import { createSlice } from '@reduxjs/toolkit';
import { TransactionState } from '../types/transaction';
import {
  fetchLocalData,
  onAddTransaction,
  onDeleteTransaction,
  onUpdateTransaction
} from './transactionActions';

const initalDataFromLocal = fetchLocalData('income');
const initialState: TransactionState = initalDataFromLocal ? initalDataFromLocal : {};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncome: onAddTransaction,
    updateIncome: onDeleteTransaction,
    deleteIncome: onUpdateTransaction
  }
});

export const { addIncome, deleteIncome, updateIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
