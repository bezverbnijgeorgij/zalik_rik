import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Вхід' }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Реєстрація' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Головна', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}