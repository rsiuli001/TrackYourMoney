import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { CalendarState } from '../types/calendar';
import { calculateDays, TransactionViewType } from '../utils/calendar';

const onNextMonth: CaseReducer<CalendarState> = state => {
  if (state.selectedMonth === 11) {
    state.selectedMonth = 0;
    state.selectedYear += 1;
  } else {
    state.selectedMonth += 1;
  }
  const key: string = `${state.selectedMonth}-${state.selectedYear}`;

  if (!(key in state.calendar)) {
    state.calendar[key] = calculateDays(state.selectedMonth, state.selectedYear);
  }
};

const onPrevMonth: CaseReducer<CalendarState> = state => {
  if (state.selectedMonth === 0) {
    state.selectedMonth = 11;
    state.selectedYear -= 1;
  } else {
    state.selectedMonth -= 1;
  }

  const key: string = `${state.selectedMonth}-${state.selectedYear}`;
  if (!(key in state.calendar)) {
    state.calendar[key] = calculateDays(state.selectedMonth, state.selectedYear);
  }
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

export { onNextMonth, onPrevMonth, onDaySelect, onUpdateViewType };
