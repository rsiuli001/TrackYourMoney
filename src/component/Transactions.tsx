import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootState } from '../redux/store';
import CalendarHeader from './CalendarHeader';
import CalendarViewType from './CalendarViewType';
import { useSelector } from 'react-redux';
import CalendarView from './CalendarView';
import { TransactionViewType } from '../utils/calendar';
import FloatingButton from './FloatingButton';
import Daily from './Daily';
import Monthly from './Monthly';
import Summary from './Summary';

export interface TransactionsContainerProps {}

const TransactionsContainer: FC<TransactionsContainerProps> = (): JSX.Element => {
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

  const renderTransactionView = (): ReactNode => {
    switch (selectedViewType) {
      case TransactionViewType.Daily:
        return <Daily />;
      case TransactionViewType.Calendar:
        return <CalendarView />;
      case TransactionViewType.Monthly:
        return <Monthly />;
      case TransactionViewType.Summary:
        return <Summary />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <CalendarHeader />
      <CalendarViewType />
      {renderTransactionView()}
      <FloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TransactionsContainer;
