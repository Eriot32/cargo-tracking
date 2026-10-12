'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import AirCargoCard from '../components/AirCargoCard';
import OceanCargoCard from '../components/OceanCargoCard';
import { AirCargoTracking, OceanCargoTracking, CargoMode } from '../lib/types';
import { getAirCargoByHawb, getOceanCargoByBL } from '../lib/cargo';

export default function Home() {
  const [mode, setMode] = useState<CargoMode>('air');
  const [airResult, setAirResult] = useState<AirCargoTracking | null>(null);
  const [oceanResult, setOceanResult] = useState<OceanCargoTracking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleTabChange = (newMode: CargoMode) => {
    setMode(newMode);
    setHasSearched(false);
    setAirResult(null);
    setOceanResult(null);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    if (mode === 'air') {
      const data = await getAirCargoByHawb(query);
      setAirResult(data);
    } else {
      const data = await getOceanCargoByBL(query);
      setOceanResult(data);
    }

    setIsSearching(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header / Hero Section */}
      <header className="bg-slate-900 text-white relative overflow-hidden border-b-4 border-amber-400">
        {/* Subtle geometric pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Top Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-slate-800/80 relative z-10">
          {/* Logo prominently displayed without redundant text */}
          <div className="bg-white/95 px-4 py-2 rounded-xl shadow-lg border border-amber-400/40">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 sm:h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 border border-slate-700 hover:bg-slate-700 hover:text-amber-200 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin Portal
            </a>
          </div>
        </div>

        {/* Hero Banner Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Real-time Cargo Tracking System
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            Cargo Tracking Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-medium">
            Track your cargo easily. Select your service type below and enter your shipment tracking number.
          </p>

          {/* TWO MAIN MENU TABS: Package / Air Cargo vs Ocean Cargo */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/90 border-2 border-slate-700 shadow-2xl mb-8 max-w-md w-full">
            <button
              onClick={() => handleTabChange('air')}
              className={`flex-1 py-3 px-4 rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                mode === 'air'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>✈️</span>
              <span>Package / Air Cargo</span>
            </button>

            <button
              onClick={() => handleTabChange('ocean')}
              className={`flex-1 py-3 px-4 rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                mode === 'ocean'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>🚢</span>
              <span>Ocean Cargo</span>
            </button>
          </div>

          {/* Search Bar */}
          <SearchBar
            mode={mode}
            onSearch={handleSearch}
            isLoading={isSearching}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-6 relative z-10 pb-20">
        {!hasSearched ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-amber-300 shadow-sm p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
              {mode === 'air' ? (
                <span className="text-3xl">✈️</span>
              ) : (
                <span className="text-3xl">🚢</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {mode === 'air' ? 'Ready to Track Air Cargo' : 'Ready to Track Ocean Cargo'}
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              {mode === 'air'
                ? 'Enter your exact HAWB number above to view flight schedules, clearance status, and delivery milestones.'
                : 'Enter your exact B/L number above to view vessel voyage, port schedules, and arrival status.'}
            </p>
          </div>
        ) : isSearching ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-600">
            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-bold">Searching database...</p>
          </div>
        ) : mode === 'air' ? (
          airResult ? (
            <AirCargoCard data={airResult} />
          ) : (
            <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Air Cargo Shipment Not Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                No record matches the HAWB number you entered. Please verify the code and try again.
              </p>
            </div>
          )
        ) : oceanResult ? (
          <OceanCargoCard data={oceanResult} />
        ) : (
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Ocean Cargo Shipment Not Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              No record matches the B/L number you entered. Please verify the code and try again.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-8 px-4 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="bg-white/95 px-3 py-1.5 rounded-lg border border-amber-400/40">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          </div>
          <p className="text-xs text-slate-400">
            Cargo Tracking System &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
