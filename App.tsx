import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Determining from './pages/Determining';
import Location from './pages/Location';
import Scanning from './pages/Scanning';
import Sorting from './pages/Sorting';

const Stack = createStackNavigator();

const linking = {
  prefixes: [],
  config: {
    screens: {
      Scanning: '/Scanning',
      Location: '/Location',
      Determining: '/Determining',
      Sorting: '/Sorting',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Scanning"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Determining" component={Determining} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Scanning" component={Scanning} />
        <Stack.Screen name="Sorting" component={Sorting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
