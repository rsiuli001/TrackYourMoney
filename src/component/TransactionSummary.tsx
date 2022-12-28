import { RootState } from '@/redux/store';
import { calculateMonthlyExpense, toNumberString } from '@/utils/transaction';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import COLOR from '../../assets/color';

export interface TransactionSummaryProps {
  // expense: number;
  // income: number;
}

const TransactionSummary: FC<TransactionSummaryProps> = (): JSX.Element => {
  const { income, expense, total } = useSelector((state: RootState) => {
    const { selectedYear, selectedMonth } = state.calendar;
    const { expenses, income } = state;
    return calculateMonthlyExpense(
      income[selectedYear]?.[selectedMonth] || {},
      expenses[selectedYear]?.[selectedMonth] || {}
    );
  });

  const renderEl = (label: string, value: number, color: string): ReactNode => (
    <View style={styles.elContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{toNumberString(value, true)}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderEl('Income', income, COLOR.blue)}
      {renderEl('Expenses', expense, COLOR.red)}
      {renderEl('Total', total, COLOR.white)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.underLineGrey
  },
  elContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: '30%'
  },
  label: {
    color: COLOR.white,
    fontSize: 11,
    textAlign: 'center'
  },
  value: {
    marginTop: 5,
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 0.8
  }
});

export default TransactionSummary;
