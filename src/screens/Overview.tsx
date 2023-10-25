import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import bookingsData from '../database/bookings.json'

const data = [
    {
      id: '1',
      car: 'Toyato Camry 2020 4WD',
      pickup: '12:30 Friday 13. Oct 2023',
      dropoff: '09:30 Friday 27. Oct 2023',
      location: 'Odense',
    },
    // ... more data entries
  ];
  
  const Overview = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Current rental</Text>
        <FlatList
          data={[bookingsData[0]]} // Only showing the first item for current rental
          renderItem={({ item }) => <RentalCard rental={item} />}
          keyExtractor={item => item.id}
        />
  
        <Text style={styles.header}>Rentals</Text>
        <FlatList
          data={bookingsData.slice(1)} // All other items except the first one
          renderItem={({ item }) => <RentalCard rental={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

const RentalCard = ({ rental }) => {
  return (
    <View style={styles.card}>
      <Text>{rental.car}</Text>
      <Text>{rental.pickup}</Text>
      <Text>{rental.location}</Text>
      <Text>{rental.dropoff}</Text>
      <Text>{rental.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default Overview;
