import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { clearSelectedEvent, getSelectedEvent } from "../state/eventStore";

type Props = {
  imageUri?: string;
  onAttend?: () => void;
};

export default function EventDetails({ imageUri, onAttend }: Props) {
  const router = useRouter();
  // read from the in-memory event store (set by EventCard) as a runtime-safe fallback
  const selected = getSelectedEvent();
  const titleFromParams = selected?.title;
  const descriptionFromParams = selected?.description;

  // clear after reading so subsequent opens don't reuse stale data
  React.useEffect(() => {
    return () => {
      clearSelectedEvent();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f4fa" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingTop: 8,
        }}
      >
        <Pressable
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          hitSlop={12}
        >
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>

        {/* tiny grabber */}
        <View
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: [{ translateX: -20 }],
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#bbb",
            opacity: 0.8,
          }}
        />

        <Pressable
          accessibilityLabel="Close"
          onPress={() => router.back()}
          hitSlop={12}
        >
          <Text style={{ fontSize: 20 }}>✕</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 40,
            fontWeight: "900",
            fontStyle: "italic",
            color: "black",
            textAlign: "left",
            marginTop: 8,
            marginBottom: 6,
            fontFamily: "serif",
          }}
        >
          {titleFromParams ?? "Halloween Party"}
        </Text>

        
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            fontStyle: "italic",
            color: "black",
            marginBottom: 14,
            fontFamily: "serif",
          }}
        >
          Location
        </Text>

        
        <View
          style={{
            backgroundColor: "#eee",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : {
                    uri:
                      // placeholder
                      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop",
                  }
            }
            style={{ width: "100%", height: 360 }}
            resizeMode="cover"
          />
        </View>

        
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 16, color: "black", marginBottom: 10 }}>
            <Text style={{ fontWeight: "600" }}>Date:</Text> October 31, 2025 at 7pm
          </Text>

          <Text style={{ fontSize: 16, color: "black", lineHeight: 22 }}>
            {descriptionFromParams ?? "Come dressed in a costume and party with other workers!"}
          </Text>
        </View>

        
        <Pressable
          onPress={() => {
            if (onAttend) onAttend();
            router.push("/invitations");
          }}
          style={{
            backgroundColor: "#222",
            paddingVertical: 16,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 28,
            marginHorizontal: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Attend</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
