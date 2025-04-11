import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  isDark: boolean;
}

export function SearchBar({ onSearch, isLoading, isDark }: SearchBarProps) {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className={`w-full px-5 py-3 ${
            isDark 
              ? 'bg-gray-800 text-white border-gray-700 focus:border-blue-500' 
              : 'bg-white/90 text-gray-900 border-gray-200 focus:border-blue-500'
          } border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm`}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full ${
            isDark
              ? 'text-gray-400 hover:text-blue-400'
              : 'text-gray-600 hover:text-blue-600'
          } disabled:opacity-50 transition-colors duration-300`}
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
}