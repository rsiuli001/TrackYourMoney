import { RootState } from '@/redux/store';
import { MonthData, Transaction } from '@/types/transaction';
import {
  combineIncomeExpenseData,
  sumIncomeExpenseData,
  toNumberString,
  TransactionType
} from '@/utils/transaction';
import COLOR from '@assets/color';
import moment from 'moment';
import React, { FC } from 'react';
import { useMemo } from 'react';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export interface DailyProps {}

const Daily: FC<DailyProps> = (): JSX.Element => {
  const { income, expense, dateObj } = useSelector((state: RootState) => {
    const { selectedMonth, selectedYear } = state.calendar;
    const { income, expenses } = state;
    return {
      income: income[selectedYear]?.[selectedMonth] ?? {},
      expense: expenses[selectedYear]?.[selectedMonth] ?? {},
      dateObj: moment(`${selectedMonth + 1}-${selectedYear}`, 'MM-YYYY')
    };
  });

  const data: MonthData = useMemo(
    () => combineIncomeExpenseData(income ?? {}, expense ?? {}, dateObj),
    [income, expense, dateObj]
  );

  const renderTransaction = (t: Transaction): ReactNode => {
    return (
      <TouchableOpacity style={styles.rowContainer}>
        <View style={styles.rowLeft}>
          <Text style={styles.categoryText} numberOfLines={2} ellipsizeMode={'tail'}>
            {t.category}
          </Text>
        </View>
        <View style={styles.rowCenter}>
          <Text style={styles.noteText} numberOfLines={1} ellipsizeMode={'tail'}>
            {t.note}
          </Text>
          <Text style={styles.accountText} numberOfLines={1} ellipsizeMode={'tail'}>
            {t.account}
          </Text>
        </View>
        <View style={styles.rowRight}>
          <Text
            style={[
              styles.amountText,
              { color: t.type === TransactionType.Expense ? COLOR.red : COLOR.blue }
            ]}
          >
            {toNumberString(t.amount, true)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(data).map((day, index) => {
        const d = moment(day, 'DD-MM-YYYY');
        const { totalDailyIncome, totalDailyExpense } = sumIncomeExpenseData(data[day]);
        return (
          <View key={index} style={styles.listEl}>
            <View style={styles.listHeader}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{d.format('DD')}</Text>
                <Text style={styles.dayText}>{d.format('ddd')}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.incomeText}>{toNumberString(totalDailyIncome, true)}</Text>
                <Text style={styles.expenseText}>{toNumberString(totalDailyExpense, true)}</Text>
              </View>
            </View>

            <View>
              {data[day].map(transaction => {
                return renderTransaction(transaction);
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.blackDiv
  },
  listEl: {
    backgroundColor: COLOR.black,
    marginBottom: 10,
    paddingBottom: 10
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.underLineGrey,
    paddingBottom: 5,
    marginTop: 5
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dateText: {
    color: COLOR.white,
    fontWeight: '800',
    fontSize: 20,
    marginLeft: 15
  },
  dayText: {
    color: COLOR.white,
    fontSize: 10,
    backgroundColor: COLOR.grey,
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 5,
    marginLeft: 2,
    textAlign: 'center'
  },
  incomeText: {
    color: COLOR.blue,
    marginRight: 20,
    fontSize: 13
  },
  expenseText: {
    color: COLOR.red,
    marginRight: 15,
    fontSize: 13
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15
  },
  rowLeft: {
    justifyContent: 'center',
    width: '20%',
    marginRight: 5
  },
  categoryText: {
    color: COLOR.grey,
    fontSize: 12
  },
  rowCenter: {
    flex: 1,
    marginRight: 10
  },
  noteText: {
    color: COLOR.white,
    fontSize: 14
  },
  accountText: {
    color: COLOR.grey,
    fontSize: 12
  },
  rowRight: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountText: {
    fontSize: 13,
    textAlign: 'center'
  }
});

export default Daily;
