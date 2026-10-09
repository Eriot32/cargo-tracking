'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white rounded-xl border-2 transition-all duration-200 ${
          isFocused
            ? 'border-primary-500 shadow-lg shadow-primary-500/10'
            : 'border-slate-200 shadow-sm hover:border-slate-300'
        }`}
      >
        <div className="pl-5 pr-2">
          <svg
            className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary-500' : 'text-slate-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter exact HAWB or MAWB number..."
          className="w-full py-4 pr-4 text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium uppercase"
        />

        <div className="pr-2">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Track Cargo'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
