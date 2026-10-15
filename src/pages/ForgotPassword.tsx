// src/pages/ForgotPassword.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import { userApi } from '../services/userApi'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Введите email')
      return
    }

    setIsLoading(true)
    try {
      // Бэкенд всегда возвращает 200, даже если email не найден
      await userApi.requestReset(email)
      setIsSent(true)
    } catch (err: any) {
      // Ошибка 400 придет только если email невалиден по формату (middleware)
      setError(err.response?.data?.message || 'Произошла ошибка. Попробуйте позже.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <AuthLayout
        title="Письмо отправлено"
        subtitle={`Мы отправили инструкцию по сбросу пароля на ${email}`}
      >
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 text-center mb-6">
            Проверьте вашу почту и следуйте инструкциям в письме. 
            Ссылка действительна в течение 30 минут.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться ко входу
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Восстановление пароля"
      subtitle="Введите email, указанный при регистрации. Мы отправим ссылку для сброса пароля."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
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
              Отправка...
            </>
          ) : (
            'Отправить ссылку'
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться ко входу
        </Link>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword