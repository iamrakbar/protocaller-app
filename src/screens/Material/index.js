import { StyleSheet } from 'react-native';
import { Box } from '@mobily/stacks';
import { Title } from 'react-native-paper';

import Screen from '../../components/Screen';

const Material = () => {
  return (
    <Screen>
      <Box flex='fluid' alignX='center' alignY='center' padding={4}>
        <Title>Material</Title>
      </Box>
    </Screen>
  );
};

export default Material;

const styles = StyleSheet.create({});
