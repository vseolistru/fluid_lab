// src/components/catalog/FiltersSidebar.tsx
import React from 'react'
import { ChevronDown } from 'lucide-react'

interface FiltersSidebarProps {
  filters: {
    applications: string[]
    forms: string[]
    volumes: string[]
    priceRange: { min: number; max: number }
  }
  onChange: (filters: any) => void
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ filters: _filters, onChange }) => {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Переключатели */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-gray-900">В наличии</span>
            <input type="checkbox" className="w-5 h-5 rounded accent-indigo-600" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-semibold text-gray-900">Со скидкой</span>
            <input type="checkbox" className="w-5 h-5 rounded accent-indigo-600" />
          </label>
        </div>
      </div>

      {/* Применение */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Применение</h3>
        <div className="space-y-3">
          {[
            { label: 'Косметика', count: 12 },
            { label: 'Фармацевтика', count: 8 },
            { label: 'Пищевая промышленность', count: 5 },
            { label: 'Парфюмерия', count: 7 },
            { label: 'БАДы', count: 10 },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {item.label}
              </span>
              <span className="text-xs text-gray-400">({item.count})</span>
            </label>
          ))}
        </div>
        <button className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1">
          Ещё 15 <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Форма выпуска */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Форма выпуска</h3>
        <div className="space-y-3">
          {[
            { label: 'Концентрат', count: 18 },
            { label: 'На MCT-масле 50%', count: 14 },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {item.label}
              </span>
              <span className="text-xs text-gray-400">({item.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Объём */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Объём</h3>
        <div className="space-y-3">
          {['50 мл', '100 мл', '500 мл', '1 л', '5 л', '10 л'].map((vol) => (
            <label key={vol} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {vol}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Цена, ₽</h3>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="number"
            placeholder="от"
            defaultValue={0}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            placeholder="до"
            defaultValue={100000}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>
      </div>

      {/* Кнопка сброса */}
      <button className="w-full py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
        Сбросить все фильтры
      </button>

      <p className="text-sm text-gray-500 text-center">
        Найдено 800 экстрактов
      </p>
    </div>
  )
}

export default FiltersSidebar