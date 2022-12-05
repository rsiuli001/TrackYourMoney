import { doesExist, getMMKVData, removeMMKVData, storeMMKVData } from '@/utils/storage';
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
  storeTransactionData(value.type.toLowerCase(), state);
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

const fetchLocalData = (key: string) => {
  const data: string | undefined = getMMKVData(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

const storeTransactionData = (key: string, state: TransactionState) => {
  const exisitingData = doesExist(key);
  if (exisitingData) {
    removeMMKVData(key).then(() => {
      storeMMKVData(key, state);
    });
  }
  storeMMKVData(key, state);
};

export {
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  fetchLocalData,
  storeTransactionData
};
