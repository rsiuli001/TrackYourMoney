import { getDayMonthYear, getLocalStorageKey } from '@/utils/calendar';
import { doesExist, getMMKVData, removeMMKVData, storeMMKVData } from '@/utils/storage';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  AddMonthTransactionDataPayload,
  AddTransactionPayload,
  TransactionState,
  UpdateTransactionPayload,
  YearData
} from '../types/transaction';

const addMonthTransactionData: CaseReducer<
  TransactionState,
  PayloadAction<AddMonthTransactionDataPayload>
> = (state, action) => {
  const { data, month, year } = action.payload;
  if (year in state) {
    state[year][month] = data;
  } else {
    state[year] = {
      [month]: data
    };
  }
  return state;
};

const onAddTransaction: CaseReducer<TransactionState, PayloadAction<AddTransactionPayload>> = (
  state,
  action
) => {
  const { key, value } = action.payload;
  const { date, month, year } = getDayMonthYear(value.date);

  if (year in state) {
    if (month in state[year]) {
      if (date in state[year][month]) {
        state[year][month][date].push(value);
      } else {
        state[year][month][date] = [value];
      }
    } else {
      state[year][month] = {
        [date]: [value]
      };
    }
  } else {
    state = {
      ...state,
      [year]: {
        [month]: {
          [date]: [value]
        }
      }
    };
  }

  storeTransactionData(getLocalStorageKey(value.type, year, month), state[year]);
  return state;
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
  return null;
};

const storeTransactionData = (key: string, state: YearData) => {
  const exisitingData = doesExist(key);
  if (exisitingData) {
    removeMMKVData(key).then(() => {
      storeMMKVData(key, state);
    });
  }
  storeMMKVData(key, state);
};

export {
  addMonthTransactionData,
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  fetchLocalData,
  storeTransactionData
};
