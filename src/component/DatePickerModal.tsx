import COLOR from '@assets/color';
import moment from 'moment';
import React, { FC, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import BottomSheet from './BottomSheet';

export interface DatePickerModalProps {
  value: string;
  onChange: (date: string) => void;
}

const DatePickerModal: FC<DatePickerModalProps> = ({ value, onChange }): JSX.Element => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const dateRef = useRef(moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD'));

  const onModalOpen = (): void => {
    setVisible(true);
  };

  const onModalClose = (): void => {
    setVisible(false);
  };

  const onDayPressed = (date: DateData): void => {
    dateRef.current = date.dateString;
    onChange(moment(date.dateString, 'YYYY-MM-DD').format('DD-MM-YYYY'));
    onModalClose();
  };

  const borderBottomColor: string = useMemo(
    (): string => (isVisible ? COLOR.blue : COLOR.underLineGrey),
    [isVisible]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{'Date'}</Text>
      <Pressable style={[styles.input, { borderBottomColor }]} onPress={onModalOpen}>
        <Text style={styles.value}>{value}</Text>
      </Pressable>

      <BottomSheet visible={isVisible} onRequestClose={onModalClose}>
        <View>
          <Calendar
            theme={{
              backgroundColor: COLOR.black,
              calendarBackground: COLOR.black,
              selectedDayBackgroundColor: COLOR.blue,
              selectedDayTextColor: COLOR.white,
              todayTextColor: COLOR.blue,
              dayTextColor: COLOR.white,
              textDisabledColor: COLOR.grey,
              arrowColor: COLOR.white,
              disabledArrowColor: COLOR.grey,
              monthTextColor: COLOR.white,
              stylesheet: {
                calendar: {
                  header: {
                    dayTextAtIndex0: {
                      color: COLOR.red
                    },
                    dayTextAtIndex6: {
                      color: COLOR.blue
                    }
                  }
                }
              }
            }}
            initialDate={dateRef.current}
            disableAllTouchEventsForDisabledDays={true}
            onDayPress={onDayPressed}
            enableSwipeMonths={true}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    color: COLOR.white,
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  label: {
    color: COLOR.offWhite,
    width: '20%'
  },
  value: {
    color: COLOR.white
  }
});

export default DatePickerModal;
