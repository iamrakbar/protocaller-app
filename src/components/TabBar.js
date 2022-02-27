import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Stack } from '@mobily/stacks';
import { Text } from 'react-native-paper';
import { MotiView, MotiText, AnimatePresence, motify } from 'moti';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const bgColors = {
  Home: '#a5f3fc',
  Consult: '#e5c1e5',
  Schedule: '#d7d8f8',
  Profile: '#a7f3d0',
};

const textColors = {
  Home: '#06b6d4',
  Consult: '#f37ff3',
  Schedule: '#4b458c',
  Profile: '#10b981',
};
const MotifiedIcon = motify(MaterialCommunityIcons)();

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <Box direction='row' padding={2} style={styles.tabs}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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
        console.log('icon', options.tabBarIcon({ focused: isFocused }));
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <MotiView
              style={[
                styles.tab,
                {
                  backgroundColor: isFocused ? bgColors[route.name] : 'white',
                },
              ]}
            >
              {/* {icon({
                color: isFocused ? textColors[route.name] : '#333',
                size: 24,
              })} */}
              <AnimatePresence>
                {!!isFocused && (
                  <MotiText
                    from={{
                      opacity: 0,
                      translateY: 10,
                    }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    exit={{
                      opacity: 0,
                      translateY: 10,
                    }}
                    style={{
                      color: textColors[route.name],
                    }}
                  >
                    {route.name}
                  </MotiText>
                )}
              </AnimatePresence>
            </MotiView>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    padding: 4,
  },
});
