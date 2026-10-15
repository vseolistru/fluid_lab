// src/store/filterStore.ts
import { create } from 'zustand'
import type { Application, ProductForm, Volume } from '../types'

interface FilterState {
  // Состояние
  applications: Application[]
  forms: ProductForm[]
  volumes: Volume[]
  priceRange: { min: number; max: number }
  inStock: boolean
  hasDiscount: boolean

  // Действия
  toggleApplication: (app: Application) => void
  toggleForm: (form: ProductForm) => void
  toggleVolume: (volume: Volume) => void
  setPriceRange: (min: number, max: number) => void
  toggleInStock: () => void
  toggleDiscount: () => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  // Начальное состояние
  applications: [],
  forms: [],
  volumes: [],
  priceRange: { min: 0, max: 100000 },
  inStock: false,
  hasDiscount: false,

  // Методы обновления
  toggleApplication: (app) =>
    set((state) => ({
      applications: state.applications.includes(app)
        ? state.applications.filter((a) => a !== app)
        : [...state.applications, app],
    })),

  toggleForm: (form) =>
    set((state) => ({
      forms: state.forms.includes(form)
        ? state.forms.filter((f) => f !== form)
        : [...state.forms, form],
    })),

  toggleVolume: (volume) =>
    set((state) => ({
      volumes: state.volumes.includes(volume)
        ? state.volumes.filter((v) => v !== volume)
        : [...state.volumes, volume],
    })),

  setPriceRange: (min, max) => set({ priceRange: { min, max } }),

  toggleInStock: () => set((state) => ({ inStock: !state.inStock })),

  toggleDiscount: () => set((state) => ({ hasDiscount: !state.hasDiscount })),

  resetFilters: () =>
    set({
      applications: [],
      forms: [],
      volumes: [],
      priceRange: { min: 0, max: 100000 },
      inStock: false,
      hasDiscount: false,
    }),
}))