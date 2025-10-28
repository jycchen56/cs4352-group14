import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  // Render a navigator (Stack) with a Slot so child routes can mount immediately.
  // Using a Stack ensures a navigator is present on first render and avoids
  // race conditions where children try to navigate before the layout mounts.
  return (
    <Stack>
      <Slot />
    </Stack>
  );
}
