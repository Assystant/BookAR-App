import React from 'react';
import {StyleSheet, View, ActivityIndicator, StatusBar} from 'react-native';
import constants from '../../utils/constant';
const SplashScreen = () => (
  <View style={styles.splashWrapper}>
    <StatusBar
      translucent
      barStyle="light-content"
      backgroundColor={constants.DARK_COLOR}
    />
    <ActivityIndicator size="large" color={constants.WHITE} />
  </View>
);
export default SplashScreen;

const styles = StyleSheet.create({
  splashWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: constants.DARK_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
