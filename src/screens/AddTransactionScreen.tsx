import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export interface AddTransactionScreenProps {}

const AddTransactionScreen: FC<AddTransactionScreenProps> = (): JSX.Element => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddTransactionScreen;
