// src/components/catalog/FiltersSidebar.tsx
import React from 'react';
import { useFilterStore } from '../../store/filterStore';
import type { Volume, Application, ProductForm } from '../../types';


const FiltersSidebar: React.FC = () => {
  const {
    applications,
    forms,
    volumes,
    priceRange,
    inStock,
    hasDiscount,
    toggleApplication,
    toggleForm,
    toggleVolume,
    setPriceRange,
    toggleInStock,
    toggleDiscount,
    resetFilters,
  } = useFilterStore()

  // Явно типизируем аргумент как Volume
  const formatVolume = (v: Volume) => (v >= 1000 ? `${v / 1000} л` : `${v} мл`)

  // Явно типизируем массив как Volume[], чтобы TypeScript был доволен
  const volumeOptions: Volume[] = [50, 100, 500, 1000, 3000, 5000]

  return (
    <div className="space-y-6 sticky top-24">
      {/* Переключатели */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
              В наличии
            </span>
            <input
              type="checkbox"
              checked={inStock}
              onChange={toggleInStock}
              className="w-5 h-5 rounded border-gray-300 accent-indigo-600 cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
              Со скидкой
            </span>
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={toggleDiscount}
              className="w-5 h-5 rounded border-gray-300 accent-indigo-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Применение */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Применение</h3>
        <div className="space-y-3">
          {[
            { label: 'Косметика', value: 'cosmetics' as Application },
            { label: 'Фармацевтика', value: 'pharma' as Application },
            { label: 'Пищевая промышленность', value: 'food' as Application },
            { label: 'Парфюмерия', value: 'perfume' as Application },
            { label: 'БАДы', value: 'supplements' as Application },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={applications.includes(item.value)}
                onChange={() => toggleApplication(item.value)}
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Форма выпуска */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Форма выпуска</h3>
        <div className="space-y-3">
          {[
            { label: 'Концентрат', value: 'concentrate' as ProductForm },
            { label: 'На MCT-масле 50%', value: 'mct50' as ProductForm },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={forms.includes(item.value)}
                onChange={() => toggleForm(item.value)}
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Объём */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Объём</h3>
        <div className="space-y-3">
          {volumeOptions.map((vol) => (
            <label key={vol} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={volumes.includes(vol)}
                onChange={() => toggleVolume(vol)}
                className="w-4 h-4 rounded border-gray-300 accent-indigo-600 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {formatVolume(vol)}
              </span>
            </label>
          ))}
        </div>
      </div>

    {/* Цена */}
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-base font-bold text-gray-900 mb-4">Цена, ₽</h3>
      
      <div className="space-y-4">
        {/* Два range-слайдера */}
        <div className="relative h-6 flex items-center">
          {/* Фоновая линия */}
          <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
          
          {/* Активная полоса между ползунками */}
          <div
            className="absolute h-1 bg-indigo-600 rounded-full"
            style={{
              left: `${(priceRange.min / 100000) * 100}%`,
              right: `${100 - (priceRange.max / 100000) * 100}%`,
            }}
          />

          {/* Ползунок MIN */}
          <input
            type="range"
            min={0}
            max={100000}
            step={500}
            value={priceRange.min}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (val < priceRange.max) {
                setPriceRange(val, priceRange.max)
              }
            }}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:border-indigo-700 [&::-webkit-slider-thumb]:transition-colors [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
          />

          {/* Ползунок MAX */}
          <input
            type="range"
            min={0}
            max={100000}
            step={500}
            value={priceRange.max}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (val > priceRange.min) {
                setPriceRange(priceRange.min, val)
              }
            }}
            className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:hover:border-indigo-700 [&::-webkit-slider-thumb]:transition-colors [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-indigo-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>

        {/* Числовые инпуты под слайдером */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="от"
              value={priceRange.min || ''}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val >= 0 && val < priceRange.max) {
                  setPriceRange(val, priceRange.max)
                }
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <span className="text-gray-400">—</span>
          <div className="relative flex-1">
            <input
              type="number"
              placeholder="до"
              value={priceRange.max === 100000 ? '' : priceRange.max}
              onChange={(e) => {
                const val = Number(e.target.value) || 100000
                if (val > priceRange.min && val <= 100000) {
                  setPriceRange(priceRange.min, val)
                }
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        </div>
      </div>
    </div>

      {/* Кнопка сброса */}
      <button
        onClick={resetFilters}
        className="w-full py-3 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-colors"
      >
        Сбросить все фильтры
      </button>
    </div>
  )
}

export default FiltersSidebar;