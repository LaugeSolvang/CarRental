import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Button, Modal, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Config from '../config.js'

const Booking = ({ route, navigation }) => {
    const car = route.params ? route.params.car : null;
    
  const IMAGE_URL = `${Config.IMAGE}/assets/images/_ca6150f6-6250-48f3-a90c-c9cb04f7dcf3.jfif`
  
  console.log(IMAGE_URL);

  const carId = route?.params?.carId; // Optional chaining
  const [returnToSameLocation, setReturnToSameLocation] = useState(false);
  const [startDate, setStartDate] = useState('Choose Date'); // Placeholder text
  const [endDate, setEndDate] = useState('Choose Date'); // Placeholder text
  const [isDriverAgeSlider, setIsDriverAgeSlider] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirmBooking = async () => {
    try {
      // Make a POST request to your backend API to add the booking
      const response = await fetch(`${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_JSON_PORT}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          returnToSameLocation,
          startDate,
          endDate,
          isDriverAgeSlider,
          purpose,
          carId,
        }),
      });

      if (response.ok) {
        setModalVisible(true);
      } else {
        console.error('Booking failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const handleModalClose = ({}) => {
    setModalVisible(false);
  };

  const handleBackPress = () => {
    navigation.goBack(); // This will navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
          <Image source={{ uri: IMAGE_URL }} style={styles.image} />
        </ScrollView>

      <View style={styles.row}>
        <Text>Return to Same Location</Text>
        <Switch
          value={returnToSameLocation}
          onValueChange={() => setReturnToSameLocation(!returnToSameLocation)}/>
        </View>


      <View style={styles.row}>
        <Text>Start Date: {startDate}</Text>
      </View>

      <View style={styles.row}>
        <Text>End Date: {endDate}</Text>
      </View>

      <View style={styles.row}>
        <Text>Driver Age (25-70)</Text>
        <Switch
          value={isDriverAgeSlider}
          onValueChange={() => setIsDriverAgeSlider(!isDriverAgeSlider)}
        />
      </View>

      <View style={styles.row}>
        <Text>Purpose of the Rental</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="Business"
            status={purpose === 'Business' ? 'checked' : 'unchecked'}
            onPress={() => setPurpose('Business')}
          />
          <Text>Business</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="Personal"
            status={purpose === 'Personal' ? 'checked' : 'unchecked'}
            onPress={() => setPurpose('Personal')}
          />
          <Text>Personal</Text>
        </View>
      </View>

      <Button title="Confirm Booking" onPress={handleConfirmBooking} />

      <Modal visible={isModalVisible} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <Text>Booking Successful!</Text>
          <Button title="Return to Overview" onPress={() => navigation.navigate('Overview')} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    // Adjust the color to match your theme
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
}
});

export default Booking;
