import { create } from "zustand";
import { persist, combine, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  name: null as string | null,
  email: null as string | null,
  userId: null as string | null,
};

export const authStore = create(
  persist(
    combine(initialState, (set) => ({
      actions: {
        setLoggedUser: ({ id, ...rest }: AuthUser) =>
          set({ userId: id, ...rest }),
        clear: () => set({ ...initialState }),
        signOut: () => set({ ...initialState }),
      },
    })),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ actions, ...rest }) => rest,
    }
  )
);

export const useAuth = () => authStore((state) => state);

export const useAuthActions = () => authStore(({ actions }) => actions);
