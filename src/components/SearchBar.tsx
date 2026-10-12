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
      ? 'Enter exact HAWB (e.g. NAEH-70968)...'
      : 'Enter exact B/L No. (e.g. X25-00135-SUB-002)...';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center bg-white rounded-2xl border-2 transition-all duration-300 shadow-2xl ${
          isFocused
            ? 'border-amber-500 ring-4 ring-amber-400/25 shadow-amber-500/10'
            : 'border-slate-200 hover:border-amber-400'
        }`}
      >
        <div className="pl-5 pr-3 text-slate-500">
          {mode === 'air' ? (
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
            </svg>
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholderText}
          className="w-full py-4 pr-3 text-base sm:text-lg text-slate-900 placeholder-slate-400 bg-transparent outline-none font-semibold uppercase tracking-wide"
        />

        <div className="pr-2.5">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`px-7 sm:px-9 py-3.5 rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
              mode === 'air'
                ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-95 disabled:bg-slate-200 disabled:text-slate-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95 disabled:bg-slate-200 disabled:text-slate-400'
            } disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Track</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
