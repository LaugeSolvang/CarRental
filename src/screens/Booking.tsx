import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Button, Modal, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Config from '../config.js'

const Booking = ({ route, navigation }) => {

  const car = route.params ? route.params.car : null;  
  const IMAGE_URL = `${Config.IMAGE}/assets/images/${car.pictures[0].srcUrl}`;
  const carId = route?.params?.carId; // Optional chaining
  const [pickupLocation] = useState(false);
  const [startDate, setStartDate] = useState(); 
  const [endDate, setEndDate] = useState(); 
  const [isDriverAgeSlider, setIsDriverAgeSlider] = useState(false);
  const [purpose, setPurpose] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(''); // State to track selected location
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const locations = [
    { key: 'location1', label: 'Odense' },
    { key: 'location2', label: 'Copenhagen' },
    { key: 'location3', label: 'Aarhus' },
  ];



  const handleConfirmBooking = async () => {
    try {
      // Make a POST request to your backend API to add the booking
      const response = await fetch(`${Config.API}/bookingstest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation,
          startDate,
          endDate,
          isDriverAgeSlider,
          purpose,
          carId,
        }),
      });

      if (response.ok && isDriverAgeSlider ) {
        setModalVisible(true);
      } else {
        Alert.alert(
          'Booking Failed',
          'You need to be 25 or older, to book a car',
          [{ text: 'OK'}]
        );
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

  const handlePickupLocationPress = () => {
    setLocationModalVisible(true);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.label);
    setLocationModalVisible(false);
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
        <Text>Please choose pickup location:</Text>
        <TouchableOpacity onPress={handlePickupLocationPress}>
          <Text>{selectedLocation || 'Choose Location'}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isLocationModalVisible} onRequestClose={() => setLocationModalVisible(false)}>
        <View style={styles.locationModal}>
          <Text>Select Location</Text>
          {locations.map((location) => (
            <TouchableOpacity key={location.key} onPress={() => handleLocationSelect(location)}>
              <Text>{location.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.row}>
        <Text>Start Date:</Text>
        <TextInput
          style={styles.dateInput}
          placeholder="Type Date"
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
        />
      </View>

      <View style={styles.row}>
        <Text>End Date:</Text>
        <TextInput
          style={styles.dateInput}
          placeholder="Type Date"
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
        />
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
},
locationModal: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
dateInput: {
  flex: 1,
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginLeft: 10,
  paddingHorizontal: 10,
}
});

export default Booking;
