import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin() {
    if (username === "admin" && password === "1234") {
      router.replace("/home");
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f4fa",
      }}
    >
      {/* Logo */}
      <Text
        style={{
          fontSize: 48,
          fontWeight: "900",
          fontStyle: "italic",
          marginBottom: 60,
          color: "black",
          fontFamily: "serif",
        }}
      >
        Crewly
      </Text>

      {/* Username */}
      <TextInput
        placeholder="username"
        placeholderTextColor="#555"
        value={username}
        onChangeText={setUsername}
        style={{
          width: "80%",
          padding: 12,
          borderWidth: 1,
          borderColor: "#333",
          borderRadius: 4,
          backgroundColor: "#fefcfc",
          marginBottom: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
        }}
      />

      {/* Password */}
      <TextInput
        placeholder="password"
        placeholderTextColor="#555"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: "80%",
          padding: 12,
          borderWidth: 1,
          borderColor: "#333",
          borderRadius: 4,
          backgroundColor: "#fefcfc",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 1,
        }}
      />

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() => console.log("Forgot password pressed")}
        style={{ alignSelf: "flex-start", marginLeft: "10%", marginTop: 4 }}
      >
        <Text style={{ color: "#1a3d91", fontSize: 12 }}>forgot password?</Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error ? (
        <Text style={{ color: "red", marginTop: 12, fontSize: 14 }}>{error}</Text>
      ) : null}

      {/* Login Button */}
      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: "#222",
          paddingVertical: 14,
          paddingHorizontal: 50,
          borderRadius: 8,
          marginTop: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Log in</Text>
      </Pressable>

      {/* Sign Up Link */}
      <View style={{ flexDirection: "row", marginTop: 80 }}>
        <Text style={{ color: "black", fontSize: 14 }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={{ color: "#1a3d91", fontSize: 14 }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
