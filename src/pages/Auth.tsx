// src/pages/Auth.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, FileText, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useAuthStore } from '../store/authStore'
import { userApi } from '../services/userApi'


const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	  const login = useAuthStore((state) => state.login)
  const [error, setError] = useState('')

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Заполните все поля')
      return
    }

    try {
      const response = await userApi.login({ email, password })
      login(response) 
      navigate('/catalog')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа')
    }
  }

  return (
    <>
      <Helmet>
        <title>Вход в аккаунт — FluidLab</title>
        <meta name="description" content="Войдите в личный кабинет FluidLab для управления заказами и отслеживания поставок." />
      </Helmet>

      <div className="min-h-screen flex bg-white">
        {/* Левая колонка — форма (на мобильных — вся ширина) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 py-12">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2C12 2 6 8 6 14C6 17.314 8.686 20 12 20C15.314 20 18 17.314 18 14C18 8 12 2 12 2Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">FluidLab</span>
          </Link>

          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Вход в аккаунт
            </h1>
            <p className="text-sm text-gray-600">
              Войдите, чтобы управлять заказами и отслеживать поставки
            </p>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Пароль
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Забыли пароль?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-gray-600">Запомнить меня</span>
            </label>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors"
            >
              Войти
            </button>
          </form>

          {/* Разделитель */}
          <div className="flex items-center gap-3 my-6 max-w-md">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500">НЕТ АККАУНТА?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Кнопка "Получить аккаунт" */}
          <Link
            to="/register"
            className="max-w-md group inline-flex items-center justify-between px-5 py-3.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-4 h-4 text-indigo-700" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">Получить аккаунт</p>
                <p className="text-xs text-gray-600">Оставьте заявку — мы свяжемся с вами</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-700 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Подпись */}
          <p className="text-xs text-gray-500 mt-8">
            © 2026 FluidLab. Мобильная SC-CO₂-экстракция
          </p>
        </div>

			{/* Правая колонка — декоративная панель (скрыта на мобильных) */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-100 via-indigo-50 to-purple-100 items-center justify-center p-12 relative overflow-hidden">
			{/* Декоративные круги */}
			<div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl" />
			<div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />

			{/* Контент — паспорт качества */}
			<div className="relative z-10 w-full max-w-lg">
				<div className="bg-indigo-100/70 backdrop-blur-sm rounded-3xl p-8 md:p-10 flex items-center justify-between gap-6 min-h-[280px] border border-white/50 shadow-xl">
				<div className="flex-1">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
					Паспорт<br />качества
					</h2>
					<p className="text-sm text-gray-600">
					Пример оформления
					</p>
				</div>
				<div className="flex-shrink-0 w-48 md:w-56">
					<img
					src="/static/images/quality_passport.png"
					alt="Паспорт качества FluidLab"
					className="w-full h-auto drop-shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500"
					/>
				</div>
				</div>

				{/* Дополнительный текст внизу */}
				<p className="mt-8 text-sm text-gray-700 leading-relaxed text-center max-w-sm mx-auto">
				Каждый экстракт сопровождается{' '}
				<span className="font-semibold text-indigo-900">паспортом качества</span>,
				протоколом испытаний и сертификатом соответствия
				</p>
			</div>
			</div>
			  
      </div>
    </>
  )
}

export default Auth