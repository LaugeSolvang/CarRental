import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import {theme} from '../theme/theme.js';
import NavigationPrompt from '../components/NavigationPromt';
import Config from '../config.js';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const API_URL = `${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_JSON_PORT}`;

  const handleLogin = async () => {
    // Input validation
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
  
    // Here we call the API to get the list of users
    try {
      const response = await fetch(`${Config.API}/users`);
      const users = await response.json();
  
      // Here we check if the user exists
      const user = users.find((u) => u.email === email && u.password === password);
  
      if (user) {
        console.log('Login successful:', user);
        navigation.navigate('Main', {
            screen: 'Home',
          });
      } else {
        Alert.alert("Login Failed", "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Login Error", "An error occurred during login.");
    }
  };

  return (
    <View style={theme.styles.container}>
     <Image source={require('../../assets/icons/splashcar.png')} style={theme.styles.logo} />

      <Text style={theme.styles.title}>Login to your account</Text>
      <TextInput
        style={theme.styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={theme.styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity
        style={theme.styles.button}
        onPress={handleLogin}>
        <Text style={theme.styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <NavigationPrompt
        navigation={navigation}
        promptText="Don't have an account?"
        actionText="Sign Up"
        targetScreen="SignUp"/>
    </View>
  );
};

export default Login;
