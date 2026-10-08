'use client';

import { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  resultCount?: number;
}

export default function SearchBar({ onSearch, isLoading, resultCount }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
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
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Cari berdasarkan No HAWB, MAWB, Rute penerbangan..."
          className="w-full py-4 pr-4 text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium"
        />

        {isLoading && (
          <div className="pr-3">
            <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {query && !isLoading && (
          <button
            onClick={handleClear}
            className="pr-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="text-sm text-slate-400">
          {query ? (
            resultCount !== undefined ? (
              <span>
                Ditemukan <span className="font-medium text-slate-600">{resultCount}</span> hasil
              </span>
            ) : null
          ) : (
            <span>Coba cari: <span className="font-medium text-slate-500">NAEH-72171</span>, <span className="font-medium text-slate-500">18018999282</span>, atau <span className="font-medium text-slate-500">JFK - ICN</span></span>
          )}
        </div>
      </div>
    </div>
  );
}
