import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import COLOR from '../../assets/color';
import ButtonWrapper from './ButtonWrapper';
import CALENDAR_VIEW_DATA from '../data/calender';

export interface CalendarProps {}

const Calendar: FC<CalendarProps> = (): JSX.Element => {
  const [selectedViewType, setSelectedViewType] = useState<number>(0);
  const renderCalendarHeader = (): JSX.Element => (
    <View style={styles.headerContainer}>
      <ButtonWrapper
        onPress={() => {
          console.log('debug: 1');
        }}
      >
        <Ionicons name={'chevron-back-outline'} color={COLOR.white} size={24} />
      </ButtonWrapper>
      <Text style={{ color: COLOR.white }}>November</Text>
      <ButtonWrapper>
        <Ionicons name={'chevron-forward-outline'} color={COLOR.white} size={24} />
      </ButtonWrapper>
    </View>
  );

  const onCalendarViewTypeSelect = (index: number): void => {
    setSelectedViewType(index);
  };

  const renderCalendarViewType = (): JSX.Element => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
        {CALENDAR_VIEW_DATA.map(item => {
          const color: string | undefined = selectedViewType === item.key ? COLOR.red : undefined;
          return (
            <ButtonWrapper
              key={item.key}
              style={{ borderBottomColor: color, borderBottomWidth: 2, paddingBottom: 3 }}
              onPress={() => onCalendarViewTypeSelect(item.key)}
            >
              <Text style={{ color: COLOR.white }}>{item.label}</Text>
            </ButtonWrapper>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderCalendarHeader()}
      {renderCalendarViewType()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10
  }
});

export default Calendar;
