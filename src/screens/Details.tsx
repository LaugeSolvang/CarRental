import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Config from '../config.js'


const Details = ({ route, navigation }) => {
    const car = route.params ? route.params.car : null;

  const IMAGE_URL = `${Config.IMAGE}/assets/images/${car.pictures[0].srcUrl}`;
  
  const handlePress = () => {
    // Replace 'TargetScreen' with the name of the screen you want to navigate to
    navigation.navigate('Booking', { carId: car.id });
  };

  const [showEngineDetails, setShowEngineDetails] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const toggleEngineDetails = () => {
    setShowEngineDetails(!showEngineDetails);
  };

  const toggleTechnicalDetails = () => {
    setShowTechnicalDetails(!showTechnicalDetails);
  };

  return (
    <View style={styles.details}>
        <Image source={{ uri: IMAGE_URL }} style={styles.image} />
        <Text style={styles.carInfo}>{car.name} - {car.brand}</Text>
        <Text style={styles.description}>{car.description}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Book Car</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={toggleEngineDetails} style={styles.engineTitle}>
                <Text style={styles.title}>Engine</Text>
                <Text style={styles.dropdownArrow}>{showEngineDetails ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {showEngineDetails && (
                <View style={styles.engineDetails}>
                    <Text>Horsepower: {car.engine.horsePower}</Text>
                    <Text>Cylinders: {car.engine.cylinders}</Text>
                    <Text>Volume: {car.engine.volume}</Text>
                    <Text>Max RPM: {car.engine.maxRPM}</Text>
                </View>
            )}

<TouchableOpacity style={styles.titleContainer} onPress={toggleTechnicalDetails}>
        <Text style={styles.title}>Technical Details</Text>
        <Text style={styles.dropdownArrow}>{showTechnicalDetails ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {showTechnicalDetails && (
        <View style={styles.technicalDetails}>
          <Text>Weight: {car.weight} kg</Text>
          <Text>Acceleration: {car.acceleration} sec to 100 km/h</Text>
          <Text>Wheel Count: {car.wheelCount}</Text>
          <Text>Type: {car.type}</Text>
          <Text>Door Count: {car.doorCount}</Text>
          <Text>Manufacturing Year: {car.manufacturingYear}</Text>
          <Text>Top Speed: {car.topSpeed} km/h</Text>
        </View>
      )}
    </View>
);
};
const styles = StyleSheet.create({
    details: {
        marginVertical: 10,
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff', // Bootstrap primary blue
        padding: 15,
        borderRadius: 5,
        elevation: 3, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    engineTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // This will ensure the title and arrow are spaced nicely.
        padding: 8,
        borderBottomWidth: 1, // Add a line to indicate it's clickable
        borderBottomColor: '#ccc', // Use a light color for the line
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18, // You may increase the font size a bit for better readability
        color: '#333', // A darker color for the title for emphasis
    },
    dropdownArrow: {
        fontSize: 14, // Adjust the size to your preference
        color: '#333', // You can choose a different color if you like
        marginLeft: 5, // Add some space between the title and the arrow
    },
    engineDetails: {
        padding: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      technicalDetails: {
        padding: 8,
        // Any other styles for the technical details section
      },
});

export default Details;
