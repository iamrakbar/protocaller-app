import { Dimensions, StyleSheet } from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  max: {
    flex: 1,
    position: 'relative',
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonHolderMin: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0093E9',
    borderRadius: 36,
  },
  buttonStart: {
    backgroundColor: '#28ba62',
  },
  buttonEnd: {
    backgroundColor: '#cf3c4f',
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 96,
    height: 96,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  copyright: {
    marginTop: 16,
  },
  copyrightText: {
    color: '#a1a1a1',
  },
  waterMark: {
    position: 'absolute',
    top: 20,
    height: 100,
    alignItems: 'center',
    width: '100%',
  },
  watermarkText: {},
});
