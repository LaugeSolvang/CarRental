import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarCard, LoadingCard } from '../components/CarCard';
import {theme} from '../theme/theme.js';
import Config from '../config.js'

const Home = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [popularCars, setLocalCars] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, try to load data from AsyncStorage
        const savedCars = await AsyncStorage.getItem('cars');
        if (savedCars !== null) {
          setCars(JSON.parse(savedCars));
          setLocalCars(JSON.parse(savedCars));
          setLoading(false);
        } else {
          // Fetch data from API if not found in AsyncStorage
          const response = await fetch(`${Config.API}/cars`);
          const data = await response.json();

          setCars(data);
          setLocalCars(data);
          setLoading(false);

          // Save fetched data to AsyncStorage
          await AsyncStorage.setItem('cars', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleCardPress = (car) => {
    navigation.navigate('Details', { car: car });
  };

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        {/* Loading UI */}
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Text style={theme.styles.header}>Local Cars</Text>
      <FlatList
        data={cars}
        horizontal={true}
        renderItem={({ item }) => <CarCard car={item} onPress={() => handleCardPress(item)} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={theme.styles.header}>Popular Choices</Text>
      <FlatList
        data={cars}
        horizontal={true}
        renderItem={({ item }) => <CarCard car={item} onPress={() => handleCardPress(item)} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  // Your other styles
});

export default Home;
