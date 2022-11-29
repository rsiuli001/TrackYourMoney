import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import COLOR from '../../assets/color';
import { AddTransactionScreen, TransactionScreen } from '../screens';

export type TransactionStackParams = {
  AddTransaction: undefined;
  TransactionScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<TransactionStackParams>();

const TransactionStack: FC = (): JSX.Element => (
  <Navigator
    screenOptions={{
      gestureEnabled: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLOR.white,
        fontWeight: '400',
        fontSize: 16
      },
      headerStyle: {
        backgroundColor: COLOR.black
      }
    }}
    initialRouteName={'TransactionScreen'}
  >
    <Screen
      name={'TransactionScreen'}
      component={TransactionScreen}
      options={{
        headerTitle: 'Transactions'
      }}
    />
    <Screen name={'AddTransaction'} component={AddTransactionScreen} />
  </Navigator>
);

export default TransactionStack;
