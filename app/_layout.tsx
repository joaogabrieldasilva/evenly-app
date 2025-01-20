import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import "react-native-reanimated";
import "../src/global.css";
import { useAuthActions } from "@/src/store/auth";

GoogleSignin.configure({
  webClientId: "autoDetect",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  hostedDomain: "",
  forceCodeForRefreshToken: true,
});
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setUser } = useAuthActions();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user === null) {
        setUser(null);
      } else {
        setUser({
          name: user?.displayName || "",
          email: user?.email || "",
        });
      }
    });
    return subscriber;
  }, []);

  if (!loaded) {
    return null;
  }

  return <Slot />;
}
