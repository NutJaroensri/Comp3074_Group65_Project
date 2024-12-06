import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';
import SearchScreen from './screens/SearchScreen';
import RestaurantDetails from './screens/RestaurantDetails';
import AddRestaurant from './screens/AddRestaurant';
import EditRestaurant from './screens/EditRestaurant';
import MapScreen from './screens/MapScreen';
import { RestaurantProvider } from './context/RestaurantContext'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="SearchScreen" 
      component={SearchScreen} 
      options={{ title: 'Search' }} 
    />

    <Stack.Screen 
      name="MapScreen" 
      component={MapScreen} 
      options={{ title: 'Full-Screen Map' }} 
    />

    <Stack.Screen
      name="RestaurantDetails"
      component={RestaurantDetails}
      options={{ title: 'Restaurant Details' }}
    />
    <Stack.Screen
      name="AddRestaurant"
      component={AddRestaurant}
      options={{ title: 'Add New Restaurant' }}
    />
    <Stack.Screen
      name="EditRestaurant"
      component={EditRestaurant}
      options={{ title: 'Edit Restaurant' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <RestaurantProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </RestaurantProvider>
  );
};

export default App;
