import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import COLOR from './assets/color';
import { RootStack } from './src/navigation';

const App: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <RootStack></RootStack>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black
  }
});

export default App;
