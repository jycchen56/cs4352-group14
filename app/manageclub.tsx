// @ts-ignore
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Linking, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  addResource,
  assignRole,
  ClubEvent,
  createEvent,
  createPoll,
  getAnalytics,
  getClubById,
  getClubEvents,
  getClubPolls,
  getClubResources,
  getEventRsvps,
  Member,
  Poll,
  rsvpEvent,
} from '../state/clubStore';

export default function ManageClub() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const clubId = typeof params.clubId === 'string' ? params.clubId : undefined;
  const refreshVal = React.useState<number>(0);
  const setRefresh = refreshVal[1];
  // Force re-render when screen comes into focus
  useIsFocused();

  // role menu state (used instead of cycling roles)
  const [roleMenuMember, setRoleMenuMember] = React.useState<string | null>(null);
  const ROLE_OPTIONS: Array<'member' | 'organizer' | 'moderator' | 'planner'> = ['member', 'organizer', 'moderator', 'planner'];

  // UI tab state
  const [tab, setTab] = React.useState<'members' | 'events' | 'polls' | 'resources' | 'analytics'>('members');
  // resource add modal state
  const [resourceModalOpen, setResourceModalOpen] = React.useState(false);
  const [newResourceLabel, setNewResourceLabel] = React.useState('');
  const [newResourceUrl, setNewResourceUrl] = React.useState('');
  // event add modal state
  const [eventModalOpen, setEventModalOpen] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState('');
  const [newEventDesc, setNewEventDesc] = React.useState('');
  const [newEventDate, setNewEventDate] = React.useState('');
  const [newEventLocation, setNewEventLocation] = React.useState('');
  // poll add modal state
  const [pollModalOpen, setPollModalOpen] = React.useState(false);
  const [newPollQuestion, setNewPollQuestion] = React.useState('');
  const [newPollOptions, setNewPollOptions] = React.useState('');
  // RSVP modal state
  const [rsvpModalEvent, setRsvpModalEvent] = React.useState<string | null>(null);
  // calendar modal state
  const [calendarModalEvent, setCalendarModalEvent] = React.useState<string | null>(null);
  const [selectedCalendar, setSelectedCalendar] = React.useState<string>('Google Calendar');
  const CALENDAR_OPTIONS = ['Google Calendar', 'Outlook', 'Apple Calendar'];

  if (!clubId || typeof clubId !== 'string') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 20 }}>
          <Text>No club selected.</Text>
          <Pressable onPress={() => router.replace('/myclubs')} style={styles.backBtn}>
            <Text style={{ color: 'white' }}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const club = getClubById(clubId as string);
  if (!club) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 20 }}>
          <Text>Club not found.</Text>
          <Pressable onPress={() => router.replace('/myclubs')} style={styles.backBtn}>
            <Text style={{ color: 'white' }}>Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  function assignRoleHandler(memberId: string, role: 'member' | 'organizer' | 'moderator' | 'planner') {
    const c = getClubById(clubId as string);
    if (!c) return;
    const ok = assignRole(c.id, memberId, role);
    if (!ok) {
      Alert.alert('Error', 'Could not assign role');
      return;
    }
    setRoleMenuMember(null);
    // trigger re-render
    setRefresh((r: number) => r + 1);
  }

  function openRsvpModal(eventId: string) {
    setRsvpModalEvent(eventId);
  }

  function toggleMyRsvp(eventId: string) {
    const ok = rsvpEvent(clubId as string, eventId, 'me');
    if (!ok) {
      Alert.alert('Error', 'Could not update RSVP');
      return;
    }
    setRefresh((r: number) => r + 1);
  }

  function goToMyClubs() {
    router.replace('/myclubs');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => (router as any).back()} hitSlop={12}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{club.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ padding: 12, flex: 1 }}>
        <View style={styles.tabRow}>
          <Pressable onPress={() => setTab('members')} style={[styles.tabBtn, tab === 'members' && styles.tabActive]}>
            <Text style={tab === 'members' ? styles.tabTextActive : styles.tabText}>Members</Text>
          </Pressable>
          <Pressable onPress={() => setTab('events')} style={[styles.tabBtn, tab === 'events' && styles.tabActive]}>
            <Text style={tab === 'events' ? styles.tabTextActive : styles.tabText}>Events</Text>
          </Pressable>
          <Pressable onPress={() => setTab('polls')} style={[styles.tabBtn, tab === 'polls' && styles.tabActive]}>
            <Text style={tab === 'polls' ? styles.tabTextActive : styles.tabText}>Polls</Text>
          </Pressable>
          <Pressable onPress={() => setTab('resources')} style={[styles.tabBtn, tab === 'resources' && styles.tabActive]}>
            <Text style={tab === 'resources' ? styles.tabTextActive : styles.tabText}>Resources</Text>
          </Pressable>
          <Pressable onPress={() => setTab('analytics')} style={[styles.tabBtn, tab === 'analytics' && styles.tabActive]}>
            <Text style={tab === 'analytics' ? styles.tabTextActive : styles.tabText}>Analytics</Text>
          </Pressable>
        </View>

        {tab === 'members' && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Members & Roles</Text>
            <FlatList
              data={club.members}
              keyExtractor={(m: Member) => m.id}
              renderItem={({ item }: { item: Member }) => (
                <View style={styles.memberRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700' }}>{item.name}</Text>
                    <Text style={{ color: '#666' }}>{item.role}</Text>
                  </View>

                  <Pressable onPress={() => setRoleMenuMember(item.id)} style={styles.roleBtn}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Change</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
        )}

        {/* Role selection modal (dropdown) */}
        <Modal visible={!!roleMenuMember} transparent animationType="fade" onRequestClose={() => setRoleMenuMember(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 8 }}>Assign Role</Text>
              {ROLE_OPTIONS.map((r) => (
                <Pressable key={r} onPress={() => roleMenuMember && assignRoleHandler(roleMenuMember, r)} style={({ pressed }: { pressed: boolean }) => [styles.modalItem, pressed && { opacity: 0.85 }]}>
                  <Text style={{ fontSize: 15 }}>{r}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => setRoleMenuMember(null)} style={[styles.modalItem, { marginTop: 8, backgroundColor: '#eee' }]}>
                <Text style={{ textAlign: 'center' }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {tab === 'events' && (
          <View style={{ marginTop: 12, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Events</Text>
              <Pressable onPress={() => setEventModalOpen(true)} style={styles.primaryActionBtn}>
                <Text style={{ color: 'white', fontWeight: '800' }}>＋ Create</Text>
              </Pressable>
            </View>
            <FlatList
              data={getClubEvents(club.id)}
              keyExtractor={(e: ClubEvent) => e.id}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }: { item: ClubEvent }) => (
                <View style={styles.memberRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                    <Text style={{ color: '#666' }}>{item.description}</Text>
                    <Text style={{ color: '#666', marginTop: 6 }}>{item.date} • {item.location}</Text>
                    <Text style={{ color: '#333', marginTop: 6 }}>RSVPs: {(item.rsvps || []).length}</Text>
                  </View>
                    <View style={{ gap: 8 }}>
                      <Pressable onPress={() => openRsvpModal(item.id)} style={styles.roleBtn}>
                        <Text style={{ color: 'white', fontWeight: '700' }}>Attendees</Text>
                      </Pressable>

                      <Pressable onPress={() => setCalendarModalEvent(item.id)} style={styles.roleBtn}>
                        <Text style={{ color: 'white', fontWeight: '700' }}>Add to Calendar</Text>
                      </Pressable>
                    </View>
                </View>
              )}
            />
          </View>
        )}

        {tab === 'polls' && (
          <View style={{ marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Polls</Text>
              <Pressable onPress={() => setPollModalOpen(true)} style={styles.primaryActionBtn}>
                <Text style={{ color: 'white', fontWeight: '800' }}>＋ Create</Text>
              </Pressable>
            </View>
            <FlatList
              data={getClubPolls(club.id)}
              keyExtractor={(p: Poll) => p.id}
              renderItem={({ item }: { item: Poll }) => (
                <View style={[styles.memberRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                  <Text style={{ fontWeight: '800' }}>{item.question}</Text>
                  {item.options.map((opt: { id: string; label: string; votes: number }) => (
                    <React.Fragment key={opt.id}>
                      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: 6 }}>
                        <Text>{opt.label}</Text>
                        <Text style={{ color: '#666' }}>{opt.votes} votes</Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>
              )}
            />
          </View>
        )}

        {tab === 'resources' && (
          <View style={{ marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Resources</Text>
              <Pressable onPress={() => setResourceModalOpen(true)} style={styles.primaryActionBtn}>
                <Text style={{ color: 'white', fontWeight: '800' }}>＋ Add</Text>
              </Pressable>
            </View>
            <FlatList
              data={getClubResources(club.id)}
              keyExtractor={(r: { id: string }) => r.id}
              renderItem={({ item }: { item: { id: string; label: string; url?: string } }) => (
                <View style={styles.memberRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700' }}>{item.label}</Text>
                    <Text style={{ color: '#666' }}>{item.url}</Text>
                  </View>
                  <Pressable onPress={() => item.url && Linking.openURL(item.url)} style={styles.roleBtn}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Open</Text>
                  </Pressable>
                </View>
              )}
            />
          </View>
        )}

        {/* Add Resource Modal */}
        <Modal visible={resourceModalOpen} transparent animationType="fade" onRequestClose={() => setResourceModalOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 8 }}>Add Resource</Text>
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Label</Text>
              <TextInput placeholder="e.g. Club Handbook" value={newResourceLabel} onChangeText={setNewResourceLabel} style={styles.input} />
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>URL</Text>
              <TextInput placeholder="https://" value={newResourceUrl} onChangeText={setNewResourceUrl} style={styles.input} autoCapitalize="none" />

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => {
                    // validate
                    if (!newResourceLabel.trim() || !newResourceUrl.trim()) {
                      Alert.alert('Error', 'Please provide both label and URL');
                      return;
                    }
                    const res = { id: `res-${Date.now()}`, label: newResourceLabel.trim(), url: newResourceUrl.trim() };
                    const ok = addResource(club.id, res as any);
                    if (!ok) {
                      Alert.alert('Error', 'Could not add resource');
                      return;
                    }
                    setNewResourceLabel('');
                    setNewResourceUrl('');
                    setResourceModalOpen(false);
                    Alert.alert('Success', 'Resource added successfully');
                    setRefresh((r: number) => r + 1);
                  }}
                  style={[styles.modalItem, { flex: 1, backgroundColor: '#222' }]}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                </Pressable>

                <Pressable onPress={() => setResourceModalOpen(false)} style={[styles.modalItem, { flex: 1, backgroundColor: '#eee' }]}>
                  <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Add Event Modal */}
        <Modal visible={eventModalOpen} transparent animationType="fade" onRequestClose={() => setEventModalOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 8 }}>Create Event</Text>
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Event Title</Text>
              <TextInput placeholder="Title" value={newEventTitle} onChangeText={setNewEventTitle} style={styles.input} />
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Description</Text>
              <TextInput placeholder="Description" value={newEventDesc} onChangeText={setNewEventDesc} style={styles.input} />
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Date & Time</Text>
              <TextInput placeholder="e.g. 2024-12-25 14:00" value={newEventDate} onChangeText={setNewEventDate} style={styles.input} />
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Location</Text>
              <TextInput placeholder="Location" value={newEventLocation} onChangeText={setNewEventLocation} style={styles.input} />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => {
                    if (!newEventTitle.trim()) {
                      Alert.alert('Error', 'Please provide a title');
                      return;
                    }
                    const ev = { id: `ev-${Date.now()}`, title: newEventTitle.trim(), description: newEventDesc.trim(), date: newEventDate.trim(), location: newEventLocation.trim(), rsvps: [] } as any;
                    const ok = createEvent(club.id, ev);
                    if (!ok) {
                      Alert.alert('Error', 'Could not create event');
                      return;
                    }
                    setNewEventTitle('');
                    setNewEventDesc('');
                    setNewEventDate('');
                    setNewEventLocation('');
                    setEventModalOpen(false);
                    Alert.alert('Success', 'Event created successfully');
                    setRefresh((r: number) => r + 1);
                  }}
                  style={[styles.modalItem, { flex: 1, backgroundColor: '#222' }]}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Create</Text>
                </Pressable>
                <Pressable onPress={() => setEventModalOpen(false)} style={[styles.modalItem, { flex: 1, backgroundColor: '#eee' }]}>
                  <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Add Poll Modal */}
        <Modal visible={pollModalOpen} transparent animationType="fade" onRequestClose={() => setPollModalOpen(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 8 }}>Create Poll</Text>
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Question</Text>
              <TextInput placeholder="What should we do?" value={newPollQuestion} onChangeText={setNewPollQuestion} style={styles.input} />
              
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>Options</Text>
              <TextInput placeholder="Option 1, Option 2 (comma separated)" value={newPollOptions} onChangeText={setNewPollOptions} style={styles.input} />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => {
                    if (!newPollQuestion.trim() || !newPollOptions.trim()) {
                      Alert.alert('Error', 'Provide a question and at least one option');
                      return;
                    }
                    const now = Date.now();
                    const opts = newPollOptions.split(',').map((s: string, i: number) => ({ id: `o-${now}-${i}`, label: s.trim(), votes: 0 }));
                    const poll = { id: `p-${Date.now()}`, question: newPollQuestion.trim(), options: opts } as any;
                    const ok = createPoll(club.id, poll);
                    if (!ok) {
                      Alert.alert('Error', 'Could not create poll');
                      return;
                    }
                    setNewPollQuestion('');
                    setNewPollOptions('');
                    setPollModalOpen(false);
                    Alert.alert('Success', 'Poll created successfully');
                    setRefresh((r: number) => r + 1);
                  }}
                  style={[styles.modalItem, { flex: 1, backgroundColor: '#222' }]}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Create</Text>
                </Pressable>
                <Pressable onPress={() => setPollModalOpen(false)} style={[styles.modalItem, { flex: 1, backgroundColor: '#eee' }]}>
                  <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* RSVP modal (shows list of people who RSVPed and toggle for "me") */}
        <Modal visible={!!rsvpModalEvent} transparent animationType="fade" onRequestClose={() => setRsvpModalEvent(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 8 }}>Attendees</Text>
              {(() => {
                if (!rsvpModalEvent) return null;
                const ids = getEventRsvps(club.id, rsvpModalEvent);
                const names = ids.map((id) => club.members.find((m) => m.id === id)?.name ?? id);
                return (
                  <View style={{ maxHeight: 240 }}>
                    {names.length === 0 && <Text style={{ color: '#666' }}>No RSVPs yet</Text>}
                    {names.map((n, i) => (
                      <React.Fragment key={i}>
                        <Text style={{ paddingVertical: 6 }}>{n}</Text>
                      </React.Fragment>
                    ))}
                  </View>
                );
              })()}

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Pressable onPress={() => { if (rsvpModalEvent) { toggleMyRsvp(rsvpModalEvent); } }} style={[styles.modalItem, { flex: 1, backgroundColor: '#222' }]}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Toggle My RSVP</Text>
                </Pressable>
                <Pressable onPress={() => setRsvpModalEvent(null)} style={[styles.modalItem, { flex: 1, backgroundColor: '#eee' }]}>
                  <Text style={{ textAlign: 'center' }}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {/* Calendar modal: choose external calendar to add event to */}
        <Modal visible={!!calendarModalEvent} transparent animationType="fade" onRequestClose={() => setCalendarModalEvent(null)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={{ fontWeight: '800', fontSize: 16, marginBottom: 8 }}>Add to External Calendar</Text>
              <Text style={{ color: '#444', marginBottom: 10 }}>Choose a calendar to add this event to:</Text>

              {CALENDAR_OPTIONS.map((c) => (
                <Pressable key={c} onPress={() => setSelectedCalendar(c)} style={({ pressed }: { pressed: boolean }) => [styles.modalItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, pressed && { opacity: 0.9 }]}>
                  <Text>{c}</Text>
                  {selectedCalendar === c && <Text style={{ color: '#2563eb', fontWeight: '700' }}>✓</Text>}
                </Pressable>
              ))}

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => {
                    // mock adding to external calendar
                    const evId = calendarModalEvent;
                    if (!evId) return;
                    // Ideally we'd generate an .ics or use deep-links; for prototype, just show confirmation
                    Alert.alert('Added', `Event added to ${selectedCalendar} (mock)`);
                    setCalendarModalEvent(null);
                  }}
                  style={[styles.modalItem, { flex: 1, backgroundColor: '#222' }]}
                >
                  <Text style={{ color: 'white', textAlign: 'center' }}>Add</Text>
                </Pressable>

                <Pressable onPress={() => setCalendarModalEvent(null)} style={[styles.modalItem, { flex: 1, backgroundColor: '#eee' }]}>
                  <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        {tab === 'analytics' && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>Analytics</Text>
            <View style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}>
              {(() => {
                const a = getAnalytics(club.id);
                if (!a) return <Text>No analytics available</Text>;
                return (
                  <View>
                    <Text>Members: {a.membersCount}</Text>
                    <Text>Upcoming events: {a.upcomingEvents}</Text>
                    <Text>Polls: {a.polls}</Text>
                    <Text>Total RSVPs (upcoming): {a.upcomingRsvps}</Text>
                  </View>
                );
              })()}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f4fa' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, fontWeight: '900' },
  backBtn: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 8,
    marginTop: 12,
    width: 90,
    alignItems: 'center',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16, // Increased padding
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 14, // Increased spacing
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  roleBtn: {
    backgroundColor: '#6150b8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tabRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' as any, marginBottom: 8 },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  tabActive: { backgroundColor: '#222', borderColor: '#222' },
  tabText: { color: '#222', fontWeight: '700' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  modalCard: { width: '86%', backgroundColor: 'white', padding: 14, borderRadius: 12 },
  modalItem: { paddingVertical: 12, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff', width: '100%', marginBottom: 6 },
  primaryActionBtn: {
    backgroundColor: '#222', // Standardize to Black/Dark Gray for primary actions
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  input: { borderWidth: 1, borderColor: '#ddd', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, backgroundColor: '#fff', marginBottom: 8 },
});
