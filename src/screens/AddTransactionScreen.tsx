import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import COLOR from '../../assets/color';
import { AddtransactionContainer } from '../component';
import { TransactionStackParams } from '../navigation/transactionStack';

export interface AddTransactionScreenProps
  extends NativeStackScreenProps<TransactionStackParams, 'AddTransaction'> {}

const AddTransactionScreen: FC<AddTransactionScreenProps> = (props): JSX.Element => {
  return (
    <View style={styles.container}>
      <AddtransactionContainer {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black
  }
});

export default AddTransactionScreen;
