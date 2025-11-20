import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type TypeOption = "club" | "event" | "post";

export default function CreateType() {
  const router = useRouter();
  const [selected, setSelected] = useState<TypeOption>("event");

  const goNext = () => {
    if (selected === "event") {
      router.push("/createEventBasics");
    } else if (selected === 'post') {
      router.push('/eventPost');
    } else {
      // placeholder for club flow
      router.push("/createClubBasics");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.subtitle}>Choose what you want to set up</Text>
      </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <SelectCard
              selected={selected === 'club'}
              onPress={() => setSelected('club')}
              imageUri="https://images.unsplash.com/photo-1517963628607-235ccdd5476f?q=80&w=1400&auto=format&fit=crop"
              heading="Club"
              blurb="For recurring meetups or ongoing groups."
              compact
            />

            <SelectCard
              selected={selected === 'event'}
              onPress={() => setSelected('event')}
              imageUri="https://images.unsplash.com/photo-1561470508-fd4df1ed90b0?q=80&w=1400&auto=format&fit=crop"
              heading="Event"
              blurb="For one-time gatherings or occasions."
              compact
            />

            <SelectCard
              selected={selected === 'post'}
              onPress={() => setSelected('post')}
              imageUri="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop"
              heading="Post"
              blurb="Share your experience from an event you attended."
              compact
              hideImage
            />
          </View>

          {/* Continue */}
          <Pressable onPress={goNext} style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}>
            <Text style={styles.ctaText}>Continue</Text>
          </Pressable>
        </ScrollView>
    </SafeAreaView>
  );
}

function SelectCard({
  selected,
  onPress,
  imageUri,
  heading,
  blurb,
  compact,
  hideImage,
}: {
  selected: boolean;
  onPress: () => void;
  imageUri: string;
  heading: string;
  blurb: string;
  compact?: boolean;
  hideImage?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardWrap,
        compact && styles.cardCompact,
        pressed && { opacity: 0.96 },
      ]}
    >
      <View
        style={[
          styles.imageWrap,
          compact && styles.imageWrapCompact,
          selected ? styles.imageWrapSelected : styles.imageWrapDefault,
        ]}
      >
        {hideImage ? (
          <View style={[styles.imagePlaceholder, compact && styles.imagePlaceholderCompact]} />
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        )}
        {selected && (
          <View style={styles.checkBadge}>
            <Text style={styles.checkMark}>✓</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardHeading}>{heading}</Text>
      <Text style={styles.cardBlurb}>{blurb}</Text>
    </Pressable>
  );
}

/* THEME */
const BG = "#f7f4fa";
const ACCENT_DARK = "#695aa6";
const BORDER = "#2b2b2b";
const CTA_BG = "#222";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 10 },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#000",
    letterSpacing: 0.2,
  },

  subtitle: { color: "#444", marginTop: 2 },

  cardWrap: { marginTop: 18 },
  cardCompact: { flex: 1, marginTop: 12, marginRight: 8 },

  imageWrap: {
    height: 190,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
  },
  imageWrapCompact: { height: 120 },

  imageWrapDefault: {
    borderColor: "#cfcadf",
    backgroundColor: "#e9e5f5",
  },

  imageWrapSelected: {
    borderColor: ACCENT_DARK,
    backgroundColor: "#e9e5f5",
  },

  image: { width: "100%", height: "100%" },
  imagePlaceholder: { width: '100%', height: '100%', backgroundColor: '#efeef0' },
  imagePlaceholderCompact: { height: 120 },

  checkBadge: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: ACCENT_DARK,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  checkMark: { color: "white", fontWeight: "800", fontSize: 16 },

  cardHeading: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "900",
    color: "#000",
  },

  cardBlurb: { color: "#666", marginTop: 2 },

  cta: {
    marginTop: 26,
    backgroundColor: CTA_BG,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  ctaText: { color: "white", fontSize: 18, fontWeight: "700" },
});
