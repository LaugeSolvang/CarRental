import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Config from '../config.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookingCard = ({ booking }) => {
  const [carDetails, setCarDetails] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      const details = await getCarDetails(booking.carId);
      setCarDetails(details);
    };

    fetchCarDetails();
  }, [booking.carId]);

  if (!carDetails) {
    return <Text>Loading car details...</Text>; // Or any other loading placeholder
  }

  const IMAGE_URL = carDetails ? `${Config.IMAGE}/assets/images/${carDetails.pictures[0].srcUrl}` : 'default_image_url';

  const dateTimeOptions = {
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: IMAGE_URL }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.carModel}>{carDetails.name} - {carDetails.brand}</Text>
        <View style={styles.dateGroup}>
          <Text style={styles.startDate}>
            {new Date(booking.formattedStartDate).toLocaleString([], dateTimeOptions)}
          </Text>
          <Text style={styles.location}>{booking.pickupLocation}</Text>
        </View>
        <View style={styles.dateGroup}>
          <Text style={styles.endDate}>
            {new Date(booking.formattedEndDate).toLocaleString([], dateTimeOptions)}
          </Text>
          <Text style={styles.location}>{booking.dropoffLocation}</Text>
        </View>
      </View>
    </View>
  );
};

const getCarDetails = async (carId) => {
  try {
    const savedCars = await AsyncStorage.getItem('cars');
    const cars = savedCars != null ? JSON.parse(savedCars) : [];

    // Find the car with the matching ID
    const carDetails = cars.find(car => car.id === carId);
    return carDetails;

  } catch (error) {
    console.error('Error fetching car details: ', error);
    return null; // or you could return a default object or handle the error as needed
  }
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', 
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
        marginHorizontal: 8, 
      },
      image: {
        width: 100, 
        height: 100, 
        borderRadius: 8, 
        margin: 10,
      },
      textContainer: {
        flex: 1, 
        padding: 10,
      },
  carModel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#333333',
  },
  location: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  dateGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

export default BookingCard;