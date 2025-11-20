import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateClubBasics() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const canContinue = title.trim().length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    const q = `?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;
    router.push(`/createClubMembers${q}` as any);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={{ fontSize: 22 }}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Create Club</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Club Name <Text style={styles.required}>*</Text></Text>
          <TextInput placeholder="Photography Club" placeholderTextColor="#999" value={title} onChangeText={setTitle} style={styles.input} />

          <Text style={[styles.label, { marginTop: 18 }]}>Description</Text>
          <TextInput placeholder="Short description" placeholderTextColor="#999" value={description} onChangeText={setDescription} multiline style={[styles.input, styles.textArea]} />
        </ScrollView>

        <View style={styles.footer}>
          <Pressable onPress={handleContinue} disabled={!canContinue} style={({ pressed }) => [styles.cta, !canContinue && { opacity: 0.4 }, pressed && canContinue && { opacity: 0.9 }]}>
            <Text style={styles.ctaText}>Continue</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f4fa' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 6, paddingBottom: 4 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '800', marginRight: 22 },
  scrollContent: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 6 },
  required: { color: '#c0392b' },
  input: { borderWidth: 1, borderColor: '#b8b8b8', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#fbfbfb', fontSize: 14 },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  footer: { paddingHorizontal: 18, paddingBottom: 10 },
  cta: { backgroundColor: '#222', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  ctaText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
