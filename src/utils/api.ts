import { WeatherData, ForecastData, WeatherError } from '../types/weather';

// OpenWeatherMap API key - should ideally be in an env file
const API_KEY = '1bd8eedcc7bcb4e503ff2db46e583f13';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<WeatherData | WeatherError> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || 'Failed to fetch weather data' };
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      pressure: data.main.pressure,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timezone: data.timezone,
      dt: data.dt
    };
  } catch (error) {
    return { message: 'Error fetching weather data. Please try again.' };
  }
};

export const fetchForecastData = async (city: string): Promise<ForecastData[] | WeatherError> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || 'Failed to fetch forecast data' };
    }
    
    const data = await response.json();
    
    // Process 5-day forecast (we'll take one reading per day at noon)
    const forecastMap = new Map<string, any>();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateStr = date.toISOString().split('T')[0];
      
      if (!forecastMap.has(dateStr)) {
        forecastMap.set(dateStr, {
          date: item.dt,
          day,
          temp: {
            min: item.main.temp_min,
            max: item.main.temp_max
          },
          icon: item.weather[0].icon,
          description: item.weather[0].description
        });
      } else {
        // Update min/max if needed
        const existing = forecastMap.get(dateStr);
        if (item.main.temp_min < existing.temp.min) {
          existing.temp.min = item.main.temp_min;
        }
        if (item.main.temp_max > existing.temp.max) {
          existing.temp.max = item.main.temp_max;
        }
      }
    });
    
    // Convert map to array and take first 5 days
    return Array.from(forecastMap.values()).slice(0, 5);
  } catch (error) {
    return { message: 'Error fetching forecast data. Please try again.' };
  }
};