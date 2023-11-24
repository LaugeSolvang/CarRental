import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Booking = ({ route }) => {
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

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Return to Same Location</Text>
        <Switch
          value={returnToSameLocation}
          onValueChange={() => setReturnToSameLocation(!returnToSameLocation)}
        />
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
          <Button title="Close" onPress={handleModalClose} />
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
});

export default Booking;
