import { listClubs } from './clubStore';

export type UserProfile = {
  id: string;
  username: string;
  password: string; // plaintext for prototype only
  name: string;
};

// Hard-coded profiles for prototype/demo
const users: UserProfile[] = [
  { id: 'me', username: 'you', password: 'you', name: 'You' },
  { id: 'm1', username: 'alex', password: 'alex', name: 'Alex' },
  { id: 'm2', username: 'sam', password: 'sam', name: 'Sam' },
  { id: 'm3', username: 'carmen', password: 'carmen', name: 'Carmen' },
  { id: 'm4', username: 'priya', password: 'priya', name: 'Priya' },
  { id: 'm5', username: 'diego', password: 'diego', name: 'Diego' },
];

let currentUserId: string | null = 'm1';
let currentNotifications: Array<{
  clubId: string;
  clubTitle: string;
  eventId: string;
  eventTitle: string;
  date?: string;
}> = [];

export function listProfiles(): UserProfile[] {
  return users;
}

export function getProfileByUsername(username: string): UserProfile | undefined {
  return users.find((u) => u.username === username);
}

export function login(username: string, password: string): UserProfile | null {
  const u = users.find((p) => p.username === username && p.password === password);
  if (!u) return null;
  currentUserId = u.id;
  computeNotificationsForCurrentUser();
  return u;
}

export function logout() {
  currentUserId = null;
  currentNotifications = [];
}

export function getCurrentUser() {
  return users.find((u) => u.id === currentUserId) ?? null;
}

export function getNotificationsForCurrentUser() {
  computeNotificationsForCurrentUser();
  return currentNotifications;
}

// compute notifications: find all clubs where the user is a member and any upcoming events
function computeNotificationsForCurrentUser() {
  currentNotifications = [];
  if (!currentUserId) return;
  const clubs = listClubs();
  const now = Date.now();
  for (const c of clubs) {
    for (const e of c.events) {
      if (!e.date) continue;
      const t = Date.parse(e.date);
      if (isNaN(t)) continue;
      // upcoming if in the future
      if (t > now) {
        // check if this user RSVP'd
        if (e.rsvps && e.rsvps.includes(currentUserId)) {
          currentNotifications.push({
            clubId: c.id,
            clubTitle: c.title,
            eventId: e.id,
            eventTitle: e.title,
            date: e.date,
          });
        }
      }
    }
  }
}

// helper for development: compute notifications for a given user id
export function computeNotificationsForUserId(userId: string) {
  const prev = currentUserId;
  currentUserId = userId;
  computeNotificationsForCurrentUser();
  const result = currentNotifications.slice();
  currentUserId = prev;
  return result;
}

// Initialize notifications for the default user
computeNotificationsForCurrentUser();
