// src/pages/ResetPassword.tsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, Lock, CheckCircle, XCircle, Loader2, ArrowLeft } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import { userApi } from '../services/userApi'

const ResetPassword: React.FC = () => {
  const { id, token } = useParams<{ id: string; token: string }>()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [isValidating, setIsValidating] = useState(true)
  const [isLinkValid, setIsLinkValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // 1. При загрузке страницы проверяем валидность ссылки
  useEffect(() => {
    const checkLink = async () => {
      if (!id || !token) {
        setIsLinkValid(false)
        setIsValidating(false)
        return
      }

      try {
        await userApi.validateResetLink(id, token)
        setIsLinkValid(true)
      } catch (err) {
        setIsLinkValid(false)
      } finally {
        setIsValidating(false)
      }
    }

    checkLink()
  }, [id, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Заполните все поля')
      return
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }
    if (password.length < 8) {
      setError('Пароль должен содержать минимум 8 символов')
      return
    }

    if (!id || !token) return

    setIsLoading(true)
    try {
      await userApi.resetPassword(id, token, password)
      setIsSuccess(true)
      
      // Редирект на логин через 3 секунды
      setTimeout(() => navigate('/auth'), 3000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Не удалось изменить пароль. Возможно, ссылка устарела.')
    } finally {
      setIsLoading(false)
    }
  }

  // Состояние 1: Проверка ссылки
  if (isValidating) {
    return (
      <AuthLayout title="Проверка ссылки...">
        <div className="flex flex-col items-center py-8">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-sm text-gray-600">Проверяем действительность ссылки...</p>
        </div>
      </AuthLayout>
    )
  }

  // Состояние 2: Ссылка недействительна
  if (!isLinkValid) {
    return (
      <AuthLayout
        title="Ссылка недействительна"
        subtitle="Возможно, ссылка устарела, была использована или содержит ошибку."
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-900 text-white rounded-xl text-sm font-semibold hover:bg-indigo-800 transition-colors"
          >
            Запросить новую ссылку
          </Link>
        </div>
      </AuthLayout>
    )
  }

  // Состояние 3: Успешная смена пароля
  if (isSuccess) {
    return (
      <AuthLayout
        title="Пароль изменён"
        subtitle="Ваш пароль успешно обновлён. Перенаправляем на страницу входа..."
      >
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <Link to="/auth" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
            Перейти ко входу сейчас
          </Link>
        </div>
      </AuthLayout>
    )
  }

  // Состояние 4: Форма ввода нового пароля
  return (
    <AuthLayout
      title="Новый пароль"
      subtitle="Придумайте надёжный пароль для вашего аккаунта"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Новый пароль</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Минимум 8 символов"
              className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1.5 ml-1">
            Используйте буквы, цифры и специальные символы
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Повторите пароль
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Сохранение...
            </>
          ) : (
            'Сохранить новый пароль'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <Link to="/auth" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" />
          Вернуться ко входу
        </Link>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword