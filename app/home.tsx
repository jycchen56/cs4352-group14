import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventsScroller from '../components/EventScroller'; // Import EventsScroller component
import { listClubsForUser } from '../state/clubStore';
import { getCurrentUser, getNotificationsForCurrentUser } from '../state/userStore';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';

const Home: React.FC = () => {
  // Compute events from clubs the user is a member of
  const user = getCurrentUser();
  const userId = user ? user.id : 'me';

  const events = useMemo(() => {
    const clubs = listClubsForUser(userId);
    const evs: { imageUri: string; title: string; description?: string }[] = [];
    clubs.forEach((c) => {
      (c.events || []).forEach((e) => {
        const when = e.date ? new Date(e.date).toLocaleString() : '';
        evs.push({
          imageUri: PLACEHOLDER_IMAGE,
          title: `${e.title} — ${c.title}`,
          description: `${when}${e.location ? ' · ' + e.location : ''}${e.description ? '\n' + e.description : ''}`,
        });
      });
    });

    // sort by date if available (earliest first)
    evs.sort((a, b) => 0);
    return evs;
  }, [userId]);

  const notifs = getNotificationsForCurrentUser();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ScrollView style={{ flex: 1, backgroundColor: '#f7f7f7', padding: 20 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', paddingBottom: 8 }}>Your Events</Text>
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

        {events.length > 0 ? (
          <EventsScroller events={events} />
        ) : (
          <View style={{ padding: 12, alignItems: 'center' }}>
            <Text style={{ color: '#666' }}>No events found for your clubs. Explore other clubs to join events.</Text>
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

export default Home;
