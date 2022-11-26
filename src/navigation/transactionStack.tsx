import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import COLOR from '../../assets/color';
import { TransactionScreen } from '../screens';

export type TransactionStackParams = {
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
  </Navigator>
);

export default TransactionStack;
