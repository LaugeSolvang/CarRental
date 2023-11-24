import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { CarCard } from '../components/CarCard';

const Details = ({ route }) => {
    const car = route.params ? route.params.car : null;

  const IMAGE_URL = `${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_IMAGE_PORT}/assets/images/${car.pictures[0].srcUrl}`;

  return (
    <View style={styles.details}>
        {/*<Image source={{ uri: IMAGE_URL }} style={styles.image} defaultSource={require('path-to-placeholder-image')} />*/}
        <Text style={styles.carInfo}>{car.name} - {car.brand}</Text>
        <Text style={styles.description}>{car.description}</Text>
        {/* Additional details can be added here */}
        {/* <CarCard car={car} /> */}
    </View>
);
};
const styles = StyleSheet.create({
    details: {
        backgroundColor: '#F0F0F0', // Updated background color
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        width: '90%',
        marginRight: 0,
        marginHorizontal: 20,
        padding: 10,
        elevation: 3, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    carInfo: {
        padding: 8,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333333', // Darker font color for better readability
    },
    description: {
        padding: 8,
        fontSize: 16,
        color: '#555555', // Slightly darker color for description
    },
});

export default Details;