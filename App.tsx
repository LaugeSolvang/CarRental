import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Splash from './src/screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/components/BottomTabNavigator'; 


const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);  // hide splash after 3 seconds
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;