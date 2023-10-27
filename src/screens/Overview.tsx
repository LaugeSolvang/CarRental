import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Overview = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_JSON_PORT}`;

  useEffect(() => {
    fetch(`${API_URL}/bookings`)
          .then(response => response.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current rental</Text>
      <FlatList
        data={bookings.slice(0, 1)} // This ensures only the first item is taken
        renderItem={({ item }) => <RentalCard rental={item} />}
        keyExtractor={item => item.id}
      />

      <Text style={styles.header}>Rentals</Text>
      <FlatList
        data={bookings.slice(1)}
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
