import React from 'react';
import type { ForecastData } from '../types/weather';

interface ForecastCardProps {
  data: ForecastData;
  isDark: boolean;
}

export function ForecastCard({ data, isDark }: ForecastCardProps) {
  // Get one forecast per day (every 24 hours)
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 7);

  return (
    <div className={`w-full max-w-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white/90'} rounded-xl shadow-lg backdrop-blur-sm p-6 mt-6 transform transition-all duration-300 hover:shadow-2xl`}>
      <h3 className="text-xl font-semibold mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-7 gap-2">
        {dailyForecasts.map((forecast) => {
          const date = new Date(forecast.dt_txt);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayDate = date.getDate();

          return (
            <div key={forecast.dt_txt} className="text-center">
              <div className="text-sm font-medium mb-1">{dayName}</div>
              <div className="text-xs opacity-75 mb-2">{dayDate}</div>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].main}
                className="w-10 h-10 mx-auto mb-1"
              />
              <div className="text-sm font-medium">
                {Math.round(forecast.main.temp)}°
              </div>
              <div className="text-xs opacity-75">
                {Math.round(forecast.main.feels_like)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}