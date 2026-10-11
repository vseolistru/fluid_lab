// src/components/FAQSection/FAQSection.tsx
import React, { useState } from 'react'
import { AlertTriangle, Plus, Minus, CheckCircle } from 'lucide-react'

type Tab = 'info' | 'control'

interface FAQItem {
  question: string
  answer: string
}

const infoFAQ: FAQItem[] = [
  {
    question: 'Какой формат работы можно обсудить?',
    answer:
      'Мы предлагаем три формата: поставка готового экстракта из нашего каталога, переработка вашего сырья на нашей площадке, либо размещение мобильного комплекса у источника сырья. Выбор зависит от объёма, логистики и специфики проекта.',
  },
  {
    question: 'Как подбираются параметры экстракции?',
    answer:
      'Параметры (давление, температура, расход CO₂, длительность стадий) подбираются на испытательном оборудовании под конкретное сырьё и целевой состав. Перед запуском серии проверяем повторяемость результатов.',
  },
  {
    question: 'Какие документы могут сопровождать продукт?',
    answer:
      'К каждой поставке прилагаются паспорт качества, протокол испытаний и сертификат соответствия. По запросу предоставляем MSDS, полный пакет документов для приёмки на складе и данные по INCI.',
  },
  {
    question: 'Можно ли разработать технологию под новое сырьё?',
    answer:
      'Да, разработка технологии под новое сырьё — это отдельный проект. Начинаем с образца и задачи, проводим R&D, подбираем режим экстракции и согласуем показатели качества перед запуском производства.',
  },
]

const controlFAQ: FAQItem[] = [
  {
    question: 'Как контролируется качество сырья?',
    answer:
      'Входной контроль включает проверку влажности, ботанической чистоты и отсутствия посторонних примесей. Для каждого сырья разработана карта контроля с допустимыми отклонениями.',
  },
  {
    question: 'Какие параметры контролируются в процессе?',
    answer:
      'В режиме реального времени отслеживаются давление, температура, расход CO₂ и длительность каждой стадии экстракции. Все данные логируются и сохраняются для каждой партии.',
  },
  {
    question: 'Как проверяется готовый продукт?',
    answer:
      'Готовый экстракт проходит лабораторный анализ: определение содержания активных веществ, микробиологическая чистота, отсутствие остаточных растворителей. Результаты фиксируются в паспорте качества.',
  },
  {
    question: 'Что входит в паспорт качества?',
    answer:
      'Паспорт качества включает: наименование продукта, номер партии, дату производства, результаты лабораторных анализов, условия хранения и срок годности. Документ подписывается ответственным лицом.',
  },
]

const FAQSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('info')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faq = activeTab === 'info' ? infoFAQ : controlFAQ

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Переключатель вкладок */}
        <div className="inline-flex items-center gap-1 mb-12 border border-gray-200 rounded-full p-1">
          <button
            onClick={() => {
              setActiveTab('info')
              setOpenIndex(null)
            }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'info'
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />
            ИНФО
          </button>
          <button
            onClick={() => {
              setActiveTab('control')
              setOpenIndex(null)
            }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'control'
                ? 'bg-indigo-100 text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="w-4 h-4" strokeWidth={1.5} />
            КОНТРОЛЬ
          </button>
        </div>

        {/* Заголовок */}
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Перед началом работы
        </h2>
        <p className="text-lg text-gray-500 mb-12 max-w-3xl">
          Коротко о формате проекта, параметрах процесса, сырье и документах
        </p>

        {/* Аккордеон */}
        <div className="space-y-3">
          {faq.map((item, index) => (
            <div
              key={`${activeTab}-${index}`}
              className="border border-gray-200 rounded-3xl overflow-hidden transition-all duration-300 hover:border-gray-300"
            >
              {/* Вопрос */}
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
                  )}
                </span>
              </button>

              {/* Ответ */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 text-base text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection