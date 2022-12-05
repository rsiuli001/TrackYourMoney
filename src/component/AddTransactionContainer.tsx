import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { capitalize } from 'lodash';
import React, { FC, ReactNode, useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import COLOR from '../../assets/color';
import { TransactionStackParams } from '../navigation/transactionStack';
import { TransactionType } from '../utils/transaction';
import AddTransactionForm from './AddTransactionForm';
import AddTransfer from './AddTransfer';

export interface AddtransactionContainerProps
  extends NativeStackScreenProps<TransactionStackParams, 'AddTransaction'> {}

const AddtransactionContainer: FC<AddtransactionContainerProps> = ({ navigation }): JSX.Element => {
  const [activeHeader, setActiveHeader] = useState<TransactionType>(TransactionType.Expense);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: capitalize(activeHeader)
    });
  }, [activeHeader]);

  const onHeaderPress = (label: TransactionType) => {
    setActiveHeader(label);
  };

  const renderHeaderEl = (label: TransactionType, color: string) => {
    const borderWidth = label === activeHeader ? 1 : 0;
    return (
      <Pressable
        style={[styles.headerEl, { borderColor: color, borderWidth }]}
        onPress={() => {
          onHeaderPress(label);
        }}
      >
        <Text style={[styles.headerText, { color }]}>{capitalize(label)}</Text>
      </Pressable>
    );
  };

  const renderForm = (): ReactNode => {
    switch (activeHeader) {
      case TransactionType.Income:
        return <AddTransactionForm transactionType={TransactionType.Income} />;
      case TransactionType.Expense:
        return <AddTransactionForm transactionType={TransactionType.Expense} />;
      case TransactionType.Transfer:
        return <AddTransfer />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {renderHeaderEl(TransactionType.Income, COLOR.blue)}
        {renderHeaderEl(TransactionType.Expense, COLOR.red)}
        {renderHeaderEl(TransactionType.Transfer, COLOR.white)}
      </View>
      {renderForm()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  headerEl: {
    width: '33%',
    padding: 5,
    backgroundColor: COLOR.blackDiv,
    borderRadius: 5
  },
  headerText: {
    textAlign: 'center'
  }
});

export default AddtransactionContainer;
