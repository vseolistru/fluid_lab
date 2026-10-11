// src/components/WorkflowSection/WorkflowSection.tsx
import React, { useState, useEffect, useRef } from 'react'
import { User, Users, Plus } from 'lucide-react'

type Tab = 'team' | 'operators'

interface WorkflowStep {
  number: string
  title: string
  description: string
}

const steps: WorkflowStep[] = [
  {
    number: '01',
    title: 'Сырьё и задача',
    description: 'Определяем будущий продукт, нужный состав и объём. Начать можно со своего сырья или запроса на готовый экстракт',
  },
  {
    number: '02',
    title: 'Формат проекта',
    description: 'Выбираем готовый экстракт, переработку вашего сырья или мобильный формат с учётом объёма и логистики',
  },
  {
    number: '03',
    title: 'Исследование и настройка',
    description: 'На испытательном оборудовании подбираем режим и сравниваем опыты. Проверяем повторяемость перед запуском',
  },
  {
    number: '04',
    title: 'Переработка и фракционирование',
    description: 'Переносим выбранный режим в производство и отделяем фракции под согласованную задачу',
  },
  {
    number: '05',
    title: 'Результат и документы',
    description: 'Согласуем форму, концентрацию, объём и упаковку экстракта, показатели контроля и комплект документов',
  },
]

const WorkflowSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('team')
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0) // 0-100 для заполнения линии
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setActiveStep(index)
              // Вычисляем прогресс заполнения линии
              const newProgress = (index / (steps.length - 1)) * 100
              setProgress(newProgress)
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Двухколоночный layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-12">
          {/* Левая колонка — заголовок (sticky) */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            {/* Переключатель вкладок */}
            <div className="inline-flex items-center gap-1 mb-8 border border-gray-200 rounded-full p-1">
              <button
                onClick={() => setActiveTab('team')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'team'
                    ? 'bg-indigo-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="w-4 h-4" strokeWidth={1.5} />
                КОМАНДА
              </button>
              <button
                onClick={() => setActiveTab('operators')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'operators'
                    ? 'bg-indigo-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" strokeWidth={1.5} />
                ОПЕРАТОРЫ
              </button>
            </div>

            {/* Заголовок */}
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              От задачи<br />
              до готового<br />
              экстракта
            </h2>
            <p className="text-lg text-gray-500">
              Пять шагов от задачи и опытной экстракции до выпуска продукта
            </p>
          </div>

          {/* Правая колонка — индикатор + шаги */}
          <div ref={containerRef} className="relative flex">
            {/* Колонка с индикатором и линией */}
            <div className="flex-shrink-0 w-32 lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:self-start">
              {/* Большой номер */}
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-7xl font-bold text-gray-900 tabular-nums">
                  {String(activeStep + 1).padStart(2, '0')}
                </span>
                <span className="text-2xl text-gray-400 font-light">
                  /05
                </span>
                {/* Точка */}
                <div className="ml-3 w-3 h-3 rounded-full bg-indigo-400" />
              </div>

              {/* Вертикальная линия */}
              <div className="relative h-96 ml-1.5">
                {/* Фоновая линия (серая) */}
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200" />
                {/* Заполненная линия (лавандовая) */}
                <div
                  className="absolute top-0 left-0 w-0.5 bg-indigo-300 transition-all duration-500"
                  style={{ height: `${progress}%` }}
                />
              </div>
            </div>

            {/* Колонка с шагами */}
            <div className="flex-1 ml-8">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  className={`py-12 border-b border-gray-200 transition-all duration-500 ${
                    index === activeStep ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Номер шага */}
                  <span className="text-sm font-semibold text-gray-400 tracking-wider">
                    {step.number}
                  </span>

                  {/* Заголовок */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 leading-tight">
                    {step.title}
                  </h3>

                  {/* Описание */}
                  <p className="text-base text-gray-600 leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Широкая карточка снизу */}
        <div className="bg-gray-50 rounded-3xl px-8 py-6 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors duration-300">
          <span className="text-base font-semibold text-gray-900">
            Разработка технологии как отдельный проект
          </span>
          <Plus className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  )
}

export default WorkflowSection