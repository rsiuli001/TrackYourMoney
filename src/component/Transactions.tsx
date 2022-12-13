import React, { FC, ReactNode, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { TransactionViewType } from '../utils/calendar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionStackParams } from '../navigation/transactionStack';
import {
  CalendarViewType,
  Daily,
  Day,
  FloatingButton,
  Monthly,
  Summary,
  TransactionSummary
} from '@/component';
import { Calendar } from 'react-native-calendars';
import COLOR from '@assets/color';

export interface TransactionsContainerProps
  extends NativeStackScreenProps<TransactionStackParams, 'TransactionScreen'> {}

const TransactionsContainer: FC<TransactionsContainerProps> = ({ navigation }): JSX.Element => {
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

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
        dayComponent={props => <Day {...props} />}
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
