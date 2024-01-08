import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { CarCard, LoadingCard } from '../components/CarCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config.js';

const Search: React.FC = ({navigation}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [fullData, setFullData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch data from AsyncStorage
        const savedCars = await AsyncStorage.getItem('cars');
        if (savedCars !== null) {
          const carData = JSON.parse(savedCars);
          setData(carData);
          setFullData(carData);
          setIsLoading(false);
        } else {
          setError('Data not found in AsyncStorage');
          setIsLoading(false);
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array is empty to fetch data only on mount

  const handleCarPress = (car) => {
    navigation.navigate('Details', { car: car });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter data based on search query
    const filtered = fullData.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    setData(filtered);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error in fetching data ... Please check your internet connection!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

        <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CarCard car={item} onPress={() => handleCarPress(item)} />}
      />
    </View>

  );
};


const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default Search;
