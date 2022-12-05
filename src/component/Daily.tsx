import { RootState } from '@/redux/store';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export interface DailyProps {}

const Daily: FC<DailyProps> = (): JSX.Element => {
  // const {} = useSelector((state: RootState) => {
  //   const { calendar, expenses, income } = state;
  //   const expenseKeys = Object.keys(expenses);
  //   const incomeKeys = Object.keys(income);

  // });

  // console.log('debug: selectedMonth: ', { selectedMonth, selectedYear });

  // const expenseKeys = Object.keys(expenses);
  // const incomeKeys = Object.keys(income);
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Daily;
