import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStack } from './src/navigation';
import { Provider } from 'react-redux';
import COLOR from '@assets/color';
import { store } from '@/redux';

const App: FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <RootStack></RootStack>
        </NavigationContainer>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.black
  }
});

export default App;
