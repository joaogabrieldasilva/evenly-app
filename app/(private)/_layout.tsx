import { Stack } from "expo-router";

export default function PrivateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Your groups" }}
      />
      <Stack.Screen name="group" />
    </Stack>
  );
}
