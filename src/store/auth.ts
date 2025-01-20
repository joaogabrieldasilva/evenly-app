import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, combine, createJSONStorage } from "zustand/middleware";

type User = {
  name: string;
  email: string;
};

const authStore = create(
  persist(
    combine(
      {
        user: null as User | null,
      },
      (set) => ({
        actions: {
          setUser: (user: User | null) => set({ user }),
        },
      })
    ),
    {
      name: "auth",
      partialize: ({ actions, ...state }) => state,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useAuth = () => authStore(({ actions, ...state }) => state);

export const useAuthActions = () => authStore((state) => state.actions);
