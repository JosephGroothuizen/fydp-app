import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Determining from './pages/Determining';
import Location from './pages/Location';
import Scanning from './pages/Scanning';
import Sorting from './pages/Sorting';

const Stack = createStackNavigator();

export const AppContext = React.createContext<{
  image: string;
  setImage: (image: string) => void;
}>({image: '', setImage: () => {}});

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

const App: React.FC = () => {
  const [image, setImage] = React.useState('');

  return (
    <AppContext.Provider value={{image, setImage}}>
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
    </AppContext.Provider>
  );
};

export default App;
