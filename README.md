# Crewly — concise README

Quick setup

- Install dependencies: `npm install`
- Start dev server: `npx expo start` (open on simulator, device via Expo Go, or press `w` for web)

Test users (in-memory demo)

- username `you` / password `you` → id `me`
- username `alex` / password `alex` → id `m1`

How the UI works (short)

- Routes live in `app/` (Expo Router). `clubview.tsx` reads `clubId` and shows Events + Chat tabs.
- Join button: when not a member it navigates to `/invitations` (hardcoded demo flow).
- State is in `app/state/*.ts` (in-memory) — changes are NOT persisted across reloads.

Simple task:
Join a club/event and engage with the members
Steps:
1. Tap on the “Explore” page and browse the events/clubs
2. Tap on a club/event to view its details
3. Tap “Join” to become a member and automatically enter the event’s group chat
4. Participate by sending a response to the icebreaker or reacting to others’ messages

Moderate task:
Steps:
1.Click‘+’(Create)button
2. Choose whether to create a Club or an Event
3.Enter the title
4. Write a description of what it’s about
5.Select meeting time/date
6.Add a location
7.Add a coverphoto
8.Review details and click ‘Create’
9. Post about the event

Complex task:
Steps:
1. Go to “My Clubs” and select a club you manage
2. Tap “Manage Club”
3. Assign roles to members (i.e. organizer, moderator, planner)
4. Post a poll to decide the next event’s date
5. Create/add an event for its club + fill in its details
6. Add the event  to the club’s shared calendar, allow members to sync it with their calendars
7.  Upload additional resources/links (e.g. map, equipment location)
8. Enable RSVP tracking and view member attendance
9. Send (automated?) notifications/reminders about an event
10. Allow members to send photos, feedback, tips, a dedicated channel within the chat?
10. Post about the event
11. View analytics on attendance and engagement


Limitations

- No backend/persistence; data is volatile.
- Plaintext demo passwords in `app/state/userStore.ts`.

Repo

- https://github.com/jycchen56/cs4352-group14

Commands

```
npm install
npx expo start
```

Tell me if you want this committed as `README.md` instead or expanded further.