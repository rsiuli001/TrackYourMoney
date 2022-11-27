import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarState } from '../types/calendar';

const today = new Date();

const initialState: CalendarState = {
  today,
  selectedDay: today.getDay(),
  selectedMonth: today.getMonth(),
  selectedViewType: 0
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    nextMonth: state => {
      if (state.selectedMonth === 11) {
        state.selectedMonth = 0;
      } else {
        state.selectedMonth += 1;
      }
    },
    prevMonth: state => {
      if (state.selectedMonth === 0) {
        state.selectedMonth = 11;
      } else {
        state.selectedMonth -= 1;
      }
    },
    selectDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    updateViewType: (state, action: PayloadAction<number>) => {
      state.selectedViewType = action.payload;
    }
  }
});

export const { nextMonth, prevMonth, selectDay, updateViewType } = calendarSlice.actions;

export default calendarSlice.reducer;
