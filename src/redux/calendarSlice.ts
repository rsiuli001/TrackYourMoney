import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { CalendarState } from '../types/calendar';
import { TransactionViewType } from '../utils/calendar';
import {
  onDaySelect,
  onMonthChange,
  onNextMonth,
  onPrevMonth,
  onUpdateViewType,
  onAddAccount,
  onAddCategory
} from './calendarActions';

const today = moment();

const initialState: CalendarState = {
  today,
  selectedDay: today.day(),
  selectedMonth: today.month(), // month index
  selectedYear: today.year(),
  selectedViewType: TransactionViewType.Daily,
  accounts: [],
  category: []
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextMonth: onNextMonth,
    prevMonth: onPrevMonth,
    selectDay: onDaySelect,
    updateViewType: onUpdateViewType,
    monthChange: onMonthChange,
    addAccount: onAddAccount,
    addCategory: onAddCategory
  }
});

export const {
  addAccount,
  addCategory,
  nextMonth,
  prevMonth,
  selectDay,
  updateViewType,
  monthChange
} = calendarSlice.actions;

export default calendarSlice.reducer;
