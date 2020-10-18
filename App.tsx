import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Determining from './pages/Determining';
import Location from './pages/Location';
import Scanning from './pages/Scanning';
import Sorting from './pages/Sorting';

const Stack = createStackNavigator();

const linking = {
  prefixes: [],
  config: {
    screens: {
      determining: '',
      location: '/location',
      scanning: '/scanning',
      sorting: '/sorting'
    }
  },
};

export default function App() {
  return (
  <NavigationContainer linking={linking} >
  <Stack.Navigator initialRouteName="determining" screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="determining" component={Determining} />
      <Stack.Screen name="location" component={Location} />
      <Stack.Screen name="scanning" component={Scanning} />
      <Stack.Screen name="sorting"  component={Sorting} />
  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
