import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const notImplemented = () => Alert.alert('', 'Not implemented');

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/splashcar.png')} style={styles.logo} />

      <Text style={styles.title}>Account Settings</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={notImplemented}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={notImplemented}>
        <Text style={styles.buttonText}>Change Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={notImplemented}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor:'#5D3FD3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Settings;