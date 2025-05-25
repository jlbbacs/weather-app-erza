import React from 'react';
import { Droplets, Wind, BarChart } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTemp, formatDate, formatTime, getWeatherIcon } from '../utils/helpers';

interface WeatherCardProps {
  weatherData: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, unit }) => {
  const {
    city,
    country,
    temperature,
    feelsLike,
    description,
    icon,
    humidity,
    wind,
    pressure,
    dt,
    timezone
  } = weatherData;

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
            <p className="text-gray-600">{country}</p>
            <p className="text-sm text-gray-500">
              {formatDate(dt, timezone)}
            </p>
            <p className="text-sm text-gray-500">
              {formatTime(dt, timezone)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-800">
              {formatTemp(temperature, unit)}
            </div>
            <div className="text-sm text-gray-600">
              Feels like: {formatTemp(feelsLike, unit)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <img 
            src={getWeatherIcon(icon)} 
            alt={description} 
            className="w-20 h-20"
          />
          <p className="text-xl text-gray-700 capitalize ml-2">{description}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Droplets className="w-6 h-6 mx-auto text-blue-500 mb-1" />
            <div className="text-sm text-gray-500">Humidity</div>
            <div className="text-lg font-medium text-gray-800">{humidity}%</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <Wind className="w-6 h-6 mx-auto text-blue-500 mb-1" />
            <div className="text-sm text-gray-500">Wind</div>
            <div className="text-lg font-medium text-gray-800">{wind} m/s</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <BarChart className="w-6 h-6 mx-auto text-blue-500 mb-1" />
            <div className="text-sm text-gray-500">Pressure</div>
            <div className="text-lg font-medium text-gray-800">{pressure} hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;