import { useRefreshToken } from "@/src/hooks/use-refresh-token";
import { router, Stack } from "expo-router";
import { XIcon } from "lucide-react-native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

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
      <Stack.Screen
        name="create-expense"
        options={{
          presentation: "containedModal",
          title: "Criar Despesa",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <XIcon size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
