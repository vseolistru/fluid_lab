// src/components/CompositionSection/CompositionSection.tsx
import React, { useState } from 'react'
import { Leaf, Clock, Atom, Layers } from 'lucide-react'

type Tab = 'components' | 'raw'

interface FeatureCard {
  icon: React.ReactNode
  title: string
  description: string
}

const features: FeatureCard[] = [
  {
    icon: <Leaf className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Исходное сырьё',
    description: 'Работаем с собственным сырьём или материалом заказчика',
  },
  {
    icon: <Clock className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Точный режим',
    description: 'Связываем давление, температуру, расход CO₂ и длительность стадий с целью экстракции',
  },
  {
    icon: <Atom className="w-5 h-5" strokeWidth={1.5} />,
    title: 'SC-CO₂',
    description: 'Сверхкритический CO₂ извлекает компоненты из растительного сырья',
  },
  {
    icon: <Layers className="w-5 h-5" strokeWidth={1.5} />,
    title: 'Нужный состав',
    description: 'Разделяем экстракт на фракции или получаем одну целевую — под задачу проекта',
  },
]

const CompositionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('components')

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Переключатель вкладок */}
        <div className="inline-flex items-center gap-1 mb-12 border border-gray-200 rounded-full p-1">
          <button
            onClick={() => setActiveTab('components')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'components'
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Leaf className="w-4 h-4" strokeWidth={1.5} />
            КОМПОНЕНТЫ
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'raw'
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            СЫРЬЁ
          </button>
        </div>

        {/* Заголовок */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          От сырья к точному составу
        </h2>
        <p className="text-lg text-gray-500 mb-16 max-w-2xl">
          Извлекаем нужные группы веществ и подбираем состав под ваш будущий продукт
        </p>

        {/* Большая иллюстрация с плавным переходом */}
        <div className="relative h-[400px] md:h-[500px] mb-16 overflow-hidden rounded-3xl bg-gradient-to-r from-gray-50 to-white">
          {/* Картинка для КОМПОНЕНТЫ */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeTab === 'components' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/static/images/sea_buckthorn.avif"
              alt="Облепиха — компоненты"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Картинка для СЫРЬЁ */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeTab === 'raw' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/static/images/spruce.avif"
              alt="Ель — сырьё"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 4 карточки с иконками */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              {/* Иконка */}
              <div className="mb-4 text-indigo-600 group-hover:text-indigo-700 transition-colors">
                {feature.icon}
              </div>

              {/* Заголовок */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Описание */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompositionSection