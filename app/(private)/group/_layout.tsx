import { router, Stack } from "expo-router";
import { XIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function GroupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="group-qr-code"
        options={{
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen
        name="join-group"
        options={{
          presentation: "transparentModal",
        }}
      />
    </Stack>
  );
}
