// src/pages/ProductDetail.tsx
import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  Check,
  Truck,
  Package,
  FileText,
  Star,
  ArrowLeft,
  FlaskConical,
  Beaker
} from 'lucide-react'
import Header from '../components/Header/Header'
import CatalogHeader from '../components/Header/CatalogHero'
import CatalogFooter from '../components/Footer/CatalogFooter'
import { mockProducts } from '../data/mockProducts'
import type { Product, Volume } from '../types'

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const product = mockProducts.find((p) => p.slug === slug)

  // Стейт выбранного объёма — строго тип Volume
  const [selectedVolume, setSelectedVolume] = useState<Volume>(
    product?.variants[0]?.volume ?? 50
  )
  const [quantity, setQuantity] = useState(1)
const [activeTab, setActiveTab] = useState<
  'description' | 'details' | 'application' | 'usage' | 'characteristics' | 'delivery'
>('description')

  // Если товар не найден
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartCount={0} wishlistCount={0} />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Товар не найден
            </h1>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Вернуться в каталог
            </Link>
          </div>
        </main>
        <CatalogFooter />
      </div>
    )
  }

  // Текущий вариант (цена, наличие, скидка) для выбранного объёма
  const currentVariant =
    product.variants.find((v) => v.volume === selectedVolume) ??
    product.variants[0]

  const hasDiscount =
    currentVariant.discount !== undefined && currentVariant.discount > 0

  // Картинки
  const mainImage = product.image[0]
  const galleryImages = product.image.slice(1)

  // Объединяем характеристики для таба
  const allCharacteristics = [
    { label: 'Растение (INCI)', value: product.productCharacteristics.plant },
    { label: 'Сырьё', value: product.productCharacteristics.rawMaterial },
    { label: 'Растворимость', value: product.productCharacteristics.solubility },
    { label: 'Форма выпуска', value: product.form === 'concentrate' ? 'Концентрат' : 'В MCT 50%' },
    { label: 'Срок производства', value: product.duration },
    ...product.characteristics,
  ]

  return (
    <>
      <Helmet>
        <title>{product.seoTitle}</title>
        <meta name="description" content={product.seoDescription} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <CatalogHeader/>

        <main className="flex-1">
          {/* Хлебные крошки */}
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад в каталог
            </button>
          </div>

          {/* Основная секция товара */}
          <div className="max-w-[1400px] mx-auto px-6 py-8 bg-white rounded-3xl mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Левая колонка — изображения */}
              <div>
                <div className="bg-gray-50 rounded-3xl p-8 mb-4 border border-gray-100">
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-96 object-contain"
                  />
                </div>

                {/* Миниатюры */}
                {galleryImages.length > 0 && (
                  <div className="flex gap-4">
                    <button className="w-20 h-20 bg-gray-50 rounded-xl border-2 border-indigo-600 overflow-hidden">
                      <img
                        src={mainImage}
                        alt=""
                        className="w-full h-full object-contain p-2"
                      />
                    </button>
                    {galleryImages.slice(0, 2).map((img, i) => (
                      <button
                        key={i}
                        className="w-20 h-20 bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden hover:border-gray-300 transition-colors"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-contain p-2"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Правая колонка — информация */}
              <div>
                <div className="mb-4">
                  <span className="inline-block text-sm font-semibold text-indigo-600 mb-2">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentVariant.inStock ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                    <span
                      className={`text-sm font-medium ${
                        currentVariant.inStock
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {currentVariant.inStock ? 'В наличии' : 'Под заказ'}
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-sm text-gray-500 mb-6">
                  Артикул: {product.slug}
                </p>

                {/* Рейтинг */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    4.9
                  </span>
                  <span className="text-sm text-gray-500">(127 отзывов)</span>
                </div>

                {/* Цена — динамически меняется от выбранного объёма */}
                <div className="mb-8">
                  {currentVariant.oldPrice && (
                    <p className="text-lg text-gray-400 line-through mb-1">
                      {currentVariant.oldPrice.toLocaleString()} ₽
                    </p>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-bold text-gray-900">
                      {currentVariant.price.toLocaleString()} ₽
                    </span>
                    <span className="text-lg text-gray-500">
                      за {selectedVolume} мл
                    </span>
                  </div>
                  {hasDiscount && (
                    <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                      Скидка {currentVariant.discount}%
                    </span>
                  )}
                </div>

                <p className="text-base text-gray-700 leading-relaxed mb-8">
                  {product.shortDescription}
                </p>

                {/* Выбор объёма — рендерим из product.variants */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Выберите объём:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => {
                      const isActive = selectedVolume === variant.volume
                      const isOutOfStock = !variant.inStock

                      return (
                        <button
                          key={variant.volume}
                          onClick={() => setSelectedVolume(variant.volume)}
                          disabled={isOutOfStock}
                          className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isActive
                              ? 'bg-indigo-900 text-white'
                              : isOutOfStock
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {variant.volume} мл
                          {isOutOfStock && !isActive && (
                            <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                              Нет
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Количество и кнопки */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-3 text-sm font-semibold text-gray-900 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button className="flex-1 px-8 py-3 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors inline-flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    В корзину
                  </button>

                  <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Преимущества */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        100% натуральный
                      </p>
                      <p className="text-xs text-gray-500">
                        Без растворителей
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Быстрая доставка
                      </p>
                      <p className="text-xs text-gray-500">По всей России</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Табы */}
          <div className="max-w-[1400px] mx-auto px-6 pb-16">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100">
              
              {/* Заголовки табов (с горизонтальным скроллом на мобильных) */}
              <div className="flex gap-4 md:gap-8 mb-8 border-b border-gray-200 overflow-x-auto pb-1 scrollbar-hide">
							  {[
				  { id: 'description', label: 'Описание' },
                  { id: 'details', label: 'Детализация' },
                  { id: 'application', label: 'Применение' },
                  { id: 'usage', label: 'Назначение' },
                  { id: 'characteristics', label: 'Характеристики' },
                  { id: 'delivery', label: 'Доставка' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-base md:text-lg font-semibold pb-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-indigo-900 text-indigo-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Контент табов */}
				<div className="min-h-[300px]">
				{/* === 1. ОПИСАНИЕ === */}
				{activeTab === 'description' && (
					<div className="max-w-3xl space-y-6">
					<div>
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
						{product.fullTitle}
						</h3>
						<p className="text-base text-gray-700 leading-relaxed mb-4">
						{product.shortDescription}
						</p>
						<p className="text-gray-700 leading-relaxed">
						{product.description}
						</p>
					</div>
					</div>
				)}
                
                {/* === 2. ДЕТАЛИЗАЦИЯ === */}
                {activeTab === 'details' && (
                  <div className="max-w-3xl space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Описание продукта</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <FlaskConical className="w-4 h-4" /> Состав
                        </h4>
                        <p className="text-gray-900 font-medium leading-relaxed">
                          {product.details.composition}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Package className="w-4 h-4" /> Форма выпуска
                        </h4>
                        <p className="text-gray-900 font-medium leading-relaxed">
                          {product.details.form}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* === 3. ПРИМЕНЕНИЕ === */}
                {activeTab === 'application' && (
                  <div className="max-w-3xl space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FlaskConical className="w-5 h-5 text-indigo-600" />
                        Область применения
                      </h3>
                      <p className="text-gray-700 leading-relaxed bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                        {product.details.application}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Beaker className="w-5 h-5 text-indigo-600" />
                        Рекомендации по вводу в рецептуру
                      </h3>
                      <p className="text-gray-700 leading-relaxed bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                        {product.details.usage}
                      </p>
                    </div>
                  </div>
                )}

                {/* === 4. НАЗНАЧЕНИЕ === */}
                {activeTab === 'usage' && (
                  <div className="max-w-3xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Целевое назначение экстракта
                    </h3>
                    {product.use && product.use.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.use.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all"
                          >
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-indigo-700" />
                            </div>
                            <span className="text-gray-800 font-medium leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Информация о назначении уточняется у технолога.</p>
                    )}
                  </div>
                )}

                {/* === 5. ХАРАКТЕРИСТИКИ (оставили как было, но чуть причесали) === */}
                {activeTab === 'characteristics' && (
                  <div className="max-w-2xl">
                    <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
                      {allCharacteristics.map((char) => (
                        <div
                          key={char.label}
                          className="flex py-4 px-6 bg-white hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-sm text-gray-500 w-48 flex-shrink-0">
                            {char.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {char.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* === 6. ДОСТАВКА (оставили как было) === */}
                {activeTab === 'delivery' && (
                  <div className="max-w-3xl space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Truck className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Доставка по России</h4>
                        <p className="text-gray-700 leading-relaxed">Отправляем транспортными компаниями (СДЭК, Деловые Линии, ПЭК). Срок доставки зависит от региона.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Упаковка</h4>
                        <p className="text-gray-700 leading-relaxed">Все экстракты упаковываются в герметичные контейнеры из тёмного стекла или алюминия.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Документы</h4>
                        <p className="text-gray-700 leading-relaxed">К каждой поставке прилагаются: паспорт качества, протокол испытаний, сертификат соответствия, MSDS.</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>		  
        </main>
        <CatalogFooter />
      </div>
    </>
  )
}

export default ProductDetail