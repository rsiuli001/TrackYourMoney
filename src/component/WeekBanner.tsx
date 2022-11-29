import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';
import { WEEK_DAYS } from '../data/calender';

export interface WeekBannerProps {}

const WeekBanner: FC<WeekBannerProps> = (): JSX.Element => {
  return (
    <View style={styles.container}>
      {WEEK_DAYS.map((days, index) => {
        const color = days === 'Sun' ? COLOR.red : days === 'Sat' ? COLOR.blue : COLOR.grey;
        return (
          <Text key={index} style={[{ color }, styles.text]}>
            {days}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 5,
    paddingBottom: 5,
    // borderWidth: 1.5
  },
  text: {
    fontSize: 10
  }
});

export default WeekBanner;
