// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, Search } from 'lucide-react';

interface HeaderProps {
  cartCount?: number
  wishlistCount?: number
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Header становится sticky после прокрутки 100px
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          {/* Логотип */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/static/icons/logo.svg"
              alt="FluidLab"
              className="h-8 w-auto"
            />
          </a>

          {/* Поиск (как в Lerna) */}
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
            {/* Каталог */}
            <Link className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300"
            to="/catalog">
              <Menu className="w-4 h-4" />
              Каталог
            </Link>

            {/* Кабинет */}
            <button className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
              Кабинет
            </button>

            {/* Вишлист с счётчиком */}
            <button className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Вишлист</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Корзина с счётчиком */}
            <button className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden md:inline">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Пользователь */}
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Войти</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header;