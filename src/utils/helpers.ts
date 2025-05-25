export const formatTemp = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  if (unit === 'fahrenheit') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

// 🕐 Updated to use Asia/Manila (Philippine Time)
export const formatTime = (timestamp: number, _timezone: number): string => {
  const date = new Date(timestamp * 1000);
  
  return date.toLocaleTimeString('en-PH', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila' 
  });
};

// 📅 Updated to use Asia/Manila (Philippine Time)
export const formatDate = (timestamp: number, _timezone: number): string => {
  const date = new Date(timestamp * 1000);
  
  return date.toLocaleDateString('en-PH', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila'
  });
};

export const getWeatherBackground = (icon: string): string => {
  const code = icon.substring(0, 2);
  const isDay = icon.includes('d');
  
  switch (code) {
    case '01':
      return isDay 
        ? 'bg-gradient-to-b from-blue-400 to-blue-200' 
        : 'bg-gradient-to-b from-gray-900 to-blue-900';
    case '02':
    case '03':
    case '04':
      return isDay 
        ? 'bg-gradient-to-b from-blue-400 to-gray-200' 
        : 'bg-gradient-to-b from-gray-800 to-blue-900';
    case '09':
    case '10':
      return isDay 
        ? 'bg-gradient-to-b from-gray-400 to-blue-300' 
        : 'bg-gradient-to-b from-gray-700 to-blue-800';
    case '11':
      return 'bg-gradient-to-b from-gray-800 to-purple-900';
    case '13':
      return isDay 
        ? 'bg-gradient-to-b from-blue-100 to-gray-100' 
        : 'bg-gradient-to-b from-gray-700 to-blue-900';
    case '50':
      return isDay 
        ? 'bg-gradient-to-b from-gray-300 to-gray-200' 
        : 'bg-gradient-to-b from-gray-700 to-gray-900';
    default:
      return isDay 
        ? 'bg-gradient-to-b from-blue-400 to-blue-100' 
        : 'bg-gradient-to-b from-gray-800 to-blue-900';
  }
};

export const getWeatherIcon = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
