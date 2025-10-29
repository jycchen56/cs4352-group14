// src/components/EventCard.tsx
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../styles/globalStyles'; // Import global styles

interface EventCardProps {
  imageUri: string;
  title: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ imageUri, title, description }) => {
  return (
    <View style={globalStyles.card}>
      <Image source={require('../../assets/images/partial-react-logo.png')} style={globalStyles.cardImage} />
      <View style={{ padding: 15 }}>
        <Text style={globalStyles.headerText}>{title}</Text>
        <Text>{description}</Text>
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.buttonText}>You're free!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventCard;
