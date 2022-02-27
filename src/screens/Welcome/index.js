import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Box } from '@mobily/stacks';
import { Button, Text } from 'react-native-paper';
import * as NavigationBar from 'expo-navigation-bar';
import PaperOnboarding from '@gorhom/paper-onboarding';

import { SafeAreaView } from 'react-native-safe-area-context';

import Screen from '../../components/Screen';
import { useCallback, useEffect, useState } from 'react';

const data = [
  {
    title: 'Quick and easy learning',
    description:
      'Easy and fast learning at any time to help you improve various skills',
    image: (
      <Image
        style={{ width: 320, height: 320 }}
        source={{
          uri: 'https://ouch-cdn2.icons8.com/z7x9PIJOZ7B_zUhnboCgWr0Z9yBSDzJFNSIkP95lp00/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzYz/L2M4YjgwMjBmLWY5/NTYtNDhiNS1hN2Iw/LTEzZDgyMzZmNzI1/OS5zdmc.png',
        }}
      />
    ),
  },
  {
    title: 'Create your own study plan',
    description: 'Study according to the study plan, make study more motivated',
    image: (
      <Image
        style={{ width: 320, height: 320 }}
        source={{
          uri: 'https://ouch-cdn2.icons8.com/9Oz9ezxGpvBS2YGEpsYLS3qR68Rd22gjY7p2APIdCG0/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzcw/L2QzZWVkMjAzLTBj/Y2MtNGZlYi04YTM2/LWNlODNiODYwZDM5/OC5zdmc.png',
        }}
      />
    ),
  },
  {
    title: 'Numerous free trial courses',
    description: 'Free courses for you to find your way to learning',
    image: (
      <Image
        style={{ width: 320, height: 320 }}
        source={{
          uri: 'https://ouch-cdn2.icons8.com/nO7ngYE9iEnY6zcUuKfq_1Qk7qBF9iC-hnKBoQc4FJ8/rs:fit:456:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTI2/LzQzNTQxZDQwLWFm/ZWQtNDkwNC05Yzky/LTI4Mjc2NDM1ZGZh/OC5zdmc.png',
        }}
      />
    ),
    showCloseButton: true,
  },
];

const Welcome = ({ navigation }) => {
  const [itemIndex, setItemIndex] = useState(0);

  useEffect(() => {
    //NavigationBar.setBackgroundColorAsync(data[itemIndex].backgroundColor);
    //return () => NavigationBar.setBackgroundColorAsync('#fff');
  }, [itemIndex]);

  const handleOnIndexChange = (index) => {
    console.log('on index change', data[index].backgroundColor);
    //setItemIndex(index);
  };
  const handleOnClosePress = () => navigation.navigate('App');

  return (
    <Screen>
      <PaperOnboarding
        data={data}
        onCloseButtonPress={handleOnClosePress}
        onIndexChange={handleOnIndexChange}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        closeButtonTextStyle={styles.closeButtonText}
        indicatorSize={20}
        indicatorBackgroundColor='#2563eb'
        indicatorBorderColor='#2563eb'
        direction='horizontal'
      />
    </Screen>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  title: {
    color: '#334155',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: '#64748b',
    fontSize: 16,
  },
  closeButtonText: {
    color: '#2563eb',
  },
});
