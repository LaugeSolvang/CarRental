import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {theme} from '../theme/theme.js';

const NavigationPrompt = ({ navigation, promptText, actionText, targetScreen }) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
      <Text style={{ color: theme.colors.textSecondary }}>
        {promptText}{' '}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(targetScreen)}>
        <Text style={{ color: theme.colors.action }}>
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationPrompt;
