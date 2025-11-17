import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function EventPost() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const canPost = description.trim().length > 0;

  const handlePost = () => {
    if (!canPost) return;
    // send post to backend / feed
    router.replace("/home"); // or wherever you want after posting
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.replace("/eventReview")}
            hitSlop={12}
          >
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Post</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.content}>
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
