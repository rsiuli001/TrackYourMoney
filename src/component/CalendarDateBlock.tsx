import React, { FC, useMemo } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import COLOR from '../../assets/color';

export interface CalendarDateBlockProps extends TouchableOpacityProps {
  date?: number;
  index: number;
}

const blockWidth = Dimensions.get('screen').width / 7;

const CalendarDateBlock: FC<CalendarDateBlockProps> = ({ date, index, ...props }): JSX.Element => {
  const total: number = 122.01;
  const totalColor: string = useMemo(() => (total >= 0 ? COLOR.blue : COLOR.red), [total]);
  const dayColor: string = useMemo(
    () => (index % 7 === 0 ? COLOR.red : index % 6 === 0 ? COLOR.blue : COLOR.white),
    []
  );
  return (
    <TouchableOpacity style={styles.container} {...props}>
      {!props.disabled ? <Text style={[styles.day, { color: dayColor }]}>{date}</Text> : null}
      {!props.disabled ? <Text style={[styles.total, { color: totalColor }]}>{total}</Text> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: blockWidth,
    height: blockWidth + 20,
    borderWidth: 0.2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5
  },
  day: {
    fontSize: 11
    // marginLeft: 5
  },
  total: {
    textAlign: 'right',
    fontSize: 10
  }
});

export default CalendarDateBlock;
