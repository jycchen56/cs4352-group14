import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function EventReview() {
  const router = useRouter();

  // TODO: replace with real event data from state/params
  const title = "Arcade Night";
  const location = "Plano";
  const dateTime = "10/19 – 6:00pm";
  const description =
    "Come hang out for a chill night of arcade games, laughs, and friendly competition. Bring your friends or meet new ones!";

  const handleCreate = () => {
    // here you’d actually create the event via API / state
    router.push("/eventPost");
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.replace("/createEventLocation")}
          hitSlop={12}
        >
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Confirm Event</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* Event image */}
        <View style={styles.imageWrap}>
          <Image
            source={{
              uri:
                "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=1400&auto=format&fit=crop",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* pill for location + date */}
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {location} • {dateTime}
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Create button */}
        <Pressable
          onPress={handleCreate}
          style={({ pressed }) => [
            styles.cta,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.ctaText}>Create</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const BG = "#f7f4fa";
const CTA_BG = "#222";
const BORDER = "#b8b8b8";

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
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  imageWrap: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginBottom: 6,
  },

  pill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#f3f3f3",
    marginBottom: 10,
  },
  pillText: { fontSize: 12, color: "#555" },

  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 30,
  },

  cta: {
    backgroundColor: CTA_BG,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  ctaText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
