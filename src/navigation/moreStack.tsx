import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { MoreScreen } from '../screens';

export type MoreStackParams = {
  MoreScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<MoreStackParams>();

const MoreStack: FC = (): JSX.Element => (
  <Navigator screenOptions={{ gestureEnabled: false }} initialRouteName={'MoreScreen'}>
    <Screen name={'MoreScreen'} component={MoreScreen} />
  </Navigator>
);

export default MoreStack;
