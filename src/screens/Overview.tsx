import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BookingCard from '../components/BookingCard';
import {theme} from '../theme/theme.js';
import Config from '../config.js'


const Overview = () => {
  const [bookings, setBookings] = useState({
    currentRentals: [],
    futureRentals: [],
    pastRentals: []
  });
  const [loading, setLoading] = useState(true);

  const renderContent = ({ item }) => {
    if (item.title) {
      return <Text style={theme.styles.header}>{item.title}</Text>;
    } else {
      return <BookingCard booking={item} />;
    }
  };
  
  const categorizeBookings = (bookings) => {
    const now = new Date();
    let currentRentals = [];
    let futureRentals = [];
    let pastRentals = [];
  
    bookings.forEach(booking => {
      const startDate = new Date(booking.formattedStartDate);
      const endDate = new Date(booking.formattedEndDate);
      if (startDate <= now && endDate >= now) {
        currentRentals.push(booking);
      } else if (startDate > now) {
        futureRentals.push(booking);
      } else {
        pastRentals.push(booking);
      }
    });
    
    // Sorting each array if needed, e.g., by date
    currentRentals.sort((a, b) => new Date(a.pickup) - new Date(b.pickup));
    futureRentals.sort((a, b) => new Date(a.pickup) - new Date(b.pickup));
    pastRentals.sort((a, b) => new Date(b.dropoff) - new Date(a.dropoff));
  
    return { currentRentals, futureRentals, pastRentals };
  };
  
  const fetchData = () => {
    setLoading(true);
    fetch(`${Config.API}/bookingstest`)
      .then(response => response.json())
      .then(data => {
        const { currentRentals, futureRentals, pastRentals } = categorizeBookings(data);
        setBookings({ currentRentals, futureRentals, pastRentals });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={[
        { id: 'header-current', title: 'Current Rentals' },
        ...bookings.currentRentals,
        { id: 'header-future', title: 'Future Rentals' },
        ...bookings.futureRentals,
        { id: 'header-past', title: 'Past Rentals' },
        ...bookings.pastRentals,
      ]}
      renderItem={renderContent}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={<View style={{ paddingBottom: 20 }} />} // Add some padding at the bottom if needed
    />
  );
};

export default Overview;