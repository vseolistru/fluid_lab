// src/components/ProcessSection/ProcessSection.tsx
import React, { useState } from 'react'
import { Factory, User, AlertTriangle, Leaf, Plus, Minus, Container } from 'lucide-react'

type Tab = 'production' | 'approach'

interface CardData {
  icon: React.ReactNode
  title: string
  subtitle: string
  content: string
}

const productionCards: CardData[] = [
  {
    icon: <Factory className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Производим сами',
    subtitle: 'От сырья до экстракта',
    content: 'Полный цикл производства в собственных мобильных комплексах. Контролируем качество на каждом этапе — от приёмки сырья до упаковки готового экстракта.',
  },
  {
    icon: <User className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Своя инженерия',
    subtitle: 'Оборудование и автоматика',
    content: 'Собственная разработка и производство оборудования. Гибкая автоматика позволяет точно настраивать параметры экстракции под каждое сырьё.',
  },
  {
    icon: <AlertTriangle className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Проверяем режим',
    subtitle: 'Опыт перед производством',
    content: 'Перед запуском серии проводим тестовые экстракции. Подбираем оптимальные параметры: давление, температуру, время — для максимального выхода.',
  },
  {
    icon: <Leaf className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Подбираем состав',
    subtitle: 'Под конкретное растение',
    content: 'Каждое растение требует своего подхода. Анализируем состав сырья и подбираем режим экстракции для сохранения целевых компонентов.',
  },
]

const approachCards: CardData[] = [
  {
    icon: <Container className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Мобильность',
    subtitle: 'Приезжаем к вам',
    content: 'Наш комплекс доставляется на вашу площадку. Не нужно везти сырьё — мы работаем на месте, сохраняя свежесть и качество.',
  },
  {
    icon: <Leaf className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Экологичность',
    subtitle: 'Без вредных растворителей',
    content: 'SC-CO₂ — безопасный и экологичный растворитель. После экстракции он полностью испаряется, не оставляя следов в продукте.',
  },
  {
    icon: <AlertTriangle className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Контроль качества',
    subtitle: 'На каждом этапе',
    content: 'Многоступенчатый контроль: от входного сырья до готового экстракта. Лабораторные анализы и сертификация каждой партии.',
  },
  {
    icon: <User className="w-8 h-8" strokeWidth={1.5} />,
    title: 'Индивидуальный подход',
    subtitle: 'Под ваши задачи',
    content: 'Разрабатываем технологию под конкретное сырьё и требования заказчика. Гибкие параметры, различные формы выпуска.',
  },
]

const ProcessSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('production')
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const cards = activeTab === 'production' ? productionCards : approachCards

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <section className="py-24 px-6 bg-white">
      {/* Увеличили max-w для более широких карточек */}
      <div className="max-w-[1400px] mx-auto">
        {/* Переключатель вкладок — pill-style с обводкой */}
        <div className="inline-flex items-center gap-1 mb-12 border border-gray-200 rounded-full p-1">
          <button
            onClick={() => setActiveTab('production')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'production'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Factory className="w-4 h-4" strokeWidth={1.5} />
            ПРОИЗВОДСТВО
          </button>
          <button
            onClick={() => setActiveTab('approach')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'approach'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ПОДХОД
          </button>
        </div>

        {/* Заголовок секции */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Свой процесс — от сырья до экстракта
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Создаём SC-CO₂-экстракт сами — от сырья до готового продукта
        </p>

        {/* Карточки — уменьшили gap, сделали шире */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {cards.map((card, index) => (
            <div
              key={`${activeTab}-${index}`}
              className={`bg-gray-50 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-100 ${
                expandedCard === index ? 'ring-1 ring-gray-300' : ''
              }`}
              onClick={() => toggleCard(index)}
            >
              {/* Иконка и заголовок */}
              <div className="flex items-start gap-3 mb-3">
                <div className="text-gray-900 flex-shrink-0">{card.icon}</div>
                <h3 className="text-base font-bold text-gray-900 leading-tight">{card.title}</h3>
              </div>

              {/* Подзаголовок */}
              <p className="text-sm text-gray-500 mb-4">{card.subtitle}</p>

              {/* Контент (раскрывается) */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-gray-700 pb-4 border-t border-gray-200 pt-4">
                  {card.content}
                </p>
              </div>

              {/* Кнопка "Подробнее" */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Подробнее</span>
                {expandedCard === index ? (
                  <Minus className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
                ) : (
                  <Plus className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Широкая карточка снизу — лавандовый оттенок как в оригинале */}
        <div className="bg-indigo-100/70 rounded-3xl px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-indigo-100 transition-colors duration-300">
          <span className="text-base font-semibold text-gray-900">
            Мобильный комплекс под сырьё
          </span>
          <Plus className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  )
}

export default ProcessSection