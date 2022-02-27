import { ScrollView, StyleSheet } from 'react-native';
import { Box, Column, Columns, Stack } from '@mobily/stacks';
import {
  Avatar,
  Caption,
  Colors,
  Divider,
  IconButton,
  List,
  Text,
  Title,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import theme from '../../utils/theme';

const ACCOUNTS = [
  { id: 1, title: 'Manage Account', icon: 'person-circle-outline', link: null },
  { id: 2, title: 'Change Password', icon: 'lock-closed-outline', link: null },
  { id: 3, title: 'Notification', icon: 'notifications-outline', link: null },
];

const INFORMATIONS = [
  { id: 1, title: 'Help', icon: 'help-buoy-outline', link: null },
  {
    id: 2,
    title: 'Privacy Policy',
    icon: 'shield-checkmark-outline',
    link: null,
  },
  {
    id: 3,
    title: 'Terms of Service',
    icon: 'document-text-outline',
    link: null,
  },
  { id: 4, title: 'Rate Us', icon: 'star-outline', link: null },
  { id: 5, title: 'Contact Us', icon: 'mail-outline', link: null },
];

const Account = () => {
  return (
    <Screen light style={{ paddingBottom: 80 }}>
      <ScrollView>
        <Stack space={4}>
          <Box padding={4}>
            <Columns space={4}>
              <Column width='content'>
                <Avatar.Image
                  size={64}
                  source={{
                    uri: 'https://en.gravatar.com/userimage/1091358/4ca83cf7a123ecfab62c0f62568b26f2?size=200',
                  }}
                />
              </Column>
              <Column>
                <Title>R. Akbar</Title>
                <Text>+628123456789</Text>
                <Text>mail@domain.com</Text>
              </Column>
              <Column width='content'>
                <IconButton
                  icon='pencil'
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
              </Column>
            </Columns>
          </Box>

          <List.Section>
            <List.Subheader>Account</List.Subheader>
            {ACCOUNTS.map(({ id, title, icon }) => (
              <Box key={id}>
                <List.Item
                  title={title}
                  left={() => (
                    <Box paddingX={4} alignY='center'>
                      <Ionicons
                        name={icon}
                        size={24}
                        color={theme.colors.placeholder}
                      />
                    </Box>
                  )}
                />
                <Divider inset />
              </Box>
            ))}
          </List.Section>

          <List.Section>
            <List.Subheader>Informations</List.Subheader>
            {INFORMATIONS.map(({ id, title, icon }) => (
              <Box key={id}>
                <List.Item
                  title={title}
                  left={() => (
                    <Box paddingX={4} alignY='center'>
                      <Ionicons
                        name={icon}
                        size={24}
                        color={theme.colors.placeholder}
                      />
                    </Box>
                  )}
                />
                <Divider inset />
              </Box>
            ))}
          </List.Section>
        </Stack>
      </ScrollView>
    </Screen>
  );
};

export default Account;

const styles = StyleSheet.create({});
