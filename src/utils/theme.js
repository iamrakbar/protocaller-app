import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';

export default theme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 16,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#2563eb',
    accent: '#fbbf24',
    text: '#0f172a',
    placeholder: '#94a3b8',
    border: '#94a3b8',
  },
};
