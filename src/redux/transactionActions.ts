import { getDayMonthYear, getLocalStorageKey } from '@/utils/calendar';
import {
  clearMMKVStorage,
  doesExist,
  getMMKVData,
  removeMMKVData,
  storeMMKVData
} from '@/utils/storage';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import {
  AddTransactionPayload,
  TransactionState,
  UpdateTransactionPayload,
  YearData
} from '../types/transaction';

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
        state[year][month] = {
          [date]: [value]
        };
      }
    } else {
      state[year] = {
        [month]: {
          [date]: [value]
        }
      };
    }
  } else {
    state = {
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
  return {};
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
  onAddTransaction,
  onUpdateTransaction,
  onDeleteTransaction,
  fetchLocalData,
  storeTransactionData
};
