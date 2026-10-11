// src/components/ExtractsSection/ExtractsSection.tsx
import React, { useState } from 'react'
import { Droplet, Leaf, ChevronLeft, ChevronRight, X, FlaskConical, Beaker, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import type { Product } from '../../../types'

type Tab = 'components' | 'extracts'


const products: Product[] = [
  {
    id: 1,
    name: 'Облепиха',
    shortDescription: 'Сверхкритический CO₂-экстракт',
    image: '/static/images/oil_sea_buckthorn.png',
    fullTitle: 'Сверхкритический CO₂-экстракт ягод облепихи для разработки косметических рецептур.',
    characteristics: {
      plant: 'Hippophae Rhamnoides (Seabuckthorn)',
      rawMaterial: 'Ягоды облепихи',
      solubility: 'Жирорастворимый',
    },
    details: {
      composition: 'Экстракт содержит каротиноиды, токоферолы, жирные кислоты и фитостерины. Состав и показатели партии уточняются по спецификации. Для варианта в MCT 50% INCI смеси уточняется отдельно.',
      application: 'Для косметических рецептур ухода за сухой и чувствительной кожей, где важны смягчение, питание и поддержка липидного барьера. Может использоваться в средствах после загара, бальзамах для губ и масках для волос; назначение готового продукта зависит от рецептуры.',
      usage: 'Для концентрата рекомендован диапазон 0,1–0,5%. Перед применением перемешать; вводить в совместимую фазу на заключительной стадии при 35–45°C. Диапазон не применяется к варианту в MCT 50%. Дозировку, совместимость и стабильность проверяют в конкретной рецептуре.',
      form: 'Доступны концентрат и вариант в MCT 50%. Фасовку и объём согласуем при заказе. Состав и показатели партии уточняются по спецификации.',
    },
  },
  {
    id: 2,
    name: 'Амарант',
    shortDescription: 'Сверхкритический CO₂-экстракт',
    image: '/static/images/oil_amaranth.png',
    fullTitle: 'Сверхкритический CO₂-экстракт семян амаранта для разработки косметических рецептур.',
    characteristics: {
      plant: 'Amaranthus Caudatus',
      rawMaterial: 'Семена амаранта',
      solubility: 'Жирорастворимый',
    },
    details: {
      composition: 'В составе указаны сквален, токоферолы, фитостерины и жирные кислоты. Содержание сквалена уточняется по спецификации партии.',
      application: 'Для косметических рецептур ухода за сухой и зрелой кожей, ориентированных на смягчение, увлажнение и поддержку эластичности. Примеры форматов: ночные кремы, лосьоны, сыворотки, муссы для тела и маски для волос; назначение готового продукта зависит от рецептуры.',
      usage: 'Рекомендован диапазон 0,2–0,5%. Перед применением перемешать; вводить на заключительной стадии при 35–45°C. Дозировку и совместимость проверяют в конкретной рецептуре.',
      form: 'Фасовку и спецификацию партии можно уточнить у команды FluidLab.',
    },
  },
  {
    id: 3,
    name: 'Чёрный тмин',
    shortDescription: 'Сверхкритический CO₂-экстракт',
    image: '/static/images/oil_caraway.png',
    fullTitle: 'Сверхкритический CO₂-экстракт чёрного тмина для косметических рецептур ухода за кожей и волосами.',
    characteristics: {
      plant: 'Nigella sativa',
      rawMaterial: 'Семена',
      solubility: 'Жирорастворимый',
    },
    details: {
      composition: 'Основные группы компонентов — ненасыщенные жирные кислоты и эфирные соединения. В описании производителя указаны линолевая кислота, тимохинон, тимогидрохинон, p-цимен и лимонен. Состав и содержание компонентов уточняются по спецификации партии.',
      application: 'Для косметических рецептур ухода за проблемной и склонной к жирности кожей, кожей головы и волосами. Может использоваться в масках для очищения пор, а также в средствах для тела и ног; назначение готового продукта зависит от рецептуры.',
      usage: 'Рекомендуемую дозировку, условия ввода и совместимость с другими компонентами уточняют у команды FluidLab и проверяют в конкретной рецептуре.',
      form: 'INCI, показатели партии и доступную фасовку предоставим по запросу.',
    },
  },
]

const ExtractsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('components')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <>
      {/* Уменьшили py-24 до py-16 — отступ сверху меньше */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          {/* Переключатель вкладок + навигация */}
          <div className="flex items-center justify-between mb-10">
            <div className="inline-flex items-center gap-1 border border-gray-200 rounded-full p-1">
              <button
                onClick={() => setActiveTab('components')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'components'
                    ? 'bg-indigo-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Droplet className="w-4 h-4" strokeWidth={1.5} />
                КОМПОНЕНТЫ
              </button>
              <button
                onClick={() => setActiveTab('extracts')}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'extracts'
                    ? 'bg-indigo-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ЭКСТРАКТЫ
              </button>
            </div>

            {/* Навигация карусели */}
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Карусель карточек */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer border border-gray-200 rounded-3xl bg-gray-50 overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Картинка */}
                <div className="relative h-80 bg-white flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Название и описание — теперь внутри карточки, по центру */}
                <div className="p-6 text-center border-t border-gray-200 bg-gray-50">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.shortDescription}
                  </p>
                  <button className="text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-indigo-600 transition-colors">
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модалка */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex">
            {/* Кнопка закрытия */}
            <button
              onClick={() => {
                setSelectedProduct(null)
                setOpenSection(null)
              }}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Левая часть — картинка */}
            <div className="hidden md:block w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-12">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Правая часть — контент */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {selectedProduct.name}
              </h2>

              {/* Вкладки */}
              <div className="inline-flex items-center gap-1 border border-gray-200 rounded-full p-1 mb-6">
                <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-100 text-gray-900">
                  <Droplet className="w-3 h-3" strokeWidth={1.5} />
                  КОМПОНЕНТЫ
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600">
                  ЭКСТРАКТЫ
                </button>
              </div>

              {/* Описание */}
              <p className="text-base text-gray-700 mb-8">
                {selectedProduct.fullTitle}
              </p>

              {/* Характеристики */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Характеристики
              </h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-500 w-32 flex-shrink-0">INCI</span>
                  <span className="text-sm text-gray-900">{selectedProduct.characteristics.plant}</span>
                </div>
                <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-500 w-32 flex-shrink-0">Сырьё</span>
                  <span className="text-sm text-gray-900">{selectedProduct.characteristics.rawMaterial}</span>
                </div>
                <div className="flex items-start gap-4 py-3 border-b border-gray-200">
                  <span className="text-sm text-gray-500 w-32 flex-shrink-0">Растворимость</span>
                  <span className="text-sm text-gray-900">{selectedProduct.characteristics.solubility}</span>
                </div>
              </div>

              {/* Подробности */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Подробности
              </h3>
              <div className="space-y-3 mb-8">
                {/* Состав */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('composition')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FlaskConical className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                      <span className="text-base font-semibold text-gray-900">Состав</span>
                    </div>
                    {openSection === 'composition' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === 'composition' ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                      {selectedProduct.details.composition}
                    </div>
                  </div>
                </div>

                {/* Применение */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('application')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Leaf className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                      <span className="text-base font-semibold text-gray-900">Применение</span>
                    </div>
                    {openSection === 'application' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === 'application' ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                      {selectedProduct.details.application}
                    </div>
                  </div>
                </div>

                {/* Ввод в рецептуру */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('usage')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Beaker className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                      <span className="text-base font-semibold text-gray-900">Ввод в рецептуру</span>
                    </div>
                    {openSection === 'usage' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === 'usage' ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                      {selectedProduct.details.usage}
                    </div>
                  </div>
                </div>

                {/* Форма и документы */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('form')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                      <span className="text-base font-semibold text-gray-900">Форма и документы</span>
                    </div>
                    {openSection === 'form' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection === 'form' ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                      {selectedProduct.details.form}
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопка "Связаться для покупки" */}
              <button className="w-full py-4 bg-indigo-100 hover:bg-indigo-200 rounded-full text-base font-semibold text-gray-900 transition-colors">
                Связаться для покупки
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ExtractsSection