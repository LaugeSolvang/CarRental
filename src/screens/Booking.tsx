import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Button, Modal, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Config from '../config.js'
import DateTimePicker from '@react-native-community/datetimepicker';


const Booking = ({ route, navigation }) => {

  const car = route.params ? route.params.car : null;  
  const IMAGE_URL = `${Config.IMAGE}/assets/images/${car.pictures[0].srcUrl}`;
  const carId = car.id; // Optional chaining
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isDriverAgeSlider, setIsDriverAgeSlider] = useState(false);
  const [purpose, setPurpose] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const [pickupLocation, setPickupLocation] = useState(''); // State for pickup location
  const [dropoffLocation, setDropoffLocation] = useState(''); // State for drop-off location
  const [isLocationModalVisible, setLocationModalVisible] = useState(false); // Modal visibility for pickup location
  const [isDropoffLocationModalVisible, setDropoffLocationModalVisible] = useState(false); // Modal visibility for drop-off location

  const locations = [
    { key: 'location1', label: 'Odense' },
    { key: 'location2', label: 'Copenhagen' },
    { key: 'location3', label: 'Aarhus' },
  ];


  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };
  
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };
  
  const handleDropoffLocationPress = () => {
    setDropoffLocationModalVisible(true);
  };

  const handleDropoffLocationSelect = (location) => {
    setDropoffLocation(location.label);
    setDropoffLocationModalVisible(false);
  };

  const handleLocationSelect = (location) => {
    setPickupLocation(location.label); // Update pickup location
    setLocationModalVisible(false);
  };
  

  const handleConfirmBooking = async () => {
    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();

    try {
      // Make a POST request to your backend API to add the booking
      const response = await fetch(`${Config.API}/bookingstest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pickupLocation,
          dropoffLocation, 
          formattedStartDate,
          formattedEndDate,
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
          <Text>{pickupLocation || 'Choose Location'}</Text>
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
        <Text>Please choose drop-off location:</Text>
        <TouchableOpacity onPress={handleDropoffLocationPress}>
          <Text>{dropoffLocation || 'Choose Location'}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for selecting drop-off location */}
      <Modal visible={isDropoffLocationModalVisible} onRequestClose={() => setDropoffLocationModalVisible(false)}>
        <View style={styles.locationModal}>
          <Text>Select Drop-off Location</Text>
          {locations.map((location) => (
            <TouchableOpacity key={location.key} onPress={() => handleDropoffLocationSelect(location)}>
              <Text>{location.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setDropoffLocationModalVisible(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.row}>
  <Text>Start Date:</Text>
  <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
    <Text>{startDate.toISOString()}</Text>
  </TouchableOpacity>
</View>
{showStartDatePicker && (
  <DateTimePicker
    value={startDate}
    mode="date"
    display="default"
    onChange={onStartDateChange}
  />
)}

<View style={styles.row}>
  <Text>End Date:</Text>
  <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
    <Text>{endDate.toISOString()}</Text>
  </TouchableOpacity>
</View>
{showEndDatePicker && (
  <DateTimePicker
    value={endDate}
    mode="date"
    display="default"
    onChange={onEndDateChange}
  />
)}

    
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
