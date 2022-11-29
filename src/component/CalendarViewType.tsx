import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';
import { CALENDAR_VIEW_DATA } from '../data/calender';
import ButtonWrapper from './ButtonWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateViewType } from '../redux/calendarSlice';

export interface CalendarViewTypeProps {}

const CalendarViewType: FC<CalendarViewTypeProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

  const onPress = useCallback((index: number) => {
    dispatch(updateViewType(index));
  }, []);

  return (
    <View style={styles.container}>
      {CALENDAR_VIEW_DATA.map((item, index) => {
        const borderBottomColor = selectedViewType === index ? COLOR.red : COLOR.black;
        const color = selectedViewType === index ? COLOR.white : COLOR.grey;
        return (
          <ButtonWrapper
            key={index}
            style={[styles.calendarViewTypeContainer, { borderBottomColor }]}
            onPress={() => onPress(index)}
          >
            <Text style={{ color }}>{item}</Text>
          </ButtonWrapper>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  calendarViewTypeContainer: {
    borderBottomWidth: 2,
    paddingBottom: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CalendarViewType;
