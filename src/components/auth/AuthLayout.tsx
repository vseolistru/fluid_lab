// src/components/auth/AuthLayout.tsx
import React from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Декоративный фон */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Логотип */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
              <path d="M12 2C12 2 6 8 6 14C6 17.314 8.686 20 12 20C15.314 20 18 17.314 18 14C18 8 12 2 12 2Z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-900">FluidLab</span>
        </Link>

        {/* Карточка */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        {/* Подпись */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © 2026 FluidLab. Мобильная SC-CO₂-экстракция
        </p>
      </div>
    </div>
  )
}

export default AuthLayout