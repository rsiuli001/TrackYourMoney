import { createSlice } from '@reduxjs/toolkit';
import { Expense } from '../types/expense';
import { onAddExpense, onDeleteExpense, onUpdateExpense } from './expenseActions';

const initialState: Expense[] = [];

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense: onAddExpense,
    updateExpense: onUpdateExpense,
    deleteExpense: onDeleteExpense
  }
});

export const { addExpense, deleteExpense, updateExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
