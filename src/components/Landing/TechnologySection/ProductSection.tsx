// src/components/ProductSection/ProductSection.tsx
import React, { useState } from 'react'
import { Droplet, Package, ChevronDown, ArrowRight, FlaskConical } from 'lucide-react'

type Tab = 'product' | 'delivery'

interface ProductCard {
  tag: string
  icon: React.ReactNode
  title: string
  description: string
}

const productCards: ProductCard[] = [
  {
    tag: 'КОНЦЕНТРАТ',
    icon: <Droplet className="w-4 h-4" strokeWidth={1.5} />,
    title: 'Чистый CO₂-экстракт',
    description: 'Без масла-носителя — для вашей рецептуры или следующей технологической стадии',
  },
  {
    tag: 'МСТ',
    icon: <Droplet className="w-4 h-4" strokeWidth={1.5} />,
    title: 'Экстракт на МСТ-масле',
    description: 'Концентрацию подбираем под применение',
  },
  {
    tag: 'УПАКОВКА',
    icon: <Package className="w-4 h-4" strokeWidth={1.5} />,
    title: 'Тара и объём под задачу',
    description: 'Упаковку и маркировку согласуем с учётом дальнейшей логистики',
  },
]

const deliveryCards: ProductCard[] = [
  {
    tag: 'ЛОГИСТИКА',
    icon: <Package className="w-4 h-4" strokeWidth={1.5} />,
    title: 'Доставка по России и СНГ',
    description: 'Отправляем транспортными компаниями с соблюдением температурного режима',
  },
  {
    tag: 'СЕРТИФИКАТЫ',
    icon: <FlaskConical className="w-4 h-4" strokeWidth={1.5} />,
    title: 'Паспорт качества на партию',
    description: 'К каждой поставке прилагается протокол испытаний и сертификат соответствия',
  },
  {
    tag: 'ДОКУМЕНТЫ',
    icon: <Package className="w-4 h-4" strokeWidth={1.5} />,
    title: 'Полный пакет документов',
    description: 'Договор, счёт, ТТН, MSDS — всё для беспрепятственной приёмки на складе',
  },
]

const agreementItems = [
  'Форма выпуска (жидкость, порошок, капсулы)',
  'Концентрация активных веществ',
  'Объём тары и тип упаковки',
  'Маркировка и этикетка',
  'Условия хранения и транспортировки',
  'Сроки и объёмы поставки',
]

const ProductSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('product')
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const cards = activeTab === 'product' ? productCards : deliveryCards

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Переключатель вкладок */}
        <div className="inline-flex items-center gap-1 mb-12 border border-gray-200 rounded-full p-1">
          <button
            onClick={() => setActiveTab('product')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'product'
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Droplet className="w-4 h-4" strokeWidth={1.5} />
            ПРОДУКТ
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'delivery'
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ПОСТАВКА
          </button>
        </div>

        {/* Заголовок */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          На выходе — продукт в нужной форме
        </h2>
        <p className="text-lg text-gray-500 mb-16 max-w-2xl">
          Форму, концентрацию и упаковку согласуем под вашу рецептуру или производство
        </p>

        {/* 3 карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="group"
            >
              {/* Тег с иконкой */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-full mb-6">
                <span className="text-indigo-700">{card.icon}</span>
                <span className="text-xs font-semibold text-indigo-900 tracking-wider">
                  {card.tag}
                </span>
              </div>

              {/* Заголовок */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>

              {/* Описание */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-200 mb-8" />

        {/* Аккордеон "Что согласуем перед поставкой" */}
        <div className="mb-12">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex items-center justify-between py-4 text-left group"
          >
            <span className="text-base font-semibold text-gray-900">
              Что согласуем перед поставкой
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                isAccordionOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isAccordionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="pb-6 space-y-3">
              {agreementItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Кнопка "Обсудить поставку" */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300 group"
        >
          Обсудить поставку
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}

export default ProductSection