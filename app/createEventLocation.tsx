import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function CreateEventLocation() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const canContinue = location.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    // TODO: send data / navigate to review
    router.push("/eventReview");
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* Cover Photo Placeholder */}
        <View style={styles.coverBox}>
          {/* checkerboard effect */}
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
        </View>

        <Pressable onPress={() => {}} style={{ marginTop: 10 }}>
          <Text style={styles.coverText}>Add Cover Photo</Text>
        </Pressable>

        {/* Location */}
        <Text style={[styles.label, { marginTop: 28 }]}>
          Location<Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter Location"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
      </View>

      <View style={styles.footer}>
        <Pressable
          onPress={handleContinue}
          disabled={!canContinue}
          style={({ pressed }) => [
            styles.cta,
            !canContinue && { opacity: 0.4 },
            pressed && canContinue && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
      </View>
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

  coverBox: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
    backgroundColor: "#eee",
  },

  checkRow: {
    flexDirection: "row",
    flex: 1,
  },
  lightSquare: { flex: 1, backgroundColor: "#f3f3f3" },
  darkSquare: { flex: 1, backgroundColor: "#dcdcdc" },

  coverText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  required: { color: "#c0392b" },

  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fbfbfb",
    fontSize: 14,
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
