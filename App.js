import 'expo-dev-client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';

import AgoraUIKit from 'agora-rn-uikit';

// 006c50b01cb915b497fbe5394ea8aef5b7bIACtKdMvfz/2/JzbNxr0Sp8m4ua4+ODrJTdsU2lXEnFVlgXxcxEAAAAAEAAEWtPOHYkUYgEAAQAciRRi\

const App = () => {
  const [videoCall, setVideoCall] = useState(true);
  const [token, setToken] = useState('');

  const rtcProps = {
    appId: 'c50b01cb915b497fbe5394ea8aef5b7b',
    token: token,
    channel: 'dev',
    layout: 1,
    activeSpeaker: true,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),

    UserJoined: (uid, info) => {
      console.log('UserJoined', uid, info);
    },
    SwapVideo: (user) => console.log('SwapVideo', user),
  };
  const styleProps = {
    theme: '#fff',
    videoMode: {
      max: 3,
      min: 1,
    },
  };

  if (!videoCall)
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.center]}>
          <Image style={styles.logo} source={require('./assets/icon.png')} />
          <Text style={styles.title}>protocaller</Text>
        </View>
        <View style={[styles.container, styles.form]}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setToken(text)}
            value={token}
            placeholder='insert your token here'
            multiline={true}
          />
          <Pressable onPress={() => setVideoCall(true)} disabled={!token}>
            <View style={[styles.buttonIcon, !token && styles.buttonDisabled]}>
              <MaterialIcons name='videocam' size={28} color='white' />
            </View>
          </Pressable>
        </View>
        <View style={styles.center}>
          <Pressable onPress={() => Linking.openURL('https://rakbar.com')}>
            <Text style={styles.copyright}>prototype by @rakbar</Text>
          </Pressable>
        </View>
      </View>
    );

  return (
    <AgoraUIKit
      rtcProps={rtcProps}
      callbacks={callbacks}
      styleProps={styleProps}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    alignItems: 'center',
    padding: 32,
  },
  input: {
    width: '100%',
    margin: 12,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 8,
    padding: 10,
    marginBottom: 32,
  },
  buttonIcon: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 32,
  },
  buttonDisabled: {
    backgroundColor: '#dfdfdf',
  },
  logo: {
    width: 96,
    height: 96,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  copyright: {
    color: '#a1a1a1',
  },
});

export default App;
