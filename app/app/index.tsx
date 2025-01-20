import { useAuth, useAuthActions } from "@/src/store/auth";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          auth().signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
