import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import TemperatureToggle from './components/TemperatureToggle';
import WeatherAnimation from './components/WeatherAnimation';
import { fetchWeatherData, fetchForecastData } from './utils/api';
import { getWeatherBackground } from './utils/helpers';
import { WeatherData, ForecastData, WeatherError } from './types/weather';

function App() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleSearch = async (searchCity: string) => {
    setCity(searchCity);
    setError(null);
    setLoading(true);
    setInitialLoad(false);

    try {
      const weatherResult = await fetchWeatherData(searchCity);
      
      if ('message' in weatherResult) {
        setError(weatherResult.message);
        setWeather(null);
        setForecast([]);
      } else {
        setWeather(weatherResult);
        
        // Fetch forecast data
        const forecastResult = await fetchForecastData(searchCity);
        if ('message' in forecastResult) {
          // We have weather but forecast failed
          setForecast([]);
        } else {
          setForecast(forecastResult);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  // Load default city on initial render
  useEffect(() => {
    handleSearch('Cagayan de Oro');
  }, []);

  const backgroundClass = weather ? getWeatherBackground(weather.icon) : 'bg-gradient-to-b from-blue-400 to-blue-100';

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${backgroundClass}`}>
      {weather && <WeatherAnimation weatherIcon={weather.icon} />}
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Sun className="text-yellow-500 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-white drop-shadow-md">Erza's Weather Forecast</h1>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={loading} />
          {!initialLoad && <TemperatureToggle unit={unit} onToggle={toggleTemperatureUnit} />}
        </header>

        <main className="max-w-md mx-auto">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : weather ? (
            <>
              <WeatherCard weatherData={weather} unit={unit} />
              <ForecastCard forecast={forecast} unit={unit} />
            </>
          ) : initialLoad ? (
            <div className="text-center p-8 text-gray-600">
              Loading initial weather data...
            </div>
          ) : (
            <div className="text-center p-8 text-gray-600">
              Search for a city to see the weather forecast
            </div>
          )}
        </main>

        <footer className="text-center mt-12 text-sm text-white opacity-80">
          <p>Weather data provided by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}

export default App;