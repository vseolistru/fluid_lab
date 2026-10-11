// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Catalog from './pages/Catalog'

function App() {
  return (
    <Routes>
      {/* Главная страница — посадочная от заказчика */}
      <Route path="/" element={<Landing />} />
      <Route path="/catalog" element={<Catalog />} />
      
      {/* Сюда позже добавим:
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
      */}
    </Routes>
  )
}

export default App