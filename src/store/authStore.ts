// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { userApi } from '../services/userApi';
import type { User, AuthResponse } from '../services/userApi';

interface AuthState {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
  
  setAccessToken: (token: string) => void
  login: (data: AuthResponse) => void
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isLoading: true,
      isAuthenticated: false,

      setAccessToken: (token) => set({ accessToken: token }),

      login: (data) => set({
        user: data.user,
        accessToken: data.accessToken,
        isAuthenticated: true,
        isLoading: false,
      }),

      logout: async () => {
        try {
          await userApi.logout()
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({ user: null, accessToken: null, isAuthenticated: false })
        }
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          // Сначала пробуем получить данные пользователя (это вызовет refresh, если токен протух)
          const user = await userApi.me()
          set({ user, isAuthenticated: true })
        } catch (error) {
          // Если не удалось, очищаем стейт
          set({ user: null, accessToken: null, isAuthenticated: false })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage', // имя в localStorage
      storage: createJSONStorage(() => localStorage),
      // Сохраняем только accessToken, user будем всегда проверять через API при загрузке
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
)