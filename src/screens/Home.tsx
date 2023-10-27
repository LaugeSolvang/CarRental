import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { CarCard, LoadingCard } from '../components/CarCard';
const Home = () => {
  const [cars, setCars] = useState([]);
  const [popularCars, setLocalCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://themikkel.dk/unfollow/sdu/cars/cars');
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
        <Text style={styles.header}>Local Cars</Text>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />

        <Text style={styles.header}>Popular Choices</Text>
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </ScrollView>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Local Cars</Text>
      <FlatList
        data={cars}
        horizontal={true}
        renderItem={({ item }) => <CarCard car={item} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.header}>Popular Choices</Text>
      <FlatList
        data={popularCars}
        horizontal={true}
        renderItem={({ item }) => <CarCard car={item} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.header}>Deals and Offers</Text>
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
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F4F4F4',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  
  dealText: {
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 5,
  },
});

export default Home;
