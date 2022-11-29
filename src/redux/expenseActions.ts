import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../types/expense';

const onAddExpense: CaseReducer<Expense[], PayloadAction<Expense>> = (state, action) => {
  state.push(action.payload);
};

const onUpdateExpense: CaseReducer<Expense[], PayloadAction<Expense>> = (state, action) => {
  // state.push(action.payload);
};

const onDeleteExpense: CaseReducer<Expense[], PayloadAction<Expense>> = (state, action) => {
  // state.push(action.payload);
};

export { onAddExpense, onUpdateExpense, onDeleteExpense };
