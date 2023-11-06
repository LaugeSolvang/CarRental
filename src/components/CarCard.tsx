import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const CarCard = ({ car }) => {

  const IMAGE_URL = `${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_IMAGE_PORT}/${car.pictures[0].srcUrl}`;
  return (
    <View style={styles.card}>
      <Image source={{ uri: IMAGE_URL }} style={styles.image} />
      <Text style={styles.carInfo}>
        {car.name} - {car.brand}
      </Text>
      <Text style={styles.description}>{car.description}</Text>
    </View>
  );
};

const LoadingCard = () => (
    <View style={[styles.card, styles.loadingCard]}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textPlaceholder} />
      <View style={styles.textPlaceholder} />
    </View>
  );
  

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'stretch', 
    width: 250,
    marginRight: 0,
    marginHorizontal: 8, 
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  carInfo: {
    padding: 4,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    padding: 4,
    fontSize: 14,
    color: '#666',
  },
  loadingCard: {
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  imagePlaceholder: {
    backgroundColor: '#ddd', // light gray color for the image placeholder
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textPlaceholder: {
    height: 20,
    backgroundColor: '#ddd', // light gray color for the text placeholder
    marginTop: 10,
    borderRadius: 5,
  },

});

export { CarCard, LoadingCard };
