import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Detail = () => {
  const navigation = useNavigation();

  const handleBookCar = () => {
    // Navigate to the Booking screen when the "Book Car" button is pressed
    navigation.navigate('Booking');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Car Details</Text>
      {/* Add car details or any other content here if needed */}
      <TouchableOpacity style={styles.button} onPress={handleBookCar}>
        <Text style={styles.buttonText}>Book Car</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Detail;
