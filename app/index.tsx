import { Redirect } from "expo-router";

export default function Index() {
  // Use a render-time Redirect so navigation doesn't run before the Root Layout mounts.
  return <Redirect href="/login" />;
}
