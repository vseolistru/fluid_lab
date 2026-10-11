// src/components/QualitySection/QualitySection.tsx
import React from 'react'
import { ArrowUpRight, FlaskConical, AlertTriangle, Factory, Droplet, User } from 'lucide-react'

interface QualityStep {
  icon: React.ReactNode
  tag: string
  title: string
  description: string
}

const qualitySteps: QualityStep[] = [
  {
    icon: <FlaskConical className="w-4 h-4" strokeWidth={1.5} />,
    tag: 'СЫРЬЁ',
    title: 'Уточняем исходный материал и его происхождение',
    description: '',
  },
  {
    icon: <AlertTriangle className="w-4 h-4" strokeWidth={1.5} />,
    tag: 'ГИПОТЕЗА',
    title: 'Определяем цель опыта и что требуется проверить',
    description: '',
  },
  {
    icon: <Factory className="w-4 h-4" strokeWidth={1.5} />,
    tag: 'ПРОЦЕСС',
    title: 'Подбираем параметры и фиксируем условия экстракции',
    description: '',
  },
  {
    icon: <Droplet className="w-4 h-4" strokeWidth={1.5} />,
    tag: 'ФРАКЦИЯ',
    title: 'Оцениваем разделение и состав полученного продукта',
    description: '',
  },
  {
    icon: <User className="w-4 h-4" strokeWidth={1.5} />,
    tag: 'ПРОДУКТ',
    title: 'Согласуем форму результата и требования к контролю',
    description: '',
  },
]

const documents = [
  { number: '01', title: 'Лабораторные анализы' },
  { number: '02', title: 'Протоколы испытаний' },
  { number: '03', title: 'Сертификаты и декларации' },
]

const QualitySection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Заголовок секции */}
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Качество и документы
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Согласуем требования до начала производства
        </p>

        {/* Верхняя часть — две колонки */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Левая — тёмный блок */}
          <div className="bg-gray-900 rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between min-h-[480px]">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                От сырья до готового экстракта
              </h3>
              <p className="text-base text-gray-300 leading-relaxed max-w-md">
                Сами ведём процесс и знаем происхождение продукта.
                Показатели качества и документы согласуем до начала работы
              </p>
            </div>

            {/* Картинка */}
            <div className="my-8 rounded-2xl overflow-hidden bg-gray-800">
              <img
                src="/static/images/typical_product.webp"
                alt="Лабораторное оборудование"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Кнопка */}
            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 hover:bg-indigo-200 rounded-full text-sm font-semibold text-gray-900 transition-all duration-300 group"
              >
                Обсудить проект
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Правая — список + паспорт качества */}
          <div className="flex flex-col gap-6">
            {/* Список документов */}
            <div className="border border-gray-200 rounded-3xl p-8">
              {documents.map((doc, index) => (
                <div
                  key={doc.number}
                  className={`flex items-center gap-4 py-5 ${
                    index < documents.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-400 w-6">
                    {doc.number}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {doc.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Паспорт качества */}
            <div className="bg-indigo-100/70 rounded-3xl p-8 md:p-10 flex items-center justify-between gap-6 min-h-[280px]">
              <div className="flex-1">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  Паспорт<br />качества
                </h4>
                <p className="text-sm text-gray-600">
                  Пример оформления
                </p>
              </div>
              <div className="flex-shrink-0 w-48 md:w-56">
                <img
                  src="/static/images/quality_passport.png"
                  alt="Паспорт качества FluidLab"
                  className="w-full h-auto drop-shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть — 5 шагов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {qualitySteps.map((step, index) => (
            <div key={index} className="group">
              {/* Иконка + тег */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100 rounded-full mb-4">
                <span className="text-indigo-700">{step.icon}</span>
                <span className="text-xs font-semibold text-indigo-900 tracking-wider">
                  {step.tag}
                </span>
              </div>

              {/* Заголовок */}
              <h4 className="text-base font-bold text-gray-900 leading-tight">
                {step.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Описание */}
        <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
          Состав контроля, показатели и документы определяем до начала работы
          с учётом конкретного сырья, продукта, требований проекта и его будущего
          применения. При разработке процесса учитываем качество продукта,
          повторяемость характеристик и принципы экологической устойчивости
        </p>
      </div>
    </section>
  )
}

export default QualitySection