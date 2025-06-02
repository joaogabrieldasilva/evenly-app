import { useRefreshToken } from "@/src/hooks/use-refresh-token";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function PrivateLayout() {
  useRefreshToken();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: "Your groups",
        }}
      />
    </Stack>
  );
}
