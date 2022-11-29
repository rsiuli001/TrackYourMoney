import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';
import { WEEK_DAYS } from '../data/calender';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import CalendarDateBlock from './CalendarDateBlock';
import WeekBanner from './WeekBanner';

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
