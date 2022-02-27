import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import theme from '../utils/theme';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import CallScreen from '../screens/Call';
import ShowExpertScreen from '../screens/Expert/Show';
import BookExpertScreen from '../screens/Expert/Book';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Group
            screenOptions={{
              headerShown: false,
              presentation: 'modal',
            }}
          >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerShown: false,
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name='App' component={Tabs} />
            <Stack.Screen name='Call' component={CallScreen} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name='ShowExpert'
              component={ShowExpertScreen}
              options={{ title: 'Show Expert' }}
            />
            <Stack.Screen
              name='BookExpert'
              component={BookExpertScreen}
              options={{ title: 'Make Appointment' }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default Navigations;
