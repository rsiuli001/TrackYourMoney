export interface CalenderViewType {
  label: string;
  key: number;
}

export interface CalendarState {
  today: Date;
  selectedMonth: number;
  selectedDay: number;
  selectedViewType: number;
}
