import React from 'react';
import { Droplets, Wind, Thermometer, Compass } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
  isDark: boolean;
}

export function WeatherCard({ data, isDark }: WeatherCardProps) {
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white/90'} rounded-xl shadow-lg backdrop-blur-sm p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-2xl`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">{data.name}</h2>
          <p className="text-sm opacity-75">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="text-right">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="w-24 h-24 -mt-4 -mr-4"
          />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-end mb-2">
          <div className="text-6xl font-bold">
            {Math.round(data.main.temp)}°
          </div>
          <div className="text-2xl ml-2 mb-2">C</div>
        </div>
        <div className={`text-lg ${isDark ? 'text-blue-300' : 'text-blue-600'} capitalize`}>
          {data.weather[0].description}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-blue-500'}`} />
            <span className="text-sm opacity-75">Feels Like</span>
          </div>
          <span className="text-xl font-semibold">{Math.round(data.main.feels_like)}°C</span>
        </div>

        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Droplets className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-blue-500'}`} />
            <span className="text-sm opacity-75">Humidity</span>
          </div>
          <span className="text-xl font-semibold">{data.main.humidity}%</span>
        </div>

        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Wind className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-blue-500'}`} />
            <span className="text-sm opacity-75">Wind Speed</span>
          </div>
          <span className="text-xl font-semibold">{Math.round(data.wind.speed * 3.6)} km/h</span>
        </div>

        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Compass className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-blue-500'}`} />
            <span className="text-sm opacity-75">Wind Dir</span>
          </div>
          <span className="text-xl font-semibold">{getWindDirection(data.wind.deg)}</span>
        </div>
      </div>
    </div>
  );
}