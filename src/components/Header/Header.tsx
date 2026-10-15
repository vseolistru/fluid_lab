// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, User, Menu, Search, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

interface HeaderProps {
  cartCount?: number
  wishlistCount?: number
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, wishlistCount = 0 }) => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/') // Редирект на главную после выхода
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          
          {/* Логотип (используем Link для SPA-навигации без перезагрузки) */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/static/icons/logo.svg"
              alt="FluidLab"
              className="h-8 w-auto"
            />
          </Link>

          {/* Поиск */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по каталогу"
                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              />
            </div>
          </div>

          {/* Навигация */}
          <nav className="flex items-center gap-3">
            {/* Каталог (виден всегда) */}
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">Каталог</span>
            </Link>

            {/* Вишлист */}
            <button className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300">
              <Heart className="w-4 h-4" />
              <span className="hidden lg:inline">Вишлист</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Корзина */}
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden lg:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* === БЛОК АВТОРИЗАЦИИ === */}
            {isAuthenticated && user ? (
              // Если пользователь ВОШЕЛ
              <>
                {/* Имя или Email пользователя */}
                <span className="hidden xl:inline text-sm font-medium text-gray-700 px-2">
                  {user.firstName || user.email}
                </span>

                {/* Ссылка на Кабинет */}
                <Link 
                  to="/profile" 
                  className="hidden md:inline-flex items-center px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-indigo-700 transition-colors"
                >
                  Кабинет
                </Link>

                {/* Кнопка Выйти */}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-full text-sm font-semibold transition-all duration-300"
                  title="Выйти из аккаунта"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Выйти</span>
                </button>
              </>
            ) : (
              // Если пользователь НЕ вошел
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Войти</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header