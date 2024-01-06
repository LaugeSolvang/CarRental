import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image} from 'react-native';
import Home from '../screens/Home';
import Overview from '../screens/Overview';
import Settings from '../screens/Settings';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home" // Set the initial route to Home
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Overview') return <Image source={require('../../assets/icons/Overview.png')} />;
          if (route.name === 'Search') return <Image source={require('../../assets/icons/Search.png')} />;
          if (route.name === 'Home') return <Image source={require('../../assets/icons/Home.png')} />;
          if (route.name === 'Settings') return <Image source={require('../../assets/icons/Settings.png')} />;
          return null;
        },
      })}
    
    >
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
