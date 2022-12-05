import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';

export interface TransactionSummaryProps {
  expense: number;
  income: number;
}

const TransactionSummary: FC<TransactionSummaryProps> = ({ expense, income }): JSX.Element => {
  const renderEl = (label: string, value: string, color: string): ReactNode => (
    <View style={styles.elContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderEl('Income', `${income}`, COLOR.blue)}
      {renderEl('Expenses', `${expense}`, COLOR.red)}
      {renderEl('Total', `${income - expense}`, COLOR.white)}
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
    textAlign: 'center'
  }
});

export default TransactionSummary;
