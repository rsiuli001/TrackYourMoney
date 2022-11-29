import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { CalendarState } from '../types/calendar';
import { calculateDays, TransactionViewType } from '../utils/calendar';
import { onDaySelect, onNextMonth, onPrevMonth, onUpdateViewType } from './calendarActions';

const today = moment();

const initialState: CalendarState = {
  today,
  selectedDay: today.day(),
  selectedMonth: today.month(),
  selectedYear: today.year(),
  selectedViewType: TransactionViewType.Daily,
  calendar: {
    [`${today.month()}-${today.year()}`]: calculateDays(today.month(), today.year())
  }
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextMonth: onNextMonth,
    prevMonth: onPrevMonth,
    selectDay: onDaySelect,
    updateViewType: onUpdateViewType
  }
});

export const { nextMonth, prevMonth, selectDay, updateViewType } = calendarSlice.actions;

export default calendarSlice.reducer;
