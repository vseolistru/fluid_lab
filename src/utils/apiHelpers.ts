// Конвертируем относительный путь в абсолютный URL
// Получаем базовый URL API из env
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

export const getFullImageUrl = (path?: string): string => {
  if (!path) return '/placeholder.jpg';
  
  // Если уже полный URL — возвращаем как есть
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Иначе добавляем базовый URL API
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path}`;
};