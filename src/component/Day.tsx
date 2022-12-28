import { Transaction } from '@/types/transaction';
import { sumIncomeExpenseData, toNumberString } from '@/utils/transaction';
import COLOR from '@assets/color';
import moment, { Moment } from 'moment';
import React, { FC, useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';

const width: number = Dimensions.get('screen').width / 7;

export type CalendarDayProps = DayProps & {
  date?: DateData | undefined;
  income?: number;
  expense?: number;
  data?: Transaction[];
};

const Day: FC<CalendarDayProps> = ({ data, date, state, ...props }) => {
  const momentRef: Moment = moment(date?.dateString, 'YYYY-MM-DD');
  const { totalDailyIncome, totalDailyExpense } = sumIncomeExpenseData(data || []);

  const onPress = () => {
    props.onPress && props.onPress(date);
  };

  const isToday: boolean = useMemo(() => momentRef.isSame(moment(), 'day'), [date?.dateString]);
  const color = useMemo(
    () =>
      state && state === 'disabled'
        ? COLOR.grey
        : momentRef.day() === 0
        ? COLOR.red
        : momentRef.day() === 6
        ? COLOR.blue
        : isToday
        ? COLOR.black
        : COLOR.white,
    [state, isToday, momentRef]
  );

  const backgroundColor = useMemo(
    () => (momentRef.isSame(moment(), 'day') ? COLOR.white : COLOR.black),
    [isToday]
  );

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={[styles.day, { color, backgroundColor }]}>{date?.day}</Text>
      {(!!totalDailyIncome || !!totalDailyExpense) && (
        <View>
          {!!totalDailyIncome && (
            <Text style={[styles.numberStyle, styles.income]}>
              {toNumberString(totalDailyIncome, false)}
            </Text>
          )}
          {!!totalDailyExpense && (
            <Text style={[styles.numberStyle, styles.expense]}>
              {toNumberString(totalDailyExpense, false)}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width + 15,
    borderWidth: 0.5,
    borderColor: COLOR.underLineGrey,
    paddingBottom: 0,
    marginBottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  day: {
    fontSize: 10,
    padding: 1
  },
  numberStyle: {
    fontSize: 9,
    textAlign: 'right',
    fontWeight: '400',
    padding: 1
  },
  expense: {
    color: COLOR.red,
  },
  income: {
    color: COLOR.blue
  }
});

export default Day;
