export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  dt: number;
}

export interface ForecastData {
  date: number;
  day: string;
  temp: {
    min: number;
    max: number;
  };
  icon: string;
  description: string;
}

export interface WeatherError {
  message: string;
}