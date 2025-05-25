import React from 'react';
import { ForecastData } from '../types/weather';
import { formatTemp, getWeatherIcon } from '../utils/helpers';

interface ForecastCardProps {
  forecast: ForecastData[];
  unit: 'celsius' | 'fahrenheit';
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, unit }) => {
  if (!forecast.length) return null;
  
  return (
    <div className="w-full max-w-md mx-auto mt-6 rounded-xl overflow-hidden shadow-lg bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm">
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-2">
              <p className="text-sm font-medium text-gray-700">{day.day}</p>
              <img 
                src={getWeatherIcon(day.icon)} 
                alt={day.description} 
                className="w-10 h-10 my-1"
              />
              <div className="text-xs text-center">
                <span className="text-red-500 font-medium">
                  {formatTemp(day.temp.max, unit).replace('°C', '').replace('°F', '')}°
                </span>
                {' / '}
                <span className="text-blue-500 font-medium">
                  {formatTemp(day.temp.min, unit).replace('°C', '').replace('°F', '')}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;