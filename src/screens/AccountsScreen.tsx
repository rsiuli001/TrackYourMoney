import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { AccountsStackParams } from '../navigation/accountsStack';

export interface AccountsScreenProps
  extends NativeStackScreenProps<AccountsStackParams, 'AccountsScreen'> {}

const AccountsScreen: FC<AccountsScreenProps> = (): JSX.Element => {
  return <></>;
};

export default AccountsScreen;
