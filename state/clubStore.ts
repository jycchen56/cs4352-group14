type Role = 'member' | 'organizer' | 'moderator' | 'planner';

export type Member = {
  id: string;
  name: string;
  role: Role;
};

export type ClubEvent = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  rsvps?: string[]; // member ids who RSVP'd
};

export type Poll = {
  id: string;
  question: string;
  options: { id: string; label: string; votes: number }[];
};

export type Club = {
  id: string;
  title: string;
  description?: string;
  members: Member[];
  events: ClubEvent[];
  polls: Poll[];
  resources: { id: string; label: string; url?: string }[];
};

// simple in-memory store (richly seeded) for prototyping — entirely hard-coded
let clubs: Club[] = [
  {
    id: 'club-1',
    title: 'Photography Club',
    description: 'Weekly meetups to share photos and technique.',
    members: [
      { id: 'm1', name: 'Alex', role: 'organizer' },
      { id: 'me', name: 'You', role: 'member' },
      { id: 'm2', name: 'Sam', role: 'moderator' },
      { id: 'm4', name: 'Priya', role: 'planner' },
    ],
    events: [
      {
        id: 'e0-past',
        title: 'Autumn Photo Walk',
        description: 'A casual morning walk to photograph fall foliage.',
        date: '2025-10-10T10:00:00',
        location: 'Old Town',
        rsvps: ['m1'],
      },
      {
        id: 'e1',
        title: 'Golden Hour Shoot',
        description: 'Meet at the pier to capture sunset shots.',
        date: '2025-11-20T17:00:00',
        location: 'Pier 7',
        rsvps: ['me', 'm1', 'm2'],
      },
      {
        id: 'e2',
        title: 'Studio Lighting Workshop',
        description: 'Intro to studio lighting and flashes.',
        date: '2025-12-05T18:30:00',
        location: 'Room 210',
        rsvps: ['m1'],
      },
    ],
    polls: [
      {
        id: 'p1',
        question: 'Which weekend works for the next meetup?',
        options: [
          { id: 'o1', label: 'Nov 29-30', votes: 6 },
          { id: 'o2', label: 'Dec 6-7', votes: 3 },
          { id: 'o3', label: 'Dec 13-14', votes: 1 },
        ],
      },
    ],
    resources: [
      { id: 'r1', label: 'Pier 7 Map', url: 'https://example.com/pier7-map.pdf' },
      { id: 'r2', label: 'Studio Checklist', url: 'https://example.com/studio-checklist.md' },
    ],
  },

  {
    id: 'club-2',
    title: 'Board Game Night',
    description: 'Monthly board game evening with snacks.',
    members: [
      { id: 'me', name: 'You', role: 'member' },
      { id: 'm3', name: 'Carmen', role: 'organizer' },
      { id: 'm5', name: 'Diego', role: 'moderator' },
    ],
    events: [
      {
        id: 'b-e1',
        title: 'Monthly Game Night — November',
        description: 'Bring your favorite two-player games.',
        date: '2025-11-28T19:00:00',
        location: 'Community Hall',
        rsvps: ['me', 'm3'],
      },
    ],
    polls: [
      {
        id: 'b-p1',
        question: 'Which game should we spotlight?',
        options: [
          { id: 'o1', label: 'Azul', votes: 4 },
          { id: 'o2', label: 'Codenames', votes: 8 },
        ],
      },
    ],
    resources: [
      { id: 'b-r1', label: 'Hall Directions', url: 'https://example.com/hall-directions.png' },
    ],
  },


  {
    id: 'club-3',
    title: 'Hiking Adventures',
    description: 'Weekend hikes for all skill levels.',
    members: [
      { id: 'm2', name: 'Sam', role: 'organizer' },
      { id: 'm5', name: 'Diego', role: 'member' },
    ],
    events: [
      {
        id: 'h-e1',
        title: 'Mountain Trail Loop',
        description: 'A 5-mile loop with scenic views.',
        date: '2025-11-22T08:00:00',
        location: 'Blue Ridge Start',
        rsvps: ['m2', 'm5'],
      },
    ],
    polls: [],
    resources: [],
  },
];

export function listClubs(): Club[] {
  return clubs;
}

export function listClubsForUser(userId: string): Club[] {
  return clubs.filter((c) => c.members.some((m) => m.id === userId));
}

export function getClubById(id: string): Club | undefined {
  return clubs.find((c) => c.id === id);
}

export function createClub(title: string, description?: string, ownerId = 'me', ownerName = 'You'): Club {
  const club: Club = {
    id: `club-${Date.now()}`,
    title,
    description,
    members: [{ id: ownerId, name: ownerName, role: 'organizer' }],
    events: [],
    polls: [],
    resources: [],
  };
  clubs.unshift(club);
  return club;
}

export function assignRole(clubId: string, memberId: string, role: Role) {
  const c = getClubById(clubId);
  if (!c) return false;
  const m = c.members.find((x) => x.id === memberId);
  if (!m) return false;
  m.role = role;
  return true;
}

export function addMember(clubId: string, member: Member) {
  const c = getClubById(clubId);
  if (!c) return false;
  if (c.members.some((m) => m.id === member.id)) return false;
  c.members.push(member);
  return true;
}

export function createEvent(clubId: string, ev: ClubEvent) {
  const c = getClubById(clubId);
  if (!c) return false;
  c.events.push(ev);
  return true;
}

export function getClubEvents(clubId: string): ClubEvent[] {
  const c = getClubById(clubId);
  return c ? c.events : [];
}

export function getClubPolls(clubId: string): Poll[] {
  const c = getClubById(clubId);
  return c ? c.polls : [];
}

export function getClubResources(clubId: string) {
  const c = getClubById(clubId);
  return c ? c.resources : [];
}

export function createPoll(clubId: string, poll: Poll) {
  const c = getClubById(clubId);
  if (!c) return false;
  c.polls.push(poll);
  return true;
}

export function addResource(clubId: string, resource: { id: string; label: string; url?: string }) {
  const c = getClubById(clubId);
  if (!c) return false;
  c.resources.push(resource);
  return true;
}

export function rsvpEvent(clubId: string, eventId: string, memberId: string) {
  const c = getClubById(clubId);
  if (!c) return false;
  const ev = c.events.find((e) => e.id === eventId);
  if (!ev) return false;
  if (!ev.rsvps) ev.rsvps = [];
  const idx = ev.rsvps.indexOf(memberId);
  if (idx === -1) {
    ev.rsvps.push(memberId);
  } else {
    // toggle off
    ev.rsvps.splice(idx, 1);
  }
  return true;
}

export function getEventRsvps(clubId: string, eventId: string): string[] {
  const c = getClubById(clubId);
  if (!c) return [];
  const ev = c.events.find((e) => e.id === eventId);
  return ev?.rsvps ?? [];
}

export function getAnalytics(clubId: string) {
  const c = getClubById(clubId);
  if (!c) return null;
  return {
    membersCount: c.members.length,
    upcomingEvents: c.events.length,
    polls: c.polls.length,
    upcomingRsvps: c.events.reduce((acc, e) => acc + (e.rsvps?.length ?? 0), 0),
  };
}

// helper for debug / hot reloading
export function __resetStore(newClubs: Club[]) {
  clubs = newClubs;
}
