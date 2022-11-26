import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StatsStackParams } from '../navigation/statsStack';

export interface StatsScreenProps extends NativeStackScreenProps<StatsStackParams, 'StatsScreen'> {}

const StatsScreen: FC<StatsScreenProps> = (): JSX.Element => {
  return <></>;
};

export default StatsScreen;
