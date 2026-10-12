// src/types/index.ts

// src/types/index.ts

// ==================== БАЗОВЫЕ ТИПЫ ====================

export type ProductForm = 'concentrate' | 'mct50'
export type Application = 'cosmetics' | 'pharma' | 'food' | 'perfume' | 'alcohol' | 'supplements'

// Строгий Union-тип для объёмов (в мл)
export type Volume = 50 | 100 | 500 | 1000 | 3000 | 5000

export interface Characteristic {
  label: string
  value: string
}

export interface ProductCharacteristics {
  plant: string
  rawMaterial: string
  solubility: string
}

export interface ProductDetails {
  composition: string
  application: string
  usage: string
  form: string
}

// ==================== ВАРИАНТ ТОВАРА (Объём + Цена) ====================

export interface ProductVariant {
  volume: Volume
  price: number
  oldPrice?: number
  discount?: number
  inStock: boolean // Наличие может отличаться для разных объёмов!
}

// ==================== ПОЛНЫЙ ТИП ТОВАРА ====================

export interface Product {
  id: number
  name: string
  slug: string
  image: string[]
  category: string
  application: Application
  form: ProductForm

  // Описания
  shortDescription: string
  description: string
  fullTitle: string

  // Логистика
  duration: string       // e.g., "12 месяцев"
  startDate: string      // e.g., "5 апреля"
  expirationDate?: string

  // ВАРИАНТЫ (вместо плоских price и availableVolumes)
  variants: ProductVariant[]

  // Дополнительно
  characteristics: Characteristic[]
  productCharacteristics: ProductCharacteristics
  details: ProductDetails
  use?: string[]

  // SEO
  seoTitle: string
  seoDescription: string
}

// ==================== ДЛЯ КАТАЛОГА (суженный) ====================

export type CatalogProduct = Pick<
  Product,
  | 'id'
  | 'name'
  | 'slug'
  | 'image'
  | 'category'
  | 'application'
  | 'form'
  | 'duration'
  | 'startDate'
  | 'variants' // Берём весь массив, в карточке покажем variants[0]
>

// ==================== ПОЛЬЗОВАТЕЛЬ ====================

// export interface User {
//   id: string
//   email: string
//   firstName?: string
//   lastName?: string
//   role: 'user' | 'admin'
// }

// ==================== КОРЗИНА ====================

// export interface CartItem {
//   productId: number
//   quantity: number
//   price: number
// }

// ==================== ЗАКАЗ ====================

// export interface Order {
//   id: string
//   userId: string
//   items: CartItem[]
//   total: number
//   status: 'pending' | 'processing' | 'shipped' | 'delivered'
//   createdAt: Date
// }
