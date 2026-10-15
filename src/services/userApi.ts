// src/services/userApi.ts
import { api } from '../lib/axios'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  company?: string
}

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: 'user' | 'admin'
  isActivated: boolean
}

export interface AuthResponse {
  accessToken: string
  user: User
  cart?: any // Можно расширить тип позже
}

export const userApi = {
  login: async (data: LoginData) => {
    const response = await api.post<AuthResponse>('/auth/login', data)
    return response.data
  },

  register: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>('/auth/registration', data)
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
  },

  refresh: async () => {
    const response = await api.get<AuthResponse>('/auth/refresh')
    return response.data
  },

  me: async () => {
    const response = await api.get<User>('/auth/me')
    return response.data
  },

  activate: async (link: string) => {
    const response = await api.get<{ message: string }>(`/auth/activate/${link}`)
    return response.data
	},
  
  // src/services/userApi.ts (добавь в конец объекта userApi)

  requestReset: async (email: string) => {
    const response = await api.post<{ message: string }>('/restore/reset', { email })
    return response.data
  },

  validateResetLink: async (id: string, token: string) => {
    const response = await api.get<{ valid: boolean }>(`/restore/reset/${id}/${token}`)
    return response.data
  },

  resetPassword: async (id: string, token: string, password: string) => {
    const response = await api.post<{ message: string }>(`/restore/reset/${id}/${token}`, { password })
    return response.data
  },
}