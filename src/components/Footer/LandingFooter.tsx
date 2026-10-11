// src/components/Footer/Footer.tsx
import React from 'react'
import { Droplet } from 'lucide-react'

const LandingFooter: React.FC = () => {
  return (
    <footer className="relative w-full h-screen overflow-hidden">
      {/* Фоновая картинка */}
      <img
        src="/static/images/footer.avif"
        alt="FluidLab контейнер"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Нижняя панель с информацией */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Разделительная линия */}
        <div className="h-px bg-white/30 mx-8 md:mx-16" />

        {/* Контент */}
        <div className="px-8 md:px-16 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Левая колонка */}
          <div className="space-y-2">
            <p className="text-sm md:text-base text-white font-medium">
              Мобильная SC-CO₂-экстракция
            </p>
            <a
              href="mailto:info@fluidlab.pro"
              className="block text-sm md:text-base text-white/80 hover:text-white transition-colors"
            >
              info@fluidlab.pro
            </a>
          </div>

          {/* Центральная колонка */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-8">
            <a
              href="/privacy"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Политика конфиденциальности
            </a>
          </div>

          {/* Правая колонка */}
          <div className="space-y-2 md:text-right">
            <p className="text-sm md:text-base text-white font-medium">
              © 2026 FluidLab
            </p>
            <a
              href="/consent"
              className="block text-sm text-white/80 hover:text-white transition-colors"
            >
              Согласие на обработку персональных данных
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter;