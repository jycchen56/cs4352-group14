// src/components/EventsScroller.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import EventCard from './EventCard'; // Import EventCard

interface EventData {
  imageUri: string;
  title: string;
  description: string;
}

interface EventsScrollerProps {
  events: EventData[];
}

const EventsScroller: React.FC<EventsScrollerProps> = ({ events }) => {
  return (
    <ScrollView style={{ marginTop: 20 }}>
      {events.map((event, index) => (
        <EventCard
          key={index}
          imageUri={event.imageUri}
          title={event.title}
          description={event.description}
        />
      ))}
    </ScrollView>
  );
};

export default EventsScroller;
