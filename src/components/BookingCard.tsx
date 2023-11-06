import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BookingCard = ({ booking }) => {
  const IMAGE_URL = `${process.env.EXPO_PUBLIC_IP}${process.env.EXPO_PUBLIC_IMAGE_PORT}/${booking.pictures[0].srcUrl}`;

  const dateTimeOptions = {
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: IMAGE_URL }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.carModel}>{booking.model}</Text>
        <View style={styles.dateGroup}>
          <Text style={styles.startDate}>
            {new Date(booking.startDate).toLocaleString([], dateTimeOptions)}
          </Text>
          <Text style={styles.location}>{booking.location}</Text>
        </View>
        <View style={styles.dateGroup}>
          <Text style={styles.endDate}>
            {new Date(booking.endDate).toLocaleString([], dateTimeOptions)}
          </Text>
          <Text style={styles.location}>{booking.location}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row', 
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 12,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
        marginHorizontal: 8, 
      },
      image: {
        width: 100, 
        height: 100, 
        borderRadius: 8, 
        margin: 10,
      },
      textContainer: {
        flex: 1, 
        padding: 10,
      },
  carModel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#333333',
  },
  location: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  dateGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});

export default BookingCard;
