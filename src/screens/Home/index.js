import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Box, Column, Columns, Row, Rows, Stack, Tiles } from '@mobily/stacks';
import {
  Avatar,
  Caption,
  Headline,
  Paragraph,
  Text,
  Title,
  Searchbar,
  Button,
  useTheme,
  Card,
  Colors,
  List,
  Surface,
  Subheading,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import Screen from '../../components/Screen';
import ExpertListItem from '../../components/ExpertListItem';

import theme from '../../utils/theme';
import { EXPERTS, TOPICS } from '../../faker';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

const GridItem = ({ title, icon, color }) => {
  return (
    <Pressable
      onPress={() => console.log('Pressed')}
      rippleColor='rgba(0, 0, 0, .32)'
    >
      <Stack space={1} align='center'>
        <Ionicons name={icon} size={28} color={color} />
        <Caption>{title}</Caption>
      </Stack>
    </Pressable>
  );
};

const Home = ({ navigation }) => {
  const { width: windowWidth } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Screen style={{ paddingBottom: 80 }}>
      <FocusAwareStatusBar
        style='light'
        backgroundColor={theme.colors.primary}
      />
      <ScrollView>
        <Stack space={6} marginBottom={4}>
          <Box paddingX={4} style={{ backgroundColor: theme.colors.primary }}>
            <Box direction='row' alignX='between' alignY='center' paddingY={8}>
              <Box alignY='center'>
                <Title style={{ color: 'white' }}>Hi, Akbar</Title>
                <Caption style={{ color: Colors.blue100 }}>
                  Let's learn something new today!
                </Caption>
              </Box>
              <Avatar.Image
                size={48}
                source={{
                  uri: 'https://en.gravatar.com/userimage/1091358/4ca83cf7a123ecfab62c0f62568b26f2?size=200',
                }}
              />
            </Box>
            <Box marginBottom={-6}>
              <Searchbar
                placeholder='Search'
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </Box>
          </Box>
          <Box paddingX={4} marginTop={4}>
            <Box direction='row' alignX='between' alignY='center'>
              <Text>Find Topic You Like</Text>
              <Text style={{ color: theme.colors.primary }}>View All</Text>
            </Box>
            <Box marginTop={2}>
              <Card>
                <Box padding={4}>
                  <Tiles space={6} columns={4}>
                    {TOPICS.slice(0, -4).map((topic) => (
                      <GridItem
                        key={topic.id}
                        icon={topic.icon}
                        title={topic.title}
                        color={topic.color}
                      />
                    ))}
                    <GridItem
                      icon={'grid-outline'}
                      title={'More'}
                      color={Colors.grey700}
                    />
                  </Tiles>
                </Box>
              </Card>
            </Box>
          </Box>
          <Box>
            <Box direction='row' paddingX={4} alignX='between' alignY='center'>
              <Text>Consultation With Expert</Text>
              <Text style={{ color: theme.colors.primary }}>View All</Text>
            </Box>
            <Box marginTop={4}>
              {EXPERTS.slice(5).map((item) => (
                <ExpertListItem key={item.id} item={item} />
              ))}
            </Box>
          </Box>
        </Stack>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  fontBold: {
    fontWeight: '700',
  },
});

export default Home;
