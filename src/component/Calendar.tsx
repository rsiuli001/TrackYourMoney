import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { RootState } from '../redux/store';
import CalendarHeader from './CalendarHeader';
import CalendarViewType from './CalendarViewType';
import { useSelector } from 'react-redux';
import CalendarView from './CalendarView';

export interface CalendarProps {}

const Calendar: FC<CalendarProps> = (): JSX.Element => {
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

  const renderTransactionView = (): ReactNode => {
    switch (selectedViewType) {
      case 0:
        return null;
      case 1:
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

export default Calendar;
