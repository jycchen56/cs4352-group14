import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createClub, createEvent, listClubsForUser } from '../state/clubStore';
import { getCurrentUser } from '../state/userStore';

export default function EventReview() {
  const router = useRouter();

  // placeholder event data (the create flow should inject real values)
  const title = 'Arcade Night';
  const location = 'Plano';
  const dateTime = '2025-10-19T18:00:00';
  const description = 'Come hang out for a chill night of arcade games.';

  function handleCreate() {
    const user = getCurrentUser();

    // pick first club for user, or create a demo club
    let clubId: string | undefined;
    if (user) {
      const clubs = listClubsForUser(user.id || 'me');
      if (clubs && clubs.length > 0) clubId = clubs[0].id;
    }

    if (!clubId) {
      const userId = user ? user.id : 'me';
      const userName = user ? user.name : 'You';
      const club = createClub('My Club', 'Auto-created club', userId, userName);
      clubId = club.id;
    }

    const ev = { id: `ev-${Date.now()}`, title, description, date: dateTime, location, rsvps: [] } as any;
    createEvent(clubId as string, ev);

    // go back to home so Home will read events from the in-memory store
    router.replace('/home');
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 12 }}>Confirm Event</Text>
        <Text style={{ marginBottom: 8 }}>{title}</Text>
        <Text style={{ color: '#666', marginBottom: 20 }}>{location} • {new Date(dateTime).toLocaleString()}</Text>

        <Pressable onPress={handleCreate} style={{ backgroundColor: '#222', padding: 12, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Create</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
