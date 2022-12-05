import React, { FC, ReactNode, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { TransactionViewType } from '../utils/calendar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionStackParams } from '../navigation/transactionStack';
import {
  CalendarHeader,
  CalendarView,
  CalendarViewType,
  Daily,
  FloatingButton,
  Monthly,
  Summary,
  TransactionSummary
} from '@/component';

export interface TransactionsContainerProps
  extends NativeStackScreenProps<TransactionStackParams, 'TransactionScreen'> {}

const TransactionsContainer: FC<TransactionsContainerProps> = ({ navigation }): JSX.Element => {
  const { selectedViewType } = useSelector((state: RootState) => state.calendar);

  const renderTransactionView = (): ReactNode => {
    switch (selectedViewType) {
      case TransactionViewType.Daily:
        return <Daily />;
      case TransactionViewType.Calendar:
        return <CalendarView />;
      case TransactionViewType.Monthly:
        return <Monthly />;
      case TransactionViewType.Summary:
        return <Summary />;
      default:
        return null;
    }
  };

  const onPress = useCallback(() => {
    navigation.push('AddTransaction');
  }, []);

  return (
    <View style={styles.container}>
      <CalendarHeader />
      <CalendarViewType />
      <TransactionSummary income={5000} expense={50000} />
      {renderTransactionView()}
      <FloatingButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TransactionsContainer;
