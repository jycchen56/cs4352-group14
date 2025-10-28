import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin() {
    // hardcoded credentials
    if (username === "admin" && password === "1234") {
      router.replace("/home");
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ width: "80%", padding: 10, borderWidth: 1, borderRadius: 6, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: "80%", padding: 10, borderWidth: 1, borderRadius: 6, marginBottom: 12 }}
      />

      {error ? <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text> : null}

      <Pressable onPress={handleLogin} style={{ backgroundColor: "black", padding: 12, borderRadius: 6 }}>
        <Text style={{ color: "white" }}>Login</Text>
      </Pressable>
    </View>
  );
}
