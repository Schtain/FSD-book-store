import {create} from 'zustand'


export interface DBUser {
    email: string;
    password: string;
}

interface AuthStateType {
    user: DBUser | null;
    isLoading: boolean;
    setUser: (user: DBUser | null) => void;
    setLoading: (isLoading: boolean) => void;
    initAuth: () => void;
    logout: () => void;
  
}

export const useAuthStore = create<AuthStateType>((set) => ({
    user: localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')!) : null,
    isLoading: false,

    setUser: (user) => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
    set({ user });
    },
    setLoading: (isLoading) => set({ isLoading }),

    initAuth: () => {
    const saved = localStorage.getItem('auth_user');
    if (saved) set({ user: JSON.parse(saved) });
    },
    logout: () => {
    localStorage.removeItem('auth_user');
    set({ user: null });
  }
}))

