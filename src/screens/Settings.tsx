import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
//import { theme } from '../theme/theme';

const Settings: React.FC = () => {
  const [text, onChangeText] = React.useState('');
  const [text1, onChangeText1] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const notImplemented = () =>  Alert.alert('', 'not implemented')

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonText}>First Name</Text>
        <TextInput style={styles.textField} onChangeText={onChangeText} value={text} placeholder='Thomas   '/> 
        <Text style={styles.buttonText}>Last Name</Text>
        <TextInput style={styles.textField} onChangeText={onChangeText1} value={text1} placeholder='Johnson  '/>
        <Text style={styles.buttonText}>Email          </Text> 
        <TextInput style={styles.textField} onChangeText={onChangeText2} value={text2} placeholder='john@mail'/>
        <Text/>
        <Button onPress={notImplemented} title='Change Theme'></Button>
        <Text/>
        <Button onPress={notImplemented} title='Log Out'></Button>
        
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    textField:{
      paddingRight: 240,
      borderWidth:0.5,
    },
  
    buttonText: {
      marginVertical: 10,
      paddingRight: 225, 
    },
  });

export default Settings;