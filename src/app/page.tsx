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
      {/* Top Banner / Hero Section with Animated Living Background */}
      <header className="relative overflow-hidden bg-slate-950 text-white border-b-4 border-amber-400">
        {/* Animated Background from living-final.gif */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/living-final.gif"
            alt="Living Logistics Backdrop"
            className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-125"
          />
          {/* Deep gradient overlay to ensure perfect contrast and cohesive color fill */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/95" />
        </div>

        {/* Top Navbar Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-white/10">
          {/* Big, Prominent Logo */}
          <div className="bg-white/95 px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/50 backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <img
              src="/logo.png"
              alt="PT. Abhinaya Trans Nuswantara"
              className="h-16 sm:h-24 md:h-28 w-auto object-contain"
            />
          </div>

          {/* Admin Portal Link */}
          <div>
            <a
              href="/admin"
              className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl bg-slate-900/90 text-amber-300 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 transition-all flex items-center gap-2 shadow-lg backdrop-blur-sm"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Admin Portal</span>
            </a>
          </div>
        </div>

        {/* Hero Section Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Real-time Cargo Tracking System
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3 drop-shadow-md">
            Cargo Tracking Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto mb-8 font-medium drop-shadow">
            Select your shipment mode below and enter your exact tracking number to verify real-time status.
          </p>

          {/* TWO MAIN MENU TABS (Zero Emojis, Clean Vector SVG Icons) */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border-2 border-slate-700/80 shadow-2xl mb-8 max-w-md w-full backdrop-blur-md">
            <button
              onClick={() => handleTabChange('air')}
              className={`flex-1 py-3.5 px-4 rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 ${
                mode === 'air'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Package / Air Cargo</span>
            </button>

            <button
              onClick={() => handleTabChange('ocean')}
              className={`flex-1 py-3.5 px-4 rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 ${
                mode === 'ocean'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <svg className="w-5 h-5 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
              </svg>
              <span>Ocean Cargo</span>
            </button>
          </div>

          {/* Search Bar Component */}
          <SearchBar
            mode={mode}
            onSearch={handleSearch}
            isLoading={isSearching}
          />
        </div>
      </header>

      {/* Main Content Results Section */}
      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-6 relative z-10 pb-20">
        {!hasSearched ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-amber-300/80 shadow-md p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
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
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {mode === 'air' ? 'Ready to Track Air Cargo' : 'Ready to Track Ocean Cargo'}
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              {mode === 'air'
                ? 'Enter your exact House Air Waybill (HAWB) number above to display flight schedules and milestones.'
                : 'Enter your exact Bill of Lading (B/L) number above to display maritime vessel voyages and clearance.'}
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
      <footer className="bg-slate-950 text-white border-t-2 border-slate-800 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="bg-white/95 px-4 py-2 rounded-xl border border-amber-400/40">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-xs text-slate-400">
            Cargo Tracking System &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
