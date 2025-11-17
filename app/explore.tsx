import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import EventCard from './components/EventCard';
import { listClubs, listClubsForUser } from './state/clubStore';
import { getCurrentUser } from './state/userStore';
import globalStyles from './styles/globalStyles';

export default function Explore() {
  const router = useRouter();
  const user = getCurrentUser();
  const userId = user ? user.id : 'me';

  const { clubs, events } = useMemo(() => {
    const all = listClubs();
    const member = listClubsForUser(userId).map((c) => c.id);

    const clubsNotMember = all.filter((c) => !member.includes(c.id));
    const eventsNotMember: { imageUri: string; title: string; description?: string }[] = [];
    clubsNotMember.forEach((c) => {
      (c.events || []).forEach((e) => {
        const when = e.date ? new Date(e.date).toLocaleString() : '';
        eventsNotMember.push({
          imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
          title: `${e.title} — ${c.title}`,
          description: `${when}${e.location ? ' · ' + e.location : ''}`,
        });
      });
    });

    return { clubs: clubsNotMember, events: eventsNotMember };
  }, [userId]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Explore</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clubs You Might Like</Text>
        {clubs.length === 0 && <Text style={styles.emptyText}>No clubs to explore right now.</Text>}
        {clubs.map((c) => (
          <View key={c.id} style={styles.clubCard}>
            <Text style={styles.clubTitle}>{c.title}</Text>
            <Text style={styles.clubDesc}>{c.description}</Text>
            <View style={styles.clubActions}>
              <Pressable onPress={() => router.push(`/clubview?clubId=${encodeURIComponent(c.id)}` as any)} style={styles.viewBtn}>
                <Text style={styles.viewBtnText}>View</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events Nearby</Text>
        {events.length === 0 && <Text style={styles.emptyText}>No events to show.</Text>}
        <FlatList
          data={events}
          keyExtractor={(i) => i.title}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => <EventCard imageUri={item.imageUri} title={item.title} description={item.description ?? ''} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  emptyText: { color: '#666', marginBottom: 8 },
  clubCard: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 14 },
  clubTitle: { fontSize: 16, fontWeight: '800' },
  clubDesc: { color: '#444', marginTop: 6 },
  clubActions: { marginTop: 12, flexDirection: 'row' },
  viewBtn: { marginRight: 8, backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  viewBtnText: { color: 'white', fontWeight: '700' },
});
