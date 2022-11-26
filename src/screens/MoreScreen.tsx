import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { MoreStackParams } from '../navigation/moreStack';

export interface MoreScreenProps extends NativeStackScreenProps<MoreStackParams, 'MoreScreen'> {}

const MoreScreen: FC<MoreScreenProps> = (): JSX.Element => {
  return <></>;
};

export default MoreScreen;
