import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/splashcar.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200, // or whatever your logo's size is
    height: 200, // or whatever your logo's size is
    resizeMode: 'contain'
  }
});

export default SplashScreen;
