// src/lib/axios.ts
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // КРИТИЧНО ВАЖНО для работы с HttpOnly куками
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерсептор запросов: добавляем accessToken в заголовок, если он есть
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Интерсептор ответов: обрабатываем 401 и делаем refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Если ошибка 401 и это не повторный запрос после refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Пытаемся обновить токен
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        })
        
        const newAccessToken = response.data.accessToken
        useAuthStore.getState().setAccessToken(newAccessToken)

        // Повторяем исходный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Если refresh не удался, разлогиниваем пользователя
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)