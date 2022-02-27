import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Box, Column, Columns, Stack } from '@mobily/stacks';
import {
  Button,
  Caption,
  Card,
  Chip,
  Colors,
  DataTable,
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import theme from '../../utils/theme';
import faker from '@faker-js/faker/locale/id_ID';

import { EXPERT, AVAILABILITY } from '../../faker';
const {
  id,
  name,
  image,
  title,
  jobTitle,
  jobType,
  description,
  experience,
  expertise,
  rating,
  reviews,
  tags,
} = EXPERT;

const Show = ({ route, navigation }) => {
  const { width: windowWidth } = useWindowDimensions();
  const { data } = route.params;

  useFocusEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <Chip
          onPress={() => console.log('Pressed')}
          textStyle={{
            fontSize: 11,
            fontWeight: '700',
            textTransform: 'uppercase',
            color: Colors.green500,
          }}
          style={{ backgroundColor: Colors.green50 }}
        >
          Available
        </Chip>
      ),
    });
  });

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Stack space={4} paddingY={4}>
          {/* <Columns space={4} paddingX={4} paddingY={2}>
              <Column width='content'>
                <Image
                  style={styles.image}
                  source={{
                    uri: data.avatar,
                  }}
                />
              </Column>
              <Column>
                <Stack space={2}>
                  <Title>{data.name}</Title>
                  <Stack horizontal space={4}>
                    <Stack horizontal space={2} align='center'>
                      <Ionicons
                        name='business-outline'
                        size={16}
                        color={theme.colors.placeholder}
                      />
                      <Text>{data.expertise}</Text>
                    </Stack>
                    <Stack horizontal space={2} align='center'>
                      <Ionicons
                        name='briefcase-outline'
                        size={16}
                        color={theme.colors.placeholder}
                      />
                      <Text>{`${experience} Years`}</Text>
                    </Stack>
                    <Stack horizontal space={2} align='center'>
                      <Ionicons
                        name='star-outline'
                        size={16}
                        color={theme.colors.placeholder}
                      />
                      <Text>4.9</Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Column>
            </Columns> */}
          {/* <Box padding={4}>
              <Card>
                <Card.Cover
                  source={{
                    uri: image,
                  }}
                />
              </Card>
            </Box> */}
          <Box paddingX={4} alignX='center'>
            <Image
              style={styles.image}
              source={{
                uri: data.avatar,
              }}
            />
          </Box>
          <Box paddingX={4} alignX='center'>
            <Headline>{data.name}</Headline>
          </Box>
          <Box direction='row' paddingX={4} alignX='center'>
            <Stack horizontal space={2} align='center' marginX={2}>
              <Ionicons
                name='business-outline'
                size={16}
                color={theme.colors.placeholder}
              />
              <Text>{data.expertise}</Text>
            </Stack>
            <Stack horizontal space={2} align='center' marginX={2}>
              <Ionicons
                name='briefcase-outline'
                size={16}
                color={theme.colors.placeholder}
              />
              <Text>{`${experience} Years`}</Text>
            </Stack>
            <Stack horizontal space={2} align='center' marginX={2}>
              <Ionicons
                name='star-outline'
                size={16}
                color={theme.colors.placeholder}
              />
              <Text>4.8</Text>
            </Stack>
          </Box>
          <Divider />
          <Box paddingX={4}>
            <Subheading style={{ color: theme.colors.primary }}>
              Description
            </Subheading>
            <Box direction='row' wrap='wrap' marginTop={2}>
              <Paragraph>{description}</Paragraph>
            </Box>
          </Box>
          <Box paddingX={4}>
            <Subheading style={{ color: theme.colors.primary }}>
              Expertise Skill
            </Subheading>
            <Box direction='row' wrap='wrap' marginTop={2}>
              {tags.map((tag) => (
                <Box key={tag} marginBottom={2} marginRight={2}>
                  <Chip style={styles.chip} textStyle={styles.tag}>
                    {tag.toUpperCase()}
                  </Chip>
                </Box>
              ))}
            </Box>
          </Box>
          <Box paddingX={4}>
            <Subheading style={{ color: theme.colors.primary }}>
              Availability
            </Subheading>
            <Box direction='row' wrap='wrap' marginTop={2}>
              <Stack space={2}>
                <Columns space={2}>
                  <Column>
                    <Text></Text>
                  </Column>
                  <Column width='1/5'>
                    <Text
                      style={[styles.fontBold, { color: theme.colors.primary }]}
                    >
                      Open
                    </Text>
                  </Column>
                  <Column width='1/5'>
                    <Text
                      style={[styles.fontBold, { color: theme.colors.primary }]}
                    >
                      Close
                    </Text>
                  </Column>
                  <Column width='content'>
                    <Ionicons
                      name='information-circle-outline'
                      size={16}
                      color={'white'}
                    />
                  </Column>
                </Columns>
                {AVAILABILITY.map((item) => (
                  <Columns space={2} key={item.day}>
                    <Column>
                      <Text
                        style={{
                          color: !item.isClosed
                            ? theme.colors.text
                            : theme.colors.disabled,
                          textTransform: 'capitalize',
                        }}
                      >
                        {item.day}
                      </Text>
                    </Column>
                    <Column width='1/5'>
                      <Text
                        style={{
                          color: !item.isClosed
                            ? theme.colors.text
                            : theme.colors.disabled,
                        }}
                      >
                        {item.open}
                      </Text>
                    </Column>
                    <Column width='1/5'>
                      <Text
                        style={{
                          color: !item.isClosed
                            ? theme.colors.text
                            : theme.colors.disabled,
                        }}
                      >
                        {item.close}
                      </Text>
                    </Column>
                    <Column width='content'>
                      <Ionicons
                        name={
                          !item.isClosed ? 'checkmark-outline' : 'close-outline'
                        }
                        size={16}
                        color={
                          !item.isClosed ? 'white' : theme.colors.placeholder
                        }
                      />
                    </Column>
                  </Columns>
                ))}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </ScrollView>
      <Divider />
      <Box padding={4}>
        <Button
          mode='contained'
          onPress={() => navigation.navigate('BookExpert', { data })}
          color={theme.colors.accent}
        >
          Make Appointment
        </Button>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: 128,
    height: 128,
    borderRadius: 16,
  },
  chip: {
    backgroundColor: '#fffbeb',
  },
  tag: {
    color: '#713f12',
    fontWeight: '700',
    fontSize: 11,
  },
  fontBold: {
    fontWeight: '700',
  },
});

export default Show;
