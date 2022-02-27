import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Box, FillView, Stack } from '@mobily/stacks';
import {
  Colors,
  IconButton,
  Subheading,
  Surface,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import theme from '../../utils/theme';
import { NavigationContainer } from '@react-navigation/native';

const Call = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <FillView>
      <Image
        style={styles.imageFull}
        source={{
          uri: 'https://images.unsplash.com/photo-1633367583895-08545d733dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGJ1c2luZXNzJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        }}
      />
      <Box
        padding={1}
        style={[
          styles.caller,
          {
            marginTop: insets.top,
          },
        ]}
      >
        <Image
          style={styles.imageCaller}
          source={{
            uri: 'https://en.gravatar.com/userimage/1091358/4ca83cf7a123ecfab62c0f62568b26f2?size=200',
          }}
        />
      </Box>
      <Surface style={styles.controller}>
        <Box padding={4}>
          <Box alignX='center'>
            <Title>02:14:17</Title>
          </Box>
          <Stack horizontal space={8} paddingX={4} marginTop={4} align='center'>
            <IconButton
              icon={({ size, color }) => (
                <Ionicons name='mic-off' size={size} color={color} />
              )}
              size={36}
              color={Colors.grey700}
              onPress={() => console.log('Pressed')}
            />
            <TouchableRipple
              onPress={() => navigation.goBack()}
              rippleColor='rgba(0, 0, 0, .32)'
              borderless={true}
              style={styles.buttonCall}
            >
              <Box
                flex='fluid'
                alignX='center'
                alignY='center'
                style={styles.buttonCallInner}
              >
                <Ionicons name='call' size={36} color={'white'} />
              </Box>
            </TouchableRipple>
            <IconButton
              icon={({ size, color }) => (
                <Ionicons name='videocam' size={size} color={color} />
              )}
              size={36}
              color={Colors.grey700}
              onPress={() => console.log('Pressed')}
            />
          </Stack>
        </Box>
      </Surface>
    </FillView>
  );
};

export default Call;

const styles = StyleSheet.create({
  caller: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 8,
  },
  controller: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageCaller: {
    width: 144,
    height: 192,
  },
  imageFull: StyleSheet.absoluteFillObject,
  buttonCall: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonCallInner: {
    backgroundColor: '#ef4444',
  },
});
