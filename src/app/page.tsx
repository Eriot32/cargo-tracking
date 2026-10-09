'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TrackingModal from '../components/TrackingModal';
import { CargoTracking } from '../lib/types';
import { getCargoByTrackingNumber } from '../lib/cargo';

export default function Home() {
  const [result, setResult] = useState<CargoTracking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Secure fetch: Only returns data if HAWB/MAWB exactly matches
    const data = await getCargoByTrackingNumber(searchQuery);
    
    setResult(data);
    setIsSearching(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header / Hero */}
      <div className="bg-slate-900 text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex-none">
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
          {/* Company Logo & Name */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/logo.png" 
              alt="PT. Abhinaya Trans Nuswantara" 
              className="w-16 h-16 object-contain rounded-lg bg-white/10 p-1"
            />
            <div className="text-left">
              <h2 className="text-lg md:text-xl font-bold tracking-tight">
                PT. ABHINAYA TRANS NUSWANTARA
              </h2>
              <p className="text-sm text-slate-400">Freight Forwarding & Logistics</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Secure Tracking System
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Track Your Shipment
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Enter your House Air Waybill (HAWB) or Master Air Waybill (MAWB) to view your flight schedule.
          </p>

          {/* Search Bar Component */}
          <SearchBar 
            onSearch={handleSearch} 
            isLoading={isSearching} 
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-8 relative z-10 pb-20">
        
        {!hasSearched ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Your shipment details will appear here after a successful search.
          </div>
        ) : isSearching ? (
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
             Searching database...
           </div>
        ) : !result ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Shipment Not Found</h3>
            <p className="text-slate-500">We couldn't find any data matching that tracking number. Please check your HAWB/MAWB and try again.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Instead of a modal, show the detail directly on the page */}
             
             {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50 z-10">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {result.hawb || 'NO HAWB'}
                  </h2>
                  {result.routing && (
                    <span className="px-3 py-1 text-xs font-bold bg-white text-slate-600 rounded-full border border-slate-200 shadow-sm">
                      {result.routing}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                  <span className="font-medium">MAWB: <span className="text-slate-800">{result.mawb}</span></span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="font-medium">PO: <span className="text-slate-800">{result.ponum_pib}</span></span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 bg-white">
              <div className="space-y-8">
                  
                {/* General Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">SHIPPER</p>
                    <p className="font-medium text-slate-900 uppercase">{result.pengirim}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">QTY / WEIGHT</p>
                    <p className="font-medium text-slate-900">{result.pieces_weight}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">ROUTING</p>
                    <p className="font-medium text-slate-900">{result.routing}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100"></div>

                {/* Flights Data */}
                {result.flights && result.flights.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6 text-lg">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Flight Schedule
                    </h3>
                    
                    <div className="relative border-l border-slate-200 ml-[9px] space-y-8 pb-4">
                      {result.flights.map((flight, idx) => (
                        <div key={idx} className="relative pl-8">
                          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-slate-400"></div>
                          
                          <div className="space-y-3">
                            <div className="font-bold text-slate-900 text-lg">
                              {flight.flight}
                            </div>
                            
                            <div className="text-sm font-semibold text-slate-700">
                              Route: {flight.route}
                            </div>
                            
                            <div className="space-y-1 text-sm font-medium text-slate-600">
                              <div className="grid grid-cols-[100px_1fr] gap-4">
                                <span>Departed</span>
                                <span>{flight.departed}</span>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] gap-4">
                                <span>Arrived</span>
                                <span>{flight.arrived}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm mt-auto">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-slate-700">PT. ABHINAYA TRANS NUSWANTARA</span>
        </div>
        <p>Secure Cargo Tracking System &copy; {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
