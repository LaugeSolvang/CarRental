import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import NavigationPrompt from '../components/NavigationPromt';
import {theme} from '../theme/theme.js';
import Config from '../config.js';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  
    const handleSignUp = async () => {
      // Perform input validation as needed here (e.g., check that email and password are not empty)
  
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password.");
        return;
      }

      try {
        const usersResponse = await fetch(`${Config.API}/users`);
        const users = await usersResponse.json();
        const emailExists = users.some(user => user.email === email);
    
        if (emailExists) {
          Alert.alert("Error", "Email already in use. Please use a different email.");
          return;
        }
      } catch (error) {
        console.error('Error checking existing users:', error);
        Alert.alert("Error", "An error occurred while checking existing users.");
        return;
      }

      try {
        const response = await fetch(`${Config.API}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.status === 201) {
          navigation.navigate('Main', {
            screen: 'Home',
          });
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
        Alert.alert("Error", "An error occurred during sign up.");
      }
    };

  return (
    <View style={theme.styles.container}>
      <Image source={require('../../assets/icons/splashcar.png')} style={theme.styles.logo} />

      <Text style={theme.styles.title}>Sign Up</Text>
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
        onPress={handleSignUp}>
        <Text style={theme.styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <NavigationPrompt
        navigation={navigation}
        promptText="Already have an account?"
        actionText="Login"
        targetScreen="Login"
      />
    </View>
  );
};

export default SignUp;
