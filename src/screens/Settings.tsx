import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from "axios"
import Config from '../config.js';

const Settings = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const notImplemented = () => Alert.alert('', 'Not implemented');
  

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem("userID")
      if(id !== "0") {
      await axios.get(`${Config.API}/users/${id}`)
        .then(res=>{
          setEmail(res.data.email)
          setPassword(res.data.password)
        })
    } else {
      setEmail(''),
      setPassword('')
    }
  }
    fetchData()
    .catch(console.error)
  }, [])

  const handleUpdate = async () => {
    const id = await AsyncStorage.getItem("userID")
    if(id !== "0"){
    axios.put(`${Config.API}/users/${id}`, {
    email : email,
    password : password
  })
  Alert.alert('Update Succesful', 'Your information has been updated successfully!');}
  else{
    Alert.alert('User not logged in', 'You are currently not logged in')
  }
}
const logOut = async () =>{
  AsyncStorage.setItem("userID", "0")
  navigation.navigate('Landing')
}
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/splashcar.png')} style={styles.logo} />

      <Text style={styles.title}>Account Settings</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={notImplemented}>
        <Text style={styles.buttonText}>Change Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logOut}>
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