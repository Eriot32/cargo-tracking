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
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header (Like in image) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white z-10">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {tracking.hawb || 'NO HAWB'}
              </h2>
              {tracking.routing && (
                <span className="px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                  {tracking.routing}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
               <span className="font-medium">MAWB: <span className="text-slate-800">{tracking.mawb}</span></span>
               <span className="w-1 h-1 rounded-full bg-slate-300"></span>
               <span className="font-medium">PO: <span className="text-slate-800">{tracking.ponum_pib}</span></span>
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
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="space-y-8">
              
            {/* General Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">SHIPPER</p>
                <p className="font-medium text-slate-900 uppercase">{tracking.pengirim}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">QTY / WEIGHT</p>
                <p className="font-medium text-slate-900">{tracking.pieces_weight}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">ROUTING</p>
                <p className="font-medium text-slate-900">{tracking.routing}</p>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Flights Data (Matches handwritten note) */}
            {tracking.flights && tracking.flights.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6 text-lg">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Flight Schedule
                </h3>
                
                <div className="relative border-l border-slate-200 ml-[9px] space-y-8 pb-4">
                  {tracking.flights.map((flight, idx) => (
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
    </div>
  );
}
