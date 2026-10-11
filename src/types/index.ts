// src/types/index.ts

// ==================== ПРОДУКТЫ ====================

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

export interface Product {
  id: number
  name: string
  shortDescription: string
  image: string
  fullTitle: string
  characteristics: ProductCharacteristics
  details: ProductDetails
}

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

export type ProductForm = 'concentrate' | 'mct50'
export type Application = 'cosmetics' | 'pharma' | 'food' | 'perfume' | 'alcohol' | 'supplements'

export interface CatalogProduct {
  id: number
  name: string
  slug: string
  image: string
  category: string          // Облепиха, Амарант, Чёрный тмин...
  application: Application  // Косметика, Фармацевтика...
  form: ProductForm
  volume: string            // 50мл, 100мл, 1л
  price: number             // Цена в рублях
  oldPrice?: number         // Старая цена (для скидки)
  discount?: number         // Процент скидки
  inStock: boolean
  duration: string          // Срок производства
  startDate: string         // Дата следующей партии
  description: string
}