// src/components/ApplicationsSection/ApplicationsSection.tsx
import React from 'react'
import { ArrowRight } from 'lucide-react'

interface Category {
  id: number
  title: string
  image: string
  bgColor: 'white' | 'lavender' | 'dark'
}

const categories: Category[] = [
  {
    id: 1,
    title: 'Пищевая промышленность',
    image: '/static/images/catalog/orange_peel_category.webp',
    bgColor: 'white',
  },
  {
    id: 2,
    title: 'Парфюмерия',
    image: '/static/images/catalog/lavender_category.webp',
    bgColor: 'lavender',
  },
  {
    id: 3,
    title: 'Косметика',
    image: '/static/images/catalog/chamomile_category.webp',
    bgColor: 'white',
  },
  {
    id: 4,
    title: 'Алкогольная промышленность',
    image: '/static/images/catalog/hops_category.webp',
    bgColor: 'white',
  },
  {
    id: 5,
    title: 'Фармацевтика',
    image: '/static/images/catalog/spruce_category.webp',
    bgColor: 'dark',
  },
  {
    id: 6,
    title: 'БАДы',
    image: '/static/images/catalog/sea_buckthorn_category.webp',
    bgColor: 'lavender',
  },
]

const bgStyles: Record<Category['bgColor'], string> = {
  white: 'bg-white border border-gray-200 text-gray-900',
  lavender: 'bg-indigo-100/70 text-gray-900',
  dark: 'bg-gray-900 text-white',
}

const ApplicationsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Заголовок */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Одна технология — разные задачи
        </h2>
        <p className="text-lg text-gray-500 mb-12 max-w-3xl">
          SC-CO₂-экстракты для косметики, биологически активных добавок и специализированных
          оздоровительных средств. Состав подбираем под применение
        </p>

        {/* Сетка категорий 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                bgStyles[category.bgColor]
              }`}
            >
              {/* Картинка */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Название */}
              <div className="p-6">
                <h3 className="text-2xl font-bold leading-tight">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Связаться" */}
        <div className="flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300 group"
          >
            <span className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <span className="tracking-wider uppercase">Связаться</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ApplicationsSection