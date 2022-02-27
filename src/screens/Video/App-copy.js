import 'expo-dev-client';

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import { MaterialIcons } from '@expo/vector-icons';

import AgoraUIKit from 'agora-rn-uikit';
import RtcEngine, { RtcLocalView, RtcRemoteView } from 'react-native-agora';
import requestCameraAndAudioPermission from 'agora-rn-uikit/src/permission';

const VideoScreen = () => {
  const goBack = () => navigation.goBack();
  // engine state
  const [engine, setEngine] = useState(undefined);
  const [peerIds, setPeerIds] = useState([]);
  const [joinSucceed, setJoinSucceed] = useState(false);

  const appId = 'c50b01cb915b497fbe5394ea8aef5b7b';
  const channelName = 'dev';
  const token =
    '006c50b01cb915b497fbe5394ea8aef5b7bIACtKdMvfz/2/JzbNxr0Sp8m4ua4+ODrJTdsU2lXEnFVlgXxcxEAAAAAEAAEWtPOHYkUYgEAAQAciRRi';

  useEffect(
    () => {
      // variable used by cleanup function
      let isSubscribed = true;

      // create the function
      const createEngine = async () => {
        console.log('inside engine');
        try {
          if (Platform.OS === 'android') {
            // Request required permissions from Android
            await requestCameraAndAudioPermission();
          }
          console.log('inside try');
          const rtcEngine = await RtcEngine.create(appId);
          await rtcEngine.enableVideo();

          // need to prevent calls to setEngine after the component has unmounted
          if (isSubscribed) {
            setEngine(rtcEngine);
          }
        } catch (e) {
          console.log(e);
        }
      };

      // call the function
      if (!engine) createEngine();

      engine?.addListener('Warning', (warn) => {
        console.log('Warning', warn);
      });

      engine?.addListener('Error', (err) => {
        console.log('Error', err);
      });

      engine?.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);
        // If new user
        if (peerIds.indexOf(uid) === -1) {
          // Add peer ID to state array
          setPeerIds([...peerIds, uid]);
        }
      });

      engine?.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason);
        // Remove peer ID from state array
        setPeerIds(peerIds.filter((id) => id !== uid));
      });

      // If Local user joins RTC channel
      engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        if (isSubscribed) {
          // Set state variable to true
          setJoinSucceed(true);
        }
      });

      startCall();

      // return a cleanup
      return () => {
        console.log('unmount');
        isSubscribed = false;
        console.log(engine);
        engine?.removeAllListeners();
        engine?.destroy();
      };
    },
    // will run once on component mount or if engine changes
    [engine]
  );

  const renderRemoteVideos = () => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              key={value}
              style={{ flex: 1 }}
              uid={value}
              channelId={channelName}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  const startCall = async () => {
    // Join Channel using null token and channel name
    await engine?.joinChannel(token, channelName, null, 0);
    console.log('startCall');
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    setPeerIds([]);
    setJoinSucceed(false);
    await engine?.leaveChannel();
  };

  console.log('engine', engine);

  return (
    <View testID='VideoScreen' style={{ flex: 1, backgroundColor: 'red' }}>
      <View style={{ flex: 1, backgroundColor: 'green' }}>
        {
          engine ? ( // check if we have an engine and not undefined
            <View style={{ flex: 1, backgroundColor: 'blue' }}>
              {joinSucceed ? (
                <RtcLocalView.SurfaceView
                  style={{ flex: 1 }}
                  channelId={channelName}
                />
              ) : null}
              {renderRemoteVideos()}
            </View> // if we know that we have an engine, we can do something with it
          ) : (
            <ActivityIndicator />
          ) // show a loading component while waiting for createEngine to finish
        }
      </View>
    </View>
  );
};

export default VideoScreen;
