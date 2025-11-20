import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { listClubsForUser } from '../state/clubStore';
import { getCurrentUser } from '../state/userStore';

export default function MyClubs() {
  const router = useRouter();
  const user = getCurrentUser();
  const userId = user ? user.id : 'me';
  const clubs = listClubsForUser(userId);

  const managed = clubs.filter((c) => c.members.some((m) => m.id === userId && m.role === 'organizer'));
  const memberOnly = clubs.filter((c) => !c.members.some((m) => m.id === userId && m.role === 'organizer'));

  function openManage(itemId: string) {
    router.push(`/manageclub?clubId=${itemId}`);
  }

  function openClubView(itemId: string) {
    // Navigate to a lightweight member-facing club view (events + chat)
    router.push(`/clubview?clubId=${itemId}`);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerWrap}>
        <Text style={styles.title}>My Clubs</Text>
      </View>

      <View style={{ padding: 16 }}>
        {managed.length > 0 && (
          <View style={{ marginBottom: 18 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 8 }}>Managed Clubs</Text>
            {managed.map((item) => (
              <React.Fragment key={item.id}>
                <View style={styles.card}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clubTitle}>{item.title}</Text>
                    <Text style={styles.clubDesc}>{item.description}</Text>
                  </View>

                  <Pressable onPress={() => openManage(item.id)} style={styles.manageBtn}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Manage</Text>
                  </Pressable>
                </View>
              </React.Fragment>
            ))}
          </View>
        )}

        {memberOnly.length > 0 && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 8 }}>Member Clubs</Text>
            {memberOnly.map((item) => (
              <React.Fragment key={item.id}>
                <View style={styles.card}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.clubTitle}>{item.title}</Text>
                    <Text style={styles.clubDesc}>{item.description}</Text>
                  </View>

                  <Pressable onPress={() => openClubView(item.id)} style={styles.manageBtnSecondary}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>View</Text>
                  </Pressable>
                </View>
              </React.Fragment>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f4fa' },
  headerWrap: { padding: 16 },
  title: { fontSize: 28, fontWeight: '900' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  clubTitle: { fontSize: 18, fontWeight: '800' },
  clubDesc: { color: '#444', marginTop: 6 },
  manageBtn: {
    backgroundColor: '#222',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 12,
  },
  manageBtnSecondary: {
    backgroundColor: '#6b7280',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 12,
  },
});
