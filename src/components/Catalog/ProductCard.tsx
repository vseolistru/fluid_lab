// src/components/catalog/ProductCard.tsx
import React from 'react'
import { Heart, ShoppingCart, Flame } from 'lucide-react'
import type { CatalogProduct } from '../../types'

interface ProductCardProps {
  product: CatalogProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = product.discount && product.discount > 0

  return (
    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300 group">
      {/* Бейдж категории */}
      <div className="px-5 pt-5 pb-2">
        <span className="inline-block text-xs font-semibold text-indigo-600 tracking-wider">
          {product.category}
        </span>
      </div>

      {/* Картинка */}
      <div className="relative h-64 bg-gray-50 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {/* Кнопка вишлист */}
        <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
        </button>
        {/* Бейдж скидки */}
        {hasDiscount && (
          <div className="absolute top-4 left-4 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Контент */}
      <div className="p-5">
        {/* Название */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight">
          {product.name}
        </h3>

        {/* Мета */}
        <div className="text-xs text-gray-500 mb-3 space-y-0.5">
          <p>{product.duration}</p>
          <p>Старт: {product.startDate}</p>
        </div>

        {/* Теги */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hasDiscount && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
              <Flame className="w-3 h-3" />
              -{product.discount}%
            </span>
          )}
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
            {product.form === 'concentrate' ? 'Концентрат' : 'MCT 50%'}
          </span>
        </div>

        {/* Цена */}
        <div className="mb-4">
          {product.oldPrice && (
            <p className="text-xs text-gray-400 line-through">
              {product.oldPrice.toLocaleString()} ₽
            </p>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product.price.toLocaleString()} ₽
            </span>
            <span className="text-xs text-gray-500">
              за {product.volume}
            </span>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
            Подробнее
          </button>
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