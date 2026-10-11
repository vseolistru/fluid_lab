// src/components/WorkFormatsSection/WorkFormatsSection.tsx
import React from 'react'

interface WorkFormat {
  number: string
  title: string
  description: string
}

const formats: WorkFormat[] = [
  {
    number: '01 / 03',
    title: 'Нужен готовый экстракт',
    description:
      'Определяем требования к готовому экстракту, подбираем сырьё и разрабатываем или настраиваем процесс; затем производим продукт и согласуем форму поставки',
  },
  {
    number: '02 / 03',
    title: 'У вас есть своё сырьё',
    description:
      'На нашей площадке перерабатываем сырьё заказчика: начинаем с образца и задачи, при необходимости проводим R&D, затем производим экстракт',
  },
  {
    number: '03 / 03',
    title: 'Производство у источника сырья',
    description:
      'Обсуждаем производство у источника сырья. Для проекта согласуем размещение, электропитание, подъезд и безопасную эксплуатацию',
  },
]

const WorkFormatsSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Большой блок с фоновой картинкой */}
        <div className="relative rounded-3xl overflow-hidden mb-8 h-[400px] md:h-[500px]">
          {/* Фоновая картинка */}
          <img
            src="/static/images/presentation.webp"
            alt="Мобильный комплекс FluidLab"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Затемнение для читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Текст поверх картинки */}
          <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Одна экспертиза — три формата работы
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Выбираем отправную точку по будущему продукту, сырью,
              объёму и логистике
            </p>
          </div>
        </div>

        {/* Три карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {formats.map((format) => (
            <div
              key={format.number}
              className="border border-gray-200 rounded-3xl p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Номер */}
              <span className="text-sm font-semibold text-indigo-600 tracking-wider">
                {format.number}
              </span>

              {/* Заголовок */}
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-4 leading-tight">
                {format.title}
              </h3>

              {/* Описание */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {format.description}
              </p>
            </div>
          ))}
        </div>

        {/* Сноска */}
        <p className="text-sm text-gray-500">
          Мобильный комплекс находится в сборке. Возможность и условия выезда обсуждаем индивидуально
        </p>
      </div>
    </section>
  )
}

export default WorkFormatsSection