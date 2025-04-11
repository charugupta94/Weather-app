import React from 'react';
import { History } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (city: string) => void;
  isDark: boolean;
}

export function RecentSearches({ searches, onSelect, isDark }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="w-full max-w-md mt-6">
      <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        <History size={16} />
        <h3 className="text-sm font-medium">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-white/90 text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            } backdrop-blur-sm shadow-sm hover:shadow-md`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}