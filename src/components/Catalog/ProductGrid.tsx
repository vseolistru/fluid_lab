// src/components/catalog/ProductGrid.tsx
import React from 'react'
import ProductCard from './ProductCard'
import { mockProducts } from '../../data/mockProducts' // <-- Импортируем отсюда
import type { Product } from '../../types'

interface ProductGridProps {
  category: string
  filters: any
}

const ProductGrid: React.FC<ProductGridProps> = ({ category: _category, filters: _filters }) => {
  // Пока просто показываем все моковые данные. 
  // Позже здесь будет фильтрация: mockProducts.filter(...)
  const products: Product[] = mockProducts

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Всего экстрактов <span className="text-gray-400 font-normal">{products.length}</span>
        </h2>
        <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white">
          <option>По популярности</option>
          <option>По цене (сначала дешёвые)</option>
          <option>По цене (сначала дорогие)</option>
          <option>По дате поступления</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid