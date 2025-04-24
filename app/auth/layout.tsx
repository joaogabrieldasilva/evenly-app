import { useAuth, useAuthActions } from "@/src/store/auth-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function PublicLayout() {
  const { clear } = useAuthActions();

  useEffect(() => {
    AsyncStorage.removeItem("@evenly/authToken");
    AsyncStorage.removeItem("@evenly/refreshToken");
    clear();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="/sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}
