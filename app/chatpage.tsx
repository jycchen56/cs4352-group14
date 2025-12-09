import { useRouter } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Msg = {
  id: string;
  author: string;
  text: string;
  time: string;
  me?: boolean;          // right-side bubble when true
};

export default function ChatRoom() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList<Msg>>(null);

  const data = useMemo<Msg[]>(
    () => [
      { id: "1", author: "Chris", text: "Wassup! Excited to meet you guys", time: "12:30 PM" },
      { id: "2", author: "", text: "Likewise!", time: "12:30 PM", me: true },
      { id: "3", author: "Jay", text: "I want you guys to guess my costume", time: "12:31 PM" },
      { id: "4", author: "", text: "I think you’re dressed as a\npirate", time: "12:31 PM", me: true },
      { id: "5", author: "Catherine", text: "Please don’t wear a clown costume!!", time: "12:32 PM" },
    ],
    []
  );

  function send() {
    if (!input.trim()) return;
    //plug into backend
    setInput("");
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  }

  const renderItem = ({ item }: { item: Msg }) => {
    const isMe = !!item.me;

    return (
      <View
        style={[
          styles.row,
          { justifyContent: isMe ? "flex-end" : "flex-start", marginTop: 12 },
        ]}
      >
        {!isMe && (
          <View style={styles.avatar}>
            <View style={styles.avatarPattern} />
          </View>
        )}

        <View
          style={[
            styles.bubble,
            isMe ? styles.bubbleMe : styles.bubbleOther,
            !isMe && { marginLeft: 6 },
          ]}
        >
          {!isMe && (
            <Text style={styles.author} numberOfLines={1}>
              {item.author}
            </Text>
          )}
          <Text style={[styles.msgText, isMe && { color: "white" }]}>{item.text}</Text>

          <Text style={[styles.timestamp, isMe && { color: "#e6f3e6" }]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={{ fontSize: 22 }}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Halloween Party</Text>
        <View style={{ width: 22 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        {/* unique ice breaker hardcode */}
        <View style={styles.iceWrap}>
          <Text style={styles.iceLabel}>Ice Breaker Suggestion</Text>
          <View style={styles.iceCard}>
            <Text style={styles.iceText}>
              Try sharing your costume idea{"\n"}(or what not to wear this year 👀).
            </Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />

        <View style={styles.composer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message"
            placeholderTextColor="#777"
            style={styles.input}
            autoFocus={false}
            multiline
          />
          <Pressable onPress={send} style={({ pressed }) => [styles.sendBtn, pressed && { opacity: 0.9 }]}>
            <Text style={{ color: "white", fontWeight: "700" }}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BG = "#f7f4fa";          // app background (theme)
const GREEN = "#3a944d";       // my bubble
const BUBBLE = "#ffffff";      // others' bubble
const BORDER = "#d6d6d6";
const ICE_BG = "#ffffff";
const ICE_BORDER = "#bdb7c9";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  iceWrap: { paddingHorizontal: 16, marginBottom: 6 },
  iceLabel: { fontSize: 12, color: "#444", marginBottom: 6 },
  iceCard: {
    borderWidth: 1,
    borderColor: ICE_BORDER,
    backgroundColor: ICE_BG,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  iceText: { color: "#333", textAlign: "center", lineHeight: 18 },

  row: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 6 },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#e9e9e9",
    borderWidth: 1,
    borderColor: "#d0d0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPattern: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  bubble: {
    maxWidth: "72%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  bubbleOther: {
    backgroundColor: BUBBLE,
    borderColor: BORDER,
  },
  bubbleMe: {
    backgroundColor: GREEN,
    borderColor: "#2e7d3d",
    marginLeft: 40,
  },
  author: { fontWeight: "700", marginBottom: 2, color: "#222" },
  msgText: { fontSize: 15, color: "#111" },
  timestamp: {
    fontSize: 10,
    color: "#7a7a7a",
    alignSelf: "flex-end",
    marginTop: 6,
  },

  composer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: BORDER,
  },
  sendBtn: {
    backgroundColor: "#222",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
