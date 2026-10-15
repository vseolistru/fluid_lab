// src/components/catalog/ProductGrid.tsx
import React from 'react'
import ProductCard from './ProductCard'
import { mockProducts } from '../../data/mockProducts'
import { useFilterStore } from '../../store/filterStore'

interface ProductGridProps {
  category: string
}

const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  // 1. Читаем текущее состояние фильтров напрямую из Zustand
  const { applications, forms, volumes, priceRange, inStock, hasDiscount, resetFilters } = useFilterStore()

  // 2. Логика фильтрации
  const filteredProducts = mockProducts.filter((product) => {
    // Фильтр по вкладке категории (если не 'all')
    if (category !== 'all' && product.application !== category) {
      return false
    }

    // Фильтр "В наличии" (хотя бы один вариант должен быть в наличии)
    if (inStock && !product.variants.some((v) => v.inStock)) {
      return false
    }

    // Фильтр "Со скидкой" (хотя бы один вариант должен иметь скидку)
    if (hasDiscount && !product.variants.some((v) => v.discount && v.discount > 0)) {
      return false
    }

    // Фильтр по применению (если массив не пуст, приложение должно быть в списке)
    if (applications.length > 0 && !applications.includes(product.application)) {
      return false
    }

    // Фильтр по форме выпуска
    if (forms.length > 0 && !forms.includes(product.form)) {
      return false
    }

    // Фильтр по объёму (проверяем, есть ли у товара вариант с выбранным объёмом)
    if (volumes.length > 0) {
      const hasMatchingVolume = product.variants.some((v) => volumes.includes(v.volume))
      if (!hasMatchingVolume) return false
    }

    // Фильтр по цене (проверяем, попадает ли хотя бы один вариант в ценовой диапазон)
    const hasMatchingPrice = product.variants.some(
      (v) => v.price >= priceRange.min && v.price <= priceRange.max
    )
    if (!hasMatchingPrice) return false

    return true
  })

  return (
    <div>
      {/* Счётчик и сортировка */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Найдено экстрактов:{' '}
          <span className="text-gray-400 font-normal">{filteredProducts.length}</span>
        </h2>
        <select className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white">
          <option>По популярности</option>
          <option>По цене (сначала дешёвые)</option>
          <option>По цене (сначала дорогие)</option>
        </select>
      </div>

      {/* Сетка или пустое состояние */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 border-dashed">
          <p className="text-lg text-gray-500 mb-4">По вашему запросу ничего не найдено</p>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid;