import { Moment } from 'moment';

export interface CalenderViewType {
  label: string;
  key: number;
}

export interface CalendarState {
  today: Moment;
  selectedMonth: number;
  selectedDay: number;
  selectedYear: number;
  selectedViewType: number;
  calendar: {
    [key: string]: (CalendarDays | null)[][];
  };
}

export interface CalendarDays {
  date: Moment;
  month: number;
  year: number;
  calendarDay: number;
}
