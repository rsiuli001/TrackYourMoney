import { TransactionsContainer } from '@/component';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import COLOR from '../../assets/color';
import { TransactionStackParams } from '../navigation/transactionStack';

export interface TransactionScreenProps
  extends NativeStackScreenProps<TransactionStackParams, 'TransactionScreen'> {}

const TransactionScreen: FC<TransactionScreenProps> = (props): JSX.Element => {
  return (
    <View style={styles.container}>
      <TransactionsContainer {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black
  }
});

export default TransactionScreen;
