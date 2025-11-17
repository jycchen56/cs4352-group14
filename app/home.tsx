import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import BottomNav from './components/BottomNav';
import EventsScroller from './components/EventScroller'; // Import EventsScroller component
import { getCurrentUser, getNotificationsForCurrentUser } from './state/userStore';

const Home: React.FC = () => {
  // Hardcoded events data (visual scroller)
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

  const user = getCurrentUser();
  const notifs = getNotificationsForCurrentUser();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f7', padding: 20 }} contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', paddingBottom: 8 }}>Explore Events</Text>
        {user ? (
          <Text style={{ fontSize: 16, marginBottom: 8 }}>Welcome back, {user.name}.</Text>
        ) : (
          <Text style={{ fontSize: 14, marginBottom: 8 }}>Log in to see your RSVP notifications.</Text>
        )}

        {notifs && notifs.length > 0 ? (
          <View style={{ backgroundColor: '#fff3cd', padding: 12, borderRadius: 8 }}>
            <Text style={{ fontWeight: '700', marginBottom: 6 }}>Upcoming events you're RSVP'd to:</Text>
            {notifs.map((n) => {
              const date = n.date ? new Date(n.date) : null;
              const when = date ? date.toLocaleString() : 'TBD';
              return (
                <React.Fragment key={`${n.clubId}-${n.eventId}`}>
                  <View style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: '600' }}>{n.eventTitle}</Text>
                    <Text style={{ color: '#333' }}>{n.clubTitle} — {when}</Text>
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        ) : null}
      </View>

        <EventsScroller events={events} /> {/* Passing event data to EventsScroller */}
      </ScrollView>

      <BottomNav />
    </View>
  );
};

export default Home;
