import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {theme} from '../theme/theme.js';
import NavigationPrompt from '../components/NavigationPromt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = ({ navigation }) => {
  
  useEffect(() => {
    const resetID = async () => {
      AsyncStorage.setItem("userID", "0")
    } 
    resetID()
      .catch(console.error);
  }, [])

  return (
    <View style={theme.styles.container}>
      <Image source={require('../../assets/icons/splashcar.png')} style={theme.styles.logo} />

      <TouchableOpacity
        style={theme.styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={theme.styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={theme.styles.button}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={theme.styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or With</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity onPress={() => {}} style={styles.socialButton}>
          <Image
            style={styles.socialIcon}
            source={require('../../assets/icons/Google.png')} // Adjust the source path as needed
          />
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.socialButton}>
          <Image
            style={styles.socialIcon}
            source={require('../../assets/icons/Facebook.png')} // Adjust the source path as needed
          />
          <Text style={styles.socialText}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <NavigationPrompt
        navigation={navigation}
        promptText="Or explore our app"
        actionText="without an account."
        targetScreen="Main"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'lightgray',
  },
  orText: {
    marginHorizontal: 10,
  },
   socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', 
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8, 
  },
  socialText: {
    fontWeight: 'bold', 
  },
});

export default LandingPage;
