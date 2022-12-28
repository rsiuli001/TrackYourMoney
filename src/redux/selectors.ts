import moment from 'moment';
import { RootState } from './store';

const selectIncomeExpenseData = (state: RootState) => {
  const { selectedMonth, selectedYear } = state.calendar;
  const { income, expenses } = state;
  return {
    income: income[selectedYear]?.[selectedMonth] ?? {},
    expense: expenses[selectedYear]?.[selectedMonth] ?? {},
    dateObj: moment(`${selectedMonth + 1}-${selectedYear}`, 'MM-YYYY')
  };
};

export { selectIncomeExpenseData };