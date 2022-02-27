import { Image, ScrollView, StyleSheet } from 'react-native';
import { Box, Column, Columns, Stack, Tiles, useStacks } from '@mobily/stacks';
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
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import theme from '../../utils/theme';
import { useCallback, useState } from 'react';
import { addDays, addWeeks, formatISO, parseISO, subWeeks } from 'date-fns';

const TIMES = [
  { id: 1, time: '07:00' },
  { id: 2, time: '09:00' },
  { id: 3, time: '11:00' },
  { id: 4, time: '13:00' },
  { id: 5, time: '15:00' },
  { id: 6, time: '17:00' },
  { id: 7, time: '19:00' },
  { id: 8, time: '21:00' },
];

const currentDate = new Date();

const getMarkedDates = (date) => {
  const obj = {};
  obj[formatISO(date, { representation: 'date' })] = {
    customStyles: {
      container: {
        backgroundColor: theme.colors.accent,
        elevation: 2,
      },
      text: {
        color: theme.colors.text,
      },
    },
  };
  return obj;
};

const Book = ({ route, navigation }) => {
  const { data } = route.params;
  const [timeSelected, setTimeSelected] = useState(1);
  const [dateSelected, setDateSelected] = useState(currentDate);

  const setTimeSelectedCall = useCallback((id) => setTimeSelected(id));
  const onDayPressCall = useCallback((day) =>
    setDateSelected(parseISO(day.dateString))
  );

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Stack space={4} paddingY={4}>
          <Columns space={4} alignY='center' paddingX={4} paddingY={2}>
            <Column width='content'>
              <Image
                style={styles.image}
                source={{
                  uri: data.avatar,
                }}
              />
            </Column>
            <Column>
              <Box direction='row' alignX='between' alignY='center'>
                <Subheading>{data.name}</Subheading>
                <Stack horizontal space={1} align='center'>
                  <Ionicons name='star' size={16} color={Colors.yellow700} />
                  <Caption style={{ color: Colors.yellow700 }}>4.9</Caption>
                </Stack>
              </Box>
              <Box direction='row' alignX='between' alignY='center'>
                <Caption>{data.expertise}</Caption>
                <Caption>100rb / hr</Caption>
              </Box>
            </Column>
          </Columns>
          <Divider />
          <Box paddingX={4}>
            <Subheading style={{ color: theme.colors.primary }}>
              Choose date
            </Subheading>
            <Box marginTop={2}>
              <Calendar
                minDate={formatISO(currentDate, {
                  representation: 'date',
                })}
                maxDate={formatISO(addWeeks(currentDate, 1), {
                  representation: 'date',
                })}
                hideExtraDays={true}
                onMonthChange={(month) => {
                  console.log('month changed', month);
                }}
                onDayPress={onDayPressCall}
                markingType={'custom'}
                markedDates={getMarkedDates(dateSelected)}
                theme={{
                  textMonthFontWeight: 'bold',

                  arrowColor: theme.colors.accent,
                  todayTextColor: theme.colors.primary,
                }}
              />
            </Box>
          </Box>
          <Box paddingX={4}>
            <Subheading style={{ color: theme.colors.primary }}>
              Pick a time
            </Subheading>
            <Tiles space={4} columns={3} marginTop={2}>
              {TIMES.map(({ id, time, selected }) => (
                <Button
                  key={id}
                  mode={id === timeSelected ? 'contained' : 'outlined'}
                  color={
                    id === timeSelected
                      ? theme.colors.accent
                      : theme.colors.text
                  }
                  onPress={() => setTimeSelectedCall(id)}
                >
                  {time}
                </Button>
              ))}
            </Tiles>
          </Box>
        </Stack>
      </ScrollView>
      <Box padding={4}>
        <Button
          mode='contained'
          onPress={() => navigation.navigate('Schedule', { data })}
          color={Colors.green600}
        >
          Submit
        </Button>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fontBold: {
    fontWeight: '700',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
});

export default Book;
