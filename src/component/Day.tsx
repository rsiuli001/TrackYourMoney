import COLOR from '@assets/color';
import React, { FC, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DayProps } from 'react-native-calendars/src/calendar/day';

const Day: FC<DayProps> = ({ date, state, ...props }) => {
  //   console.log('debug: day: ', props);
  //   console.log('debug: date: ', date);
  //   console.log('debug: state: ', state);

  const color = useMemo(() => (state && state === 'disabled' ? COLOR.grey : COLOR.white), [state]);
  return (
    <View style={styles.container}>
      <Text style={[styles.day, { color }]}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderColor: COLOR.white,
    // borderWidth: 0.5,
    // width: '100%',
    // height: 30,
    // marginBottom: -10
  },
  day: {
    // flex: 1
  }
});

export default Day;
