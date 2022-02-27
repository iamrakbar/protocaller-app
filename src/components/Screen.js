import { StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen = ({ style, children, ...rest }) => {
  const headerHeight = useHeaderHeight();

  const edges = ['left', 'right'];

  if (headerHeight === 0) edges.push('top');

  return (
    <SafeAreaView style={[styles.container, style]} {...{ edges }} {...rest}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Screen;
