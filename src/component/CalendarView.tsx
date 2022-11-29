import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import CalendarDateBlock from './CalendarDateBlock';
import WeekBanner from './WeekBanner';
import TransactionSummary from './TransactionSummary';

export interface CalendarViewProps {}

const CalendarView: FC<CalendarViewProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedMonth, selectedYear, calendar } = useSelector(
    (state: RootState) => state.calendar
  );

  const key: string = useMemo(
    () => `${selectedMonth}-${selectedYear}`,
    [selectedMonth, selectedYear]
  );

  return (
    <View style={styles.container}>
      <TransactionSummary income={5000} expense={50000} />
      <WeekBanner />
      <View>
        {calendar[key].map(row => {
          return (
            <View key={`ROW_${uniqueId()}`} style={{ flexDirection: 'row' }}>
              {row.map((day, index) => {
                return (
                  <CalendarDateBlock
                    key={`COL_${index}_${uniqueId()}`}
                    date={day?.calendarDay}
                    index={index}
                    disabled={!day}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1
  }
});

export default CalendarView;
