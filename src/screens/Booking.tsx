import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton component

const Booking = ({ route }) => {
  const carId = route?.params?.carId; // Optional chaining
  const [returnToSameLocation, setReturnToSameLocation] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isDriverAgeSlider, setIsDriverAgeSlider] = useState(false);
  const [purpose, setPurpose] = useState(''); // Updated to use a single state for purpose
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleConfirmBooking = () => {
    setModalVisible(true);
    // Additional logic for confirming the booking
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
        <Text>Start Date</Text>
        <TouchableOpacity onPress={() => {/* Placeholder action */}}>
          <Text>Choose Date</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text>End Date</Text>
        <TouchableOpacity onPress={() => {/* Placeholder action */}}>
          <Text>Choose Date</Text>
        </TouchableOpacity>
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
