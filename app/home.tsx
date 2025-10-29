import React from 'react';
import { Text, View } from 'react-native';
import EventsScroller from './components/EventScroller'; // Import EventsScroller component

const Home: React.FC = () => {
  // Hardcoded events data
  const events = [
    {
      title: 'Running Club',
      description: 'Join us on weekly runs every weekend!',
      imageUri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Halloween Party',
      description: 'Come dressed in a costume and party with other workers!',
      imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Fishing Club',
      description: 'Join us on fishing trips!',
      imageUri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7', padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', padding: 20 }}>Explore Events</Text>
      <EventsScroller events={events} /> {/* Passing event data to EventsScroller */}
    </View>
  );
};

export default Home;
