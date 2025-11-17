import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Picker, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { createEvent, listClubs } from './state/clubStore';
import { createPost } from './state/postStore';
import { getCurrentUser } from './state/userStore';

export default function CreateScreen() {
  const router = useRouter();
  const user = getCurrentUser();
  const [mode, setMode] = useState<'event' | 'post'>('event');

  // Event form state
  const [clubId, setClubId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  // Post form state
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);
  const [postContent, setPostContent] = useState('');

  const clubs = listClubs();

  const attendedPastEvents = useMemo(() => {
    if (!user) return [] as { clubId: string; eventId: string; title: string; date?: string }[];
    const now = Date.now();
    const out: { clubId: string; eventId: string; title: string; date?: string }[] = [];
    for (const c of clubs) {
      for (const e of c.events) {
        if (e.rsvps && e.rsvps.includes(user.id)) {
          const t = e.date ? Date.parse(e.date) : NaN;
          if (!isNaN(t) && t < now) {
            out.push({ clubId: c.id, eventId: e.id, title: e.title, date: e.date });
          }
        }
      }
    }
    return out;
  }, [user, clubs]);

  function handleCreateEvent() {
    if (!clubId) return Alert.alert('Select a club');
    if (!title) return Alert.alert('Enter a title');
    const ev = {
      id: `e-${Date.now()}`,
      title,
      description,
      date,
      location,
      rsvps: [],
    };
    const ok = createEvent(clubId, ev as any);
    if (ok) {
      Alert.alert('Event created');
      router.replace('/home');
    } else {
      Alert.alert('Failed to create event');
    }
  }

  function handleCreatePost() {
    if (!user) return Alert.alert('Please log in to post');
    if (!selectedEventId) return Alert.alert('Select an event you attended');
    if (!postContent) return Alert.alert('Write something about the event');
    // find club id for event
    let clubForEvent: string | undefined;
    for (const c of clubs) {
      if (c.events.some((e) => e.id === selectedEventId)) {
        clubForEvent = c.id;
        break;
      }
    }
    const post = createPost({
      authorId: user.id,
      authorName: user.name,
      clubId: clubForEvent,
      eventId: selectedEventId,
      content: postContent,
    });
    Alert.alert('Posted', 'Your post has been created');
    router.replace('/home');
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 12 }}>Create</Text>

      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Pressable onPress={() => setMode('event')} style={{ marginRight: 12 }}>
          <Text style={{ fontWeight: mode === 'event' ? '700' : '400' }}>Event</Text>
        </Pressable>
        <Pressable onPress={() => setMode('post')}>
          <Text style={{ fontWeight: mode === 'post' ? '700' : '400' }}>Post</Text>
        </Pressable>
      </View>

      {mode === 'event' ? (
        <View>
          <Text style={{ marginBottom: 6 }}>Club</Text>
          <Picker selectedValue={clubId} onValueChange={(v) => setClubId(String(v))}>
            <Picker.Item label="Select a club" value={undefined} />
            {clubs.map((c) => (
              <Picker.Item key={c.id} label={c.title} value={c.id} />
            ))}
          </Picker>

          <Text style={{ marginTop: 8 }}>Title</Text>
          <TextInput value={title} onChangeText={setTitle} style={{ borderWidth: 1, padding: 8, borderRadius: 6 }} />

          <Text style={{ marginTop: 8 }}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} multiline style={{ borderWidth: 1, padding: 8, borderRadius: 6, height: 100 }} />

          <Text style={{ marginTop: 8 }}>Date (ISO format)</Text>
          <TextInput value={date} onChangeText={setDate} placeholder="2025-12-01T18:00:00" style={{ borderWidth: 1, padding: 8, borderRadius: 6 }} />

          <Text style={{ marginTop: 8 }}>Location</Text>
          <TextInput value={location} onChangeText={setLocation} style={{ borderWidth: 1, padding: 8, borderRadius: 6 }} />

          <Pressable onPress={handleCreateEvent} style={{ marginTop: 12, backgroundColor: '#222', padding: 12, borderRadius: 8 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Create Event</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={{ marginBottom: 6 }}>Choose an event you attended</Text>
          {attendedPastEvents.length === 0 ? (
            <Text style={{ color: '#666', marginBottom: 8 }}>No past attended events found.</Text>
          ) : (
            <Picker selectedValue={selectedEventId} onValueChange={(v) => setSelectedEventId(String(v))}>
              <Picker.Item label="Select an event" value={undefined} />
              {attendedPastEvents.map((e) => (
                <Picker.Item key={e.eventId} label={`${e.title} — ${e.date ? new Date(e.date).toLocaleDateString() : ''}`} value={e.eventId} />
              ))}
            </Picker>
          )}

          <Text style={{ marginTop: 8 }}>Write about the event</Text>
          <TextInput value={postContent} onChangeText={setPostContent} multiline style={{ borderWidth: 1, padding: 8, borderRadius: 6, height: 140 }} />

          <Pressable onPress={handleCreatePost} style={{ marginTop: 12, backgroundColor: '#222', padding: 12, borderRadius: 8 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Post</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
