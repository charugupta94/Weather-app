import React, { useState, useEffect } from 'react';
import { RefreshCw, MapPin } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { RecentSearches } from './components/RecentSearches';
import { ErrorMessage } from './components/ErrorMessage';
import { ThemeToggle } from './components/ThemeToggle';
import type { WeatherData, ForecastData } from './types/weather';

// Use environment variable for API key
const API_KEY = "230b626e99fdd487d8335b2d839ac2cc"; // Replace with your actual API key
const MAX_RECENT_SEARCHES = 5;

function App() {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);

  const fetchWeather = async (cityName: string) => {
    if (!API_KEY) {
      setError('API key is not configured. Please add your OpenWeather API key to the environment variables.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
        ),
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(errorData.message || 'City not found. Please check the spelling and try again.');
      }

      const [weather, forecast] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json(),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
      setCity(cityName);
      
      // Update recent searches
      setRecentSearches((prev) => {
        const updated = [cityName, ...prev.filter((c) => c !== cityName)];
        return updated.slice(0, MAX_RECENT_SEARCHES);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Get user's location on first load
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${API_KEY}`
          );
          const data = await response.json();
          const location = Array.isArray(data) && data.length > 0 ? data[0] : null;
          if (location && location.name) {
            fetchWeather(location.name);
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen relative ${isDark ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'} transition-colors duration-300`}>
      <div 
        className="absolute inset-0 h-full bg-cover bg-center bg-no-repeat opacity-10 "
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=2000&q=80')"
        }}
      ></div>
      
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-2">
              <MapPin className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Weather Dashboard
              </h1>
            </div>
            
            <SearchBar onSearch={fetchWeather} isLoading={isLoading} isDark={isDark} />
            
            {error && <ErrorMessage message={error} />}
            
            {weatherData && (
              <div className="relative w-full max-w-md">
                <WeatherCard data={weatherData} isDark={isDark} />
                <button
                  onClick={() => fetchWeather(city)}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50 transition-all duration-300 hover:shadow-xl"
                  disabled={isLoading}
                >
                  <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                </button>
              </div>
            )}
            
            {forecastData && <ForecastCard data={forecastData} isDark={isDark} />}
            
            <RecentSearches
              searches={recentSearches}
              onSelect={fetchWeather}
              isDark={isDark}
            />
          </div>
        </div>

        <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />
      </div>
  );
}

export default App;