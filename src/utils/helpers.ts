export const formatTemp = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  if (unit === 'fahrenheit') {
    return `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
};

export const formatTime = (timestamp: number, timezone: number): string => {
  const date = new Date(timestamp * 1000);
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  const cityTime = new Date(utcTime + (timezone * 1000));
  
  return cityTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDate = (timestamp: number, timezone: number): string => {
  const date = new Date(timestamp * 1000);
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  const cityTime = new Date(utcTime + (timezone * 1000));
  
  return cityTime.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getWeatherBackground = (icon: string): string => {
  // Icon codes from OpenWeatherMap API
  const code = icon.substring(0, 2);
  const isDay = icon.includes('d');
  
  switch (code) {
    case '01': // clear sky
      return isDay 
        ? 'bg-gradient-to-b from-blue-400 to-blue-200' 
        : 'bg-gradient-to-b from-gray-900 to-blue-900';
    case '02': // few clouds
    case '03': // scattered clouds
    case '04': // broken clouds
      return isDay 
        ? 'bg-gradient-to-b from-blue-400 to-gray-200' 
        : 'bg-gradient-to-b from-gray-800 to-blue-900';
    case '09': // shower rain
    case '10': // rain
      return isDay 
        ? 'bg-gradient-to-b from-gray-400 to-blue-300' 
        : 'bg-gradient-to-b from-gray-700 to-blue-800';
    case '11': // thunderstorm
      return 'bg-gradient-to-b from-gray-800 to-purple-900';
    case '13': // snow
      return isDay 
        ? 'bg-gradient-to-b from-blue-100 to-gray-100' 
        : 'bg-gradient-to-b from-gray-700 to-blue-900';
    case '50': // mist
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