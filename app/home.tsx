// src/pages/Home.tsx
import React from 'react';
import { Text, View } from 'react-native';
import EventsScroller from './components/EventScroller'; // Import EventsScroller component

const Home: React.FC = () => {
  // Hardcoded events data
  const events = [
    {
      title: 'Running Club',
      description: 'Join us on weekly runs every weekend!',
    },
    {
      title: 'Halloween Party',
      description: 'Come dressed in a costume and party with other workers!',
    },
    {
      title: 'Fishing Club',
      description: 'Join us on fishing trips!',
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
