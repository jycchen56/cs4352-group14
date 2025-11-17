import { useRouter, useSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { addMember, getClubById, getClubEvents } from './state/clubStore';
import { getCurrentUser } from './state/userStore';

function readClubId() {
  // Try expo-router hook first (works in many runtimes)
  try {
    const params: any = useSearchParams();
    if (params && params.clubId) return params.clubId as string;
  } catch (e) {
    // ignore
  }

  // Fallback to window.location.search for web
  if (typeof window !== 'undefined') {
    const q = new URLSearchParams(window.location.search);
    return q.get('clubId') ?? '';
  }

  return '';
}

export default function ClubView() {
  const router = useRouter();
  const clubId = readClubId();
  const club = useMemo(() => getClubById(clubId), [clubId]);
  const events = useMemo(() => (club ? getClubEvents(club.id) : []), [club]);

  const [tab, setTab] = useState<'events' | 'chat'>('events');
  const user = getCurrentUser();
  const userId = user ? user.id : 'me';
  const [isMember, setIsMember] = useState<boolean>(() => !!club && !!club.members.some((m) => m.id === userId));

  // update membership if club or user changes
  React.useEffect(() => {
    setIsMember(!!club && !!club.members.some((m) => m.id === userId));
  }, [club, userId]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </Pressable>
        <Text style={styles.title}>{club?.title ?? 'Club'}</Text>
        {isMember ? (
          <View style={{ width: 22 }} />
        ) : (
          <Pressable style={styles.joinBtn} onPress={() => {
            if (!user) {
              router.push('/login');
              return;
            }

            if (!club) return;
            const ok = addMember(club.id, { id: user.id, name: user.name, role: 'member' } as any);
            if (ok) {
              setIsMember(true);
              // reveal and switch to chat immediately after joining
              setTab('chat');
            }
          }}>
            <Text style={{ color: 'white', fontWeight: '700' }}>Join</Text>
          </Pressable>
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
            keyExtractor={(e) => e.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  {item.date ? <Text style={styles.eventMeta}>{new Date(item.date).toLocaleString()}</Text> : null}
                  {item.location ? <Text style={styles.eventMeta}>{item.location}</Text> : null}
                </View>
                <Pressable style={styles.viewBtn} onPress={() => router.push(`/eventdetails?clubId=${encodeURIComponent(clubId)}&eventId=${encodeURIComponent(item.id)}` as any)}>
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
            <Pressable onPress={() => router.push(`/chatpage?clubId=${encodeURIComponent(clubId)}` as any)} style={styles.openChatBtn}>
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
  joinBtn: { backgroundColor: '#16a34a', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
});
