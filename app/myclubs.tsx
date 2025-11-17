import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { listClubsForUser } from './state/clubStore';

export default function MyClubs() {
  const router = useRouter();
  const clubs = listClubsForUser('me');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerWrap}>
        <Text style={styles.title}>My Clubs</Text>
      </View>

      <FlatList
        data={clubs}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.clubTitle}>{item.title}</Text>
              <Text style={styles.clubDesc}>{item.description}</Text>
            </View>

            <Pressable
              onPress={() => {
                // On web, set a full URL so window.location.search is populated.
                if (typeof window !== 'undefined') {
                  const target = `/manageclub?clubId=${encodeURIComponent(item.id)}`;
                  // use origin so path is absolute
                  window.location.href = window.location.origin + target;
                  return;
                }

                // Fallback: push a string route which will include query params
                if (router && typeof router.push === 'function') {
                  router.push(`/manageclub?clubId=${encodeURIComponent(item.id)}` as any);
                  return;
                }

                // Last resort: attempt object push
                try {
                  router.push({ pathname: '/manageclub', params: { clubId: item.id } } as any);
                } catch (e) {
                  // ignore
                }
              }
              }
              style={styles.manageBtn}
            >
              <Text style={{ color: 'white', fontWeight: '700' }}>Manage</Text>
            </Pressable>
          </View>
        )}
      />
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
});
