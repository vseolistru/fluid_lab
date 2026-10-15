// src/pages/Catalog.tsx
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { SlidersHorizontal, X } from 'lucide-react'
import Header from '../components/Header/Header'
import CatalogHeader from '../components/Header/CatalogHero'
import CategoryTabs from '../components/Catalog/CategoryTabs'
import FiltersSidebar from '../components/Catalog/FiltersSidebar'
import ProductGrid from '../components/Catalog/ProductGrid'
import CatalogFooter from '../components/Footer/CatalogFooter'
import { useFilterStore } from '../store/filterStore'

const Catalog: React.FC = () => {
  const [cartCount] = useState(2)
  const [wishlistCount] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Подсчёт активных фильтров для бейджа на кнопке
  const { applications, forms, volumes, inStock, hasDiscount } = useFilterStore()
  const activeFiltersCount = [
    applications.length > 0,
    forms.length > 0,
    volumes.length > 0,
    inStock,
    hasDiscount,
  ].filter(Boolean).length

  return (
    <>
      <Helmet>
        <title>Каталог SC-CO₂ экстрактов — FluidLab</title>
        <meta
          name="description"
          content="Каталог сверхкритических CO₂-экстрактов: облепиха, амарант, чёрный тмин. Концентраты и экстракты на MCT-масле."
        />
      </Helmet>

      <Header cartCount={cartCount} wishlistCount={wishlistCount} />

      <main className="bg-gray-50">
        <CatalogHeader />
        <CategoryTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Основной контент */}
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Десктопная панель фильтров */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FiltersSidebar />
            </aside>

            {/* Сетка товаров */}
            <div className="flex-1">
              {/* Кнопка "Фильтры" на мобильных */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setIsFiltersOpen(true)}
                  className="w-full flex items-center justify-between px-5 py-3 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <SlidersHorizontal className="w-5 h-5 text-gray-700" />
                    <span className="font-semibold text-gray-900">Фильтры</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">Показать</span>
                  </div>
                </button>
              </div>

              <ProductGrid category={selectedCategory} />
            </div>
          </div>
        </div>

        <CatalogFooter />

        {/* Мобильный Drawer с фильтрами */}
        {isFiltersOpen && (
          <MobileFiltersDrawer
            onClose={() => setIsFiltersOpen(false)}
          />
        )}
      </main>
    </>
  )
}

// Компонент Drawer вынесен прямо сюда для простоты
const MobileFiltersDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <>
      {/* Затемнение фона */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Шторка */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-gray-50 z-50 lg:hidden flex flex-col shadow-2xl">
        {/* Шапка drawer */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Фильтры</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Контент фильтров (скроллируемый) */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FiltersSidebar />
        </div>

        {/* Sticky кнопка внизу */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors"
          >
            Показать результаты
          </button>
        </div>
      </div>
    </>
  )
}

export default Catalog;