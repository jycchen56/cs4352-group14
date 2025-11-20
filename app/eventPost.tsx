import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { listClubs } from "../state/clubStore";
import { createPost } from "../state/postStore";
import { getCurrentUser } from "../state/userStore";

export default function EventPost() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(undefined);

  const user = getCurrentUser();

  const attendedPastEvents = useMemo(() => {
    if (!user) return [] as { clubId: string; eventId: string; title: string; date?: string }[];
    const clubs = listClubs();
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
  }, [user]);

  const canPost = description.trim().length > 0 && !!selectedEventId;

  const handlePost = () => {
    if (!canPost || !user) return;
    // find club id for event
    let clubForEvent: string | undefined;
    const clubs = listClubs();
    for (const c of clubs) {
      if (c.events.some((e) => e.id === selectedEventId)) {
        clubForEvent = c.id;
        break;
      }
    }
    createPost({
      authorId: user.id,
      authorName: user.name,
      clubId: clubForEvent,
      eventId: selectedEventId,
      content: description.trim(),
    });
    router.replace("/home"); // return to home after posting
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header (no back button) */}
        <View style={styles.header}>
          <View style={{ width: 22 }} />
          <Text style={styles.headerTitle}>Post</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.content}>
          {/* Select event you attended */}
          <Text style={{ marginBottom: 6 }}>Event (you attended)</Text>
          {attendedPastEvents.length === 0 ? (
            <Text style={{ color: '#666', marginBottom: 8 }}>No past attended events found.</Text>
          ) : (
            <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginBottom: 8 }}>
              {attendedPastEvents.map((e) => (
                <Pressable
                  key={e.eventId}
                  onPress={() => setSelectedEventId(e.eventId)}
                  style={{ paddingVertical: 8, paddingHorizontal: 6, backgroundColor: selectedEventId === e.eventId ? '#eef' : 'transparent', borderRadius: 6, marginBottom: 6 }}
                >
                  <Text style={{ fontWeight: selectedEventId === e.eventId ? '700' : '400' }}>{e.title} {e.date ? `— ${new Date(e.date).toLocaleDateString()}` : ''}</Text>
                </Pressable>
              ))}
            </View>
          )}
          {/* Description box */}
          <TextInput
            placeholder="Enter Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.textArea}
          />

          {/* Upload picture placeholder */}
          <Pressable onPress={() => {}} style={styles.uploadBox}>
            {/* checkerboard */}
            <View style={styles.checkRow}>
              <View style={styles.lightSquare} />
              <View style={styles.darkSquare} />
              <View style={styles.lightSquare} />
              <View style={styles.darkSquare} />
            </View>
            <View style={styles.checkRow}>
              <View style={styles.darkSquare} />
              <View style={styles.lightSquare} />
              <View style={styles.darkSquare} />
              <View style={styles.lightSquare} />
            </View>
            <View style={styles.checkRow}>
              <View style={styles.lightSquare} />
              <View style={styles.darkSquare} />
              <View style={styles.lightSquare} />
              <View style={styles.darkSquare} />
            </View>

            <View style={styles.uploadLabelWrap}>
              <Text style={styles.uploadLabel}>Upload Picture</Text>
            </View>
          </Pressable>
        </View>

        {/* Post button */}
        <View style={styles.footer}>
          <Pressable
            onPress={handlePost}
            disabled={!canPost}
            style={({ pressed }) => [
              styles.cta,
              !canPost && { opacity: 0.4 },
              pressed && canPost && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.ctaText}>Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BG = "#f7f4fa";
const BORDER = "#b8b8b8";
const CTA_BG = "#222";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  uploadBox: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
    backgroundColor: "#eee",
    position: "relative",
  },

  checkRow: {
    flexDirection: "row",
    flex: 1,
  },
  lightSquare: { flex: 1, backgroundColor: "#f3f3f3" },
  darkSquare: { flex: 1, backgroundColor: "#dcdcdc" },

  uploadLabelWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 4,
  },
  backArrow: { fontSize: 22 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    marginRight: 22,
  },

  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  textArea: {
    minHeight: 140,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#fbfbfb",
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: "top",
    fontSize: 14,
    marginBottom: 22,
  },

  
  

  footer: {
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  cta: {
    backgroundColor: CTA_BG,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  ctaText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
