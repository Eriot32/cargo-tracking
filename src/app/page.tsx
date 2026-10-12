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
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header Navbar - Full White with Yellow Line */}
      <header className="bg-white border-b border-slate-200/80 shadow-sm relative z-20">
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="PT. Abhinaya Trans Nuswantara"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </div>

          {/* Admin Portal Shortcut */}
          <div>
            <a
              href="/admin"
              className="text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-amber-400 hover:text-slate-950 transition-all border border-slate-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Admin Portal</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with living-final.gif strictly as background between header and content */}
      <section className="relative overflow-hidden border-b border-slate-200/80 pt-10 pb-12 px-4 sm:px-6 lg:px-8 text-center bg-slate-900">
        {/* The GIF Background: Strictly contained, low opacity, visible & subtle */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/living-final.gif"
            alt=""
            className="w-full h-full object-cover object-center opacity-30 filter brightness-105 contrast-110"
          />
          {/* Dark gradient overlay to keep text ultra-legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/80" />
        </div>

        {/* Content sitting cleanly above the gif background */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Real-time Cargo Tracking System
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2 drop-shadow-md">
            Cargo Tracking Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto mb-8 font-medium drop-shadow">
            Select your shipment mode below and enter your exact tracking number.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 mb-8 max-w-md w-full shadow-2xl backdrop-blur-md">
            <button
              onClick={() => handleTabChange('air')}
              className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                mode === 'air'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-[1.01]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Package / Air Cargo</span>
            </button>

            <button
              onClick={() => handleTabChange('ocean')}
              className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                mode === 'ocean'
                  ? 'bg-blue-600 text-white shadow-md scale-[1.01]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
              </svg>
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
      </section>

      {/* Main Content Area (Clean White/Slate Background below the hero) */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 pb-20">
        {!hasSearched ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200 text-slate-700">
              {mode === 'air' ? (
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
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
            <p className="font-bold text-sm">Searching database...</p>
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

      {/* Clean Light Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-4 mt-auto text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          <p className="text-xs text-slate-500">
            Cargo Tracking System &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
