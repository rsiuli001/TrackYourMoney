import { getLocalStorageKey } from '@/utils/calendar';
import { TransactionType } from '@/utils/transaction';
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { TransactionState } from '../types/transaction';
import {
  addMonthTransactionData,
  fetchLocalData,
  onAddTransaction,
  onDeleteTransaction,
  onUpdateTransaction
} from './transactionActions';

const date = moment();
const initalDataFromLocal = fetchLocalData(
  getLocalStorageKey(TransactionType.Income, date.year().toString(), date.month().toString())
);

const initialState: TransactionState = initalDataFromLocal
  ? { [date.year()]: initalDataFromLocal }
  : {};

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    addIncome: onAddTransaction,
    addIncomeByMonth: addMonthTransactionData,
    updateIncome: onDeleteTransaction,
    deleteIncome: onUpdateTransaction
  }
});

export const { addIncome, addIncomeByMonth, deleteIncome, updateIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
