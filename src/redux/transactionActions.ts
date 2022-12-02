import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  AddTransactionPayload,
  TransactionState,
  UpdateTransactionPayload
} from '../types/transaction';

const onAddTransaction: CaseReducer<TransactionState, PayloadAction<AddTransactionPayload>> = (
  state,
  action
) => {
  const { key, value } = action.payload;
  if (key in state) {
    state[key].push(value);
  } else {
    state[key] = [value];
  }
};

const onUpdateTransaction: CaseReducer<
  TransactionState,
  PayloadAction<UpdateTransactionPayload>
> = (state, action) => {
  // state.push(action.payload);
};

const onDeleteTransaction: CaseReducer<
  TransactionState,
  PayloadAction<UpdateTransactionPayload>
> = (state, action) => {
  // state.push(action.payload);
};

export { onAddTransaction, onUpdateTransaction, onDeleteTransaction };
