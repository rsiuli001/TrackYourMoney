import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonWrapper from './ButtonWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLOR from '../../assets/color';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { MONTHS } from '../data/calender';
import { nextMonth, prevMonth } from '../redux/calendarSlice';

export interface CalendarHeaderProps {}

const CalendarHeader: FC<CalendarHeaderProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedMonth, selectedYear, selectedViewType } = useSelector((state: RootState) => state.calendar);

  const onPressNext = useCallback(() => {
    dispatch(nextMonth());
  }, []);

  const onPressPrev = useCallback(() => {
    dispatch(prevMonth());
  }, []);

  return (
    <View style={styles.headerContainer}>
      <ButtonWrapper onPress={onPressPrev}>
        <Ionicons name={'chevron-back-outline'} color={COLOR.white} size={24} />
      </ButtonWrapper>
      <Text style={styles.text}>{`${MONTHS[selectedMonth]} ${selectedYear}`}</Text>
      <ButtonWrapper onPress={onPressNext}>
        <Ionicons name={'chevron-forward-outline'} color={COLOR.white} size={24} />
      </ButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // height: 60,
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

export default CalendarHeader;
