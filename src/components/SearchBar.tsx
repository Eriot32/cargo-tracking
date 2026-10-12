'use client';

import { useState } from 'react';
import { CargoMode } from '../lib/types';

interface SearchBarProps {
  mode: CargoMode;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ mode, onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const placeholderText =
    mode === 'air'
      ? 'Enter exact HAWB (e.g. NAEH-70968 or MAWB)...'
      : 'Enter exact B/L No. (e.g. X25-00135-SUB-002)...';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white rounded-2xl border-2 transition-all duration-300 shadow-xl ${
          isFocused
            ? 'border-amber-400 ring-4 ring-amber-400/20 shadow-amber-500/10'
            : 'border-slate-200 hover:border-amber-300'
        }`}
      >
        <div className="pl-5 pr-2">
          {mode === 'air' ? (
            <span className="text-xl">✈️</span>
          ) : (
            <span className="text-xl">🚢</span>
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholderText}
          className="w-full py-4 pr-3 text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent outline-none font-semibold uppercase"
        />

        <div className="pr-2">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`px-6 sm:px-8 py-3 rounded-xl font-black text-sm sm:text-base uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
              mode === 'air'
                ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95 disabled:bg-slate-200 disabled:text-slate-400'
            } disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Track</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
