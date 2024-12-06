import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    users: any;
    setUser: (users: any) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: null,
            setUser: (users: any) => set({ users }),
            clearUser: () => set({ users: null }),
        }),
        {
            name: "user-storage",
            partialize: (state) => ({ users: state.users })
        }
    )
);