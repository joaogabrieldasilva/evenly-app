import { api } from "@/src/http/api";
import { refreshToken } from "@/src/http/auth/refresh-token";
import { useAuth, useAuthActions } from "@/src/store/auth-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";

let isRefreshing = false;

export default function Index() {
  const { userId } = useAuth();
  const { signOut } = useAuthActions();
  const rootNavigationState = useRootNavigationState();
  const isRouterReady = !!rootNavigationState?.key;

  const queryClient = useQueryClient();

  useEffect(() => {
    api.interceptors.response.use(
      async (response) => response,
      async (error: AxiosError) => {
        console.log(error.status);
        if (error.status === 401) {
          const refreshAuthToken = await AsyncStorage.getItem(
            "@evenly/refreshToken"
          );

          if (!isRefreshing) {
            isRefreshing = true;
            console.warn("REFRESHING TOKEN");

            try {
              if (!refreshAuthToken) {
                signOut();
                return Promise.reject(error);
              }

              const response = await refreshToken({
                refreshToken: refreshAuthToken,
              });

              await AsyncStorage.setItem(
                "@evenly/authToken",
                response.authToken
              );
              await AsyncStorage.setItem(
                "@evenly/refreshToken",
                response.refreshToken
              );

              console.warn("TOKEN REFRESHED");
              console.warn("Retrying failed queries");

              setTimeout(() => {
                const failed401Queries = queryClient
                  .getQueryCache()
                  .findAll()
                  .filter((query) => {
                    const error = query.state.error as AxiosError;
                    return error?.response?.status === 401;
                  });
                failed401Queries.forEach((query) => query.fetch());
              }, 0);
              console.warn("Finish failed queries refetch");
              return Promise.resolve(api(error.config!));
            } catch (error) {
              signOut();
              return Promise.reject(error);
            } finally {
              isRefreshing = false;
            }
          }

          return Promise.reject(error);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (isRouterReady) {
      router.replace(userId ? "/(private)/(tabs)" : "/auth/sign-in");
    }
  }, [userId, isRouterReady]);

  return null;
}
