import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionViewType } from '../utils/calendar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionStackParams } from '../navigation/transactionStack';
import {
  CalendarViewType,
  CalendarHeaderArrows,
  Daily,
  Day,
  FloatingButton,
  Monthly,
  Summary,
  TransactionSummary
} from '@/component';
import { Calendar, DateData } from 'react-native-calendars';
import COLOR from '@assets/color';
import { monthChange } from '@/redux/calendarSlice';
import { selectIncomeExpenseData } from '@/redux/selectors';
import { MonthData } from '@/types/transaction';
import { combineIncomeExpenseData } from '@/utils/transaction';

export interface TransactionsContainerProps
  extends NativeStackScreenProps<TransactionStackParams, 'TransactionScreen'> {}

const TransactionsContainer: FC<TransactionsContainerProps> = ({ navigation }): JSX.Element => {
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);
  const { income, expense, dateObj } = useSelector(selectIncomeExpenseData);
  const data: MonthData = useMemo(
    () => combineIncomeExpenseData(income ?? {}, expense ?? {}, dateObj),
    [income, expense, dateObj]
  );
  const dispatch = useDispatch();
  const renderTransactionView = (): ReactNode => {
    switch (selectedViewType) {
      case TransactionViewType.Daily:
        return <Daily />;
      case TransactionViewType.Monthly:
        return <Monthly />;
      case TransactionViewType.Summary:
        return <Summary />;
      default:
        return null;
    }
  };

  const onPress = useCallback(() => {
    navigation.push('AddTransaction');
  }, []);

  const renderHeader = (): ReactNode => (
    <View style={styles.headerContainer}>
      <CalendarViewType />
      <TransactionSummary />
    </View>
  );

  const onMonthChange = (date: DateData): void => {
    dispatch(monthChange(date));
  };

  return (
    <View style={styles.container}>
      <Calendar
        theme={{
          backgroundColor: COLOR.black,
          calendarBackground: COLOR.black,
          selectedDayBackgroundColor: COLOR.blue,
          selectedDayTextColor: COLOR.white,
          todayTextColor: COLOR.blue,
          dayTextColor: COLOR.white,
          textDisabledColor: COLOR.grey,
          arrowColor: COLOR.white,
          disabledArrowColor: COLOR.grey,
          monthTextColor: COLOR.white,
          stylesheet: {
            calendar: {
              header: {
                dayTextAtIndex0: {
                  color: COLOR.red
                },
                dayTextAtIndex6: {
                  color: COLOR.blue
                }
              }
            }
          }
        }}
        disableCalendar={selectedViewType !== TransactionViewType.Calendar}
        headerChildren={renderHeader()}
        dayComponent={props => {
          const key = `${props.date?.day}-${props.date?.month}-${props.date?.year}`
          return <Day {...props} data={data[key]} />;
        }}
        renderArrow={props => <CalendarHeaderArrows direction={props} />}
        onMonthChange={onMonthChange}
      />
      {selectedViewType !== TransactionViewType.Calendar && renderTransactionView()}
      <FloatingButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginTop: 5
  }
});

export default TransactionsContainer;
