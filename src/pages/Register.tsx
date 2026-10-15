// src/pages/Register.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, Loader2 } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import { useAuthStore } from '../store/authStore'
import { userApi } from '../services/userApi'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login) // Достаем функцию логина из стора
  
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Состояние загрузки

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
	e.preventDefault()
	if (isLoading) return
    setError('')

    // 1. Валидация на фронтенде
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Заполните все обязательные поля')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают')
      return
    }
    if (form.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return
    }
    if (!agreeTerms) {
      setError('Необходимо принять условия использования')
      return
    }

    // 2. Отправка запроса на бэкенд
    setIsLoading(true)
    try {
      const response = await userApi.register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || undefined,
        company: form.company || undefined,
      })
      
      // 3. Успех: сохраняем пользователя и токен в Zustand, редиректим в каталог
      login(response)
      navigate('/catalog')
      
    } catch (err: any) {
      // 4. Ошибка: показываем сообщение от бэкенда или дефолтное
      console.error('Registration error:', err)
      setError(err.response?.data?.message || 'Ошибка регистрации. Попробуйте позже.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Создать аккаунт"
      subtitle="Получите доступ к оптовым ценам и персональному менеджеру"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
            <span className="mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Имя *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="Иван"
                className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Фамилия *</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              placeholder="Иванов"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Телефон</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Компания</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={form.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder="ООО «Компания»"
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Пароль *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Минимум 6 символов"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Повторите пароль *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            />
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer pt-2">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-indigo-600"
          />
          <span className="text-xs text-gray-600 leading-relaxed">
            Я согласен с{' '}
            <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700 font-medium">
              условиями использования
            </Link>{' '}
            и{' '}
            <Link to="/consent" className="text-indigo-600 hover:text-indigo-700 font-medium">
              политикой обработки персональных данных
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Создаем аккаунт...
            </>
          ) : (
            'Зарегистрироваться'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{' '}
          <Link to="/auth" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Войти
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Register