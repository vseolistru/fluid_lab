// src/components/catalog/CategoryTabs.tsx
import React from 'react'
import { ChevronRight, Grid3x3, FlaskConical, Leaf, Droplet, Package, Heart, Users } from 'lucide-react'

interface CategoryTabsProps {
  selected: string
  onSelect: (category: string) => void
}

const categories = [
  { id: 'all', label: 'Все экстракты', icon: Grid3x3 },
  { id: 'cosmetics', label: 'Косметика', icon: Heart },
  { id: 'pharma', label: 'Фармацевтика', icon: FlaskConical },
  { id: 'food', label: 'Пищевая пром.', icon: Package },
  { id: 'perfume', label: 'Парфюмерия', icon: Droplet },
  { id: 'supplements', label: 'БАДы', icon: Leaf },
  { id: 'alcohol', label: 'Алкогольная пром.', icon: Users },
]

const CategoryTabs: React.FC<CategoryTabsProps> = ({ selected, onSelect }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = selected === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-indigo-100 border-indigo-200 text-indigo-900'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                {cat.label}
              </button>
            )
          })}

          {/* Кнопка "ещё" */}
          <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryTabs