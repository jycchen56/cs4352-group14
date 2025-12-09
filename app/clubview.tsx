// @ts-ignore
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getClubById, getClubEvents } from '../state/clubStore';
import { getCurrentUser } from '../state/userStore';

export default function ClubView() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const clubId = typeof params.clubId === 'string' ? params.clubId : '';
  const club = useMemo(() => getClubById(clubId), [clubId]);
  const events = useMemo(() => (club ? getClubEvents(club.id) : []), [club]);

  const [tab, setTab] = useState<'events' | 'chat'>('events');
  const user = getCurrentUser();
  const userId = user ? user.id : 'me';
  const [isMember, setIsMember] = useState<boolean>(() => !!club && !!club.members.some((m: Member) => m.id === userId));

  // update membership if club or user changes
  React.useEffect(() => {
    setIsMember(!!club && !!club.members.some((m: Member) => m.id === userId));
  }, [club, userId]);

  // Accessible, reliable Join button component to avoid touch/click issues
  function JoinButton({ onPress }: { onPress: () => void }) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Join club"
        style={({ pressed }: { pressed: boolean }) => [styles.joinBtn, pressed && styles.joinBtnPressed]}
      >
        <Text style={styles.joinBtnText}>Join</Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => (router as any).back()} hitSlop={12}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </Pressable>
        <Text style={styles.title}>{club?.title ?? 'Club'}</Text>
        {isMember ? (
          <View style={{ width: 22 }} />
        ) : (
          <JoinButton
            onPress={() => {
              if (!user) {
                router.push('/login');
                return;
              }

              if (!club) return;

              // Hardcoded behavior: if the user is NOT already a member, immediately navigate
              // to the invitations screen. If they are already a member, open the chat.
              if (!isMember) {
                router.push('/invitations');
                return;
              }

              // already a member: open chat
              router.push(`/chatpage?clubId=${encodeURIComponent(clubId)}`);
            }}
          />
        )}
      </View>

      <View style={styles.tabBar}>
        <Pressable onPress={() => setTab('events')} style={[styles.tabBtn, tab === 'events' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'events' && styles.tabTextActive]}>Events</Text>
        </Pressable>

        {isMember && (
          <Pressable onPress={() => setTab('chat')} style={[styles.tabBtn, tab === 'chat' && styles.tabActive]}>
            <Text style={[styles.tabText, tab === 'chat' && styles.tabTextActive]}>Chat</Text>
          </Pressable>
        )}
      </View>

      <View style={{ padding: 16, flex: 1 }}>
        {tab === 'events' && (
          <FlatList
            data={events}
            keyExtractor={(e: ClubEvent) => e.id}
            renderItem={({ item }: { item: ClubEvent }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  {item.date ? <Text style={styles.eventMeta}>{new Date(item.date).toLocaleString()}</Text> : null}
                  {item.location ? <Text style={styles.eventMeta}>{item.location}</Text> : null}
                </View>
                <Pressable style={styles.viewBtn} onPress={() => router.push(`/eventdetails?clubId=${encodeURIComponent(clubId)}&eventId=${encodeURIComponent(item.id)}`)}>
                  <Text style={{ color: 'white', fontWeight: '700' }}>Details</Text>
                </Pressable>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center', marginTop: 30 }}>
                <Text style={{ color: '#666' }}>No upcoming events</Text>
              </View>
            )}
          />
        )}

        {tab === 'chat' && (
          <View style={{ flex: 1 }}>
            <Text style={{ marginBottom: 12, color: '#444' }}>Open the club chat to join conversations.</Text>
            <Pressable onPress={() => router.push(`/chatpage?clubId=${encodeURIComponent(clubId)}`)} style={styles.openChatBtn}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Open Chat</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f4fa' },
  header: { paddingHorizontal: 16, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 26, fontWeight: '900' },
  tabBar: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: 'white', borderWidth: 1, borderColor: '#e6e6e6' },
  tabActive: { backgroundColor: '#222' },
  tabText: { fontWeight: '800', color: '#333' },
  tabTextActive: { color: 'white' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: 'white', borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e6e6e6' },
  eventTitle: { fontSize: 16, fontWeight: '800' },
  eventMeta: { color: '#666', marginTop: 4 },
  viewBtn: { backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginLeft: 12 },
  openChatBtn: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  joinBtn: { backgroundColor: '#16a34a', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  joinBtnPressed: { opacity: 0.8 },
  joinBtnText: { color: 'white', fontWeight: '700' },
});
