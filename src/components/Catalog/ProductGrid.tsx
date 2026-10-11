// src/components/catalog/ProductGrid.tsx
import React from 'react'
import ProductCard from './ProductCard'
import type { CatalogProduct } from '../../types'

interface ProductGridProps {
  category: string
  filters: any
}

// Моковые данные — потом заменим на данные с бэка
const mockProducts: CatalogProduct[] = [
  {
    id: 1,
    name: 'Облепиха',
    slug: 'sea-buckthorn',
    image: '/static/images/oil_sea_buckthorn.png',
    category: 'Облепиха',
    application: 'cosmetics',
    form: 'mct50',
    volume: '50 мл',
    price: 3550,
    oldPrice: 11458,
    discount: 68,
    inStock: true,
    duration: '12 месяцев',
    startDate: '5 апреля',
    description: 'Сверхкритический CO₂-экстракт',
  },
  {
    id: 2,
    name: 'Амарант',
    slug: 'amaranth',
    image: '/static/images/oil_amaranth.png',
    category: 'Амарант',
    application: 'cosmetics',
    form: 'mct50',
    volume: '50 мл',
    price: 2463,
    oldPrice: 5719,
    discount: 56,
    inStock: true,
    duration: '6 месяцев',
    startDate: '30 марта',
    description: 'Сверхкритический CO₂-экстракт',
  },
  {
    id: 3,
    name: 'Чёрный тмин',
    slug: 'black-cumin',
    image: '/static/images/oil_caraway.png',
    category: 'Чёрный тмин',
    application: 'cosmetics',
    form: 'mct50',
    volume: '50 мл',
    price: 7008,
    oldPrice: 12739,
    discount: 44,
    inStock: true,
    duration: '24 месяца',
    startDate: '27 марта',
    description: 'Сверхкритический CO₂-экстракт',
  },
  {
    id: 4,
    name: 'Лаванда',
    slug: 'lavender',
    image: '/static/images/catalog/lavender_category.webp',
    category: 'Лаванда',
    application: 'perfume',
    form: 'concentrate',
    volume: '100 мл',
    price: 1559,
    oldPrice: 3277,
    discount: 52,
    inStock: true,
    duration: '4 месяца',
    startDate: '11 марта',
    description: 'Сверхкритический CO₂-экстракт',
  },
  {
    id: 5,
    name: 'Ромашка',
    slug: 'chamomile',
    image: '/static/images/catalog/chamomile_category.webp',
    category: 'Ромашка',
    application: 'pharma',
    form: 'concentrate',
    volume: '100 мл',
    price: 122,
    oldPrice: 4698,
    discount: 57,
    inStock: true,
    duration: '10 месяцев',
    startDate: '6 апреля',
    description: 'Сверхкритический CO₂-экстракт',
  },
  {
    id: 6,
    name: 'Ель',
    slug: 'spruce',
    image: '/static/images/spruce.avif',
    category: 'Ель',
    application: 'pharma',
    form: 'concentrate',
    volume: '1 л',
    price: 2240,
    oldPrice: 7466,
    discount: 70,
    inStock: true,
    duration: '12 месяцев',
    startDate: '16 марта',
    description: 'Сверхкритический CO₂-экстракт',
  },
]

const ProductGrid: React.FC<ProductGridProps> = ({ category: _category, filters: _filters }) => {
  // Пока просто показываем все моковые данные
  const products = mockProducts

  return (
    <div>
      {/* Счётчик */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Всего экстрактов <span className="text-gray-400 font-normal">{products.length}</span>
        </h2>
        <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200">
          <option>По популярности</option>
          <option>По цене (сначала дешёвые)</option>
          <option>По цене (сначала дорогие)</option>
          <option>По дате поступления</option>
        </select>
      </div>

      {/* Сетка */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid