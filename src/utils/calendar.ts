import moment from 'moment';
import { CalendarDays } from '../types/calendar';

export enum TransactionViewType {
  Calendar = 'CALENDAR',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Summary = 'SUMMARY',
  Weekly = 'WEEKLY'
}

const calculateDays = (month: number, year: number): (CalendarDays | null)[][] => {
  const date = moment(`${year}-${month + 1}`, 'YYYY-MM');
  const firstDayOfMonth = Number(date.startOf('month').format('d'));
  const endDayOfMonth = Number(date.endOf('month').format('d'));
  const totalNumberOfDays = date.daysInMonth();

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push(null);
  }

  let daysInMonth: CalendarDays[] = [];
  for (let i = 1; i <= totalNumberOfDays; i++) {
    daysInMonth.push({
      date: moment(`${year}-${month + 1}-${i}`, 'YYYY-MM-DD'),
      month: month - 1,
      year,
      calendarDay: i
    });
  }

  let endBlanks = [];
  for (let i = 0; i < 42 - (blanks.length + daysInMonth.length); i++) {
    endBlanks.push(null);
  }

  const totalSlots = [...blanks, ...daysInMonth, ...endBlanks];
  let rows: (CalendarDays | null)[][] = new Array();
  let cells: (CalendarDays | null)[] = [];

  totalSlots.forEach((el, index) => {
    if (index % 7 !== 0) {
      cells.push(el);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(el);
    }

    if (index === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  return rows;
};

export { calculateDays };
