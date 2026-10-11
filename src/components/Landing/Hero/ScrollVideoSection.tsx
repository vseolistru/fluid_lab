// src/components/ScrollVideoSection/ScrollVideoSection.tsx
import React, { useRef, useEffect, useState } from 'react'

const ScrollVideoSection: React.FC = () => {
  const nextVideoRef = useRef<HTMLVideoElement>(null)
  const lastVideoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isNextVideoReady, setIsNextVideoReady] = useState(false)
  const [isLastVideoReady, setIsLastVideoReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showLastVideo, setShowLastVideo] = useState(false)

  const TEXT_DISAPPEAR_PROGRESS = 0.35

  const texts = [
    {
      title: 'Завод, который приезжает к вам',
      subtitle: 'SC-CO₂-экстракция в контейнере\nБез стройки и цеха',
    },
    {
      title: 'Полный цикл в одном модуле',
      subtitle: 'Экстракция, фракции и автоматика — в одном контуре',
    },
    {
      title: 'Встаёт на вашей площадке',
      subtitle: '3 фазы 30 кВт и подъезд — запуск без стройки',
    },
  ]

  const currentTextIndex = Math.min(Math.floor(progress * 3), 2)
  const containerScale = 1.27 + progress * 0.75
  const textOpacity = Math.max(0, 1 - progress / TEXT_DISAPPEAR_PROGRESS)
  const shouldShowStaticImage = progress < TEXT_DISAPPEAR_PROGRESS

  useEffect(() => {
    const nextVideo = nextVideoRef.current
    const lastVideo = lastVideoRef.current
    const container = containerRef.current
    if (!nextVideo || !lastVideo || !container) return

    const handleNextVideoLoaded = () => {
      nextVideo.pause()
      setIsNextVideoReady(true)
    }

    const handleLastVideoLoaded = () => {
      setIsLastVideoReady(true)
    }

    nextVideo.addEventListener('loadedmetadata', handleNextVideoLoaded)
    lastVideo.addEventListener('loadedmetadata', handleLastVideoLoaded)

    const handleScroll = () => {
      if (!nextVideo.duration) return

      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const scrollStart = windowHeight * 0.2
      const scrollEnd = container.offsetHeight - windowHeight * 0.5
      const scrollDistance = scrollEnd - scrollStart

      let newProgress = (windowHeight - rect.top - scrollStart) / scrollDistance
      newProgress = Math.max(0, Math.min(1, newProgress))

      setProgress(newProgress)

      // Переключение между видео
      if (newProgress >= 1) {
        // Достигли конца — показываем last_video
        if (!showLastVideo) {
          setShowLastVideo(true)
          lastVideo.play().catch(() => {})
          nextVideo.pause()
        }
      } else {
        // Обратный скролл — возвращаемся к next_video
        if (showLastVideo) {
          setShowLastVideo(false)
          lastVideo.pause()
          lastVideo.currentTime = 0 // Сбрасываем last_video в начало
        }
        
        // Управление next_video
        if (shouldShowStaticImage) {
          nextVideo.pause()
        } else {
          // Устанавливаем время видео по прогрессу
          nextVideo.currentTime = newProgress * nextVideo.duration
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      nextVideo.removeEventListener('loadedmetadata', handleNextVideoLoaded)
      lastVideo.removeEventListener('loadedmetadata', handleLastVideoLoaded)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [shouldShowStaticImage, isNextVideoReady, progress, showLastVideo])

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-white">
      {/* Текст */}
      <div
        className="relative z-20 pt-32 pb-16 text-center max-w-4xl mx-auto px-8"
        style={{
          opacity: textOpacity,
          pointerEvents: 'none',
        }}
      >
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {texts[currentTextIndex].title}
        </h2>
        <p className="text-xl text-gray-600 whitespace-pre-line">
          {texts[currentTextIndex].subtitle}
        </p>
      </div>

      {/* Sticky контейнер */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(-50%, -50%) scale(${containerScale})`,
            transformOrigin: 'center center',
            width: '100%',
            maxWidth: '1200px',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Картинка-заглушка */}
          <div
            className={`relative w-full transition-opacity duration-700 ${
              isNextVideoReady && !shouldShowStaticImage && !showLastVideo ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <img
              src="/static/images/container.avif"
              alt="FluidLab контейнер"
              className="w-full h-auto"
            />
          </div>

          {/* next_video — управляется скроллом */}
          <video
            ref={nextVideoRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              isNextVideoReady && !shouldShowStaticImage && !showLastVideo ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectFit: progress > 0.7 ? 'cover' : 'contain',
            }}
            muted
            playsInline
            preload="auto"
          >
            <source src="/static/videos/next_video.mp4" type="video/mp4" />
          </video>

          {/* last_video — зацикленное, показывается в конце */}
          <video
            ref={lastVideoRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              showLastVideo ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectFit: 'cover',
            }}
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/static/videos/last_video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}

export default ScrollVideoSection