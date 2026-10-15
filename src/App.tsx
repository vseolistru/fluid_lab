// src/App.tsx
import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Landing from './pages/Landing'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Auth from './pages/Auth'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Cart from './pages/Cart'

function App() {

    const checkAuth = useAuthStore((state) => state.checkAuth)
  const isLoading = useAuthStore((state) => state.isLoading)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900"></div>
      </div>
    )
  }
  
  return (
    <Routes>
      {/* Главная страница — посадочная от заказчика */}
      <Route path="/" element={<Landing />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      
      {/* Auth роуты */}
      
      <Route 
        path="/auth" 
        element={isAuthenticated ? <Navigate to="/catalog" replace /> : <Auth />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/catalog" replace /> : <Register />} 
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App