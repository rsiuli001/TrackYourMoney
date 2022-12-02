import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStacks} from './index';
import {uniqueId} from 'lodash';
import COLOR from '@assets/color';

const {Navigator, Screen} = createBottomTabNavigator();

function BottomTabNav(): JSX.Element {
  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: COLOR.black,
      marginTop: 5,
    }),
    [],
  );

  return (
    <Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLOR.red,
        tabBarInactiveTintColor: COLOR.white,
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;
          switch (route.name) {
            case 'Transactions':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Stats':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Accounts':
              iconName = focused ? 'server' : 'server-outline';
              break;
            case 'More':
              iconName = focused
                ? 'md-ellipsis-horizontal'
                : 'md-ellipsis-horizontal-outline';
              break;
            default:
              iconName = 'alert-circle';
              break;
          }
          return <Ionicons name={iconName} size={18} color={color} />;
        },
      })}>
      {RootStacks.map(stack => (
        <Screen key={uniqueId('STACK_KEY_')} {...stack} />
      ))}
    </Navigator>
  );
}

export default BottomTabNav;
