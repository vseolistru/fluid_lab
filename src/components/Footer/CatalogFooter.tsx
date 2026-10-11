// src/components/catalog/CatalogFooter.tsx
import React from 'react'

const CatalogFooter: React.FC = () => {
  return (
    <section className="relative w-full min-h-[600px] overflow-hidden mt-20">
      {/* Фоновая картинка */}
      <img
        src="/static/images/catalog_footer.webp"
        alt="FluidLab"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Контент */}
      <div className="relative z-10 min-h-[650px] flex flex-col justify-end px-6 pb-8">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="h-px bg-white/30 mb-6" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white font-medium">
                Мобильная SC-CO₂-экстракция
              </p>
              <a
                href="mailto:info@fluidlab.pro"
                className="block text-sm text-white/80 hover:text-white transition-colors mt-1"
              >
                info@fluidlab.pro
              </a>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="/privacy" className="text-sm text-white/80 hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/consent" className="text-sm text-white/80 hover:text-white transition-colors">
                Согласие на обработку ПД
              </a>
            </div>
            <p className="text-sm text-white font-medium">
              © 2026 FluidLab
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CatalogFooter