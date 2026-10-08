'use client';

import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import TrackingCard from '../components/TrackingCard';
import TrackingModal from '../components/TrackingModal';
import { CargoTracking } from '../lib/types';
import { getCargoData } from '../lib/cargo';

export default function Home() {
  const [query, setQuery] = useState('');
  const [cargoData, setCargoData] = useState<CargoTracking[]>([]);
  const [results, setResults] = useState<CargoTracking[]>([]);
  const [selectedTracking, setSelectedTracking] = useState<CargoTracking | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const loadCargo = async () => {
      setIsMounted(true);
      const data = await getCargoData();
      setCargoData(data);
      setResults(data);
      setIsLoadingData(false);
    };

    void loadCargo();
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);

    if (!searchQuery.trim()) {
      setResults(cargoData);
      setIsSearching(false);
      return;
    }

    // Client-side search for speed (since we only have 28 records locally for now)
    const term = searchQuery.toUpperCase();
    const filtered = cargoData.filter(item => 
      item.search_text.includes(term)
    );

    setResults(filtered);
    setIsSearching(false);
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header / Hero */}
      <div className="bg-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            System Live
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Cargo Tracking Search
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Instantly search across Master Air Waybills, routings, shippers, and flight status.
          </p>

          {/* Search Bar Component */}
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isSearching} 
            resultCount={query ? results.length : undefined} 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-10 pb-20">
        
        {isLoadingData ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
            Memuat data cargo...
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No results found</h3>
            <p className="text-slate-500">Try adjusting your search terms or keywords like routing (JFK), MAWB, or shipper name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((item) => (
              <TrackingCard 
                key={item.id} 
                tracking={item} 
                onClick={setSelectedTracking}
                query={query} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>PAITON Cargo Tracking System © {new Date().getFullYear()}</p>
      </footer>

      {/* Detail Modal */}
      {selectedTracking && (
        <TrackingModal 
          tracking={selectedTracking} 
          onClose={() => setSelectedTracking(null)} 
        />
      )}
    </main>
  );
}
