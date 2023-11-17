import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { CarCard, LoadingCard } from '../components/CarCard';
import { theme } from '../theme/theme.js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation prop type
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Define the root stack param list
type RootStackParamList = {
  Home: undefined;
  Booking: { carId: number };
  // ... other screen definitions
};

const Home: React.FC = () => {
  const [cars, setCars] = useState([]);
  const [popularCars, setLocalCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use the navigation hook to get the navigation prop
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

  // Function to handle the car card press and navigate to the Details screen
  const handleCarPress = (carId: number) => {
    navigation.navigate('Details', { carId });
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
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCarPress(item.id)}>
            <CarCard car={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={theme.styles.header}>Popular Choices</Text>
      <FlatList
        data={popularCars}
        horizontal={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCarPress(item.id)}>
            <CarCard car={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/* Other sections and deals */}
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
