import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreType {
    token: string | null;
    admin: IAdmin | null;
    setToken: (token: string) => void;
    setAdmin: (admin: IAdmin) => void;
    logout: () => void;
}


const useAuthStore = create<AuthStoreType>()(
    persist((set) => ({
        token: null,
        admin: null,
        setToken: (token: string) => set({ token }),
        setAdmin: (admin: IAdmin) => set({ admin }),
        logout: () => set({ token: null, admin: null }),
    }), {
        name: "quality-auth-store",
        partialize: (state) => ({ token: state.token, admin: state.admin }),
    })
);
export default useAuthStore;