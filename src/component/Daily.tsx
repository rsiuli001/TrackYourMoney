import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export interface DailyProps {}

const Daily: FC<DailyProps> = (): JSX.Element => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Daily;
