import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { CarCard, LoadingCard } from '../components/CarCard';
import {theme} from '../theme/theme.js';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [popularCars, setLocalCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_JSON_PORT}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/cars`);
        const data = await response.json();
        
        setCars(data);
        setLocalCars(data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <Text style={theme.styles.header}>Local Cars</Text>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />

        <Text style={theme.styles.header}>Popular Choices</Text>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </ScrollView>
    );
  }


  return (
    <ScrollView>
      <Text style={theme.styles.header}>Local Cars</Text>
      <FlatList
        data={cars}
        horizontal={true}
        renderItem={({ item }) => <CarCard car={item} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={theme.styles.header}>Popular Choices</Text>
      <FlatList
        data={popularCars}
        horizontal={true}
        renderItem={({ item }) => <CarCard car={item} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={theme.styles.header}>Deals and Offers</Text>
      <Text style={styles.dealText}>
        Deal 1: Get a 10% discount on your first car booking with us.
      </Text>
      <Text style={styles.dealText}>
        Deal 2: Book for more than 5 days and receive a complimentary car upgrade.
      </Text>
      <Text style={styles.dealText}>
        Deal 3: Refer a friend and both of you enjoy a $50 off on your next booking.
      </Text>
      <Text style={styles.dealText}>
        Deal 4: Avail our premium membership and get access to luxury cars at a fraction of the cost.
      </Text>
      <Text style={styles.dealText}>
        Deal 5: Off-peak season deal: Book any car and get an instant 15% discount.
      </Text>
    </ScrollView>
  );
};


const styles = StyleSheet.create({

  
  dealText: {
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
  },
});

export default Home;
