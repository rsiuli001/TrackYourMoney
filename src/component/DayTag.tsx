import COLOR from '@assets/color';
import React, { FC, memo } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface DayTagProps {
  date: string;
  day: string;
}

const DayTag: FC<DayTagProps> = memo(({ date, day }): JSX.Element => {
  const backgroundColor = useMemo(
    () =>
      day.toLowerCase() === 'sun'
        ? COLOR.red
        : day.toLowerCase() === 'sat'
        ? COLOR.blue
        : COLOR.grey,
    [day]
  );
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={[styles.dayText, { backgroundColor }]}>{day}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateText: {
    color: COLOR.white,
    fontWeight: '800',
    fontSize: 20,
    marginLeft: 15
  },
  dayText: {
    color: COLOR.white,
    fontSize: 10,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    marginLeft: 2,
    textAlign: 'center'
  }
});

export default DayTag;
