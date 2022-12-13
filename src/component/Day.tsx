import COLOR from '@assets/color';
import moment, { Moment } from 'moment';
import React, { FC, useMemo } from 'react';
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import { DateData } from 'react-native-calendars';
import { DayProps } from 'react-native-calendars/src/calendar/day';

const width: number = Dimensions.get('screen').width / 7;

const Day: FC<
  DayProps & {
    date?: DateData | undefined;
  }
> = ({ date, state, ...props }) => {
  const momentRef: Moment = moment(date?.dateString, 'YYYY-MM-DD');
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
    marginBottom: 0
  },
  day: {
    fontSize: 10
  }
});

export default Day;
