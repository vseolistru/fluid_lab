// src/pages/Catalog.tsx
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/ Header/Header'
import CatalogHeader from '../components/ Header/CatalogHero'
import CategoryTabs from '../components/Catalog/CategoryTabs'
import FiltersSidebar from '../components/Catalog/FiltersSidebar'
import ProductGrid from '../components/Catalog/ProductGrid'
import CatalogFooter from '../components/Footer/CatalogFooter'

const Catalog: React.FC = () => {
  const [cartCount] = useState(2)
  const [wishlistCount] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedFilters, setSelectedFilters] = useState({
    applications: [] as string[],
    forms: [] as string[],
    volumes: [] as string[],
    priceRange: { min: 0, max: 100000 },
  })

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

        {/* Основной контент: фильтры + сетка */}
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex gap-8">
            {/* Левая панель фильтров */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FiltersSidebar
                filters={selectedFilters}
                onChange={setSelectedFilters}
              />
            </aside>

            {/* Сетка товаров */}
            <div className="flex-1">
              <ProductGrid
                category={selectedCategory}
                filters={selectedFilters}
              />
            </div>
          </div>
        </div>

        <CatalogFooter />
      </main>
    </>
  )
}

export default Catalog