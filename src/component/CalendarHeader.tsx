import React, { FC, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonWrapper from './ButtonWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLOR from '../../assets/color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MONTHS } from '../data/calender';
import { nextMonth, prevMonth } from '../redux/calendarSlice';
import { getLocalStorageKey, TransactionViewType } from '../utils/calendar';
import { fetchLocalData } from '@/redux/transactionActions';
import { TransactionType } from '@/utils/transaction';
import { addIncomeByMonth } from '@/redux/incomeSlice';
import { addExpenseByMonth } from '@/redux/expenseSlice';
import { MonthData, YearData } from '@/types/transaction';

export interface CalendarHeaderProps {}

const CalendarHeader: FC<CalendarHeaderProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedMonth, selectedYear, selectedViewType } = useSelector(
    (state: RootState) => state.calendar
  );

  const updateTransaction = (month: string, year: string) => {
    const incomeData: YearData = fetchLocalData(
      getLocalStorageKey(TransactionType.Income, year, month)
    );
    const expenseData: YearData = fetchLocalData(
      getLocalStorageKey(TransactionType.Expense, year, month)
    );

    !!incomeData &&
      dispatch(
        addIncomeByMonth({
          month,
          year,
          data: incomeData[month]
        })
      );

    !!expenseData &&
      dispatch(
        addExpenseByMonth({
          year,
          month,
          data: expenseData[month]
        })
      );
  };

  const onPressNext = useCallback(() => {
    dispatch(nextMonth());
    if (selectedMonth === 11) {
      updateTransaction((selectedMonth - 11).toString(), (selectedYear + 1).toString());
    } else {
      updateTransaction((selectedMonth + 1).toString(), selectedYear.toString());
    }
  }, [selectedMonth, selectedYear]);

  const onPressPrev = useCallback(() => {
    dispatch(prevMonth());
    if (selectedMonth === 0) {
      updateTransaction((selectedMonth + 11).toString(), (selectedYear - 1).toString());
    } else {
      updateTransaction((selectedMonth - 1).toString(), selectedYear.toString());
    }
  }, [selectedMonth, selectedYear]);

  const label = useMemo(() => {
    switch (selectedViewType) {
      case TransactionViewType.Monthly:
        return `${selectedYear}`;
      default:
        return `${MONTHS[selectedMonth]} ${selectedYear}`;
    }
  }, [selectedViewType, selectedMonth, selectedYear]);

  return (
    <View style={styles.headerContainer}>
      <ButtonWrapper onPress={onPressPrev}>
        <Ionicons name={'chevron-back-outline'} color={COLOR.white} size={24} />
      </ButtonWrapper>
      <Text style={styles.text}>{label}</Text>
      <ButtonWrapper onPress={onPressNext}>
        <Ionicons name={'chevron-forward-outline'} color={COLOR.white} size={24} />
      </ButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    color: COLOR.white
  }
});

export default CalendarHeader;
