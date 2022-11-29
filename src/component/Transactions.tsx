import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { RootState } from '../redux/store';
import CalendarHeader from './CalendarHeader';
import CalendarViewType from './CalendarViewType';
import { useSelector } from 'react-redux';
import CalendarView from './CalendarView';
import { TransactionViewType } from '../utils/calendar';

export interface TransactionsContainerProps {}

const TransactionsContainer: FC<TransactionsContainerProps> = (): JSX.Element => {
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

  const renderTransactionView = (): ReactNode => {
    switch (selectedViewType) {
      case TransactionViewType.Daily:
        return null;
      case TransactionViewType.Calendar:
        return <CalendarView />;
      default:
        return null;
    }
  };

  return (
    <View>
      <CalendarHeader />
      <CalendarViewType />
      {renderTransactionView()}
    </View>
  );
};

export default TransactionsContainer;
