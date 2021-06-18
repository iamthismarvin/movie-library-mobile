import 'react-native-gesture-handler';
import React from 'react';
import Home from './screens/Home';
import Search from './screens/Search';
import AddToLibrary from './screens/AddToLibrary';
import Library from './screens/Library';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen
          name="AddToLibrary"
          component={AddToLibrary}
          options={{title: 'Add to Library'}}
        />
        <Stack.Screen name="Library" component={Library} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
