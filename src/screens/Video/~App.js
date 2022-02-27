import React, { Component } from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Linking from 'expo-linking';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import { MaterialIcons } from '@expo/vector-icons';

import requestCameraAndAudioPermission from '../../../components/Permission';
import styles from '../../../components/Style';

export default class App extends Component {
  _engine;

  constructor(props) {
    super(props);
    this.state = {
      appId: 'c50b01cb915b497fbe5394ea8aef5b7b',
      token:
        '006c50b01cb915b497fbe5394ea8aef5b7bIACtKdMvfz/2/JzbNxr0Sp8m4ua4+ODrJTdsU2lXEnFVlgXxcxEAAAAAEAAEWtPOHYkUYgEAAQAciRRi',
      channelName: 'dev',
      joinSucceed: false,
      peerIds: [],
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    this.init();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const { appId } = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();

    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(
      this.state.token,
      this.state.channelName,
      null,
      0
    );
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
  };

  render() {
    const { joinSucceed } = this.state;
    return (
      <View style={styles.max}>
        <View style={styles.max}>
          {this._renderVideos()}
          <View
            style={[styles.buttonHolder, joinSucceed && styles.buttonHolderMin]}
          >
            <TouchableOpacity
              onPress={this.startCall}
              style={[styles.button, styles.buttonStart]}
            >
              <MaterialIcons name='videocam' size={28} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.endCall}
              style={[styles.button, styles.buttonEnd]}
            >
              <MaterialIcons name='videocam-off' size={28} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : (
      <View style={[styles.container, styles.center]}>
        <Image style={styles.logo} source={require('./assets/icon.png')} />
        <Text style={styles.title}>protocaller</Text>
        <View style={styles.copyright}>
          <Pressable onPress={() => Linking.openURL('https://rakbar.com')}>
            <Text style={styles.copyrightText}>prototype by @rakbar</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={this.state.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
