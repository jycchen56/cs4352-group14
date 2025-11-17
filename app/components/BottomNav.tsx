import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const items = [
  { key: 'home', label: 'Home', path: '/home', icon: '🏠' },
  { key: 'explore', label: 'Explore', path: '/explore', icon: '🌎' },
  { key: 'create', label: 'Create', path: '/createType', icon: '➕' },
  { key: 'clubs', label: 'Clubs', path: '/myclubs', icon: '👥' },
  { key: 'profile', label: 'Profile', path: '/profile', icon: '👤' },
];

export default function BottomNav() {
  const router = useRouter();

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.row}>
        {items.map((it) => (
          <React.Fragment key={it.key}>
            <Pressable
              onPress={() => {
                try {
                  router.push(it.path);
                } catch (e) {
                  // fallback: attempt to set location for web
                  if (typeof window !== 'undefined') window.location.href = it.path;
                }
              }}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={styles.icon}>{it.icon}</Text>
              <Text style={styles.label}>{it.label}</Text>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '98%',
    maxWidth: 800,
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
  },
});
