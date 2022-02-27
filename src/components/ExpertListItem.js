import { useCallback } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Column, Columns, Stack } from '@mobily/stacks';
import {
  Avatar,
  Caption,
  Subheading,
  Colors,
  Text,
  Chip,
  TouchableRipple,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ExpertListItem = ({ item }) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('ShowExpert', { data: item });
  });

  return (
    <TouchableRipple onPress={onPress} rippleColor='rgba(0, 0, 0, .32)'>
      <Columns space={4} alignY='center' paddingX={4} paddingY={2}>
        <Column width='content'>
          <Image
            style={styles.image}
            source={{
              uri: item.avatar,
            }}
          />
        </Column>
        <Column>
          <Box direction='row' alignX='between' alignY='center'>
            <Subheading>{item.name}</Subheading>
            <Stack horizontal space={1} align='center'>
              <Ionicons name='star' size={16} color={Colors.yellow700} />
              <Caption style={{ color: Colors.yellow700 }}>4.9</Caption>
            </Stack>
          </Box>
          <Box direction='row' alignX='between' alignY='center'>
            <Caption>{item.expertise}</Caption>
            <Caption>100rb / hr</Caption>
          </Box>
        </Column>
      </Columns>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  fontBold: {
    fontWeight: '700',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
});

export default ExpertListItem;
