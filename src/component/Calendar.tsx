import React, { FC } from 'react';
import { View } from 'react-native';
import CalendarHeader from './CalendarHeader';
import CalendarViewType from './CalendarViewType';

export interface CalendarProps {}

const Calendar: FC<CalendarProps> = (): JSX.Element => {
  return (
    <View>
      <CalendarHeader />
      <CalendarViewType />
    </View>
  );
};

export default Calendar;
