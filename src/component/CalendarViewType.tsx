import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';
import { CALENDAR_VIEW_DATA } from '../data/calender';
import ButtonWrapper from './ButtonWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateViewType } from '../redux/calendarSlice';
import { TransactionViewType } from '../utils/calendar';
import lodash from 'lodash';
import { debouncePress } from '../utils/debounce';

export interface CalendarViewTypeProps {}

const CalendarViewType: FC<CalendarViewTypeProps> = (): JSX.Element => {
  const dispatch = useDispatch();
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

  const onPress = (viewType: TransactionViewType) =>
    debouncePress(() => {
      dispatch(updateViewType(viewType));
    });

  return (
    <View style={styles.container}>
      {CALENDAR_VIEW_DATA.map((item, index) => {
        const borderBottomColor = selectedViewType === item ? COLOR.red : COLOR.black;
        const color = selectedViewType === item ? COLOR.white : COLOR.grey;
        return (
          <ButtonWrapper
            key={index}
            style={[styles.calendarViewTypeContainer, { borderBottomColor }]}
            // onPress={() => onPress(item)}
            disabled={selectedViewType === item}
            onPress={onPress(item)}
          >
            <Text style={{ color }}>{lodash.capitalize(item)}</Text>
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
