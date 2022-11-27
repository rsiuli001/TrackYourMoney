import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../types/expense';

const initialState: Expense[] = [];

const addExpense: CaseReducer<Expense[], PayloadAction<Expense>> = (state, action) => {
  state.push(action.payload);
};

const updateExpense: CaseReducer<Expense[], PayloadAction<Expense>> = (state, action) => {
  // state.push(action.payload);
};

const deleteExpense: CaseReducer<Expense[], PayloadAction<Expense>> = (state, action) => {
  // state.push(action.payload);
};

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addExpense,
    updateExpense,
    deleteExpense
  }
});

export { addExpense, deleteExpense, updateExpense };

export default expenseSlice.reducer;
