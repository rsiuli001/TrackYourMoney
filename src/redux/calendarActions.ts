import { doesExist, getMMKVData, removeMMKVData, storeMMKVData } from '@/utils/storage';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { DateData } from 'react-native-calendars';
import { CalendarState } from '../types/calendar';
import { TransactionViewType } from '../utils/calendar';

const onNextMonth: CaseReducer<CalendarState> = state => {
  if (state.selectedMonth === 11) {
    state.selectedMonth = 0;
    state.selectedYear += 1;
  } else {
    state.selectedMonth += 1;
  }
};

const onPrevMonth: CaseReducer<CalendarState> = state => {
  if (state.selectedMonth === 0) {
    state.selectedMonth = 11;
    state.selectedYear -= 1;
  } else {
    state.selectedMonth -= 1;
  }
};

const onMonthChange: CaseReducer<CalendarState, PayloadAction<DateData>> = (state, action) => {
  const { month, year } = action.payload;
  state.selectedMonth = month - 1;
  state.selectedYear = year;
};

const onDaySelect: CaseReducer<CalendarState, PayloadAction<number>> = (state, action) => {
  state.selectedDay = action.payload;
};

const onUpdateViewType: CaseReducer<CalendarState, PayloadAction<TransactionViewType>> = (
  state,
  action
) => {
  state.selectedViewType = action.payload;
};

const onAddAccount: CaseReducer<CalendarState, PayloadAction<string>> = (state, action) => {
  state.accounts.push(action.payload);
};

const onAddCategory: CaseReducer<CalendarState, PayloadAction<string>> = (state, action) => {
  state.category.push(action.payload);
};

const storeAccountCategoryData = (key: string, data: string[]) => {
  const exisitingData = doesExist(key);
  if (exisitingData) {
    removeMMKVData(key).then(() => {
      storeMMKVData(key, data);
    });
  } else {
    storeMMKVData(key, data);
  }
};

const fetchLocalData = (key: string) => {
  const data: string | undefined = getMMKVData(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export {
  onAddAccount,
  onAddCategory,
  onNextMonth,
  onPrevMonth,
  onDaySelect,
  onUpdateViewType,
  onMonthChange,
  fetchLocalData,
  storeAccountCategoryData
};
