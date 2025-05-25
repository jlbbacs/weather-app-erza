import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 pl-12 rounded-full border-2 border-blue-100 focus:border-blue-400 focus:outline-none shadow-md transition-all text-gray-700 placeholder-gray-400"
          disabled={isLoading}
        />
        <div className="absolute left-3 text-blue-400">
          <Search size={22} />
        </div>
        <button
          type="submit"
          disabled={!city.trim() || isLoading}
          className="absolute right-2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;