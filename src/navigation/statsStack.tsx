import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import COLOR from '../../assets/color';
import { StatsScreen } from '../screens';

export type StatsStackParams = {
  StatsScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<StatsStackParams>();

const StatsStack: FC = (): JSX.Element => (
  <Navigator
    screenOptions={{
      gestureEnabled: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: COLOR.white,
        fontWeight: '600'
      },
      headerStyle: {
        backgroundColor: COLOR.black
      }
    }}
    initialRouteName={'StatsScreen'}
  >
    <Screen
      name={'StatsScreen'}
      component={StatsScreen}
      options={{
        headerTitle: 'Stats'
      }}
    />
  </Navigator>
);

export default StatsStack;
