// src/components/catalog/CatalogHeader.tsx
import React from 'react'

const CatalogHeader: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 overflow-hidden">
      {/* Фоновая картинка */}
      <img
        src="/static/images/header_img.webp"
        alt="FluidLab каталог"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Фиолетовый оверлей */}
      <div className="absolute inset-0 bg-indigo-900/40" />

      {/* Контент — фиксируем высоту */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-20 min-h-[550px] flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Каталог SC-CO₂ экстрактов<br />
            от производителя
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            Сверхкритические экстракты из растительного сырья для косметики,
            фармацевтики и пищевых продуктов
          </p>
        </div>
      </div>
    </section>
  )
}

export default CatalogHeader