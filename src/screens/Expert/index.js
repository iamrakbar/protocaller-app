import { FlatList, StyleSheet, View } from 'react-native';
import { Box, Column, Columns, Stack } from '@mobily/stacks';
import {
  Button,
  Title,
  Paragraph,
  TextInput,
  Searchbar,
  IconButton,
  Divider,
  List,
} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { Ionicons } from '@expo/vector-icons';

import Screen from '../../components/Screen';
import ExpertListItem from '../../components/ExpertListItem';

import { EXPERTS, TOPICS } from '../../faker';
import faker from '@faker-js/faker/locale/id_ID';
import { useCallback } from 'react';

const renderExpertItem = ({ item }) => <ExpertListItem item={item} />;
const renderTopicItem = ({ item }) => (
  <List.Item
    title={item.title}
    description={faker.lorem.sentence()}
    left={(props) => (
      <Box alignY='center' alignX='center' paddingLeft={4}>
        <Ionicons {...props} name={item.icon} size={28} color={item.color} />
      </Box>
    )}
  />
);
const renderHeader = () => (
  <Box padding={4} alignY='center'>
    <Columns space={2} alignY='center'>
      <Column>
        <Searchbar placeholder='Search' />
      </Column>
      <Column width='content'>
        <IconButton
          icon='filter-variant'
          size={24}
          onPress={() => console.log('Pressed')}
        />
      </Column>
    </Columns>
  </Box>
);
const renderDivider = () => <Divider inset={true} />;
const keyExtractor = (item, index) => item.id.toString();

const Consult = ({ navigation }) => {
  return (
    <Screen style={{ paddingBottom: 80 }}>
      <Tabs
        // defaultIndex={0} // default = 0
        uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        style={{ backgroundColor: '#fff' }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        // onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        // disableSwipe={true} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label='Topics' icon='format-list-bulleted-type'>
          <List.Section>
            <List.Subheader>Broad selection of topic</List.Subheader>
            <FlatList
              data={TOPICS}
              renderItem={renderTopicItem}
              ItemSeparatorComponent={renderDivider}
              keyExtractor={keyExtractor}
            />
          </List.Section>
        </TabScreen>
        <TabScreen label='Experts' icon='account-tie-outline'>
          <FlatList
            data={EXPERTS}
            renderItem={renderExpertItem}
            ListHeaderComponent={renderHeader}
            ItemSeparatorComponent={renderDivider}
            keyExtractor={keyExtractor}
          />
        </TabScreen>
      </Tabs>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Consult;
