// src/pages/Cart.tsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header/Header'
import CatalogHeader from '../components/Header/CatalogHero'
import CatalogFooter from '../components/Footer/CatalogFooter'
import { useAuthStore } from '../store/authStore'

// Тип для товара в корзине
export interface CartItem {
  id: string
  product: {
    id: string
    name: string
    slug: string
    image: string
    price: number
    category: string
  }
  volume: number
  quantity: number
  subtotal: number
}

interface CartProps {
  items?: CartItem[]
}

const Cart: React.FC<CartProps> = ({ items = [] }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  // Моковые данные для демонстрации (потом заменим на реальные из стора/API)
  const mockItems: CartItem[] = items.length > 0 ? items : [
    {
      id: '1',
      product: {
        id: '1',
        name: 'Облепиха',
        slug: 'sea-buckthorn',
        image: '/static/images/oil_sea_buckthorn.png',
        price: 3550,
        category: 'Облепиха',
      },
      volume: 50,
      quantity: 1,
      subtotal: 3550,
    },
    {
      id: '2',
      product: {
        id: '2',
        name: 'Амарант',
        slug: 'amaranth',
        image: '/static/images/oil_amaranth.png',
        price: 2463,
        category: 'Амарант',
      },
      volume: 100,
      quantity: 2,
      subtotal: 4926,
    },
  ]

  const subtotal = mockItems.reduce((sum, item) => sum + item.subtotal, 0)
  const shipping = subtotal > 10000 ? 0 : 500 // Бесплатная доставка от 10 000 ₽
  const total = subtotal + shipping

  const handleQuantityChange = (itemId: string, delta: number) => {
    // TODO: обновить количество в сторе
    console.log('Change quantity:', itemId, delta)
  }

  const handleRemoveItem = (itemId: string) => {
    // TODO: удалить товар из корзины
    console.log('Remove item:', itemId)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <>
      <Helmet>
        <title>Корзина — FluidLab</title>
        <meta name="description" content="Оформление заказа экстрактов SC-CO₂" />
      </Helmet>

		<Header cartCount={mockItems.length} wishlistCount={0} />
		<CatalogHeader />

      <main className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Хлебные крошки */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Главная
                </Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-semibold">Корзина</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">Корзина</h1>

          {mockItems.length === 0 ? (
            // Пустая корзина
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Ваша корзина пуста
              </h2>
              <p className="text-gray-600 mb-8">
                Добавьте экстракты из каталога, чтобы оформить заказ
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors"
              >
                Перейти в каталог
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            // Корзина с товарами
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Список товаров */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                  {/* Заголовок таблицы */}
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
                    <div className="col-span-5">Товар</div>
                    <div className="col-span-2 text-center">Объём</div>
                    <div className="col-span-3 text-center">Количество</div>
                    <div className="col-span-2 text-right">Сумма</div>
                  </div>

                  {/* Товары */}
                  <div className="divide-y divide-gray-200">
                    {mockItems.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-4 px-6 py-6 items-center group hover:bg-gray-50 transition-colors"
                      >
                        {/* Товар */}
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {item.product.category}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              {item.product.price.toLocaleString()} ₽
                            </p>
                          </div>
                        </div>

                        {/* Объём */}
                        <div className="col-span-2 text-center">
                          <span className="inline-block px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold">
                            {item.volume} мл
                          </span>
                        </div>

                        {/* Количество */}
                        <div className="col-span-3 flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Сумма */}
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="font-bold text-gray-900">
                            {item.subtotal.toLocaleString()} ₽
                          </span>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопка продолжения покупок */}
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-gray-300 rounded-xl text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                  Продолжить покупки
                </Link>
              </div>

              {/* Итоги заказа */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Итого
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Подытог:</span>
                      <span className="font-semibold text-gray-900">
                        {subtotal.toLocaleString()} ₽
                      </span>
                    </div>

                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Доставка:</span>
                      <span className="font-semibold text-gray-900">
                        {shipping === 0 ? (
                          <span className="text-green-600">Бесплатно</span>
                        ) : (
                          `${shipping.toLocaleString()} ₽`
                        )}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-gray-500 bg-indigo-50 p-3 rounded-lg">
                        💡 Бесплатная доставка при заказе от 10 000 ₽
                      </p>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Всего:
                        </span>
                        <span className="text-2xl font-bold text-indigo-900">
                          {total.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-indigo-900 text-white rounded-xl text-base font-semibold hover:bg-indigo-800 transition-colors mb-4"
                  >
                    Оформить заказ
                  </button>

                  <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Все товары в наличии
                  </div>
                </div>

                {/* Преимущества */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-700 font-bold text-xs">✓</span>
                    </div>
                    <p>Паспорт качества и протокол испытаний к каждому экстракту</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-700 font-bold text-xs">✓</span>
                    </div>
                    <p>Быстрая доставка по всей России</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-indigo-700 font-bold text-xs">✓</span>
                    </div>
                    <p>Персональный менеджер для оптовых заказов</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <CatalogFooter />
    </>
  )
}

export default Cart