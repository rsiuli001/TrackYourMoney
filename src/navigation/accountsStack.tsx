import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { AccountsScreen } from '../screens';

export type AccountsStackParams = {
  AccountsScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AccountsStackParams>();

const AccountsStack: FC = (): JSX.Element => (
  <Navigator screenOptions={{ gestureEnabled: false }} initialRouteName={'AccountsScreen'}>
    <Screen name={'AccountsScreen'} component={AccountsScreen} />
  </Navigator>
);

export default AccountsStack;
