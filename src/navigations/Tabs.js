import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { Box, Column, Columns, Stack } from '@mobily/stacks';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';

import HomeScreen from '../screens/Home';
import ExpertScreen from '../screens/Expert';
import ScheduleScreen from '../screens/Schedule';
import AccountScreen from '../screens/Account';
import TabBar from '../components/TabBar';
import theme from '../utils/theme';

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        elevation: 0,
      }}
    >
      <Columns
        space={4}
        padding={4}
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          elevation: 8,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon = options.tabBarIcon;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Column width={isFocused ? '2/5' : '1/5'} key={route.key}>
              <TouchableOpacity
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <Box
                  alignX='center'
                  alignY='center'
                  style={{
                    backgroundColor: isFocused
                      ? theme.colors.primary
                      : 'transparent',
                    height: 48,
                    borderRadius: 24,
                  }}
                >
                  {isFocused ? (
                    <Stack horizontal space={2} align='center'>
                      <Icon color={theme.colors.background} size={20} />
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          color: theme.colors.background,
                        }}
                      >
                        {label}
                      </Text>
                    </Stack>
                  ) : (
                    <Icon color={theme.colors.primary} size={20} />
                  )}
                </Box>
              </TouchableOpacity>
            </Column>
          );
        })}
      </Columns>
    </Box>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Expert'
        component={ExpertScreen}
        options={{
          tabBarLabel: 'Expert',
          tabBarIcon: ({ color, size }) => (
            <Feather name='video' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Schedule'
        component={ScheduleScreen}
        options={{
          tabBarLabel: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Feather name='calendar' color={color} size={size} />
          ),
          tabBarBadge: '',
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Feather name='user' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
