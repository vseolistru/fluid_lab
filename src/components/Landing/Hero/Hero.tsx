// src/components/Hero/Hero.tsx
import React, { useState } from 'react'

const Hero: React.FC = () => {
  // Состояние: видео загружено или нет
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Фоновое видео — всегда на месте, но скрыто пока не загрузится */}
      <video
        className={`absolute inset-0 w-full h-full object-cover block transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/static/videos/start_video.mp4" type="video/mp4" />
      </video>

      {/* Картинка-заглушка — показывается пока видео грузится */}
      <picture
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img
          src="/static/images/fluid_lab.avif"
          alt="Мобильная лаборатория FluidLab"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover block"
        />
      </picture>

      {/* Градиент снизу для читаемости кнопки */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

      {/* Контент */}
      <div className="relative z-20 flex flex-col items-center justify-between h-full px-6 pt-24 pb-12 text-center text-white">
        {/* Заголовок и подзаголовок */}
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-lg">
            Сверхкритическая
            <br />
            экстракция CO<sub className="text-4xl md:text-6xl">2</sub>
          </h1>
          <p className="mt-6 text-lg md:text-xl font-light opacity-90 drop-shadow-md">
            Премиальные экстракты из растительного сырья
          </p>
        </div>

        {/* Кнопка "Связаться" */}
		<button className="inline-flex items-center gap-3 px-6 py-3 bg-gray-400/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all duration-300">
		{/* Круглая подложка для логотипа */}
		<span className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
			<img 
			src="/static/icons/logo.svg" 
			alt="FluidLab" 
			className="w-14 h-14"
			/>
		</span>
		
		{/* Текст кнопки */}
		<span className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
			Связаться
		</span>
		</button>
      </div>
    </section>
  )
}

export default Hero