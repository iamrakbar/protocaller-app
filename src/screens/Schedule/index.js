import { Image, ScrollView, StyleSheet } from 'react-native';
import { Box, Column, Columns, Stack } from '@mobily/stacks';
import {
  Button,
  Caption,
  Card,
  Colors,
  Divider,
  List,
  Paragraph,
  Subheading,
  Text,
  Title,
} from 'react-native-paper';
import { format, isPast } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import theme from '../../utils/theme';

import { APPOINTMENTS } from '../../faker';

const Appointment = ({ route, navigation }) => {
  return (
    <Screen style={{ paddingBottom: 80 }}>
      <ScrollView style={styles.container}>
        <Stack space={4}>
          <List.Section>
            <List.Subheader>Upcoming</List.Subheader>
            <Box paddingX={4}>
              <Card>
                <Card.Content>
                  <Columns space={4}>
                    <Column>
                      <Box>
                        <Text>{APPOINTMENTS.upcoming.name}</Text>
                        <Caption>{APPOINTMENTS.upcoming.topic}</Caption>
                        <Caption style={styles.textDate}>
                          {format(
                            APPOINTMENTS.upcoming.date,
                            'd MMMM yyyy, HH:mm'
                          )}
                        </Caption>
                      </Box>
                    </Column>
                    <Column width='content'>
                      <Image
                        style={styles.avatar}
                        source={{ uri: APPOINTMENTS.upcoming.avatar }}
                      />
                    </Column>
                  </Columns>
                  <Box alignX='right' marginTop={2}>
                    <Stack horizontal space={2} marginTop={2}>
                      <Button
                        mode='outlined'
                        icon={({ size, color }) => (
                          <Ionicons
                            name='calendar-outline'
                            size={size}
                            color={color}
                          />
                        )}
                        color={theme.colors.text}
                        onPress={() => {}}
                        uppercase={false}
                        style={styles.buttonCall}
                      >
                        Add to Calendar
                      </Button>
                      <Button
                        mode='contained'
                        icon={({ size, color }) => (
                          <Ionicons name='videocam' size={size} color={color} />
                        )}
                        color={Colors.green600}
                        onPress={() => navigation.navigate('Call')}
                        uppercase={false}
                        style={styles.buttonCall}
                      >
                        Call
                      </Button>
                    </Stack>
                  </Box>
                </Card.Content>
              </Card>
            </Box>
          </List.Section>
          <List.Section>
            <List.Subheader>Past Appointment</List.Subheader>
            <Box paddingX={4}>
              {APPOINTMENTS.past.map((item) => (
                <Columns key={item.id} space={4} paddingY={2}>
                  <Column>
                    <Box>
                      <Text>{item.name}</Text>
                      <Caption>{item.topic}</Caption>
                      <Caption style={styles.textDate}>
                        {format(item.date, 'd MMMM yyyy, HH:mm')}
                      </Caption>
                    </Box>
                  </Column>
                  <Column width='content'>
                    <Image
                      style={styles.avatar}
                      source={{ uri: item.avatar }}
                    />
                  </Column>
                </Columns>
              ))}
            </Box>
          </List.Section>
        </Stack>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  textDate: { color: theme.colors.text },
  buttonCall: {
    fontSize: 11,
  },
});

export default Appointment;
