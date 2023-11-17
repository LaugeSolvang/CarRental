import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import Landing from './src/screens/Landing';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import BottomTabNavigator from './src/components/BottomTabNavigator'; 
import Booking from './src/screens/Booking'
import Details from './src/screens/Details'

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 3000); // splash screen duration
  }, []);

  if (!isReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
