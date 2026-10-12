// src/components/catalog/ProductCard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Flame, FlaskConical } from 'lucide-react'
import type { Product } from '../../types'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const firstVariant = product.variants[0]
  const hasDiscount = firstVariant.discount !== undefined && firstVariant.discount > 0

  // Защита для картинки (массив или строка)
  const mainImage = Array.isArray(product.image) ? product.image[0] : product.image
  
  // Извлекаем новые данные
  const composition = product.details?.composition || ''
  const uses = product.use || []

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      {/* Категория */}
      <div className="px-5 pt-5 pb-2">
        <span className="inline-block text-xs font-semibold text-indigo-600 tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Изображение */}
      <div className="relative h-64 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
        </button>
        {hasDiscount && (
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -{firstVariant.discount}%
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
          {product.name}
        </h3>

        {/* Логистика */}
        <div className="text-xs text-gray-500 mb-3 space-y-0.5">
          <p>Срок: {product.duration}</p>
          <p>Старт партии: {product.startDate}</p>
        </div>

        {/* === НОВОЕ: Состав === */}
        {composition && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 line-clamp-2 flex items-start gap-1.5 leading-relaxed">
              <FlaskConical className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-indigo-500" />
              <span>{composition}</span>
            </p>
          </div>
        )}

        {/* Бейдж формы выпуска */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
            {product.form === 'concentrate' ? 'Концентрат' : 'MCT 50%'}
          </span>
        </div>

        {/* === НОВОЕ: Назначение (теги) === */}
        {uses.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
              Назначение:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {uses.slice(0, 2).map((item, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] px-2 py-1 bg-gray-100 text-gray-600 rounded-md font-medium"
                >
                  {item}
                </span>
              ))}
              {uses.length > 2 && (
                <span className="text-[10px] px-2 py-1 text-gray-400 font-medium">
                  +{uses.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Цена */}
        <div className="mb-4 mt-auto">
          {firstVariant.oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              {firstVariant.oldPrice.toLocaleString()} ₽
            </p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {firstVariant.price.toLocaleString()} ₽
            </span>
            <span className="text-xs text-gray-500">
              за {firstVariant.volume} мл
            </span>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors text-center"
          >
            Подробнее
          </Link>
          <button className="flex-1 px-4 py-2.5 bg-indigo-900 text-white rounded-xl text-sm font-semibold hover:bg-indigo-800 transition-colors inline-flex items-center justify-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard