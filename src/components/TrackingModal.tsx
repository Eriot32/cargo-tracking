'use client';

import { CargoTracking } from '../lib/types';
import { useEffect } from 'react';

interface TrackingModalProps {
  tracking: CargoTracking;
  onClose: () => void;
}

export default function TrackingModal({ tracking, onClose }: TrackingModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white z-10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {tracking.hawb || 'NO HAWB'}
              </h2>
              {tracking.routing && (
                <span className="px-3 py-1 text-sm font-bold bg-primary-50 text-primary-700 rounded-full border border-primary-100">
                  {tracking.routing}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm">
               <span className="text-slate-500 font-medium">MAWB: <span className="text-slate-800">{tracking.mawb}</span></span>
               <span className="w-1 h-1 rounded-full bg-slate-300"></span>
               <span className="text-slate-500 font-medium">PO: <span className="text-slate-800">{tracking.ponum_pib}</span></span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Details & Flights */}
            <div className="space-y-6">
              
              {/* General Details */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Informasi Pengiriman
                  </h3>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Pengirim</p>
                    <p className="font-medium text-slate-900">{tracking.pengirim}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Qty / Weight</p>
                    <p className="font-medium text-slate-900">{tracking.pieces_weight}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Rute</p>
                    <p className="font-medium text-slate-900">{tracking.routing}</p>
                  </div>
                </div>
              </div>

              {/* Flights Data from Excel */}
              {tracking.flights && tracking.flights.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Jadwal Penerbangan
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
                      {tracking.flights.map((flight, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary-500"></div>
                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-primary-700 text-lg">{flight.flight}</span>
                            </div>
                            <div className="text-sm font-medium text-slate-700 mb-2">
                               Lokasi: {flight.route}
                            </div>
                            <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                               {flight.date_time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Original Document */}
            <div className="bg-slate-900 rounded-xl shadow-inner overflow-hidden flex flex-col h-full min-h-[500px]">
               <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center shrink-0">
                  <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Dokumen MAWB Asli
                  </h3>
                  <a href={tracking.image_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium transition-colors bg-slate-800 px-3 py-1.5 rounded-full">
                    Buka Ukuran Penuh
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
               </div>
               <div className="flex-1 p-2 relative group overflow-auto">
                 <img 
                    src={tracking.image_url} 
                    alt="Original Document" 
                    className="w-full object-contain mx-auto rounded"
                 />
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
