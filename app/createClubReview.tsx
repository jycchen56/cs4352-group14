import { useRouter, useSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { addMember, createClub } from './state/clubStore';
import { getCurrentUser } from './state/userStore';

function readParams() {
  try {
    const p: any = useSearchParams();
    return { title: p.title ?? '', description: p.description ?? '', invites: p.invites ?? '[]' };
  } catch (e) {
    if (typeof window !== 'undefined') {
      const q = new URLSearchParams(window.location.search);
      return { title: q.get('title') ?? '', description: q.get('description') ?? '', invites: q.get('invites') ?? '[]' };
    }
  }
  return { title: '', description: '', invites: '[]' };
}

export default function CreateClubReview() {
  const router = useRouter();
  const params = readParams();
  const user = getCurrentUser();

  const invites = React.useMemo(() => {
    try {
      return JSON.parse(params.invites || '[]');
    } catch (e) {
      return [];
    }
  }, [params.invites]);

  const handleCreate = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const club = createClub(params.title || 'New Club', params.description || '', user.id, user.name);
    // add invited members as plain members (best-effort)
    invites.forEach((i: string) => {
      // generate a simple id for demo users
      const id = `invite-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      addMember(club.id, { id, name: i, role: 'member' } as any);
    });

    // navigate to manage view for the creator
    router.replace(`/manageclub?clubId=${encodeURIComponent(club.id)}` as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f4fa' }}>
      <View style={{ paddingHorizontal: 18, paddingTop: 18 }}>
        <Text style={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }}>Review Club</Text>
      </View>

      <View style={{ padding: 18 }}>
        <Text style={{ fontSize: 16, fontWeight: '800' }}>{params.title}</Text>
        <Text style={{ color: '#444', marginTop: 8 }}>{params.description}</Text>

        <View style={{ marginTop: 18 }}>
          <Text style={{ fontWeight: '700' }}>Invites</Text>
          {invites.length === 0 ? <Text style={{ color: '#666', marginTop: 6 }}>No invites</Text> : invites.map((i: string, idx: number) => (<Text key={idx} style={{ marginTop: 6 }}>{i}</Text>))}
        </View>
      </View>

      <View style={{ paddingHorizontal: 18, paddingBottom: 18 }}>
        <Pressable onPress={handleCreate} style={({ pressed }) => [{ backgroundColor: '#222', paddingVertical: 12, borderRadius: 8, alignItems: 'center' }, pressed && { opacity: 0.9 }]}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Create Club</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
