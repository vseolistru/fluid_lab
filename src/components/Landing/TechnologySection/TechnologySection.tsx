// src/components/TechnologySection/TechnologySection.tsx
import React, { useState } from 'react'

type Tab = 'production' | 'automation'

interface TechCard {
  image: string
  tag: string
  tagValue: string
  title: string
  description: string
}

const productionCards: TechCard[] = [
  {
    image: '/static/images/manometr.avif',
    tag: 'РАБОЧЕЕ ДАВЛЕНИЕ',
    tagValue: '400+ БАР',
    title: 'Точная настройка под сырьё',
    description: 'Давление и температура 20–55 °C задают, какие группы веществ извлекаются из сырья',
  },
  {
    image: '/static/images/faucet.avif',
    tag: 'ЭКСТРАГЕНТ',
    tagValue: 'CO₂',
    title: 'Чистый экстракт',
    description: 'CO₂ извлекает нужные вещества. Концентрацию и форму готового продукта подбираем под задачу',
  },
  {
    image: '/static/images/facility.avif',
    tag: 'КОМПЛЕКС',
    tagValue: '2 КОНТЕЙНЕРА',
    title: 'Установка и подготовка сырья',
    description: 'В первом — экстракционная установка, во втором — подготовка сырья. Приезжают вместе',
  },
  {
    image: '/static/images/filter.avif',
    tag: 'ИЗ ОДНОГО СЫРЬЯ',
    tagValue: 'ДО 5 ФРАКЦИЙ',
    title: 'Разделение состава',
    description: 'От тяжёлой фракции (воски, каротиноиды) до лёгкой (терпены) — или одна целевая',
  },
]

const automationCards: TechCard[] = [
  {
    image: '/static/images/manometr.avif',
    tag: 'АВТОМАТИКА',
    tagValue: 'PLC-КОНТРОЛЛЕР',
    title: 'Полная автоматизация',
    description: 'Все параметры контролируются автоматически — давление, температура, расход CO₂',
  },
  {
    image: '/static/images/faucet.avif',
    tag: 'УДАЛЁННЫЙ МОНИТОРИНГ',
    tagValue: '24/7',
    title: 'Контроль из любой точки',
    description: 'Оператор следит за процессом через веб-интерфейс, получает уведомления об отклонениях',
  },
  {
    image: '/static/images/facility.avif',
    tag: 'БЕЗОПАСНОСТЬ',
    tagValue: 'АВАРИЙНЫЕ РЕЖИМЫ',
    title: 'Защита оборудования',
    description: 'Автоматическое отключение при превышении давления или температуры',
  },
  {
    image: '/static/images/filter.avif',
    tag: 'ДАННЫЕ',
    tagValue: 'ЛОГИРОВАНИЕ',
    title: 'История каждой партии',
    description: 'Все параметры экстракции сохраняются — полная прослеживаемость производства',
  },
]

const TechnologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('production')

  const cards = activeTab === 'production' ? productionCards : automationCards

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Переключатель вкладок */}
        <div className="inline-flex items-center gap-1 mb-12 border border-gray-200 rounded-full p-1">
          <button
            onClick={() => setActiveTab('production')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'production'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ПРОИЗВОДСТВО
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'automation'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            АВТОМАТИКА
          </button>
        </div>

        {/* Заголовок */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Технология, собранная в систему
        </h2>
        <p className="text-lg text-gray-500 mb-12 max-w-2xl">
          На собственном оборудовании настраиваем давление, температуру,
          расход CO₂ и длительность стадий — под сырьё и нужный состав
        </p>

        {/* Сетка карточек 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="bg-gray-50 rounded-3xl overflow-hidden group hover:bg-gray-100 transition-colors duration-300"
            >
              {/* Картинка */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-white">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Контент */}
              <div className="p-6">
                {/* Тег */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-500 tracking-wider">
                    {card.tag}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-900">
                    {card.tagValue}
                  </span>
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>

                {/* Описание */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection