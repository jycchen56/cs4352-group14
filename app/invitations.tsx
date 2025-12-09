import { useRouter } from "expo-router";
import React from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
  peopleCount?: number;
  onReturnHome?: () => void;
  onGoToChat?: () => void;
};

export default function Invitation({
  peopleCount = 50,
  onReturnHome,
  onGoToChat,
}: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            You’ve been added to a group chat with{"\n"}other event attendees!
          </Text>

          <Text style={styles.countText}>+{peopleCount} people</Text>

          
          <View style={styles.buttonRow}>
            <Pressable
              onPress={onReturnHome ?? (() => router.replace("/home"))}
              style={({ pressed }: { pressed: boolean }) => [
                styles.button,
                styles.buttonLeft,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>Return home</Text>
            </Pressable>

            <Pressable
              onPress={onGoToChat ?? (() => router.push("/chatpage"))}
              style={({ pressed }: { pressed: boolean }) => [
                styles.button,
                styles.buttonRight,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>Go to chat</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PURPLE = "#b7abd4"; // light purple
const BORDER = "#2b2b2b";
const BTN_PURPLE = "#6150b8";
const BG = "#f7f4fa";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "88%",
    backgroundColor: PURPLE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    textAlign: "center",
    color: "#0b0b0b",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 14,
  },
  countText: {
    fontSize: 14,
    color: "#222",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: BTN_PURPLE,
    borderWidth: 1,
    borderColor: BORDER,
  },
  buttonLeft: {
    marginRight: 10,
  },
  buttonRight: {
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.85,
  },
});
