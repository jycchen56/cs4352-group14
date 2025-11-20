import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateClubMembers() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = typeof params.title === 'string' ? params.title : '';
  const description = typeof params.description === 'string' ? params.description : '';
  const [inviteText, setInviteText] = useState('');
  const [invites, setInvites] = useState<string[]>([]);

  const addInvite = () => {
    const v = inviteText.trim();
    if (!v) return;
    setInvites((s) => [...s, v]);
    setInviteText('');
  };

  const goNext = () => {
    const q = `?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&invites=${encodeURIComponent(JSON.stringify(invites))}`;
    router.push(`/createClubReview${q}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f4fa' }}>
      <View style={{ paddingHorizontal: 18, paddingTop: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }}>Invite Members (optional)</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 40 }}>
        <Text style={{ color: '#444', marginBottom: 8 }}>Enter names or emails of people you'd like to add. You can add them later too.</Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput value={inviteText} onChangeText={setInviteText} placeholder="Alex, Carmen" style={styles.input} />
          <Pressable onPress={addInvite} style={styles.addBtn}><Text style={{ color: 'white', fontWeight: '700' }}>Add</Text></Pressable>
        </View>

        <View style={{ marginTop: 12 }}>
          {invites.map((i, idx) => (
            <View key={idx} style={styles.inviteRow}><Text>{i}</Text></View>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 18, paddingBottom: 12 }}>
        <Pressable onPress={goNext} style={styles.cta}><Text style={{ color: 'white', fontWeight: '700' }}>Review</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { flex: 1, borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fff' },
  addBtn: { marginLeft: 8, backgroundColor: '#222', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  inviteRow: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 8 },
  cta: { backgroundColor: '#222', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
});
