import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLOR from '../../assets/color';
import { Direction } from 'react-native-calendars/src/types';

export interface CalendarHeaderArrowsProps {
  direction: Direction;
}

const CalendarHeaderArrows: FC<CalendarHeaderArrowsProps> = memo(
  ({ direction }): JSX.Element => (
    <View style={styles.headerContainer}>
      {direction === 'left' && (
        <Ionicons name={'chevron-back-outline'} color={COLOR.white} size={24} />
      )}
      {direction === 'right' && (
        <Ionicons name={'chevron-forward-outline'} color={COLOR.white} size={24} />
      )}
    </View>
  )
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    color: COLOR.white
  }
});

export default CalendarHeaderArrows;
