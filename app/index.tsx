import { api } from "@/src/http/api";
import { useAuth } from "@/src/store/auth-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const { userId } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("@evenly/authToken").then((token) => {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setIsReady(true);
    });
  }, []);

  return (
    <Redirect
      href={userId && isReady ? "/(private)/(tabs)" : "/auth/sign-in"}
    />
  );
}
