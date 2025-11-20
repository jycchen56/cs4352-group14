import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("overlay-swipe");
    }
  }, []);

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ fontSize: 24, color }}>🌎</Text>,
          }}
        />
        <Tabs.Screen
          name="createType"
          options={{
            title: 'Create',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ fontSize: 24, color }}>➕</Text>,
          }}
        />
        <Tabs.Screen
          name="myclubs"
          options={{
            title: 'Clubs',
            tabBarIcon: ({ color }: { color: string }) => <Text style={{ fontSize: 24, color }}>👥</Text>,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null, // Hide index from tabs
          }}
        />
         {/* Hide other screens from the tab bar but keep them in the navigator */}
        <Tabs.Screen name="chatpage" options={{ href: null }} />
        <Tabs.Screen name="clubview" options={{ href: null }} />
        <Tabs.Screen name="create" options={{ href: null }} />
        <Tabs.Screen name="createClubBasics" options={{ href: null }} />
        <Tabs.Screen name="createClubMembers" options={{ href: null }} />
        <Tabs.Screen name="createClubReview" options={{ href: null }} />
        <Tabs.Screen name="createEventBasics" options={{ href: null }} />
        <Tabs.Screen name="createEventLocation" options={{ href: null }} />
        <Tabs.Screen name="eventPost" options={{ href: null }} />
        <Tabs.Screen name="eventReview" options={{ href: null }} />
        <Tabs.Screen name="eventdetails" options={{ href: null }} />
        <Tabs.Screen name="invitations" options={{ href: null }} />
        <Tabs.Screen name="login" options={{ href: null }} />
        <Tabs.Screen name="manageclub" options={{ href: null }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
