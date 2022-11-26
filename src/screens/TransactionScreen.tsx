import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLOR from '../../assets/color';
import { Calendar } from '../component';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TransactionStackParams } from '../navigation/transactionStack';

export interface TransactionScreenProps
  extends NativeStackScreenProps<TransactionStackParams, 'TransactionScreen'> {}

const INITIAL_DATE = new Date().toISOString();

const TransactionScreen: FC<TransactionScreenProps> = ({ navigation }): JSX.Element => {
  return (
    <View style={styles.container}>
      <Calendar />
    </View>
  );
};

// const TransactionScreen: FC<TransactionScreenProps> = ({ navigation }): JSX.Element => {
// const [currentMonth, setCurrentMonth] = useState<string>(INITIAL_DATE);
// useLayoutEffect(() => {
//   navigation.setOptions({
//     headerTitle: 'Transactions'
//   });
// }, []);

// const customHeaderProps: any = useRef();

// const setCustomHeaderNewMonth = (next = false) => {
//   const add = next ? 1 : -1;
//   const month = new Date(customHeaderProps?.current?.month);
//   const newMonth = new Date(month.setMonth(month.getMonth() + add));
//   customHeaderProps?.current?.addMonth(add);
//   setCurrentMonth(newMonth.toISOString().split('T')[0]);
// };
// const moveNext = () => {
//   setCustomHeaderNewMonth(true);
// };
// const movePrevious = () => {
//   setCustomHeaderNewMonth(false);
// };

// const renderCalendar = () => {
//   const CustomHeader = React.forwardRef((props, ref) => {
//     customHeaderProps.current = props;
//     return (
//       // @ts-expect-error
//       <View ref={ref} {...props}>
//         <TouchableOpacity onPress={movePrevious}>
//           <Text>Previous</Text>
//         </TouchableOpacity>
//         <Text>Custom header!</Text>
//         <Text>{currentMonth}</Text>
//         <TouchableOpacity onPress={moveNext}>
//           <Text>Next</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   });
//   return (
//     <>
//       <Text>Calendar with custom header component</Text>
//       <Calendar
//         // initialDate={INITIAL_DATE}
//         // testID={testIDs.calendars.LAST}
//         // style={[styles.calendar, styles.customCalendar]}
//         customHeader={CustomHeader}
//       />
//     </>
//   );
// };

//   return (
//     <View style={styles.container}>
//       {/* {renderCalendar()} */}

//       <Calendar />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black
  }
});

export default TransactionScreen;
