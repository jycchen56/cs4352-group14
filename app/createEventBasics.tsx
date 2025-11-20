import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function CreateEventBasics() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("6:00pm");
  const [date, setDate] = useState("10/19/25");
  const [privacy, setPrivacy] = useState<"Public" | "Private">("Public");
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);

  const canContinue = title.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    // TODO: pass data via params or global state
    router.push("/createEventLocation");
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
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Create Event</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Title */}
          <Text style={styles.label}>
            Title of Event<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          {/* Description */}
          <Text style={[styles.label, { marginTop: 18 }]}>
            Description<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            placeholder="Enter Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            style={[styles.input, styles.textArea]}
          />

          {/* Time & Date */}
          <View style={styles.row}>
            <View style={[styles.column, { marginRight: 10 }]}>
              <Text style={styles.labelSmall}>
                Time of Event<Text style={styles.required}>*</Text>
              </Text>
              <Pressable style={styles.inlineField}>
                <Text style={styles.inlineFieldText}>{time}</Text>
                <Text style={styles.inlineIcon}>🕒</Text>
              </Pressable>
            </View>

            <View style={[styles.column, { marginLeft: 10 }]}>
              <Text style={styles.labelSmall}>
                Date of Event<Text style={styles.required}>*</Text>
              </Text>
              <Pressable style={styles.inlineField}>
                <Text style={styles.inlineFieldText}>{date}</Text>
                <Text style={styles.inlineIcon}>📅</Text>
              </Pressable>
            </View>
          </View>

          {/* Privacy */}
          <Text style={[styles.label, { marginTop: 22 }]}>Event Privacy</Text>
          <Pressable
            onPress={() => setShowPrivacyOptions((s) => !s)}
            style={styles.privacyField}
          >
            <Text style={styles.inlineFieldText}>{privacy}</Text>
            <Text style={styles.inlineIcon}>{showPrivacyOptions ? "˄" : "˅"}</Text>
          </Pressable>

          {showPrivacyOptions && (
            <View style={styles.privacyDropdown}>
              <Pressable
                style={styles.privacyOption}
                onPress={() => {
                  setPrivacy("Public");
                  setShowPrivacyOptions(false);
                }}
              >
                <Text style={styles.privacyText}>Public</Text>
              </Pressable>
              <Pressable
                style={styles.privacyOption}
                onPress={() => {
                  setPrivacy("Private");
                  setShowPrivacyOptions(false);
                }}
              >
                <Text style={styles.privacyText}>Private</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>

        {/* Continue Button */}
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

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  labelSmall: {
    fontSize: 12,
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
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    marginTop: 18,
  },
  column: { flex: 1 },

  inlineField: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    backgroundColor: "#fbfbfb",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inlineFieldText: { fontSize: 14, color: "#222" },
  inlineIcon: { fontSize: 14 },

  privacyField: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    backgroundColor: "#fbfbfb",
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  privacyDropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  privacyOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  privacyText: { fontSize: 14, color: "#222" },

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
