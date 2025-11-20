import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { setSelectedEvent } from '../state/eventStore';
import globalStyles from '../styles/globalStyles'; // Import global styles

interface EventCardProps {
  imageUri: string;
  title: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ imageUri, title, description }: EventCardProps) => {
  const router = useRouter();

  function handlePress() {
    // store selected event in memory and navigate to details page
    setSelectedEvent({ title, description, imageUri });
    router.push('/eventdetails');
  }

  return (
    <View style={globalStyles.card}>
      <Image source={{ uri: imageUri }} style={globalStyles.cardImage} />
      <View style={{ padding: 15 }}>
        <Text style={globalStyles.headerText}>{title}</Text>
        <Text>{description}</Text>
        <TouchableOpacity style={globalStyles.button} onPress={handlePress}>
          <Text style={globalStyles.buttonText}>You're free!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventCard;
